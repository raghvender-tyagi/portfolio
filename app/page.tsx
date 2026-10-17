import HeroSection from "./components/HeroSection";
import SegmentedBar from "./components/SegmentedBar";
import ProjectsSection from "./components/ProjectsSection";
import ExperienceSection from "./components/ExperienceSection";
import AboutSection from "./components/AboutSection";
import SkillsSection from "./components/SkillsSection";
import PatentAndAchievementsSection from "./components/PatentAndAchievementsSection";
import BuildLogSection from "./components/BuildLogSection";
import ContactSection from "./components/ContactSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-mac-dither text-black selection:bg-black selection:text-white pb-16">
      {/* Centered Single Column Container max-w-960px */}
      <div className="max-w-[960px] mx-auto px-4 sm:px-6 md:px-8 pt-8 md:pt-12 space-y-16 md:space-y-24">
        {/* 1. Hero Window Section */}
        <HeroSection />

        {/* 2. Quick Navigation Segmented Bar */}
        <SegmentedBar />

        {/* Horizontal Rule Divider */}
        <hr className="border-t-2 border-black" />

        {/* 3. Projects Section (projects.finder + 2-column cards) */}
        <ProjectsSection />

        {/* Horizontal Rule Divider */}
        <hr className="border-t-2 border-black" />

        {/* 4. Experience Section (experience.txt) */}
        <ExperienceSection />

        {/* Horizontal Rule Divider */}
        <hr className="border-t-2 border-black" />

        {/* 5. About Section (readme.txt) */}
        <AboutSection />

        {/* Horizontal Rule Divider */}
        <hr className="border-t-2 border-black" />

        {/* 6. Skills Section (system_info) */}
        <SkillsSection />

        {/* Horizontal Rule Divider */}
        <hr className="border-t-2 border-black" />

        {/* 7. Achievements & Honors (achievements.finder) */}
        <PatentAndAchievementsSection />

        {/* Horizontal Rule Divider */}
        <hr className="border-t-2 border-black" />

        {/* 8. Writing / Build Log (Stacked Windows) */}
        <BuildLogSection />

        {/* Horizontal Rule Divider */}
        <hr className="border-t-2 border-black" />

        {/* 9. Contact Dispatcher & Footer (mail.app + Shut Down) */}
        <ContactSection />
      </div>
    </main>
  );
}
