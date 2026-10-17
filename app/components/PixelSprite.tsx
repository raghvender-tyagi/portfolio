"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { SpriteData, SPRITE_COLORS } from "@/data/sprites";
import { usePrefersReducedMotion } from "@/app/hooks/usePrefersReducedMotion";

interface PixelSpriteProps {
  sprite?: SpriteData;
  frames?: SpriteData[];
  fps?: number;
  scale?: number;
  className?: string;
  ariaHidden?: boolean;
  paused?: boolean;
  animateOnHover?: boolean;
  colorMap?: Record<string, string>;
  title?: string;
}

export default function PixelSprite({
  sprite,
  frames,
  fps = 4,
  scale = 2,
  className = "",
  ariaHidden = true,
  paused = false,
  animateOnHover = false,
  colorMap = SPRITE_COLORS,
  title,
}: PixelSpriteProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const prefersReducedMotion = usePrefersReducedMotion();

  // IntersectionObserver to pause animation when off-screen
  useEffect(() => {
    if (!frames || frames.length <= 1 || typeof window === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, [frames]);

  // Tab visibility check
  useEffect(() => {
    if (typeof document === "undefined") return;
    const handleVisibility = () => {
      if (document.hidden) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  // Stepped frame cycling
  useEffect(() => {
    if (
      !frames ||
      frames.length <= 1 ||
      paused ||
      prefersReducedMotion ||
      !isVisible ||
      (animateOnHover && !isHovered)
    ) {
      return;
    }

    const intervalMs = Math.max(50, Math.floor(1000 / fps));
    const timer = setInterval(() => {
      setCurrentFrameIndex((prev) => (prev + 1) % frames.length);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [frames, fps, paused, prefersReducedMotion, isVisible, animateOnHover, isHovered]);

  const activeData = frames && frames.length > 0 ? frames[currentFrameIndex] : sprite;

  // Optimized run-length encoding: combine adjacent pixels of the same color into a single <rect>
  const rects = useMemo(() => {
    if (!activeData || activeData.length === 0) return [];
    const elements: React.ReactNode[] = [];
    const rows = activeData.length;

    for (let y = 0; y < rows; y++) {
      const row = activeData[y];
      const cols = row.length;
      let startX = -1;
      let currentColor = "";

      for (let x = 0; x < cols; x++) {
        const char = row[x];
        const hex = colorMap[char];

        if (hex) {
          if (startX === -1) {
            startX = x;
            currentColor = hex;
          } else if (currentColor !== hex) {
            // Flush run
            elements.push(
              <rect
                key={`${y}-${startX}-${x}`}
                x={startX}
                y={y}
                width={x - startX}
                height={1}
                fill={currentColor}
              />
            );
            startX = x;
            currentColor = hex;
          }
        } else {
          // Transparent pixel
          if (startX !== -1) {
            elements.push(
              <rect
                key={`${y}-${startX}-${x}`}
                x={startX}
                y={y}
                width={x - startX}
                height={1}
                fill={currentColor}
              />
            );
            startX = -1;
            currentColor = "";
          }
        }
      }

      // Flush row end run
      if (startX !== -1) {
        elements.push(
          <rect
            key={`${y}-${startX}-${cols}`}
            x={startX}
            y={y}
            width={cols - startX}
            height={1}
            fill={currentColor}
          />
        );
      }
    }

    return elements;
  }, [activeData, colorMap]);

  if (!activeData || activeData.length === 0) return null;

  const rows = activeData.length;
  const cols = activeData[0].length;
  const width = cols * scale;
  const height = rows * scale;

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => animateOnHover && setIsHovered(true)}
      onMouseLeave={() => animateOnHover && setIsHovered(false)}
      className={`inline-block select-none ${className}`}
      aria-hidden={ariaHidden}
      title={title}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        imageRendering: "pixelated",
      }}
    >
      <svg
        viewBox={`0 0 ${cols} ${rows}`}
        width={width}
        height={height}
        shapeRendering="crispEdges"
        className="w-full h-full block"
        xmlns="http://www.w3.org/2000/svg"
      >
        {rects}
      </svg>
    </div>
  );
}
