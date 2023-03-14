import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowCircleUp } from "@fortawesome/free-solid-svg-icons";
import { gsap } from "gsap";

gsap.to("body", {
  duration: 1.5,
  scaleY: 1,
  ease: "power2.out",
  delay: 0.5,
  onComplete: () => {
    console.log("Animation completed!");
  },
});

library.add(faArrowCircleUp);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


