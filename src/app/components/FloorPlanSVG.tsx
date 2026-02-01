"use client";

import { useState } from "react";
import { Dictionary } from "../i18n/types";

interface FloorPlanSVGProps {
  dictionary: Dictionary;
}

interface Room {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  labelX: number;
  labelY: number;
  area: string;
  nameKey: keyof Dictionary["potential"]["rooms"];
}

// Exact coordinates from the provided SVG
// Room mappings (corrected):
// A1=Erkély (7.2m²), A2=Bal oldali szoba (26.2m²), A3=Középső szoba (19.8m²),
// A4=Fürdőszoba (7.6m²), A5=Kis erkély (4.25m²), A6=Előszoba (4.9m²),
// A7=Kis WC (1.2m²), A8=Átjáró (2.0m²), A9=Kamra (0.4m²),
// A10=Konyha (7.3m²), A11=Kis szoba (7.2m²)
const rooms: Room[] = [
  // A2 - Bal oldali szoba (Living Room)
  {
    id: "A2",
    x: 53,
    y: 101,
    width: 209,
    height: 208,
    labelX: 150,
    labelY: 205,
    area: "26.2",
    nameKey: "living",
  },
  // A1 - Erkély (Balcony) - L-shaped, we'll use the main rect
  {
    id: "A1",
    x: 0,
    y: 314,
    width: 194,
    height: 54,
    labelX: 97,
    labelY: 341,
    area: "7.2",
    nameKey: "balcony",
  },
  // A3 - Középső szoba (Middle Room)
  {
    id: "A3",
    x: 267,
    y: 101,
    width: 156,
    height: 267,
    labelX: 345,
    labelY: 234,
    area: "19.8",
    nameKey: "middleRoom",
  },
  // A11 - Kis szoba (Small Room)
  {
    id: "A11",
    x: 606,
    y: 154,
    width: 60,
    height: 208,
    labelX: 636,
    labelY: 258,
    area: "7.2",
    nameKey: "smallRoom",
  },
  // A5 - Kis erkély (Small Balcony)
  {
    id: "A5",
    x: 428,
    y: 314,
    width: 172,
    height: 54,
    labelX: 514,
    labelY: 341,
    area: "4.25",
    nameKey: "smallBalcony",
  },
  // A4 - Fürdőszoba (Bathroom)
  {
    id: "A4",
    x: 428,
    y: 101,
    width: 83,
    height: 208,
    labelX: 470,
    labelY: 205,
    area: "7.6",
    nameKey: "bathroom",
  },
  // A7 - Kis WC
  {
    id: "A7",
    x: 500,
    y: 0,
    width: 45,
    height: 46,
    labelX: 522,
    labelY: 23,
    area: "1.2",
    nameKey: "utilities",
  },
  // A8 - Átjáró (Passage)
  {
    id: "A8",
    x: 500,
    y: 48,
    width: 45,
    height: 46,
    labelX: 522,
    labelY: 71,
    area: "2.0",
    nameKey: "utilities",
  },
  // A9 - Kamra (Storage)
  {
    id: "A9",
    x: 548,
    y: 48,
    width: 45,
    height: 46,
    labelX: 570,
    labelY: 71,
    area: "0.4",
    nameKey: "utilities",
  },
  // A6 - Előszoba (Hallway)
  {
    id: "A6",
    x: 355,
    y: 0,
    width: 141,
    height: 94,
    labelX: 425,
    labelY: 47,
    area: "4.9",
    nameKey: "hallway",
  },
  // A10 - Konyha (Kitchen)
  {
    id: "A10",
    x: 517,
    y: 101,
    width: 83,
    height: 208,
    labelX: 558,
    labelY: 205,
    area: "7.3",
    nameKey: "kitchen",
  },
];

// A1 left piece (vertical part of the L-shape)
const a1LeftPiece = { x: 0, y: 194, width: 48, height: 136 };

export default function FloorPlanSVG({ dictionary }: FloorPlanSVGProps) {
  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null);
  const { potential } = dictionary;

  const getRoomName = (nameKey: keyof Dictionary["potential"]["rooms"]) => {
    return potential.rooms[nameKey];
  };

  // Color scheme aligned with property design
  const colors = {
    background: "#faf9f7",      // cream
    roomFill: "#f0eeea",        // cream-dark (subtle)
    roomHover: "#d4af37",       // gold
    stroke: "#e5e3df",          // border (subtle)
    strokeHover: "#d4af37",     // gold on hover
    textPrimary: "#1a365d",     // navy
    textSecondary: "#6b6b6b",   // muted
  };

  return (
    <div className="w-full">
      <svg
        viewBox="0 0 680 380"
        className="w-full h-auto"
        style={{ maxHeight: "420px" }}
      >
        {/* Background */}
        <rect x="0" y="0" width="680" height="380" fill={colors.background} />

        {/* A1 left piece (L-shape vertical part) */}
        <rect
          x={a1LeftPiece.x}
          y={a1LeftPiece.y}
          width={a1LeftPiece.width}
          height={a1LeftPiece.height}
          fill={hoveredRoom === "A1" ? colors.roomHover : colors.roomFill}
          stroke={hoveredRoom === "A1" ? colors.strokeHover : colors.stroke}
          strokeWidth="1"
          className="transition-all duration-200 cursor-pointer"
          onMouseEnter={() => setHoveredRoom("A1")}
          onMouseLeave={() => setHoveredRoom(null)}
        />

        {/* All rooms */}
        {rooms.map((room) => {
          const isHovered = hoveredRoom === room.id;
          const isSmall = room.nameKey === "utilities";

          return (
            <g
              key={room.id}
              onMouseEnter={() => setHoveredRoom(room.id)}
              onMouseLeave={() => setHoveredRoom(null)}
              className="cursor-pointer"
            >
              {/* Room shape */}
              <rect
                x={room.x}
                y={room.y}
                width={room.width}
                height={room.height}
                fill={isHovered ? colors.roomHover : colors.roomFill}
                stroke={isHovered ? colors.strokeHover : colors.stroke}
                strokeWidth="1"
                className="transition-all duration-200"
              />

              {/* Room code label */}
              <text
                x={room.labelX}
                y={room.labelY - 6}
                textAnchor="middle"
                fill={isHovered ? "#1a365d" : colors.textPrimary}
                fontSize={isSmall ? "10" : "13"}
                fontWeight="600"
                className="pointer-events-none select-none transition-all duration-200"
              >
                {room.id}
              </text>

              {/* Area */}
              <text
                x={room.labelX}
                y={room.labelY + 10}
                textAnchor="middle"
                fill={isHovered ? "#1a365d" : colors.textSecondary}
                fontSize={isSmall ? "8" : "11"}
                className="pointer-events-none select-none transition-all duration-200"
              >
                {room.area} m²
              </text>
            </g>
          );
        })}
      </svg>

      {/* Hover info panel */}
      {hoveredRoom && (
        <div className="mt-4 p-4 bg-white border border-property-border rounded-lg text-center shadow-sm">
          <span className="font-bold text-property-gold mr-2">{hoveredRoom}</span>
          <span className="font-semibold text-property-navy">
            {getRoomName(rooms.find(r => r.id === hoveredRoom)?.nameKey || "living")}
          </span>
          <span className="mx-2 text-property-text-light">•</span>
          <span className="text-property-text-muted">{rooms.find(r => r.id === hoveredRoom)?.area} m²</span>
        </div>
      )}
    </div>
  );
}
