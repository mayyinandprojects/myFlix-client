import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";


export const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    
    <Navbar bg="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          MyFlixDB
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {user && (
              <>
                <Nav.Link as={Link} to="/movies">My Movies</Nav.Link>
                <Nav.Link as={Link} to={`/users/${encodeURIComponent(user._id)}`}>Profile</Nav.Link>
                <Nav.Link as={Link} to="/" onClick={onLoggedOut}>Log Out</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};