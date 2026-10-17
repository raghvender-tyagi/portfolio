"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import PixelSprite from "../PixelSprite";
import { bugSmileySprites } from "@/data/sprites";

type Position = { x: number; y: number };

const GRID_SIZE = 16;
const SPEED_MS = 130;

export default function SnakeApp() {
  const [snake, setSnake] = useState<Position[]>([
    { x: 8, y: 8 },
    { x: 7, y: 8 },
    { x: 6, y: 8 },
  ]);
  const [direction, setDirection] = useState<"UP" | "DOWN" | "LEFT" | "RIGHT">("RIGHT");
  const [food, setFood] = useState<Position>({ x: 12, y: 8 });
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const directionRef = useRef(direction);

  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  const spawnFood = useCallback((currentSnake: Position[]) => {
    let newFood: Position;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      if (!currentSnake.some((s) => s.x === newFood.x && s.y === newFood.y)) {
        break;
      }
    }
    return newFood;
  }, []);

  const resetGame = useCallback(() => {
    const initSnake = [
      { x: 8, y: 8 },
      { x: 7, y: 8 },
      { x: 6, y: 8 },
    ];
    setSnake(initSnake);
    setDirection("RIGHT");
    setFood(spawnFood(initSnake));
    setScore(0);
    setGameOver(false);
    setIsPaused(false);
  }, [spawnFood]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" && directionRef.current !== "DOWN") {
        e.preventDefault();
        setDirection("UP");
      } else if (e.key === "ArrowDown" && directionRef.current !== "UP") {
        e.preventDefault();
        setDirection("DOWN");
      } else if (e.key === "ArrowLeft" && directionRef.current !== "RIGHT") {
        e.preventDefault();
        setDirection("LEFT");
      } else if (e.key === "ArrowRight" && directionRef.current !== "LEFT") {
        e.preventDefault();
        setDirection("RIGHT");
      } else if (e.key === " ") {
        e.preventDefault();
        setIsPaused((p) => !p);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (gameOver || isPaused) return;

    const timer = setInterval(() => {
      setSnake((prev) => {
        const head = { ...prev[0] };
        const dir = directionRef.current;

        if (dir === "UP") head.y -= 1;
        if (dir === "DOWN") head.y += 1;
        if (dir === "LEFT") head.x -= 1;
        if (dir === "RIGHT") head.x += 1;

        if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
          setGameOver(true);
          return prev;
        }

        if (prev.some((s) => s.x === head.x && s.y === head.y)) {
          setGameOver(true);
          return prev;
        }

        const newSnake = [head, ...prev];

        if (head.x === food.x && head.y === food.y) {
          setScore((s) => s + 10);
          setFood(spawnFood(newSnake));
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, SPEED_MS);

    return () => clearInterval(timer);
  }, [gameOver, isPaused, food, spawnFood]);

  let smileySprite = bugSmileySprites.normal;
  if (gameOver) smileySprite = bugSmileySprites.dead;
  else if (isPaused) smileySprite = bugSmileySprites.worried;
  else if (score >= 50) smileySprite = bugSmileySprites.cool;

  return (
    <div className="p-3 bg-[#C0C0C0] text-black font-mono text-xs flex flex-col items-center justify-between h-full select-none space-y-3">
      {/* Minesweeper-style LCD Header */}
      <div className="w-full bevel-in bg-[#C0C0C0] p-1.5 flex items-center justify-between">
        {/* Score LCD */}
        <div className="bg-black text-[#FF0000] font-pixel text-sm px-2 py-0.5 tracking-widest border border-[#808080]">
          {score.toString().padStart(3, "0")}
        </div>

        {/* Smiley Face Reset Button */}
        <button
          type="button"
          onClick={resetGame}
          className="w-7 h-7 bevel-out bg-[#C0C0C0] active:bevel-in flex items-center justify-center p-0.5 cursor-pointer"
        >
          <PixelSprite sprite={smileySprite} scale={1} />
        </button>

        {/* Status indicator */}
        <div className="bg-black text-[#FF0000] font-pixel text-sm px-2 py-0.5 tracking-widest border border-[#808080]">
          {isPaused ? "PAUS" : "016"}
        </div>
      </div>

      {/* Grid Canvas */}
      <div className="bevel-in bg-[#808080] p-1 relative">
        <div
          className="grid gap-[1px] bg-black"
          style={{
            gridTemplateColumns: `repeat(${GRID_SIZE}, 14px)`,
            gridTemplateRows: `repeat(${GRID_SIZE}, 14px)`,
          }}
        >
          {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, idx) => {
            const x = idx % GRID_SIZE;
            const y = Math.floor(idx / GRID_SIZE);

            const isHead = snake[0].x === x && snake[0].y === y;
            const isBody = snake.slice(1).some((s) => s.x === x && s.y === y);
            const isFood = food.x === x && food.y === y;

            return (
              <div
                key={idx}
                className={`w-[14px] h-[14px] ${
                  isHead
                    ? "bg-[#008000]"
                    : isBody
                    ? "bg-[#008080]"
                    : isFood
                    ? "bg-[#FF0000]"
                    : "bg-[#C0C0C0]"
                }`}
              />
            );
          })}
        </div>

        {gameOver && (
          <div className="absolute inset-0 bg-black/75 flex flex-col items-center justify-center text-white space-y-2 p-2">
            <span className="font-pixel text-xs font-bold uppercase text-[#FF0000]">
              GAME OVER
            </span>
            <span className="font-mono text-xs">Score: {score}</span>
            <button
              type="button"
              onClick={resetGame}
              className="win95-btn px-3 py-1 font-pixel text-[10px]"
            >
              Play Again
            </button>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="w-full pt-1 border-t border-[#808080] flex items-center justify-between text-[10px] text-neutral-700">
        <span>Arrow Keys • Space to Pause</span>
        <button
          type="button"
          onClick={resetGame}
          className="font-pixel text-[9px] underline"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
