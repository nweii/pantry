// ABOUTME: A procedural SVG grain/noise texture overlay component for React.
// ABOUTME: Renders as an absolutely-positioned overlay using SVG feTurbulence filters — no external dependencies beyond React.

import { useId } from "react";

interface GrainProps {
  /** Controls physical grain size — larger values produce chunkier grain */
  size?: number;
  /** Controls how harsh/sharp the grain pixels are (1 = soft clouds, 5+ = sharp static) */
  contrast?: number;
  /** Number of noise layers — more octaves add complexity */
  numOctaves?: number;
  /** Overall grain intensity (0–1) */
  opacity?: number;
  /** CSS mix-blend-mode for compositing with content below */
  blendMode?: React.CSSProperties["mixBlendMode"];
  className?: string;
}

export function Grain({
  size = 1,
  contrast = 1.25,
  numOctaves = 3,
  opacity = 0.4,
  blendMode = "soft-light",
  className,
}: GrainProps) {
  const id = useId();
  const filterId = `grain-${id.replace(/:/g, "")}`;

  // Base frequency defines the "size" of the noise clouds.
  const baseFrequency = 0.8 / size;

  // Calculate contrast mapping for the SVG filter
  // This maps a single contrast value to the correct slope/intercept to keep the noise centered at 50% gray.
  const slope = contrast;
  const intercept = -(contrast - 1) / 2;

  return (
    <div
      aria-hidden="true"
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <filter id={filterId}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency={baseFrequency}
              numOctaves={numOctaves}
              stitchTiles="stitch"
            />
            {/* Convert to grayscale */}
            <feColorMatrix type="saturate" values="0" />

            {/* Contrast threshold to enforce sharper grain boundaries
                and prevent blurriness as the noise clouds scale up in size */}
            <feComponentTransfer>
              <feFuncR type="linear" slope={slope} intercept={intercept} />
              <feFuncG type="linear" slope={slope} intercept={intercept} />
              <feFuncB type="linear" slope={slope} intercept={intercept} />
            </feComponentTransfer>
          </filter>
        </defs>
      </svg>
      {/* scale(1.2) prevents visible grain edges at element boundaries from the stitch */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: "scale(1.2)",
          filter: `url(#${filterId})`,
          opacity,
          mixBlendMode: blendMode,
        }}
      />
    </div>
  );
}
