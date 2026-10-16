import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#161616",
          border: "2px solid #3B4BFF",
          fontFamily: "monospace",
          fontWeight: 900,
          fontSize: 16,
          color: "#E4E4E4",
          letterSpacing: "-1px",
        }}
      >
        RT
      </div>
    ),
    {
      ...size,
    }
  );
}

