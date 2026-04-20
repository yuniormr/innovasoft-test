import { useContext } from "react";
import { ClientContext } from "../context/ClientContext";
import type { ClientFilters } from "../types";

interface UseClientsResult {
  filters: ClientFilters;
  setClientFilter: (filters: ClientFilters) => void;
}

export function useClients(): UseClientsResult {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error("useClients must be used within ClientProvider");
  }
  return context;
}
