import React, { useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import "./Certificates.css";

import cert1 from "../assets/Certificates/c1.png";
import cert2 from "../assets/Certificates/c2.png";
import cert3 from "../assets/Certificates/c3.png";
import cert4 from "../assets/Certificates/c4.png";
import cert5 from "../assets/Certificates/c5.png";
import cert6 from "../assets/Certificates/c6.png";
import cert7 from "../assets/Certificates/c7.png";
import cert8 from "../assets/Certificates/c8.png";
import cert9 from "../assets/Certificates/c9.png";
import cert10 from "../assets/Certificates/c10.png";
import cert11 from "../assets/Certificates/c11.png";
import cert12 from "../assets/Certificates/c12.png";

const certificatesData = {
  frontend: [cert1, cert4, cert5,cert6,cert9],
  internships: [cert2, cert3],
  others: [cert7,cert8,cert10,cert11,cert12],
};

const Certificates = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null);
  const [activeCategory, setActiveCategory] = useState("frontend");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section
        id="certificates"
        ref={sectionRef}
        className={`certificates-section ${isVisible ? "show" : ""}`}
      >
        <Container>
          <h2 className="section-title text-center mb-4">
            🏆 Certificates
          </h2>

          <div className="cert-tabs">
            <button
              className={activeCategory === "frontend" ? "active" : ""}
              onClick={() => setActiveCategory("frontend")}
            >
              frontend
            </button>

            <button
              className={activeCategory === "internships" ? "active" : ""}
              onClick={() => setActiveCategory("internships")}
            >
              Internships
            </button>

            <button
              className={activeCategory === "others" ? "active" : ""}
              onClick={() => setActiveCategory("others")}
            >
              Others
            </button>
          </div>

          <div className="certificates-grid">
            {certificatesData[activeCategory].map((img, index) => (
              <div
                className="certificate-card"
                key={index}
                onClick={() => setSelectedCert(img)}
              >
                <img src={img} alt={`certificate-${index}`} />
                <div className="view-overlay">
                  <button className="view-btn">
                    View Certificate
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {selectedCert && (
        <div
          className="certificate-modal"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-btn"
              onClick={() => setSelectedCert(null)}
            >
              ✕
            </button>
            <img src={selectedCert} alt="certificate-full" />
          </div>
        </div>
      )}
    </>
  );
};

export default Certificates;
