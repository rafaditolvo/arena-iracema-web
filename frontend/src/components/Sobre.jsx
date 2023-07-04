import {
  Box,
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";

export default function Sobre({ data, setData = () => { }, isEdit = false }) {
  const [modal, setModal] = useState(false);
  if (!data) {
    return <div>Propriedade 'data' não fornecida.</div>;
  }
  function Form() {
    const [edited, setEdited] = useState(data);

    function changeValue(id, event) {
      const target = event.target;
      const inputName = target.name;
      const value = target.value;
      edited.sobre[inputName] = value;

      setEdited((prev) => ({ ...prev, sobre: edited.sobre }));
    }
    return (
      <Modal
        isOpen={modal}
        isCentered
        onClose={() => {
          setData(edited);
          setModal(false);
        }}
      >
        <ModalOverlay />
        <ModalContent width="100%" minW={"60vw"}>
          <ModalCloseButton minWidth={"20vw"} background={"green.500"} _hover={{ background: 'green.400' }}><Text fontWeight={'bold'}>Manter alterações</Text></ModalCloseButton>
          <ModalHeader>Alteração</ModalHeader>
          <ModalBody overflow={"scroll"} width="100%">
            <Text
              fontSize={{ base: "5xl", sm: "6xl" }}
              textColor="#9901F6"
              mt={2}
              mb={2}
            >
              {edited.sobre.title}
            </Text>
            <Flex
              marginTop="50px"
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
                defaultValue={edited.sobre.title}
                name={`title`}
                onChange={(event) => changeValue(null, event)}
              />
              <Textarea
                marginTop={4}
                placeholder="Here is a sample placeholder"
                background={"#ffffff"}
                defaultValue={edited.sobre.h1}
                name={`h1`}
                rows={20}
                onChange={(event) => changeValue(null, event)}
              />
            </Flex>
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
            transform="translate(20%, 280%)"
            zIndex={99}
            onClick={() => setModal(true)}
          >
            Editar
          </Button>
          <Form />
        </>
      )}
      <Box
        textAlign="center"
        py={10}
        px={6}
        mt="4em"
        maxW="1400px"
        mx="auto"
        id="sobreId"
      >
        <Text
          fontSize={{ base: "5xl", sm: "6xl" }}
          textColor="#9901F6"
          mt={3}
          mb={2}
        >
          {data.sobre?.title}
        </Text>
        <Text color={"gray.500"} mb={2} fontSize={{ base: "md", sm: "lg" }}>
          {data.sobre?.h1}
        </Text>
      </Box>
    </>
  );
}
