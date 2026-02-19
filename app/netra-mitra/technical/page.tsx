"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function NetraMitraTechnicalPage() {
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
                    <Link href="/netra-mitra" className="text-[10px] font-bold tracking-[0.5em] text-white/20 uppercase hover:text-white transition-colors">
                        ← Back to Overview
                    </Link>
                </motion.div>

                <motion.div variants={itemVariants} className="mb-12">
                    <div className="text-[10px] font-bold tracking-[0.5em] text-white/20 uppercase mb-8">INTERNAL // SENSORS_ML</div>
                    <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-8">
                        Technical Specs
                    </h1>
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-20 border-t border-white/5 pt-20">
                    <section>
                        <h3 className="text-xs font-bold tracking-[0.5em] uppercase text-white/20 mb-10">01 // Sensor Array & Processing</h3>
                        <p className="text-white/60 leading-relaxed font-light mb-8 max-w-2xl">
                            Equipped with 8 ultrasonic sensors positioned in a 180-degree arc. Data is processed locally on a Raspberry Pi 4 to calculate distances and identify potential collisions with high temporal resolution.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-xs font-bold tracking-[0.5em] uppercase text-white/20 mb-10">02 // Decision Tree Pathfinding</h3>
                        <p className="text-white/60 leading-relaxed font-light mb-8 max-w-2xl">
                            Implemented a custom Decision Tree model to determine the safest path. The model takes sensor inputs (left, right, center, diagonals) and outputs directional commands to the motor controller.
                        </p>
                    </section>

                    <section>
                        <h3 className="text-xs font-bold tracking-[0.5em] uppercase text-white/20 mb-10">03 // Vision Integration</h3>
                        <p className="text-white/60 leading-relaxed font-light mb-8 max-w-2xl">
                            An ESP32-CAM captures scene snapshots, which are then analyzed using a pre-trained SSD-Mobilenet model to identify objects (stairs, doors, chairs) and provide descriptive audio feedback to the user.
                        </p>
                    </section>
                </motion.div>
            </motion.div>
        </main>
    );
}
