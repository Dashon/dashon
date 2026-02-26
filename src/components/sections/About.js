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
    `Hi! My name is Dashon Howard. I am a senior engineer who builds Desktop, Mobile and Web applications. ` +
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
