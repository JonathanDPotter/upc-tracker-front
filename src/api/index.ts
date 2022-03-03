import axios from "axios";
// interfaces
import { IgroupUpdate } from "../interfaces/group";

const baseUrl = "http://localhost/1337";

const getAllGroups = () => {
  axios.get(baseUrl + "/api/group/")
}

const updateGroup = (_id: string, group: IgroupUpdate) => {
  axios.put(`${baseUrl}/api/group/${_id}`)
}

const api = { getAllGroups, updateGroup };

export default api;