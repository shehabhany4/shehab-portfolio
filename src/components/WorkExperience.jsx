import React, { useEffect, useRef, useState } from "react";
import { FaBriefcase, FaCalendarAlt, FaBuilding, FaChevronRight } from "react-icons/fa";
import { MdWorkHistory } from "react-icons/md";
import "./WorkExperience.css";
import Puresoft from "../assets/Experience/Puresoft.jpg";
import Depi from "../assets/Experience/Depi.jpg";
import ITI from "../assets/Experience/ITI_Main_page.jpg";
import NTI from "../assets/Experience/NTI.jpg";
import { useLanguage } from "./LanguageContext";
import en from "../i18n/en.json";
import ar from "../i18n/ar.json";

const translations = { en, ar };
const images = [Puresoft, Depi, ITI, NTI];
const colors = [
  { color: "#6c63ff", colorLight: "rgba(108,99,255,0.12)" },
  { color: "#f06292", colorLight: "rgba(240,98,146,0.12)" },
  { color: "#26c6da", colorLight: "rgba(38,198,218,0.12)" },
  { color: "#ffb300", colorLight: "rgba(255,179,0,0.12)" },
];
const statuses = ["current", "current", "completed", "completed"];
const tags = [
  ["Html", "Css", "JavaScript", "BootStrap"],
  ["React", "Bootstrap", "REST APIs"],
  ["React Hooks", "APIs"],
  ["Full Stack", "JavaScript"],
];

const WorkExperience = () => {
  const { language } = useLanguage();
  const t = translations[language].experience;

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
      <div className="we-bg" aria-hidden="true">
        <div className="we-orb we-orb-1" />
        <div className="we-orb we-orb-2" />
        <div className="we-grid-dots" />
      </div>

      <div className="we-container">
        <header className="we-header">
          <div className="we-eyebrow">
            <span className="we-eyebrow-num"></span>
            <span className="we-eyebrow-line" />
            <span>{t.journey}</span>
          </div>
          <h2 className="we-title">
            <span className="we-title-icon">💼</span>
            {t.title}
            <span className="we-title-dot">.</span>
          </h2>
          <p className="we-subtitle">{t.subtitle}</p>
        </header>

        <div className="we-timeline">
          <div className="we-timeline__line" />

          {t.jobs.map((exp, index) => (
            <article
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
              data-index={index}
              className={`we-card ${visible.has(index) ? "we-card--visible" : ""} ${
                index % 2 === 0 ? "we-card--left" : "we-card--right"
              }`}
              style={{
                "--card-delay": `${index * 150}ms`,
                "--card-color": colors[index].color,
                "--card-color-light": colors[index].colorLight,
              }}
            >
              <div className="we-card__dot">
                <span className="we-card__dot-inner" />
              </div>

              <div className="we-card__content">
                <div className="we-card__glow" />

                {statuses[index] === "current" && (
                  <div className="we-card__badge">
                    <span className="we-card__badge-pulse" />
                    {t.current}
                  </div>
                )}

                <div className="we-card__image">
                  <img src={images[index]} alt={exp.company} />
                  <div className="we-card__image-overlay"><MdWorkHistory /></div>
                </div>

                <div className="we-card__body">
                  <div className="we-card__header">
                    <h3 className="we-card__role">
                      <FaBriefcase className="we-card__role-icon" />
                      {exp.role}
                    </h3>
                    <div className="we-card__meta">
                      <span className="we-card__company"><FaBuilding /> {exp.company}</span>
                      <span className="we-card__duration"><FaCalendarAlt /> {exp.duration}</span>
                    </div>
                  </div>

                  <div className="we-card__divider" />

                  <ul className={`we-card__description ${expandedCard === index ? "we-card__description--expanded" : ""}`}>
                    {exp.description.map((item, idx) => (
                      <li key={idx}>
                        <FaChevronRight className="we-card__bullet" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  {exp.description.length > 3 && (
                    <button
                      className="we-card__expand"
                      onClick={() => setExpandedCard(expandedCard === index ? null : index)}
                      aria-expanded={expandedCard === index}
                    >
                      {expandedCard === index ? t.showLess : t.showMore}
                      <FaChevronRight className={`we-card__expand-icon ${expandedCard === index ? "we-card__expand-icon--rotated" : ""}`} />
                    </button>
                  )}

                  <div className="we-card__tags">
                    {tags[index].map((tag, idx) => (
                      <span key={idx} className="we-card__tag">{tag}</span>
                    ))}
                  </div>
                </div>

                <span className="we-card__num">{String(index + 1).padStart(2, "0")}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;