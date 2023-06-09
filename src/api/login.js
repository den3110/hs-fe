import axios from "axios";
import { API_URL } from "../config";

const loginapi = async (username, password) => {
  const res = await axios({
    url: API_URL + "/api/v1/auth/user/login",
    method: "post",
    data: {
      username,
      password,
    },
  });
  const result = await res.data;
  return result;
};

export default loginapi;
