# grain-react

A procedural SVG grain/noise texture overlay component for React. Drop it inside any relatively-positioned element to add a film grain effect.

Zero runtime dependencies — only React is required.

---

## Installation

For now, copy `src/grain.tsx` directly into your project. A proper npm package is planned.

```bash
# Future npm install (coming soon):
# bun add grain-react
# npm install grain-react
```

---

## Usage

The parent element needs `position: relative` (or `absolute`) for the overlay to fill it correctly.

```tsx
import { Grain } from "./grain";

// Default grain overlay
<div style={{ position: "relative" }}>
  <Grain />
</div>

// Coarser, sharper grain with lower opacity
<div className="relative">
  <Grain size={2} contrast={2} opacity={0.2} />
</div>

// Custom positioning via className (works with Tailwind or plain CSS)
<div className="relative">
  <Grain className="rounded-xl z-10" />
</div>
```

---

## Props

| Prop        | Type     | Default        | Description                                              |
|-------------|----------|----------------|----------------------------------------------------------|
| `size`      | `number` | `1`            | Physical grain size — larger values produce chunkier grain |
| `contrast`  | `number` | `1.25`         | Grain sharpness — `1` = soft clouds, `5+` = sharp static |
| `numOctaves`| `number` | `3`            | Number of noise layers — more octaves add complexity      |
| `opacity`   | `number` | `0.4`          | Overall grain intensity (`0`–`1`)                        |
| `blendMode` | `string` | `"soft-light"` | CSS `mix-blend-mode` for compositing with content below  |
| `className` | `string` | —              | Additional classes applied to the outer wrapper element  |

---

## How it works

The component generates noise using an SVG [`<feTurbulence>`](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feTurbulence) filter with `type="fractalNoise"`. The output is:

1. Desaturated to grayscale via `<feColorMatrix>`
2. Contrast-adjusted via `<feComponentTransfer>` linear functions, keeping the noise centered at 50% gray
3. Rendered as an absolutely-positioned overlay scaled to 120% to hide edge artifacts from `stitchTiles="stitch"`

React's `useId()` ensures each instance gets a unique filter ID, so multiple `<Grain />` components on the same page don't conflict.
