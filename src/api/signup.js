import axios from "axios";
import { API_URL } from "../config";

const signupapi = async (username, email, fullName, password) => {
  const res = await axios({
    url: API_URL + "/api/v1/auth/user/register",
    method: "post",
    data: {
      username,
      email,
      fullName,
      password,
    },
  });
  const result = await res.data;
  return result;
};

export default signupapi;
