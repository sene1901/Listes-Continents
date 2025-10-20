import { Routes, Route } from "react-router-dom";

import NavbarComponent from "./components/Navbar";
import Footer from "./components/Footer"
import Informations from "./pages/Informations";
import Accueil from "./pages/Accueil";



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
