#!/usr/bin/env node
// Content tokens — schema-driven, Gherkin-asserted, multi-repo. Zero deps.
//
//   1. Validate   content/strings.json against content/strings.schema.json
//   2. Merge      core (this repo) + per-repo content/strings.json  (multi-repo catalog)
//   3. Spec link  content/*.feature quoted strings must exist in the catalog
//   4. Coverage   each surface must PRESENT the canonical copy (Gherkin = the test)
//
// Canonical brand copy lives here (the shared repo); other repos add their own
// content/strings.json + .feature and pass their dir. One source of truth for words.
//
// Usage: node tools/content.mjs [--check] [--json] [repoDir ...]
//   repoDir   repos to include — each may add content/strings.json + .feature,
//             and its files are scanned for copy presence. Default: this repo.
import { readFile, readdir } from "node:fs/promises";
import { join, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const brandRoot = join(here, "..");
const args = process.argv.slice(2);
const CHECK = args.includes("--check");
const JSON_OUT = args.includes("--json");
const repoDirs = [brandRoot, ...args.filter((a) => !a.startsWith("--"))];

const flatten = (obj, prefix = "") => {
  const out = {};
  for (const [k, v] of Object.entries(obj)) {
    if (k.startsWith("$")) continue;
    const key = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === "object" && "$value" in v) out[key] = v.$value;
    else if (v && typeof v === "object") Object.assign(out, flatten(v, key));
  }
  return out;
};

// ---- 1. schema-driven validation (minimal, driven by the schema file) ----------
const schema = JSON.parse(await readFile(join(brandRoot, "content", "strings.schema.json"), "utf8"));
const keyRe = new RegExp(Object.keys(schema.patternProperties)[0]);
function validate(json, where) {
  const errs = [];
  for (const req of schema.required || []) if (!(req in json)) errs.push(`${where}: missing required token '${req}'`);
  for (const [k, v] of Object.entries(json)) {
    if (k.startsWith("$")) continue;
    if (!keyRe.test(k)) errs.push(`${where}: key '${k}' doesn't match ${keyRe}`);
    if (!v || typeof v !== "object" || typeof v.$value !== "string" || !v.$value.length)
      errs.push(`${where}: token '${k}' must have a non-empty string $value`);
    else for (const f of Object.keys(v)) if (!["$value", "$description"].includes(f)) errs.push(`${where}: token '${k}' has unknown field '${f}'`);
  }
  return errs;
}

// ---- 2. merge core + per-repo catalogs -----------------------------------------
const schemaErrors = [];
const catalog = {}; // key → { value, source }
for (const dir of repoDirs) {
  let raw;
  try { raw = JSON.parse(await readFile(join(dir, "content", "strings.json"), "utf8")); } catch { continue; }
  schemaErrors.push(...validate(raw, basename(dir) + "/content/strings.json"));
  for (const [k, val] of Object.entries(flatten(raw))) catalog[k] = { value: val, source: basename(dir) };
}
const valueSet = new Set(Object.values(catalog).map((c) => c.value));

// ---- 3. gherkin scenarios (core + per-repo) ------------------------------------
const scenarios = [];
for (const dir of repoDirs) {
  const cdir = join(dir, "content");
  let ents; try { ents = await readdir(cdir); } catch { continue; }
  for (const f of ents.filter((e) => e.endsWith(".feature"))) {
    const src = await readFile(join(cdir, f), "utf8");
    let scen = null;
    for (const line of src.split("\n")) {
      const s = line.trim();
      if (s.startsWith("Scenario:")) scen = s.slice(9).trim();
      const m = s.match(/^(?:Then|And)\b.*?"([^"]+)"/);
      if (m && scen) scenarios.push({ repo: basename(dir), scenario: scen, expect: m[1], inCatalog: valueSet.has(m[1]) });
    }
  }
}

// ---- 4. copy coverage: do surfaces present the canonical copy? ------------------
async function htmlText(dir) {
  let text = "";
  async function walk(d) {
    let ents; try { ents = await readdir(d, { withFileTypes: true }); } catch { return; }
    for (const e of ents) {
      if ([".git", "node_modules", "brand"].includes(e.name)) continue;
      const p = join(d, e.name);
      if (e.isDirectory()) await walk(p);
      else if (/\.html?$/.test(e.name)) text += "\n" + (await readFile(p, "utf8"));
    }
  }
  await walk(dir);
  return text;
}
const surfaceDirs = args.filter((a) => !a.startsWith("--"));
const coverage = [];
for (const dir of surfaceDirs) {
  const text = await htmlText(dir);
  if (!text) continue;
  const present = {}, missing = [];
  for (const [k, c] of Object.entries(catalog)) {
    const has = text.includes(c.value);
    present[k] = has;
    if (!has) missing.push(k);
  }
  coverage.push({ repo: basename(dir), present, missing });
}

// ---- report --------------------------------------------------------------------
const failingScenarios = scenarios.filter((s) => !s.inCatalog);
const driftRepos = coverage.filter((c) => c.missing.length);
if (JSON_OUT) {
  console.log(JSON.stringify({ schemaErrors, catalog, scenarios, coverage }, null, 2));
} else {
  console.log("\n  CONTENT TOKENS — schema-driven, Gherkin-asserted\n  " + "─".repeat(48));
  console.log(`  1. SCHEMA  ${schemaErrors.length ? "✗ " + schemaErrors.length + " error(s)" : "✓ valid"}`);
  for (const e of schemaErrors) console.log(`       ${e}`);
  console.log(`\n  2. CATALOG  ${Object.keys(catalog).length} tokens (${[...new Set(Object.values(catalog).map((c) => c.source))].join(" + ")})`);
  for (const [k, c] of Object.entries(catalog)) console.log(`       ${k} = "${c.value.length > 50 ? c.value.slice(0, 50) + "…" : c.value}"  ·${c.source}`);
  console.log(`\n  3. GHERKIN  ${scenarios.length} scenario(s), ${failingScenarios.length} not backed by a token`);
  for (const s of scenarios) console.log(`       ${s.inCatalog ? "✓" : "✗"} ${s.scenario}  →  "${s.expect.slice(0, 40)}${s.expect.length > 40 ? "…" : ""}"`);
  if (coverage.length) {
    console.log("\n  4. COPY COVERAGE — surfaces presenting canonical copy");
    for (const c of coverage) {
      const ok = Object.values(c.present).filter(Boolean).length, n = Object.keys(c.present).length;
      console.log(`       ${ok === n ? "✓" : "✗"} ${c.repo}  ${ok}/${n}` + (c.missing.length ? `  missing: ${c.missing.join(", ")}` : ""));
    }
  }
  console.log("");
}

if (CHECK && (schemaErrors.length || failingScenarios.length || driftRepos.length)) {
  console.error(`✗ content check failed: ${schemaErrors.length} schema, ${failingScenarios.length} unbacked scenarios, ${driftRepos.length} surface(s) with copy drift`);
  process.exit(1);
}
