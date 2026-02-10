import React, { useEffect, useState } from "react";
import {
  FaLaptopCode,
  FaFacebook,
  FaLinkedin,
  FaGithub,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import "./Hero.css";
import heroImage from "../assets/ProfileImg.jpg";

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
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(true);
    }, 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section
      id="home"
      className={`hero-section ${visible ? "hero-section--visible" : ""}`}
    >
      {/* Background */}
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-orb hero-orb--1" />
        <div className="hero-orb hero-orb--2" />
        <div className="hero-grid" />
      </div>

      <div className="hero-container">
        <div className="hero-content">
          {/* Text Side */}
          <div className="hero-text">
            {/* Badge */}
            <div className="hero-badge">
              <span className="hero-badge__pulse" />
              <HiSparkles />
              <span>Available for work</span>
            </div>

            {/* Greeting */}
            <div className="hero-greeting">
              <span className="hero-greeting__wave">👋</span>
              <span>Hello, I'm</span>
            </div>

            {/* Name */}
            <h1 className="hero-name">
              Shehab Hany
              <span className="hero-name__dot">.</span>
            </h1>

            {/* Title */}
            <div className="hero-title">
              <FaLaptopCode className="hero-title__icon" />
              <h2>Frontend Developer</h2>
            </div>

            {/* Description */}
            <p className="hero-description">
              Crafting modern, responsive web interfaces with clean code and
              pixel-perfect precision. Building scalable, production-ready
              projects.
            </p>

            {/* CTA Buttons */}
            <div className="hero-actions">
              <a href="#work" className="hero-btn hero-btn--primary">
                View My Work
              </a>
              <a href="#contact" className="hero-btn hero-btn--secondary">
                Get In Touch
              </a>
            </div>
          </div>

          {/* Image Side */}
          <div className="hero-visual">
            <div className="hero-image-wrapper">
              {/* Rings */}
              <div className="hero-ring hero-ring--1" />
              <div className="hero-ring hero-ring--2" />
              
              {/* Glow */}
              <div className="hero-glow" />

              {/* Image */}
              <div className="hero-image">
                <img src={heroImage} alt="Shehab Hany" />
              </div>
            </div>

            {/* Social Links */}
            <div className="hero-social">
              {socialLinks.map((social, index) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="hero-social__link"
                  style={{
                    "--social-color": social.color,
                    "--social-delay": `${0.8 + index * 0.1}s`,
                  }}
                >
                  {social.icon}
                  <span className="hero-social__tooltip">{social.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;