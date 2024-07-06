import axios from "axios";

//Services
import { url } from "./url";

const api = axios.create({
  baseURL: url,
});

export default api;
