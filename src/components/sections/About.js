import React from "react";
import TrackVisibility from "react-on-screen";
import Counter from "../elements/Counter";
import Pagetitle from "../elements/Pagetitle";
import Skill from "../elements/Skill";

const aboutContent = {
  name: "Dashon",
  avatarImage: "/images/dashon.png",
  content:
    `Hi! My name is Dashon Howard. I am a senior engineer who builds Desktop, Mobile and Web applications. During my 14+ years of experience as a full stack developer, I have acquired the skills and knowledge necessary to make your project a success.`
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
    progressColor: "#6C6CE5",
  },
  {
    id: 3,
    title: "ReactJS",
    percantage: 90,
    progressColor: "#6C6CE5",
  },
  {
    id: 3,
    title: "Blockchain",
    percantage: 50,
    progressColor: "#6C6CE5",
  },
];
const yearsOfExperience = new Date().getFullYear() - 2007;
const coffeesPerDay = 1.7
const workdaysInAYear = 261
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
    count: 8,
    icon: "icon-briefcase",
  },
  {
    id: 3,
    title: "Clients Satisfied",
    count: 29,
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
  return (
    <section id="about">
      <div className="container">
        <Pagetitle title="About Me" />
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
                    <a href="/Resume-Dashon-Howard.pdf" download className="btn btn-default">
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
