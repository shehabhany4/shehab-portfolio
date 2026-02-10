import React, { useEffect, useRef, useState } from "react";
import {
  FaHtml5, FaCss3Alt, FaJs, FaBootstrap, FaGithub,
  FaReact, FaNodeJs, FaCode, FaTools, FaBrain, FaUsers, FaJava,
} from "react-icons/fa";
import { SiTypescript, SiCplusplus } from "react-icons/si";
import { MdDevices } from "react-icons/md";
import { TbApi } from "react-icons/tb";
import { BiLogoVisualStudio } from "react-icons/bi";
import "./Skills.css";

const skillsCategories = [
  {
    id: 1,
    title: "Frontend Development",
    icon: <FaCode />,
    accentColor: "#6c63ff",
    accentLight: "rgba(108,99,255,0.12)",
    size: "large",         // spans 2 cols
    skills: [
      { name: "HTML5",             icon: <FaHtml5 />,           color: "#E34F26" },
      { name: "CSS3",              icon: <FaCss3Alt />,          color: "#264DE4" },
      { name: "JavaScript",        icon: <FaJs />,              color: "#F7DF1E" },
      { name: "TypeScript",        icon: <SiTypescript />,      color: "#3178C6" },
      { name: "React.js",          icon: <FaReact />,           color: "#61DAFB" },
      { name: "Bootstrap",         icon: <FaBootstrap />,       color: "#7952B3" },
      { name: "Node.js",           icon: <FaNodeJs />,          color: "#339933" },
      { name: "Responsive Design", icon: <MdDevices />,         color: "#4CAF50" },
    ],
  },
  {
    id: 2,
    title: "Tools & Technologies",
    icon: <FaTools />,
    accentColor: "#f06292",
    accentLight: "rgba(240,98,146,0.12)",
    size: "small",
    skills: [
      { name: "Git",          icon: <FaGithub />,             color: "#F05032" },
      { name: "GitHub",       icon: <FaGithub />,             color: "#181717" },
      { name: "VS Code",      icon: <BiLogoVisualStudio />,   color: "#007ACC" },
      { name: "RESTful APIs", icon: <TbApi />,                color: "#0d6efd" },
    ],
  },
  {
    id: 3,
    title: "CS Fundamentals",
    icon: <FaCode />,
    accentColor: "#26c6da",
    accentLight: "rgba(38,198,218,0.12)",
    size: "small",
    skills: [
      { name: "Java",                icon: <FaJava />,    color: "#007396" },
      { name: "C++",                 icon: <SiCplusplus />, color: "#00599C" },
      { name: "Software Engineering", text: "SE" },
      { name: "Database",            text: "DB" },
      { name: "OOP",                 text: "OOP" },
      { name: "Data Structures",     text: "DS" },
      { name: "Algorithms",          text: "ALG" },
    ],
  },
  {
    id: 4,
    title: "Soft Skills",
    icon: <FaBrain />,
    accentColor: "#ffb300",
    accentLight: "rgba(255,179,0,0.12)",
    size: "full",          // spans full width
    skills: [
      { name: "Teamwork",        icon: <FaUsers />,  color: "#ffb300" },
      { name: "Communication",   text: "COM" },
      { name: "Problem Solving", text: "PS" },
      { name: "Time Management", text: "TM" },
      { name: "Self-Learning",   text: "SL" },
      { name: "Collaboration",   text: "CLB" },
    ],
  },
];

const Skills = () => {
  const sectionRef  = useRef(null);
  const panelRefs   = useRef([]);
  const [visible, setVisible] = useState(new Set());

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
    panelRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className="sk-section" aria-label="Skills and Expertise">
      {/* Background decoration */}
      <div className="sk-bg" aria-hidden="true">
        <div className="sk-orb sk-orb-1" />
        <div className="sk-orb sk-orb-2" />
        <div className="sk-grid-dots" />
      </div>

      <div className="sk-container">
        {/* Header */}
        <header className="sk-header">
          <div className="sk-eyebrow">
            <span className="sk-eyebrow-num"></span>
            <span className="sk-eyebrow-line" />
            <span>Expertise</span>
          </div>
          <h2 className="sk-title">
            <span className="sk-title-icon">💻</span>
            Skills
            <span className="sk-title-dot">.</span>
          </h2>
          <p className="sk-subtitle">Technologies and tools I work with</p>
        </header>

        {/* Bento Grid */}
        <div className="sk-bento">
          {skillsCategories.map((cat, index) => (
            <article
              key={cat.id}
              ref={(el) => (panelRefs.current[index] = el)}
              data-index={index}
              data-size={cat.size}
              className={`sk-panel ${visible.has(index) ? "sk-panel--visible" : ""}`}
              style={{
                "--panel-delay":  `${index * 110}ms`,
                "--accent":       cat.accentColor,
                "--accent-light": cat.accentLight,
              }}
            >
              {/* Glow */}
              <div className="sk-panel__glow" />

              {/* Header */}
              <div className="sk-panel__header">
                <span className="sk-panel__icon">{cat.icon}</span>
                <div className="sk-panel__title-wrap">
                  <h3 className="sk-panel__title">{cat.title}</h3>
                  <span className="sk-panel__count">
                    {cat.skills.length} skills
                  </span>
                </div>
                <div className="sk-panel__accent-bar" />
              </div>

              {/* Divider */}
              <div className="sk-panel__divider" />

              {/* Skills */}
              <div className="sk-panel__chips">
                {cat.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="sk-chip"
                    style={{
                      "--chip-color":  skill.color || cat.accentColor,
                      "--chip-delay":  `${i * 50}ms`,
                    }}
                  >
                    {skill.icon && (
                      <span className="sk-chip__icon">{skill.icon}</span>
                    )}
                    {skill.text && (
                      <span className="sk-chip__badge">{skill.text}</span>
                    )}
                    <span className="sk-chip__name">{skill.name}</span>
                  </span>
                ))}
              </div>

              <span className="sk-panel__num">
                {String(index + 1).padStart(2, "0")}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;