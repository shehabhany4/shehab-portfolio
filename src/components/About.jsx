import { useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./About.css";
import aboutImage from '../assets/moi.jpg';

const About = () => {

  useEffect(() => {
    const revealElements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target); 
          }
        });
      },
      { threshold: 0.1 }
    );

    revealElements.forEach(el => observer.observe(el));
  }, []);

  return (
    <section id="about" className="about-section">
      <Container>
        <Row className="align-items-center">
          <Col md={5} className="text-center reveal">
            <div className="about-img">
              <img src={aboutImage} alt="Shehab" loading="lazy" />
            </div>
          </Col>

          <Col md={7}>
            <h2 className="section-title text-center text-md-start reveal">
              Personal Information
            </h2>

            <Row className="info-list">
              <Col md={6}>
                <p className="reveal">📅 1/9/2005</p>
                <p className="reveal">📧 shehab.2005@outlook.com</p>
                <p className="reveal">📞 01097820873</p>
              </Col>

              <Col md={6}>
                <p className="reveal">🌍 Menofeya</p>
                <p className="reveal">🌐 Arabic & English</p>
                <p className="reveal">💼 Freelance: Available</p>
              </Col>
            </Row>

            <Button
              className="cv-btn reveal"
              href="https://drive.google.com/file/d/1egxTfPHVZdne1_ijyeXiiecCn8pyCEBY/view?usp=drive_link"
              download
            >
              View CV
            </Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default About;
