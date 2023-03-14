import React, { useEffect, useRef} from "react";
import gsap from "gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

function HeroSection() {

  const titleRef = useRef(null);

  useEffect(() => {
    const title = titleRef.current;
    const text = title.textContent;
    title.textContent = "";

    const tl = gsap.timeline();
    tl.to(title, {
      duration: 0.5,
      opacity: 1,
    });
    for (let i = 0; i < text.length; i++) {
      tl.to(title, {
        duration: 0.05,
        textContent: text.substr(0, i + 1),
      });
    }
  }, []);

  return (
    <section className="hero">
      <h1 className="hero-title" ref={titleRef}>
        Front-End Developer <span role="img" aria-label="waving hand">👋</span>
      </h1>
      <p className="hero-subtitle">
        Hi, I'm DeJon Johnson, a passionate Front-end Developer based in Detroit, MI.{" "}
        <span role="img" aria-label="location">📍</span>
      </p>
      <div className="hero-icons">
        <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faGithub} color="black" size="2x"/>
        </a>
        <a href="https://www.linkedin.com/in/dejon-johnson-0679b0113/" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faLinkedin} color="black" size="2x" />
        </a>
      </div>
    </section>
  );
}

export default HeroSection;