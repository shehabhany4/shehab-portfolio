import { Container, Row, Col } from "react-bootstrap";
import "./Footer.css";

const Footer = () => {

  const currentYear = new Date().getFullYear();

  return (
    <footer className="text-white py-3 mt-1">
      <Container>
        <Row className="align-items-center">
          <Col className="text-start">
            © Copyright by <span>SHEHAB</span> {currentYear}
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
