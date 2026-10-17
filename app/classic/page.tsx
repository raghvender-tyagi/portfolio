import type { Metadata } from "next";
import Link from "next/link";
import HeroSection from "../components/HeroSection";
import SegmentedBar from "../components/SegmentedBar";
import ProjectsSection from "../components/ProjectsSection";
import ExperienceSection from "../components/ExperienceSection";
import AboutSection from "../components/AboutSection";
import SkillsSection from "../components/SkillsSection";
import PatentAndAchievementsSection from "../components/PatentAndAchievementsSection";
import BuildLogSection from "../components/BuildLogSection";
import ContactSection from "../components/ContactSection";
import PixelDivider from "../components/PixelDivider";


export const metadata: Metadata = {
  title: "Raghvender Tyagi | AI Systems & Distributed Backend Engineer (Classic View)",
  description:
    "Fast, accessible, recruiter-friendly portfolio of Raghvender Tyagi. LangGraph multi-agent systems, sandboxed Docker compute, and AST-verified Text-to-SQL.",
};

export default function ClassicPage() {
  return (
    <div className="min-h-screen bg-mac-dither text-black selection:bg-black selection:text-white pb-20 pt-6">
      {/* Top Recruiter Banner */}
      <div className="max-w-[960px] mx-auto px-4 sm:px-6 md:px-8 mb-6">
        <div className="border-2 border-black bg-[#C0C0C0] bevel-out p-3 flex flex-col sm:flex-row items-center justify-between gap-3 select-none">
          <div className="text-xs font-mono">
            <span className="font-pixel font-bold uppercase block text-[#000080]">
              ★ RECRUITER &amp; ACCESSIBLE VIEW MODE
            </span>
            <span className="text-black/80 text-[11px]">
              Fast single-page layout containing verified systems experience, projects &amp; academic profile.
            </span>
          </div>
          <Link
            href="/"
            className="win95-btn font-pixel text-xs font-bold uppercase tracking-wider px-4 py-2"
          >
            ← Return to RT-OS 95 Desktop
          </Link>
        </div>
      </div>

      {/* Main Single Column Container max 960px */}
      <main className="max-w-[960px] mx-auto px-4 sm:px-6 md:px-8 space-y-16 md:space-y-24">
        {/* 1. Hero Section */}
        <HeroSection />

        {/* 2. Quick Navigation Segmented Bar */}
        <SegmentedBar />

        {/* Divider */}
        <PixelDivider variant="stairsteps" />

        {/* 3. Projects Section */}
        <ProjectsSection />

        {/* Divider */}
        <PixelDivider variant="server" />

        {/* 4. Experience Section */}
        <ExperienceSection />

        {/* Divider */}
        <PixelDivider variant="circuits" />

        {/* 5. About Section */}
        <AboutSection />

        {/* Divider */}
        <PixelDivider variant="stairsteps" />

        {/* 6. Skills Section */}
        <SkillsSection />

        {/* Divider */}
        <PixelDivider variant="server" />

        {/* 7. Achievements */}
        <PatentAndAchievementsSection />

        {/* Divider */}
        <PixelDivider variant="circuits" />

        {/* 8. Build Log */}
        <BuildLogSection />

        {/* Divider */}
        <PixelDivider variant="stairsteps" />

        {/* 9. Contact & Shut Down Footer */}
        <ContactSection />
      </main>
    </div>
  );
}
