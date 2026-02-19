import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane, faEnvelope, faMapMarkerAlt, faPhone,
  faCircleCheck, faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import {
  faLinkedin, faGithub, faFacebook, faInstagram, faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import emailjs from "@emailjs/browser";
import "./Contact.css";
import { useLanguage } from "./LanguageContext";
import en from "../i18n/en.json";
import ar from "../i18n/ar.json";

const translations = { en, ar };

const socialLinks = [
  { icon: faLinkedin,  href: "https://www.linkedin.com/in/shehab-hany",          color: "#0A66C2", label: "LinkedIn"  },
  { icon: faGithub,    href: "https://github.com/shehabhany4",                   color: "#333",    label: "GitHub"   },
  { icon: faFacebook,  href: "https://www.facebook.com/shehab.alshbeny",         color: "#1877F2", label: "Facebook" },
  { icon: faInstagram, href: "https://www.instagram.com/shehabhany4",            color: "#E1306C", label: "Instagram"},
  { icon: faWhatsapp,  href: "https://wa.me/201097820873",                       color: "#25D366", label: "WhatsApp" },
];

const Contact = () => {
  const { language } = useLanguage();
  const t = translations[language].contact;

  const contactInfo = [
    { icon: faEnvelope,     text: "shehab.2005@outlook.com", href: "mailto:shehab.2005@outlook.com", label: "Email"    },
    { icon: faPhone,        text: "+20 109 782 0873",         href: "https://wa.me/201097820873",    label: "Phone"    },
    { icon: faMapMarkerAlt, text: "Egypt 🇪🇬",               href: null,                             label: "Location" },
  ];

  const [showToast, setShowToast] = useState(false);
  const [success, setSuccess]     = useState(true);
  const [loading, setLoading]     = useState(false);
  const [formErrors, setFormErrors]   = useState({});
  const [touched, setTouched]         = useState({});

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) { entry.target.classList.add("active"); observer.unobserve(entry.target); }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const validateEmail   = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validateName    = (name)  => name.trim().length >= 2;
  const validateMessage = (msg)   => msg.trim().length >= 10;

  const validateField = (name, value) => {
    switch (name) {
      case "user_name":  return validateName(value)    ? "" : t.nameError;
      case "user_email": return validateEmail(value)   ? "" : t.emailError;
      case "message":    return validateMessage(value) ? "" : t.messageError;
      default: return "";
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setFormErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (touched[name]) setFormErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const errors = {
      user_name:  validateField("user_name",  form.user_name.value),
      user_email: validateField("user_email", form.user_email.value),
      message:    validateField("message",    form.message.value),
    };
    setFormErrors(errors);
    setTouched({ user_name: true, user_email: true, message: true });
    if (Object.values(errors).some((err) => err !== "")) return;

    setLoading(true);
    try {
      const serviceId  = import.meta.env.VITE_EMAILJS_SERVICE_ID  || "service_9mi6s4d";
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_updrdf6";
      const publicKey  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  || "ocx_KR4JoaE9LVd-3";
      await emailjs.sendForm(serviceId, templateId, form, publicKey);
      setSuccess(true); setShowToast(true);
      form.reset(); setFormErrors({}); setTouched({});
    } catch {
      setSuccess(false); setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section id="contact" className="contact-section">
        <Container>
          <div className="section-title-wrapper reveal">
            <h2 className="section-title">{t.title}</h2>
            <p className="section-subtitle">{t.subtitle}</p>
          </div>

          <Row className="g-4 align-items-stretch">
            <Col lg={5} className="reveal">
              <div className="info-card h-100">
                <h3 className="info-heading">{t.letsConnect}</h3>
                <p className="info-subtext">{t.openTo}</p>

                <div className="contact-info-list">
                  {contactInfo.map((item, i) => (
                    <div className="contact-info-item" key={i}>
                      <div className="info-icon-wrap"><FontAwesomeIcon icon={item.icon} /></div>
                      {item.href ? (
                        <a href={item.href} target="_blank" rel="noopener noreferrer" aria-label={`${item.label}: ${item.text}`}>{item.text}</a>
                      ) : (
                        <span aria-label={item.label}>{item.text}</span>
                      )}
                    </div>
                  ))}
                </div>

                <div className="divider" />
                <p className="social-heading">{t.findMe}</p>
                <div className="social-row">
                  {socialLinks.map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                      className="social-pill" style={{ "--sc": s.color }} aria-label={`Visit my ${s.label} profile`}>
                      <FontAwesomeIcon icon={s.icon} />
                      <span>{s.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </Col>

            <Col lg={7} className="reveal">
              <div className="form-card h-100">
                <Form onSubmit={handleSubmit} noValidate>
                  <Row className="g-3">
                    <Col sm={12}>
                      <div className="input-wrap">
                        <Form.Control type="text" name="user_name" placeholder={t.namePlaceholder} required
                          onBlur={handleBlur} onChange={handleChange}
                          isInvalid={touched.user_name && !!formErrors.user_name} disabled={loading} />
                        {touched.user_name && formErrors.user_name && (
                          <Form.Control.Feedback type="invalid">{formErrors.user_name}</Form.Control.Feedback>
                        )}
                        <div className="input-focus-bar" />
                      </div>
                    </Col>
                    <Col sm={12}>
                      <div className="input-wrap">
                        <Form.Control type="email" name="user_email" placeholder={t.emailPlaceholder} required
                          onBlur={handleBlur} onChange={handleChange}
                          isInvalid={touched.user_email && !!formErrors.user_email} disabled={loading} />
                        {touched.user_email && formErrors.user_email && (
                          <Form.Control.Feedback type="invalid">{formErrors.user_email}</Form.Control.Feedback>
                        )}
                        <div className="input-focus-bar" />
                      </div>
                    </Col>
                    <Col xs={12}>
                      <div className="input-wrap">
                        <Form.Control type="text" name="subject" placeholder={t.subjectPlaceholder} disabled={loading} />
                        <div className="input-focus-bar" />
                      </div>
                    </Col>
                    <Col xs={12}>
                      <div className="input-wrap">
                        <Form.Control as="textarea" rows={5} name="message" placeholder={t.messagePlaceholder} required
                          onBlur={handleBlur} onChange={handleChange}
                          isInvalid={touched.message && !!formErrors.message} disabled={loading} />
                        {touched.message && formErrors.message && (
                          <Form.Control.Feedback type="invalid">{formErrors.message}</Form.Control.Feedback>
                        )}
                        <div className="input-focus-bar" />
                      </div>
                    </Col>
                    <Col xs={12}>
                      <Button type="submit" className="send-btn w-100 mt-3" disabled={loading}>
                        {loading ? (
                          <><Spinner as="span" animation="border" size="sm" /><span className="ms-2">{t.sending}</span></>
                        ) : (
                          <>{t.send} <FontAwesomeIcon icon={faPaperPlane} className="btn-icon" /></>
                        )}
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <div className="toast-container position-fixed top-0 end-0 p-3" style={{ zIndex: 9999 }}>
        <div className={`toast contact-toast ${success ? "success" : "error"} ${showToast ? "show" : ""}`} role="alert">
          <div className="toast-body d-flex align-items-center gap-3">
            <FontAwesomeIcon icon={success ? faCircleCheck : faCircleXmark} className="toast-icon" />
            <div className="flex-grow-1">
              <div className="toast-title">{success ? t.successTitle : t.errorTitle}</div>
              <div className="toast-text">{success ? t.successText : t.errorText}</div>
            </div>
            <button type="button" className="btn-close btn-close-white" onClick={() => setShowToast(false)} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;