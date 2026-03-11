# pantry

A personal toolkit of React components and effects. Components are copied into your project as raw source so you own them and can tweak them freely.

---

## Usage

```bash
# List available components:
bunx github:nweii/pantry list

# Add a component to your project:
bunx github:nweii/pantry add grain
```

The component file is written to your current directory. Install any listed dependencies, then import as needed.

> Once published to npm, `bunx pantry add <component>` will work without the `github:` prefix.

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

| Prop         | Type     | Default        | Description                                                |
| ------------ | -------- | -------------- | ---------------------------------------------------------- |
| `size`       | `number` | `1`            | Physical grain size — larger values produce chunkier grain |
| `contrast`   | `number` | `1.25`         | Grain sharpness — `1` = soft clouds, `5+` = sharp static   |
| `numOctaves` | `number` | `3`            | Number of noise layers — more octaves add complexity       |
| `opacity`    | `number` | `0.4`          | Overall grain intensity (`0`–`1`)                          |
| `blendMode`  | `string` | `"soft-light"` | CSS `mix-blend-mode` for compositing with content below    |
| `className`  | `string` | —              | Additional classes applied to the outer wrapper element    |

#### How it works

Generates noise using an SVG [`<feTurbulence>`](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feTurbulence) filter with `type="fractalNoise"`. The output is desaturated to grayscale, contrast-adjusted via `<feComponentTransfer>` to keep noise centered at 50% gray, then rendered as an absolutely-positioned overlay scaled to 120% to hide edge artifacts from `stitchTiles="stitch"`.

React's `useId()` ensures each instance gets a unique filter ID, so multiple `<Grain />` components on the same page don't conflict.

---

## Adding a component

1. Create `src/new-component.tsx` with an ABOUTME header and standard imports
2. `git commit` — the pre-commit hook runs `scripts/sync.js` automatically, which regenerates `registry.json` and `src/index.ts` and stages them into the commit
3. Push — the component is immediately available via the CLI

Run `bun install` once after cloning to install the pre-commit hook.
