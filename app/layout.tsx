import type { Metadata } from "next";
import "./globals.css";



export const metadata: Metadata = {
  title: "NateTube Reciept Gen",
  description: "This is a purchase receipt generator for NateTube.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
