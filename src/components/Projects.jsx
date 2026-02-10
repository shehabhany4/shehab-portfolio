import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaBootstrap,
  FaReact,
  FaGithub,
  FaExternalLinkAlt,
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
    description: "Modern e-commerce platform for digital books",
    image: project1Image,
    github: "https://github.com/shehabhany4/Ebook_Store",
    demo: "https://shehabhany4.github.io/Ebook_Store/",
    tools: [
      { icon: <FaHtml5 />, name: "HTML", color: "#E34F26" },
      { icon: <FaCss3Alt />, name: "CSS", color: "#1572B6" },
      { icon: <FaJs />, name: "JavaScript", color: "#F7DF1E" },
      { icon: <FaReact />, name: "React", color: "#61DAFB" },
      { icon: <FaBootstrap />, name: "Bootstrap", color: "#7952B3" },
    ],
  },
  {
    id: 2,
    title: "Calculator App",
    description: "Clean and functional calculator application",
    image: project2Image,
    github: "https://github.com/shehabhany4/sky.stars",
    demo: "https://shehabhany4.github.io/CodeAlpha_Calculator/",
    tools: [
      { icon: <FaHtml5 />, name: "HTML", color: "#E34F26" },
      { icon: <FaCss3Alt />, name: "CSS", color: "#1572B6" },
      { icon: <FaJs />, name: "JavaScript", color: "#F7DF1E" },
    ],
  },
  {
    id: 3,
    title: "Landing Page",
    description: "Responsive and modern landing page design",
    image: project3Image,
    github: "https://github.com/shehabhany4/Mini_Iti",
    demo: "https://shehabhany4.github.io/Mini_Iti/",
    tools: [
      { icon: <FaHtml5 />, name: "HTML", color: "#E34F26" },
      { icon: <FaCss3Alt />, name: "CSS", color: "#1572B6" },
      { icon: <FaBootstrap />, name: "Bootstrap", color: "#7952B3" },
    ],
  },
  {
    id: 4,
    title: "Remove Background",
    description: "AI-powered background removal tool",
    image: project4Image,
    github: "https://github.com/shehabhany4/Remove_background",
    demo: "https://shehabhany4.github.io/Remove_background/",
    tools: [
      { icon: <FaHtml5 />, name: "HTML", color: "#E34F26" },
      { icon: <FaCss3Alt />, name: "CSS", color: "#1572B6" },
      { icon: <FaJs />, name: "JavaScript", color: "#F7DF1E" },
    ],
  },
  {
    id: 5,
    title: "CRUD Application",
    description: "Full-featured product management system",
    image: project5Image,
    github: "https://github.com/shehabhany4/products",
    demo: "https://shehabhany4.github.io/products/",
    tools: [
      { icon: <FaHtml5 />, name: "HTML", color: "#E34F26" },
      { icon: <FaCss3Alt />, name: "CSS", color: "#1572B6" },
      { icon: <FaJs />, name: "JavaScript", color: "#F7DF1E" },
    ],
  },
  {
    id: 6,
    title: "Burger Shop",
    description: "Restaurant website with modern UI",
    image: project6Image,
    github: "https://github.com/shehabhany4/Burger_Website",
    demo: "https://shehabhany4.github.io/Burger_Website/",
    tools: [
      { icon: <FaHtml5 />, name: "HTML", color: "#E34F26" },
      { icon: <FaCss3Alt />, name: "CSS", color: "#1572B6" },
    ],
  },
];

const Projects = () => {
  const sectionRef = useRef(null);
  const projectRefs = useRef([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      sectionObserver.observe(sectionRef.current);
    }

    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            cardObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    projectRefs.current.forEach((card) => {
      if (card) cardObserver.observe(card);
    });

    return () => {
      if (sectionRef.current) {
        sectionObserver.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="projects" 
      className={`projects-section ${isVisible ? "visible" : ""}`}
    >
      <Container>
        <div className="section-title-wrapper">
          <span className="title-tag">&lt;projects /&gt;</span>
          <h2 className="section-title">My Projects</h2>
          <p className="section-subtitle">
            A showcase of my recent work and experiments
          </p>
        </div>

        <Row className="projects-grid">
          {projects.map((project, index) => (
            <Col lg={4} md={6} sm={12} key={project.id} className="mb-4">
              <Card
                ref={(el) => (projectRefs.current[index] = el)}
                className="project-card"
                style={{ "--card-delay": `${index * 0.1}s` }}
              >
                <div className="project-img-wrapper">
                  <div className="img-overlay">
                    <div className="overlay-content">
                      <a 
                        href={project.demo} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="view-project-btn"
                      >
                        <FaExternalLinkAlt />
                        <span>View Live</span>
                      </a>
                    </div>
                  </div>
                  <Card.Img src={project.image} loading="lazy" alt={project.title} />
                </div>

                <Card.Body className="d-flex flex-column">
                  <div className="card-header-content">
                    <Card.Title>{project.title}</Card.Title>
                    <p className="project-description">{project.description}</p>
                  </div>

                  <div className="project-tools">
                    {project.tools.map((tool, i) => (
                      <span 
                        key={i} 
                        className="tool-item"
                        style={{ "--tool-color": tool.color }}
                      >
                        {tool.icon}
                        <small>{tool.name}</small>
                      </span>
                    ))}
                  </div>

                  <div className="project-links mt-auto">
                    <Button
                      variant="dark"
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="github-btn"
                    >
                      <FaGithub />
                      <span>GitHub</span>
                    </Button>
                    <Button
                      variant="outline-primary"
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="demo-btn"
                    >
                      <FaExternalLinkAlt />
                      <span>Demo</span>
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Projects;