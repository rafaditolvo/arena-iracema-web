import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import {
  Box,
  Center,
  Icon,
  Flex,
  Image,
  Spinner,
  useBreakpointValue,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";




export default function ImageCarousel(props) {

  

    const Carousel = () => {
        const settings = {
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 3000,
          dots: true,
          appendDots: (dots) => (
            <Flex justify="center"  mt={4}>
              <ul style={{ margin: "0px" }}>{dots}</ul>
            </Flex>
          ),
        };
    
        
      
        return (
          
          <Slider {...settings}>
            
           
            <Image
              alt={"Hero Image 1"}
              fit={"cover"}
              align={"center"}
              maxH="700px"
              w="100%"
              src={
                "https://scontent.ffor13-1.fna.fbcdn.net/v/t39.30808-6/275057269_4966782860074444_6897899171174810283_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=e3f864&_nc_ohc=djqHYm8RkkgAX9lYvi9&_nc_ht=scontent.ffor13-1.fna&oh=00_AfDaDGgDhmmmKJzfJWgIhM7Cs39fLiCpCxIMZ_fV8pF1lg&oe=6484B974"
              }
            />
            <Image
              alt={"Hero Image 2"}
              fit={"cover"}
              align={"center"}
              maxH="700px"
              w="100%"
              src={
                "https://scontent.ffor13-1.fna.fbcdn.net/v/t39.30808-6/332848155_2102168916646276_6503139494636167884_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=e3f864&_nc_ohc=NheE6rZVuY4AX8oRkXS&_nc_ht=scontent.ffor13-1.fna&oh=00_AfD_4yb3wzAJ4J2g2njDmmrM7dU-Omn6Pa_wHDz16wKOKw&oe=6484B311"
              }
            />

<Image
              alt={"Hero Image 2"}
              fit={"cover"}
              align={"center"}
              maxH="700px"
              w="100%"
              src={
                "https://scontent.ffor13-1.fna.fbcdn.net/v/t39.30808-6/275141419_4966767150076015_7128798344740283684_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=e3f864&_nc_ohc=hbi-OGyoY3AAX9Z2y1Z&_nc_ht=scontent.ffor13-1.fna&oh=00_AfAUhXlTXYpC1xBmimj3r5hTSXpdHVQGydZuSjrdRb6R-Q&oe=6484BA5E"
              }
            />
          </Slider>
        );
      };  
  // 

  const showChevrons = useBreakpointValue({ base: true, md: true });

  return (
    
    <div  maxH="0%"  w="100%">
        <Carousel/>
        
    
    </div>
  );
}