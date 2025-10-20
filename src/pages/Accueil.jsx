// src/pages/Accueil.jsx
import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import CountriesList from "../components/CountriesList";


const Accueil = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [region, setRegion] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");

  const handleReset = () => {
    setSearchTerm("");
    setRegion("all");
    setSortOrder("asc");
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4 titre">🌍 Liste des pays du monde</h2>

      {/* 🔹 Barre de filtre déplacée ici */}
      <div className="d-flex flex-wrap justify-content-around align-items-center mb-4 shadow py-5 content1">
        <Form.Control
          type="text"
          placeholder="🔍 Rechercher un pays..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-auto mb-2"
        />

        <Form.Select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
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
          onChange={(e) => setSortOrder(e.target.value)}
          className="w-auto mb-2"
        >
          <option value="asc">A → Z</option>
          <option value="desc">Z → A</option>
        </Form.Select>

        <Button variant="outline-success" onClick={handleReset} className="mb-2 outline">
          Réinitialiser
        </Button>
      </div>

      {/* 🔹 Affiche la liste des pays filtrés */}
      <CountriesList
        searchTerm={searchTerm}
        region={region}
        sortOrder={sortOrder}
      />
    </Container>
  );
};

export default Accueil;
