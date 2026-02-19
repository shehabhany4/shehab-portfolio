import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Hero.css";
import heroImage from "../assets/ProfileImg.jpg";
import { useLanguage } from "./LanguageContext";
import en from "../i18n/en.json";
import ar from "../i18n/ar.json";
import {
  FaLaptopCode,
  FaFacebook,
  FaLinkedin,
  FaGithub,
  FaInstagram,
  FaWhatsapp,
  FaComments,
} from "react-icons/fa";

const translations = { en, ar };

const socialLinks = [
  { icon: <FaFacebook />, href: "https://www.facebook.com/shehab.alshbeny", label: "Facebook", color: "#1877F2" },
  { icon: <FaLinkedin />, href: "https://www.linkedin.com/in/shehab-hany", label: "LinkedIn", color: "#0A66C2" },
  { icon: <FaGithub />, href: "https://github.com/shehabhany4", label: "GitHub", color: "#333" },
  { icon: <FaInstagram />, href: "https://www.instagram.com/shehabhany4", label: "Instagram", color: "#E1306C" },
  { icon: <FaWhatsapp />, href: "https://wa.me/201097820873", label: "WhatsApp", color: "#25D366" },
];

const Hero = () => {
  const { language } = useLanguage();
  const t = translations[language].hero;
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [socialOpen, setSocialOpen] = useState(false);
  const socialRef = useRef(null);

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (socialRef.current && !socialRef.current.contains(e.target)) {
        setSocialOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
              <span className="badge-text">{t.available}</span>
            </div>
            <p className="hello-text">{t.hello}</p>
            <h1 className="hero-title">
              {t.user}{" "}
              <span className="title-icon">
                <FaLaptopCode />
              </span>
            </h1>
            <p className="hero-desc">{t.desc}</p>
            <div className="hero-buttons">
              <a href="#projects" className="btn-primary">{t.viewWork}</a>
              <a href="#contact" className="btn-secondary">{t.getInTouch}</a>
            </div>
          </Col>

          <Col md={6} className="text-center px-4">
            <div className="image-col-wrapper">
              <div className="image-wrapper">
                <div className="img-ring img-ring--outer"></div>
                <div className="img-ring img-ring--inner"></div>
                <div className="img-glow"></div>
                <div className="img-particles">
                  <span className="particle particle--1"></span>
                  <span className="particle particle--2"></span>
                </div>
                <img src={heroImage} alt="Shehab" loading="lazy" />

                <div
                  className={`social-fab-wrapper ${socialOpen ? "open" : ""}`}
                  ref={socialRef}
                >
                  {socialLinks.map((s, i) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="social-fan-item"
                      style={{
                        "--social-color": s.color,
                        "--fan-index": i,
                      }}
                      onClick={() => setSocialOpen(false)}
                    >
                      {s.icon}
                      <span className="fan-tooltip">{s.label}</span>
                    </a>
                  ))}

                  <button
                    className="social-fab-btn"
                    onClick={() => setSocialOpen(!socialOpen)}
                    aria-label="Toggle social links"
                  >
                    <FaComments className={`fab-icon ${socialOpen ? "rotated" : ""}`} />
                  </button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Hero;