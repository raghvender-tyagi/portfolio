import "./globals.css";
import "./sprites.css";
import Navbar from "./components/Navbar";
import { Inter, Press_Start_2P, VT323 } from "next/font/google";
import Script from "next/script";

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
        <div id="game-layer" aria-hidden="true">
          <div className="sprite sprite--pacman"></div>
          <div className="sprite sprite--ghost"></div>
          <div className="sprite sprite--invader"></div>
        </div>
        <Script src="/sprites.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
