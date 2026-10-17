import HeroSection from "./components/HeroSection";
import SegmentedBar from "./components/SegmentedBar";
import ProjectsSection from "./components/ProjectsSection";
import ExperienceSection from "./components/ExperienceSection";
import AboutSection from "./components/AboutSection";
import SkillsSection from "./components/SkillsSection";
import PatentAndAchievementsSection from "./components/PatentAndAchievementsSection";
import BuildLogSection from "./components/BuildLogSection";
import ContactSection from "./components/ContactSection";
import BootSequence from "./components/BootSequence";
import DesktopIcons from "./components/DesktopIcons";
import WalkingSidekick from "./components/WalkingSidekick";
import FlyingChips from "./components/FlyingChips";
import PixelDivider from "./components/PixelDivider";

export default function Home() {
  return (
    <>
      {/* 1. First-Load Boot Sequence Terminal (sessionStorage-guarded, skippable) */}
      <BootSequence />

      {/* 2. Desktop Margins Elements (Desktop icons on >=1200px, Mascot, Flying Chips) */}
      <DesktopIcons />
      <WalkingSidekick />
      <FlyingChips />

      {/* 3. Main Single Column Container (max 960px centered) */}
      <main className="min-h-screen bg-mac-dither text-black selection:bg-black selection:text-white pb-16 relative z-20">
        <div className="max-w-[960px] mx-auto px-4 sm:px-6 md:px-8 pt-8 md:pt-12 space-y-16 md:space-y-24">
          {/* Hero Window Section */}
          <HeroSection />

          {/* Quick Navigation Segmented Bar */}
          <SegmentedBar />

          {/* Pixel Divider (Stairsteps pattern) */}
          <PixelDivider variant="stairsteps" />

          {/* Projects Section */}
          <ProjectsSection />

          {/* Pixel Divider (Server-rack skyline pattern) */}
          <PixelDivider variant="server" />

          {/* Experience Section */}
          <ExperienceSection />

          {/* Pixel Divider (Circuit traces pattern) */}
          <PixelDivider variant="circuits" />

          {/* About Section */}
          <AboutSection />

          {/* Pixel Divider (Stairsteps pattern) */}
          <PixelDivider variant="stairsteps" />

          {/* Skills Section */}
          <SkillsSection />

          {/* Pixel Divider (Server-rack skyline pattern) */}
          <PixelDivider variant="server" />

          {/* Achievements & Honors */}
          <PatentAndAchievementsSection />

          {/* Pixel Divider (Circuit traces pattern) */}
          <PixelDivider variant="circuits" />

          {/* Writing / Build Log */}
          <BuildLogSection />

          {/* Pixel Divider (Stairsteps pattern) */}
          <PixelDivider variant="stairsteps" />

          {/* Contact Dispatcher & Footer */}
          <ContactSection />
        </div>
      </main>
    </>
  );
}
