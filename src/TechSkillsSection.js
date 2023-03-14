import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "./TechSkillsSection.css";
import htmlIcon from "./icons/html.svg";
import cssIcon from "./icons/css.svg";
import jsIcon from "./icons/js.svg";
import reactIcon from "./icons/react.svg";
import sqlIcon from "./icons/sql2.svg";
import wpIcon from "./icons/wp.svg";
import gsIcon from "./icons/gsap.svg";

function TechSkillsSection() {

  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          gsap.to(contentRef.current, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
          });
        }
      },
      {
        root: null,
        threshold: 0.5,
      }
    );

    observer.observe(sectionRef.current);

    return () => {
      observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section className="tech-skills" ref={sectionRef} >
      <h2>Tech Skills</h2>
      <div className="tech-icons-container" ref={contentRef} style={{ opacity: 0, transform: "translateY(50px)" }}>
        <div className="tech-icon">
          <img src={htmlIcon} alt="HTML Icon" />
          <p>HTML</p>
        </div>
        <div className="tech-icon">
          <img src={cssIcon} alt="CSS Icon" />
          <p>CSS</p>
        </div>
        <div className="tech-icon">
          <img src={jsIcon} alt="JavaScript Icon" />
          <p>JavaScript</p>
        </div>
        <div className="tech-icon">
          <img src={reactIcon} alt="React Icon" />
          <p>React</p>
        </div>
        <div className="tech-icon">
          <img src={gsIcon} alt="Gsap Icon" />
          <p>GSAP</p>
        </div>
        <div className="tech-icon">
          <img src={sqlIcon} alt="MySQL Icon" />
          <p>mySQL</p>
        </div>
        <div className="tech-icon">
          <img src={wpIcon} alt="WordPress Icon" />
          <p>WordPress</p>
        </div>
      </div>
    </section>
  );
}

export default TechSkillsSection;
