import axios from "axios";
const baseUrl = import.meta.env.VITE_BASE_URL;
const apiKey = import.meta.env.VITE_API_KEY;

export async function fetchAllVenues() {
  const res = await axios.get(
    `${baseUrl}/holidaze/venues?sort=created&sortOrder=desc&limit=10&page=1`
  );
  return res;
}

export async function searchVenues(search) {
  const res = await axios.get(`${baseUrl}/holidaze/venues/search?q=${search}`);
  return res;
}

export async function fetchVenueById(id) {
  const res = await axios.get(`${baseUrl}/holidaze/venues/${id}`);
  return res;
}

export async function registerUser(data) {
  const res = await axios.post(`${baseUrl}/auth/register`, data);
  return res;
}

export async function loginUser(data) {
  const res = await axios.post(`${baseUrl}/auth/login`, data);
  return res;
}

export async function getUser(name) {
  const authStorage = window.localStorage.getItem("Auth-storage");
  const accessToken = JSON.parse(authStorage).state.user.accessToken;

  const res = await axios.get(`${baseUrl}/holidaze/profiles/${name}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": apiKey,
    },
  });
  return res;
}
