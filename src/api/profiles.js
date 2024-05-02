import axios from "axios";
const baseUrl = import.meta.env.VITE_BASE_URL;
const apiKey = import.meta.env.VITE_API_KEY;
const authStorage = window.localStorage.getItem("Auth-storage");
const accessToken = JSON.parse(authStorage).state.accessToken;

export async function getVenuesByUser(user) {
  const res = await axios.get(`${baseUrl}/holidaze/profiles/${user}/venues`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": apiKey,
    },
  });

  return res;
}

export async function getAllUsers() {
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

export async function getBookingsByUser(user) {
  const res = await axios.get(`${baseUrl}/holidaze/profiles/${user}/bookings`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": apiKey,
    },
  });

  return res;
}

export async function updateUser(data) {
  const res = await axios.put(
    `${baseUrl}/holidaze/bookings/${data.id}`,
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
