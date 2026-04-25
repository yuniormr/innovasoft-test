import axiosInstance from "./axiosInstance";
import type { Client, ClientFilters } from "../types";

export const clientService = {
  async list(filters: ClientFilters): Promise<Client[]> {
    const { data } = await axiosInstance.get<Client[]>("/api/clients", {
      params: filters,
    });
    return data;
  },

  async getById(id: string | number): Promise<Client> {
    const { data } = await axiosInstance.get<Client>(`/api/clients/${id}`);
    return data;
  },

  async create(clientData: Record<string, unknown>): Promise<unknown> {
    const { data } = await axiosInstance.post("/api/clients", clientData);
    return data;
  },

  async update(
    id: string | number,
    clientData: Record<string, unknown>,
  ): Promise<unknown> {
    // El id va en la URL (REST); el body NO debe incluirlo
    const { id: _omit, ...body } = clientData as Record<string, unknown> & {
      id?: unknown;
    };
    const { data } = await axiosInstance.put(`/api/clients/${id}`, body);
    return data;
  },

  async remove(id: string | number): Promise<unknown> {
    const { data } = await axiosInstance.delete(`/api/clients/${id}`);
    return data;
  },
};
