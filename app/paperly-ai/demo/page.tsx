"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function PaperlyAIDemoPage() {
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
                    <div className="text-[10px] font-bold tracking-[0.5em] text-white/20 uppercase mb-8">EVIDENCE // DEMO</div>
                    <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-8">
                        Live Demo & Results
                    </h1>
                </motion.div>

                <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-32 border-t border-white/5 pt-20">
                    <div>
                        <h3 className="text-xs font-bold tracking-[0.5em] uppercase text-white/20 mb-6">Execution Results</h3>
                        <ul className="space-y-4 text-white/60 font-light list-none border-l border-white/5 pl-6">
                            <li className="flex flex-col gap-1">
                                <span className="text-[10px] font-bold tracking-widest text-white/30 uppercase">Final Output Package</span>
                                <span>✓ Auto-generated Title & Abstract</span>
                                <span>✓ Synthesized Literature Review</span>
                                <span>✓ Detailed Methodology</span>
                                <span>✓ Formatted References (IEEE/APA)</span>
                            </li>
                        </ul>

                        <div className="mt-12">
                            <h3 className="text-xs font-bold tracking-[0.5em] uppercase text-white/20 mb-6">Installation</h3>
                            <div className="bg-white/5 p-6 border border-white/5 font-mono text-[10px] space-y-2 text-white/40 group relative overflow-hidden">
                                <p>git clone https://github.com/username/paperly-ai</p>
                                <p>cd paperly-ai</p>
                                <p>pip install -r requirements.txt</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col justify-center">
                        <div className="aspect-video bg-[#1a1a1a] border border-white/5 flex items-center justify-center relative overflow-hidden mb-10">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50" />
                            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/20">Demo Interface Preview</span>
                        </div>
                        <a
                            href="https://paperly-ai.onrender.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block w-fit px-8 py-4 border border-white/10 hover:bg-white hover:text-black transition-all text-[10px] font-bold tracking-[0.4em] uppercase"
                        >
                            Launch Live Application ↗
                        </a>
                    </div>
                </motion.div>
            </motion.div>
        </main>
    );
}
