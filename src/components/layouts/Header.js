import React from "react";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink, useLocation } from "react-router-dom";
import Logo from "../elements/Logo";

function Header({ light, logoSource, toggleMenu, headerToggler }) {
  const handleClasses = () => {
    let classes = "desktop-header-1 d-flex align-items-start flex-column";
    if (light & toggleMenu) {
      classes += " light open";
    } else if (toggleMenu) {
      classes += " open";
    } else if (light) {
      classes += " light";
    }
    return classes;
  };
  const handleMobileClasses = () => {
    let classes = "mobile-header-1";
    if (light & toggleMenu) {
      classes += " light open";
    } else if (toggleMenu) {
      classes += " open";
    } else if (light) {
      classes += " light";
    }
    return classes;
  };
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <>
      <header className={handleMobileClasses()}>
        <div className="container">
          <div className="menu-icon d-inline-flex mr-4">
            <button onClick={headerToggler}>
              <span></span>
            </button>
          </div>
          {/* <Logo logoSource={logoSource} /> */}
        </div>
      </header>
      <header className={handleClasses()}>
        <Logo logoSource={logoSource} />
        <nav>
          <ul className="vertical-menu scrollspy">
            {!isHomePage && (
              <li>
                <RouterLink to="/">
                  <i className="icon-home"></i>Home
                </RouterLink>
              </li>
            )}
            <li>
              <ScrollLink
                activeClass="active"
                to="section-about"
                spy={true}
                smooth={true}
                duration={500}
              >
                <i className="icon-user-following"></i>About
              </ScrollLink>
            </li>
            <li>
              <ScrollLink
                activeClass="active"
                to="section-services"
                spy={true}
                smooth={true}
                duration={500}
              >
                <i className="icon-briefcase"></i>Services
              </ScrollLink>
            </li>
            <li>
              <ScrollLink
                activeClass="active"
                to="section-experiences"
                spy={true}
                smooth={true}
                duration={500}
              >
                <i className="icon-graduation"></i>Experience
              </ScrollLink>
            </li>

            <li>
              <ScrollLink
                activeClass="active"
                to="section-portfolio"
                spy={true}
                smooth={true}
                duration={500}
              >
                <i className="icon-layers"></i>Portfolio
              </ScrollLink>
            </li>
            <li>
              <ScrollLink
                activeClass="active"
                to="section-contact"
                spy={true}
                smooth={true}
                duration={500}
              >
                <i className="icon-bubbles"></i>Contact
              </ScrollLink>
            </li> 
          </ul>
        </nav>

        <div className="footer">
          <span className="copyright">
            &copy; {new Date().getFullYear()} Dashon.co
          </span>
        </div>
      </header>
    </>
  );
}

export default Header;
