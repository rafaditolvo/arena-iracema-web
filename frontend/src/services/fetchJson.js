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
    "https://owa4t6eb4mlyrrvmxnn4vtusm40mjjih.lambda-url.us-east-2.on.aws/save",
    options
  );
  const status = await response.status;
  return status;
}
export { fetchJSON };
