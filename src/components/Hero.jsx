import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Hero.css";
import heroImage from "../assets/ProfileImg.jpg";

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
      <Container>
        <Row className="align-items-center">
          <Col md={6} className="hero-text">
            <p className="hello-text">👋 Hello I am a</p>

            <h1 className="hero-title">
              Front-End Web Developer <span className="code-icon">{"</>"}</span>
            </h1>

            <p className="hero-desc">
              Hi, I’m Shehab Hany , a Frontend Developer with 1+ year of
              hands-on experience. Completed 10+ frontend projects and gained
              real-world experience through 3+ internship. Specialized in
              building modern, responsive, and user-friendly web interfaces
              using HTML, CSS, JavaScript, Bootstrap, and React. Focused on
              clean code, performance, and great user experience.
            </p>
          </Col>

          <Col md={6} className="text-center">
            <div className="image-wrapper">
              <img src={heroImage} alt="Shehab" loading="lazy" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Hero;
