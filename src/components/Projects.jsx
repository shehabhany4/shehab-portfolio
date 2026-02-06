import React, { useEffect, useRef } from "react";
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
  const projectRefs = useRef([]);

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

    projectRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });
  }, []);

  return (
    <section id="projects" className="projects-section">
      <Container>
        <h2 className="section-title text-center mb-5">🚀 Projects</h2>
        <Row>
          {projects.map((project, index) => (
            <Col md={4} sm={6} key={project.id} className="mb-4">
              <Card
                ref={(el) => (projectRefs.current[index] = el)}
                className="project-card"
              >
                <div className="project-img-wrapper">
                  <Card.Img src={project.image} loading="lazy" />
                </div>

                <Card.Body className="d-flex flex-column">
                  <Card.Title>{project.title}</Card.Title>

                  <div className="project-tools mb-3">
                    {project.tools.map((tool, i) => (
                      <span key={i} className="tool-item">
                        <span style={{ color: tool.color }}>{tool.icon}</span>
                        <small>{tool.name}</small>
                      </span>
                    ))}
                  </div>

                  <div className="project-links mt-auto">
                    <Button
                      variant="dark"
                      href={project.github}
                      target="_blank"
                    >
                      <FaGithub className="me-2" />
                      GitHub
                    </Button>
                    <Button
                      variant="outline-primary"
                      href={project.demo}
                      target="_blank"
                    >
                      <FaExternalLinkAlt className="me-2" />
                      Live Demo
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
