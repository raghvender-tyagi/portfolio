"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div
            className="custom-cursor fixed pointer-events-none z-[9999] mix-blend-difference border-2 border-white rounded-full w-6 h-6 -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out hidden lg:block"
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
            }}
        />
    );
}
