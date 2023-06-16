import { LockIcon, TriangleDownIcon } from "@chakra-ui/icons";
import { Box, IconButton, SkeletonText, Spacer, Text } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import Footer from "./components/Footer";
import Forms from "./components/Forms";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Sobre from "./components/Sobre";
import ImageCarousel from "./components/img/ImageCarousel";

import { fetchJSON } from "./services/fetchJson";
import UploadService from "./services/fileUpload";
const dataJson = require("./data.json");

const Placeholder = () => (
  <Box padding="6" boxShadow="lg" bg="white">
    <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
  </Box>
);

function Config({ setInvalidAuth, token, tokenExpired, backMenu }) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(dataJson);
  const [isSave, setIsSave] = useState(true);
  const [loading, setLoading] = useState(false);

  const intervalIsAuth = useRef();

  function saveData(data) {
    setIsSave(false);
    setData(data);
  }

  function loopIsAuth() {
    const idInterval = setInterval(() => {
      isAuth();
    }, 10000);
    intervalIsAuth.current = idInterval;
  }
  async function isAuth() {
    if (tokenExpired(token)) {
      logout();
      return;
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 100);
    loopIsAuth();
    return () => {
      clearInterval(intervalIsAuth.current);
    };
  }, []);

  function logout() {
    clearInterval(intervalIsAuth.current);
    setTimeout(() => {
      setInvalidAuth();
    }, 1);
  }

  async function uploadJson(json) {
    const status = await fetchJSON(token, json);
    if (status == 403) {
      setInvalidAuth();
    } else if (status == 200) {
      setIsSave(true);
    }
    return;
  }

  const findOrReplaceProps = (obj, listBase64, replace = false) => {
    if (typeof obj == "object" && typeof obj.length == "undefined") {
      // obj
      if (!replace && obj.base64) {
        listBase64.push({
          src: obj.src,
          base64: obj.base64,
          fileType: obj.fileType,
          fileName: obj.fileName,
        });
        delete obj.base64;
        delete obj.fileType;
        delete obj.fileName;
      } else if (replace && obj.src) {
        const findSrc = listBase64.find((e) => e.idResolve == obj.src);
        if (findSrc) {
          obj.src = findSrc.data;
        }
      }
      const arr = Object.entries(obj);
      if (arr.length > 0) {
        arr.map((entries) => {
          findOrReplaceProps(obj[entries[0]], listBase64, replace);
        });
      }
    } else if (typeof obj == "object" && typeof obj.length != "undefined") {
      // array
      obj.map((value) => {
        findOrReplaceProps(value, listBase64, replace);
      });
    }
  };
  const uploadAllImages = async (list) =>
    new Promise((resolve, reject) => {
      const arrPromises = [];
      list.map((reg) => {
        arrPromises.push(
          UploadService.upload(
            {
              fileType: reg.fileType,
              fileName: reg.fileName,
              base64: reg.base64,
              idResolve: reg.src,
            },
            token,
            (event) => {}
          )
        );
      });

      Promise.all(arrPromises).then((res) => {
        resolve(res);
      });
    });

  async function imageChangeAnalize(json) {
    const listBase64 = [];
    findOrReplaceProps(json, listBase64);
    const newListImage = await uploadAllImages(listBase64);
    findOrReplaceProps(json, newListImage, true);
    return json;
  }
  async function salvarJSON() {
    if (!token || token == "") {
      setInvalidAuth();
    }
    setLoading(true);
    const newJson = await imageChangeAnalize(data);
    await uploadJson(newJson);
    setLoading(false);
  }

  function BoxSaveAlert() {
    return (
      <Box
        bg={isSave ? "gray.700" : "red.200"}
        w="100%"
        p={3}
        color="white"
        // position={"fixed"}
        display="flex"
        justify={{ base: "center", md: "center" }}
        align={{ base: "center", md: "center" }}
        zIndex={2}
      >
        <IconButton
          aria-label="Sair"
          p={5}
          colorScheme="gray"
          icon={
            <>
              <LockIcon me={5} /> <Text fontWeight={"bold"}>Sair</Text>
            </>
          }
          onClick={logout}
          isDisabled={loading}
        />
        <IconButton
          aria-label="Sair"
          p={5}
          ml={10}
          colorScheme="gray"
          icon={
            <>
              <Text fontWeight={"bold"}>Menu</Text>
            </>
          }
          onClick={backMenu}
          isDisabled={loading}
        />
        <Spacer />
        <Box display="flex" justifyContent="flex-end">
          {!isSave && (
            <IconButton
              aria-label="Salvar"
              p={5}
              // background={"red.600"}
              colorScheme="red"
              icon={
                <>
                  {loading && "Salvando..."}
                  {!loading && (
                    <>
                      <TriangleDownIcon me={5} />{" "}
                      <Text fontWeight={"bold"}>Salvar!</Text>
                    </>
                  )}
                </>
              }
              onClick={() => salvarJSON()}
              disabled={loading}
              isDisabled={loading}
            />
          )}
        </Box>
      </Box>
    );
  }
  return (
    <div className="app-container">
      <BoxSaveAlert />
      {isLoading ? <Placeholder /> : <Navbar />}
      {isLoading ? (
        <Placeholder />
      ) : (
        <ImageCarousel data={data} setData={saveData} isEdit={true} />
      )}
      {isLoading ? (
        <Placeholder />
      ) : (
        <Forms data={data} setData={saveData} isEdit={true} />
      )}
      {isLoading ? (
        <Placeholder />
      ) : (
        <Hero data={data} setData={saveData} isEdit={true} />
      )}
      {isLoading ? (
        <Placeholder />
      ) : (
        <Sobre data={data} setData={saveData} isEdit={true} />
      )}
      {isLoading ? <Placeholder /> : <Footer data={data} isEdit={true} />}
    </div>
  );
}

export default Config;
