import { Link, NavLink } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";


const NavbarComponent = () => {
  return (
    <Navbar
      expand="lg"
      sticky="top"
      className="custom-navbar"
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          🌍 Pays du Monde
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/">Accueil</Nav.Link>
            <Nav.Link as={NavLink} to="/informations">Informations</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
