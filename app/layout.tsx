import type { Metadata, Viewport } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import CustomCursor from "./components/CustomCursor";
import { portfolioContent } from "@/data/content";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#161616",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Raghvender Tyagi | AI Systems & Distributed Backend Engineer",
  description:
    "AI systems & distributed backend engineer specializing in LangGraph multi-agent architectures, sandboxed Docker compute, and secure Text-to-SQL pipelines. B.Tech CSE (AI), KIET '27.",
  keywords: [
    "Raghvender Tyagi",
    "AI Systems Engineer",
    "Distributed Systems",
    "LangGraph",
    "Docker Sandboxing",
    "Text-to-SQL",
    "FastAPI",
    "Django",
    "KIET",
    "Machine Learning",
  ],
  authors: [{ name: "Raghvender Tyagi", url: "https://raghvender.vercel.app" }],
  creator: "Raghvender Tyagi",
  metadataBase: new URL("https://raghvender.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://raghvender.vercel.app",
    title: "Raghvender Tyagi | AI Systems & Distributed Backend Engineer",
    description:
      "I build agents that ship. Systems that don't fall over. LangGraph agents, sandboxed compute, secure Text-to-SQL.",
    siteName: "Raghvender Tyagi",
  },
  twitter: {
    card: "summary_large_image",
    title: "Raghvender Tyagi | AI Systems & Distributed Backend Engineer",
    description:
      "I build agents that ship. Systems that don't fall over. LangGraph agents, sandboxed compute, secure Text-to-SQL.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: portfolioContent.meta.name,
    jobTitle: portfolioContent.meta.role,
    url: portfolioContent.meta.siteUrl,
    sameAs: [
      portfolioContent.contact.socials.find((s) => s.code === "GH")?.href,
      portfolioContent.contact.socials.find((s) => s.code === "IN")?.href,
      portfolioContent.contact.socials.find((s) => s.code === "LC")?.href,
    ],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: portfolioContent.education.institution,
    },
    knowsAbout: [
      "LangGraph",
      "Multi-Agent AI Systems",
      "Distributed Backend",
      "Docker Sandboxing",
      "Text-to-SQL",
      "PostgreSQL",
      "FastAPI",
      "Django",
    ],
  };

  return (
    <html lang="en" className={`${geist.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#161616] text-[#E4E4E4] font-headline antialiased selection:bg-[#3B4BFF] selection:text-white">
        <CustomCursor />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
