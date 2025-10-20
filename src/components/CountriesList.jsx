import React, { useState, useEffect } from "react";
import { Button, Card, Row, Col, Container, Spinner, Form } from "react-bootstrap";
import CountryModal from "./ModalCountry";


const CountriesList = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // 🔹 États du filtre
  const [searchTerm, setSearchTerm] = useState("");
  const [region, setRegion] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");

  // ======================
  // 🔸 1. Charger les pays
  // ======================
  useEffect(() => {
    fetch(
      "https://restcountries.com/v3.1/all?fields=name,capital,languages,flags,region,population,latlng"
    )
      .then((res) => {
        if (!res.ok) throw new Error("Erreur réseau");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setCountries(data);
          setFilteredCountries(data);
        } else {
          setCountries([]);
          setFilteredCountries([]);
        }
      })
      .catch((err) => console.error("Erreur API:", err))
      .finally(() => setLoading(false));
  }, []);

  // =========================
  // 🔸 2. Appliquer les filtres
  // =========================
  useEffect(() => {
    let filtered = [...countries];

    // 🔍 Filtrer par nom
    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((c) =>
        c.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 🌍 Filtrer par continent
    if (region !== "all") {
      filtered = filtered.filter((c) => c.region === region);
    }

    // 🔤 Trier A→Z ou Z→A
    filtered.sort((a, b) => {
      return sortOrder === "asc"
        ? a.name.common.localeCompare(b.name.common)
        : b.name.common.localeCompare(a.name.common);
    });

    setFilteredCountries(filtered);
  }, [searchTerm, region, sortOrder, countries]);

  // =========================
  // 🔸 3. Fonctions de gestion
  // =========================
  const handleSearch = (value) => setSearchTerm(value);
  const handleRegionChange = (value) => setRegion(value);
  const handleSortChange = (value) => setSortOrder(value);
  const handleReset = () => {
    setSearchTerm("");
    setRegion("all");
    setSortOrder("asc");
    setFilteredCountries(countries);
  };

  // =========================
  // 🔸 4. Modal
  // =========================
  const handleShow = (country) => {
    setSelectedCountry(country);
    setShowModal(true);
  };
  const handleClose = () => setShowModal(false);

  // =========================
  // 🔸 5. Rendu
  // =========================
  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4 titre">🌍 Liste des pays du monde</h2>

      {/* 🔹 Barre de filtre intégrée */}
      <div className="d-flex flex-wrap justify-content-around align-items-center mb-4  shadow py-5 content1">
        <Form.Control
          type="text"
          placeholder="🔍 Rechercher un pays..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-auto mb-2"
        />

        <Form.Select
          value={region}
          onChange={(e) => handleRegionChange(e.target.value)}
          className="w-auto mb-2"
        >
          <option value="all">Toutes les régions</option>
          <option value="Africa">Afrique</option>
          <option value="Americas">Amériques</option>
          <option value="Asia">Asie</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Océanie</option>
        </Form.Select>

        <Form.Select
          value={sortOrder}
          onChange={(e) => handleSortChange(e.target.value)}
          className="w-auto mb-2"
        >
          <option value="asc">A → Z</option>
          <option value="desc">Z → A</option>
        </Form.Select>

        <Button variant="outline-success" onClick={handleReset} className="mb-2">
          Réinitialiser
        </Button>
      </div>

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
              <Card className="shadow-lg border-0 carte-pays text-light">
                <Card.Img
                  variant="top"
                  src={country.flags?.png}
                  alt={country.name.common}
                  style={{ height: "150px", objectFit: "cover" }}
                />
                <Card.Body className="text-center opacite content1">
                  <Card.Title>{country.name.common}</Card.Title>
                  <Button
                    variant="outline-success"
                    className="mt-2"
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

      {/* ✅ Modal d’infos */}
      <CountryModal show={showModal} handleClose={handleClose} country={selectedCountry} />
    </Container>
  );
};

export default CountriesList;
