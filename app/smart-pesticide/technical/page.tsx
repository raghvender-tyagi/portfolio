"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function SmartPesticideTechnicalPage() {
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
                    <div className="text-[10px] font-bold tracking-[0.5em] text-white/20 uppercase mb-8">INTERNAL // CV_PIPELINE</div>
                    <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-8">
                        Technical Details
                    </h1>
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-20 border-t border-white/5 pt-20">
                    <section>
                        <h3 className="text-xs font-bold tracking-[0.5em] uppercase text-white/20 mb-10">01 // Deep Learning Model</h3>
                        <p className="text-white/60 leading-relaxed font-light mb-8 max-w-2xl">
                            We trained a custom ResNet-50 architecture on the PlantVillage dataset, achieving 96% accuracy in identifying 38 different classes of plant diseases. The model was optimized using TensorRT for real-time inference on edge devices.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-xs font-bold tracking-[0.5em] uppercase text-white/20 mb-10">02 // Segmentation & Localization</h3>
                        <p className="text-white/60 leading-relaxed font-light mb-8 max-w-2xl">
                            Using OpenCV and pixel-level segmentation, the system localizes the exact coordinates of diseased patches on a leaf. This allows the robotic sprayer to target specific areas rather than whole plants.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-xs font-bold tracking-[0.5em] uppercase text-white/20 mb-10">03 // Edge Computing Stack</h3>
                        <p className="text-white/60 leading-relaxed font-light mb-8 max-w-2xl">
                            The inference engine runs on an NVIDIA Jetson Nano, which interfaces with a custom PCB via GPIO to control the high-frequency solenoid valves of the spraying mechanism.
                        </p>
                    </section>
                </motion.div>
            </motion.div>
        </main>
    );
}
