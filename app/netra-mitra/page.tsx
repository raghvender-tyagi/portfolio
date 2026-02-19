"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function NetraMitraPage() {
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
                    <div className="text-[10px] font-bold tracking-[0.5em] text-white/20 uppercase mb-8">PROJECT // 02</div>
                    <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8">
                        NETRA MITRA
                    </h1>
                    <p className="text-xl md:text-2xl text-white/40 font-light leading-relaxed max-w-2xl">
                        An AI-powered autonomous navigation system designed to assist visually impaired individuals using multi-sensor fusion.
                    </p>
                </motion.div>

                <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-32 border-t border-white/5 pt-20">
                    <div>
                        <h3 className="text-xs font-bold tracking-[0.5em] uppercase text-white/20 mb-10">Overview</h3>
                        <p className="text-white/60 leading-relaxed font-light mb-8">
                            NETRA MITRA (Eye Friend) is a robotic prototype that uses 8 ultrasonic sensors and computer vision to map environments in real-time. It provides haptic and audio feedback to the user, ensuring safe passage in complex indoor environments.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            {["Decision Tree", "Raspberry Pi", "ESP32-CAM", "Ultrasonic Sensors", "Object Detection"].map(tag => (
                                <span key={tag} className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/30 border border-white/10 px-6 py-2 rounded-full">{tag}</span>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-8">
                        <h3 className="text-xs font-bold tracking-[0.5em] uppercase text-white/20 mb-2">Navigation</h3>
                        <Link href="/netra-mitra/technical" className="group flex justify-between items-center py-6 border-b border-white/5 hover:border-white/20 transition-all">
                            <span className="text-lg font-light text-white/60 group-hover:text-white transition-colors">Sensor Fusion & ML</span>
                            <span className="text-[10px] tracking-widest text-white/20 group-hover:translate-x-2 transition-transform uppercase">View ↗</span>
                        </Link>
                        <Link href="/netra-mitra/demo" className="group flex justify-between items-center py-6 border-b border-white/5 hover:border-white/20 transition-all">
                            <span className="text-lg font-light text-white/60 group-hover:text-white transition-colors">Prototype Demonstration</span>
                            <span className="text-[10px] tracking-widest text-white/20 group-hover:translate-x-2 transition-transform uppercase">View ↗</span>
                        </Link>
                    </div>
                </motion.div>
            </motion.div>
        </main>
    );
}
