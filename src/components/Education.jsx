import { useEffect, useRef } from "react";
import {
  FaGraduationCap, FaUniversity, FaCalendarAlt,
  FaMapMarkerAlt, FaMedal, FaCode,
} from "react-icons/fa";
import { SiGoogle } from "react-icons/si";
import "./Education.css";

const courses = [
  "Data Structures & Algorithms",
  "Object-Oriented Programming",
  "Database Systems",
  "Software Engineering",
  "Operating Systems",
  "Computer Networks",
  "Artificial Intelligence",
  "Web Development",
];

const Education = () => {
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
    <section
      id="education"
      ref={sectionRef}
      className="edu-section"
      aria-label="Education and Certifications"
    >
      {/* Ambient BG */}
      <div className="edu-bg" aria-hidden="true">
        <div className="edu-orb edu-orb-1" />
        <div className="edu-orb edu-orb-2" />
        <div className="edu-halftone" />
      </div>

      <div className="edu-container">
        {/* ── Header ── */}
        <header className="edu-header">
          <div className="edu-eyebrow">
            <span className="edu-eyebrow-num"></span>
            <span className="edu-eyebrow-line" />
            <span>Background</span>
          </div>
          <h2 className="edu-title">
            <span className="edu-title-icon">🎓</span>
            Education
            <span className="edu-title-dot">.</span>
          </h2>
          <p className="edu-subtitle">Academic foundation &amp; professional development</p>
        </header>

        {/* ── Main Card ── */}
        <div className="edu-card" ref={cardRef}>

          {/* LEFT accent panel */}
          <aside className="edu-card__aside">
            <div className="edu-card__aside-inner">

              {/* Big icon */}
              <div className="edu-aside__icon">
                <FaGraduationCap />
              </div>

              {/* Meta tags */}
              <ul className="edu-aside__meta">
                <li>
                  <span className="meta-icon"><FaUniversity /></span>
                  <span>Benha University</span>
                </li>
                <li>
                  <span className="meta-icon"><FaMapMarkerAlt /></span>
                  <span>Egypt</span>
                </li>
                <li>
                  <span className="meta-icon"><FaCalendarAlt /></span>
                  <span>Currently Enrolled</span>
                </li>
              </ul>

              {/* Degree badge */}
              <div className="edu-aside__badge">
                <span className="badge-label">Degree</span>
                <span className="badge-value">B.Sc.</span>
              </div>

              {/* Decorative number */}
              <span className="edu-aside__bg-text">CS</span>
            </div>
          </aside>

          {/* RIGHT content panel */}
          <div className="edu-card__body">

            {/* Degree block */}
            <div className="edu-degree-block">
              <p className="edu-degree-label">Bachelor of Science in</p>
              <h3 className="edu-degree-name">
                Computer Science &amp;<br />
                <em>Artificial Intelligence</em>
              </h3>
              <div className="edu-degree-tags">
                <span className="edu-tag">CS</span>
                <span className="edu-tag">AI</span>
                <span className="edu-tag">Full Time</span>
              </div>
            </div>

            {/* Divider */}
            <div className="edu-divider">
              <span className="edu-divider-label">Coursework</span>
            </div>

            {/* Coursework grid */}
            <ul className="edu-courses">
              {courses.map((c, i) => (
                <li
                  key={i}
                  className="edu-course-item"
                  style={{ "--ci": i }}
                >
                  <span className="course-dot" />
                  {c}
                </li>
              ))}
            </ul>

            {/* Divider */}
            <div className="edu-divider">
              <span className="edu-divider-label">Student Activity</span>
            </div>

            {/* Bootcamp card */}
            <div className="edu-activity">
              <div className="edu-activity__icon-wrap">
                <SiGoogle />
              </div>

              <div className="edu-activity__content">
                <div className="edu-activity__top">
                  <div>
                    <h4 className="edu-activity__name">Front-End Bootcamp</h4>
                    <p className="edu-activity__org">
                      Google Developer Groups — Benha University
                    </p>
                  </div>
                  <span className="edu-activity__date">
                    <FaCalendarAlt />
                    Feb 2–6, 2025
                  </span>
                </div>

                <p className="edu-activity__desc">
                  Intensive 36-hour bootcamp covering technical workshops and
                  hands-on activities in modern frontend development.
                </p>

                <div className="edu-activity__pills">
                  <span><FaCode />36 Hours</span>
                  <span><FaMedal />Certificate</span>
                  <span>Hands-on</span>
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