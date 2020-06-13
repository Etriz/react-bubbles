import axios from "axios";

const axiosWithAuth = () => {
  const token = localStorage.getItem("react-bubbles-token");

  return axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
      authorization: token,
    },
  });
};

export default axiosWithAuth;
