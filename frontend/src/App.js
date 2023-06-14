import "./App.css";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import ImageCarousel from "./components/img/ImageCarousel";
import Footer from './components/Footer'
import Forms from "./components/Forms";
import Sobre from "./components/Sobre";

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <ImageCarousel/>
      <Forms />
      <Hero />
      <Sobre/>
      <Footer/>
    </div>
  );
}

export default App;
