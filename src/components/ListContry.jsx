import React, { useState, useEffect } from "react";
import { Button, Card, Row, Col, Container, Spinner } from "react-bootstrap";
import CountryModal from "./ModalCountry";

const CountriesList = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name,capital,languages,flags,region,population,latlng")
      .then((res) => {
        if (!res.ok) throw new Error("Erreur réseau");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) setCountries(data);
        else setCountries([]);
      })
      .catch((err) => console.error("Erreur API:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleShow = (country) => {
    setSelectedCountry(country);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4 titre">🌍 Liste des pays du monde</h2>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="success" />
          <p className="text-light mt-3">Chargement des pays...</p>
        </div>
      ) : (
        <Row>
          {countries.map((country) => (
            <Col md={3} sm={6} key={country.cca3 || country.name.common} className="mb-4 ">
              <Card className="shadow-lg border-0 carte-pays text-light ">
                <Card.Img
                  variant="top"
                  src={country.flags?.png}
                  alt={country.name.common}
                  style={{ height: "150px", objectFit: "cover" }}
                />
                <Card.Body className="text-center opacite">
                  <Card.Title>{country.name.common}</Card.Title>
                  <Button
                    variant="outline-success"
                    className="mt-2 outline-success"
                    onClick={() => handleShow(country)}
                  >
                    Voir détails
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <CountryModal show={showModal} handleClose={handleClose} country={selectedCountry} />
    </Container>
  );
};

export default CountriesList;
