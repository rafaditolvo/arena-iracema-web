import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { v4 as uuidv4 } from "uuid";

import { toBase64 } from "../../utils/base64";

export default function ImageCarousel({
  data,
  setData = () => { },
  isEdit = false,
}) {
  const [modal, setModal] = useState(false);
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
                // colorScheme={bannerItem.buttonHex ?? "#3182ce"}
                background={bannerItem.buttonHex ?? "#3182ce"}
                color={bannerItem.buttonTextHex ?? "#000000"}
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

  function Form() {
    const [edited, setEdited] = useState(data);

    async function selectFile(id, event) {
      const base64 = await toBase64(event.target.files[0]);
      const objectUrl = URL.createObjectURL(event.target.files[0]);
      const newBanner = { ...edited }.banner.map((reg) => {
        if (reg.id == id) {
          reg.base64 = base64;
          reg.src = objectUrl;
          reg.fileType = event.target.files[0].type;
          reg.fileName = event.target.files[0].name;
        }
        return reg;
      });
      setEdited((prev) => ({ ...prev, banner: newBanner }));
    }
    function changeValue(id, event) {
      const target = event.target;
      const inputName = target.name;
      const value = target.value;
      const newBanner = { ...edited }.banner.map((reg) => {
        if (reg.id == id) {
          reg[inputName] = value;
          if (inputName == "buttonText" && value == "") {
            delete reg[inputName];
          }
        }
        return reg;
      });
      setEdited((prev) => ({ ...prev, banner: newBanner }));
    }

    function addNew() {
      const newBanner = { ...edited };
      newBanner.banner.push({
        id: uuidv4(),
        src: "",
        href: "#",
      });

      setEdited(newBanner);
    }
    function remove(id) {
      const newBanner = { ...edited };
      newBanner.banner = newBanner.banner.filter((e) => e.id != id);
      setEdited(newBanner);
    }

    return (
      <Modal
        isOpen={modal}
        isCentered
        onClose={() => {
          setData(edited);
          setModal(false);
        }}
        width="100%"
      >
        <ModalOverlay />
        <ModalContent width="100%">
          <ModalCloseButton minWidth={"20vw"} background={"green.500"} _hover={{ background: 'green.400' }}><Text fontWeight={'bold'}>Manter alterações</Text></ModalCloseButton>
          <ModalHeader>
            Alteração banner{" "}
            <Button colorScheme="blue" onClick={addNew}>
              Add
            </Button>
          </ModalHeader>
          <ModalBody overflow={"scroll"} width={"100%"}>
            <Grid
              width={"100%"}
              alignItems="center"
              justifyContent={"space-between"}
              gap={4}
            >
              {edited.banner.map((banner) => (
                <Flex
                  flexDirection={"column"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  gap={10}
                  background={"#CCC"}
                  rounded={"10px"}
                  paddingBottom={10}
                  paddingX={3}
                  key={banner.id}
                >
                  <Button
                    marginTop={3}
                    alignSelf={"end"}
                    colorScheme="red"
                    onClick={() => remove(banner.id)}
                  >
                    X
                  </Button>
                  {banner.src && (
                    <Image
                      src={banner.src}
                      height="auto"
                      width="80%"
                      rounded={"10px"}
                    />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(el) => selectFile(banner.id, el)}
                  />
                  <Input
                    background={"#ffffff"}
                    defaultValue={banner.href}
                    name={`href`}
                    onChange={(event) => changeValue(banner.id, event)}
                  />
                  <Flex flexDirection={"column"} gap={2}>
                    <Flex
                      justifyContent={"space-between"}
                      alignItems={"center"}
                      gap={2}
                    >
                      <Input
                        border={0}
                        background={banner.buttonHex ?? "#2c6cb0"}
                        color={banner.buttonTextHex ?? "#000000"}
                        defaultValue={banner.buttonText}
                        name={`buttonText`}
                        onChange={(event) => changeValue(banner.id, event)}
                      />
                      <input
                        type="color"
                        defaultValue={banner.buttonHex ?? "#2c6cb0"}
                        name={`buttonHex`}
                        onChange={(event) => changeValue(banner.id, event)}
                      />
                      <input
                        type="color"
                        defaultValue={banner.buttonTextHex ?? "#000000"}
                        name={`buttonTextHex`}
                        onChange={(event) => changeValue(banner.id, event)}
                      />
                    </Flex>
                    <Text fontSize={"80%"}>
                      O botão será removido do banner se estiver vazio
                    </Text>
                  </Flex>
                </Flex>
              ))}
            </Grid>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  }

  return (
    <Box maxH="0%" w="100%">
      {isEdit && (
        <>
          <Button
            position={"relative"}
            transform="translate(10%, 120%)"
            zIndex={99}
            onClick={() => setModal(true)}
          >
            Editar
          </Button>
          <Form />
        </>
      )}
      <Carousel />
    </Box>
  );
}
