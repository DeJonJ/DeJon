import React, { useState, useEffect } from "react";
import { FaArrowCircleUp, FaBars } from "react-icons/fa";
import { Link } from "react-scroll";
import "./Navbar.css";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleMenuClick = () => {
    if (window.innerWidth <= 768) {
      setShowMenu(!showMenu);
    }
  };

  const handleTopClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const [navbarBlack, setNavbarBlack] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setNavbarBlack(true);
    } else {
      setNavbarBlack(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar ${navbarBlack ? "navbarBlack" : ""}`}>
      <div className="navbar-left">
        <a href="/">dejon.dev</a>
      </div>
      <div className="navbar-right">
        <button className="menu-icon" onClick={handleMenuClick}>
          <FaBars />
        </button>
        <ul className={`menu-links ${showMenu ? "show" : ""}`}>
          <li>
            <Link
              to="about-section"
              smooth={true}
              duration={500}
              offset={-70}
              onClick={handleMenuClick}
            >
              About Me
            </Link>
          </li>
          <li>
            <Link
              to="tech-skills"
              smooth={true}
              duration={500}
              offset={-70}
              onClick={handleMenuClick}
            >
              Tech Skills
            </Link>
          </li>
          <li>
            <Link
              to="projects"
              smooth={true}
              duration={500}
              offset={-70}
              onClick={handleMenuClick}
            >
              Projects
            </Link>
          </li>
          <li>
            <Link
              to="contact-me"
              smooth={true}
              duration={500}
              offset={-70}
              onClick={handleMenuClick}
            >
              Contact Me
            </Link>
          </li>
        </ul>
        
      </div>
    </nav>
  );
};

export default Navbar;
