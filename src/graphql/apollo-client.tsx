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

const client = new ApolloClient({
  uri: "https://explorer.selendra.org/graphql",
  cache: new InMemoryCache(),
});
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <ApolloProvider client={client}> {children}</ApolloProvider>
    </NextUIProvider>
  );
}

