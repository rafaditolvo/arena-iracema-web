async function fetchJSON(token, json) {
  let options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(json),
  };
  const response = await fetch(
    "https://apsrwvwrccgyjgoj4hc2oltbbu0krhgd.lambda-url.us-east-1.on.aws/save",
    options
  );
  const status = await response.status;
  return status;
}
export { fetchJSON };
