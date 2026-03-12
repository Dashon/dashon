import React from "react";
import Pagetitle from "../elements/Pagetitle";

const techStack = [
  { name: "TypeScript", icon: "fab fa-js", color: "#3178c6" },
  { name: "Node.js", icon: "fab fa-node-js", color: "#339933" },
  { name: "React / Next.js", icon: "fab fa-react", color: "#61dafb" },
  { name: ".NET / C#", icon: "fab fa-microsoft", color: "#512bd4" },
  { name: "PostgreSQL", icon: "fas fa-database", color: "#336791" },
  { name: "AWS", icon: "fab fa-aws", color: "#ff9900" },
  { name: "Docker", icon: "fab fa-docker", color: "#2496ed" },
  { name: "Terraform", icon: "fas fa-layer-group", color: "#7b42bc" }
];

function TechStack() {
  return (
    <section id="techstack" className="section-padding">
      <div className="container">
        <Pagetitle title="Tech Stack" />
        <div className="row g-4 justify-content-center">
          {techStack.map((tech, index) => (
            <div key={index} className="col-lg-3 col-md-4 col-6">
              <div className="tech-card p-4 rounded-4 text-center h-100 transition-all hover-translate-y shadow-sm hover-shadow-lg border border-light-subtle bg-white">
                <div className="icon-box mb-3 d-inline-flex align-items-center justify-content-center rounded-circle" style={{ width: "80px", height: "80px", backgroundColor: `${tech.color}15` }}>
                  <i className={`${tech.icon} fa-3x`} style={{ color: tech.color }}></i>
                </div>
                <h4 className="fw-bold mb-0 text-dark">{tech.name}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        .hover-translate-y:hover {
          transform: translateY(-10px);
        }
        .tech-card {
           transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
      `}} />
    </section>
  );
}

export default TechStack;
