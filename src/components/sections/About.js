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
    `Hi! My name is Dashon Howard. I am a senior engineer and Digital Nomad who builds Desktop, Mobile and Web applications. ` +
    `During my 14+ years of experience as a full stack developer, I have acquired the skills and knowledge necessary to make your project a success.`,
};

const progressData = [
  {
    id: 1,
    title: ".NET",
    percantage: 90,
    progressColor: "#FFD15C",
  },
  {
    id: 2,
    title: "NodeJS",
    percantage: 85,
    progressColor: "#FF4C60",
  },
  {
    id: 3,
    title: "PHP",
    percantage: 80,
    progressColor: "#3A6CE9",
  },
  {
    id: 4,
    title: "ReactJS",
    percantage: 90,
    progressColor: "#7C6C45",
  },
  {
    id: 5,
    title: "Blockchain(MetaMask)",
    percantage: 50,
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
                      href="/Resume-Dashon-Howard-2024.pdf"
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
                      href="/Resume-Dashon-Howard-2024.pdf"
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
                  <div className="col-md-4">
                     <h3 className="mb-3">Digital Nomad</h3>
                     <p className="text-muted">Currently traveling the world while building top-tier software. Embracing the freedom of remote work and the inspiration of new cultures.</p>
                     <ul className="list-unstyled mt-3">
                        <li><i className="fas fa-map-marker-alt mr-2 text-primary"></i> Current Location: <strong>Tokyo, Japan</strong></li>
                        <li><i className="fas fa-plane-departure mr-2 text-primary"></i> Next Stop: <strong>Seoul, South Korea</strong></li>
                        <li><i className="fas fa-laptop-code mr-2 text-primary"></i> Working from: <strong>Anywhere with Coffee</strong></li>
                     </ul>
                  </div>
                  <div className="col-md-8">
                     <div className="nomad-map-container rounded overflow-hidden shadow-sm" style={{ border: "1px solid #eee", height: "250px", position: "relative" }}>
                        <img src="/images/map-light.png" alt="Travel Map" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.6 }} />
                        <div className="map-overlay d-flex align-items-center justify-content-center" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(108, 108, 229, 0.05)" }}>
                           <div className="text-center p-4 bg-white rounded shadow-lg border border-primary">
                              <i className="fas fa-globe-americas fa-3x text-primary mb-2"></i>
                              <p className="font-weight-bold m-0 text-dark">Building globally, living locally.</p>
                           </div>
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
