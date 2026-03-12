import React from "react";
import Pagetitle from "../elements/Pagetitle";
import Timeline from "../elements/Timeline";
import ReactGA from "react-ga4";
import { usePostHog } from 'posthog-js/react';

const experienceData1 = [
  {
    id: 1,
    title: "Founder & Principal Engineer — Semicolon-D",
    years: "Aug 2024 - Present",
    content:
      "Building and shipping production software for client work and internal products across AI workflows, full-stack web systems, and cloud infrastructure. Leading architecture and hands-on execution across LLM-enabled features including agents, retrieval systems, tool-use, and evaluation patterns. Current product portfolio includes TravelDay.world and PlayActionStudios.com.",
  },
  {
    id: 2,
    title: "Senior Lead Software Engineer — Confidential AI Startup (Contract)",
    years: "Aug 2024 - Aug 2025",
    content:
      "Built production LLM workflows including agents, retrieval pipelines, evaluation harnesses, and vendor integrations. Improved answer quality and reduced inference cost through prompt and tooling optimization. Shipped AI features designed for real-world production use in a fast-moving startup environment.",
  },
  {
    id: 3,
    title: "Lead Software Engineer — zeNFT, Inc.",
    years: "Jan 2022 - Aug 2024",
    content:
      "Architected and shipped a secure NFT marketplace; integrated Seaport and optimized contract interactions to cut on-chain costs by 80%+. Unified data access with GraphQL across MongoDB, PostgreSQL, and SQL Server. Hardened CI/CD using Docker and AWS services including CodePipeline, Lambda, and API Gateway.",
  },
  {
    id: 4,
    title: "Senior Software Engineer — Independent Consultant (Contract)",
    years: "Apr 2019 - Jan 2022",
    content:
      "Delivered 5+ mobile and web applications as a full-stack engineer using React Native, C#/.NET, Node.js/Express, and SQL. Integrated AWS services including Rekognition and Transcribe, plus wearable-device workflows for workplace safety analytics. Adopted serverless backends using Lambda and API Gateway.",
  },
];

const experienceData2 = [
  {
    id: 1,
    title: "Senior Developer — MERGE (Merge Design & Interactive)",
    years: "May 2017 - Apr 2019",
    content:
      "Built modular marketing sites and APIs using Handlebars, React, SQL, WordPress, Kentico, Node.js, and ASP.NET. Improved initial render performance by approximately 45% through SEO, caching, CSS/JS hygiene, and front-end optimization.",
  },
  {
    id: 2,
    title: "Senior Software Engineer — Orthogonal",
    years: "Nov 2013 - May 2017",
    content:
      "Developed medical software applications across .NET, Node.js, PHP, Ruby, Swift, Java, SQL, React, and Angular. Built Bluetooth LE mobile applications that captured and displayed data from medical devices. Improved web application latency by approximately 50% through performance-focused backend and front-end work.",
  },
  {
    id: 3,
    title: "Software Developer & Trainer — Virtual Officeware",
    years: "Oct 2007 - Nov 2013",
    content:
      "Built an ASP.NET MVC application for automated compatibility testing on Crystal Reports across multiple Centricity EMR versions. Developed a system that converted medical intake forms into HTML and CSS. Helped reduce support load by approximately 45% through automation and better internal tools. Delivered recurring training sessions for healthcare professionals.",
  },
];

function Experiences() {
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
    <section id="experience">
      <div className="container">
        <Pagetitle title="Experience" />
        <div className="row">
          <div className="col-md-6">
            <div className="timeline exp bg-white rounded shadow-dark padding-30 overflow-hidden">
              {experienceData1.map((experience) => (
                <Timeline key={experience.id} education={experience} />
              ))}
              <span className="line"></span>
            </div>
          </div>

          <div className="col-md-6">
            <div className="spacer d-md-none d-lg-none" data-height="30"></div>
            <div className="timeline exp bg-white rounded shadow-dark padding-30 overflow-hidden">
              {experienceData2.map((experience) => (
                <Timeline key={experience.id} education={experience} />
              ))}
              <span className="line"></span>
            </div>
          </div>

          <div className="mt-5 text-center">
            <p className="mb-0">
              View My Resume
              <br />
              <div className="mt-4">
                <a
                  style={{ marginRight: 10 }}
                  eventLabel="download_resume"
                  href="/Dashon-Howard-Resume.pdf"
                  onClick={downloadPdfHandler}
                  download
                  className="btn btn-default"
                >
                  Download CV
                </a>
                <a
                  href="/Dashon-Howard-Resume.pdf"
                  onClick={viewPdfHandler}
                  target="__dashonExt"
                  className="btn btn-default"
                >
                  View CV
                </a>
              </div>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Experiences;
