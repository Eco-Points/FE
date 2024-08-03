// chartContext.tsx
import React, { createContext, useContext, ReactNode } from "react";

interface ChartContextType {
  // Tambahkan nilai yang Anda perlukan di sini
}

const ChartContext = createContext<ChartContextType | undefined>(undefined);

export const ChartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const chartContextValue: ChartContextType = {
    // Inisialisasi nilai konteks di sini
  };

  return <ChartContext.Provider value={chartContextValue}>{children}</ChartContext.Provider>;
};

export const useChart = (): ChartContextType => {
  const context = useContext(ChartContext);
  if (context === undefined) {
    throw new Error("useChart must be used within a ChartProvider");
  }
  return context;
};
