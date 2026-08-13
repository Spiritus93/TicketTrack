import './styles/App.scss'
import Header from "./components/Header/Header.jsx";
import Home from "./pages/Home/Home.jsx";
import AddConcert from "./pages/AddConcert/AddConcert.jsx";
import Footer from "./components/Footer/Footer.jsx";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
      <>
          <Header />

          <main id="center">
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/add-concert" element={<AddConcert />} />
              </Routes>
          </main>

          <Footer />
      </>
  );
}

export default App;
