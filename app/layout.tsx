import "./globals.css";
import Navbar from "./components/Navbar";
import { Inter, Press_Start_2P, VT323 } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start",
});

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vt323",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${pressStart2P.variable} ${vt323.variable}`}>
      <body className="antialiased font-inter">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
