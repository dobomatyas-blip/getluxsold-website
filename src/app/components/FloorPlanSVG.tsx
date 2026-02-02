"use client";

import { useState } from "react";
import { Dictionary, Locale } from "../i18n/types";

interface FloorPlanSVGProps {
  dictionary: Dictionary;
  locale: Locale;
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

// Room descriptions by locale
const roomDescriptions: Record<Locale, Record<string, string>> = {
  hu: {
    A1: "Erkély a Dunára néz – 180°-os panoráma a Parlamentre, Margit hídra és Lánchídra",
    A2: "Nappali – összekötve az erkéllyel és a középső szobával",
    A3: "Középső szoba – összekötve az erkéllyel és a nappalival",
    A4: "Fürdőszoba – ablakos, kilátás a Dunára és a Batthyány térre. Összekötve az előszobával és a középső szobával",
    A5: "Kis erkély – keletre néz, kilátás a Batthyány térre és a templomra",
    A6: "Előszoba – bejárat nyugatról. Összekötve a középső szobával, a fürdőszobával és az átjáróval",
    A7: "WC",
    A8: "Átjáró – összeköti az előszobát a kis WC-vel, a kamrával és a konyhával",
    A9: "Kamra",
    A10: "Konyha – összekötve a kis erkéllyel és a kis szobával",
    A11: "Kis szoba – összekötve a konyhával",
  },
  en: {
    A1: "Balcony facing the Danube – 180° panorama of Parliament, Margaret Bridge and Chain Bridge",
    A2: "Living room – connected to balcony and middle room",
    A3: "Middle room – connected to balcony and living room",
    A4: "Bathroom – with window, view of the Danube and Batthyány Square. Connected to hallway and middle room",
    A5: "Small balcony – east facing, view of Batthyány Square and church",
    A6: "Hallway – entrance from west. Connected to middle room, bathroom and passage",
    A7: "WC",
    A8: "Passage – connects hallway to WC, storage and kitchen",
    A9: "Storage",
    A10: "Kitchen – connected to small balcony and small room",
    A11: "Small room – connected to kitchen",
  },
  de: {
    A1: "Balkon mit Blick auf die Donau – 180°-Panorama auf Parlament, Margaretenbrücke und Kettenbrücke",
    A2: "Wohnzimmer – verbunden mit Balkon und mittlerem Zimmer",
    A3: "Mittleres Zimmer – verbunden mit Balkon und Wohnzimmer",
    A4: "Badezimmer – mit Fenster, Blick auf die Donau und den Batthyány-Platz. Verbunden mit Flur und mittlerem Zimmer",
    A5: "Kleiner Balkon – nach Osten, Blick auf Batthyány-Platz und Kirche",
    A6: "Flur – Eingang von Westen. Verbunden mit mittlerem Zimmer, Badezimmer und Durchgang",
    A7: "WC",
    A8: "Durchgang – verbindet Flur mit WC, Abstellraum und Küche",
    A9: "Abstellraum",
    A10: "Küche – verbunden mit kleinem Balkon und kleinem Zimmer",
    A11: "Kleines Zimmer – verbunden mit Küche",
  },
};

// Compass labels by locale
const compassLabels: Record<Locale, { north: string; south: string; east: string; west: string; danube: string }> = {
  hu: { north: "É", south: "D", east: "K", west: "NY", danube: "DUNA" },
  en: { north: "N", south: "S", east: "E", west: "W", danube: "DANUBE" },
  de: { north: "N", south: "S", east: "O", west: "W", danube: "DONAU" },
};

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

export default function FloorPlanSVG({ dictionary, locale }: FloorPlanSVGProps) {
  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null);
  const { potential } = dictionary;
  const compass = compassLabels[locale];
  const descriptions = roomDescriptions[locale];

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
    compass: "#94a3b8",         // slate-400
    danube: "#3b82f6",          // blue-500
  };

  return (
    <div className="w-full">
      <svg
        viewBox="-60 -30 800 440"
        className="w-full h-auto"
        style={{ maxHeight: "480px" }}
      >
        {/* Background */}
        <rect x="-60" y="-30" width="800" height="440" fill={colors.background} />

        {/* Danube indicator on the left */}
        <g>
          <rect x="-55" y="150" width="8" height="180" fill={colors.danube} opacity="0.3" rx="4" />
          <text
            x="-51"
            y="240"
            fill={colors.danube}
            fontSize="11"
            fontWeight="600"
            writingMode="vertical-rl"
            textAnchor="middle"
            style={{ letterSpacing: "2px" }}
          >
            {compass.danube}
          </text>
        </g>

        {/* Compass indicators */}
        <g>
          {/* South (up) */}
          <text x="340" y="-10" fill={colors.compass} fontSize="12" fontWeight="600" textAnchor="middle">
            ↑ {compass.south}
          </text>
          {/* North (down) */}
          <text x="340" y="400" fill={colors.compass} fontSize="12" fontWeight="600" textAnchor="middle">
            ↓ {compass.north}
          </text>
          {/* West (right) */}
          <text x="700" y="190" fill={colors.compass} fontSize="12" fontWeight="600" textAnchor="start">
            {compass.west} →
          </text>
          {/* East (left) - near Danube */}
          <text x="-25" y="100" fill={colors.compass} fontSize="12" fontWeight="600" textAnchor="end">
            ← {compass.east}
          </text>
        </g>

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
        <div className="mt-4 p-4 bg-white border border-property-border rounded-lg shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-bold text-property-gold">{hoveredRoom}</span>
            <span className="font-semibold text-property-navy">
              {getRoomName(rooms.find(r => r.id === hoveredRoom)?.nameKey || "living")}
            </span>
            <span className="text-property-text-light">•</span>
            <span className="text-property-text-muted">{rooms.find(r => r.id === hoveredRoom)?.area} m²</span>
          </div>
          <p className="text-sm text-property-text-muted">
            {descriptions[hoveredRoom]}
          </p>
        </div>
      )}
    </div>
  );
}
