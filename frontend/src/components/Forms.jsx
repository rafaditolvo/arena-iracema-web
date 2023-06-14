import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  chakra,
  SimpleGrid,
  Avatar,
  Image,
  AvatarGroup,
  useBreakpointValue,
  IconProps,
  Icon,
} from "@chakra-ui/react";
import axios from 'axios';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const avatars = [
  {
    name: "Ryan Florence",
    url: "https://avatars.githubusercontent.com/u/109284750?v=4",
  },
  {
    name: "Segun Adebayo",
    url: "https://avatars.githubusercontent.com/u/109284750?v=4",
  },
  {
    name: "Kent Dodds",
    url: "https://avatars.githubusercontent.com/u/109284750?v=4",
  },
  {
    name: "Prosper Otemuyiwa",
    url: "https://avatars.githubusercontent.com/u/109284750?v=4",
  },
  {
    name: "Christian Nwamba",
    url: "https://avatars.githubusercontent.com/u/109284750?v=4",
  },
];

export default function Forms() {

  const onSubmit = (values) => {
    console.log(values);
    // Lógica de envio do formulário aqui
  };

  const handleSubmit = async (formData) => {
    try {
      const response = await axios.post('http://localhost:4000/formulario', formData);
      console.log(response.data);
      // Faça algo com a resposta recebida, se necessário
    } catch (error) {
      console.error(error);
      // Lide com erros, se houver algum
    }
    console.log(formData)
  };
  
  
  // Exemplo de uso
  const formData = {
    email: 'example@example.com',
    nome: 'Fulano de Tal',
    dataAniversario: '1990-01-01'
  };
  

  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required('Campo obrigatório'),
    email: Yup.string().email('Email inválido').required('Campo obrigatório'),
    phone: Yup.string().required('Campo obrigatório'),
    dob: Yup.string().required('Campo obrigatório'),
  });



  
  return (
    <Box position={"relative"}>
      <Container
        as={SimpleGrid}
        maxW={"7xl"}
        mt="2em"
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 5, lg: 250 }}
        py={{ base: 20, sm: 40, lg: 42 }}
      >
        
        <Stack flex={1} spacing='50px'>
     
          <Heading
            lineHeight={1.1}
            
            fontSize={{ base: '5xl', sm: '4xl', md: '5xl', lg: '6xl' }}>
        
            <Text
              as={'span'}
              bgGradient="linear(to-r, #FF7F00, #FFD700, #00BFFF, #9901F6)"
              bgClip="text" fontSize={{ base: '5xl', sm: '4xl', md: '5xl', lg: '6xl' }}>
    Garanta seu Convite
            </Text>{' '}
       
          </Heading>
          
          <Text color={"gray.500"} fontSize={{ base: "lg", sm: "lg" }} w="100%">
              We’re looking for amazing engineers just like you! Become a part
              of our rockstar engineering team and skyrocket your career!
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
          It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
          and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </Text>
              <Image
          alt={"Hero Image 1"}
          borderRadius="20px"
          fit={"cover"}
          align={"center"}
          w={"100%"}
          h="100%"
          src={
            "https://arenadeiracema.plix.bio/u/p_1849_68132167162053410854264.41962711.png"
          }
        />
         </Stack>
        <Stack
          bg={"gray.50"}
          rounded={"xl"}
          p={{ base: 6, sm: 3, md: 10 }}
          spacing={{ base: 10 }}
          maxW={{ lg: "lg" }}
          mt='2em'

        >
       
          <Stack spacing={4}>
            <Heading
              color={"gray.800"}
              lineHeight={1.1}
              fontSize={{ base: "3xl", sm: "4xl", md: "5xl" }}
            >
             Só Falta Você
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
       {avatars.map((avatar) => (
         <Avatar
           key={avatar.name}
           name={avatar.name}
           src={avatar.url}
           size={{ base: "md", md: "lg" }}
           position={"relative"}
           zIndex={2}
           _before={{
             content: '""',
             width: "full",
             height: "full",
             rounded: "full",
             transform: "scale(1.125)",
             bgGradient: "linear-gradient(to bottom left, #FF7F00, #FFD700, #00BFFF, #9901F6)",
             position: "absolute",
             zIndex: -1,
             top: 0,
             left: 0,
           }}
         />
       ))}
     </AvatarGroup>
     <Text fontFamily={"heading"} fontSize={{ base: "4xl", md: "6xl" }}>
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
       minWidth={useBreakpointValue({ base: "44px", md: "60px" })}
       minHeight={useBreakpointValue({ base: "44px", md: "60px" })}
       position={"relative"}
       _before={{
         content: '""',
         width: "full",
         height: "full",
         rounded: "full",
         transform: "scale(1.125)",
         bgGradient: "linear-gradient(to bottom left, #FF7F00, #FFD700, #00BFFF, #9901F6)",
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
    dob: ""
  }}
  validationSchema={validationSchema}
  onSubmit={handleSubmit} // Certifique-se de que handleSubmit esteja definido corretamente
>
  {({ errors, touched, isValid }) => (
    <Form>
      <Stack spacing={4}>
        <Field
          as={Input}
          name="firstname" // Corrigido para "firstname"
          placeholder="Firstname"
          bg="gray.100"
          border={0}
          color="gray.500"
          _placeholder={{
            color: "gray.500"
          }}
        />
        {errors.firstname && touched.firstname && (
          <ErrorMessage component="span" name="firstname" color="red" />
        )}

        <Field
          as={Input}
          name="email"
          placeholder="firstname@lastname.io"
          bg="gray.100"
          border={0}
          color="gray.500"
          _placeholder={{
            color: "gray.500"
          }}
        />
        {errors.email && touched.email && (
          <ErrorMessage component="span" name="email" color="red" />
        )}

        <Field
          as={Input}
          name="phone"
          placeholder=" (__) _____-____"
          bg="gray.100"
          border={0}
          color="gray.500"
          _placeholder={{
            color: "gray.500"
          }}
        />
        {errors.phone && touched.phone && (
          <ErrorMessage component="span" name="phone" color="red" />
        )}

        <Field
          as={Input}
          name="dob"
          type="date"
          bg="gray.100"
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
          boxShadow: "xl"
        }}
        isDisabled={!isValid}
      >
        Enviar
      </Button>
    </Form>
  )}
</Formik>




   <Text color={"gray.500"} fontSize={{ base: "sm", sm: "lg" }}>
             
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
          It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
          
            </Text>
 </Stack>
          <Box as={"form"} mt={5}>
            <Stack spacing={4}>
  
            </Stack>
           
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
