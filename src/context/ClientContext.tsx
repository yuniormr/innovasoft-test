import React, { createContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { ClientFilters } from '../types';

// ClientContext manages only UI filter state.
// Server state (clients list, loading, errors) is handled by React Query.

interface ClientContextValue {
  filters: ClientFilters;
  setClientFilter: (filters: ClientFilters) => void;
}

export const ClientContext = createContext<ClientContextValue | null>(null);

export function ClientProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<ClientFilters>({
    identificacion: '',
    nombre: '',
  });

  return (
    <ClientContext.Provider
      value={{
        filters,
        setClientFilter: setFilters,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
}
