"use client";

import { useState } from "react";
import { Dictionary, Locale } from "../i18n/types";

interface RenovationFloorPlanSVGProps {
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

// Room descriptions by locale for the RENOVATION plan
const renovationRoomDescriptions: Record<Locale, Record<string, string>> = {
  hu: {
    A1: "Erkély a Dunára néz – 180°-os panoráma a Parlamentre, Margit hídra és Lánchídra",
    A2: "Nappali – összekötve az erkéllyel és az amerikai konyhás nappalival",
    A3: "Amerikai konyhás nappali – nyitott tér, összekötve az erkéllyel és a nappalival. Modern konyhasziget a Duna-panorámával",
    A4: "Fürdőszoba – ablakos, kilátás a Dunára és a Batthyány térre. Összekötve az előszobával és az amerikai konyhás nappalival",
    A5: "Kis erkély – keletre néz, kilátás a Batthyány térre és a templomra",
    A6: "Előszoba – bejárat nyugatról. Összekötve az amerikai konyhás nappalival, a fürdőszobával és az átjáróval",
    A7: "WC",
    A8: "Átjáró – összeköti az előszobát a kis WC-vel, a kamrával és a hálószobával",
    A9: "Kamra",
    A10: "Hálószoba + Dolgozó – tágas, összevont tér a korábbi konyha és kis szoba helyén. Összekötve a kis erkéllyel",
  },
  en: {
    A1: "Balcony facing the Danube – 180° panorama of Parliament, Margaret Bridge and Chain Bridge",
    A2: "Living room – connected to balcony and open-plan kitchen living",
    A3: "Open-plan Kitchen + Living – open space connected to balcony and living room. Modern kitchen island with Danube panorama",
    A4: "Bathroom – with window, view of the Danube and Batthyány Square. Connected to hallway and open-plan kitchen living",
    A5: "Small balcony – east facing, view of Batthyány Square and church",
    A6: "Hallway – entrance from west. Connected to open-plan kitchen living, bathroom and passage",
    A7: "WC",
    A8: "Passage – connects hallway to WC, storage and bedroom",
    A9: "Storage",
    A10: "Bedroom + Office – spacious combined space in place of the former kitchen and small room. Connected to small balcony",
  },
  de: {
    A1: "Balkon mit Blick auf die Donau – 180°-Panorama auf Parlament, Margaretenbrücke und Kettenbrücke",
    A2: "Wohnzimmer – verbunden mit Balkon und offener Wohnküche",
    A3: "Offene Wohnküche – offener Raum, verbunden mit Balkon und Wohnzimmer. Moderne Kücheninsel mit Donau-Panorama",
    A4: "Badezimmer – mit Fenster, Blick auf die Donau und den Batthyány-Platz. Verbunden mit Flur und offener Wohnküche",
    A5: "Kleiner Balkon – nach Osten, Blick auf Batthyány-Platz und Kirche",
    A6: "Flur – Eingang von Westen. Verbunden mit offener Wohnküche, Badezimmer und Durchgang",
    A7: "WC",
    A8: "Durchgang – verbindet Flur mit WC, Abstellraum und Schlafzimmer",
    A9: "Abstellraum",
    A10: "Schlafzimmer + Büro – großzügiger kombinierter Raum anstelle der ehemaligen Küche und des kleinen Zimmers. Verbunden mit kleinem Balkon",
  },
  zh: {
    A1: "阳台面向多瑙河 – 180°全景俯瞰国会大厦、玛格丽特桥和链桥",
    A2: "客厅 – 连接阳台和开放式厨房客厅",
    A3: "开放式厨房客厅 – 开放空间，连接阳台和客厅。带多瑙河全景的现代厨房岛台",
    A4: "浴室 – 带窗户，可见多瑙河和巴特亚尼广场。连接门厅和开放式厨房客厅",
    A5: "小阳台 – 朝东，可见巴特亚尼广场和教堂",
    A6: "门厅 – 西侧入口。连接开放式厨房客厅、浴室和过道",
    A7: "卫生间",
    A8: "过道 – 连接门厅、卫生间、储藏室和卧室",
    A9: "储藏室",
    A10: "卧室 + 书房 – 由原厨房和小房间合并而成的宽敞空间。连接小阳台",
  },
  he: {
    A1: "מרפסת פונה לדנובה – פנורמה של 180° על הפרלמנט, גשר מרגרט וגשר השרשרת",
    A2: "סלון – מחובר למרפסת ולמטבח אמריקאי + סלון",
    A3: "מטבח אמריקאי + סלון – מרחב פתוח, מחובר למרפסת ולסלון. אי מטבח מודרני עם פנורמת דנובה",
    A4: "חדר אמבטיה – עם חלון, נוף לדנובה ולכיכר בטיאני. מחובר למבואה ולמטבח אמריקאי + סלון",
    A5: "מרפסת קטנה – פונה מזרחה, נוף לכיכר בטיאני ולכנסייה",
    A6: "מבואה – כניסה ממערב. מחוברת למטבח אמריקאי + סלון, לחדר האמבטיה ולמעבר",
    A7: "שירותים",
    A8: "מעבר – מחבר את המבואה לשירותים, למחסן ולחדר השינה",
    A9: "מחסן",
    A10: "חדר שינה + משרד – מרחב משולב מרווח במקום המטבח והחדר הקטן הקודמים. מחובר למרפסת הקטנה",
  },
  vi: {
    A1: "Ban công hướng sông Danube – toàn cảnh 180° ra Quốc hội, Cầu Margaret và Cầu Xích",
    A2: "Phòng khách – kết nối ban công và bếp mở + phòng khách",
    A3: "Bếp mở + Phòng khách – không gian mở, kết nối ban công và phòng khách. Đảo bếp hiện đại với toàn cảnh sông Danube",
    A4: "Phòng tắm – có cửa sổ, nhìn ra sông Danube và Quảng trường Batthyány. Kết nối sảnh và bếp mở + phòng khách",
    A5: "Ban công nhỏ – hướng đông, nhìn ra Quảng trường Batthyány và nhà thờ",
    A6: "Sảnh – lối vào từ phía tây. Kết nối bếp mở + phòng khách, phòng tắm và hành lang",
    A7: "WC",
    A8: "Hành lang – kết nối sảnh với WC, kho và phòng ngủ",
    A9: "Kho",
    A10: "Phòng ngủ + Phòng làm việc – không gian kết hợp rộng rãi thay thế nhà bếp và phòng nhỏ cũ. Kết nối ban công nhỏ",
  },
  ru: {
    A1: "Балкон с видом на Дунай – панорама 180° на Парламент, мост Маргит и Цепной мост",
    A2: "Гостиная – соединена с балконом и кухней-гостиной",
    A3: "Кухня-гостиная – открытое пространство, соединена с балконом и гостиной. Современный кухонный остров с панорамой Дуная",
    A4: "Ванная комната – с окном, вид на Дунай и площадь Баттяни. Соединена с прихожей и кухней-гостиной",
    A5: "Малый балкон – восточная сторона, вид на площадь Баттяни и церковь",
    A6: "Прихожая – вход с запада. Соединена с кухней-гостиной, ванной и коридором",
    A7: "Туалет",
    A8: "Коридор – соединяет прихожую с туалетом, кладовой и спальней",
    A9: "Кладовая",
    A10: "Спальня + Кабинет – просторное объединённое пространство на месте бывшей кухни и малой комнаты. Соединена с малым балконом",
  },
};

// Compass labels by locale (same as current floor plan)
const compassLabels: Record<Locale, { north: string; south: string; east: string; west: string; danube: string }> = {
  hu: { north: "É", south: "D", east: "K", west: "NY", danube: "DUNA" },
  en: { north: "N", south: "S", east: "E", west: "W", danube: "DANUBE" },
  de: { north: "N", south: "S", east: "O", west: "W", danube: "DONAU" },
  zh: { north: "北", south: "南", east: "东", west: "西", danube: "多瑙河" },
  he: { north: "צ", south: "ד", east: "מז", west: "מע", danube: "דנובה" },
  vi: { north: "B", south: "N", east: "Đ", west: "T", danube: "DANUBE" },
  ru: { north: "С", south: "Ю", east: "В", west: "З", danube: "ДУНАЙ" },
};

// Renovation floor plan rooms
// Changes from current:
// - A3: Middle Room → Open-plan Kitchen + Living (same coordinates, new function)
// - A10+A11 merged: Kitchen + Small Room → Bedroom + Office (L-shaped)
// - A11 removed
const renovationRooms: Room[] = [
  // A2 - Living Room (unchanged)
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
  // A1 - Balcony (unchanged, L-shaped main rect)
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
  // A3 - NOW: Open-plan Kitchen + Living (was: Middle Room)
  {
    id: "A3",
    x: 267,
    y: 101,
    width: 156,
    height: 267,
    labelX: 345,
    labelY: 234,
    area: "19.8",
    nameKey: "openKitchenLiving",
  },
  // A5 - Small Balcony (unchanged)
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
  // A4 - Bathroom (unchanged)
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
  // A7 - WC (unchanged)
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
  // A8 - Passage (unchanged)
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
  // A9 - Storage (unchanged)
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
  // A6 - Hallway (unchanged)
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
];

// A1 left piece (vertical part of the L-shape) - unchanged
const a1LeftPiece = { x: 0, y: 194, width: 48, height: 136 };

// A10 merged L-shape path (old A10 + old A11, wall removed)
// Old A10: x=517, y=101, w=83, h=208 (517-600, 101-309)
// Old A11: x=606, y=154, w=60, h=208 (606-666, 154-362)
// Merged: single connected L-shape without the wall
const a10MergedPath = "M 517,101 L 600,101 L 600,154 L 666,154 L 666,362 L 606,362 L 606,309 L 517,309 Z";

export default function RenovationFloorPlanSVG({ dictionary, locale }: RenovationFloorPlanSVGProps) {
  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null);
  const { potential } = dictionary;
  const compass = compassLabels[locale];
  const descriptions = renovationRoomDescriptions[locale];

