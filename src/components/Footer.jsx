import { Container, Row, Col } from "react-bootstrap";
import { FaFacebook, FaLinkedin, FaGithub, FaInstagram, FaWhatsapp, FaHeart, FaCode } from "react-icons/fa";
import "./Footer.css";

const socialLinks = [
  { icon: <FaFacebook />,  href: "https://www.facebook.com/shehab.alshbeny",  label: "Facebook",  color: "#1877F2" },
  { icon: <FaLinkedin />,  href: "https://www.linkedin.com/in/shehab-hany",   label: "LinkedIn",  color: "#0A66C2" },
  { icon: <FaGithub />,    href: "https://github.com/shehabhany4",             label: "GitHub",    color: "#6c6a6adc" },
  { icon: <FaInstagram />, href: "https://www.instagram.com/shehabhany4",      label: "Instagram", color: "#E1306C" },
  { icon: <FaWhatsapp />,  href: "https://wa.me/201097820873",                 label: "WhatsApp",  color: "#25D366" },
];

const navLinks = [
  { href: "#home",         label: "Home"         },
  { href: "#education",    label: "Education"    },
  { href: "#work",         label: "Experience"   },
  { href: "#projects",     label: "Projects"     },
  { href: "#certificates", label: "Certificates" },
  { href: "#skills",       label: "Skills"       },
  { href: "#about",        label: "About"        },
  { href: "#contact",      label: "Contact"      },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-topbar" />

      <Container>
        <Row className="footer-main gy-4">

          <Col lg={4} md={12}>
            <div className="footer-brand">
              <span className="brand-name">Shehab<span className="brand-dot">.</span></span>
              <p className="brand-tagline">
                Frontend Developer crafting modern, responsive &amp; user-friendly web experiences.
              </p>
              <div className="footer-socials">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="footer-social-icon"
                    style={{ "--sc": s.color }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </Col>

          <Col lg={4} md={6}>
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              {navLinks.slice(0, 4).map((l) => (
                <li key={l.href}>
                  <a href={l.href}><span className="link-arrow">›</span>{l.label}</a>
                </li>
              ))}
            </ul>
          </Col>

          <Col lg={4} md={6}>
            <h4 className="footer-heading">More</h4>
            <ul className="footer-links">
              {navLinks.slice(4).map((l) => (
                <li key={l.href}>
                  <a href={l.href}><span className="link-arrow">›</span>{l.label}</a>
                </li>
              ))}
            </ul>
          </Col>

        </Row>

        <div className="footer-divider" />

        <div className="footer-bottom">
          <p className="footer-copy">
            © {currentYear} <span className="copy-name">SHEHAB</span>. All rights reserved.
          </p>
          <p className="footer-made">
            Made with <FaHeart className="heart-icon" /> &amp; <FaCode className="code-icon" /> in Egypt 🇪🇬
          </p>
        </div>

      </Container>
    </footer>
  );
};

export default Footer;