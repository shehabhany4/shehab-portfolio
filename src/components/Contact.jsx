import { useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faEnvelope, faMapMarkerAlt, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faGithub, faFacebook, faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import "./Contact.css";

const socialLinks = [
  { icon: faLinkedin,  href: "https://www.linkedin.com/in/shehab-hany",           color: "#0A66C2", label: "LinkedIn"   },
  { icon: faGithub,    href: "https://github.com/shehabhany4",                    color: "#333",    label: "GitHub"    },
  { icon: faFacebook,  href: "https://www.facebook.com/shehab.alshbeny",          color: "#1877F2", label: "Facebook"  },
  { icon: faInstagram, href: "https://www.instagram.com/shehabhany4",             color: "#E1306C", label: "Instagram" },
  { icon: faWhatsapp,  href: "https://wa.me/201097820873",                        color: "#25D366", label: "WhatsApp"  },
];

const contactInfo = [
  { icon: faEnvelope,       text: "shehab.2005@outlook.com",  href: "mailto:shehab.2005@outlook.com" },
  { icon: faPhone,       text: "+20 109 782 0873",         href: "https://wa.me/201097820873"     },
  { icon: faMapMarkerAlt,   text: "Egypt 🇪🇬",               href: null                             },
];

const Contact = () => {

  useEffect(() => {
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
    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name    = form.user_name.value;
    const email   = form.user_email.value;
    const message = form.message.value;
    window.location.href = `mailto:shehab.2005@outlook.com?subject=Message from ${name}&body=${encodeURIComponent(message + "\n\nFrom: " + email)}`;
  };

  return (
    <section id="contact" className="contact-section">
      <Container>

        <div className="section-title-wrapper reveal">
          <span className="title-tag">&lt;contact /&gt;</span>
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">Have a project in mind or just want to say hello? I'd love to hear from you.</p>
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
                    <div className="info-icon-wrap">
                      <FontAwesomeIcon icon={item.icon} />
                    </div>
                    {item.href
                      ? <a href={item.href} target="_blank" rel="noopener noreferrer">{item.text}</a>
                      : <span>{item.text}</span>
                    }
                  </div>
                ))}
              </div>

              <div className="divider" />

              <p className="social-heading">Find me on</p>
              <div className="social-row">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="social-pill"
                    style={{ "--sc": s.color }}
                  >
                    <FontAwesomeIcon icon={s.icon} />
                    <span>{s.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </Col>

          <Col lg={7} className="reveal" style={{ "--reveal-delay": "0.15s" }}>
            <div className="form-card h-100">
              <Form onSubmit={handleSubmit} noValidate>
                <Row className="g-3">
                  <Col sm={12}>
                    <Form.Group>
                      <div className="input-wrap">
                        <Form.Control type="text" name="user_name" placeholder="Your Name" required />
                        <span className="input-focus-bar" />
                      </div>
                    </Form.Group>
                  </Col>
                  <Col sm={12}>
                    <Form.Group>
                      <div className="input-wrap">
                        <Form.Control type="email" name="user_email" placeholder="Your Email" required />
                        <span className="input-focus-bar" />
                      </div>
                    </Form.Group>
                  </Col>
                  <Col xs={12}>
                    <Form.Group>
                      <div className="input-wrap">
                        <Form.Control type="text" name="subject" placeholder="Subject" />
                        <span className="input-focus-bar" />
                      </div>
                    </Form.Group>
                  </Col>
                  <Col xs={12}>
                    <Form.Group>
                      <div className="input-wrap">
                        <Form.Control as="textarea" rows={5} name="message" placeholder="Your Message" required />
                        <span className="input-focus-bar" />
                      </div>
                    </Form.Group>
                  </Col>
                  <Col xs={12}>
                    <Button type="submit" className="send-btn w-100 mt-4">
                      <span>Send Message</span>
                      <FontAwesomeIcon icon={faPaperPlane} className="btn-icon" />
                    </Button>
                  </Col>
                </Row>
              </Form>
            </div>
          </Col>

        </Row>
      </Container>
    </section>
  );
};

export default Contact;