"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function Home() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

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
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as any,
      },
    },
  };

  return (
    <main className="relative min-h-screen bg-[#111111] overflow-hidden font-inter text-white selection:bg-white selection:text-black">
      {/* Hero Section */}
      <section
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative min-h-screen flex flex-col items-center justify-center px-10 pt-20"
      >
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          className="max-w-7xl w-full text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={itemVariants}
            className="text-[10px] md:text-sm font-bold tracking-[1em] uppercase text-white/30 mb-8"
          >
            AI ENGINEER
          </motion.div>

          <motion.h1
            variants={itemVariants}
            style={{ translateZ: "50px" }}
            className="text-[10vw] md:text-[6rem] font-black leading-[0.85] tracking-tighter uppercase mb-12"
          >
            RAGHVENDER <br /> TYAGI
          </motion.h1>

          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center gap-10"
          >
            <p className="text-sm md:text-lg font-medium tracking-tight text-white/40 max-w-2xl leading-relaxed">
              Building real-world AI systems <br />
              with LangGraph, RAG, and modern web stacks.
            </p>
            <div className="flex gap-10">
              <motion.a
                href="https://github.com/raghvender-tyagi"
                target="_blank"
                whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 border border-white/10 hover:bg-white hover:text-black transition-all text-xs font-bold tracking-widest uppercase"
              >
                GitHub
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/raghvender-tyagi-05a881247"
                target="_blank"
                whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 border border-white/10 hover:bg-white hover:text-black transition-all text-xs font-bold tracking-widest uppercase"
              >
                LinkedIn
              </motion.a>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-[1px] h-20 bg-gradient-to-b from-white/20 to-transparent relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-white/40 -translate-y-full animate-infinite-scroll" />
          </div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative py-40 px-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-32 border-b border-white/5 pb-10">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Selected Works</h2>
            <div className="text-[10px] font-bold tracking-[0.5em] text-white/20 uppercase">PRJ // 2025</div>
          </div>

          <div className="space-y-60">
            {[
              {
                id: "01",
                title: "Paperly Ai (Research Agent)",
                desc: "Built a 6-agent LangGraph system generating 2,500+ word academic papers using RAG-based reasoning. Implemented arXiv retrieval to identify research gaps with critic–generator loops for quality control.",
                tags: ["LangGraph", "GPT-4o-mini", "arXiv API", "Django", "ReportLab"],
                image: "/paperly_ai.png",
                liveLink: "https://paperly-ai.onrender.com/"
              },
              {
                id: "02",
                title: "NETRA MITRA (AI-Powered Navigation)",
                desc: "Built an AI-powered navigation robot using 8 ultrasonic sensors and a Decision Tree model for autonomous path planning. Integrated ESP32-CAM + Raspberry Pi for scene capture and environment description with object detection.",
                tags: ["Decision Tree", "Raspberry Pi", "ESP32-CAM", "Ultrasonic Sensors", "Object Detection"],
                image: "/netra.jpeg"
              },
              {
                id: "03",
                title: "Smart Pesticide",
                desc: "Pixel-level crop analysis for precision pesticide application with 30% chemical reduction.",
                tags: ["AgriTech", "CV", "ML"],
              }
            ].map((prj) => (
              <div key={prj.title} className="group relative border-t border-white/5 pt-20 first:border-0 first:pt-0">
                <div className="flex flex-col lg:flex-row gap-20 items-start">
                  <div className="w-full lg:w-1/2">
                    <div className="text-[10px] font-bold tracking-[0.5em] text-white/20 uppercase mb-8">{prj.id} // SYSTEM_MANIFEST</div>
                    <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-10 group-hover:translate-x-4 transition-transform duration-500">{prj.title}</h3>
                    <p className="text-xl text-white/40 leading-relaxed font-light mb-12 max-w-xl">{prj.desc}</p>
                    <div className="flex flex-wrap gap-4 items-center">
                      <div className="flex flex-wrap gap-4">
                        {prj.tags.map(tag => (
                          <span key={tag} className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/30 border border-white/10 px-6 py-2 rounded-full">{tag}</span>
                        ))}
                      </div>
                      {prj.liveLink && (
                        <a
                          href={prj.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-6 py-2 border border-white hover:bg-white hover:text-black transition-all text-[10px] font-bold tracking-[0.4em] uppercase ml-2 md:ml-6"
                        >
                          View Live ↗
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="w-full lg:w-1/2 aspect-video bg-[#1a1a1a] border border-white/5 overflow-hidden group-hover:border-white/20 transition-all relative shadow-2xl flex items-center justify-center">
                    {/* Background Text (Behind Image) */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                      <div className="text-[10vw] font-black text-white/5 uppercase select-none tracking-tighter">{prj.title}</div>
                    </div>

                    {prj.image ? (
                      <img
                        src={prj.image}
                        alt={prj.title}
                        className="relative z-10 w-full h-full object-cover opacity-100 group-hover:scale-105 transition-transform duration-700 contrast-[1.1] brightness-[1.1]"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    ) : null}

                    {/* Subtle Overlay to ensure text legibility if needed, but keeping it minimal */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-40 transition-opacity z-20 pointer-events-none" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-60 px-10 md:px-20 bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div className="text-[10px] font-bold tracking-[1.2rem] text-white/20 uppercase mb-8">ORIGIN // DATA_CORE</div>
            <h2 className="text-4xl md:text-[5rem] font-black leading-tight tracking-tighter uppercase mb-16">
              The Architect
            </h2>

            <div className="space-y-4 text-lg md:text-xl text-white/40 leading-[1.6] font-light">
              <p>
                I work at the point where software has to make decisions — <span className="text-white">not just return outputs</span>.
              </p>
              <p>
                Most of my work revolves around multi-agent AI systems and autonomous machines, where models don&apos;t operate in isolation but collaborate, critique, and adapt.
              </p>
              <div className="space-y-2">
                <p className="text-white/60 font-medium text-[10px] tracking-[0.4em] uppercase">I&apos;ve built systems where agents:</p>
                <ul className="space-y-1 list-none border-l border-white/10 pl-8">
                  <li><span className="text-white">Retrieve and reason</span> over external knowledge (RAG).</li>
                  <li><span className="text-white">Challenge</span> each other&apos;s outputs.</li>
                  <li>Iterate until the result is <span className="text-white font-medium">actually usable</span> — not just fluent.</li>
                </ul>
              </div>
              <p>
                On the robotics side, I enjoy going lower in the stack. From sensor data and control logic to vision pipelines, I work on systems that <span className="text-white">interact with the physical world</span>.
              </p>
              <p className="text-base text-white/20 italic max-w-2xl">
                What ties everything together for me is system design—balancing intelligence with reliability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Arsenal (Skills) Section */}
      <section id="skills" className="relative py-40 px-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-32">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">Arsenal</h2>
            <div className="text-[10px] font-bold tracking-[0.5em] text-white/20 uppercase">SKILLS // TECH</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
            {[
              {
                cat: "AI / ML",
                skills: ["TensorFlow & PyTorch", "LangChain / LangGraph", "Computer Vision", "RAG Systems", "Agentic Workflows"]
              },
              {
                cat: "BACKEND",
                skills: ["Python (Django/FastAPI)", "PostgreSQL / Pinecone", "Docker & Kubernetes", "Redis", "Microservices"]
              },
              {
                cat: "SYSTEMS",
                skills: ["Raspberry Pi & ESP32", "IoT Protocols", "C++ / ROS", "Circuit Design", "Autonomous Nav"]
              }
            ].map((cat) => (
              <div key={cat.cat} className="space-y-10">
                <h3 className="text-xs font-bold tracking-[0.5em] uppercase text-white/20 border-b border-white/5 pb-10">{cat.cat}</h3>
                <ul className="space-y-6">
                  {cat.skills.map(skill => (
                    <li key={skill} className="text-lg font-light text-white/60 hover:text-white transition-colors cursor-default">{skill}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-60 px-10 bg-[#0d0d0d] text-center">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="space-y-8">
            <h2 className="text-2xl md:text-[2rem] font-black tracking-tighter uppercase leading-tight max-w-5xl mx-auto whitespace-nowrap">
              Built with logic, caffeine, and curiosity.
            </h2>
            <p className="text-[10px] md:text-xs font-bold tracking-[0.4em] text-white/10 uppercase">
              Let’s add your product to the list.
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-center gap-10 pt-10">
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=raghvendertyagi@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-12 py-5 border border-white/10 hover:bg-white hover:text-black transition-all text-xs font-bold tracking-[0.3em] uppercase"
            >
              Email Me
            </a>
            <a
              href="https://linkedin.com/in/raghvender-tyagi-05a881247"
              target="_blank"
              rel="noopener noreferrer"
              className="px-12 py-5 border border-white/10 hover:bg-white hover:text-black transition-all text-xs font-bold tracking-[0.3em] uppercase"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      <footer className="py-20 text-center border-t border-white/5 bg-[#0d0d0d]">
        <div className="text-[10px] font-bold tracking-[1em] text-white/10 uppercase">
          © 2025 RAGHVENDER TYAGI // AI ENGINEER
        </div>
      </footer>
    </main>
  );
}
