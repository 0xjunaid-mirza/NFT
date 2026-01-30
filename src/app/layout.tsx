import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FPRN - Premium NFT Collection",
  description: "Explore FPRN's exclusive NFT collection featuring cutting-edge digital art and collectibles.",
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
