import type { Metadata } from "next";
import AboutSection from "../components/AboutSection";
import Window from "../components/Window";
import BevelButton from "../components/BevelButton";
import PixelSprite from "../components/PixelSprite";
import { folderSprite } from "@/data/sprites";

export const metadata: Metadata = {
  title: "About | Raghvender Tyagi - System 7",
  description:
    "Engineering background, system philosophy, and education of Raghvender Tyagi at KIET Group of Institutions.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-mac-dither text-black selection:bg-black selection:text-white pb-16 pt-8 md:pt-12 relative z-20">
      <div className="max-w-[960px] mx-auto px-4 sm:px-6 md:px-8 space-y-6">
        {/* Finder Folder Header Window */}
        <Window
          title="about.folder"
          status="FOLDER LOCATION: MACINTOSH HD : ABOUT • READ-ONLY"
          collapsible={false}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-1 border-2 border-black bg-[#BFBFBF]">
                <PixelSprite sprite={folderSprite} scale={2} />
              </div>
              <div>
                <div className="font-pixel text-[10px] uppercase tracking-wider text-black/60">
                  MACINTOSH HD : ABOUT
                </div>
                <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-black">
                  About &amp; Background
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <BevelButton href="/" variant="default" size="sm">
                ← Desktop (Home)
              </BevelButton>
              <BevelButton href="/resume.pdf" variant="inverted" size="sm">
                Resume ↓
              </BevelButton>
            </div>
          </div>
        </Window>

        {/* Full About Section */}
        <AboutSection />
      </div>
    </main>
  );
}
