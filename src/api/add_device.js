import axios from "axios";
import { API_URL } from "../config";
import Cookies from "js-cookie"

const addDeviceApi = async (deviceName) => {
  const res = await axios({
    url: API_URL + "/api/v1/device/",
    method: "post",
    data: {
        deviceName: deviceName
    },
    headers: {
        "Authorization": "Bearer "+ Cookies.get("accessToken")
    }
  });
  const result = await res.data;
  return result;
};

export default addDeviceApi;
