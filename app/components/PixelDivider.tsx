import React from "react";

interface PixelDividerProps {
  variant?: "stairsteps" | "server" | "circuits";
  className?: string;
}

export default function PixelDivider({
  variant = "stairsteps",
  className = "",
}: PixelDividerProps) {
  // Tileable patterns strictly monochrome black, grey, white
  if (variant === "stairsteps") {
    return (
      <div
        role="separator"
        aria-hidden="true"
        className={`w-full h-6 border-y-2 border-black bg-[#D9D9D9] select-none ${className}`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='20' viewBox='0 0 16 20' shape-rendering='crispEdges'%3E%3Crect x='0' y='0' width='4' height='4' fill='%23000'/%3E%3Crect x='4' y='4' width='4' height='4' fill='%23000'/%3E%3Crect x='8' y='8' width='4' height='4' fill='%23000'/%3E%3Crect x='12' y='12' width='4' height='4' fill='%23000'/%3E%3Crect x='8' y='16' width='4' height='4' fill='%23000'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat-x",
          imageRendering: "pixelated",
        }}
      />
    );
  }

  if (variant === "server") {
    return (
      <div
        role="separator"
        aria-hidden="true"
        className={`w-full h-7 border-y-2 border-black bg-[#BFBFBF] select-none ${className}`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' shape-rendering='crispEdges'%3E%3Crect x='2' y='2' width='20' height='20' fill='%23D9D9D9' stroke='%23000' stroke-width='2'/%3E%3Crect x='6' y='6' width='12' height='2' fill='%23000'/%3E%3Crect x='6' y='10' width='12' height='2' fill='%23000'/%3E%3Crect x='6' y='14' width='12' height='2' fill='%23000'/%3E%3Crect x='18' y='6' width='2' height='2' fill='%23000'/%3E%3Crect x='18' y='10' width='2' height='2' fill='%23000'/%3E%3Crect x='18' y='14' width='2' height='2' fill='%23000'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat-x",
          imageRendering: "pixelated",
        }}
      />
    );
  }

  // Circuits
  return (
    <div
      role="separator"
      aria-hidden="true"
      className={`w-full h-6 border-y-2 border-black bg-[#D9D9D9] select-none ${className}`}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='20' viewBox='0 0 32 20' shape-rendering='crispEdges'%3E%3Crect x='0' y='9' width='10' height='2' fill='%23000'/%3E%3Crect x='10' y='5' width='2' height='6' fill='%23000'/%3E%3Crect x='10' y='5' width='12' height='2' fill='%23000'/%3E%3Ccircle cx='22' cy='6' r='2' fill='%23000'/%3E%3Crect x='14' y='13' width='14' height='2' fill='%23000'/%3E%3Ccircle cx='14' cy='14' r='2' fill='%23000'/%3E%3Crect x='28' y='9' width='4' height='2' fill='%23000'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat-x",
        imageRendering: "pixelated",
      }}
    />
  );
}

