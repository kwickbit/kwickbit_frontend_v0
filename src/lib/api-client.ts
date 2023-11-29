import axios from "axios";
import Router from "next/router";
import { toast } from "react-toastify";
import {
  isConnected,
  isRefreshTokenExpired,
  refreshToken,
} from "@/lib/session";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_APP_URL,
  withCredentials: true,
});

// apiClient.interceptors.request.use(async (config) => {
//   // add 'Content-Type': 'application/json' by default for post requests
//   if (config.method === "post" && !config.headers["Content-Type"]) {
//     config.headers["Content-Type"] = "application/json";
//   }

//   if (isConnected()) return config;

//   if (!isRefreshTokenExpired()) {
//     await refreshToken();
//     return config;
//   } else {
//     // Router.push("/login");
//     toast.error("Session expired. Please login again.");
//     return new Promise(() => {});
//   }
// });
