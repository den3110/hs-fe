import axios from "axios";
import { API_URL } from "../config";
import Cookies from "js-cookie"

const deleteDeviceApi = async (deviceId) => {
  const res = await axios({
    url: API_URL + "/api/v1/device/"+ deviceId,
    method: "delete",
    headers: {
        "Authorization": "Bearer "+ Cookies.get("accessToken")
    }
  });
  const result = await res.data;
  return result;
};

export default deleteDeviceApi;
