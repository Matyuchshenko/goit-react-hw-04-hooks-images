import axios from "axios";

const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "18815450-007739eb5f1c89a4d6d918d62";

axios.defaults.baseURL = BASE_URL;
axios.defaults.params = {
  key: API_KEY,
  image_type: "photo",
  orientation: "horizontal",
  per_page: 12,
};

const apiService = async (q, page) => {
  try {
    const { data } = await axios.get("", {
      params: { q, page },
    });
    return data.hits;
  } catch (error) {
    console.log("error", { error });
    return [];
  }
};

export default apiService;
