import axiosInstance from "./axiosInstance";
import type { Client, ClientFilters } from "../types";

export const clientService = {
  async list(filters: ClientFilters): Promise<Client[]> {
    const { data } = await axiosInstance.post<Client[]>(
      "/api/Cliente/Listado",
      filters,
    );
    return data;
  },

  async getById(id: string | number): Promise<Client> {
    const { data } = await axiosInstance.get<Client>(
      `/api/Cliente/Obtener/${id}`,
    );
    return data;
  },

  async create(clientData: Record<string, unknown>): Promise<unknown> {
    const { data } = await axiosInstance.post("/api/Cliente/Crear", clientData);
    return data;
  },

  async update(clientData: Record<string, unknown>): Promise<unknown> {
    const { data } = await axiosInstance.post(
      "/api/Cliente/Actualizar",
      clientData,
    );
    return data;
  },

  async remove(id: string | number): Promise<unknown> {
    const { data } = await axiosInstance.delete(`/api/Cliente/Eliminar/${id}`);
    return data;
  },
};
