const BASE_URL = process.env.REACT_APP_API_BASE_URL || "";

const buildApiUrl = (apiEndpoint) => {
  return `${BASE_URL}${apiEndpoint}`;
}

const ApiService = {
  buildApiUrl
};

export default ApiService;