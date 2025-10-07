import { Routes, Route } from "react-router-dom";
import NavbarComponent from "./components/Navbar";
import Footer from "./components/Footer";
import Accueil from "./pages/Accueil";
import Informations from "./pages/Informations";

const App = () => {
  return (
    <>
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/informations" element={<Informations />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
