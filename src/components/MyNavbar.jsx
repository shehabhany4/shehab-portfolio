import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useTheme } from "./ThemeContext";
import "./Navbar.css";
import logo from '../assets/MyLogo.webp';

const MyNavbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Navbar expand="lg" className="nav" fixed="top">
      <Container fluid>
        <Navbar.Brand href="#home">
          <img src={logo} style={{ width: "3rem" }} alt="shehab" loading="lazy" />
        </Navbar.Brand>
        <div className="theme-toggle" onClick={toggleTheme} title={theme === "light" ? "Switch to Dark" : "Switch to Light"}>
          <div className="toggle-track">
            <span className="toggle-icon-sun">☀️</span>
            <span className="toggle-icon-moon">🌙</span>
            <div className={`toggle-knob ${theme === "dark" ? "dark" : ""}`}></div>
          </div>
        </div>

        <Navbar.Toggle aria-controls="navbarScroll" className="custom-toggler" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '300px' }}
            navbarScroll
          >
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#education">Education</Nav.Link>
            <Nav.Link href="#work">Experience</Nav.Link>
            <Nav.Link href="#projects">Projects</Nav.Link>
            <Nav.Link href="#certificates">Certificates</Nav.Link>
            <Nav.Link href="#skills">Skills</Nav.Link>
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#contact">Contact Us</Nav.Link>
          </Nav>

          <NavDropdown title="Social" id="navbarScrollingDropdown" className="dropdown-nav">
            <NavDropdown.Item href="https://www.facebook.com/shehab.alshbeny" target="_blank">Facebook</NavDropdown.Item>
            <NavDropdown.Item href="https://www.linkedin.com/in/shehab-hany" target="_blank">LinkedIn</NavDropdown.Item>
            <NavDropdown.Item href="https://github.com/shehabhany4" target="_blank">GitHub</NavDropdown.Item>
            <NavDropdown.Item href="https://www.instagram.com/shehabhany4" target="_blank">Instagram</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="https://wa.me/201097820873" target="_blank">WhatsApp</NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;