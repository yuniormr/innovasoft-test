import axiosInstance from "./axiosInstance";
import type { Interest } from "../types";

export const interestsService = {
  async getAll(): Promise<Interest[]> {
    const { data } = await axiosInstance.get<Interest[]>("/api/interests");
    return data;
  },
};
