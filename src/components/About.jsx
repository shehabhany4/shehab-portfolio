import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./About.css";
import aboutImage from "../assets/moi.jpg";

const personalInfo = [
  { emoji: "📅", label: "Birthday", value: "1 Sep 2005" },
  { emoji: "🌍", label: "Location", value: "Menofeya, Egypt" },
  {
    emoji: "📧",
    label: "Email",
    value: "shehab.2005@outlook.com",
    href: "mailto:shehab.2005@outlook.com",
  },
  {
    emoji: "📞",
    label: "Phone",
    value: "010 9782 0873",
    href: "tel:+201097820873",
  },
  { emoji: "🌐", label: "Languages", value: "Arabic & English" },
  { emoji: "💼", label: "Freelance", value: "Available", badge: true },
];

const About = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
  }, []);

  return (
    <section id="about" className="about-section">
      <Container>
        <div className="section-title-wrapper reveal">
          <h2 className="section-title">About Me</h2>
        </div>

        <Row className="align-items-center g-5">
          <Col md={4} className="text-center reveal">
            <div className="about-img-wrapper">
              <div className="img-ring" />
              <div className="about-img">
                <img src={aboutImage} alt="Shehab" loading="lazy" />
              </div>
              <div className="img-dot img-dot--1" />
              <div className="img-dot img-dot--2" />
            </div>
          </Col>

          <Col md={8}>
            <p className="about-bio reveal">
              I’m a passionate <strong>Frontend Developer</strong> from Egypt with 1+ year of
              hands-on experience crafting modern, responsive web interfaces.
              I’ve completed 10+ projects and gained real-world experience
              through 3+ internships. I love turning ideas into clean,
              performant, and pixel-perfect experiences using HTML, CSS,
              JavaScript, Bootstrap, and React.
            </p>

            <div className="info-grid">
              {personalInfo.map((item, i) => (
                <div
                  className="info-item reveal"
                  key={i}
                  style={{ "--reveal-delay": `${i * 0.07}s` }}
                >
                  <span className="info-emoji">{item.emoji}</span>
                  <div className="info-content">
                    <span className="info-label">{item.label}</span>
                    {item.href ? (
                      <a href={item.href} className="info-value">
                        {item.value}
                      </a>
                    ) : item.badge ? (
                      <span className="info-value">
                        <span className="available-badge">● {item.value}</span>
                      </span>
                    ) : (
                      <span className="info-value">{item.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="reveal" style={{ "--reveal-delay": "0.5s" }}>
              <a
                className="cv-btn"
                href="https://drive.google.com/file/d/1egxTfPHVZdne1_ijyeXiiecCn8pyCEBY/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>View CV</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="12" y1="11" x2="12" y2="17" />
                  <polyline points="9 14 12 17 15 14" />
                </svg>
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default About;
