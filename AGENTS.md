This file provides guidance to AI agents when working with code in this repository.

## What this is

Forge is a personal toolkit of React components distributed as raw source — consumers run `bunx github:nweii/forge add <component>` to copy a component file directly into their project. There is no build step; components are authored in `src/` and served from GitHub as-is.

## Commands

```bash
bun install          # install deps and register the pre-commit hook (run once after cloning)
bun run sync         # manually regenerate registry.json and src/index.ts (normally pre-commit does this)
```

The pre-commit hook runs `bun run sync` and stages `registry.json` and `src/index.ts` automatically — do not commit those files manually.

## Architecture

| Path              | Purpose                                                                      |
| ----------------- | ---------------------------------------------------------------------------- |
| `src/*.tsx`       | Component source files — these are what consumers copy into their projects   |
| `src/index.ts`    | Barrel export — **auto-generated**, do not edit by hand                      |
| `registry.json`   | Component metadata used by the CLI — **auto-generated**, do not edit by hand |
| `bin/forge.js`    | CLI entry point: `forge list` / `forge add <component>`                      |
| `scripts/sync.js` | Regenerates registry and index from `src/` on pre-commit                     |

## Adding a component

1. Create `src/new-component.tsx`
2. The first `// ABOUTME: <description>` line is used as the component's description in `registry.json` — make it a concise one-liner
3. `git commit` — the pre-commit hook runs sync automatically

`scripts/sync.js` auto-detects non-peer, non-internal imports as `dependencies` for that component. React and react-dom are treated as peer deps and excluded.

## File conventions

- All files start with an `// ABOUTME: ` comment line
- Components export named exports (not default exports)
- No external runtime dependencies beyond React — keep components self-contained
- `react` peer dep requires `>=18` (components may use `useId` and other React 18 hooks)
