import React, { useEffect } from "react";
import HeroSection from "./HeroSection";
import "./HeroSection.css";
import Navbar from "./Navbar";
import AboutMeSection from "./AboutMeSection";
import "./AboutMeSection.css";
import TechSkillsSection from "./TechSkillsSection";
import ProjectsSection from "./ProjectsSection";
import ContactMeSection from "./ContactMeSection";
import { gsap } from "gsap";

function App() {
  useEffect(() => {
    gsap.to("body", {
      duration: 1.5,
      scaleY: 1,
      ease: "power2.out",
      delay: 0.5,
      onComplete: () => {
        console.log("Animation completed!");
      },
    });
  }, []);

  return (
    <div>
      <Navbar />
      <HeroSection />
      <AboutMeSection />
      <TechSkillsSection />
      <ProjectsSection />
      <ContactMeSection />
    </div>
  );
}

export default App;
