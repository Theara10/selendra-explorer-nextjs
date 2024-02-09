import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/graphql/apollo-client";
import Footer from "@/components/footer";
import { ExtrinsicProvider } from "@/context/ExtrinsicsContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  icons: {
    icon: "/sel.png",
  },
  title: "Selendra Explorer",
  description:
    "A Block Explorer and decentralized smart contracts platform for Selendra.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <ExtrinsicProvider>
            <div className="min-h-[100dvh]"> {children}</div>
          </ExtrinsicProvider>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
