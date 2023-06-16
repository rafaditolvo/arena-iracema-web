import {
  Box,
  Button,
  Flex,
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

export default function Sobre({ data, setData = () => {}, isEdit = false }) {
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
      >
        <ModalOverlay />
        <ModalContent width="100%">
          <ModalCloseButton />
          <ModalHeader>Alteração</ModalHeader>
          <ModalBody overflow={"scroll"} width="100%">
            <Flex
              marginTop="50px"
              flexDirection={"column"}
              alignItems={"center"}
              justifyContent={"space-between"}
              gap={2}
              background={"#CCC"}
              rounded={"10px"}
              paddingY={5}
              paddingX={3}
            >
              <Textarea
                placeholder="Here is a sample placeholder"
                marginY="30px"
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
          Conheça nossa História!
        </Text>
        <Text color={"gray.500"} mb={2} fontSize={{ base: "md", sm: "lg" }}>
          {data.sobre?.h1}
        </Text>
      </Box>
    </>
  );
}
