import React from "react";
import Image from "next/image";

interface DitherImageProps {
  src: string;
  alt: string;
  aspect?: string; // e.g. "aspect-video"
  className?: string;
  priority?: boolean;
}

export default function DitherImage({
  src,
  alt,
  aspect = "aspect-video",
  className = "",
  priority = false,
}: DitherImageProps) {
  return (
    <div
      className={`relative w-full overflow-hidden border-2 border-black bg-white ${aspect} ${className} group`}
    >
      {/* 2px Checkerboard underlay in case image loads or has transparent parts */}
      <div className="absolute inset-0 bg-mac-checker opacity-40 pointer-events-none" />

      {/* Image with halftone / high-contrast dither filter on hover */}
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, 480px"
        className="object-cover mac-dither-img group-hover:filter-none transition-all duration-150"
      />

      {/* Retro corner pixel badge */}
      <div className="absolute bottom-1 right-1 bg-black text-white px-1 py-0.5 font-pixel text-[8px] uppercase select-none pointer-events-none opacity-80">
        1-BIT
      </div>
    </div>
  );
}

