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

function About() {
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
                     <div className="rounded overflow-hidden shadow-sm p-4 bg-light" style={{ border: "1px solid #eee" }}>
                        <h5 className="font-weight-bold mb-3 text-dark">Core Skills</h5>
                        <div className="d-flex flex-wrap gap-2">
                          {["LLM Workflows","Agents","RAG / Retrieval","Evals","TypeScript","Node.js","React / Next.js",".NET / C#","PostgreSQL","AWS Lambda","API Gateway","SQS","Docker","Terraform","CI/CD","Fractional Lead","Product Architecture"].map((skill) => (
                            <span key={skill} className="badge badge-pill" style={{ backgroundColor: "#6C6CE515", color: "#6C6CE5", border: "1px solid #6C6CE540", padding: "6px 12px", fontSize: "0.8rem", fontWeight: 600 }}>{skill}</span>
                          ))}
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
