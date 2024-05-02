import axios from "axios";
const baseUrl = import.meta.env.VITE_BASE_URL;

export async function registerUser(data) {
  const res = await axios.post(`${baseUrl}/auth/register`, data);
  return res;
}

export async function loginUser(data) {
  const res = await axios.post(`${baseUrl}/auth/login`, data);
  return res;
}
