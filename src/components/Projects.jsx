import React, { useEffect, useRef, useState } from "react";
import {
  FaHtml5, FaCss3Alt, FaJs, FaBootstrap, FaReact,
  FaGithub, FaExternalLinkAlt, FaArrowRight,
} from "react-icons/fa";

import project1Image from "../assets/Projects/EBook.png";
import project2Image from "../assets/Projects/calculator.png";
import project3Image from "../assets/Projects/MiniBrand.jpg";
import project4Image from "../assets/Projects/removeback.png";
import project5Image from "../assets/Projects/cruds.png";
import project6Image from "../assets/Projects/burger.png";

import "./Projects.css";

const projects = [
  {
    id: 1,
    title: "E-Book Store",
    description: "Modern e-commerce platform for digital books with cart & filtering.",
    image: project1Image,
    github: "https://github.com/shehabhany4/Ebook_Store",
    demo: "https://shehabhany4.github.io/Ebook_Store/",
    category: "E-Commerce",
    tools: [
      { icon: <FaHtml5 />, name: "HTML",       color: "#E34F26" },
      { icon: <FaCss3Alt />, name: "CSS",       color: "#1572B6" },
      { icon: <FaJs />,      name: "JavaScript", color: "#F7DF1E" },
      { icon: <FaReact />,   name: "React",      color: "#61DAFB" },
      { icon: <FaBootstrap />, name: "Bootstrap", color: "#7952B3" },
    ],
  },
  {
    id: 2,
    title: "Calculator App",
    description: "Clean functional calculator with keyboard support and history log.",
    image: project2Image,
    github: "https://github.com/shehabhany4/sky.stars",
    demo: "https://shehabhany4.github.io/CodeAlpha_Calculator/",
    category: "Utility",
    tools: [
      { icon: <FaHtml5 />,  name: "HTML",        color: "#E34F26" },
      { icon: <FaCss3Alt />, name: "CSS",         color: "#1572B6" },
      { icon: <FaJs />,     name: "JavaScript",   color: "#F7DF1E" },
    ],
  },
  {
    id: 3,
    title: "Landing Page",
    description: "Responsive modern landing page with smooth scroll & animations.",
    image: project3Image,
    github: "https://github.com/shehabhany4/Mini_Iti",
    demo: "https://shehabhany4.github.io/Mini_Iti/",
    category: "UI Design",
    tools: [
      { icon: <FaHtml5 />,    name: "HTML",      color: "#E34F26" },
      { icon: <FaCss3Alt />,  name: "CSS",       color: "#1572B6" },
      { icon: <FaBootstrap />, name: "Bootstrap", color: "#7952B3" },
    ],
  },
  {
    id: 4,
    title: "Remove Background",
    description: "AI-powered background removal tool with instant preview.",
    image: project4Image,
    github: "https://github.com/shehabhany4/Remove_background",
    demo: "https://shehabhany4.github.io/Remove_background/",
    category: "AI Tool",
    tools: [
      { icon: <FaHtml5 />,  name: "HTML",       color: "#E34F26" },
      { icon: <FaCss3Alt />, name: "CSS",        color: "#1572B6" },
      { icon: <FaJs />,     name: "JavaScript",  color: "#F7DF1E" },
    ],
  },
  {
    id: 5,
    title: "CRUD Application",
    description: "Full-featured product management system with local storage.",
    image: project5Image,
    github: "https://github.com/shehabhany4/products",
    demo: "https://shehabhany4.github.io/products/",
    category: "Web App",
    tools: [
      { icon: <FaHtml5 />,  name: "HTML",       color: "#E34F26" },
      { icon: <FaCss3Alt />, name: "CSS",        color: "#1572B6" },
      { icon: <FaJs />,     name: "JavaScript",  color: "#F7DF1E" },
    ],
  },
  {
    id: 6,
    title: "Burger Shop",
    description: "Restaurant website with modern UI, menu showcase & ordering flow.",
    image: project6Image,
    github: "https://github.com/shehabhany4/Burger_Website",
    demo: "https://shehabhany4.github.io/Burger_Website/",
    category: "Restaurant",
    tools: [
      { icon: <FaHtml5 />,  name: "HTML", color: "#E34F26" },
      { icon: <FaCss3Alt />, name: "CSS", color: "#1572B6" },
    ],
  },
];

const Projects = () => {
  const sectionRef = useRef(null);
  const cardRefs   = useRef([]);
  const [visibleCards, setVisibleCards] = useState(new Set());
  const [hoveredCard, setHoveredCard]   = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = parseInt(entry.target.dataset.index, 10);
            setVisibleCards((prev) => new Set([...prev, idx]));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="proj-section">
      <div className="proj-bg" aria-hidden="true">
        <div className="proj-orb proj-orb-1" />
        <div className="proj-orb proj-orb-2" />
        <div className="proj-noise" />
      </div>

      <div className="proj-container">
        <header className="proj-header">
          <div className="proj-eyebrow">
            <span className="proj-eyebrow-num"></span>
            <span className="proj-eyebrow-divider" />
            <span>Selected Work</span>
          </div>

          <h2 className="proj-heading">
            <span className="proj-heading-main">My Projects</span>
            <span className="proj-heading-accent">.</span>
          </h2>

          <p className="proj-subheading">
            A curated showcase of interfaces, tools &amp; experiments
          </p>
        </header>

        <div className="proj-grid">
          {projects.map((project, index) => (
            <article
              key={project.id}
              ref={(el) => (cardRefs.current[index] = el)}
              data-index={index}
              className={`proj-card ${visibleCards.has(index) ? "proj-card--visible" : ""}`}
              style={{ "--enter-delay": `${index * 90}ms` }}
              onMouseEnter={() => setHoveredCard(project.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="proj-card__index">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="proj-card__category">{project.category}</div>

              <div className="proj-card__img-wrap">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="proj-card__img"
                />
                <div className="proj-card__img-overlay">
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="proj-card__live-btn"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FaExternalLinkAlt />
                    <span>View Live</span>
                    <FaArrowRight className="arrow-icon" />
                  </a>
                </div>
              </div>

              <div className="proj-card__body">
                <div className="proj-card__info">
                  <h3 className="proj-card__title">{project.title}</h3>
                  <p className="proj-card__desc">{project.description}</p>
                </div>

                <div className="proj-card__tools">
                  {project.tools.map((tool, i) => (
                    <span
                      key={i}
                      className="proj-card__tool"
                      style={{ "--tc": tool.color }}
                      title={tool.name}
                    >
                      <span className="tool-icon">{tool.icon}</span>
                      <span className="tool-name">{tool.name}</span>
                    </span>
                  ))}
                </div>

                <div className="proj-card__links">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="proj-link proj-link--github"
                  >
                    <FaGithub />
                    <span>GitHub</span>
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="proj-link proj-link--demo"
                  >
                    <FaExternalLinkAlt />
                    <span>Live Demo</span>
                  </a>
                </div>
              </div>

              <div className="proj-card__glow" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;