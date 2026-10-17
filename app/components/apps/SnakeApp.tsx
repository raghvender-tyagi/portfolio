"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import BevelButton from "../BevelButton";

type Position = { x: number; y: number };

const GRID_SIZE = 16;
const SPEED_MS = 140;

export default function SnakeApp() {
  const [snake, setSnake] = useState<Position[]>([
    { x: 8, y: 8 },
    { x: 7, y: 8 },
    { x: 6, y: 8 },
  ]);
  const [direction, setDirection] = useState<"UP" | "DOWN" | "LEFT" | "RIGHT">("RIGHT");
  const [food, setFood] = useState<Position>({ x: 12, y: 8 });
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);
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

  // Handle Arrow Keys
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

  // Stepped Game Loop
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

        // Collision with walls
        if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
          setGameOver(true);
          return prev;
        }

        // Collision with self
        if (prev.some((s) => s.x === head.x && s.y === head.y)) {
          setGameOver(true);
          return prev;
        }

        const newSnake = [head, ...prev];

        // Eat food
        if (head.x === food.x && head.y === food.y) {
          setScore((s) => {
            const nextScore = s + 10;
            if (nextScore > highScore) setHighScore(nextScore);
            return nextScore;
          });
          setFood(spawnFood(newSnake));
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, SPEED_MS);

    return () => clearInterval(timer);
  }, [gameOver, isPaused, food, highScore, spawnFood]);

  return (
    <div className="p-4 bg-white text-black font-mono text-xs flex flex-col items-center justify-between h-full select-none space-y-3">
      {/* Score Header */}
      <div className="w-full flex items-center justify-between border-b-2 border-black pb-2 text-xs">
        <div className="font-pixel font-bold">
          SCORE: {score.toString().padStart(4, "0")}
        </div>
        <div className="font-pixel text-black/70">
          BEST: {highScore.toString().padStart(4, "0")}
        </div>
      </div>

      {/* Grid Canvas */}
      <div className="relative border-2 border-black bg-[#D9D9D9] p-1">
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
                    ? "bg-black"
                    : isBody
                    ? "bg-[#666666]"
                    : isFood
                    ? "bg-white"
                    : "bg-[#D9D9D9]"
                }`}
              />
            );
          })}
        </div>

        {gameOver && (
          <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-white space-y-2 p-2">
            <span className="font-pixel text-sm font-bold uppercase">
              GAME OVER
            </span>
            <span className="font-mono text-xs">Final Score: {score}</span>
            <BevelButton onClick={resetGame} variant="inverted" size="sm">
              Play Again
            </BevelButton>
          </div>
        )}
      </div>

      {/* Footer controls instructions */}
      <div className="w-full pt-1 border-t-2 border-black flex items-center justify-between text-[10px] text-black/70">
        <span>ARROW KEYS TO TURN • SPACE TO PAUSE</span>
        <button
          type="button"
          onClick={resetGame}
          className="font-pixel uppercase text-[9px] underline cursor-pointer"
        >
          Reset Game
        </button>
      </div>
    </div>
  );
}
