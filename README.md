# lustre

A growing collection of visual polish and motion components for React. Small, self-contained utilities for the layer that makes interfaces feel designed — texture, atmosphere, subtle motion.

Zero runtime dependencies — only React is required.

---

## Installation

For now, copy the component file(s) you need directly into your project. A proper npm package is planned once the collection has more components.

```bash
# Future npm install (coming soon):
# bun add lustre
# npm install lustre
```

---

## Components

### Grain

A procedural SVG grain/noise texture overlay. Drop it inside any relatively-positioned element to add a film grain effect.

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

// Custom classes applied to the wrapper (works with Tailwind or plain CSS)
<div className="relative">
  <Grain className="rounded-xl z-10" />
</div>
```

#### Props

| Prop         | Type     | Default        | Description                                               |
|--------------|----------|----------------|-----------------------------------------------------------|
| `size`       | `number` | `1`            | Physical grain size — larger values produce chunkier grain |
| `contrast`   | `number` | `1.25`         | Grain sharpness — `1` = soft clouds, `5+` = sharp static  |
| `numOctaves` | `number` | `3`            | Number of noise layers — more octaves add complexity       |
| `opacity`    | `number` | `0.4`          | Overall grain intensity (`0`–`1`)                         |
| `blendMode`  | `string` | `"soft-light"` | CSS `mix-blend-mode` for compositing with content below   |
| `className`  | `string` | —              | Additional classes applied to the outer wrapper element   |

#### How it works

Generates noise using an SVG [`<feTurbulence>`](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feTurbulence) filter with `type="fractalNoise"`. The output is desaturated to grayscale, contrast-adjusted via `<feComponentTransfer>` to keep noise centered at 50% gray, then rendered as an absolutely-positioned overlay scaled to 120% to hide edge artifacts from `stitchTiles="stitch"`.

React's `useId()` ensures each instance gets a unique filter ID, so multiple `<Grain />` components on the same page don't conflict.

---

## More components coming

This collection grows as useful patterns emerge from real projects.
