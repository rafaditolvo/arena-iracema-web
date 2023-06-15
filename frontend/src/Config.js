import { Box, SkeletonText } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Forms from "./components/Forms";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Sobre from "./components/Sobre";
import ImageCarousel from "./components/img/ImageCarousel";

const dataJson = require("./data.json");

const Placeholder = () => (
  <Box padding="6" boxShadow="lg" bg="white">
    <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
  </Box>
);

function Config() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(dataJson);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 100);
  }, []);

  return (
    <div className="app-container">
      {isLoading ? <Placeholder /> : <Navbar />}
      {isLoading ? (
        <Placeholder />
      ) : (
        <ImageCarousel data={data} setData={setData} isEdit={true} />
      )}
      {isLoading ? (
        <Placeholder />
      ) : (
        <Forms data={data} setData={setData} isEdit={true} />
      )}
      {isLoading ? (
        <Placeholder />
      ) : (
        <Hero data={data} setData={setData} isEdit={true} />
      )}
      {isLoading ? (
        <Placeholder />
      ) : (
        <Sobre data={data} setData={setData} isEdit={true} />
      )}
      {isLoading ? <Placeholder /> : <Footer data={data} isEdit={true} />}
    </div>
  );
}

export default Config;
