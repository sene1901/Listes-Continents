// src/components/CountriesList.jsx
import React, { useState, useEffect } from "react";
import { Row, Col, Container, Spinner } from "react-bootstrap";
import CountryModal from "./ModalCountry";
import CountryCard from "./CardCountry";

const CountriesList = ({ searchTerm, region, sortOrder }) => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://restcountries.com/v3.1/all?fields=name,capital,languages,flags,region,population,latlng"
    )
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
        setFilteredCountries(data);
      })
      .catch((err) => console.error("Erreur API:", err))
      .finally(() => setLoading(false));
  }, []);

  // Appliquer les filtres depuis les props
  useEffect(() => {
    let filtered = [...countries];

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((c) =>
        c.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (region !== "all") {
      filtered = filtered.filter((c) => c.region === region);
    }

    filtered.sort((a, b) =>
      sortOrder === "asc"
        ? a.name.common.localeCompare(b.name.common)
        : b.name.common.localeCompare(a.name.common)
    );

    setFilteredCountries(filtered);
  }, [searchTerm, region, sortOrder, countries]);

  const handleShow = (country) => {
    setSelectedCountry(country);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  return (
    <Container className="mt-4">
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="success" />
          <p className="text-light mt-3">Chargement des pays...</p>
        </div>
      ) : filteredCountries.length === 0 ? (
        <p className="text-center text-warning fs-5">Aucun pays trouvé 😢</p>
      ) : (
        <Row>
          {filteredCountries.map((country) => (
            <Col
              md={3}
              sm={6}
              key={country.cca3 || country.name.common}
              className="mb-4"
            >
              <CountryCard country={country} onShow={handleShow} />
            </Col>
          ))}
        </Row>
      )}

      <CountryModal
        show={showModal}
        handleClose={handleClose}
        country={selectedCountry}
      />
    </Container>
  );
};

export default CountriesList;
