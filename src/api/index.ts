import axios from "axios";

const baseUrl = "http://localhost/1337";

const getAllGroups = () => {
  axios.get(baseUrl + "/api/group/")
}

const api = { getAllGroups };

export default api;