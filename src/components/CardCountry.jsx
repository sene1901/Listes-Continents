import { Card } from "react-bootstrap";
import "./CountryCard.css"; // Pour l’effet hover

const CardCountry = ({ country }) => {
  return (
    <Card className="h-100 shadow-sm border-0 country-card">
      <div className="flag-container">
        <Card.Img
          variant="top"
          src={country.flags.svg}
          alt={country.name.common}
          style={{ height: "160px", objectFit: "cover" }}
        />
        <div className="overlay">
          <p><strong>Population :</strong> {country.population.toLocaleString()}</p>
          <p><strong>Capitale :</strong> {country.capital ? country.capital[0] : "—"}</p>
        </div>
      </div>
      <Card.Body>
        <Card.Title>{country.name.common}</Card.Title>
        <Card.Text className="text-muted">{country.region}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CardCountry;
