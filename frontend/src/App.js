import { Box, SkeletonText } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Forms from "./components/Forms";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Sobre from "./components/Sobre";
import ImageCarousel from "./components/img/ImageCarousel";

// const dataJ = require('./data.json');

const Placeholder = () => (
  <Box padding="6" boxShadow="lg" bg="white">
    <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
  </Box>
);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/data.json");
      const jsonData = await response.json();
      setData(jsonData);
      setIsLoading(false);
    };

    fetchData();
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
