import axios from "axios";

const apiRequests = axios.create({
  baseURL:'http://localhost:2201/',
})

export default apiRequests;