import React, { useEffect, useRef } from "react";
import { Container, Card } from "react-bootstrap";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaBootstrap,
  FaGithub,
  FaReact,
  FaNodeJs,
  FaCode,
  FaTools,
  FaBrain,
  FaUsers
} from "react-icons/fa";
import { SiTypescript } from "react-icons/si";
import { MdDevices } from "react-icons/md";
import { TbApi } from "react-icons/tb";
import { BiLogoVisualStudio } from "react-icons/bi";
import { SiCplusplus } from "react-icons/si";
import { FaJava } from "react-icons/fa";
import "./Skills.css";

const skillsCategories = [
  {
    id: 1,
    title: "Frontend Development",
    icon: <FaCode />,
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    skills: [
      { name: "HTML5", icon: <FaHtml5 />, color: "#E34F26" },
      { name: "CSS3", icon: <FaCss3Alt />, color: "#264DE4" },
      { name: "JavaScript", icon: <FaJs />, color: "#F7DF1E" },
      { name: "TypeScript", icon: <SiTypescript />, color: "#3178C6" },
      { name: "React.js", icon: <FaReact />, color: "#61DAFB" },
      { name: "Bootstrap", icon: <FaBootstrap />, color: "#7952B3" },
      { name: "Node.js", icon: <FaNodeJs />, color: "#339933" },
      { name: "Responsive Design", icon: <MdDevices />, color: "#4CAF50" },
    ],
  },
  {
    id: 2,
    title: "Tools & Technologies",
    icon: <FaTools />,
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    skills: [
      { name: "Git", icon: <FaGithub />, color: "#F05032" },
      { name: "GitHub", icon: <FaGithub />, color: "#181717" },
      { name: "VS Code", icon: <BiLogoVisualStudio />, color: "#007ACC" },
      { name: "RESTful APIs", icon: <TbApi />, color: "#0d6efd" },
    ],
  },
  {
    id: 3,
    title: "Programming & CS Fundamentals",
    icon: <FaCode />,
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    skills: [
      { name: "Java", icon: <FaJava />, color: "#007396" },
      { name: "C++", icon: <SiCplusplus />, color: "#00599C" },
      { name: "Software Engineering", text: "SE" },
      { name: "Data Base", text: "DB" },
      { name: "OOP", text: "OOP" },
      { name: "Data Structures", text: "DS" },
      { name: "Algorithms", text: "ALG" },
    ],
  },
  {
    id: 4,
    title: "Soft Skills",
    icon: <FaBrain />,
    gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    skills: [
      { name: "Teamwork", icon: <FaUsers /> },
      { name: "Communication", text: "COM" },
      { name: "Problem Solving", text: "PS" },
      { name: "Time Management", text: "TM" },
      { name: "Self-Learning", text: "SL" },
      { name: "Collaboration", text: "CLB" },
    ],
  },
];

const Skills = () => {
  const cardRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.2, rootMargin: "50px" }
    );

    const currentRefs = cardRefs.current;
    currentRefs.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      currentRefs.forEach((card) => {
        if (card) observer.unobserve(card);
      });
    };
  }, []);

  return (
    <section 
      id="skills" 
      className="skills-section py-5"
      aria-label="Skills and Expertise"
    >
      <Container>
        <h2 className="section-title text-center mb-5">
          <span aria-hidden="true">💻</span> Skills
        </h2>

        <div className="timeline-container" role="list">
          {skillsCategories.map((category, index) => (
            <article
              key={category.id}
              ref={(el) => (cardRefs.current[index] = el)}
              className={`timeline-item ${
                index % 2 === 0 ? "timeline-left" : "timeline-right"
              }`}
              role="listitem"
            >
              <div className="timeline-dot" aria-hidden="true"></div>
              <div className="timeline-connector" aria-hidden="true"></div>

              <Card className="skill-category-card">
                <div className="card-content">
                  <div 
                    className="card-header-section"
                    style={{ background: category.gradient }}
                  >
                    <div className="category-icon">
                      {category.icon}
                    </div>
                    <h3 className="category-title">{category.title}</h3>
                  </div>
                  
                  <Card.Body>
                    <div className="skills-grid">
                      {category.skills.map((skill, idx) => (
                        <div key={idx} className="skill-badge">
                          {skill.icon && (
                            <span 
                              className="skill-icon" 
                              style={{ color: skill.color }}
                            >
                              {skill.icon}
                            </span>
                          )}
                          {skill.text && (
                            <span className="skill-text-badge">
                              {skill.text}
                            </span>
                          )}
                          <span className="skill-name">{skill.name}</span>
                        </div>
                      ))}
                    </div>
                  </Card.Body>
                </div>
              </Card>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Skills;