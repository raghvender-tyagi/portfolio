"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function SmartPesticideDemoPage() {
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
                    <Link href="/smart-pesticide" className="text-[10px] font-bold tracking-[0.5em] text-white/20 uppercase hover:text-white transition-colors">
                        ← Back to Overview
                    </Link>
                </motion.div>

                <motion.div variants={itemVariants} className="mb-12">
                    <div className="text-[10px] font-bold tracking-[0.5em] text-white/20 uppercase mb-8">EVIDENCE // RESULTS</div>
                    <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-8">
                        Field Performance
                    </h1>
                </motion.div>

                <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-32 border-t border-white/5 pt-20">
                    <div className="aspect-video bg-[#1a1a1a] border border-white/5 flex items-center justify-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50" />
                        <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/20">Media Asset // Precision Spraying</span>
                    </div>
                    <div className="flex flex-col justify-center">
                        <h3 className="text-xs font-bold tracking-[0.5em] uppercase text-white/20 mb-6">Efficiency metrics</h3>
                        <ul className="space-y-4 text-white/60 font-light list-none">
                            <li className="flex items-center gap-4">
                                <span className="w-1.5 h-1.5 bg-white/20 rounded-full" />
                                30% Reduction in Pesticide Usage
                            </li>
                            <li className="flex items-center gap-4">
                                <span className="w-1.5 h-1.5 bg-white/20 rounded-full" />
                                96% Classification Accuracy
                            </li>
                            <li className="flex items-center gap-4">
                                <span className="w-1.5 h-1.5 bg-white/20 rounded-full" />
                                Real-time Inference (30 FPS)
                            </li>
                        </ul>
                    </div>
                </motion.div>
            </motion.div>
        </main>
    );
}
