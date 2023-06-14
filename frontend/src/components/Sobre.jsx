import { Box, Text } from "@chakra-ui/react";

export default function Sobre({ data }) {
  if (!data) {
    return <div>Propriedade 'data' não fornecida.</div>;
  }

  return (
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
  );
}
