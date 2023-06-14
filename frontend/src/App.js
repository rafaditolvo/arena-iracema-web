import { useState } from "react";
import "./App.css";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import ImageCarousel from "./components/img/ImageCarousel";
import Footer from './components/Footer'
import Forms from "./components/Forms";
import Sobre from "./components/Sobre";

const teste = require('./data.json');
console.log(teste);

function App() {
  const [global, setGlobal] = useState({});
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
