"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { gql, useQuery } from "@apollo/client";
import { COUNTS } from "@/graphql/queries";

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
  const [extrinsic, setExtrinsic] = useState("");
  const { loading, error, data, refetch } = useQuery(COUNTS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  const toggleExtrinsic = (extr: string) => {
    setExtrinsic(extr);
  };
  setInterval(() => {
    refetch();
  }, 1000);
  const latestExtrinsic = data?.itemsCounters[0]?.total || "";

  return (
    <ExtrinsicContext.Provider
      value={{ extrinsic: latestExtrinsic, setExtrinsic, toggleExtrinsic }}
    >
      {children}
    </ExtrinsicContext.Provider>
  );
};
