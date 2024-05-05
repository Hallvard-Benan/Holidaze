import axios from "axios";
const baseUrl = import.meta.env.VITE_BASE_URL;
const apiKey = import.meta.env.VITE_API_KEY;

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

export async function getAllBookings() {
  const authStorage = window.localStorage.getItem("Auth-storage");
  const accessToken = JSON.parse(authStorage).state.accessToken;
  const res = await axios.get(`${baseUrl}/holidaze/bookings`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": apiKey,
    },
  });
  return res;
}

export async function getBookingById(id) {
  const authStorage = window.localStorage.getItem("Auth-storage");
  const accessToken = JSON.parse(authStorage).state.accessToken;
  const res = await axios.get(`${baseUrl}/holidaze/bookings/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": apiKey,
    },
  });
  return res;
}

export async function updateBooking({ id, dateFrom, dateTo, guests }) {
  const authStorage = window.localStorage.getItem("Auth-storage");
  const accessToken = JSON.parse(authStorage).state.accessToken;
  const res = await axios.put(
    `${baseUrl}/holidaze/bookings/${id}`,
    { dateFrom, dateTo, guests },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": apiKey,
      },
    },
  );
  return res;
}

export async function deleteBooking(id) {
  const authStorage = window.localStorage.getItem("Auth-storage");
  const accessToken = JSON.parse(authStorage).state.accessToken;
  const res = await axios.delete(`${baseUrl}/holidaze/bookings/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": apiKey,
    },
  });
  return res;
}
