import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import "./ContactMeSection.css";

function ContactMeSection() {


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
    <section className="contact-me" ref={sectionRef} >
      <h2>Contact Me</h2>
      <div className="contact-me-container" ref={contentRef} style={{ opacity: 0, transform: "translateY(50px)" }}>
      <form>
        <label className="form-label">
          Name:
          <input type="text" name="name" className="form-input" />
        </label>
        <label className="form-label">
          Email:
          <input type="email" name="email" className="form-input" />
        </label>
        <label className="form-label">
          Message:
          <textarea name="message" className="form-input"></textarea>
        </label>
        <button type="submit" className="form-submit-button">Send</button>
      </form>
      </div>
    </section>
  );
}

export default ContactMeSection;
