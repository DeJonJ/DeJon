import React, { useState } from "react";
import { FaArrowCircleUp, FaBars } from "react-icons/fa";
import { Link } from "react-scroll";
import "./Navbar.css";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuClick = () => {
    if (window.innerWidth <= 768) {
      setShowMenu(!showMenu);
    }
  };

  const handleTopClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className="navbar">
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
