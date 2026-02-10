import React, { useEffect, useRef, useState } from "react";
import { FaBriefcase, FaCalendarAlt, FaBuilding, FaChevronRight } from "react-icons/fa";
import { MdWorkHistory } from "react-icons/md";
import "./WorkExperience.css";
import Puresoft from "../assets/Experience/Puresoft.jpg";
import Depi from "../assets/Experience/Depi.jpg";
import ITI from "../assets/Experience/ITI_Main_page.jpg";
import NTI from "../assets/Experience/NTI.jpg";

const experiences = [
  {
    id: 1,
    role: "Frontend Web Developer Intern",
    company: "PureSoft Company",
    duration: "Jan 2026 - Present",
    image: Puresoft,
    status: "current",
    color: "#6c63ff",
    colorLight: "rgba(108,99,255,0.12)",
    description: [
      "Developed responsive user interfaces using HTML, CSS, and JavaScript.",
      "Implemented reusable UI components and clean code practices.",
      "Collaborated with team members using Git & GitHub.",
      "Translated UI/UX designs into functional web pages.",
      "Improved frontend performance and user experience.",
    ],
    tags: ["Html", "Css", "JavaScript", "BootStrap"],
  },
  {
    id: 2,
    role: "React Frontend Developer Trainee",
    company: "DEPI & MCIT Training Program",
    duration: "November 2025 - Present",
    image: Depi,
    status: "current",
    color: "#f06292",
    colorLight: "rgba(240,98,146,0.12)",
    description: [
      "Built projects using React, Bootstrap, and RESTful APIs.",
      "Learned best practices in state management and component structuring.",
      "Worked on team projects following agile methodology.",
    ],
    tags: ["React", "Bootstrap", "REST APIs"],
  },
  {
    id: 3,
    role: "Front-End React Training",
    company: "ITI Training Program",
    duration: "Summer 2025",
    image: ITI,
    status: "completed",
    color: "#26c6da",
    colorLight: "rgba(38,198,218,0.12)",
    description: [
      "Mastered React.js fundamentals including component lifecycle, Hooks (useState, useEffect, useContext).",
      "Integrated REST APIs efficiently into React applications.",
    ],
    tags: ["React Hooks", "APIs"],
  },
  {
    id: 4,
    role: "Full Stack Training",
    company: "NTI & ITIDA Training Program",
    duration: "Summer 2025",
    image: NTI,
    status: "completed",
    color: "#ffb300",
    colorLight: "rgba(255,179,0,0.12)",
    description: [
      "Built comprehensive full-stack web applications using HTML5, CSS3, JavaScript for frontend.",
      "Implemented backend technologies for server-side logic.",
    ],
    tags: ["Full Stack", "JavaScript"],
  },
];

const WorkExperience = () => {
  const cardRefs = useRef([]);
  const [visible, setVisible] = useState(new Set());
  const [expandedCard, setExpandedCard] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const i = parseInt(e.target.dataset.index, 10);
            setVisible((prev) => new Set([...prev, i]));
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="work" className="we-section" aria-label="Work Experience">
      {/* Background decoration */}
      <div className="we-bg" aria-hidden="true">
        <div className="we-orb we-orb-1" />
        <div className="we-orb we-orb-2" />
        <div className="we-grid-dots" />
      </div>

      <div className="we-container">
        {/* Header */}
        <header className="we-header">
          <div className="we-eyebrow">
            <span className="we-eyebrow-num"></span>
            <span className="we-eyebrow-line" />
            <span>Journey</span>
          </div>
          <h2 className="we-title">
            <span className="we-title-icon">💼</span>
            Work Experience
            <span className="we-title-dot">.</span>
          </h2>
          <p className="we-subtitle">My professional journey and learning experiences</p>
        </header>

        {/* Timeline */}
        <div className="we-timeline">
          {/* Central line */}
          <div className="we-timeline__line" />

          {experiences.map((exp, index) => (
            <article
              key={exp.id}
              ref={(el) => (cardRefs.current[index] = el)}
              data-index={index}
              className={`we-card ${visible.has(index) ? "we-card--visible" : ""} ${
                index % 2 === 0 ? "we-card--left" : "we-card--right"
              }`}
              style={{
                "--card-delay": `${index * 150}ms`,
                "--card-color": exp.color,
                "--card-color-light": exp.colorLight,
              }}
            >
              {/* Timeline dot */}
              <div className="we-card__dot">
                <span className="we-card__dot-inner" />
              </div>

              {/* Card content */}
              <div className="we-card__content">
                {/* Glow effect */}
                <div className="we-card__glow" />

                {/* Status badge */}
                {exp.status === "current" && (
                  <div className="we-card__badge">
                    <span className="we-card__badge-pulse" />
                    Current
                  </div>
                )}

                {/* Image section */}
                <div className="we-card__image">
                  <img src={exp.image} alt={exp.company} />
                  <div className="we-card__image-overlay">
                    <MdWorkHistory />
                  </div>
                </div>

                {/* Info section */}
                <div className="we-card__body">
                  {/* Header */}
                  <div className="we-card__header">
                    <h3 className="we-card__role">
                      <FaBriefcase className="we-card__role-icon" />
                      {exp.role}
                    </h3>
                    <div className="we-card__meta">
                      <span className="we-card__company">
                        <FaBuilding /> {exp.company}
                      </span>
                      <span className="we-card__duration">
                        <FaCalendarAlt /> {exp.duration}
                      </span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="we-card__divider" />

                  {/* Description */}
                  <ul
                    className={`we-card__description ${
                      expandedCard === exp.id ? "we-card__description--expanded" : ""
                    }`}
                  >
                    {exp.description.map((item, idx) => (
                      <li key={idx}>
                        <FaChevronRight className="we-card__bullet" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* Expand button (only if more than 3 items) */}
                  {exp.description.length > 3 && (
                    <button
                      className="we-card__expand"
                      onClick={() =>
                        setExpandedCard(expandedCard === exp.id ? null : exp.id)
                      }
                      aria-expanded={expandedCard === exp.id}
                    >
                      {expandedCard === exp.id ? "Show Less" : "Show More"}
                      <FaChevronRight
                        className={`we-card__expand-icon ${
                          expandedCard === exp.id ? "we-card__expand-icon--rotated" : ""
                        }`}
                      />
                    </button>
                  )}

                  {/* Tags */}
                  <div className="we-card__tags">
                    {exp.tags.map((tag, idx) => (
                      <span key={idx} className="we-card__tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Background number */}
                <span className="we-card__num">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;