// src/components/CountryCard.jsx
import React from "react";
import { Card, Button } from "react-bootstrap";

const CardCountry = ({ country, onShow }) => {
  return (
    <Card className="shadow-lg border-0 carte-pays text-light">
      <Card.Img variant="top" src={country.flags?.png} alt={country.name.common} 
       style={{ height: "150px", objectFit: "cover" }}/>
      <Card.Body className="text-center opacite content1">
        <Card.Title>{country.name.common}</Card.Title>
        <Button className="mt-2 outline-success" onClick={() => onShow(country)}>
          Voir détails
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CardCountry ;
