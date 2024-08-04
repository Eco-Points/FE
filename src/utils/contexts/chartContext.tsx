import React, { createContext, useContext, ReactNode } from "react";

interface ChartContextType {}

const ChartContext = createContext<ChartContextType | undefined>(undefined);

export const ChartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const chartContextValue: ChartContextType = {};

  return <ChartContext.Provider value={chartContextValue}>{children}</ChartContext.Provider>;
};

export const useChart = (): ChartContextType => {
  const context = useContext(ChartContext);
  if (context === undefined) {
    throw new Error("useChart must be used within a ChartProvider");
  }
  return context;
};
