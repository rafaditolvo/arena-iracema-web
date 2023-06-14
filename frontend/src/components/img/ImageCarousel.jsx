import { Box, Button, Center, Flex, Image } from "@chakra-ui/react";

import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

export default function ImageCarousel({ data }) {
  if (!data) {
    return <div>Propriedade 'data' não fornecida.</div>;
  }

  const BannerItem = (bannerItem) => {
    if (bannerItem.buttonText) {
      return (
        <div key={bannerItem.id}>
          <Image
            alt={"Hero Image"}
            fit={"cover"}
            align={"center"}
            maxH="700px"
            w="100%"
            src={bannerItem.src}
            position="relative"
          />

          <Center
            // position="absolute"
            // left="50%"
            transform="translate(30vw, -10vh)"
          >
            <a
              href={bannerItem.href}
              target="_blank"
              key={bannerItem.id}
              rel="noreferrer"
            >
              <Button
                size="lg"
                colorScheme="blue"
                borderRadius="md"
                fontWeight="bold"
              >
                {bannerItem.buttonText}
              </Button>
            </a>
          </Center>
        </div>
      );
    }
    return (
      <div key={bannerItem.id}>
        <a href={bannerItem.href} target="_blank" rel="noreferrer">
          <Image
            alt={"Hero Image"}
            fit={"cover"}
            align={"center"}
            maxH="700px"
            w="100%"
            src={bannerItem.src}
          />
        </a>
      </div>
    );
  };

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
        {data.banner.map((bannerItem) => BannerItem(bannerItem))}
      </Slider>
    );
  };

  return (
    <Box maxH="0%" w="100%">
      <Carousel />
    </Box>
  );
}
