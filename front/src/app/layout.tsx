import type { Metadata } from "next";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Inter } from "next/font/google";
import "./globals.css";
import "tailwindcss/tailwind.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ChakraProvider>{children}</ChakraProvider>
      </body>
    </html>
  );
}
