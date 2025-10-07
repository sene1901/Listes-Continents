import { Container } from "react-bootstrap";

const Footer = () => (
  <footer className="content2 text-white text-center py-4 mt-5">
    <Container>
      © {new Date().getFullYear()} - Pays du Monde | React + Bootstrap
    </Container>
  </footer>
);

export default Footer;
