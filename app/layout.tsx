import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

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
        <Script src="https://www.paypal.com/sdk/js?client-id=AQz7RYMMZ0Hz6Er_rfkS8O1or9b0wF2UXJR2P50yQeMt2o0ZmqDy40VCV8yMn0_iic26yiXFavL7lGFz&currency=USD" />
      </head>
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
