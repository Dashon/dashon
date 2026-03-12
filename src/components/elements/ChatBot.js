import React, { useState, useEffect, useRef, useCallback } from "react";

// ─── Rate-limit constants ─────────────────────────────────────────────────────
const MAX_PER_MINUTE = 5;
const MAX_PER_SESSION = 20;
const RATE_WINDOW_MS = 60_000;


// ─── Helpers ──────────────────────────────────────────────────────────────────
const STORAGE_KEY = "dashon_chat_rate";

function getRateData() {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY)) || { timestamps: [], total: 0 };
  } catch {
    return { timestamps: [], total: 0 };
  }
}

function saveRateData(data) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {}
}

function checkRateLimit() {
  const now = Date.now();
  const data = getRateData();
  const recent = data.timestamps.filter((t) => now - t < RATE_WINDOW_MS);
  if (data.total >= MAX_PER_SESSION) {
    return { allowed: false, reason: "session" };
  }
  if (recent.length >= MAX_PER_MINUTE) {
    const retryIn = Math.ceil((RATE_WINDOW_MS - (now - recent[0])) / 1000);
    return { allowed: false, reason: "minute", retryIn };
  }
  return { allowed: true, recent, data };
}

function recordMessage(recent, data) {
  const now = Date.now();
  const updated = {
    timestamps: [...recent, now],
    total: data.total + 1,
  };
  saveRateData(updated);
}

