import axios from "axios";
const baseUrl = import.meta.env.VITE_BASE_URL;
const apiKey = import.meta.env.VITE_API_KEY;

export async function getVenuesByUser(user) {
  console.log("fetching venues by user");
  const authStorage = window.localStorage.getItem("Auth-storage");
  const accessToken = JSON.parse(authStorage).state.accessToken;
  const res = await axios.get(
    `${baseUrl}/holidaze/profiles/${user}/venues?_bookings=true`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": apiKey,
      },
    },
  );

  return res;
}

export async function getAllUsers() {
  console.log("fetching  users");
  const authStorage = window.localStorage.getItem("Auth-storage");
  const accessToken = JSON.parse(authStorage).state.accessToken;
  const res = await axios.get(
    `${baseUrl}/holidaze/profiles/?_venues=true&_bookings=true`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": apiKey,
      },
    },
  );

  return res;
}

export async function getUser({ name, token }) {
  console.log("getting user", name);
  let accessToken;
  if (!token) {
    const authStorage = window.localStorage.getItem("Auth-storage");
    accessToken = JSON.parse(authStorage).state.accessToken;
  } else {
    accessToken = token;
  }

  const res = await axios.get(
    `${baseUrl}/holidaze/profiles/${name}?_bookings=true&_venues=true`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": apiKey,
      },
    },
  );
  return res;
}

export async function getBookingsByUser(user) {
  const authStorage = window.localStorage.getItem("Auth-storage");
  const accessToken = JSON.parse(authStorage).state.accessToken;
  const res = await axios.get(`${baseUrl}/holidaze/profiles/${user}/bookings`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": apiKey,
    },
  });

  return res;
}

export async function updateProfile(data) {
  const authStorage = window.localStorage.getItem("Auth-storage");
  const accessToken = JSON.parse(authStorage).state.accessToken;
  const res = await axios.put(
    `${baseUrl}/holidaze/profiles/${data.name}`,
    data.body,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": apiKey,
      },
    },
  );
  return res;
}

export async function searchUsers(search) {
  const authStorage = window.localStorage.getItem("Auth-storage");
  const accessToken = JSON.parse(authStorage).state.accessToken;
  const res = await axios.get(
    `${baseUrl}/holidaze/profiles/search?q=${search}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": apiKey,
      },
    },
  );
  return res;
}
