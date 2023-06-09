import axios from "axios";
import { API_URL } from "../config";
import Cookies from "js-cookie"

const getDataApi = async () => {
  const res = await axios({
    url: API_URL + "/api/v1/data/647ef8476acc038a2885462d",
    method: "get",
    headers: {
        "Authorization": "Bearer "+ Cookies.get("accessToken")
    }
  });
  const result = await res.data;
  return result;
};

export default getDataApi;
