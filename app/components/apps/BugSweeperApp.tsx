"use client";

import React, { useState, useEffect, useCallback } from "react";
import PixelSprite from "../PixelSprite";
import { bugSmileySprites } from "@/data/sprites";

interface Cell {
  r: number;
  c: number;
  hasBug: boolean;
  revealed: boolean;
  flagged: boolean;
  neighborBugs: number;
}

const ROWS = 8;
const COLS = 8;
const BUGS_COUNT = 8;

export default function BugSweeperApp() {
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [timer, setTimer] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  const initGame = useCallback(() => {
    // Generate empty grid
    const newGrid: Cell[][] = [];
    for (let r = 0; r < ROWS; r++) {
      const row: Cell[] = [];
      for (let c = 0; c < COLS; c++) {
        row.push({
          r,
          c,
          hasBug: false,
          revealed: false,
          flagged: false,
          neighborBugs: 0,
        });
      }
      newGrid.push(row);
    }

    // Place bugs randomly
    let placed = 0;
    while (placed < BUGS_COUNT) {
      const rr = Math.floor(Math.random() * ROWS);
      const cc = Math.floor(Math.random() * COLS);
      if (!newGrid[rr][cc].hasBug) {
        newGrid[rr][cc].hasBug = true;
        placed++;
      }
    }

    // Calculate neighbors
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (!newGrid[r][c].hasBug) {
          let count = 0;
          for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
              const nr = r + dr;
              const nc = c + dc;
              if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && newGrid[nr][nc].hasBug) {
                count++;
              }
            }
          }
          newGrid[r][c].neighborBugs = count;
        }
      }
    }

    setGrid(newGrid);
    setGameOver(false);
    setGameWon(false);
    setTimer(0);
    setTimerActive(false);
  }, []);

  useEffect(() => {
    initGame();
  }, [initGame]);

  useEffect(() => {
    if (!timerActive || gameOver || gameWon) return;
    const interval = setInterval(() => setTimer((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, [timerActive, gameOver, gameWon]);

  const revealCell = (r: number, c: number) => {
    if (gameOver || gameWon || !grid[r] || !grid[r][c] || grid[r][c].revealed || grid[r][c].flagged) {
      return;
    }

    if (!timerActive) setTimerActive(true);

    const newGrid = grid.map((row) => row.map((cell) => ({ ...cell })));
    const target = newGrid[r][c];

    if (target.hasBug) {
      // Hit a bug! Game Over
      target.revealed = true;
      // Reveal all other bugs
      newGrid.forEach((row) =>
        row.forEach((cell) => {
          if (cell.hasBug) cell.revealed = true;
        })
      );
      setGrid(newGrid);
      setGameOver(true);
      return;
    }

    // Flood fill empty neighbors
    const queue = [[r, c]];
    target.revealed = true;

    while (queue.length > 0) {
      const [currR, currC] = queue.shift()!;
      if (newGrid[currR][currC].neighborBugs === 0) {
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            const nr = currR + dr;
            const nc = currC + dc;
            if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) {
              const neighbor = newGrid[nr][nc];
              if (!neighbor.revealed && !neighbor.flagged && !neighbor.hasBug) {
                neighbor.revealed = true;
                if (neighbor.neighborBugs === 0) {
                  queue.push([nr, nc]);
                }
              }
            }
          }
        }
      }
    }

    // Check win condition
    let unrevealedSafe = 0;
    newGrid.forEach((row) =>
      row.forEach((cell) => {
        if (!cell.hasBug && !cell.revealed) unrevealedSafe++;
      })
    );

    setGrid(newGrid);

    if (unrevealedSafe === 0) {
      setGameWon(true);
    }
  };

  const toggleFlag = (e: React.MouseEvent, r: number, c: number) => {
    e.preventDefault();
    if (gameOver || gameWon || !grid[r] || !grid[r][c] || grid[r][c].revealed) return;
    const newGrid = grid.map((row) => row.map((cell) => ({ ...cell })));
    newGrid[r][c].flagged = !newGrid[r][c].flagged;
    setGrid(newGrid);
  };

  const flaggedCount = grid.reduce(
    (acc, row) => acc + row.filter((c) => c.flagged).length,
    0
  );
  const remainingBugs = Math.max(0, BUGS_COUNT - flaggedCount);

  let smiley = bugSmileySprites.normal;
  if (gameOver) smiley = bugSmileySprites.dead;
  else if (gameWon) smiley = bugSmileySprites.cool;

  const numberColors: Record<number, string> = {
    1: "#0000FF",
    2: "#008000",
    3: "#FF0000",
    4: "#000080",
    5: "#800000",
  };

  return (
    <div className="p-3 bg-[#C0C0C0] text-black font-mono text-xs flex flex-col items-center justify-between h-full select-none space-y-3">
      {/* 3D Header with LCDs & Smiley */}
      <div className="w-full bevel-in bg-[#C0C0C0] p-1.5 flex items-center justify-between">
        {/* Remaining Bugs LCD */}
        <div className="bg-black text-[#FF0000] font-pixel text-sm px-2 py-0.5 tracking-widest border border-[#808080]">
          {remainingBugs.toString().padStart(3, "0")}
        </div>

        {/* Smiley Reset Button */}
        <button
          type="button"
          onClick={initGame}
          className="w-7 h-7 bevel-out bg-[#C0C0C0] active:bevel-in flex items-center justify-center p-0.5 cursor-pointer"
        >
          <PixelSprite sprite={smiley} scale={1} />
        </button>

        {/* Timer LCD */}
        <div className="bg-black text-[#FF0000] font-pixel text-sm px-2 py-0.5 tracking-widest border border-[#808080]">
          {Math.min(999, timer).toString().padStart(3, "0")}
        </div>
      </div>

      {/* Sweeper Grid */}
      <div className="bevel-in bg-[#808080] p-1">
        <div className="grid grid-cols-8 gap-0 border border-[#808080]">
          {grid.map((row, r) =>
            row.map((cell, c) => {
              return (
                <button
                  key={`${r}-${c}`}
                  type="button"
                  onClick={() => revealCell(r, c)}
                  onContextMenu={(e) => toggleFlag(e, r, c)}
                  className={`w-6 h-6 font-pixel text-[11px] font-bold flex items-center justify-center transition-none outline-none ${
                    cell.revealed
                      ? "bg-[#C0C0C0] border border-[#808080]"
                      : "bevel-out bg-[#C0C0C0] active:bevel-in cursor-pointer"
                  }`}
                >
                  {cell.revealed ? (
                    cell.hasBug ? (
                      <span className="text-sm">🐛</span>
                    ) : cell.neighborBugs > 0 ? (
                      <span style={{ color: numberColors[cell.neighborBugs] || "#000" }}>
                        {cell.neighborBugs}
                      </span>
                    ) : (
                      ""
                    )
                  ) : cell.flagged ? (
                    <span className="text-xs">🚩</span>
                  ) : (
                    ""
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Footer Instructions */}
      <div className="w-full pt-1 border-t border-[#808080] flex items-center justify-between text-[10px] text-neutral-700">
        <span>Click = Reveal • Right-Click = Flag</span>
        <button type="button" onClick={initGame} className="font-pixel text-[9px] underline">
          New Game
        </button>
      </div>
    </div>
  );
}

