import { Container } from "react-bootstrap";

const Informations = () => {
  return (
    <Container className="my-5 text-center">
      <h1 className="text-success mb-3">Informations sur le projet</h1>
      <p>
        Ce projet affiche les pays du monde regroupés par continent à l’aide de
        l’API <strong>Rest Countries</strong>.
      </p>
      <p>
        Créé avec <strong>ReactJS</strong> et <strong>Bootstrap 5</strong>.
      </p>
    </Container>
  );
};

export default Informations;
