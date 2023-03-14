import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import myProfilePic from "./my-profile-pic.jpg";
import "./AboutMeSection.css";

function AboutMeSection() {
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
    <section className="about-section" ref={sectionRef}>
      <div className="about-img">
        <img src={myProfilePic} alt="Profile Pic" />
      </div>
      <h2>About Me</h2>
      <div className="about-paragraph" ref={contentRef} style={{ opacity: 0, transform: "translateY(50px)" }}>
        <p>
          Hi, I'm DeJon and I create user-friendly experiences that solve
          problems and meet the needs of clients. With a a keen eye for design,
          I have honed my skills in crafting elegant, efficient, and engaging
          web applications. I strive to stay up-to-date with the latest industry
          trends and best practices to ensure that my work is always at the
          forefront of innovation. When I'm not coding, you can find me
          exploring new destinations around the world, looking for new music to
          add to my collection, or just enjoying some downtime with a good book
          or movie.
        </p>
      </div>
    </section>
  );
}

export default AboutMeSection;