  const getRoomName = (nameKey: keyof Dictionary["potential"]["rooms"]) => {
    return potential.rooms[nameKey];
  };

  // Color scheme aligned with property design
  const colors = {
    background: "#0e1624",
    roomFill: "#121a2a",
    roomHover: "#c9a84c",
    stroke: "#1e2a3e",
    strokeHover: "#c9a84c",
    textPrimary: "#eae6de",
    textSecondary: "#8a9ab0",
    compass: "#5a6a80",
    danube: "#3b82f6",
    renovationAccent: "#c9a84c",
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
          <text x="340" y="-10" fill={colors.compass} fontSize="12" fontWeight="600" textAnchor="middle">
            ↑ {compass.south}
          </text>
          <text x="340" y="400" fill={colors.compass} fontSize="12" fontWeight="600" textAnchor="middle">
            ↓ {compass.north}
          </text>
          <text x="700" y="190" fill={colors.compass} fontSize="12" fontWeight="600" textAnchor="start">
            {compass.west} →
          </text>
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

        {/* A10 - Merged Bedroom + Office (L-shaped, wall removed) */}
        <g
          onMouseEnter={() => setHoveredRoom("A10")}
          onMouseLeave={() => setHoveredRoom(null)}
          className="cursor-pointer"
        >
          <path
            d={a10MergedPath}
            fill={hoveredRoom === "A10" ? colors.roomHover : colors.roomFill}
            stroke={hoveredRoom === "A10" ? colors.strokeHover : colors.stroke}
            strokeWidth="1"
            className="transition-all duration-200"
          />
          <text
            x="575"
            y="224"
            textAnchor="middle"
            fill={hoveredRoom === "A10" ? "#0c1220" : colors.textPrimary}
            fontSize="13"
            fontWeight="600"
            className="pointer-events-none select-none transition-all duration-200"
          >
            A10
          </text>
          <text
            x="575"
            y="240"
            textAnchor="middle"
            fill={hoveredRoom === "A10" ? "#0c1220" : colors.textSecondary}
            fontSize="11"
            className="pointer-events-none select-none transition-all duration-200"
          >
            14.5 m²
          </text>
        </g>

        {/* All rooms */}
        {renovationRooms.map((room) => {
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
                fill={isHovered ? "#0c1220" : colors.textPrimary}
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
                fill={isHovered ? "#0c1220" : colors.textSecondary}
                fontSize={isSmall ? "8" : "11"}
                className="pointer-events-none select-none transition-all duration-200"
              >
                {room.area} m²
              </text>
            </g>
          );
        })}

