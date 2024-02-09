"use client";
// components/ExtrinsicContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of your context
interface ExtrinsicContextType {
  extrinsic: string;
  setExtrinsic: (extrinsic: string) => void;
  toggleExtrinsic: (extr: string) => void;
}

// Create the context
const ExtrinsicContext = createContext<ExtrinsicContextType | undefined>(
  undefined
);

// Create a custom hook to consume the context
export const useExtrinsic = () => {
  const context = useContext(ExtrinsicContext);
  if (!context) {
    throw new Error("useExtrinsic must be used within a ThemeProvider");
  }
  return context;
};
interface ExtrinsicProviderProps {
  children: ReactNode;
}

export const ExtrinsicProvider: React.FC<ExtrinsicProviderProps> = ({
  children,
}) => {
  const [extrinsic, setExtrinsic] = useState("");

  const toggleExtrinsic = (extr: string) => {
    setExtrinsic(extr);
  };

  return (
    <ExtrinsicContext.Provider
      value={{ extrinsic, setExtrinsic, toggleExtrinsic }}
    >
      {children}
    </ExtrinsicContext.Provider>
  );
};
