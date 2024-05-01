import axios from "axios";
const baseUrl = import.meta.env.VITE_BASE_URL;
const apiKey = import.meta.env.VITE_API_KEY;

export async function fetchAllVenues() {
  const res = await axios.get(
    `${baseUrl}/holidaze/venues?sort=created&sortOrder=desc&limit=100&page=1`,
  );
  return res;
}

export async function searchVenues(search) {
  const res = await axios.get(`${baseUrl}/holidaze/venues/search?q=${search}`);
  return res;
}

export async function fetchVenueById(id) {
  const res = await axios.get(
    `${baseUrl}/holidaze/venues/${id}?_bookings=true&_owner=true`,
  );
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

export async function getUser({ name, token }) {
  let accessToken;
  if (!token) {
    const authStorage = window.localStorage.getItem("Auth-storage");
    accessToken = JSON.parse(authStorage).state.accessToken;
  } else {
    accessToken = token;
  }

  const res = await axios.get(
    `${baseUrl}/holidaze/profiles/${name}?_bookings=true`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": apiKey,
      },
    },
  );
  return res;
}

export async function makeBooking(data) {
  const authStorage = window.localStorage.getItem("Auth-storage");
  const accessToken = JSON.parse(authStorage).state.accessToken;
  const res = await axios.post(`${baseUrl}/holidaze/bookings/`, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": apiKey,
    },
  });

  return res;
}

export async function createVenue(data) {
  const authStorage = window.localStorage.getItem("Auth-storage");
  const accessToken = JSON.parse(authStorage).state.accessToken;
  const res = await axios.post(`${baseUrl}/holidaze/venues`, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": apiKey,
    },
  });

  return res;
}
