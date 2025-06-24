import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });
 const PAYPAL_C_ID = process.env.PAYPAL_CLIENT_ID;
export const metadata: Metadata = {
  title: "NateTube Receipt Generator",
  description: "Generate receipts to match your wins",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script src={`https://www.paypal.com/sdk/js?client-id=${PAYPAL_C_ID}&currency=USD`} />
      </head>
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
