import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";

export const runtime = "nodejs";

export const alt = "Bem rakpart 26 - Exclusive Danube-front Property in Budapest";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  // Load the hero image as base64
  const imageBuffer = await readFile(join(process.cwd(), "public/images/hero.jpg"));
  const base64Image = `data:image/jpeg;base64,${imageBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          position: "relative",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Background Image */}
        <img
          src={base64Image}
          alt=""
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        {/* Dark gradient overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(to bottom, rgba(15,23,42,0.3) 0%, rgba(15,23,42,0.85) 100%)",
            display: "flex",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
            padding: "60px 70px",
            position: "relative",
            justifyContent: "space-between",
          }}
        >
          {/* Top: Brand + Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
                borderRadius: 8,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                fontWeight: "bold",
                color: "white",
              }}
            >
              G
            </div>
            <span style={{ fontSize: 22, fontWeight: 600, color: "#f59e0b" }}>
              GetLuxSold
            </span>
            <div style={{ flex: 1, display: "flex" }} />
            <span
              style={{
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: 2,
                color: "#f59e0b",
                textTransform: "uppercase",
                background: "rgba(245,158,11,0.2)",
                padding: "6px 16px",
                borderRadius: 4,
                border: "1px solid rgba(245,158,11,0.3)",
              }}
            >
              Exclusive
            </span>
          </div>

          {/* Bottom: Property info */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {/* Property name */}
            <div
              style={{
                fontSize: 56,
                fontWeight: "bold",
                lineHeight: 1.1,
                color: "white",
              }}
            >
              Bem rakpart 26
            </div>

            {/* Location */}
            <div
              style={{
                fontSize: 24,
                color: "rgba(255,255,255,0.75)",
                marginBottom: 16,
              }}
            >
              District I, Budapest &middot; Danube Panorama
            </div>

            {/* Property specs bar */}
            <div
              style={{
                display: "flex",
                gap: 40,
                padding: "20px 0",
                borderTop: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <span
                  style={{ fontSize: 36, fontWeight: "bold", color: "#f59e0b" }}
                >
                  89 m&sup2;
                </span>
                <span style={{ fontSize: 16, color: "rgba(255,255,255,0.5)" }}>
                  Floor Area
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <span
                  style={{ fontSize: 36, fontWeight: "bold", color: "#f59e0b" }}
                >
                  360&deg;
                </span>
                <span style={{ fontSize: 16, color: "rgba(255,255,255,0.5)" }}>
                  Panorama
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <span
                  style={{ fontSize: 36, fontWeight: "bold", color: "#f59e0b" }}
                >
                  3
                </span>
                <span style={{ fontSize: 16, color: "rgba(255,255,255,0.5)" }}>
                  Rooms
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <span
                  style={{ fontSize: 36, fontWeight: "bold", color: "white" }}
                >
                  &euro;500K
                </span>
                <span style={{ fontSize: 16, color: "rgba(255,255,255,0.5)" }}>
                  From
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
