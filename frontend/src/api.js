import axios from "axios";

// This points to your backend server
// All API requests will go through this
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// This automatically attaches the user's login token
// to every request that needs it
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
