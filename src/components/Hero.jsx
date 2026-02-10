import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Hero.css";
import heroImage from "../assets/ProfileImg.jpg";
import { FaLaptopCode } from "react-icons/fa";


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
            <p className="hello-text">👋 Hello, I am </p>

            <h1 className="hero-title">
             Shehab Hany Helmy <span><FaLaptopCode/></span>
            </h1>

            <p className="hero-desc">
              Frontend Developer with 1+ year of hands-on
              experience. Completed 10+ frontend projects and gained real-world
              experience through 3+ internships. Specialized in building modern,
              responsive, and user-friendly web interfaces using HTML, CSS,
              JavaScript, Bootstrap, and React.<hr/>
              Focused on clean code,
              performance, and great user experience, delivering pixel-perfect,
              scalable, and production-ready interfaces.
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
