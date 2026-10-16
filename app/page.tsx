import HeroSection from "./components/HeroSection";
import NowAndStats from "./components/NowAndStats";
import ProjectsSection from "./components/ProjectsSection";
import ExperienceSection from "./components/ExperienceSection";
import SkillsSection from "./components/SkillsSection";
import PatentAndAchievementsSection from "./components/PatentAndAchievementsSection";
import BuildLogSection from "./components/BuildLogSection";
import ContactSection from "./components/ContactSection";
import PixelDivider from "./components/PixelDivider";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#161616] text-[#E4E4E4]">
      {/* Hero Section with Interactive Pixel Grid Canvas */}
      <HeroSection />

      {/* "Now" Focus Strip & Verified Stats */}
      <NowAndStats />

      {/* Transition to Light: Work / Projects */}
      <PixelDivider from="dark" to="light" />
      <ProjectsSection />

      {/* Transition to Dark: Experience Timeline */}
      <PixelDivider from="light" to="dark" />
      <ExperienceSection />

      {/* Transition to Light: Skills Taxonomy */}
      <PixelDivider from="dark" to="light" />
      <SkillsSection />

      {/* Transition to Dark: Patent, Certifications, Achievements & Education */}
      <PixelDivider from="light" to="dark" />
      <PatentAndAchievementsSection />

      {/* Transition to Light: Build Log */}
      <PixelDivider from="dark" to="light" />
      <BuildLogSection />

      {/* Transition to Dark: Contact & Closing Footer */}
      <PixelDivider from="light" to="dark" />
      <ContactSection />
    </main>
  );
}
