const BASE_URL = "https://fedt.unruffledneumann.xyz/api/v1";
const DEFAULT_HEADERS = {
  "X-API-Key": "rLn*xzeZ%U+(PRuK%:v@C(a3j=<.[TWX(F^,EDrv",
};

const getData = async (url: string) => {
  try {
    const response = await fetch(`${BASE_URL}${url}`, {
      headers: DEFAULT_HEADERS,
    });
    const jsonResponse = await response.json();
  
    return jsonResponse;
  } catch (error) {
    console.warn(error);
  }
}

const getGeolocation = async (address: string) => {
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURI(address)}&format=json&limit=1&polygon_svg=1`);
    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (error) {
    console.warn(error);
  }
}

export {
  getData,
  getGeolocation,
};
