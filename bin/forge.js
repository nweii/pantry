#!/usr/bin/env bun
// ABOUTME: CLI for fetching forge components into a project as raw source.
// ABOUTME: Components are copied into the project so you own and can modify them.

const REPO = "nweii/forge";
const BRANCH = "main";
const REGISTRY_URL = `https://raw.githubusercontent.com/${REPO}/${BRANCH}/registry.json`;
const RAW_BASE = `https://raw.githubusercontent.com/${REPO}/${BRANCH}`;

const [,, command, component] = process.argv;
const registry = await fetch(REGISTRY_URL).then(r => r.json());

if (command === "list") {
  for (const [name, meta] of Object.entries(registry.components)) {
    console.log(`  ${name.padEnd(20)} ${meta.description}`);
  }
} else if (command === "add" && component) {
  const meta = registry.components[component];
  if (!meta) {
    console.error(`Unknown component: ${component}`);
    console.error(`Run 'forge list' to see available components.`);
    process.exit(1);
  }
  for (const file of meta.files) {
    const filename = file.split("/").at(-1);
    const source = await fetch(`${RAW_BASE}/${file}`).then(r => r.text());
    await Bun.write(filename, source);
    console.log(`✓ ${filename}`);
  }
  if (meta.dependencies.length > 0) {
    console.log(`\nInstall dependencies:\n  bun add ${meta.dependencies.join(" ")}`);
  }
} else {
  console.log("Usage:\n  forge list\n  forge add <component>");
}
