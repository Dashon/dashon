import React from "react";
import { Link } from "react-scroll";
import Pagetitle from "../elements/Pagetitle";
import Service from "../elements/Service";

const servicesData = [
  {
    id: 1,
    icon: "images/service-2.svg",
    title: "Full Stack Web Development",
    content:
      "I am a software engineer with experience in Desktop, Mobile and Web applications. I have over 14 years of experience building with numerous versions of the .Net Framework, including 5 years with NodeJS and 6 years with PHP. In addition, I have many years of experience building with prominent front-end languages and CMS frameworks (HTML, CSS, and JS).",
    color: "#6C6CE5",
    contentColor: "light",
  },
  {
    id: 2,
    icon: "images/cloud.png",
    title: "Healthcare IT",
    content:
      "I have 11 years experience working with EHR systems, medical devices using languages such as SMART on FHIR and HL7.",
    color: "#F9D74C",
    contentColor: "dark",
  },
  {
    id: 3,
    icon: "images/Solidity.png",
    title: "Blockchain Development",
    content:
      "Collaborated with colleagues from other departments and participated in the creation and testing of new  Blockchain technologies",
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
