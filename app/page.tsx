import HeroSection from "./components/HeroSection";
import ProjectsSection from "./components/ProjectsSection";
import ExperienceSection from "./components/ExperienceSection";
import PatentAndAchievementsSection from "./components/PatentAndAchievementsSection";
import NowAndStats from "./components/NowAndStats";
import SkillsSection from "./components/SkillsSection";
import BuildLogSection from "./components/BuildLogSection";
import ContactSection from "./components/ContactSection";
import PixelDivider from "./components/PixelDivider";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#161616] text-[#E4E4E4]">
      {/* Hero Section (Hands off to Dark at bottom 140px) */}
      <HeroSection />

      {/* 01 / WORK (Begins on Dark with stepped pixel top edge) */}
      <ProjectsSection />

      {/* Transition to Light: 02 / EXPERIENCE */}
      <PixelDivider from="dark" to="light" />
      <ExperienceSection />

      {/* Transition to Dark: 03 / ABOUT */}
      <PixelDivider from="light" to="dark" />
      <PatentAndAchievementsSection />

      {/* Active Focus & Stats Row (Dark) */}
      <NowAndStats />

      {/* Transition to Light: 04 / SKILLS & Build Log */}
      <PixelDivider from="dark" to="light" />
      <SkillsSection />
      <BuildLogSection />

      {/* Transition to Dark: 05 / CONTACT */}
      <PixelDivider from="light" to="dark" />
      <ContactSection />
    </main>
  );
}
