import './styles/App.scss'
import Header from "./components/Header/Header.jsx";
import Home from "./pages/Home/Home.jsx";
import Footer from "./components/Footer/Footer.jsx";

function App() {
  return (
      <section id="center">
          <Header />
          <Home />
          <Footer />
      </section>
  );
}

export default App;
