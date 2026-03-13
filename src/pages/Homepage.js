import React, { useState } from "react";
import ReactCursorPosition from "react-cursor-position";
import { Element } from "react-scroll";
import Header from "../components/layouts/Header";
import About from "../components/sections/About";
import Blogs from "../components/sections/Blogs";
import Brandlogos from "../components/sections/Brandlogos";
import Contact from "../components/sections/Contact";
import Experiences from "../components/sections/Experiences";
import Herosection from "../components/sections/Herosection";
import Pricing from "../components/sections/Pricing";
import Services from "../components/sections/Services";
import Testimonials from "../components/sections/Testimonials";
import PortfolioSection from "../components/sections/PortfolioSection";
import TechStack from "../components/sections/TechStack";
import ChatBot from "../components/elements/ChatBot";

function Homepage() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [lightTheme, setLightTHeme] = useState(false);
  const headerToggler = (e) => {
    e.preventDefault();
    setToggleMenu(!toggleMenu);
  };

  document.addEventListener("click", function (e) {
    if (e.target.closest(".content")) {
      setToggleMenu(false);
    }
  });

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://dashon.co/#person",
        "name": "Dashon Howard",
        "jobTitle": "Senior Software Engineer",
        "url": "https://dashon.co/",
        "image": "https://dashon.co/images/dashon.jpg",
        "sameAs": [
          "https://github.com/dashon",
          "https://linkedin.com/in/dashonhoward"
        ],
        "description": "Senior Software Engineer with 14+ years of experience specializing in full-stack development, mobile apps, and scalable web solutions."
      },
      {
        "@type": "WebSite",
        "@id": "https://dashon.co/#website",
        "url": "https://dashon.co/",
        "name": "Dashon Howard | Senior Software Engineer",
        "publisher": { "@id": "https://dashon.co/#person" },
        "description": "Portfolio of Dashon Howard, a Senior Software Engineer."
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      <Header
        light={lightTheme}
        logoSource="/images/logo_v2.png"
        toggleMenu={toggleMenu}
        headerToggler={headerToggler}
      />
      <main className={toggleMenu ? "content open" : "content"}>
        <Element name="section-home">
          <ReactCursorPosition>
            <Herosection light={lightTheme} />
          </ReactCursorPosition>
        </Element>
        <Element name="section-about">
          <About />
        </Element>
        <Element name="section-services">
          <Services />
        </Element>
        <Element name="section-experiences">
          <Experiences />
        </Element>
        <Element name="section-portfolio">
          <PortfolioSection />
        </Element>
        <Element name="section-techstack">
          <TechStack />
        </Element>
        <Element name="section-contact">
          <Contact />
        </Element> 
        <div className="spacer" data-height="96"></div>
      </main>
      <ChatBot />
    </>
  );
}

export default Homepage;
