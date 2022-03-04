import axios from "axios";
// interfaces
import { IgroupUpload } from "../interfaces/group";
import { InewUser } from "../interfaces/user";

const baseUrl = "http://localhost:1337";

const getAllGroups = async () => {
  const response = await axios.get(baseUrl + "/api/group/");
  return response;
};

const createGroup = async (token: string, group: IgroupUpload) => {
  const response = await axios.post(`${baseUrl}/api/group/`, group, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
};

const updateGroup = async (_id: string, group: IgroupUpload) => {
  const response = await axios.put(`${baseUrl}/api/group/${_id}`, group);
  return response;
};

const register = async (user: InewUser) => {
  const response = await axios.post(`${baseUrl}/api/user/register`, user);
  console.log(response);
};

const login = async (user: InewUser) => {
  const response = await axios.post(`${baseUrl}/api/user/login`, user);
  return response;
};

const api = { getAllGroups, updateGroup, createGroup, register, login };

export default api;
