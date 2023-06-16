const AWS = require("aws-sdk");
const S3 = new AWS.S3({ region: "us-east-1", apiVersion: "2012-10-17" });

const jwt = require("jsonwebtoken");
const { randomUUID } = require("crypto");

const S3_BUCKET = process.env.S3_BUCKET ?? "saveform";
const DIRECTORY_STATIC = process.env.DIRECTORY_STATIC ?? "landpage/form";

const JWT_SECRET =
  "8d60f6a35bbe4d4d755f046699043fc5dd2d73c241287f483865adf9a964d8454d30e9b742dd6f310ec51f0bf97e021813a49e53726b56289dbf3a0a80cfb03e";

/**
 *
 * @param {string} data body json
 * @param {string} nameOfFile
 * @returns Promise<void>
 */
const putObjectToS3 = async (data, nameOfFile, paramsFile = null) =>
  new Promise((resolve, reject) => {
    const dateFormated = new Date()
      .toISOString()
      .replaceAll("-", "")
      .replaceAll(":", "")
      .split(".")[0];
    const [year, month, _] = new Date().toISOString().split("-");
    const fileName = `${dateFormated}_${randomUUID()}.json`;
    const directory = `${DIRECTORY_STATIC}/${year}${month}`;

    var params = {
      Bucket: S3_BUCKET,
      Key: `${directory}/${fileName}`,
      Body: data,
    };
    console.log("####params", params)
    S3.putObject(paramsFile ? paramsFile : params, function (err, data) {
      if (err) {
        console.log(err, err.stack); // an error occurred
        reject();
      } else {
        console.log("Put to s3 should have worked: " + data); // successful response
        resolve();
      }
    });
  });

/**
 * Validar token JWT
 * @param {string} token Bearer token
 * @returns Promise<{auth,message} | login>
 */
const validJWT = async (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, function (err, decoded) {
      if (err)
        reject({ auth: false, message: "Failed to authenticate token.", err });

      const login = decoded.login;
      resolve(login);
    });
  });

/**
 *
 * @param {headers, body} objeto
 * @returns {number,null}
 */
const save = async ({ headers, body }) => {
  const responseUnauthorized = {
    statusCode: 404,
    body: "{}",
  };

  const bearerToken = headers?.authorization ?? false;

  if (!bearerToken) {
    return responseUnauthorized;
  }
  const token = bearerToken.split(" ")[1];
  if(token != JWT_SECRET){
    return responseUnauthorized;
  }
  console.log(body);
  if(!body.dob || !body.email || !body.firstname || !body.phone ){
    return responseUnauthorized;
  }
  const newBody = {
    firstname : body.firstname,
    email : body.email,
    phone : body.phone,
    nasc: body.dob
  }

  try {
      try {
        await putObjectToS3(JSON.stringify(newBody), "data");
      } catch (errPutObjectToS3) {
        console.log(errPutObjectToS3);
        return {
          statusCode: 400,
          body: JSON.stringify("Não foi possível cadastrar a requisição"),
        };
      }
  } catch (errToken) {
    console.log(errToken);
    return responseUnauthorized;
  }
};
module.exports.handler = async (event) => {
  const rawPath = event?.rawPath ?? null;
  const body = JSON.parse(event.body);
  const headers = event.headers;

  const response = await save({ headers, body });
  return response;
};
