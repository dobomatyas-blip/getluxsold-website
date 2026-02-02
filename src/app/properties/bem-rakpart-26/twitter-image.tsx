import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Bem rakpart 26 - Exclusive Danube-front Property in Budapest";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
          padding: 80,
          color: "white",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Logo / Brand */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 40,
          }}
        >
          <div
            style={{
              width: 50,
              height: 50,
              background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
              fontWeight: "bold",
            }}
          >
            G
          </div>
          <span style={{ fontSize: 24, fontWeight: 600, color: "#f59e0b" }}>
            GetLuxSold
          </span>
        </div>

        {/* Property name */}
        <div
          style={{
            fontSize: 64,
            fontWeight: "bold",
            lineHeight: 1.1,
            marginBottom: 16,
          }}
        >
          Bem rakpart 26
        </div>

        {/* Location */}
        <div
          style={{
            fontSize: 32,
            color: "#94a3b8",
            marginBottom: 40,
          }}
        >
          District I, Budapest
        </div>

        {/* Property specs */}
        <div
          style={{
            display: "flex",
            gap: 48,
            marginTop: "auto",
            marginBottom: 40,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <span style={{ fontSize: 40, fontWeight: "bold", color: "#f59e0b" }}>
              89 m²
            </span>
            <span style={{ fontSize: 20, color: "#64748b" }}>Floor Area</span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <span style={{ fontSize: 40, fontWeight: "bold", color: "#f59e0b" }}>
              360°
            </span>
            <span style={{ fontSize: 20, color: "#64748b" }}>Panorama View</span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <span style={{ fontSize: 40, fontWeight: "bold", color: "#f59e0b" }}>
              3
            </span>
            <span style={{ fontSize: 20, color: "#64748b" }}>Rooms</span>
          </div>
        </div>

        {/* Features */}
        <div
          style={{
            display: "flex",
            gap: 32,
            fontSize: 22,
            color: "#94a3b8",
          }}
        >
          <span>Parliament View</span>
          <span>•</span>
          <span>Danube Front</span>
          <span>•</span>
          <span>Margaret Bridge</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
