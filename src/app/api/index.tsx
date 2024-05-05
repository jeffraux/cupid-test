const BASE_URL = "https://fedt.unruffledneumann.xyz/api/v1";
const DEFAULT_HEADERS = {
  "X-API-Key": "rLn*xzeZ%U+(PRuK%:v@C(a3j=<.[TWX(F^,EDrv",
};

const getData = async (url: string) => {
  // const response = await fetch(`${BASE_URL}${url}/13/states`, {
  const response = await fetch(`${BASE_URL}${url}`, {
    headers: DEFAULT_HEADERS,
  });
  const jsonResponse = await response.json();

  return jsonResponse;
}

export {
  getData,
};
