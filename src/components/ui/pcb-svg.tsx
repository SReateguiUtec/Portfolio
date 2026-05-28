import React from "react";
import type { SVGProps } from "react";

// Seeded PRNG for stable rendering
function createSeededRandom(seed: number) {
  let h = seed || 9;
  return function () {
    h = Math.sin(h) * 10000;
    return h - Math.floor(h);
  };
}

interface Trace {
  d: string;
  color: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  delay: string;
  duration: string;
  dashOffsetStart: number;
}

interface SMDComponent {
  x: number;
  y: number;
  isHorizontal: boolean;
  bodyColor: string;
  terminalColor: string;
  label: string;
}

interface ICChip {
  x: number;
  y: number;
  w: number;
  h: number;
  isHorizontal: boolean;
  numPins: number;
  label: string;
}

interface Silkscreen {
  x: number;
  y: number;
  w?: number;
  h?: number;
  text?: string;
  type: "outline" | "dot" | "text";
  fontSize?: number;
  fontWeight?: string;
  anchor?: "start" | "middle" | "end" | "inherit";
  opacity?: number;
}

const SvgPcb = (props: SVGProps<SVGSVGElement>) => {
  const spacing = 22; // dense spacing
  const cols = Math.floor(690 / spacing);
  const rows = Math.floor(690 / spacing);
  const random = createSeededRandom(54321); // Seed

  const colors = [
    "#00E5FF", // Neon Cyan
    "#56CFE1", // Medium Cyan
    "#00BFFF", // Deep Sky Blue
    "#1E90FF", // Dodger Blue
    "#00CFFF", // Vivid Sky Blue
    "#38BDF8", // Light Blue
    "#7DD3FC", // Soft Blue
  ];

  const traces: Trace[] = [];
  const dots: { cx: number; cy: number }[] = [];
  const smds: SMDComponent[] = [];
  const ics: ICChip[] = [];
  const silkscreens: Silkscreen[] = [];

  // Generate a few IC package footprints
  for (let i = 0; i < 7; i++) {
    const w = Math.floor(random() * 25) + 30;
    const h = Math.floor(random() * 25) + 30;
    const x = Math.floor(random() * (580 - w - 100)) + 100;
    const y = Math.floor(random() * (580 - h - 100)) + 100;
    const isHorizontal = random() > 0.5;
    const numPins = Math.floor(random() * 3) + 3; // 3 to 5 pins per side
    const label = `U${i + 1}`;

    ics.push({ x, y, w, h, isHorizontal, numPins, label });

    // Silkscreen outline around the IC
    silkscreens.push({
      x: x - 4,
      y: y - 4,
      w: w + 8,
      h: h + 8,
      type: "outline"
    });

    // Chip pin-1 dot indicator
    silkscreens.push({
      x: x + 4,
      y: y + 4,
      type: "dot"
    });

    // Chip reference designator text
    silkscreens.push({
      x: x + w / 2,
      y: y + h / 2 + 2,
      text: label,
      type: "text",
      fontSize: 8,
      fontWeight: "bold",
      anchor: "middle",
      opacity: 0.5
    });
  }

  // Generate trace lines, parallel busses, and SMD components inside the chip body
  for (let r = 6; r < rows - 6; r++) {
    for (let c = 6; c < cols - 6; c++) {
      const x = c * spacing;
      const y = r * spacing;

      dots.push({ cx: x, cy: y });

      // Check if grid point overlaps with any IC chip, to avoid overlaps
      const overlapIC = ics.some(ic =>
        x >= ic.x - 10 && x <= ic.x + ic.w + 10 &&
        y >= ic.y - 10 && y <= ic.y + ic.h + 10
      );

      if (!overlapIC && random() < 0.28) {
        const color = colors[Math.floor(random() * colors.length)];
        const isBus = random() < 0.25; // 25% chance of parallel data bus lines
        const numLines = isBus ? 3 : 1;
        const length = Math.floor(random() * 2) + 1; // 1 to 2 grid units long

        const horizontalFirst = random() > 0.5;
        const delay = (random() * 5).toFixed(2);
        const duration = (2.0 + random() * 2.5).toFixed(2);

        for (let i = 0; i < numLines; i++) {
          const offset = isBus ? (i * 6 - 6) : 0;

          let startX = x;
          let startY = y;
          let currX = x;
          let currY = y;

          let pathD: string;

          if (horizontalFirst) {
            startX += offset;
            currX = startX;
            const dx = (random() > 0.5 ? 1 : -1) * length * spacing;
            currX += dx;
            pathD = `M ${startX} ${startY} L ${currX} ${currY}`;

            if (random() > 0.4) {
              const dy = (random() > 0.5 ? 1 : -1) * (Math.floor(random() * 2) + 1) * spacing;
              currY += dy;
              pathD += ` L ${currX} ${currY}`;
            }
          } else {
            startY += offset;
            currY = startY;
            const dy = (random() > 0.5 ? 1 : -1) * length * spacing;
            currY += dy;
            pathD = `M ${startX} ${startY} L ${currX} ${currY}`;

            if (random() > 0.4) {
              const dx = (random() > 0.5 ? 1 : -1) * (Math.floor(random() * 2) + 1) * spacing;
              currX += dx;
              pathD += ` L ${currX} ${currY}`;
            }
          }

          const dashOffsetStart = Math.floor(random() * 400);

          traces.push({
            d: pathD,
            color,
            startX,
            startY,
            endX: currX,
            endY: currY,
            delay,
            duration,
            dashOffsetStart,
          });

          // Randomly place SMD components (resistors, capacitors) along non-bus traces
          if (!isBus && random() < 0.2) {
            const compType = random() > 0.5 ? "R" : "C";
            const compNum = Math.floor(random() * 99) + 1;
            const midX = (startX + currX) / 2;
            const midY = (startY + currY) / 2;
            const isHorizontalComp = startY === currY;

            smds.push({
              x: midX,
              y: midY,
              isHorizontal: isHorizontalComp,
              // Dark navy body for all SMDs to match blue palette
              bodyColor: compType === "R" ? "#0a1628" : "#051a2e",
              terminalColor: "#56cfe1",
              label: `${compType}${compNum}`
            });

            // Add silkscreen text next to the component
            silkscreens.push({
              x: midX + (isHorizontalComp ? 0 : 8),
              y: midY + (isHorizontalComp ? -6 : 2),
              text: `${compType}${compNum}`,
              type: "text",
              fontSize: 5.5,
              anchor: isHorizontalComp ? "middle" : "start",
              opacity: 0.4
            });
          }
        }
      }
    }
  }



  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 690 690"
      width="1em"
      height="1em"
      {...props}
    >
      <style>{`
        @keyframes pcbPulse {
          0%   { stroke-dashoffset: 400; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes pcbGlow {
          0%, 100% { opacity: 0.35; }
          50%       { opacity: 0.9; }
        }
        @keyframes vertexPing {
          0%   { r: 4; opacity: 0.9; }
          100% { r: 14; opacity: 0; }
        }
        .pcb-pulse-path {
          stroke-dasharray: 30 180 !important;
          animation: pcbPulse 4s linear infinite;
        }
        .pcb-static-trace {
          animation: pcbGlow 3s ease-in-out infinite;
        }
        .vertex-ping {
          animation: vertexPing 2.5s ease-out infinite;
        }
      `}</style>

      <defs>
        <clipPath id="pcb_svg__a">
          <rect x="120" y="120" width="450" height="450" rx="24" />
        </clipPath>

        {/* Bloom glow filter for traces */}
        <filter id="pcb-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        {/* Strong bloom for pulse highlights */}
        <filter id="pcb-bloom" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        {/* Radial depth gradient inside pentagon */}
        <radialGradient id="pcb-depth" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#001830" stopOpacity="0" />
          <stop offset="70%" stopColor="#000d1a" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#000508" stopOpacity="0.75" />
        </radialGradient>

        {/* Border glow gradient */}
        <filter id="border-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Metallic Pins / Leads around the chip */}
      {(() => {
        const pinOffsets = [170, 220, 270, 320, 370, 420, 470, 520];
        return (
          <g>
            {pinOffsets.map((pos) => (
              <React.Fragment key={`pins-${pos}`}>
                {/* Left Pins */}
                <rect x={75} y={pos - 6} width={45} height={12} rx={3} fill="#56cfe1" opacity={0.8} />
                <rect x={75} y={pos - 3} width={45} height={6} fill="#ffffff" opacity={0.4} />

                {/* Right Pins */}
                <rect x={570} y={pos - 6} width={45} height={12} rx={3} fill="#56cfe1" opacity={0.8} />
                <rect x={570} y={pos - 3} width={45} height={6} fill="#ffffff" opacity={0.4} />

                {/* Top Pins */}
                <rect x={pos - 6} y={75} width={12} height={45} rx={3} fill="#56cfe1" opacity={0.8} />
                <rect x={pos - 3} y={75} width={6} height={45} fill="#ffffff" opacity={0.4} />

                {/* Bottom Pins */}
                <rect x={pos - 6} y={570} width={12} height={45} rx={3} fill="#56cfe1" opacity={0.8} />
                <rect x={pos - 3} y={570} width={6} height={45} fill="#ffffff" opacity={0.4} />
              </React.Fragment>
            ))}
          </g>
        );
      })()}

      {/* Chip Body */}
      <rect
        x="120"
        y="120"
        width="450"
        height="450"
        rx="24"
        fill="rgba(2, 12, 24, 0.94)"
        stroke="#1a3c61"
        strokeWidth="2.5"
      />

      <g clipPath="url(#pcb_svg__a)">
        {/* Background grid dots */}
        {dots.map((dot, idx) => (
          <circle
            key={`dot-${idx}`}
            cx={dot.cx}
            cy={dot.cy}
            r={0.7}
            fill="#00bfff"
            opacity={0.08}
          />
        ))}

        {/* Traces: static dim base + bloom glow layer + animated pulse */}
        {traces.map((trace, idx) => (
          <g key={`trace-${idx}`}>
            {/* Via pad: outer ring glow */}
            <circle cx={trace.startX} cy={trace.startY} r={4.5} fill={trace.color} opacity={0.07} filter="url(#pcb-glow)" />
            <circle cx={trace.startX} cy={trace.startY} r={2.2} fill={trace.color} opacity={0.4} />
            <circle cx={trace.startX} cy={trace.startY} r={0.8} fill="#020c18" />

            <circle cx={trace.endX} cy={trace.endY} r={4.5} fill={trace.color} opacity={0.07} filter="url(#pcb-glow)" />
            <circle cx={trace.endX} cy={trace.endY} r={2.2} fill={trace.color} opacity={0.85} />
            <circle cx={trace.endX} cy={trace.endY} r={0.8} fill="#020c18" />

            {/* Static trace — dim ambient copper */}
            <path
              d={trace.d}
              fill="none"
              stroke={trace.color}
              strokeWidth={1}
              opacity={0.2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="pcb-static-trace"
              style={{ animationDelay: `-${trace.delay}s` }}
            />

            {/* Bloom glow trace layer */}
            <path
              d={trace.d}
              fill="none"
              stroke={trace.color}
              strokeWidth={2.5}
              opacity={0.12}
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#pcb-glow)"
            />

            {/* Bright animated data pulse */}
            <path
              d={trace.d}
              fill="none"
              stroke={trace.color}
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="pcb-pulse-path"
              filter="url(#pcb-bloom)"
              style={{
                animationDelay: `-${trace.delay}s`,
                animationDuration: `${trace.duration}s`,
                strokeDashoffset: trace.dashOffsetStart,
              }}
            />
          </g>
        ))}

        {/* Silkscreen labels */}
        {silkscreens.map((silk, idx) => {
          if (silk.type === "outline") {
            return (
              <rect
                key={`silk-${idx}`}
                x={silk.x} y={silk.y}
                width={silk.w} height={silk.h}
                fill="none"
                stroke="#56cfe1"
                strokeWidth={0.5}
                opacity={0.18}
              />
            );
          } else if (silk.type === "dot") {
            return (
              <circle
                key={`silk-${idx}`}
                cx={silk.x} cy={silk.y}
                r={1.2}
                fill="#56cfe1"
                opacity={0.4}
              />
            );
          } else if (silk.type === "text") {
            return (
              <text
                key={`silk-${idx}`}
                x={silk.x} y={silk.y}
                fill="#56cfe1"
                fontFamily="monospace"
                fontSize={silk.fontSize || 6}
                textAnchor={silk.anchor || "start"}
                fontWeight={silk.fontWeight || "normal"}
                opacity={silk.opacity || 0.35}
                style={{ userSelect: "none" }}
              >
                {silk.text}
              </text>
            );
          }
          return null;
        })}

        {/* IC Package Chips */}
        {ics.map((ic, idx) => {
          const pins: React.ReactElement[] = [];
          const pinSpacing = ic.isHorizontal ? ic.w / (ic.numPins + 1) : ic.h / (ic.numPins + 1);
          for (let p = 1; p <= ic.numPins; p++) {
            const offset = p * pinSpacing;
            if (ic.isHorizontal) {
              pins.push(<rect key={`pin-t-${p}`} x={ic.x + offset - 1.2} y={ic.y - 2.5} width={2.4} height={3} fill="#56cfe1" rx={0.4} opacity={0.7} />);
              pins.push(<rect key={`pin-b-${p}`} x={ic.x + offset - 1.2} y={ic.y + ic.h - 0.5} width={2.4} height={3} fill="#56cfe1" rx={0.4} opacity={0.7} />);
            } else {
              pins.push(<rect key={`pin-l-${p}`} x={ic.x - 2.5} y={ic.y + offset - 1.2} width={3} height={2.4} fill="#56cfe1" rx={0.4} opacity={0.7} />);
              pins.push(<rect key={`pin-r-${p}`} x={ic.x + ic.w - 0.5} y={ic.y + offset - 1.2} width={3} height={2.4} fill="#56cfe1" rx={0.4} opacity={0.7} />);
            }
          }
          return (
            <g key={`ic-${idx}`}>
              {pins}
              <rect
                x={ic.x} y={ic.y}
                width={ic.w} height={ic.h}
                fill="#070f1a"
                stroke="#1a3a5c"
                strokeWidth={0.8}
                rx={1.5}
              />
              {/* Cyan chip body highlight line */}
              <rect
                x={ic.x + 2} y={ic.y + 2}
                width={ic.w - 4} height={2}
                fill="#56cfe1"
                opacity={0.15}
                rx={0.5}
              />
              <circle
                cx={ic.x + (ic.isHorizontal ? 4 : ic.w / 2)}
                cy={ic.y + (ic.isHorizontal ? ic.h / 2 : 4)}
                r={1.2}
                fill="#00e5ff"
                opacity={0.6}
              />
            </g>
          );
        })}

        {/* SMD Components — all blue palette */}
        {smds.map((smd, idx) => {
          const w = smd.isHorizontal ? 8 : 4;
          const h = smd.isHorizontal ? 4 : 8;
          return (
            <g key={`smd-${idx}`}>
              {smd.isHorizontal ? (
                <>
                  <rect x={smd.x - w / 2 - 1} y={smd.y - h / 2} width={1.5} height={h} fill={smd.terminalColor} rx={0.2} />
                  <rect x={smd.x + w / 2 - 0.5} y={smd.y - h / 2} width={1.5} height={h} fill={smd.terminalColor} rx={0.2} />
                </>
              ) : (
                <>
                  <rect x={smd.x - w / 2} y={smd.y - h / 2 - 1} width={w} height={1.5} fill={smd.terminalColor} rx={0.2} />
                  <rect x={smd.x - w / 2} y={smd.y + h / 2 - 0.5} width={w} height={1.5} fill={smd.terminalColor} rx={0.2} />
                </>
              )}
              <rect
                x={smd.x - w / 2} y={smd.y - h / 2}
                width={w} height={h}
                fill={smd.bodyColor}
                stroke="#0a2a45"
                strokeWidth={0.4}
                rx={0.3}
              />
            </g>
          );
        })}

        {/* Silkscreen text on the chip body */}
        <text x="345" y="310" fill="#56cfe1" fontFamily="monospace" fontSize="24" fontWeight="bold" textAnchor="middle" opacity="0.6" style={{ userSelect: "none" }}>
          S.REATEGUI
        </text>
        <text x="345" y="350" fill="#56cfe1" fontFamily="monospace" fontSize="14" textAnchor="middle" opacity="0.4" style={{ userSelect: "none" }}>
          UTEC - CS 2026
        </text>
        <text x="345" y="380" fill="#56cfe1" fontFamily="monospace" fontSize="10" textAnchor="middle" opacity="0.3" style={{ userSelect: "none" }}>
          SECURE_ELEMENT_v2.5
        </text>

        {/* Pin 1 indicator dot on the chip body */}
        <circle cx="160" cy="160" r="10" fill="#00e5ff" opacity="0.15" />
        <circle cx="160" cy="160" r="4" fill="#00e5ff" opacity="0.7" />

        {/* Radial depth vignette overlay */}
        <rect
          x="120"
          y="120"
          width="450"
          height="450"
          rx="24"
          fill="url(#pcb-depth)"
        />
      </g>
    </svg>
  );
};

export default SvgPcb;
