import './styles/App.scss'
import Header from "./components/Header/Header.jsx";
import Home from "./pages/Home/Home.jsx";
import AddConcert from "./pages/AddConcert/AddConcert.jsx";
import ConcertDetails from "./pages/ConcertDetails/ConcertDetails.jsx";
import EditConcert from "./pages/EditConcert/EditConcert.jsx";
import Footer from "./components/Footer/Footer.jsx";
import { Routes, Route, useLocation } from "react-router-dom";

function App() {
    const location = useLocation();

    // Sets a different background depending on current page.
    let mainClass = "";

    if (location.pathname === "/") {
        mainClass = "home-background";
    }
    else if (location.pathname.startsWith("/concert-details/")) {
        mainClass = "details-background";
    }

  return (
      <>
          <Header />

          <main className={mainClass}>
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/add-concert" element={<AddConcert />} />
                  <Route path="/concert-details/:id" element={<ConcertDetails />} />
                  <Route path="/edit-concert/:id" element={<EditConcert />} />
              </Routes>
          </main>

          <Footer />
      </>
  );
}

export default App;
