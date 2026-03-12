import React from "react";
import TrackVisibility from "react-on-screen";
import Counter from "../elements/Counter";
import Pagetitle from "../elements/Pagetitle";
import Skill from "../elements/Skill";
import ReactGA from "react-ga4";
import { usePostHog } from 'posthog-js/react';

const aboutContent = {
  name: "Dashon",
  avatarImage: "/images/dashon.png",
  content:
    `Hi, I'm Dashon Howard — Founder & Principal Engineer at Semicolon-D, based in Chicago. ` +
    `With 15+ years building web, mobile, and cloud systems across startups, healthcare, blockchain, and applied AI, ` +
    `I help teams ship LLM-enabled features, retrieval systems, integrations, and modern product infrastructure fast — ` +
    `while keeping delivery grounded in reliability, maintainability, and real-world constraints.`,
};

const progressData = [
  {
    id: 1,
    title: "TypeScript / Node.js",
    percantage: 95,
    progressColor: "#FFD15C",
  },
  {
    id: 2,
    title: "React / Next.js",
    percantage: 92,
    progressColor: "#FF4C60",
  },
  {
    id: 3,
    title: ".NET / C#",
    percantage: 90,
    progressColor: "#6C6CE5",
  },
  {
    id: 4,
    title: "LLM / RAG / Agents",
    percantage: 88,
    progressColor: "#F9D74C",
  },
  {
    id: 5,
    title: "AWS / Serverless / Docker",
    percantage: 85,
    progressColor: "#9C2CE5",
  },
];
const yearsOfExperience = new Date().getFullYear() - 2007;
const coffeesPerDay = 1;
const workdaysInAYear = 261;
const counterData = [
  {
    id: 1,
    title: "Years of Experience",
    count: yearsOfExperience,
    icon: "icon-fire",
  },
  {
    id: 2,
    title: "Companies Explored",
    count: 9,
    icon: "icon-briefcase",
  },
  {
    id: 3,
    title: "Clients Satisfied",
    count: 31,
    icon: "icon-people",
  },
  {
    id: 4,
    title: "Cup of coffee",
    count: coffeesPerDay * workdaysInAYear * yearsOfExperience,
    icon: "icon-cup",
  },
];

