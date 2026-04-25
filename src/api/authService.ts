import axiosInstance from "./axiosInstance";
import type { LoginResponse, RegisterResponse } from "../types";

export const authService = {
  async login(username: string, password: string): Promise<LoginResponse> {
    const { data } = await axiosInstance.post<LoginResponse>(
      "/api/Authenticate/login",
      {
        username,
        password,
      },
    );
    return data;
  },

  async register(
    username: string,
    email: string,
    password: string,
  ): Promise<RegisterResponse> {
    const { data } = await axiosInstance.post<RegisterResponse>(
      "/api/Authenticate/register",
      {
        username,
        email,
        password,
      },
    );
    return data;
  },

  async logout(): Promise<void> {
    // El interceptor de axiosInstance adjunta el Bearer token automáticamente.
    // El BFF local elimina el documento de sesión en MongoDB.
    await axiosInstance.post("/api/Authenticate/logout");
  },
};
