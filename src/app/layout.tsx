import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Synthetic Newsroom | High-Signal AI Developments",
  description: "Autonomous AI news discovery, verification, and publication platform for software engineers.",
  openGraph: {
    title: "Synthetic Newsroom | High-Signal AI Developments",
    description: "Autonomous AI news discovery, verification, and publication platform for software engineers.",
    type: "website",
    url: "https://news.nodaldignal.ai/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} antialiased`}>
        <div className="bg-gradient-radial from-[#13111b] via-background to-background min-h-screen">
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
