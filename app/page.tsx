"use client";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useState, useMemo } from "react";
import Link from "next/link";


const Typewriter = ({ text, delay = 0, speed = 0.05 }: { text: string; delay?: number; speed?: number }) => {
  const characters = useMemo(() => text.split(""), [text]);

  return (
    <motion.span
      initial="hidden"
      animate="visible"
      className="inline-flex font-mono text-[var(--neon-green)]"
    >
      {characters.map((char, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 }
          }}
          transition={{
            duration: 0.1,
            delay: delay + (i * speed),
            ease: "linear"
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear", times: [0, 0.5, 1] }}
        className="inline-block w-[8px] h-[1em] bg-[var(--neon-green)] ml-1 align-middle"
      />
    </motion.span>
  );
};

export default function Home() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  // Spotlight effect
  const spotlightX = useTransform(mouseXSpring, [-0.5, 0.5], ["30%", "70%"]);
  const spotlightY = useTransform(mouseYSpring, [-0.5, 0.5], ["30%", "70%"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const charVariants = {
    hidden: { opacity: 0, y: 50, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as any,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        ease: [0.16, 1, 0.3, 1] as any,
      },
    },
  };

  const bouncyVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 1.5,
      } as any,
    },
  };

  const titleLines = ["RAGHVENDER", "TYAGI"];

  return (
    <main className="relative min-h-screen bg-[#0a0a0a] overflow-hidden text-white selection:bg-white selection:text-black">


      {/* Interactive Spotlight Background */}
      <motion.div
        className="fixed inset-0 pointer-events-none z-10 opacity-30"
        style={{
          background: useTransform(
            [spotlightX, spotlightY],
            ([sx, sy]) => `radial-gradient(800px circle at ${sx} ${sy}, rgba(255,255,255,0.08), transparent)`
          )
        }}
      />

      {/* Hero Section */}
      <section
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative min-h-screen flex flex-col items-center justify-center px-10 pt-20 z-10 scanline-wipe"
      >
        {/* Decorative Pixel Icons */}
        <div className="absolute top-1/4 left-10 text-[var(--neon-green)] opacity-40 text-2xl font-pixel hard-blink">*</div>
        <div className="absolute top-1/3 right-20 text-[var(--neon-green)] opacity-40 text-2xl font-pixel">?</div>
        <div className="absolute bottom-1/4 left-20 text-[var(--neon-green)] opacity-40 text-2xl font-pixel">$</div>
        <div className="absolute bottom-1/3 right-10 text-[var(--neon-green)] opacity-40 text-2xl font-pixel">#</div>

        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          className="max-w-7xl w-full text-center relative z-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={itemVariants}
            className="text-[10px] md:text-xs font-pixel tracking-widest uppercase text-[var(--neon-green)]/40 mb-8"
          >
            <Typewriter text="[ SYSTEM STATUS: ONLINE ]" delay={1} />
          </motion.div>

          <div className="mb-12 overflow-hidden py-4">
            {titleLines.map((line, lineIdx) => (
              <h1 key={lineIdx} className="text-[10vw] md:text-[6rem] font-pixel leading-[1] tracking-tight uppercase flex justify-center overflow-hidden glitch-text">
                {line.split("").map((char, charIdx) => (
                  <motion.span
                    key={charIdx}
                    variants={charVariants}
                    style={{ display: "inline-block", translateZ: "100px" }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </h1>
            ))}
          </div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center gap-12"
          >
            <p className="text-sm md:text-lg font-mono tracking-tight text-[var(--neon-green)]/60 max-w-2xl leading-relaxed whitespace-pre-line">
              BUILDING MULTI-AGENT AI SYSTEMS
              {"\n"}AND AUTONOMOUS MACHINES.
            </p>

            <motion.div
              variants={bouncyVariants}
              className="flex flex-col md:flex-row gap-8"
            >
              <Link
                href="https://github.com/raghvender-tyagi"
                target="_blank"
                className="pixel-btn pixel-btn-primary"
              >
                [ GITHUB_LOG ]
              </Link>
              <Link
                href="https://linkedin.com/in/raghvender-tyagi-05a881247"
                target="_blank"
                className="pixel-btn"
              >
                [ LINKEDIN_ACC ]
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Enhanced Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <span className="text-[8px] font-pixel tracking-widest text-[var(--neon-green)]/40 uppercase hard-blink">v scroll v</span>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative py-40 px-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-32 border-b border-[var(--neon-green)]/20 pb-10">
            <h2 className="text-4xl md:text-5xl">Selected Works</h2>
            <div className="text-[10px] font-pixel text-[var(--neon-green)]/40 uppercase">[ PRJ // 2025 ]</div>
          </div>

          <div className="space-y-60">
            {[
              {
                id: "01",
                title: "Paperly Ai (Research Agent)",
                slug: "paperly-ai",
                desc: "Built a 6-agent LangGraph system generating 2,500+ word academic papers using RAG-based reasoning. Implemented arXiv retrieval to identify research gaps with critic–generator loops for quality control.",
                tags: ["LangGraph", "GPT-4o-mini", "arXiv API"],
                image: "/paperly_ai.png",
                liveLink: "https://paperly-ai.onrender.com/"
              },
              {
                id: "02",
                title: "NETRA MITRA (AI-Powered Navigation)",
                slug: "netra-mitra",
                desc: "Built an AI-powered navigation robot using 8 ultrasonic sensors and a Decision Tree model for autonomous path planning. Integrated ESP32-CAM + Raspberry Pi for scene capture and environment description with object detection.",
                tags: ["Decision Tree", "Raspberry Pi", "ESP32-CAM"],
                image: "/netra.jpeg"
              },
              {
                id: "03",
                title: "Smart Pesticide",
                slug: "smart-pesticide",
                desc: "Pixel-level crop analysis for precision pesticide application with 30% chemical reduction. Created a deep learning computer vision model to identify specific plant diseases in real-time.",
                tags: ["AgriTech", "Deep Learning", "PyTorch"],
                image: "/smart_pesticide.jpg"
              }
            ].map((prj) => (
              <div key={prj.title} className="group relative border-t border-[var(--neon-green)]/10 pt-20 first:border-0 first:pt-0">
                <div className="flex flex-col lg:flex-row gap-20 items-start">
                  <div className="w-full lg:w-1/2">
                    <div className="text-[10px] font-pixel text-[var(--neon-green)]/20 uppercase mb-8">[ {prj.id} // SYSTEM_MANIFEST ]</div>
                    <h3 className="text-3xl md:text-4xl mb-10 group-hover:translate-x-4 transition-transform duration-500">{prj.title}</h3>
                    <p className="text-xl text-[var(--neon-green)]/40 leading-relaxed font-mono mb-12 max-w-xl">{prj.desc}</p>
                    <div className="flex flex-wrap gap-4 items-center">
                      <div className="flex flex-wrap gap-4">
                        {prj.tags.map(tag => (
                          <span key={tag} className="text-[10px] font-mono uppercase text-[var(--neon-green)]/40 border border-[var(--neon-green)]/20 px-4 py-1">{tag}</span>
                        ))}
                      </div>
                      <div className="flex gap-4 mt-8 w-full">
                        <Link
                          href={`/${prj.slug}`}
                          className="pixel-btn text-[8px]"
                        >
                          [ DETAILS ]
                        </Link>
                        {prj.liveLink && (
                          <a
                            href={prj.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="pixel-btn pixel-btn-primary text-[8px]"
                          >
                            [ LIVE_VIEW ]
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                  <div
                    className="w-full lg:w-1/2 aspect-video bg-[#111] border-2 border-dashed border-[var(--neon-green)]/20 overflow-hidden group-hover:border-[var(--neon-green)]/60 transition-all relative flex items-center justify-center retro-card"
                    style={{
                      clipPath: "polygon(0 0, 95% 0, 100% 5%, 100% 100%, 5% 100%, 0 95%)"
                    }}
                  >
                    {prj.image ? (
                      <img
                        src={prj.image}
                        alt={prj.title}
                        className="relative z-10 w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 contrast-[1.2] brightness-[0.8] group-hover:brightness-[1]"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    ) : null}
                    <div className="absolute inset-0 bg-[var(--neon-green)]/5 group-hover:bg-transparent transition-colors pointer-events-none" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-60 px-10 md:px-20 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="w-full max-w-4xl mx-auto border-2 border-[var(--neon-green)]/20 p-12 relative retro-card">
            <div className="absolute -top-4 -left-4 bg-[#0a0a0a] px-4 font-pixel text-[var(--neon-green)] text-xs">
              [ ORIGIN // DATA_CORE ]
            </div>

            <h2 className="text-3xl md:text-5xl mb-16 px-4">The Architect</h2>

            <div className="space-y-8 text-lg md:text-xl text-[var(--neon-green)]/60 font-mono">
              <p>
                I WORK AT THE POINT WHERE SOFTWARE HAS TO MAKE DECISIONS — <span className="text-[var(--neon-green)]">NOT JUST RETURN OUTPUTS</span>.
              </p>
              <p>
                MOST OF MY WORK REVOLVES AROUND MULTI-AGENT AI SYSTEMS AND AUTONOMOUS MACHINES, WHERE MODELS DON&apos;T OPERATE IN ISOLATION BUT COLLABORATE, CRITIQUE, AND ADAPT.
              </p>
              <div className="space-y-4 border-l-2 border-[var(--neon-green)]/20 pl-8">
                <p className="text-[var(--neon-green)]/40 text-xs font-pixel uppercase">SYSTEM_CAPABILITIES:</p>
                <ul className="space-y-2 list-none">
                  <li>{'>'} <span className="text-[var(--neon-green)]">RETRIEVE AND REASON</span> OVER KNOWLEDGE.</li>
                  <li>{'>'} <span className="text-[var(--neon-green)]">CHALLENGE</span> SYSTEM OUTPUTS.</li>
                  <li>{'>'} ITERATE UNTIL <span className="text-[var(--neon-green)]">USABLE</span>.</li>
                </ul>
              </div>
              <p className="text-sm opacity-40 italic">
                // WHAT TIES EVERYTHING TOGETHER IS SYSTEM DESIGN—BALANCING INTELLIGENCE WITH RELIABILITY.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Arsenal (Skills) Section */}
      <section id="skills" className="relative py-40 px-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-32">
            <h2 className="text-5xl md:text-7xl">Arsenal</h2>
            <div className="text-[10px] font-pixel text-[var(--neon-green)]/40 uppercase tracking-widest">[ SKILLS // TECH ]</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
            {[
              {
                cat: "AI / ML",
                skills: [
                  { name: "PyTorch", level: 90 },
                  { name: "LangGraph", level: 95 },
                  { name: "Computer Vision", level: 85 },
                  { name: "RAG Systems", level: 90 }
                ]
              },
              {
                cat: "BACKEND",
                skills: [
                  { name: "Python", level: 95 },
                  { name: "PostgreSQL", level: 85 },
                  { name: "Docker", level: 80 },
                  { name: "Microservices", level: 85 }
                ]
              },
              {
                cat: "SYSTEMS",
                skills: [
                  { name: "Raspberry Pi", level: 90 },
                  { name: "ESP32", level: 85 },
                  { name: "C++", level: 75 },
                  { name: "ROS", level: 80 }
                ]
              }
            ].map((cat) => (
              <div key={cat.cat} className="space-y-12">
                <h3 className="text-xs font-pixel text-[var(--neon-green)]/40 border-b border-[var(--neon-green)]/20 pb-6">[ {cat.cat} ]</h3>
                <div className="space-y-8">
                  {cat.skills.map(skill => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between font-mono text-sm text-[var(--neon-green)]/60">
                        <span>{skill.name}</span>
                        <span>{skill.level}%</span>
                      </div>
                      <div className="flex gap-1">
                        {Array.from({ length: 12 }).map((_, i) => (
                          <div
                            key={i}
                            className={`h-4 w-full ${i < (skill.level / 100) * 12 ? 'bg-[var(--neon-green)]' : 'bg-[var(--neon-green)]/10'}`}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-60 px-10 bg-[#0a0a0a] text-center">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="space-y-8">
            <h2 className="text-2xl md:text-[2rem] leading-tight max-w-5xl mx-auto">
              [ BUILT WITH LOGIC AND CAFFEINE ]
            </h2>
            <p className="text-[10px] font-pixel text-[var(--neon-green)]/20 uppercase tracking-widest">
              LET&apos;S ADD YOUR PROJECT TO THE LOG.
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-center gap-10 pt-10">
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=raghvendertyagi@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="pixel-btn pixel-btn-primary"
            >
              [ EMAIL_ME ]
            </a>
            <a
              href="https://linkedin.com/in/raghvender-tyagi-05a881247"
              target="_blank"
              rel="noopener noreferrer"
              className="pixel-btn"
            >
              [ LINKEDIN_ACC ]
            </a>
          </div>
        </div>
      </section>

      <footer className="py-20 text-center border-t border-[var(--neon-green)]/10 bg-[#0a0a0a]">
        <div className="text-[10px] font-pixel text-[var(--neon-green)]/20 uppercase tracking-widest">
          © 2025 RAGHVENDER TYAGI // AI ENGINEER // SYSTEM_v1.0
        </div>
      </footer>
    </main>
  );
}
