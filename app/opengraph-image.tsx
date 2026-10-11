import { ImageResponse } from "next/og";

export const alt = "Bilal Khalil Khankhail - Full-Stack Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#0f0f10",
          color: "#f5f5f5",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#a3a3a3" }}>
          khankhail.com
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 700 }}>
            Bilal Khalil Khankhail
          </div>
          <div style={{ display: "flex", fontSize: 40, color: "#d4d4d4" }}>
            Full-Stack Software Engineer
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#a3a3a3" }}>
          React · Next.js · Node.js · TypeScript · DevOps
        </div>
      </div>
    ),
    size,
  );
}
