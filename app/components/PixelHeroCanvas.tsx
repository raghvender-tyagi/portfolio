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

    const COLOR_DARK = "#161616";
    const COLOR_LIGHT = "#E4E4E4";
    const COLOR_ACCENT = "#3B4BFF";

    let mouseX = -1000;
    let mouseY = -1000;

    let width = 0;
    let height = 0;
    let cellSize = 20;
    let cols = 0;
    let rows = 0;

    interface Cell {
      baseDark: boolean;
      currentDark: boolean;
      flipTimer: number; // For interactive stagger
      isHardLight: boolean; // Left 7 columns & nav band
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

      // Calculate 12-column boundary
      const sideMargin = width < 768 ? 24 : 64;
      const contentWidth = Math.max(0, width - sideMargin * 2);
      // Col 7 boundary: 7/12th of content width + sideMargin
      const col7BoundaryX = sideMargin + contentWidth * (7 / 12);

      const navBandY = 72; // Nav band top 72px
      const bottomTransitionY = height - 140; // Last 140px

      grid = [];
      for (let c = 0; c < cols; c++) {
        grid[c] = [];
        const cellX = c * cellSize;

        for (let r = 0; r < rows; r++) {
          const cellY = r * cellSize;

          // 1. Nav band (top 72px) is always strictly light
          const inNavBand = cellY + cellSize <= navBandY;

          // 2. Left 7 columns hard mask from below nav to bottom transition
          const inLeft7Col =
            cellX + cellSize <= col7BoundaryX &&
            cellY >= navBandY &&
            cellY < bottomTransitionY;

          const isHardLight = inNavBand || inLeft7Col;

          grid[c][r] = {
            baseDark: false,
            currentDark: false,
            flipTimer: 0,
            isHardLight,
          };
        }
      }
    };

    // Calculate baseline shapes and undulation
    const computeBaseGrid = (timeSec: number) => {
      const sideMargin = width < 768 ? 24 : 64;
      const contentWidth = Math.max(0, width - sideMargin * 2);
      const col7BoundaryX = sideMargin + contentWidth * (7 / 12);
      const navBandY = 72;
      const bottomTransitionY = height - 140;

      for (let r = 0; r < rows; r++) {
        const cellY = r * cellSize;

        // Top 72px nav band: always light
        if (cellY + cellSize <= navBandY) {
          for (let c = 0; c < cols; c++) {
            grid[c][r].baseDark = false;
            grid[c][r].isHardLight = true;
          }
          continue;
        }

        // Bottom 140px transition zone: dark mass spreads across full width
        if (cellY >= bottomTransitionY) {
          const transitionProgress = (cellY - bottomTransitionY) / 140;
          // Step dark mass smoothly leftward to cover width
          const leftCutoff = (1 - transitionProgress) * col7BoundaryX;

          for (let c = 0; c < cols; c++) {
            const cellX = c * cellSize;
            const isDark = cellX >= leftCutoff;
            grid[c][r].baseDark = isDark;
            grid[c][r].isHardLight = !isDark;
          }
          continue;
        }

        // Middle zone: slow, gentle undulation (amplitude ~4-6 cells)
        const wave =
          Math.sin(r * 0.16 + timeSec * 0.4) * (cellSize * 3.5) +
          Math.cos(r * 0.08 + timeSec * 0.2) * (cellSize * 1.5);

        // Undulating boundary running vertically between col 7 & 8
        const boundaryX = col7BoundaryX + wave + cellSize * 1.5;

        for (let c = 0; c < cols; c++) {
          const cellX = c * cellSize;
          const isDark = cellX >= boundaryX;

          // Enforce 1-cell feathering at the boundary
          const isHardLight = cellX + cellSize < col7BoundaryX;

          grid[c][r].baseDark = isHardLight ? false : isDark;
          grid[c][r].isHardLight = isHardLight;
        }
      }

      // Cleanup pass: eliminate small clusters (< 12 cells) and fill small holes (< 12 cells)
      // to guarantee ONE coherent dark mass with zero islands or floating blocks
      cleanupGrid();
    };

    const cleanupGrid = () => {
      // 2-pass morphological filtering:
      // Fill single-cell gaps and remove single protrusions
      for (let c = 1; c < cols - 1; c++) {
        for (let r = 1; r < rows - 1; r++) {
          if (grid[c][r].isHardLight) continue;

          let darkNeighbors = 0;
          if (grid[c - 1][r].baseDark) darkNeighbors++;
          if (grid[c + 1][r].baseDark) darkNeighbors++;
          if (grid[c][r - 1].baseDark) darkNeighbors++;
          if (grid[c][r + 1].baseDark) darkNeighbors++;

          // If a light cell is surrounded by 3 or 4 dark neighbors, fill hole
          if (!grid[c][r].baseDark && darkNeighbors >= 3) {
            grid[c][r].baseDark = true;
          }
          // If a dark cell is surrounded by 3 or 4 light neighbors, remove protrusion
          if (grid[c][r].baseDark && darkNeighbors <= 1) {
            grid[c][r].baseDark = false;
          }
        }
      }
    };

    // Draw faint '+' marks ONLY inside the dark zone at ~6% opacity
    const drawCrosshairs = () => {
      if (!ctx) return;
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(228, 228, 228, 0.06)";

      for (let c = 0; c <= cols; c++) {
        for (let r = 0; r <= rows; r++) {
          const sampleC = Math.min(c, cols - 1);
          const sampleR = Math.min(r, rows - 1);
          const cell = grid[sampleC]?.[sampleR];

          // Only draw inside the dark zone, never in the light zone
          if (!cell || !cell.currentDark) continue;

          const x = c * cellSize;
          const y = r * cellSize;

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
      computeBaseGrid(0);

      ctx.fillStyle = COLOR_LIGHT;
      ctx.fillRect(0, 0, width, height);

      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const cell = grid[c]?.[r];
          if (!cell) continue;
          cell.currentDark = cell.baseDark;

          if (cell.currentDark) {
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

      const timeSec = currentTime * 0.001;

      // Update baseline grid with slow, calm undulation
      computeBaseGrid(timeSec);

      // Base fill
      ctx.fillStyle = COLOR_LIGHT;
      ctx.fillRect(0, 0, width, height);

      // Cell cursor interaction: find cell under pointer
      const sideMargin = width < 768 ? 24 : 64;
      const contentWidth = Math.max(0, width - sideMargin * 2);
      const col7BoundaryX = sideMargin + contentWidth * (7 / 12);

      let hoverC = -1;
      let hoverR = -1;

      // Only enable cell highlights/flips inside the dark zone and its edge
      if (!isTouch && mouseX >= col7BoundaryX - cellSize * 2 && mouseX < width && mouseY >= 72 && mouseY < height) {
        hoverC = Math.floor(mouseX / cellSize);
        hoverR = Math.floor(mouseY / cellSize);
      }

      // Trigger staggered flips for 3x3 neighborhood around hover cell
      if (hoverC >= 0 && hoverR >= 0) {
        for (let dc = -1; dc <= 1; dc++) {
          for (let dr = -1; dr <= 1; dr++) {
            const nc = hoverC + dc;
            const nr = hoverR + dr;
            if (nc >= 0 && nc < cols && nr >= 0 && nr < rows) {
              const cell = grid[nc][nr];
              if (!cell.isHardLight) {
                const ring = Math.max(Math.abs(dc), Math.abs(dr));
                // Center ring 0: immediate; Ring 1: staggered
                const initialTimer = ring === 0 ? 0.35 : 0.25;
                if (cell.flipTimer < 0.1) {
                  cell.flipTimer = initialTimer;
                }
              }
            }
          }
        }
      }

      // Update flip timers and render cells
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const cell = grid[c][r];

          if (cell.flipTimer > 0) {
            cell.flipTimer = Math.max(0, cell.flipTimer - dt);
            // Flip color while timer is active
            cell.currentDark = cell.flipTimer > 0.05 ? !cell.baseDark : cell.baseDark;
          } else {
            cell.currentDark = cell.baseDark;
          }

          // Enforce hard light column strictly
          if (cell.isHardLight) {
            cell.currentDark = false;
          }

          if (cell.currentDark) {
            ctx.fillStyle = COLOR_DARK;
            ctx.fillRect(c * cellSize, r * cellSize, cellSize, cellSize);
          }
        }
      }

      // Draw faint '+' marks only inside dark zone
      drawCrosshairs();

      // Highlight the hovered pixel cell with a 1px blue (#3B4BFF) outline
      if (hoverC >= 0 && hoverR >= 0 && hoverC < cols && hoverR < rows) {
        const cell = grid[hoverC][hoverR];
        if (!cell.isHardLight) {
          ctx.strokeStyle = COLOR_ACCENT;
          ctx.lineWidth = 1;
          ctx.strokeRect(
            hoverC * cellSize + 0.5,
            hoverR * cellSize + 0.5,
            cellSize - 1,
            cellSize - 1
          );
        }
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
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
