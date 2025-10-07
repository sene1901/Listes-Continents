import { useEffect, useState } from "react";
import Header from "../components/Header";
import CountryList from "../components/ListContry";
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

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all?fields=name,capital,languages,flags,region,population")
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
        setFiltered(data);
        setLoading(false);
      });
  }, []);

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
      <Header
        onSearch={(v) => setFilters({ ...filters, search: v })}
        onRegionChange={(v) => setFilters({ ...filters, region: v })}
        onSortChange={(v) => setFilters({ ...filters, sort: v })}
        onReset={() => setFilters({ search: "", region: "all", sort: "asc" })}
      />
      <CountryList countries={filtered} />
    </>
  );
};

export default Accueil;
