import axios from "axios";
const baseUrl = import.meta.env.VITE_BASE_URL;
const apiKey = import.meta.env.VITE_API_KEY;
const authStorage = window.localStorage.getItem("Auth-storage");
const accessToken = JSON.parse(authStorage)?.state.accessToken;

export async function fetchAllVenues({ pageParam, perPage }) {
  console.log("fetching all venues");
  const res = await axios.get(
    `${baseUrl}/holidaze/venues?sort=created&sortOrder=desc&limit=${perPage}&page=${pageParam}`,
  );
  return res;
}

export async function fetchVenueById(id) {
  console.log("fetching venue", id);
  const res = await axios.get(
    `${baseUrl}/holidaze/venues/${id}?_bookings=true&_owner=true`,
  );
  return res;
}

export async function searchVenues({ pageParam, search }) {
  const res = await axios.get(
    `${baseUrl}/holidaze/venues/search?q=${search}&limit=20&page=${pageParam}`,
  );
  console.log(pageParam, search, "data from search: ", res);
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

export async function editVenue(data) {
  console.log(data);
  const authStorage = window.localStorage.getItem("Auth-storage");
  const accessToken = JSON.parse(authStorage).state.accessToken;
  const res = await axios.put(
    `${baseUrl}/holidaze/venues/${data.id}`,
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

export async function deleteVenue(id) {
  const res = await axios.delete(`${baseUrl}/holidaze/venues/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": apiKey,
    },
  });
  return res;
}
