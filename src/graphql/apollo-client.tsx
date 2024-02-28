// 'use client';

// import { ApolloClient, InMemoryCache } from '@apollo/client';

// const client = new ApolloClient({
//   uri: 'http://localhost:4350/graphql',
//   cache: new InMemoryCache(),
// });

// export default client;
// app/providers.tsx
"use client";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { NextUIProvider } from "@nextui-org/react";
import { useCookies } from "react-cookie";

export enum Network {
  Main,
  Test,
}

export function useNetState(): [Network, (x: Network) => void] {
  const [cookies, setCookies] = useCookies(["testnet"]);
  return [
    cookies.testnet ? cookies.testnet : Network.Main,
    x => setCookies("testnet", x)
  ]
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [net] = useNetState();
  const client = new ApolloClient({
    uri: net == Network.Test
      ? "https://test.explorer.selendra.org/graphql"
      : "https://explorer.selendra.org/graphql",
    cache: new InMemoryCache(),
  });
  return (
    <NextUIProvider>
      <ApolloProvider client={client}> {children}</ApolloProvider>
    </NextUIProvider>
  );
}

