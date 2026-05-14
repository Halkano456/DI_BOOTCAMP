import React, { createContext } from 'react';
import useDashboardData from '../hooks/useDashboardData';

export const AppContext = createContext({
  data: null,
  loading: true,
  error: null
});

export function AppProvider({ children }) {
  const { data, loading, error } = useDashboardData();

  return (
    <AppContext.Provider value={{ data, loading, error }}>
      {children}
    </AppContext.Provider>
  );
}
