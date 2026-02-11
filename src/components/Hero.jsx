import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Hero.css";
import heroImage from "../assets/ProfileImg.jpg";
import {
  FaLaptopCode,
  FaFacebook,
  FaLinkedin,
  FaGithub,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";

const socialLinks = [
  {
    icon: <FaFacebook />,
    href: "https://www.facebook.com/shehab.alshbeny",
    label: "Facebook",
    color: "#1877F2",
  },
  {
    icon: <FaLinkedin />,
    href: "https://www.linkedin.com/in/shehab-hany",
    label: "LinkedIn",
    color: "#0A66C2",
  },
  {
    icon: <FaGithub />,
    href: "https://github.com/shehabhany4",
    label: "GitHub",
    color: "#333",
  },
  {
    icon: <FaInstagram />,
    href: "https://www.instagram.com/shehabhany4",
    label: "Instagram",
    color: "#E1306C",
  },
  {
    icon: <FaWhatsapp />,
    href: "https://wa.me/201097820873",
    label: "WhatsApp",
    color: "#25D366",
  },
];

const Hero = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className={`hero-section ${isVisible ? "show" : ""}`}
    >
      <Container fluid className="px-0">
        <Row className="align-items-center mx-0">
          <Col md={6} className="hero-text px-4">
          <div className="available-badge">
                <span className="badge-dot"></span>
                <span className="badge-icon">✨</span>
                <span className="badge-text">Available for work</span>
              </div>
            <p className="hello-text"> Hello, I am </p>
            <h1 className="hero-title">
              Shehab Hany Helmy{" "}
              <span className="title-icon">
                <FaLaptopCode />
              </span>
            </h1>
            <p className="hero-desc">
              Frontend Developer crafting modern, responsive, and user-friendly
              web interfaces. Focused on clean code, performance, and
              pixel-perfect, scalable, production-ready projects.
            </p>
            <div className="hero-buttons">
                <a href="#projects" className="btn-primary">
                  View My Work
                </a>
                <a href="#contact" className="btn-secondary">
                  Get In Touch
                </a>
              </div>
          </Col>
          <Col md={6} className="text-center px-4">
            <div className="image-col-wrapper">
              <div className="image-wrapper">
                <div className="img-ring img-ring--outer"></div>
                <div className="img-ring img-ring--middle"></div>
                <div className="img-ring img-ring--inner"></div>
                <div className="img-glow"></div>
                <div className="img-particles">
                  <span className="particle particle--1"></span>
                  <span className="particle particle--2"></span>
                </div>
                <img src={heroImage} alt="Shehab" loading="lazy" />
              </div>
              <div className="social-strip">
                {socialLinks.map((s, i) => (
                   <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="social-icon"
                    style={{
                      "--social-color": s.color,
                      "--social-delay": `${0.55 + i * 0.1}s`,
                    }}
                  >
                    {s.icon}
                    <span className="social-tooltip">{s.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Hero;