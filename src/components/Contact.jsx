import { useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faGithub, faFacebook, faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import "./Contact.css";

const Contact = () => {

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.user_name.value;
    const email = form.user_email.value;
    const message = form.message.value;

    window.location.href = `mailto:shehab.2005@outlook.com?subject=Message from ${name}&body=${encodeURIComponent(message + "\n\nFrom: " + email)}`;
  };

  return (
    <section id="contact" className="contact-section py-5">
      <Container>
        <h2 className="section-title reveal">📞Contact Me</h2>

        <Row className="justify-content-center">
          <Col md={8}>
            <Form onSubmit={handleSubmit} className="p-4 rounded shadow-sm">
              <Form.Group className="mb-3 reveal">
                <Form.Control type="text" name="user_name" placeholder="Your Name" required />
              </Form.Group>

              <Form.Group className="mb-3 reveal">
                <Form.Control type="email" name="user_email" placeholder="Your Email" required />
              </Form.Group>

              <Form.Group className="mb-3 reveal">
                <Form.Control as="textarea" rows={5} name="message" placeholder="Your Message" required />
              </Form.Group>

              <Button type="submit" className="btn btn-primary w-100 reveal">
                Send Message <FontAwesomeIcon icon={faPaperPlane} className="ms-2" />
              </Button>
            </Form>
          </Col>
        </Row>

        <Row className="mt-4 justify-content-center">
          <Col md={8}>
            <div className="d-flex justify-content-center gap-4 social-links reveal">
              <a href="https://www.linkedin.com/in/shehab-hany" target="_blank"><FontAwesomeIcon icon={faLinkedin} size="2x" /></a>
              <a href="https://github.com/shehabhany4" target="_blank"><FontAwesomeIcon icon={faGithub} size="2x" /></a>
              <a href="https://www.facebook.com/shehab.alshbeny" target="_blank"><FontAwesomeIcon icon={faFacebook} size="2x" /></a>
              <a href="https://www.instagram.com/shehabhany4" target="_blank"><FontAwesomeIcon icon={faInstagram} size="2x" /></a>
              <a href="https://wa.me/201097820873" target="_blank"><FontAwesomeIcon icon={faWhatsapp} size="2x" /></a>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Contact;
