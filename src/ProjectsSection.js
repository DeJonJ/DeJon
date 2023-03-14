import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "./ProjectsSection.css";

function ProjectsSection() {
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

  const projects = [
    {
      name: "Ecommerce Website",
      description: "Ecommerce store built with HTML, CSS, JS, REACT, and Stripe integration. ",
      github: "https://github.com",
      image:
        "/workspace/DeJon/portfolio/portfolio1/src/screenshotweb.jpg",
      projectLink: "https://example.com",
    },
    {
      name: "Notion like App",
      description: "Note taking and task tracking app built with HTML CSS JS REACT",
      github: "https://github.com",
      image:
        "portfolio/portfolio1/src/my-profile-pic.jpg",
      projectLink: "https://example.com",
    },
  ];

  return (
    <section className="projects" ref={sectionRef}>
      <h2>Projects</h2>
      <div
        className="project-skills-container"
        ref={contentRef}
        style={{ opacity: 1, transform: "translateY(50px)" }}
      >
        <ul>
          {projects.map((project, index) => (
            <li className={index % 2 === 0 ? "left" : "right"} key={index}>
              <div className="project-info">
                <h3>{project.name}</h3>
                <a href={project.projectLink} target="_blank" rel="noopener noreferrer">
                <img src={project.image} alt={project.name} />
                </a>
                <p>{project.description}</p>
                <a href={project.github} target="_blank" rel="noopener noreferrer">Github</a>
              </div>
              <div className="project-image">
                
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default ProjectsSection;