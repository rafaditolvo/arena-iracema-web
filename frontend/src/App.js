import { Box, SkeletonText, createIcon, useStyleConfig } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Forms from "./components/Forms";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Sobre from "./components/Sobre";
import ImageCarousel from "./components/img/ImageCarousel";
import { FaInstagram } from 'react-icons/fa';



// const dataJ = require('./data.json');

const Placeholder = () => (
  <Box padding="6" boxShadow="lg" bg="white">
    <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
  </Box>
);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/data.json");
      const jsonData = await response.json();
      setData(jsonData);
      console.log(jsonData)
      setIsLoading(false);
    };

    fetchData();
  }, []);


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 868); 
    };

    handleResize(); 

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize); 
    };
  }, []);

  
console.log(data)



  function InstagramButton(props) {

    if (!data.contato?.mobile || !data.contato?.web) {
      return <div>Error: Invalid props</div>;
    }
  

    return (
      <Box
      as="a"
      overflowX="hidden"
      href={isMobile ? data.contato.mobile : data.contato.web }
      target="_blank"
      rel="noopener noreferrer"
      position="fixed"
      bottom={{ base: "2", md: "4", lg: "8" }}
      right={{ base: "6", md: "4", lg: "8" }}
      width={{ base: "60px", md: "70px", lg: "80px" }}
      height={{ base: "60px", md: "70px", lg: "80px" }}
      padding={{ base: "10px", md: "14px", lg: "16px" }}
      borderRadius="full"
      zIndex={99999}
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgGradient="linear(to-r, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)"

     
      boxShadow="0px 4px 8px rgba(0, 0, 0, 0.1)"
      transition="all 0.2s ease-out"
      _hover={{
        transform: "scale(1.1)",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
      }}
      
    >
      <FaInstagram size="2.3em" color="white" />
    </Box>
    );
  }
  
  
  return (
    <Box overflowX="hidden">
    {isLoading ? <Placeholder /> : <InstagramButton />}
    {isLoading ? <Placeholder /> : <Navbar />}
    {isLoading ? <Placeholder /> : <ImageCarousel data={data} />}
    {isLoading ? <Placeholder /> : <Forms data={data} />}
    {isLoading ? <Placeholder /> : <Hero data={data} />}
    {isLoading ? <Placeholder /> : <Sobre data={data} />}
    {isLoading ? <Placeholder /> : <Footer data={data} />}
 </Box>
 
  );
}

export default App;
