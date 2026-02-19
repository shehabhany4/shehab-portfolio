import React, { useEffect, useRef, useState } from "react";
import {
  FaHtml5, FaCss3Alt, FaJs, FaBootstrap, FaReact,
  FaGithub, FaExternalLinkAlt, FaArrowRight,
} from "react-icons/fa";
import project1Image from "../assets/Projects/EBook.png";
import project2Image from "../assets/Projects/studying.png";
import project3Image from "../assets/Projects/MiniBrand.jpg";
import project4Image from "../assets/Projects/removeback.png";
import project5Image from "../assets/Projects/cruds.png";
import project6Image from "../assets/Projects/burger.png";
import "./Projects.css";
import { useLanguage } from "./LanguageContext";
import en from "../i18n/en.json";
import ar from "../i18n/ar.json";

const translations = { en, ar };

const projectImages = [project1Image, project2Image, project3Image, project4Image, project5Image, project6Image];
const projectLinks = [
  { github: "https://github.com/shehabhany4/Ebook_Store",        demo: "https://shehabhany4.github.io/Ebook_Store/" },
  { github: "https://github.com/shehabhany4/Studying-Online",    demo: "https://shehabhany4.github.io/Studying-Online/" },
  { github: "https://github.com/shehabhany4/Mini_Iti",           demo: "https://shehabhany4.github.io/Mini_Iti/" },
  { github: "https://github.com/shehabhany4/Remove_background",  demo: "https://shehabhany4.github.io/Remove_background/" },
  { github: "https://github.com/shehabhany4/products",           demo: "https://shehabhany4.github.io/products/" },
  { github: "https://github.com/shehabhany4/Burger_Website",     demo: "https://shehabhany4.github.io/Burger_Website/" },
];
const projectTools = [
  [{ icon: <FaHtml5 />, name: "HTML", color: "#E34F26" }, { icon: <FaCss3Alt />, name: "CSS", color: "#1572B6" }, { icon: <FaJs />, name: "JavaScript", color: "#F7DF1E" }, { icon: <FaReact />, name: "React", color: "#61DAFB" }, { icon: <FaBootstrap />, name: "Bootstrap", color: "#7952B3" }],
  [{ icon: <FaHtml5 />, name: "HTML", color: "#E34F26" }, { icon: <FaCss3Alt />, name: "CSS", color: "#1572B6" }, { icon: <FaJs />, name: "JavaScript", color: "#F7DF1E" }, { icon: <FaBootstrap />, name: "Bootstrap", color: "#7952B3" }],
  [{ icon: <FaHtml5 />, name: "HTML", color: "#E34F26" }, { icon: <FaCss3Alt />, name: "CSS", color: "#1572B6" }, { icon: <FaBootstrap />, name: "Bootstrap", color: "#7952B3" }],
  [{ icon: <FaHtml5 />, name: "HTML", color: "#E34F26" }, { icon: <FaCss3Alt />, name: "CSS", color: "#1572B6" }, { icon: <FaJs />, name: "JavaScript", color: "#F7DF1E" }],
  [{ icon: <FaHtml5 />, name: "HTML", color: "#E34F26" }, { icon: <FaCss3Alt />, name: "CSS", color: "#1572B6" }, { icon: <FaJs />, name: "JavaScript", color: "#F7DF1E" }],
  [{ icon: <FaHtml5 />, name: "HTML", color: "#E34F26" }, { icon: <FaCss3Alt />, name: "CSS", color: "#1572B6" }],
];

const Projects = () => {
  const { language } = useLanguage();
  const t = translations[language].projects;

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
            <span>{t.selectedWork}</span>
          </div>
          <h2 className="proj-heading">
            <span className="proj-heading-main">{t.title}</span>
            <span className="proj-heading-accent">.</span>
          </h2>
          <p className="proj-subheading">{t.subtitle}</p>
        </header>

        <div className="proj-grid">
          {t.items.map((project, index) => (
            <article
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
              data-index={index}
              className={`proj-card ${visibleCards.has(index) ? "proj-card--visible" : ""}`}
              style={{ "--enter-delay": `${index * 90}ms` }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="proj-card__index">{String(index + 1).padStart(2, "0")}</div>
              <div className="proj-card__category">{project.category}</div>

              <div className="proj-card__img-wrap">
                <img src={projectImages[index]} alt={project.title} loading="lazy" className="proj-card__img" />
                <div className="proj-card__img-overlay">
                  <a
                    href={projectLinks[index].demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="proj-card__live-btn"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FaExternalLinkAlt />
                    <span>{t.viewLive}</span>
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
                  {projectTools[index].map((tool, i) => (
                    <span key={i} className="proj-card__tool" style={{ "--tc": tool.color }} title={tool.name}>
                      <span className="tool-icon">{tool.icon}</span>
                      <span className="tool-name">{tool.name}</span>
                    </span>
                  ))}
                </div>

                <div className="proj-card__links">
                  <a href={projectLinks[index].github} target="_blank" rel="noopener noreferrer" className="proj-link proj-link--github">
                    <FaGithub /><span>{t.github}</span>
                  </a>
                  <a href={projectLinks[index].demo} target="_blank" rel="noopener noreferrer" className="proj-link proj-link--demo">
                    <FaExternalLinkAlt /><span>{t.liveDemo}</span>
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