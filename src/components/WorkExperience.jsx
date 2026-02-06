import React, { useEffect, useRef } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { FaBriefcase } from "react-icons/fa";
import "./WorkExperience.css";
import Puresoft from "../assets/Experience/Puresoft.jpg"
import Depi from "../assets/Experience/Depi.jpg"
import ITI from "../assets/Experience/ITI_Main_page.jpg"
import NTI from "../assets/Experience/NTI.jpg"

const experiences = [
  {
    id: 1,
    role: "Frontend Web Developer Intern",
    company: "PureSoft Company",
    duration: "Jan 2026 - Present",
    image: Puresoft,
    description: [
      "Developed responsive user interfaces using HTML, CSS, JavaScript, and React.",
      "Implemented reusable UI components and clean code practices.",
      "Collaborated with team members using Git & GitHub.",
      "Translated UI/UX designs into functional web pages.",
      "Improved frontend performance and user experience.",
    ],
  },
  {
    id: 2,
    role: "React Frontend Developer Trainee",
    company: "DEPI & MCIT Training Program",
    duration: "November 2025 - Present",
    image: Depi,
    description: [
      "Built projects using React, Bootstrap, and RESTful APIs.",
      "Learned best practices in state management and component structuring.",
      "Worked on team projects following agile methodology.",
    ],
  },
  {
    id: 3,
    role: "Front-End React Training",
    company: "ITI Training Program",
    duration: "Summer 2025",
    image: ITI,
    description: [
      "Mastered React.js fundamentals including component lifecycle, Hooks (useState, useEffect, useContext).",
      "Integrated REST APIs efficiently into React applications.",
    ],
  },
  {
    id: 4,
    role: "Full Stack Training",
    company: "NTI & ITIDA Training Program",
    duration: "Summer 2025",
    image: NTI,
    description: [
      "Built comprehensive full-stack web applications using HTML5, CSS3, JavaScript for frontend.",
      "Implemented backend technologies for server-side logic.",
    ],
  },
];

const WorkExperience = () => {
  const cardRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });
  }, []);

  return (
    <section id="work" className="work-section py-5">
      <Container>
        <h2 className="section-title text-center mb-5">💼 Work Experience</h2>
        
        <div className="timeline-container">
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              ref={(el) => (cardRefs.current[index] = el)}
              className={`timeline-item ${index % 2 === 0 ? "timeline-left" : "timeline-right"}`}
            >
              <div className="timeline-dot"></div>
              <div className="timeline-connector"></div>
              
              <Card className="work-card">
                <div className="card-content">
                  <div className="card-image">
                    <img src={exp.image} alt={exp.company} />
                  </div>
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>
                      <FaBriefcase className="me-2" />
                      {exp.role}
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {exp.company} | {exp.duration}
                    </Card.Subtitle>
                    <ul className="mt-2 mb-0 work-description">
                      {exp.description.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </Card.Body>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default WorkExperience;