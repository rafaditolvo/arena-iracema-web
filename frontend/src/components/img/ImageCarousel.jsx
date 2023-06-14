import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import {
  Box,
  Center,
  Button,
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

export default function ImageCarousel({ data }) {
  if (!data) {
    return <div>Propriedade 'data' não fornecida.</div>;
  }

  const Carousel = () => {
    const settings = {
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      dots: true,
      appendDots: (dots) => (
        <Flex justify="center" mt={4}>
          <ul style={{ margin: "0px" }}>{dots}</ul>
        </Flex>
      ),
    };

    return (
      <Slider {...settings}>
        {data.banner.map((bannerItem) => (
          <a href={bannerItem.href} key={bannerItem.id}>
            <Image
              alt={"Hero Image"}
              fit={"cover"}
              align={"center"}
              maxH="700px"
              w="100%"
              src={bannerItem.src}
            />
            {bannerItem.buttonText && (
              <Center
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
              >
                <Button
                  size="lg"
                  colorScheme="blue"
                  borderRadius="md"
                  fontWeight="bold"
                >
                  {bannerItem.buttonText}
                </Button>
              </Center>
            )}
          </a>
        ))}
      </Slider>
    );
  };

  return (
    <Box maxH="0%" w="100%">
      <Carousel />
    </Box>
  );
}
