"use client";
import axios from "axios";
let token;
if (typeof window !== 'undefined') {
  token = localStorage.getItem("access_token");
}

const instance = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  withCredentials: true,
});

export default instance;
