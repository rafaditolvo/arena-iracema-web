import { Box, Heading, Text, Button } from '@chakra-ui/react';

export default function Sobre() {
  return (
    <Box textAlign="center" py={10} px={6} mt="4em" maxW="1400px" mx="auto">
     
      <Text fontSize={{ base: "5xl", sm: "6xl" }} textColor="#9901F6" mt={3} mb={2}>
        Conheça nossa História!
      </Text>
      <Text color={'gray.500'} mb={2} fontSize={{ base: "md", sm: "lg" }}>
        Snippy is a rich coding snippets app that lets you create your own
        code snippets, categorize them, and even sync them in the cloud so
        you can use them anywhere. All that is free!

        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
        It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
        and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
      </Text>
    </Box>
  );
}
