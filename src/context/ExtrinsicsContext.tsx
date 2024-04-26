"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { counts } from "@/graphql/queries";

interface ExtrinsicContextType {
  extrinsic: number;
  setExtrinsic: (extrinsic: number) => void;
  toggleExtrinsic: (extr: number) => void;
}

const ExtrinsicContext = createContext<ExtrinsicContextType | undefined>(
  undefined
);

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
  const [_, setExtrinsic] = useState(0);
  const { result, refresh } = counts();
  let latestExtrinsic = 0;
  switch (result.state) {
    case "error":
      return <div>Error {result.message}</div>;
    case "ok":
      latestExtrinsic = result.data;
    case "loading":
  }

  const toggleExtrinsic = (extr: number) => {
    setExtrinsic(extr);
  };
  setInterval(refresh, 1000);

  return (
    <ExtrinsicContext.Provider
      value={{
        extrinsic: latestExtrinsic,
        setExtrinsic,
        toggleExtrinsic,
      }}
    >
      {children}
    </ExtrinsicContext.Provider>
  );
};
