import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "FarmAI",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  keywords: ["FarmAI", "AI", "Farming", "Crop Recommendation"],
  authors: [
    {
      name: "FarmAI -Siddharth Jain",
      url: "https://farmai-nine.vercel.app/",
    },
  ],
  creator: "FarmAI -Siddharth Jain",
  publisher: "FarmAI - Siddharth Jain",
  description: "FarmAI - Your Intelligent Farming Companion",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