function About(props) {
  const posthog = usePostHog();

  const viewPdfHandler = () => {
    posthog.capture('resume_viewed');
    ReactGA.event({
      category: "resume",
      action: "view_file",
    });
  };
  const downloadPdfHandler = () => {
    posthog.capture('resume_downloaded');
    ReactGA.event({
      category: "resume",
      action: "download_file",
    });
  };

  return (
    <section id="about">
      <div className="container">
        <Pagetitle title="About Dashon" />
        <div className="row">
          <div className="col-md-3">
            <div className="text-center text-md-left">
              <img src={aboutContent.avatarImage} alt={aboutContent.name} />
            </div>
            <div className="spacer d-md-none d-lg-none" data-height="30"></div>
          </div>

          <div className="col-md-9 triangle-left-md triangle-top-sm">
            <div className="rounded bg-white shadow-dark padding-30">
              <div className="row">
                <div className="col-md-6">
                  <p>{aboutContent.content}</p>
                  <div className="mt-3">
                    <a
                      action="view_file"
                      href="/Dashon-Howard-Resume.pdf"
                      onClick={viewPdfHandler}
                      target="__dashonExt"
                      className="btn btn-default"
                    >
                      View CV
                    </a>
                  </div>
                  <div className="mt-3">
                    <a
                      eventLabel="download_resume"
                      href="/Dashon-Howard-Resume.pdf"
                      onClick={downloadPdfHandler}
                      download
                      className="btn btn-default"
                    >
                      Download CV
                    </a>
                  </div>
                  <div
                    className="spacer d-md-none d-lg-none"
                    data-height="30"
                  ></div>
                </div>
                <div className="col-md-6">
                  {progressData.map((progress) => (
                    <TrackVisibility
                      once
                      key={progress.id}
                      className="progress-wrapper"
                    >
                      <Skill progress={progress} />
                    </TrackVisibility>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="spacer" data-height="70"></div>
        <div className="row">
          <div className="col-md-12">
             <div className="rounded bg-white shadow-dark padding-30">
                <div className="row align-items-center">
                  <div className="col-md-5">
                     <h3 className="mb-3">Founder &amp; Principal Engineer</h3>
                     <p className="text-muted">Running Semicolon-D from Chicago — focused on rapid build sprints, fractional lead engineering, and rescue/scale work for teams that need senior technical execution without heavy overhead.</p>
                     <ul className="list-unstyled mt-3">
                        <li><i className="fas fa-map-marker-alt mr-2 text-primary"></i> Based in: <strong>Chicago, IL</strong></li>
                        <li><i className="fas fa-robot mr-2 text-primary"></i> Focus: <strong>LLM Workflows, Agents &amp; RAG</strong></li>
                        <li><i className="fas fa-rocket mr-2 text-primary"></i> Building: <strong>TravelDay.world &amp; PlayActionStudios.com</strong></li>
                     </ul>
                  </div>
                  <div className="col-md-7">
                     <div className="skills-gaps-card rounded overflow-hidden p-4" style={{ 
                        background: props.light ? "rgba(255, 255, 255, 0.7)" : "rgba(255, 255, 255, 0.05)",
                        backdropFilter: "blur(12px)",
                        WebkitBackdropFilter: "blur(12px)",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                        position: "relative"
                     }}>
                        <div className="d-flex align-items-center mb-4">
                           <div className="bg-primary rounded-circle mr-5 d-flex align-items-center justify-content-center" style={{ width: "32px", height: "32px", opacity: 0.8, marginRight: "5px" }}>
                              <i className="fas fa-brain text-white small"></i>
                           </div>
                           <h5 className="font-weight-bold m-0" style={{ letterSpacing: "0.5px" }}>Skills & Gaps (AI-Ready)</h5>
                        </div>

                        <div className="row">
                          <div className="col-sm-4 mb-4 mb-sm-0">
                            <h6 className="small font-weight-bold text-success text-uppercase mb-3" style={{ opacity: 0.9 }}>Expertise</h6>
                            <ul className="list-unstyled mb-0">
                              {["TS/Node", "React/Next", "AI/RAG", "C#/.NET"].map(s => (
                                <li key={s} className="mb-2 d-flex align-items-center small">
                                  <i className="fas fa-check-circle mr-2 text-success" style={{ fontSize: "12px" }}></i>
                                  <span style={{ fontWeight: 500, marginLeft: "2px" }}>{s}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="col-sm-4 mb-4 mb-sm-0">
                            <h6 className="small font-weight-bold text-primary text-uppercase mb-3" style={{ opacity: 0.9 }}>Proficient</h6>
                            <ul className="list-unstyled mb-0">
                              {["Docker", "Terraform", "GraphQL", "AWS"].map(s => (
                                <li key={s} className="mb-2 d-flex align-items-center small">
                                  <i className="fas fa-arrow-circle-up mr-2 text-primary" style={{ fontSize: "12px" }}></i>
                                  <span style={{ fontWeight: 500, marginLeft: "2px" }}>{s}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="col-sm-4">
                            <h6 className="small font-weight-bold text-warning text-uppercase mb-3" style={{ opacity: 0.9 }}>Transparent Gaps</h6>
                            <ul className="list-unstyled mb-0">
                              {["UX Design", "Native App", "Growth"].map(s => (
                                <li key={s} className="mb-2 d-flex align-items-center small">
                                  <i className="fas fa-minus-circle mr-2 text-warning" style={{ fontSize: "12px" }}></i>
                                  <span style={{ fontWeight: 500, marginLeft: "2px" }}>{s}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-top text-center" style={{ borderColor: "rgba(0,0,0,0.05)" }}>
                          <div className="p-3 rounded mb-3" style={{ background: "rgba(108, 108, 229, 0.05)", border: "1px dashed rgba(108, 108, 229, 0.2)" }}>
                            <p className="small mb-0 text-muted">
                              <strong className="text-dark">Interactive Fit Assessment</strong><br/>
                              Paste your JD into my AI chat to see an honest assessment of how my skills map to your needs.
                            </p>
                          </div>
                          <button 
                            className="btn btn-default mt-2"
                            style={{ 
                              backgroundColor: "#FF5959",
                              border: "none",
                              color: "white",
                              padding: "10px 24px",
                              borderRadius: "30px",
                              fontWeight: "600",
                              boxShadow: "0 5px 15px rgba(255, 89, 89, 0.3)",
                              transition: "all 0.3s ease"
                            }}
                            onMouseOver={(e) => {
                               e.currentTarget.style.transform = "translateY(-2px)";
                               e.currentTarget.style.boxShadow = "0 8px 20px rgba(255, 89, 89, 0.4)";
                               e.currentTarget.style.backgroundColor = "#ff4545";
                            }}
                            onMouseOut={(e) => {
                               e.currentTarget.style.transform = "translateY(0)";
                               e.currentTarget.style.boxShadow = "0 5px 15px rgba(255, 89, 89, 0.3)";
                               e.currentTarget.style.backgroundColor = "#FF5959";
                            }}
                            onClick={() => window.dispatchEvent(new CustomEvent("open-chatbot", { detail: { query: "I'd like an honest assessment of a Job Description. [Paste JD here]" } }))}
                          >
                            <i className="fas fa-robot mr-2"></i> Assess Job Fit
                          </button>
                        </div>
                     </div>
                  </div>
                </div>
             </div>
          </div>
        </div>
        <div className="spacer" data-height="70"></div>
        <div className="row fix-spacing">
          {counterData.map((counter) => (
            <div key={counter.id} className="col-md-3 col-sm-6">
              <TrackVisibility once>
                <Counter counterItem={counter} />
              </TrackVisibility>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;
