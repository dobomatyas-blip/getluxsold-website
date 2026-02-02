import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "GetLuxSold - Premium Properties Budapest";

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
              width: 60,
              height: 60,
              background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
              borderRadius: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              fontWeight: "bold",
            }}
          >
            G
          </div>
          <span style={{ fontSize: 28, fontWeight: 600, color: "#f59e0b" }}>
            GetLuxSold
          </span>
        </div>

        {/* Main heading */}
        <div
          style={{
            fontSize: 72,
            fontWeight: "bold",
            lineHeight: 1.1,
            marginBottom: 24,
            maxWidth: "90%",
          }}
        >
          Premium Properties
        </div>

        {/* Subheading */}
        <div
          style={{
            fontSize: 36,
            color: "#94a3b8",
            marginBottom: 40,
          }}
        >
          Exclusive Real Estate in Budapest
        </div>

        {/* Features */}
        <div
          style={{
            display: "flex",
            gap: 40,
            marginTop: "auto",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 24,
              color: "#f59e0b",
            }}
          >
            <span>Luxury Apartments</span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 24,
              color: "#f59e0b",
            }}
          >
            <span>Danube Views</span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 24,
              color: "#f59e0b",
            }}
          >
            <span>Prime Locations</span>
          </div>
        </div>

        {/* URL */}
        <div
          style={{
            fontSize: 24,
            color: "#64748b",
            marginTop: 40,
          }}
        >
          getluxsold.com
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
