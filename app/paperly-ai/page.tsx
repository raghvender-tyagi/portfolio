"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function PaperlyAIPage() {
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

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
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
        <main className="min-h-screen bg-[#0a0a0a] text-white py-40 px-10 md:px-20">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-4xl mx-auto"
            >
                <motion.div variants={itemVariants} className="mb-20">
                    <Link href="/" className="text-[10px] font-bold tracking-[0.5em] text-white/20 uppercase hover:text-white transition-colors">
                        ← Back to Terminal
                    </Link>
                </motion.div>

                <motion.div variants={itemVariants} className="mb-12">
                    <div className="text-[10px] font-bold tracking-[0.5em] text-white/20 uppercase mb-8">PROJECT // 01</div>
                    <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8">
                        Paperly Ai
                    </h1>
                    <p className="text-xl md:text-2xl text-white/40 font-light leading-relaxed max-w-2xl">
                        An intelligent, agentic AI system designed to automatically generate well-structured research papers using multi-agent orchestration.
                    </p>
                </motion.div>

                <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-32 border-t border-white/5 pt-20">
                    <div>
                        <h3 className="text-xs font-bold tracking-[0.5em] uppercase text-white/20 mb-10">Key Features</h3>
                        <ul className="space-y-6 mb-12">
                            {[
                                { title: "Autonomous Topic Understanding", desc: "Generates complete problem states and outlines from a simple topic." },
                                { title: "Automated Literature Review", desc: "Real-time search across arXiv and Semantic Scholar APIs." },
                                { title: "Agentic Workflow", desc: "Multi-agent pipeline: Planner → Researcher → Writer → Critic → Editor." },
                                { title: "Iterative Improvement", desc: "Critic agents evaluate coherence, technical depth, and originality." },
                                { title: "Citation Extraction", desc: "Automatic conversion into APA/IEEE reference formats." }
                            ].map((feature, i) => (
                                <li key={i} className="group">
                                    <div className="text-[10px] font-bold tracking-widest uppercase text-white/40 group-hover:text-white transition-colors mb-2">{feature.title}</div>
                                    <div className="text-sm text-white/20 font-light leading-relaxed">{feature.desc}</div>
                                </li>
                            ))}
                        </ul>
                        <div className="flex flex-wrap gap-4">
                            {["LangGraph", "GPT-4o-mini", "Research Agent", "StateGraph"].map(tag => (
                                <span key={tag} className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/30 border border-white/10 px-6 py-2 rounded-full">{tag}</span>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-8">
                        <h3 className="text-xs font-bold tracking-[0.5em] uppercase text-white/20 mb-2">Navigation</h3>
                        <Link href="/paperly-ai/technical" className="group flex justify-between items-center py-6 border-b border-white/5 hover:border-white/20 transition-all">
                            <span className="text-lg font-light text-white/60 group-hover:text-white transition-colors">Technical Architecture</span>
                            <span className="text-[10px] tracking-widest text-white/20 group-hover:translate-x-2 transition-transform uppercase">View ↗</span>
                        </Link>
                        <Link href="/paperly-ai/demo" className="group flex justify-between items-center py-6 border-b border-white/5 hover:border-white/20 transition-all">
                            <span className="text-lg font-light text-white/60 group-hover:text-white transition-colors">Live Demo & Results</span>
                            <span className="text-[10px] tracking-widest text-white/20 group-hover:translate-x-2 transition-transform uppercase">View ↗</span>
                        </Link>
                    </div>
                </motion.div>
            </motion.div>
        </main>
    );
}
