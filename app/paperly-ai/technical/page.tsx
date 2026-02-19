"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function PaperlyAITechnicalPage() {
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
                    <Link href="/paperly-ai" className="text-[10px] font-bold tracking-[0.5em] text-white/20 uppercase hover:text-white transition-colors">
                        ← Back to Overview
                    </Link>
                </motion.div>

                <motion.div variants={itemVariants} className="mb-12">
                    <div className="text-[10px] font-bold tracking-[0.5em] text-white/20 uppercase mb-8">INTERNAL // ARCHITECTURE</div>
                    <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-8">
                        Technical Architecture
                    </h1>
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-20 border-t border-white/5 pt-20">
                    <section>
                        <h3 className="text-xs font-bold tracking-[0.5em] uppercase text-white/20 mb-10">01 // System Orchestration</h3>
                        <div className="text-white/60 leading-relaxed font-light mb-8 max-w-2xl space-y-4">
                            <p>
                                Built on **LangGraph** with a **StateGraph** foundation, Paperly AI orchestrates a multi-agent pipeline designed for academic precision.
                            </p>
                            <p className="text-sm border-l border-white/10 pl-6 py-2">
                                Planner → Researcher → Writer → Critic → Editor
                            </p>
                        </div>
                    </section>

                    <section>
                        <h3 className="text-xs font-bold tracking-[0.5em] uppercase text-white/20 mb-10">02 // Data Acquisition & Novelty</h3>
                        <p className="text-white/60 leading-relaxed font-light mb-8 max-w-2xl">
                            Phase 0 involves a deep crawl of **arXiv** and **Semantic Scholar**. The system extracts novelty points via LLM-powered gap analysis, ensuring the generated paper contributes unique value to the field.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-xs font-bold tracking-[0.5em] uppercase text-white/20 mb-10">03 // Generation-Critic Pattern</h3>
                        <div className="text-white/60 leading-relaxed font-light mb-8 max-w-2xl">
                            <p className="mb-4">Each section follows a strict **Generate → Critique → Route** cycle:</p>
                            <ul className="space-y-2 text-sm">
                                <li>• **Introduction:** Background, Research Gap, Objectives.</li>
                                <li>• **Lit Review:** Synthesizing 2020-2024 studies.</li>
                                <li>• **Methodology:** Research design and tools.</li>
                                <li>• **Conclusion:** Findings and future impact.</li>
                            </ul>
                            <p className="mt-6 text-xs text-white/30 italic">
                                *Retry Protection: Automatic force-proceed after 2 iterations to ensure completion.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h3 className="text-xs font-bold tracking-[0.5em] uppercase text-white/20 mb-10">04 // LLM Stack</h3>
                        <p className="text-white/60 leading-relaxed font-light mb-8 max-w-2xl">
                            Primary processing is handled by **gpt-4o-mini**, balancing technical depth with high-speed generation and academic consistency.
                        </p>
                    </section>
                </motion.div>
            </motion.div>
        </main>
    );
}
