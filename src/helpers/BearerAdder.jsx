// import { LOGIN_URL } from "../config/const";
// import Auth from "./auth.service";
// import { history } from "./history";
// import Storage from "./storage.service";

// request interceptor function
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const requestInterceptor = (request, response) => {
  // const navigate = useNavigate();
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
  if (localStorage.getItem("token")) {
    request.headers["Authorization"] =
      "Bearer " + localStorage.getItem("token");
  }
  // if (response.data.message == "Unauthenticated.") {
  //   navigate("/user/login");
  // }
  return request;
};
// const navigate = useNavigate();
// export default const responseInterceptor(response,error) {
//   if (response) {
//     console.log("response",response.data);
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     return response;
//   }
//   if (error) {
//     console.log("response", error);
//     if (error.response.data.message == "Unauthenticated.") {
//       navigate("/user/login");
//     }
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     return Promise.reject(error);
//   }
// };

axios.interceptors.request.use((request) => requestInterceptor(request));
