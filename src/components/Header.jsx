// import { Container, Row, Col, Form, Button } from "react-bootstrap";

// const Header = ({ onSearch, onRegionChange, onSortChange, onReset }) => {
//   return (
//     <Container className="my-4 shadow p-5 content1">
//       <Row className="g-2 justify-content-center align-items-center">
//         <Col md={4}>
//           <Form.Control
//             type="text"
//             placeholder="🔍 Rechercher un pays..."
//             onChange={(e) => onSearch(e.target.value)}
//           />
//         </Col>

//         <Col md={3}>
//           <Form.Select onChange={(e) => onRegionChange(e.target.value)}>
//             <option value="all">🌍 Tous les continents</option>
//             <option value="Africa">Afrique</option>
//             <option value="Europe">Europe</option>
//             <option value="Asia">Asie</option>
//             <option value="Americas">Amériques</option>
//             <option value="Oceania">Océanie</option>
//           </Form.Select>
//         </Col>

//         <Col md={2}>
//           <Form.Select onChange={(e) => onSortChange(e.target.value)}>
//             <option value="asc">A → Z</option>
//             <option value="desc">Z → A</option>
//           </Form.Select>
//         </Col>

//         <Col md="auto">
//           <Button variant="success" onClick={onReset}>
//             Réinitialiser
//           </Button>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Header;
