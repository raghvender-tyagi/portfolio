"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function SmartPesticidePage() {
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
                    <div className="text-[10px] font-bold tracking-[0.5em] text-white/20 uppercase mb-8">PROJECT // 03</div>
                    <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8">
                        Smart Pesticide
                    </h1>
                    <p className="text-xl md:text-2xl text-white/40 font-light leading-relaxed max-w-2xl">
                        Precision agriculture system using deep learning for targeted pesticide application, reducing chemical waste by 30%.
                    </p>
                </motion.div>

                <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-32 border-t border-white/5 pt-20">
                    <div>
                        <h3 className="text-xs font-bold tracking-[0.5em] uppercase text-white/20 mb-10">Overview</h3>
                        <p className="text-white/60 leading-relaxed font-light mb-8">
                            The Smart Pesticide project leverages computer vision to identify crop diseases at the leaf level. By integrating a PyTorch model into a robotic sprayer, the system only applies chemicals where needed, significantly lowering environmental impact and costs.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            {["AgriTech", "Deep Learning", "PyTorch", "OpenCV"].map(tag => (
                                <span key={tag} className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/30 border border-white/10 px-6 py-2 rounded-full">{tag}</span>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-8">
                        <h3 className="text-xs font-bold tracking-[0.5em] uppercase text-white/20 mb-2">Navigation</h3>
                        <Link href="/smart-pesticide/technical" className="group flex justify-between items-center py-6 border-b border-white/5 hover:border-white/20 transition-all">
                            <span className="text-lg font-light text-white/60 group-hover:text-white transition-colors">Computer Vision Pipeline</span>
                            <span className="text-[10px] tracking-widest text-white/20 group-hover:translate-x-2 transition-transform uppercase">View ↗</span>
                        </Link>
                        <Link href="/smart-pesticide/demo" className="group flex justify-between items-center py-6 border-b border-white/5 hover:border-white/20 transition-all">
                            <span className="text-lg font-light text-white/60 group-hover:text-white transition-colors">Field Results & Analysis</span>
                            <span className="text-[10px] tracking-widest text-white/20 group-hover:translate-x-2 transition-transform uppercase">View ↗</span>
                        </Link>
                    </div>
                </motion.div>
            </motion.div>
        </main>
    );
}
