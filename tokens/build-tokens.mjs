#!/usr/bin/env node
// Generate brand/tokens/tokens.css from tokens.json (the source of truth).
//   node build-tokens.mjs          # write tokens.css
//   node build-tokens.mjs --check  # exit 1 if tokens.css is stale (for CI drift checks)
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const tokens = JSON.parse(readFileSync(join(here, "tokens.json"), "utf8"));
const cssPath = join(here, "tokens.css");

// Deterministic colour math for derived tints (pure → reproducible output).
const hexToRgb = (h) => { h = h.replace("#", ""); if (h.length === 3) h = [...h].map((c) => c + c).join(""); return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)); };
const rgbToHex = (r) => "#" + r.map((n) => Math.round(n).toString(16).padStart(2, "0")).join("").toUpperCase();
const mix = (a, b, t) => { const A = hexToRgb(a), B = hexToRgb(b); return rgbToHex(A.map((x, i) => x * (1 - t) + B[i] * t)); };

const fam = (v) => v.map((f) => (/\s/.test(f) ? `"${f}"` : f)).join(", ");
// Resolve {group.key} references RECURSIVELY so the token layers compose: a semantic
// token may reference a primitive (text-h1 → {primitive.font-size-46}), and a recipe may
// reference that semantic token (text.h1.fontSize → {size.text-h1}). Values live only on
// the base/primitive layer; every other layer references down to it.
const resolveRef = (s) => {
  let v = String(s);
  for (let depth = 0; /\{[^}]+\}/.test(v) && depth < 10; depth++) {
    v = v.replace(/\{([^}]+)\}/g, (_, p) => {
      let n = tokens;
      for (const k of p.split(".")) n = n[k];
      return Array.isArray(n.$value) ? fam(n.$value) : n.$value;
    });
  }
  return v;
};

function genCss(t) {
  // Collect every token as { name (clean, no prefix), value, syntax }. The clean name
  // is canonical; a legacy --bs-<name> alias (the historical Bootstrap-flavoured prefix)
  // is emitted alongside during the migration so existing consumers + the conformance
  // gates keep resolving. `syntax` drives the @property type registration.
  const TOK = [];
  const add = (name, value, syntax) => TOK.push({ name, value, syntax });

  for (const k in t.color) add(`color-${k}`, resolveRef(t.color[k].$value), "<color>");
  for (const k in t.font) if (!k.startsWith("$")) add(`font-${k}`, fam(t.font[k].$value), null); // families: no @property
  for (const k in t.size) if (!k.startsWith("$")) add(k, resolveRef(t.size[k].$value), "<length>"); // keys carry their group (text-*, size-*)
  for (const k in t.radius) if (!k.startsWith("$")) add(k, resolveRef(t.radius[k].$value), "<length>");
  if (t.space) for (const k in t.space) if (!k.startsWith("$")) add(k, resolveRef(t.space[k].$value), "<length>");
  if (t.control) for (const k in t.control) if (!k.startsWith("$")) add(`control-${k}`, resolveRef(t.control[k].$value), "<length>");
  if (t.grade) {
    const ink = resolveRef(t.color.ink.$value), white = resolveRef(t.color.white.$value);
    for (const k in t.grade) {
      if (k.startsWith("$")) continue;
      const base = t.grade[k].$value;
      add(`grade-${k}`, base, "<color>");
      add(`grade-${k}-bg`, mix(base, white, 0.85), "<color>");
      add(`grade-${k}-fg`, mix(base, ink, 0.55), "<color>");
      add(`grade-${k}-on-dark`, mix(base, white, 0.5), "<color>");
      // Status chip on the dark panel: SOLID (baked 14% of the base over ink), not a
      // translucent color-mix — a translucent layer's EFFECTIVE colour depends on an
      // unknown backdrop, so its composited contrast can't be guaranteed statically.
      add(`grade-${k}-on-dark-bg`, mix(base, ink, 0.86), "<color>");
    }
  }

  const L = [];
  L.push("/* AUTO-GENERATED from tokens.json by build-tokens.mjs — do not edit by hand. */");
  L.push("/* baobab token structure (the design-system shape); these are brand's pinned values. */");
  L.push("@layer baobab {");
  // @property — typed, inheriting custom properties (graceful: ignored where unsupported).
  // An @property initial-value must be COMPUTATIONALLY INDEPENDENT, so only register
  // tokens whose value is a hex colour or an absolute px length (or 0). Relative/fluid
  // values (rem / ch / clamp() with vw — the modern type scale) are emitted as plain
  // custom properties, without an @property registration.
  const independent = (v) => /^#[0-9a-fA-F]{3,8}$/.test(v) || /^-?\d*\.?\d+px$/.test(v) || v === "0";
  for (const { name, value, syntax } of TOK)
    if (syntax && independent(value)) L.push(`  @property --${name} { syntax: "${syntax}"; inherits: true; initial-value: ${value}; }`);
  L.push("");
  L.push("  :root {");
  L.push("    /* baobab tokens — clean semantic names, no defensive prefix (the @layer is the namespace) */");
  for (const { name, value } of TOK) L.push(`    --${name}: ${value};`);
  L.push("");
  L.push("    /* legacy --bs-* aliases — transition only; migrate consumers off these, then drop */");
  for (const { name, value } of TOK) L.push(`    --bs-${name}: ${value};`);
  L.push("  }");
  L.push("");
  L.push("  /* Text styles — composite recipes built from the tokens above. */");
  for (const k in t.text) {
    const v = t.text[k].$value, decls = [];
    decls.push(`    font-family: ${resolveRef(v.fontFamily)};`);
    decls.push(`    font-size: ${resolveRef(v.fontSize)};`);
    if (v.fontWeight != null) decls.push(`    font-weight: ${v.fontWeight};`);
    if (v.lineHeight != null) decls.push(`    line-height: ${v.lineHeight};`);
    if (v.letterSpacing != null) decls.push(`    letter-spacing: ${v.letterSpacing};`);
    if (v.textTransform) decls.push(`    text-transform: ${v.textTransform};`);
    L.push(`  .text-${k}, .bs-text-${k} {`); // clean + legacy class
    L.push(...decls);
    L.push("  }");
  }
  L.push("}");
  return L.join("\n") + "\n";
}

const out = genCss(tokens);
const check = process.argv.includes("--check");
if (check) {
  let current = "";
  try { current = readFileSync(cssPath, "utf8"); } catch {}
  if (current !== out) {
    console.error("✗ tokens.css is stale. Run: node build-tokens.mjs");
    process.exit(1);
  }
  console.log("✓ tokens.css is up to date.");
} else {
  writeFileSync(cssPath, out);
  console.log("✓ wrote tokens.css");
}
