import { useEffect, useRef } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import { FaGraduationCap, FaUniversity, FaCertificate, FaCalendarAlt } from "react-icons/fa";
import { SiGoogle } from "react-icons/si";
import "./Education.css";

const Education = () => {
  const cardRef = useRef(null);

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

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <section 
      id="education" 
      className="education-section py-5"
      aria-label="Education and Certifications"
    >
      <Container>
        <h2 className="section-title text-center mb-5">
          <span aria-hidden="true">🎓</span> Education
        </h2>

        <div className="education-card-wrapper" ref={cardRef}>
          <Card className="education-main-card">
            <div className="education-header">
              <div className="degree-icon">
                <FaGraduationCap />
              </div>
              <div className="degree-info">
                <h3 className="degree-title">Bachelor of Computer Science & Artificial Intelligence</h3>
                <div className="university-info">
                  <FaUniversity className="me-2" />
                  <span className="university-name">Benha University, Egypt</span>
                </div>
                <div className="duration-info">
                  <FaCalendarAlt className="me-2" />
                  <span>Expected Graduation: Present</span>
                </div>
              </div>
            </div>
            <Card.Body className="education-body">
              <Row>
                <Col md={12} className="mb-4">
                  <div className="education-subsection">
                    <h4 className="subsection-title">
                      <FaCertificate className="me-2" />
                      Student Activities
                    </h4>
                    <div className="certification-item">
                      <div className="cert-header">
                        <SiGoogle className="cert-icon" />
                        <div className="cert-details">
                          <h5 className="cert-name">Front-End Bootcamp</h5>
                          <p className="cert-issuer">
                            Google Developer Groups – Benha University
                          </p>
                          <p className="cert-date">
                            <FaCalendarAlt className="me-1" />
                            February 2nd - 6th, 2025 (36H)
                          </p>
                        </div>
                      </div>
                      <p className="cert-description">
                        Completed intensive bootcamp covering technical workshops and hands-on activities in frontend development.
                      </p>
                    </div>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </section>
  );
};

export default Education;