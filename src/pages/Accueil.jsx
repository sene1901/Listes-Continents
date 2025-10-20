import { useEffect, useState } from "react";
import CountriesList from "../components/CountriesList";
import { Spinner } from "react-bootstrap";

const Accueil = () => {
  const [countries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    region: "all",
    sort: "asc",
  });
  const [loading, setLoading] = useState(true);

  // 🔹 Charger la liste des pays au montage
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name,capital,languages,flags,region,population")
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
        setFiltered(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur de chargement :", error);
        setLoading(false);
      });
  }, []);

  // 🔹 Mettre à jour le filtrage à chaque changement
  useEffect(() => {
    let results = [...countries];
    if (filters.search) {
      results = results.filter((c) =>
        c.name.common.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    if (filters.region !== "all") {
      results = results.filter((c) => c.region === filters.region);
    }
    results.sort((a, b) =>
      filters.sort === "asc"
        ? a.name.common.localeCompare(b.name.common)
        : b.name.common.localeCompare(a.name.common)
    );
    setFiltered(results);
  }, [filters, countries]);

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center mt-5">
        <Spinner animation="border" variant="success" />
        <span className="ms-2 text-muted">Chargement des pays...</span>
      </div>
    );

  return (
    <>
      {/* 🔹 Supprimé le Header */}
      <CountriesList
        countries={filtered}
        filters={filters}
        setFilters={setFilters}
      />
    </>
  );
};

export default Accueil;