        {/* Dashed line in A3 indicating kitchen counter / island area */}
        <line
          x1="267"
          y1="280"
          x2="423"
          y2="280"
          stroke={colors.renovationAccent}
          strokeWidth="1.5"
          strokeDasharray="6 4"
          opacity="0.5"
        />
        <text
          x="345"
          y="295"
          textAnchor="middle"
          fill={colors.renovationAccent}
          fontSize="9"
          opacity="0.7"
          className="pointer-events-none select-none"
        >
          ▪ ▪ ▪
        </text>
      </svg>

      {/* Hover info panel */}
      {hoveredRoom && (() => {
        const foundRoom = renovationRooms.find(r => r.id === hoveredRoom);
        const roomName = hoveredRoom === "A10"
          ? potential.rooms.bedroomOffice
          : getRoomName(foundRoom?.nameKey || "living");
        const roomArea = hoveredRoom === "A10" ? "14.5" : foundRoom?.area;

        return (
          <div className="mt-4 p-4 bg-property-bg-secondary border border-property-border rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-bold text-property-gold">{hoveredRoom}</span>
              <span className="font-semibold text-property-text">{roomName}</span>
              <span className="text-property-text-light">•</span>
              <span className="text-property-text-muted">{roomArea} m²</span>
            </div>
            <p className="text-sm text-property-text-muted">
              {descriptions[hoveredRoom]}
            </p>
          </div>
        );
      })()}
    </div>
  );
}