// ─── ChatBot Component ────────────────────────────────────────────────────────
function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! 👋 I'm Dashon's assistant. Ask me anything about his background, skills, experience, or how to work with him.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [rateLimitMsg, setRateLimitMsg] = useState("");
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading, open]);

  // Focus input when panel opens
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 150);
  }, [open]);

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;

    const rateCheck = checkRateLimit();
    if (!rateCheck.allowed) {
      if (rateCheck.reason === "session") {
        setRateLimitMsg("You've reached the session message limit. Please refresh to start over.");
      } else {
        setRateLimitMsg(`Slow down! Please wait ${rateCheck.retryIn}s before sending another message.`);
        setTimeout(() => setRateLimitMsg(""), rateCheck.retryIn * 1000);
      }
      return;
    }

    setRateLimitMsg("");
    const userMessage = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    recordMessage(rateCheck.recent, rateCheck.data);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            ...messages.filter((m) => m.role !== "system"),
            userMessage,
          ],
        }),
      });

      if (response.status === 429) {
        const data = await response.json();
        setRateLimitMsg(data.error || "Too many requests. Please slow down.");
        // remove the optimistic user message
        setMessages((prev) => prev.slice(0, -1));
        return;
      }

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const reply = data?.reply?.trim();

      if (!reply) throw new Error("Empty response");

      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I ran into an issue. Please try again in a moment.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, messages]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        role: "assistant",
        content: "Hi! 👋 I'm Dashon's assistant. Ask me anything about his background, skills, experience, or how to work with him.",
      },
    ]);
    setRateLimitMsg("");
  };

  const rateData = getRateData();
  const remaining = MAX_PER_SESSION - rateData.total;

  return (
    <>
      {/* ── Styles ── */}
      <style>{`
        .chatbot-bubble {
          position: fixed;
          bottom: 28px;
          right: 28px;
          z-index: 9999;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: linear-gradient(135deg, #0A192F, #4A90E2);
          border: none;
          box-shadow: 0 4px 20px rgba(10, 25, 47, 0.45);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          color: #fff;
          font-size: 22px;
        }
        .chatbot-bubble:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 28px rgba(74, 144, 226, 0.6);
        }
        .chatbot-panel {
          position: fixed;
          bottom: 92px;
          right: 28px;
          z-index: 9998;
          width: 340px;
          max-height: 500px;
          display: flex;
          flex-direction: column;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 12px 40px rgba(0,0,0,0.25);
          animation: slideUp 0.22s ease;
          background: #fff;
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .chatbot-header {
          background: linear-gradient(135deg, #0A192F, #4A90E2);
          color: #fff;
          padding: 12px 16px;
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }
        .chatbot-header-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(255,255,255,0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          flex-shrink: 0;
        }
        .chatbot-header-info { flex: 1; }
        .chatbot-header-info h6 { margin: 0; font-size: 0.85rem; font-weight: 700; color: #fff; }
        .chatbot-header-info small { opacity: 0.85; font-size: 0.7rem; }
        .chatbot-header-actions { display: flex; gap: 6px; }
        .chatbot-header-btn {
          background: rgba(255,255,255,0.2);
          border: none;
          color: #fff;
          border-radius: 6px;
          padding: 4px 8px;
          font-size: 12px;
          cursor: pointer;
          transition: background 0.15s;
        }
        .chatbot-header-btn:hover { background: rgba(255,255,255,0.35); }
        .chatbot-messages {
          flex: 1;
          overflow-y: auto;
          padding: 12px 14px;
          background: #f8f9fa;
          display: flex;
          flex-direction: column;
          gap: 10px;
          scroll-behavior: smooth;
        }
        .chatbot-msg {
          display: flex;
          gap: 8px;
          align-items: flex-end;
        }
        .chatbot-msg.user { flex-direction: row-reverse; }
        .chatbot-msg-bubble {
          max-width: 78%;
          padding: 9px 13px;
          border-radius: 14px;
          font-size: 0.82rem;
          line-height: 1.45;
          white-space: pre-wrap;
          word-break: break-word;
        }
        .chatbot-msg.assistant .chatbot-msg-bubble {
          background: #fff;
          color: #333;
          border-bottom-left-radius: 4px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.08);
        }
        .chatbot-msg.user .chatbot-msg-bubble {
          background: linear-gradient(135deg, #0A192F, #4A90E2);
          color: #fff;
          border-bottom-right-radius: 4px;
        }
        .chatbot-typing {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 9px 13px;
          background: #fff;
          border-radius: 14px;
          border-bottom-left-radius: 4px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.08);
          width: fit-content;
        }
        .chatbot-typing span {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #4A90E2;
          animation: typingDot 1.2s infinite;
        }
        .chatbot-typing span:nth-child(2) { animation-delay: 0.2s; }
        .chatbot-typing span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes typingDot {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-5px); opacity: 1; }
        }
        .chatbot-rate-msg {
          font-size: 0.72rem;
          color: #dc3545;
          text-align: center;
          padding: 4px 14px 0;
          background: #f8f9fa;
        }
        .chatbot-footer {
          display: flex;
          align-items: flex-end;
          padding: 10px 10px;
          background: #fff;
          border-top: 1px solid #eee;
          gap: 8px;
          flex-shrink: 0;
        }
        .chatbot-input {
          flex: 1;
          resize: none;
          border: 1px solid #ddd;
          border-radius: 10px;
          padding: 8px 12px;
          font-size: 0.82rem;
          outline: none;
          max-height: 80px;
          line-height: 1.4;
          transition: border-color 0.15s;
          font-family: inherit;
        }
        .chatbot-input:focus { border-color: #4A90E2; }
        .chatbot-send {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: linear-gradient(135deg, #0A192F, #4A90E2);
          border: none;
          color: #fff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: opacity 0.15s, transform 0.15s;
        }
        .chatbot-send:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
        .chatbot-send:not(:disabled):hover { transform: scale(1.08); }
        .chatbot-counter {
          font-size: 0.65rem;
          color: #aaa;
          text-align: right;
          padding: 0 14px 6px;
          background: #fff;
        }
        @media (max-width: 480px) {
          .chatbot-panel { width: calc(100vw - 32px); right: 16px; bottom: 84px; }
          .chatbot-bubble { right: 16px; bottom: 20px; }
        }
      `}</style>

      {/* ── Toggle Bubble ── */}
      <button
        className="chatbot-bubble"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Open Dashon's assistant"}
        title={open ? "Close chat" : "Chat with Dashon's assistant"}
      >
        {open ? "✕" : "💬"}
      </button>

      {/* ── Chat Panel ── */}
      {open && (
        <div className="chatbot-panel" role="dialog" aria-label="Dashon's assistant">
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-header-avatar">😉</div>
            <div className="chatbot-header-info">
              <h6>Dashon's Assistant</h6>
              <small>Ask me about Dashon's work &amp; resume</small>
            </div>
            <div className="chatbot-header-actions">
              <button className="chatbot-header-btn" onClick={clearChat} title="Clear chat">
                ↺
              </button>
              <button className="chatbot-header-btn" onClick={() => setOpen(false)} title="Close">
                ✕
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="chatbot-messages" role="log" aria-live="polite">
            {messages.map((msg, i) => (
              <div key={i} className={`chatbot-msg ${msg.role}`}>
                <div className="chatbot-msg-bubble">{msg.content}</div>
              </div>
            ))}
            {loading && (
              <div className="chatbot-msg assistant">
                <div className="chatbot-typing">
                  <span /><span /><span />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Rate limit warning */}
          {rateLimitMsg && <div className="chatbot-rate-msg">{rateLimitMsg}</div>}

          {/* Counter */}
          <div className="chatbot-counter">{remaining} messages remaining this session</div>

          {/* Input */}
          <div className="chatbot-footer">
            <textarea
              ref={inputRef}
              className="chatbot-input"
              rows={1}
              placeholder="Ask me anything about Dashon…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
              aria-label="Chat message input"
            />
            <button
              className="chatbot-send"
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              aria-label="Send message"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatBot;
