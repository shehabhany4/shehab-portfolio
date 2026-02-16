import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faEnvelope,
  faMapMarkerAlt,
  faPhone,
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import {
  faLinkedin,
  faGithub,
  faFacebook,
  faInstagram,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import emailjs from "@emailjs/browser";
import "./Contact.css";

const socialLinks = [
  { icon: faLinkedin, href: "https://www.linkedin.com/in/shehab-hany", color: "#0A66C2", label: "LinkedIn" },
  { icon: faGithub, href: "https://github.com/shehabhany4", color: "#333", label: "GitHub" },
  { icon: faFacebook, href: "https://www.facebook.com/shehab.alshbeny", color: "#1877F2", label: "Facebook" },
  { icon: faInstagram, href: "https://www.instagram.com/shehabhany4", color: "#E1306C", label: "Instagram" },
  { icon: faWhatsapp, href: "https://wa.me/201097820873", color: "#25D366", label: "WhatsApp" },
];

const contactInfo = [
  { icon: faEnvelope, text: "shehab.2005@outlook.com", href: "mailto:shehab.2005@outlook.com", label: "Email" },
  { icon: faPhone, text: "+20 109 782 0873", href: "https://wa.me/201097820873", label: "Phone" },
  { icon: faMapMarkerAlt, text: "Egypt 🇪🇬", href: null, label: "Location" },
];

const Contact = () => {
  const [showToast, setShowToast] = useState(false);
  const [success, setSuccess] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Auto-hide toast after 4 seconds
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

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
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateName = (name) => {
    return name.trim().length >= 2;
  };

  const validateMessage = (message) => {
    return message.trim().length >= 10;
  };

  const validateField = (name, value) => {
    switch (name) {
      case "user_name":
        return validateName(value) ? "" : "Name must be at least 2 characters";
      case "user_email":
        return validateEmail(value) ? "" : "Please enter a valid email address";
      case "message":
        return validateMessage(value) ? "" : "Message must be at least 10 characters";
      default:
        return "";
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setFormErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (touched[name]) {
      const error = validateField(name, value);
      setFormErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const form = e.target;
    const name = form.user_name.value;
    const email = form.user_email.value;
    const message = form.message.value;

    const errors = {
      user_name: validateField("user_name", name),
      user_email: validateField("user_email", email),
      message: validateField("message", message),
    };

    setFormErrors(errors);
    setTouched({ user_name: true, user_email: true, message: true });

    // Check if there are any errors
    if (Object.values(errors).some((error) => error !== "")) {
      return;
    }

    setLoading(true);

    try {
      // Get credentials from environment variables
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_9mi6s4d";
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "template_updrdf6";
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "ocx_KR4JoaE9LVd-3";

      await emailjs.sendForm(serviceId, templateId, form, publicKey);
      
      setSuccess(true);
      setShowToast(true);
      form.reset();
      setFormErrors({});
      setTouched({});
    } catch (error) {
      console.error("Email send error:", error);
      setSuccess(false);
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section id="contact" className="contact-section">
        <Container>
          <div className="section-title-wrapper reveal">
            <h2 className="section-title">Get In Touch</h2>
            <p className="section-subtitle">
              Have a project in mind or just want to say hello? I'd love to hear from you.
            </p>
          </div>

          <Row className="g-4 align-items-stretch">
            <Col lg={5} className="reveal">
              <div className="info-card h-100">
                <h3 className="info-heading">Let's Connect</h3>
                <p className="info-subtext">
                  I'm currently open to freelance opportunities and full-time roles.
                  Whether it's a question or a hello — my inbox is always open!
                </p>

                <div className="contact-info-list">
                  {contactInfo.map((item, i) => (
                    <div className="contact-info-item" key={i}>
                      <div className="info-icon-wrap" aria-hidden="true">
                        <FontAwesomeIcon icon={item.icon} />
                      </div>
                      {item.href ? (
                        <a 
                          href={item.href} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          aria-label={`${item.label}: ${item.text}`}
                        >
                          {item.text}
                        </a>
                      ) : (
                        <span aria-label={item.label}>{item.text}</span>
                      )}
                    </div>
                  ))}
                </div>

                <div className="divider" role="separator" />

                <p className="social-heading">Find me on</p>
                <div className="social-row" role="list">
                  {socialLinks.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-pill"
                      style={{ "--sc": s.color }}
                      aria-label={`Visit my ${s.label} profile`}
                      role="listitem"
                    >
                      <FontAwesomeIcon icon={s.icon} aria-hidden="true" />
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
                        <Form.Control
                          type="text"
                          name="user_name"
                          placeholder="Your Name"
                          required
                          onBlur={handleBlur}
                          onChange={handleChange}
                          isInvalid={touched.user_name && !!formErrors.user_name}
                          disabled={loading}
                          aria-label="Your name"
                          aria-required="true"
                          aria-invalid={touched.user_name && !!formErrors.user_name}
                          aria-describedby={formErrors.user_name ? "name-error" : undefined}
                        />
                        {touched.user_name && formErrors.user_name && (
                          <Form.Control.Feedback type="invalid" id="name-error">
                            {formErrors.user_name}
                          </Form.Control.Feedback>
                        )}
                        <div className="input-focus-bar" />
                      </div>
                    </Col>
                    <Col sm={12}>
                      <div className="input-wrap">
                        <Form.Control
                          type="email"
                          name="user_email"
                          placeholder="Your Email"
                          required
                          onBlur={handleBlur}
                          onChange={handleChange}
                          isInvalid={touched.user_email && !!formErrors.user_email}
                          disabled={loading}
                          aria-label="Your email address"
                          aria-required="true"
                          aria-invalid={touched.user_email && !!formErrors.user_email}
                          aria-describedby={formErrors.user_email ? "email-error" : undefined}
                        />
                        {touched.user_email && formErrors.user_email && (
                          <Form.Control.Feedback type="invalid" id="email-error">
                            {formErrors.user_email}
                          </Form.Control.Feedback>
                        )}
                        <div className="input-focus-bar" />
                      </div>
                    </Col>
                    <Col xs={12}>
                      <div className="input-wrap">
                        <Form.Control
                          type="text"
                          name="subject"
                          placeholder="Subject"
                          disabled={loading}
                          aria-label="Message subject (optional)"
                        />
                        <div className="input-focus-bar" />
                      </div>
                    </Col>
                    <Col xs={12}>
                      <div className="input-wrap">
                        <Form.Control
                          as="textarea"
                          rows={5}
                          name="message"
                          placeholder="Your Message"
                          required
                          onBlur={handleBlur}
                          onChange={handleChange}
                          isInvalid={touched.message && !!formErrors.message}
                          disabled={loading}
                          aria-label="Your message"
                          aria-required="true"
                          aria-invalid={touched.message && !!formErrors.message}
                          aria-describedby={formErrors.message ? "message-error" : undefined}
                        />
                        {touched.message && formErrors.message && (
                          <Form.Control.Feedback type="invalid" id="message-error">
                            {formErrors.message}
                          </Form.Control.Feedback>
                        )}
                        <div className="input-focus-bar" />
                      </div>
                    </Col>
                    <Col xs={12}>
                      <Button
                        type="submit"
                        className="send-btn w-100 mt-3"
                        disabled={loading}
                        aria-label={loading ? "Sending message..." : "Send message"}
                      >
                        {loading ? (
                          <>
                            <Spinner
                              as="span"
                              animation="border"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                            />
                            <span className="ms-2">Sending...</span>
                          </>
                        ) : (
                          <>
                            Send Message <FontAwesomeIcon icon={faPaperPlane} className="btn-icon" />
                          </>
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

      {/* Toast Notification */}
      <div 
        className="toast-container position-fixed top-0 end-0 p-3" 
        style={{ zIndex: 9999 }}
      >
        <div
          className={`toast contact-toast ${success ? "success" : "error"} ${showToast ? "show" : ""}`}
          role="alert"
          aria-live="polite"
          aria-atomic="true"
        >
          <div className="toast-body d-flex align-items-center gap-3">
            <FontAwesomeIcon
              icon={success ? faCircleCheck : faCircleXmark}
              className="toast-icon"
              aria-hidden="true"
            />
            <div className="flex-grow-1">
              <div className="toast-title">
                {success ? "Message sent successfully! 😍" : "Oops! Something went wrong ❌"}
              </div>
              <div className="toast-text">
                {success
                  ? "Thank you for reaching out. I'll get back to you soon!"
                  : "Please try again or reach out via email directly."}
              </div>
            </div>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={() => setShowToast(false)}
              aria-label="Close"
            ></button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;