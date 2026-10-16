"use client";

import { useEffect, useRef } from "react";

export default function PixelHeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let animId: number = 0;
    let isVisible = true;
    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;

    // Palette constants
    const COLOR_DARK = "#161616";
    const COLOR_LIGHT = "#E4E4E4";

    // Mouse coordinates (relative to canvas)
    let mouseX = -1000;
    let mouseY = -1000;
    let glowX = -1000;
    let glowY = -1000;
    let lastMouseMoveTime = 0;

    let width = 0;
    let height = 0;
    let cellSize = 20;
    let cols = 0;
    let rows = 0;

    // Grid cell states
    interface Cell {
      baseDark: boolean;
      flip: number; // 0 (base) to 1 (inverted)
      crossX: number;
      crossY: number;
    }
    let grid: Cell[][] = [];

    const initGrid = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      const rect = parent.getBoundingClientRect();
      width = Math.ceil(rect.width);
      height = Math.ceil(rect.height);

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      // Adaptive cell size
      cellSize = width < 640 ? 16 : width < 1024 ? 20 : 22;
      cols = Math.ceil(width / cellSize) + 1;
      rows = Math.ceil(height / cellSize) + 1;

      grid = [];
      for (let c = 0; c < cols; c++) {
        grid[c] = [];
        for (let r = 0; r < rows; r++) {
          // Cellular / Dithered bleed calculation
          // Bottom-right quadrant is dark, bleeding into top-left light area
          const u = (c / cols) * 0.62 + (r / rows) * 0.58;

          // Organic harmonic frequencies for jagged dithered boundary
          const noise =
            Math.sin(c * 0.26 + r * 0.18) * 0.13 +
            Math.cos(c * 0.14 - r * 0.22) * 0.09 +
            Math.sin((c + r) * 0.38) * 0.07;

          // Bayer 4x4 dither pseudo-matrix
          const bayer =
            ((((c * 5 + r * 9) % 13) / 13) - 0.5) * 0.14;

          const val = u + noise + bayer;
          const baseDark = val > 0.56;

          grid[c][r] = {
            baseDark,
            flip: 0,
            crossX: c * cellSize,
            crossY: r * cellSize,
          };
        }
      }
    };

    const renderStatic = () => {
      if (!ctx) return;
      ctx.fillStyle = COLOR_LIGHT;
      ctx.fillRect(0, 0, width, height);

      // Draw cells
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const cell = grid[c]?.[r];
          if (!cell) continue;

          if (cell.baseDark) {
            ctx.fillStyle = COLOR_DARK;
            ctx.fillRect(c * cellSize, r * cellSize, cellSize, cellSize);
          }
        }
      }

      // Draw faint crosshairs
      drawCrosshairs();
    };

    const drawCrosshairs = () => {
      if (!ctx) return;
      ctx.lineWidth = 1;

      for (let c = 0; c <= cols; c++) {
        for (let r = 0; r <= rows; r++) {
          const x = c * cellSize;
          const y = r * cellSize;
          const sampleC = Math.min(c, cols - 1);
          const sampleR = Math.min(r, rows - 1);
          const cell = grid[sampleC]?.[sampleR];
          const isDark = cell ? (cell.flip > 0.5 ? !cell.baseDark : cell.baseDark) : false;

          ctx.strokeStyle = isDark ? "rgba(228, 228, 228, 0.08)" : "rgba(22, 22, 22, 0.08)";

          ctx.beginPath();
          // Horizontal line
          ctx.moveTo(x - 2.5, y);
          ctx.lineTo(x + 2.5, y);
          // Vertical line
          ctx.moveTo(x, y - 2.5);
          ctx.lineTo(x, y + 2.5);
          ctx.stroke();
        }
      }
    };

    initGrid();

    if (isReducedMotion) {
      renderStatic();
      return;
    }

    let lastTime = performance.now();
    const targetFps = 60;
    const frameInterval = 1000 / targetFps;

    const loop = (currentTime: number) => {
      if (!isVisible) {
        animId = requestAnimationFrame(loop);
        return;
      }

      const elapsed = currentTime - lastTime;
      if (elapsed < frameInterval) {
        animId = requestAnimationFrame(loop);
        return;
      }
      const dt = Math.min(elapsed / 1000, 0.1);
      lastTime = currentTime - (elapsed % frameInterval);

      // Smooth cursor trail for blue glow
      glowX += (mouseX - glowX) * 0.14;
      glowY += (mouseY - glowY) * 0.14;

      const timeSec = currentTime * 0.001;
      const isIdle = currentTime - lastMouseMoveTime > 2500 || isTouch;

      // Base fill
      ctx.fillStyle = COLOR_LIGHT;
      ctx.fillRect(0, 0, width, height);

      const interactRadius = 95;
      const interactRadiusSq = interactRadius * interactRadius;

      // Update and draw cells
      for (let c = 0; c < cols; c++) {
        const cx = c * cellSize + cellSize * 0.5;
        for (let r = 0; r < rows; r++) {
          const cy = r * cellSize + cellSize * 0.5;
          const cell = grid[c][r];

          // Mouse interaction
          if (!isTouch && mouseX > -500) {
            const dx = cx - mouseX;
            const dy = cy - mouseY;
            const distSq = dx * dx + dy * dy;
            if (distSq < interactRadiusSq) {
              const factor = 1 - Math.sqrt(distSq) / interactRadius;
              cell.flip = Math.max(cell.flip, factor);
            }
          }

          // Ambient subtle drift on touch or idle
          let isDark = cell.baseDark;
          if (isIdle) {
            const wave = Math.sin(timeSec * 0.9 + c * 0.22 + r * 0.18) * 0.08;
            const u = (c / cols) * 0.62 + (r / rows) * 0.58;
            const noise =
              Math.sin(c * 0.26 + r * 0.18) * 0.13 +
              Math.cos(c * 0.14 - r * 0.22) * 0.09;
            const val = u + noise + wave;
            if (val > 0.56) isDark = true;
            else isDark = false;
          }

          // Decrement flip timer
          if (cell.flip > 0) {
            cell.flip = Math.max(0, cell.flip - dt * 2.2);
            if (cell.flip > 0.45) {
              isDark = !cell.baseDark;
            }
          }

          if (isDark) {
            ctx.fillStyle = COLOR_DARK;
            ctx.fillRect(c * cellSize, r * cellSize, cellSize, cellSize);
          }
        }
      }

      // Draw faint crosshairs
      drawCrosshairs();

      // Soft electric-blue glow trailing cursor
      if (glowX > -200 && glowX < width + 200 && glowY > -200 && glowY < height + 200) {
        const glowRadius = width < 640 ? 110 : 150;
        const grad = ctx.createRadialGradient(glowX, glowY, 0, glowX, glowY, glowRadius);
        grad.addColorStop(0, "rgba(59, 75, 255, 0.17)");
        grad.addColorStop(0.45, "rgba(59, 75, 255, 0.06)");
        grad.addColorStop(1, "rgba(59, 75, 255, 0)");

        ctx.fillStyle = grad;
        ctx.fillRect(glowX - glowRadius, glowY - glowRadius, glowRadius * 2, glowRadius * 2);
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    // Event handlers
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      lastMouseMoveTime = performance.now();
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    const handleResize = () => {
      initGrid();
      if (isReducedMotion) {
        renderStatic();
      }
    };

    // Pause when tab hidden
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };

    // Pause when scrolled out of view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting && !document.hidden;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", handleResize, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-0"
      aria-hidden="true"
    />
  );
}

