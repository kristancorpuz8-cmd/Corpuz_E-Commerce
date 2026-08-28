import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Navbar, Nav, Button, Card, Row, Col } from 'react-bootstrap';

function App() {
  return (
    <>
      {/* Navigation Bar */}
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#">My Website</Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#contact">Contact</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Main Content */}
      <Container className="mt-5">
        <Row className="text-center mb-4">
          <Col>
            <h1>Responsive and Accessible UI</h1>
            <p>
              This is an example of a responsive layout using React Bootstrap.
              The layout adjusts properly on different screen sizes.
            </p>
          </Col>
        </Row>

        {/* Cards Section */}
        <Row>
          <Col md={4} sm={12} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>Responsive Design</Card.Title>
                <Card.Text>
                  The layout automatically adjusts on desktop, tablet, and mobile screens.
                </Card.Text>
                <Button variant="success">Learn More</Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} sm={12} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>Accessibility</Card.Title>
                <Card.Text>
                  The interface uses readable text, clear buttons, and proper navigation.
                </Card.Text>
                <Button variant="success">View Details</Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} sm={12} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>Design System</Card.Title>
                <Card.Text>
                  Bootstrap provides reusable components such as buttons, cards, and navbars.
                </Card.Text>
                <Button variant="success">Explore</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
