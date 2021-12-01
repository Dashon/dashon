import React from "react";
import Pagetitle from "../elements/Pagetitle";
import Timeline from "../elements/Timeline";
import ReactGA from 'react-ga';

const educationData = [
  {
    id: 1,
    title: "Golf Coast Solutions (Contract)",
    years: "May 2021 - Present",
    content:
      "Responsible for the full-stack development of various applications using .NET, NodeJS and ReactJS."
  },
  {
    id: 2,
    title: "Kaden Health (Contract)",
    years: "Feb 2017 - May 2021",
    content:
      ("Assisted in the completion of a Video Conferencing app for mental health patients" +
        "The application used Laravel(PHP), ReactJS, MongoDB, and OpenVidu API. As well as speech analysis " +
        "and machine learning techniques to assist the therapist by identifying important moments of the session.")
  },
  {
    id: 3,
    title: "ChopDawg (Contract)",
    years: "May 2020 - Jan 2021",
    content:
      "Worked with a team of contractors on various projects, primarily using, NodeJS, Laravel, ReactJS, and SQL. " +
      "Led the development of a blockchain application that utilized Solidity contracts, web3JS, and Metamask interfacing with smart home devices. ",
  },
  {
    id: 4,
    title: "Harris Fitness (Contract)",
    years: "Oct 2019 - May 2020",
    content:
      "Working with a great team of professionals to deliver a solution for workplace safety. " +
      "The product utilizes wearable technology to precisely identify task-based risk for cumulative" +
      "trauma (overuse injuries) through characterization of muscle demand physiology."
  },
];

const experienceData = [{
  id: 1,
  title: "Lextech Global Services (Contract)",
  years: "May 2019 - Sep 2019",
  content:
    "Responsible for the support and development of a PHP Laravel single page web application. While I was primarily " +
    "responsible for backend development, I also assisted in frontend enhancements and some Mobile support."
},
{
  id: 2,
  title: "Merge Design & Interactive",
  years: "May 2017 - Apr 2019",
  content:
    "Assisted in the development of multiple brochure websites built using modular architecture " +
    "using various content management systems. Using HandlebarsJS, ReactJS, SQL, Wordpress, Kentico CMS, NodeJS and .NET.",
},
{
  id: 3,
  title: "Orthogonal",
  years: "Nov 2013 - May 2017",
  content:
    "Working with a great team of medical software professionals, building exciting applications for industry leaders " +
    "using an array of languages, including .NET, NodeJS, PHP, Ruby, Swift, Java, SQL, ReactJS and AngularJS. I Assistant " +
    "in the development of multiple mobile applications that captures and displays data from medical devices over Bluetooth LE."
},
{
  id: 4,
  title: "Virtual OfficeWare Healthcare Solutions",
  years: "Oct 2007 - Nov 2013 ",
  content:
    "Introduced a C# ASP.NET MVC web application that runs automatic compatibility tests on Crystal Reports against multiple " +
    "versions of Centricity EMR. I introduced an ASP.NET MVC web application that uses C# & VB to convert medical intake forms " +
    "into HTML & CSS. I also conducted monthly 3-Day end-user training classes with healthcare professionals",
}
];

const viewPdfHandler = () => {
  ReactGA.event({
    category: 'resume',
    action: "view_file"
  });
}
const downloadPdfHandler = () => {
  ReactGA.event({
    category: 'resume',
    action: "download_file"
  });
}

function Experiences() {
  return (
    <section id="experience">
      <div className="container">
        <Pagetitle title="Experience" />
        <div className="row">
          <div className="col-md-6">
            <div className="timeline edu bg-white rounded shadow-dark padding-30 overflow-hidden">
              {educationData.map((education) => (
                <Timeline key={education.id} education={education} />
              ))}
              <span className="line"></span>
            </div>
          </div>

          <div className="col-md-6">
            <div className="spacer d-md-none d-lg-none" data-height="30"></div>
            <div className="timeline exp bg-white rounded shadow-dark padding-30 overflow-hidden">
              {experienceData.map((experience) => (
                <Timeline key={experience.id} education={experience} />
              ))}
              <span className="line"></span>
            </div>
          </div>

          <div className="mt-5 text-center">
            <p className="mb-0">
              View My Resume<br />
              <div className="mt-4">

                <a style={{marginRight:10}} eventLabel="download_resume" href="/Resume-Dashon-Howard.pdf" onClick={downloadPdfHandler} download className="btn btn-default">
                  Download CV
                    </a>
                <a href="/Resume-Dashon-Howard.pdf" onClick={viewPdfHandler} target="__dashonExt" className="btn btn-default">
                  View CV</a>
              </div>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Experiences;
