import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CityScape - Premium NFT Collection",
  description: "Explore CityScape exclusive NFT collection featuring cutting-edge digital art and collectibles.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
