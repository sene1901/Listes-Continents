import React from "react";
import { Modal, Button, Row, Col, Card } from "react-bootstrap";
import {
  Globe2,
  Banknote,
  Landmark,
  Map,
} from "lucide-react"; // Icônes modernes

const ModalCountry = ({ show, handleClose, country }) => {
  if (!country) return null;

  const {
    name,
    capital,
    population,
    region,
    subregion,
    area,
    languages,
    flags,
    borders,
    currencies,
    timezones,
    independent,
    unMember,
    continents,
    latlng,
  } = country;

  const latitude = latlng?.[0];
  const longitude = latlng?.[1];

  const googleMapLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
  const openStreetMapLink = `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=5/${latitude}/${longitude}`;

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton className="debut text-white">
        <Modal.Title>
          <img
            src={flags?.png}
            alt={name.common}
            style={{
              width: "40px",
              height: "25px",
              objectFit: "cover",
              marginRight: "10px",
              borderRadius: "4px",
            }}
          />
          {name.common}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="body-modal text-light">
        <p className="text-secondary mb-4 text-center">
          {name.official || "—"}
        </p>

        <Row className="g-3 justify-content-center">
          {/* Informations générales */}
          <Col md={6}>
            <Card className="carte-modal text-light border-0 shadow-sm p-3 rounded-3">
              <h5 className="texte1 mb-3">
                <Globe2 className="me-2" size={20} />
                Informations générales
              </h5>
              <p><strong>Capitale :</strong> {capital ? capital[0] : "—"}</p>
              <p><strong>Population :</strong> {population?.toLocaleString()} habitants</p>
              <p><strong>Région :</strong> {region}</p>
              <p><strong>Sous-région :</strong> {subregion || "—"}</p>
              <p><strong>Superficie :</strong> {area?.toLocaleString()} km²</p>
            </Card>
          </Col>

          {/* Économie et langues */}
          <Col md={6}>
            <Card className="carte-modal text-light border-0 shadow-sm p-3 rounded-3">
              <h5 className="texte1 mb-3">
                <Banknote className="me-2" size={20} />
                Économie et langues
              </h5>
              <p>
                <strong>Monnaie :</strong>{" "}
                {currencies
                  ? Object.values(currencies)
                      .map((c) => `${c.name} (${c.symbol || " "})`)
                      .join(", ")
                  : "—"}
              </p>
              <p>
                <strong>Langues :</strong>{" "}
                {languages ? Object.values(languages).join(", ") : "—"}
              </p>
              <p><strong>Fuseau horaire :</strong> {timezones?.[0] || "—"}</p>
            </Card>
          </Col>

          {/* Géographie */}
          <Col md={6}>
            <Card className="carte-modal text-light border-0 shadow-sm p-3 rounded-3">
              <h5 className="texte1 mb-3">
                <Map className="me-2" size={20} />
                Géographie
              </h5>
              <p>
                <strong>Frontières :</strong>{" "}
                {borders ? borders.join(", ") : "Aucune"}
              </p>
              <p>
                <strong>Continent :</strong> {continents ? continents.join(", ") : "—"}
              </p>

              <div className="mt-3 text-center">
                <p className="fw-bold text-warning mb-2">🗺️ Voir sur la carte :</p>
                <div className="d-flex justify-content-center gap-3">
                  <Button
                    variant="outline-light"
                    size="sm"
                    href={googleMapLink}
                    target="_blank"
                  >
                    🌍 Google Maps
                  </Button>
                  <Button
                    variant=""
                    size="sm"
                    href={openStreetMapLink}
                    target="_blank"
                  >
                    🗺️ OpenStreetMap
                  </Button>
                </div>
              </div>
            </Card>
          </Col>

          {/* Politique */}
          <Col md={6}>
            <Card className="carte-modal text-light border-0 shadow-sm p-3 rounded-3">
              <h5 className="texte1 mb-3">
                <Landmark className="me-2" size={20} />
                Politique
              </h5>
              <p><strong>Indépendant :</strong> {independent ? "Oui" : "Non"}</p>
              <p><strong>Membre de l’ONU :</strong> {unMember ? "Oui" : "Non"}</p>
            </Card>
          </Col>
        </Row>
      </Modal.Body>

      <Modal.Footer className="">
        <Button variant="outline-light" onClick={handleClose}>
          Fermer
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalCountry;
