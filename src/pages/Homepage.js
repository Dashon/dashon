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

  return (
    <>
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
