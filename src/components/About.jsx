import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./About.css";
import aboutImage from "../assets/moi.jpg";
import { useLanguage } from "./LanguageContext";
import en from "../i18n/en.json";
import ar from "../i18n/ar.json";

const translations = { en, ar };

const About = () => {
  const { language } = useLanguage();
  const t = translations[language].about;

  const personalInfo = [
    { emoji: "📅", label: t.birthday, value: "1 Sep 2005" },
    { emoji: "🌍", label: t.location, value: t.locationValue },
    { emoji: "📧", label: t.email, value: "shehab.2005@outlook.com", href: "mailto:shehab.2005@outlook.com" },
    { emoji: "📞", label: t.phone, value: "010 9782 0873", href: "tel:+201097820873" },
    { emoji: "🌐", label: t.languages, value: t.languagesValue },
    { emoji: "💼", label: t.freelance, value: t.available, badge: true },
  ];

  // ✅ FIX 3: أضفنا language للـ dependency array
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

    return () => observer.disconnect();
  }, [language]);

  return (
    <section id="about" className="about-section">
      <Container>
        <div className="section-title-wrapper reveal">
          <h2 className="section-title">{t.title}</h2>
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
            {/* ✅ FIX 1: النص مش بيتكرر في العربي */}
            <p className="about-bio reveal">
              {language === "ar" ? (
                t.bio
              ) : (
                t.bio.split("Frontend Developer").map((part, i) =>
                  i === 0 ? (
                    <span key={i}>
                      {part}
                      <strong>Frontend Developer</strong>
                    </span>
                  ) : (
                    <span key={i}>{part}</span>
                  )
                )
              )}
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
                      <a href={item.href} className="info-value">{item.value}</a>
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
                <span>{t.viewCV}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
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