import axios from "axios";
export const getBookingByDate = async (date) => {
  const resp = await axios({
    url: "/getEventByDate",
    method: "GET",
    params: { date },
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
      "x-api-key": process.env.REACT_APP_API_KEY,
      "Content-Type": "application/json",
    },
  });
  return resp;
};

export const addBooking = async (data) => {
  const resp = await axios({
    url: "/createEvent",
    method: "POST",
    data,
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
      "x-api-key": process.env.REACT_APP_API_KEY,
      "Content-Type": "application/json",
    },
  });
  return resp;
};

export const allBookings = async () => {
  const resp = await axios({
    url: "/getAllEvents",
    method: "GET",
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
      "x-api-key": process.env.REACT_APP_API_KEY,
      "Content-Type": "application/json",
    },
  });
  return resp;
};
