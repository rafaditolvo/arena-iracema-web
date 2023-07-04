import { CheckCircleIcon } from "@chakra-ui/icons";
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Center,
  Container,
  Flex,
  Grid,
  Heading,
  Icon,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { motion } from "framer-motion";
import { useState } from "react";
import InputMask from "react-input-mask";
import * as Yup from "yup";

import { toBase64 } from "../utils/base64";

export default function Forms({ data, setData = () => { }, isEdit = false }) {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const [modal, setModal] = useState(false);

  const ModalAnimate = motion.div;

  const openSuccessModal = () => {
    setShowSuccessModal(true);
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const openErrorModal = () => {
    setShowErrorModal(true);
  };

  const closeErrorModal = () => {
    setShowErrorModal(false);
  };

  const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
`;

  const onSubmit = (values) => {
    // Lógica de envio do formulário aqui
  };

  const handleSubmit = async (formData) => {
    try {
      const token =
        "8d60f6a35bbe4d4d755f046699043fc5dd2d73c241287f483865adf9a964d8454d30e9b742dd6f310ec51f0bf97e021813a49e53726b56289dbf3a0a80cfb03e";
      // const token = await generateToken();
      const response = await axios.post(
        `https://ovsxxbefxf24c5jquasfca5e440xgmhp.lambda-url.us-east-1.on.aws/`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // const debug = response.data;
      openSuccessModal();
    } catch (error) {
      openErrorModal();
    }
  };


  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required("Campo obrigatório"),
    email: Yup.string().email("Email inválido").required("Campo obrigatório"),
    phone: Yup.string().required("Campo obrigatório"),
    dob: Yup.string().required("Campo obrigatório"),
  });

  const inputStyle = {
    bg: "gray.100",
    border: 0,
    color: "gray.500",
    _placeholder: {
      color: "gray.500",
    },
  };

  function FormEdit() {
    const [edited, setEdited] = useState(data);
    async function selectFile(id, event) {
      if (event.target.files.length == 0) return;

      const base64 = await toBase64(event.target.files[0]);
      const objectUrl = URL.createObjectURL(event.target.files[0]);
      if (id) {
        edited.form.avatar = edited.form.avatar.map((reg) => {
          if (reg.id == id) {
            reg.base64 = base64;
            reg.src = objectUrl;
            reg.fileType = event.target.files[0].type;
            reg.fileName = event.target.files[0].name;
          }
          return reg;
        });
      } else {
        edited.form.src = objectUrl;
        edited.form.base64 = base64;
      }
      setEdited((prev) => ({ ...prev, form: edited.form }));
    }

    function changeValue(id, event) {
      const target = event.target;
      const inputName = target.name;
      const value = target.value;
      edited.form[inputName] = value;

      setEdited((prev) => ({ ...prev, form: edited.form }));
    }
    return (
      <Modal
        isOpen={modal}
        isCentered
        onClose={() => {
          setData(edited);
          setModal(false);
        }}
        size="full"
      >
        <ModalOverlay />
        <ModalContent width="100%">
          <ModalCloseButton />
          <ModalHeader>Alteração</ModalHeader>
          <ModalBody overflow={"scroll"} width="100%">
            <ModalHeader>
              <Text
                as={"span"}
                bgGradient="linear(to-r, #FF7F00, #FFD700, #00BFFF, #9901F6)"
                bgClip="text"
                fontSize={{ base: "5xl", sm: "4xl", md: "5xl", lg: "6xl" }}
              >
                {edited.form.title}
              </Text>
            </ModalHeader>
            <Flex
              flexDirection={"column"}
              alignItems={"center"}
              justifyContent={"space-between"}
              gap={4}
              background={"#CCC"}
              rounded={"10px"}
              paddingY={5}
              paddingX={3}
            >
              <Input
                background={"#ffffff"}
                defaultValue={edited.form.title}
                name={`title`}
                onChange={(event) => changeValue(null, event)}
              />
              <Input
                background={"#ffffff"}
                defaultValue={edited.form.h1}
                name={`h1`}
                onChange={(event) => changeValue(null, event)}
              />

              <Image
                src={edited.form.src}
                height="auto"
                width="20%"
                rounded={"10px"}
              />
              <input
                type="file"
                accept="image/*"
                onChange={(el) => selectFile(null, el)}
              />

            </Flex>
            <ModalHeader marginTop={'50px'}>
              <Heading
                color={"gray.800"}
                lineHeight={1.1}
                fontSize={{ base: "3xl", sm: "4xl", md: "5xl" }}
              >
                {edited.form.titleForm}
                <Text
                  as={"span"}
                  bgGradient="linear-gradient(to bottom left, #FF7F00, #FFD700, #00BFFF, #9901F6)"
                  bgClip="text"
                >
                  !
                </Text>
              </Heading>
            </ModalHeader>
            <Flex
              flexDirection={"column"}
              alignItems={"center"}
              justifyContent={"space-between"}
              gap={2}
              background={"#CCC"}
              rounded={"10px"}
              paddingY={2}
              paddingX={2}
            >
              <Input
                background={"#ffffff"}
                defaultValue={edited.form.titleForm}
                name={`titleForm`}
                onChange={(event) => changeValue(null, event)}
              />
            </Flex>
            <Stack marginTop={10} direction={"row"} spacing={4} align={"center"}>
              <AvatarGroup>
                {data.form?.avatar?.map((avatar) => (
                  <Avatar
                    key={avatar.id}
                    name={avatar.id.toString()}
                    src={avatar.src}
                    size={{ base: "md", md: "lg" }}
                    position={"relative"}
                    zIndex={2}
                    _before={{
                      content: '""',
                      width: "full",
                      height: "full",
                      rounded: "full",
                      transform: "scale(1.125)",
                      bgGradient:
                        "linear-gradient(to bottom left, #FF7F00, #FFD700, #00BFFF, #9901F6)",
                      position: "absolute",
                      zIndex: -1,
                      top: 0,
                      left: 0,
                    }}
                  />
                ))}
              </AvatarGroup>

              <Text
                fontFamily={"heading"}
                fontSize={{ base: "4xl", md: "6xl" }}
              >
                +
              </Text>
              <Flex
                align={"center"}
                justify={"center"}
                fontFamily={"heading"}
                fontSize={{ base: "sm", md: "lg" }}
                bg={"gray.800"}
                color={"white"}
                rounded={"full"}
                minWidth={{ base: "44px", md: "60px" }}
                minHeight={{ base: "44px", md: "60px" }}
                position={"relative"}
                _before={{
                  content: '""',
                  width: "full",
                  height: "full",
                  rounded: "full",
                  transform: "scale(1.125)",
                  bgGradient:
                    "linear-gradient(to bottom left, #FF7F00, #FFD700, #00BFFF, #9901F6)",
                  position: "absolute",
                  zIndex: -1,
                  top: 0,
                  left: 0,
                }}
              >
                Você
              </Flex>
            </Stack>
            <Grid
              width="100%"
              alignItems="center"
              justifyContent={"space-between"}
              gap={2}
              templateColumns="repeat(3, 1fr)"
            >
              {edited.form.avatar.map((avatar) => (
                <Flex
                  flexDirection={"column"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  gap={2}
                  background={"#CCC"}
                  rounded={"10px"}
                  paddingBottom={5}
                  paddingTop={5}
                  paddingX={3}
                  key={avatar.id}
                >
                  {avatar.src && (
                    <Avatar
                      key={avatar.id}
                      name={avatar.id.toString()}
                      src={avatar.src}
                      size={{ base: "md", md: "lg" }}
                      position={"relative"}
                      zIndex={2}
                      _before={{
                        content: '""',
                        width: "full",
                        height: "full",
                        rounded: "full",
                        transform: "scale(1.125)",
                        bgGradient:
                          "linear-gradient(to bottom left, #FF7F00, #FFD700, #00BFFF, #9901F6)",
                        position: "absolute",
                        zIndex: -1,
                        top: 0,
                        left: 0,
                      }}
                    />
                  )}

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(el) => selectFile(avatar.id, el)}
                  />
                </Flex>
              ))}
            </Grid>

            <ModalHeader marginTop="50px">Texto formulário</ModalHeader>
            <Flex
              flexDirection={"column"}
              alignItems={"center"}
              justifyContent={"space-between"}
              gap={2}
              background={"#CCC"}
              rounded={"10px"}
              paddingY={2}
              paddingX={2}
            >
              <Input
                background={"#ffffff"}
                defaultValue={edited.form.h2}
                name={`h2`}
                onChange={(event) => changeValue(null, event)}
              />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal >
    );
  }
  return (
    <Box position={"relative"} id="conviteId">
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
          <FormEdit />
        </>
      )}
      <Container
        as={SimpleGrid}
        maxW={"7xl"}
        mt="2em"
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 5, lg: 250 }}
        py={{ base: 20, sm: 40, lg: 42 }}
      >
        {/* Modal de sucesso */}
        <Modal
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          isOpen={showSuccessModal}
          w="80%"
          onClose={closeSuccessModal}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalBody>
              <Center>
                {" "}
                <Icon
                  as={CheckCircleIcon}
                  w={20}
                  h={20}
                  mt="2em"
                  color="green.500"
                  animation={`${pulseAnimation} 1s infinite`}
                />
              </Center>

              <Text mt={6} textAlign="center">
                Seu formulário foi enviado com sucesso.
              </Text>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={closeSuccessModal}>
                Fechar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Modal de erro */}
        <Modal isOpen={showErrorModal} onClose={closeErrorModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Erro!</ModalHeader>
            <ModalBody>
              Houve um erro ao enviar o formulário. Por favor, tente novamente.
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="red" onClick={closeErrorModal}>
                Fechar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Stack flex={1} spacing="50px">
          <Heading
            lineHeight={1.1}
            fontSize={{ base: "5xl", sm: "4xl", md: "5xl", lg: "6xl" }}
          >
            <Text
              as={"span"}
              bgGradient="linear(to-r, #FF7F00, #FFD700, #00BFFF, #9901F6)"
              bgClip="text"
              fontSize={{ base: "5xl", sm: "4xl", md: "5xl", lg: "6xl" }}
            >
              {data.form?.title}
            </Text>{" "}
          </Heading>
          <Text color={"gray.500"} fontSize={{ base: "lg", sm: "lg" }} w="100%">
            {data.form?.h1}
          </Text>
          <Image
            alt={"Hero Image 1"}
            borderRadius="20px"
            fit={"cover"}
            align={"center"}
            w={"100%"}
            h="100%"
            src={data.form?.src}
          />
        </Stack>
        <Stack
          bg={"gray.50"}
          rounded={"xl"}
          p={{ base: 6, sm: 3, md: 10 }}
          spacing={{ base: 10 }}
          maxW={{ lg: "lg" }}
          mt="2em"
        >
          <Stack spacing={4}>
            <Heading
              color={"gray.800"}
              lineHeight={1.1}
              fontSize={{ base: "3xl", sm: "4xl", md: "5xl" }}
            >
              {data.form?.titleForm}
              <Text
                as={"span"}
                bgGradient="linear-gradient(to bottom left, #FF7F00, #FFD700, #00BFFF, #9901F6)"
                bgClip="text"
              >
                !
              </Text>
            </Heading>
          </Stack>

          <Stack spacing={{ base: 10, md: 20 }}>
            <Stack direction={"row"} spacing={4} align={"center"}>
              <AvatarGroup>
                {data.form?.avatar?.map((avatar) => (
                  <Avatar
                    key={avatar.id}
                    name={avatar.id.toString()}
                    src={avatar.src}
                    size={{ base: "md", md: "lg" }}
                    position={"relative"}
                    zIndex={2}
                    _before={{
                      content: '""',
                      width: "full",
                      height: "full",
                      rounded: "full",
                      transform: "scale(1.125)",
                      bgGradient:
                        "linear-gradient(to bottom left, #FF7F00, #FFD700, #00BFFF, #9901F6)",
                      position: "absolute",
                      zIndex: -1,
                      top: 0,
                      left: 0,
                    }}
                  />
                ))}
              </AvatarGroup>

              <Text
                fontFamily={"heading"}
                fontSize={{ base: "4xl", md: "6xl" }}
              >
                +
              </Text>
              <Flex
                align={"center"}
                justify={"center"}
                fontFamily={"heading"}
                fontSize={{ base: "sm", md: "lg" }}
                bg={"gray.800"}
                color={"white"}
                rounded={"full"}
                minWidth={{ base: "44px", md: "60px" }}
                minHeight={{ base: "44px", md: "60px" }}
                position={"relative"}
                _before={{
                  content: '""',
                  width: "full",
                  height: "full",
                  rounded: "full",
                  transform: "scale(1.125)",
                  bgGradient:
                    "linear-gradient(to bottom left, #FF7F00, #FFD700, #00BFFF, #9901F6)",
                  position: "absolute",
                  zIndex: -1,
                  top: 0,
                  left: 0,
                }}
              >
                Você
              </Flex>
            </Stack>
            <Formik
              initialValues={{
                firstname: "",
                email: "",
                phone: "",
                dob: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, isValid }) => (
                <Form>
                  <Stack spacing={4}>
                    <Text size="sm" mt="0.5em" color="blue" >Seu Nome </Text>
                    <Field
                      as={Input}
                      name="firstname" // Corrigido para "firstname"
                      placeholder="Nome"
                      bg="gray.100"
                      border={0}
                      color="gray.500"
                      _placeholder={{
                        color: "gray.500",
                      }}
                    />
                    {errors.firstname && touched.firstname && (
                      <ErrorMessage
                        component="span"
                        name="firstname"
                        color="red"
                      />
                    )}
                    <Text size="sm" mt="1em" color="blue"  >O seu melhor e-mail! </Text>
                    <Field
                      as={Input}
                      name="email"
                      placeholder="E-mail"
                      bg="gray.100"
                      border={0}
                      color="gray.500"
                      _placeholder={{
                        color: "gray.500",
                      }}
                    />
                    {errors.email && touched.email && (
                      <ErrorMessage component="span" name="email" color="red" />
                    )}
                    <Text size="sm" mt="1em" color="blue" >Telefone </Text>
                    <Field name="phone">
                      {({ field }) => (
                        <Input
                          {...field}
                          as={InputMask}
                          mask="(99) 99999-9999"
                          placeholder="(__) _____-____"
                          className="Telefone"
                          color="gray.500"
                          _placeholder={{
                            color: "gray.500",
                          }}
                        />
                      )}
                    </Field>

                    {errors.phone && touched.phone && (
                      <ErrorMessage component="span" name="phone" color="red" />
                    )}
                    <Text size="sm" mt="1em" color="blue">Data de Aniversário </Text>
                    <Field
                      as={Input}
                      name="dob"
                      type="date"
                      bg="gray.100"
                      placeholder="Data de Aniversário"
                      border={0}
                      color="gray.500"
                    />

                    {errors.dob && touched.dob && (
                      <ErrorMessage component="span" name="dob" color="red" />
                    )}
                  </Stack>
                  <Button
                    type="submit"
                    fontFamily="heading"
                    mt={8}
                    w="full"
                    bgGradient="linear(to-r, #9901F6, yellow.400)"
                    color="white"
                    _hover={{
                      bgGradient: "linear(to-r, red.400, pink.400)",
                      boxShadow: "xl",
                    }}
                    isDisabled={!isValid}
                  >
                    Enviar
                  </Button>
                </Form>
              )}
            </Formik>

            <Text color={"gray.500"} fontSize={{ base: "sm", sm: "lg" }}>
              {data.form?.h2}
            </Text>
          </Stack>
          <Box as={"form"} mt={5}>
            <Stack spacing={4}></Stack>
          </Box>
        </Stack>
      </Container>
      <Blur
        position={"absolute"}
        top={-10}
        left={-10}
        style={{ filter: "blur(70px)" }}
      />
    </Box>
  );
}

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
