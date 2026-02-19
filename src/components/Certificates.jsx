import React, { useEffect, useRef, useState } from "react";
import "./Certificates.css";
import { useLanguage } from "./LanguageContext";
import en from "../i18n/en.json";
import ar from "../i18n/ar.json";

import cert1  from "../assets/Certificates/c1.png";
import cert2  from "../assets/Certificates/c2.png";
import cert3  from "../assets/Certificates/c3.png";
import cert4  from "../assets/Certificates/c4.png";
import cert5  from "../assets/Certificates/c5.png";
import cert6  from "../assets/Certificates/c6.png";
import cert7  from "../assets/Certificates/c7.png";
import cert8  from "../assets/Certificates/c8.png";
import cert9  from "../assets/Certificates/c9.png";
import cert10 from "../assets/Certificates/c10.png";
import cert11 from "../assets/Certificates/c11.png";
import cert12 from "../assets/Certificates/c12.png";

const translations = { en, ar };

const certImages = {
  frontend:    [cert1, cert4, cert5, cert6, cert9],
  internships: [cert2, cert3],
  others:      [cert7, cert8, cert10, cert11, cert12],
};

const Certificates = () => {
  const { language } = useLanguage();
  const t = translations[language].certificates;

  const certificatesData = {
    frontend:    { label: t.frontend,    icon: "⚡", certs: certImages.frontend    },
    internships: { label: t.internships, icon: "🏢", certs: certImages.internships },
    others:      { label: t.others,      icon: "🎓", certs: certImages.others      },
  };

  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [activeCategory, setActiveCategory] = useState("frontend");
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(entry.target); }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleCategoryChange = (cat) => {
    if (cat === activeCategory || animating) return;
    setAnimating(true);
    setTimeout(() => { setActiveCategory(cat); setAnimating(false); }, 300);
  };

  const currentCerts = certificatesData[activeCategory].certs;

  const openModal  = (img, index) => { setSelectedCert(img); setSelectedIndex(index); };
  const closeModal = () => { setSelectedCert(null); setSelectedIndex(null); };

  const navigate = (dir) => {
    const newIndex = selectedIndex + dir;
    if (newIndex < 0 || newIndex >= currentCerts.length) return;
    setSelectedCert(currentCerts[newIndex]);
    setSelectedIndex(newIndex);
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (!selectedCert) return;
      if (e.key === "Escape")     closeModal();
      if (e.key === "ArrowRight") navigate(1);
      if (e.key === "ArrowLeft")  navigate(-1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedCert, selectedIndex]);

  return (
    <>
      <section id="certificates" ref={sectionRef} className={`cert-section ${isVisible ? "visible" : ""}`}>
        <div className="cert-bg">
          <div className="orb orb-1" /><div className="orb orb-2" /><div className="orb orb-3" />
          <div className="grid-lines" />
        </div>

        <div className="cert-container">
          <div className="cert-header">
            <div className="cert-eyebrow">
              <span className="eyebrow-line" />
              <span>{t.achievements}</span>
              <span className="eyebrow-line" />
            </div>
            <h2 className="cert-title">
              <span className="title-icon">🏆</span>
              <span>{t.title}</span>
            </h2>
            <p className="cert-subtitle">{t.subtitle}</p>
          </div>

          <div className="cert-tabs">
            {Object.entries(certificatesData).map(([key, val]) => (
              <button
                key={key}
                className={`cert-tab ${activeCategory === key ? "active" : ""}`}
                onClick={() => handleCategoryChange(key)}
              >
                <span className="tab-icon">{val.icon}</span>
                <span className="tab-label">{val.label}</span>
                <span className="tab-count">{val.certs.length}</span>
                {activeCategory === key && <span className="tab-active-bar" />}
              </button>
            ))}
          </div>

          <div className={`cert-grid ${animating ? "grid-exit" : "grid-enter"}`}>
            {currentCerts.map((img, index) => (
              <div
                key={index}
                className="cert-card"
                style={{ "--delay": `${index * 80}ms` }}
                onClick={() => openModal(img, index)}
              >
                <div className="cert-card-inner">
                  <div className="cert-img-wrap">
                    <img src={img} alt={`certificate-${index + 1}`} />
                    <div className="cert-shine" />
                  </div>
                  <div className="cert-card-overlay">
                    <div className="overlay-content">
                      <div className="overlay-icon">🔍</div>
                      <span>{t.view}</span>
                    </div>
                  </div>
                  <div className="cert-card-num">{String(index + 1).padStart(2, "0")}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedCert && (
        <div className="cert-modal-backdrop" onClick={closeModal}>
          <div className="cert-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-topbar">
              <span className="modal-counter">
                {String(selectedIndex + 1).padStart(2, "0")} / {String(currentCerts.length).padStart(2, "0")}
              </span>
              <span className="modal-category-label">
                {certificatesData[activeCategory].icon} {certificatesData[activeCategory].label}
              </span>
              <button className="modal-close" onClick={closeModal}>✕</button>
            </div>
            <div className="modal-img-area">
              <img src={selectedCert} alt="certificate-full" className="modal-img" />
            </div>
            <div className="modal-nav">
              <button className={`nav-btn ${selectedIndex === 0 ? "disabled" : ""}`} onClick={() => navigate(-1)} disabled={selectedIndex === 0}>
                ← {language === "ar" ? "السابق" : "Prev"}
              </button>
              <div className="modal-dots">
                {currentCerts.map((_, i) => (
                  <span key={i} className={`dot ${i === selectedIndex ? "active" : ""}`}
                    onClick={() => { setSelectedCert(currentCerts[i]); setSelectedIndex(i); }} />
                ))}
              </div>
              <button className={`nav-btn ${selectedIndex === currentCerts.length - 1 ? "disabled" : ""}`} onClick={() => navigate(1)} disabled={selectedIndex === currentCerts.length - 1}>
                {language === "ar" ? "التالي" : "Next"} →
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Certificates;