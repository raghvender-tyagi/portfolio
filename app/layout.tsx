import type { Metadata, Viewport } from "next";
import { Baloo_2, Silkscreen, Space_Mono } from "next/font/google";
import "./globals.css";
import MenuBar from "./components/MenuBar";
import { portfolioContent } from "@/data/content";

const baloo2 = Baloo_2({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const silkscreen = Silkscreen({
  subsets: ["latin"],
  variable: "--font-pixel",
  display: "swap",
  weight: ["400", "700"],
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "700"],
});

export const viewport: Viewport = {
  themeColor: "#D9D9D9",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Raghvender Tyagi | AI Systems & Distributed Backend Engineer",
  description:
    "System 7 Retro Portfolio of Raghvender Tyagi. AI systems & distributed backend engineer specializing in LangGraph multi-agent architectures, sandboxed Docker compute, and secure Text-to-SQL pipelines. B.Tech CSE (AI), KIET '27.",
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
    "System 7",
    "Retro Portfolio",
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
      "I build agents that ship, and systems that don't fall over. LangGraph agents, sandboxed compute, secure Text-to-SQL.",
    siteName: "Raghvender Tyagi",
  },
  twitter: {
    card: "summary_large_image",
    title: "Raghvender Tyagi | AI Systems & Distributed Backend Engineer",
    description:
      "I build agents that ship, and systems that don't fall over. LangGraph agents, sandboxed compute, secure Text-to-SQL.",
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
    sameAs: portfolioContent.contact.socials.map((s) => s.href),
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: portfolioContent.about.education.institution,
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
    <html
      lang="en"
      className={`${baloo2.variable} ${silkscreen.variable} ${spaceMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-mac-dither text-black font-mono antialiased selection:bg-black selection:text-white pt-8 min-h-screen">
        <MenuBar />
        {children}
      </body>
    </html>
  );
}
