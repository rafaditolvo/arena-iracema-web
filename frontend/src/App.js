import React, { useState, useEffect } from "react";
import { SkeletonText, Box } from "@chakra-ui/react";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import ImageCarousel from "./components/img/ImageCarousel";
import Footer from './components/Footer'
import Forms from "./components/Forms";
import Sobre from "./components/Sobre";

const data = require('./data.json');

const Placeholder = () => (
  <Box padding='6' boxShadow='lg' bg='white'>
    <SkeletonText mt='4' noOfLines={4} spacing='4' skeletonHeight='2' />
  </Box>
);

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); 
  }, []);

  return (
    <div className="app-container">
      {isLoading ? <Placeholder /> : <Navbar />}
      {isLoading ? <Placeholder /> : <ImageCarousel data={data} />}
      {isLoading ? <Placeholder /> : <Forms data={data} />}
      {isLoading ? <Placeholder /> : <Hero data={data} />}
      {isLoading ? <Placeholder /> : <Sobre data={data} />}
      {isLoading ? <Placeholder /> : <Footer data={data} />}
    </div>
  );
}

export default App;
