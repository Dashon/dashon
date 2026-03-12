import React from "react";
import { Link } from "react-scroll";
import Pagetitle from "../elements/Pagetitle";
import Service from "../elements/Service";

const servicesData = [
  {
    id: 1,
    icon: "images/service-2.svg",
    title: "LLM & AI Engineering",
    content:
      "I design and ship production LLM workflows including agents, RAG/retrieval pipelines, tool-use patterns, evaluation harnesses, and vendor integrations. I help teams move fast on AI features without sacrificing reliability or maintainability.",
    color: "#6C6CE5",
    contentColor: "light",
  },
  {
    id: 2,
    icon: "images/cloud.png",
    title: "Full-Stack Product Development",
    content:
      "End-to-end product engineering across TypeScript/Node, React/Next.js, .NET/C#, PostgreSQL, and AWS. I build and ship complete systems — APIs, frontends, cloud infrastructure, and CI/CD — with a focus on rapid iteration and production-grade quality.",
    color: "#F9D74C",
    contentColor: "dark",
  },
  {
    id: 3,
    icon: "images/service-2.svg",
    title: "Fractional Lead Engineering",
    content:
      "Senior technical execution without the overhead. I embed as a fractional lead to drive architecture decisions, unblock teams, rescue stalled projects, and scale delivery — from early-stage startups to established product orgs.",
    color: "#F97B8B",
    contentColor: "light",
  },
];

function Services() {
  return (
    <section id="services">
      <div className="container">
        <Pagetitle title="Services" />
        <div className="row fix-spacing">
          {servicesData.map((service) => (
            <div className="col-md-4" key={service.id}>
              <Service service={service} />
            </div>
          ))}
        </div>
        <div className="mt-5 text-center">
          <p className="mb-0">
            Looking for a custom job?<br/>
            <Link
              className="btn btn-default"
              to="section-contact"
              spy={true}
              smooth={true}
              duration={500}
            >
              Hire me
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Services;
