"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { counts } from "@/graphql/queries";

interface ExtrinsicContextType {
  extrinsic: string;
  setExtrinsic: (extrinsic: string) => void;
  toggleExtrinsic: (extr: string) => void;
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
  const [_, setExtrinsic] = useState("");
  const { result, refresh } = counts();
  let latestExtrinsic = 0
  switch (result.state) {
    case "loading": return <div>Loading...</div>;
    case "error": return <div>Error {result.message}</div>
    case "ok": latestExtrinsic = result.data;
  };

  const toggleExtrinsic = (extr: string) => {
    setExtrinsic(extr);
  };
  setInterval(() => {
    refresh();
  }, 1000);

  return (
    <ExtrinsicContext.Provider
      value={{ extrinsic: latestExtrinsic.toLocaleString(), setExtrinsic, toggleExtrinsic }}
    >
      {children}
    </ExtrinsicContext.Provider>
  );
};
