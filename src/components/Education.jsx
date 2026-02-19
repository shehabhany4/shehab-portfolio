import { useEffect, useRef } from "react";
import {
  FaGraduationCap, FaUniversity, FaCalendarAlt,
  FaMapMarkerAlt, FaMedal, FaCode,
} from "react-icons/fa";
import { SiGoogle } from "react-icons/si";
import "./Education.css";
import { useLanguage } from "./LanguageContext";
import en from "../i18n/en.json";
import ar from "../i18n/ar.json";

const translations = { en, ar };

const Education = () => {
  const { language } = useLanguage();
  const t = translations[language].education;

  const sectionRef = useRef(null);
  const cardRef    = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          cardRef.current?.classList.add("edu-card--visible");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="education" ref={sectionRef} className="edu-section" aria-label="Education and Certifications">
      <div className="edu-bg" aria-hidden="true">
        <div className="edu-orb edu-orb-1" />
        <div className="edu-orb edu-orb-2" />
        <div className="edu-halftone" />
      </div>

      <div className="edu-container">
        <header className="edu-header">
          <div className="edu-eyebrow">
            <span className="edu-eyebrow-num"></span>
            <span className="edu-eyebrow-line" />
            <span>{t.background}</span>
          </div>
          <h2 className="edu-title">
            <span className="edu-title-icon">🎓</span>
            {t.title}
            <span className="edu-title-dot">.</span>
          </h2>
          <p className="edu-subtitle">{t.subtitle}</p>
        </header>

        <div className="edu-card" ref={cardRef}>
          <aside className="edu-card__aside">
            <div className="edu-card__aside-inner">
              <div className="edu-aside__icon"><FaGraduationCap /></div>
              <ul className="edu-aside__meta">
                <li><span className="meta-icon"><FaUniversity /></span><span>{t.university}</span></li>
                <li><span className="meta-icon"><FaMapMarkerAlt /></span><span>{t.egypt}</span></li>
              </ul>
              <div className="edu-aside__badge">
                <span className="badge-label">{language === "ar" ? "الدرجة" : "Degree"}</span>
                <span className="badge-value">{t.degree}</span>
              </div>
              <span className="edu-aside__bg-text">CS</span>
            </div>
          </aside>

          <div className="edu-card__body">
            <div className="edu-degree-block">
              <p className="edu-degree-label">{t.degreeLabel}</p>
              <h3 className="edu-degree-name">
                {t.degreeName}<br />
                <em>{t.degreeAi}</em>
              </h3>
              <div className="edu-degree-tags">
                <span className="edu-tag">CS</span>
                <span className="edu-tag">AI</span>
                <span className="edu-tag">{language === "ar" ? "دوام كامل" : "Full Time"}</span>
              </div>
            </div>

            <div className="edu-divider">
              <span className="edu-divider-label">{t.coursework}</span>
            </div>

            <ul className="edu-courses">
              {t.courses.map((c, i) => (
                <li key={i} className="edu-course-item" style={{ "--ci": i }}>
                  <span className="course-dot" />
                  {c}
                </li>
              ))}
            </ul>

            <div className="edu-divider">
              <span className="edu-divider-label">{t.activity}</span>
            </div>

            <div className="edu-activity">
              <div className="edu-activity__icon-wrap"><SiGoogle /></div>
              <div className="edu-activity__content">
                <div className="edu-activity__top">
                  <div>
                    <h4 className="edu-activity__name">{t.bootcamp}</h4>
                    <p className="edu-activity__org">{t.gdg}</p>
                  </div>
                  <span className="edu-activity__date">
                    <FaCalendarAlt /> {t.bootcampDate}
                  </span>
                </div>
                <p className="edu-activity__desc">{t.bootcampDesc}</p>
                <div className="edu-activity__pills">
                  <span><FaCode />{t.hours}</span>
                  <span><FaMedal />{t.certificate}</span>
                  <span>{t.handson}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;