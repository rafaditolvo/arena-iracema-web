import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Grid,
  Heading,
  Icon,
  IconButton,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  createIcon,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useState } from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import { v4 as uuidv4 } from "uuid";

import { toBase64 } from "../utils/base64";

export const Blur = (props) => {
  return (
    <Icon
      width={useBreakpointValue({ base: "100%", md: "40vw", lg: "30vw" })}
      zIndex={useBreakpointValue({ base: -1, md: -1, lg: 0 })}
      height="860px"
      viewBox="0 0 528 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="71" cy="300" r="111" fill=" #FF7F00" />
    </Icon>
  );
};

export default function Hero({ data, setData = () => { }, isEdit = false }) {
  const [modal, setModal] = useState(false);
  if (!data) {
    return <div>Propriedade 'data' não fornecida.</div>;
  }

  const Carousel = () => {
    const settings = {
      //infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      dots: true,
      appendDots: (dots) => <ul style={{ margin: "0px" }}>{dots}</ul>,
    };

    return (
      <Slider {...settings}>
        {data.events.map((event) => (
          <Image
            key={event.id}
            alt={"Event Image"}
            w={"100%"}
            h="100%"
            objectFit="cover"
            src={event.src}
          />
        ))}
      </Slider>
    );
  };

  function Form() {
    const [edited, setEdited] = useState(data);

    function changeValue(id, event) {
      const target = event.target;
      const inputName = target.name;
      const value = target.value;
      // edited.eventsTitle = value;

      setEdited((prev) => ({ ...prev, eventsTitle: value }));
    }
    async function selectFile(id, event) {
      const base64 = await toBase64(event.target.files[0]);
      const objectUrl = URL.createObjectURL(event.target.files[0]);
      const newBanner = edited.events.map((reg) => {
        if (reg.id == id) {
          reg.base64 = base64;
          reg.src = objectUrl;
          reg.fileType = event.target.files[0].type;
          reg.fileName = event.target.files[0].name;
        }
        return reg;
      });
      setEdited((prev) => ({ ...prev, events: newBanner }));
    }

    function addNew() {
      const newBanner = { ...edited };
      newBanner.events.push({
        id: uuidv4(),
        src: "",
      });

      setEdited(newBanner);
    }
    function remove(id) {
      const newBanner = { ...edited };
      newBanner.events = newBanner.events.filter((e) => e.id != id);
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
        size={"lg"}
      >
        <ModalOverlay />
        <ModalContent width="100%" minWidth={'80vw'} >
          <ModalCloseButton minWidth={"180px"} background={"green.500"} _hover={{ background: 'green.400' }}><Text fontWeight={'bold'}>Manter alterações</Text></ModalCloseButton>
          <ModalHeader>
            Alteração Eventos

          </ModalHeader>
          <ModalBody overflow={"scroll"} width={"100%"} >
            <ModalHeader>
              <Text
                as={"span"}
                bgGradient="linear(to-r, #FF7F00, #FFD700, #00BFFF, #9901F6)"
                bgClip="text"
                fontSize={{ base: "5xl", sm: "4xl", md: "5xl", lg: "6xl" }}
              >
                {edited.eventsTitle}
              </Text>
            </ModalHeader>
            <Flex
              flexDirection={"column"}
              alignItems={"center"}
              justifyContent={"space-between"}
              gap={4}
              background={"#CCC"}
              rounded={"10px"}
              paddingY={2}
              paddingX={2}
            >
              <Input
                background={"#ffffff"}
                defaultValue={edited.eventsTitle}
                name={`title`}
                onChange={(event) => changeValue(null, event)}
              />
            </Flex>
            <Divider my={10} />
            <Button colorScheme="blue" onClick={addNew}>
              Add
            </Button>
            <Grid
              width={"100%"}
              alignItems="center"
              justifyContent={"center"}
              gap={4}
            >
              {edited.events.map((banner) => (
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
                </Flex>
              ))}
            </Grid>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  }

  return (
    <>
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
      <Container maxW={"7xl"} mt="3em" id="eventosId">
        <Heading
          lineHeight={1.1}
          fontWeight={600}
          fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
          textAlign="start"
        >
          <Text
            as={"span"}
            bgGradient="linear(to-r, #FF7F00, #FFD700, #00BFFF, #9901F6)"
            bgClip="text"
          >
            {data?.eventsTitle}
          </Text>{" "}
        </Heading>
        <Stack
          align={"center"}
          spacing={{ base: 10, md: 20 }}
          py={{ base: 30, md: 30 }}
          direction={{ base: "column", md: "row" }}
        >
          <Stack flex={1} spacing={{ base: 10, md: 10 }}></Stack>

          <Flex
            flex={1}
            justify={"center"}
            align={"center"}
            position={"relative"}
            w={"full"}
          >
            <Blob
              w={"150%"}
              h={"150%"}
              position={"absolute"}
              top={"-20%"}
              left={0}
              zIndex={-1}
              color="#00BFFF"
            />

            <Box
              position={"relative"}
              h="100%"
              rounded={"2xl"}
              boxShadow={"2xl"}
              width={"full"}
              overflow={"hidden"}
            >
              <IconButton
                aria-label={"Play Button"}
                variant={"ghost"}
                _hover={{ bg: "transparent" }}
                icon={<PlayIcon w={12} h={12} />}
                size={"lg"}
                color={"white"}
                position={"absolute"}
                left={"50%"}
                top={"50%"}
                transform={"translateX(-50%) translateY(-50%)"}
              />
              <Carousel />
            </Box>
          </Flex>
        </Stack>
      </Container>
    </>
  );
}

const PlayIcon = createIcon({
  displayName: "PlayIcon",
  viewBox: "0 0 58 58",
  d: "M28.9999 0.562988C13.3196 0.562988 0.562378 13.3202 0.562378 29.0005C0.562378 44.6808 13.3196 57.438 28.9999 57.438C44.6801 57.438 57.4374 44.6808 57.4374 29.0005C57.4374 13.3202 44.6801 0.562988 28.9999 0.562988ZM39.2223 30.272L23.5749 39.7247C23.3506 39.8591 23.0946 39.9314 22.8332 39.9342C22.5717 39.9369 22.3142 39.8701 22.0871 39.7406C21.86 39.611 21.6715 39.4234 21.5408 39.1969C21.4102 38.9705 21.3421 38.7133 21.3436 38.4519V19.5491C21.3421 19.2877 21.4102 19.0305 21.5408 18.8041C21.6715 18.5776 21.86 18.3899 22.0871 18.2604C22.3142 18.1308 22.5717 18.064 22.8332 18.0668C23.0946 18.0696 23.3506 18.1419 23.5749 18.2763L39.2223 27.729C39.4404 27.8619 39.6207 28.0486 39.7458 28.2713C39.8709 28.494 39.9366 28.7451 39.9366 29.0005C39.9366 29.2559 39.8709 29.507 39.7458 29.7297C39.6207 29.9523 39.4404 30.1391 39.2223 30.272Z",
});

export const Blob = (props) => {
  return (
    <Icon
      width={"100%"}
      viewBox="0 0 578 440"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M239.184 439.443c-55.13-5.419-110.241-21.365-151.074-58.767C42.307 338.722-7.478 282.729.938 221.217c8.433-61.644 78.896-91.048 126.871-130.712 34.337-28.388 70.198-51.348 112.004-66.78C282.34 8.024 325.382-3.369 370.518.904c54.019 5.115 112.774 10.886 150.881 49.482 39.916 40.427 49.421 100.753 53.385 157.402 4.13 59.015 11.255 128.44-30.444 170.44-41.383 41.683-111.6 19.106-169.213 30.663-46.68 9.364-88.56 35.21-135.943 30.551z"
        fill="currentColor"
      />
    </Icon>
  );
};
