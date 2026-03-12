import React from "react";
import ScrollAnimation from "react-animate-on-scroll";

function Timeline({ education }) {
  const { years, title, content } = education;
  return (
    <ScrollAnimation
      animateIn="fadeInUp"
      animateOut="fadeInOut"
      animateOnce={true}
    >
      <div className="timeline-container">
        <div className="content">
          <span className="time">{years}</span>
          <h3 className="title">{title}</h3>
          <p>{content}</p>
          <a 
            href="#!" 
            className="text-primary small font-weight-bold"
            style={{ display: "inline-block", marginBottom: "24px" }}
            onClick={(e) => {
              e.preventDefault();
              window.dispatchEvent(new CustomEvent("open-chatbot", { 
                detail: { query: `Tell me the real story about being ${title} (${years}). What was the situation and what were the key decisions?` } 
              }));
            }}
          >
            <i className="fas fa-robot mr-1"></i> View AI Context
          </a>
        </div>
      </div>
    </ScrollAnimation>
  );
}

export default Timeline;
