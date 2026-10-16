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

    interface Cell {
      baseDark: boolean;
      flip: number;
      isTextSafe: boolean; // inside headline / CTA safe zone (must stay light)
      isInfoSafe: boolean; // inside bottom-right manifest card (must stay dark)
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

      // Cell size: 20px desktop, 14px mobile
      cellSize = width < 768 ? 14 : 20;
      cols = Math.ceil(width / cellSize) + 1;
      rows = Math.ceil(height / cellSize) + 1;

      // Measure DOM safe zones
      const textZoneEl = document.getElementById("hero-text-zone");
      const infoCardEl = document.getElementById("hero-info-card");

      let textRect = { left: 0, top: 0, right: 0, bottom: 0 };
      if (textZoneEl) {
        const tr = textZoneEl.getBoundingClientRect();
        const pr = parent.getBoundingClientRect();
        textRect = {
          left: Math.max(0, tr.left - pr.left - 36),
          top: Math.max(0, tr.top - pr.top - 24),
          right: tr.right - pr.left + 36,
          bottom: tr.bottom - pr.top + 36,
        };
      } else {
        // Fallback bounds
        textRect = {
          left: 0,
          top: 0,
          right: width < 768 ? width : Math.min(width * 0.75, 880),
          bottom: width < 768 ? height * 0.65 : Math.min(height * 0.78, 620),
        };
      }

      let infoRect = { left: 0, top: 0, right: 0, bottom: 0 };
      if (infoCardEl) {
        const ir = infoCardEl.getBoundingClientRect();
        const pr = parent.getBoundingClientRect();
        infoRect = {
          left: ir.left - pr.left - 20,
          top: ir.top - pr.top - 20,
          right: ir.right - pr.left + 20,
          bottom: ir.bottom - pr.top + 20,
        };
      } else {
        infoRect = {
          left: width - Math.min(width * 0.5, 580),
          top: height - 260,
          right: width,
          bottom: height,
        };
      }

      grid = [];
      for (let c = 0; c < cols; c++) {
        grid[c] = [];
        const cellLeft = c * cellSize;
        const cellRight = cellLeft + cellSize;

        for (let r = 0; r < rows; r++) {
          const cellTop = r * cellSize;
          const cellBottom = cellTop + cellSize;

          // Check intersection with text safe zone (headline & CTAs)
          const inTextSafe =
            cellRight >= textRect.left &&
            cellLeft <= textRect.right &&
            cellBottom >= textRect.top &&
            cellTop <= textRect.bottom;

          // Check intersection with info card safe zone
          const inInfoSafe =
            cellRight >= infoRect.left &&
            cellLeft <= infoRect.right &&
            cellBottom >= infoRect.top &&
            cellTop <= infoRect.bottom;

          let baseDark = false;

          if (inTextSafe) {
            baseDark = false; // Strictly light behind headline & CTAs
          } else if (inInfoSafe) {
            baseDark = true; // Strictly dark behind manifest card
          } else {
            // Bleed from right edge and bottom
            const u = (c / cols) * 0.66 + (r / rows) * 0.58;

            const noise =
              Math.sin(c * 0.26 + r * 0.18) * 0.12 +
              Math.cos(c * 0.14 - r * 0.22) * 0.08 +
              Math.sin((c + r) * 0.35) * 0.06;

            const bayer =
              ((((c * 5 + r * 9) % 13) / 13) - 0.5) * 0.14;

            const val = u + noise + bayer;
            baseDark = val > 0.56;
          }

          grid[c][r] = {
            baseDark,
            flip: 0,
            isTextSafe: inTextSafe,
            isInfoSafe: inInfoSafe,
          };
        }
      }

      // Morphological cleanup pass: remove isolated single-pixel noise
      // so boundaries read as chunky stair-steps like the reference
      for (let c = 1; c < cols - 1; c++) {
        for (let r = 1; r < rows - 1; r++) {
          const cell = grid[c][r];
          if (cell.isTextSafe || cell.isInfoSafe) continue;

          // Count 4-connected neighbors
          let sameCount = 0;
          if (grid[c - 1][r].baseDark === cell.baseDark) sameCount++;
          if (grid[c + 1][r].baseDark === cell.baseDark) sameCount++;
          if (grid[c][r - 1].baseDark === cell.baseDark) sameCount++;
          if (grid[c][r + 1].baseDark === cell.baseDark) sameCount++;

          // If isolated single cell, flip to match surroundings
          if (sameCount <= 1) {
            cell.baseDark = !cell.baseDark;
          }
        }
      }
    };

    const drawCrosshairs = () => {
      if (!ctx) return;
      ctx.lineWidth = 1;

      for (let c = 0; c <= cols; c++) {
        for (let r = 0; r <= rows; r++) {
          const sampleC = Math.min(c, cols - 1);
          const sampleR = Math.min(r, rows - 1);
          const cell = grid[sampleC]?.[sampleR];

          // Omit crosshairs completely inside the text safe zone
          if (cell && cell.isTextSafe) continue;

          const x = c * cellSize;
          const y = r * cellSize;
          const isDark = cell ? (cell.flip > 0.5 ? !cell.baseDark : cell.baseDark) : false;

          // Faint crosshairs at ~8% opacity
          ctx.strokeStyle = isDark ? "rgba(228, 228, 228, 0.08)" : "rgba(22, 22, 22, 0.08)";

          ctx.beginPath();
          ctx.moveTo(x - 2.5, y);
          ctx.lineTo(x + 2.5, y);
          ctx.moveTo(x, y - 2.5);
          ctx.lineTo(x, y + 2.5);
          ctx.stroke();
        }
      }
    };

    const renderStatic = () => {
      if (!ctx) return;
      ctx.fillStyle = COLOR_LIGHT;
      ctx.fillRect(0, 0, width, height);

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
      drawCrosshairs();
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

      // Smooth cursor trail with slight lag (lerp 0.15)
      glowX += (mouseX - glowX) * 0.15;
      glowY += (mouseY - glowY) * 0.15;

      // 30% slower ambient drift speed
      const timeSec = currentTime * 0.0007;
      const isIdle = currentTime - lastMouseMoveTime > 2500 || isTouch;

      // Base fill
      ctx.fillStyle = COLOR_LIGHT;
      ctx.fillRect(0, 0, width, height);

      // Cursor reaction radius ~6 cells with eased falloff
      const interactRadius = cellSize * 6;
      const interactRadiusSq = interactRadius * interactRadius;

      for (let c = 0; c < cols; c++) {
        const cx = c * cellSize + cellSize * 0.5;
        for (let r = 0; r < rows; r++) {
          const cy = r * cellSize + cellSize * 0.5;
          const cell = grid[c][r];

          // Mouse interaction (strictly disabled inside text safe zone)
          if (!isTouch && !cell.isTextSafe && mouseX > -500) {
            const dx = cx - mouseX;
            const dy = cy - mouseY;
            const distSq = dx * dx + dy * dy;
            if (distSq < interactRadiusSq) {
              const dist = Math.sqrt(distSq);
              // Eased cosine falloff
              const factor = Math.cos((dist / interactRadius) * (Math.PI / 2));
              cell.flip = Math.max(cell.flip, factor);
            }
          }

          let isDark = cell.baseDark;

          // Slower ambient wave on idle/touch (never in text safe zone)
          if (isIdle && !cell.isTextSafe && !cell.isInfoSafe) {
            const wave = Math.sin(timeSec + c * 0.22 + r * 0.18) * 0.08;
            const u = (c / cols) * 0.66 + (r / rows) * 0.58;
            const noise =
              Math.sin(c * 0.26 + r * 0.18) * 0.12 +
              Math.cos(c * 0.14 - r * 0.22) * 0.08;
            const val = u + noise + wave;
            isDark = val > 0.56;
          }

          // Decrement flip timer
          if (cell.flip > 0) {
            cell.flip = Math.max(0, cell.flip - dt * 2.0);
            if (cell.flip > 0.45 && !cell.isTextSafe) {
              isDark = !cell.baseDark;
            }
          }

          // Guaranteed contrast enforcement
          if (cell.isTextSafe) {
            isDark = false;
          } else if (cell.isInfoSafe) {
            isDark = true;
          }

          if (isDark) {
            ctx.fillStyle = COLOR_DARK;
            ctx.fillRect(c * cellSize, r * cellSize, cellSize, cellSize);
          }
        }
      }

      drawCrosshairs();

      // Soft electric-blue radial glow following cursor (z-index 0 below all content)
      if (glowX > -200 && glowX < width + 200 && glowY > -200 && glowY < height + 200) {
        const glowRadius = width < 768 ? 120 : 160;
        const grad = ctx.createRadialGradient(glowX, glowY, 0, glowX, glowY, glowRadius);
        grad.addColorStop(0, "rgba(59, 75, 255, 0.18)");
        grad.addColorStop(0.5, "rgba(59, 75, 255, 0.06)");
        grad.addColorStop(1, "rgba(59, 75, 255, 0)");

        ctx.fillStyle = grad;
        ctx.fillRect(glowX - glowRadius, glowY - glowRadius, glowRadius * 2, glowRadius * 2);
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

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

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };

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
