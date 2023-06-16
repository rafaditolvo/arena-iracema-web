import axios from "axios";

export default axios.create({
  baseURL:
    "https://apsrwvwrccgyjgoj4hc2oltbbu0krhgd.lambda-url.us-east-1.on.aws",
  headers: {
    "Content-type": "application/json",
  },
});
