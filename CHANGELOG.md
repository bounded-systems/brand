# Changelog

## 2.0.0 — 2026-08-21

### Major

- BREAKING: rename the legacy alias prefix `--bs-*` → `--bnd-*` and the legacy recipe classes `.bs-text-*` → `.bnd-text-*`. `--bs-` is Bootstrap 5's own custom-property prefix (`--bs-primary`, `--bs-body-bg`), so this package was squatting on a major framework's namespace — a collision risk on any page that loads both, and a misreading risk everywhere else. The old names are not emitted alongside the new ones; the major bump is the signal. The canonical unprefixed names (`--color-forest`, `.text-h1`, …) are unaffected and remain the migration target — `--bnd-*` is still a transition layer to drop.

### Minor

- modern accessible type scale: convert the type tokens to SEMANTIC roles in REM (scale with the user's font-size / zoom — px can't) with FLUID headings via clamp() (smooth across viewports; clamp max = prior desktop px so consumers don't shift), and add the missing roles (text-micro / caption / small / meta / lead / h3 / display). @property is skipped for rem/clamp (initial-values must be computationally independent). The token-a11y typography gate already prefers relative units and passes.
- modern baobab token structure: emit tokens in `@layer baobab` with `@property`-typed, clean semantic names (drop the Bootstrap-flavoured `--bs-` prefix — the layer is the namespace). Add the spacing/sizing scale (`--space-*` 4px ramp, `--size-prose`/`--size-container`/`--size-card`, `--radius-sm`/`--radius-pill`) so layout composes from a coherent scale instead of raw values. Legacy prefixed aliases are emitted alongside for a non-breaking transition (`--bnd-*` — see the separate `bnd-prefix` intent); migrate consumers off them, then drop.

### Patch

- token layering: values live only on the base/primitive layer. Add a primitive font-size scale (raw rem) and point the semantic type roles (size.text-*) at it via references, instead of holding raw rem on the roles. The resolver is now recursive so the layers compose (recipe → semantic → primitive). Output values are unchanged.

## 1.4.0 — 2026-07-02

### Minor

- Publish content/strings.json and the identity artwork (mark/, avatar/,
lockup/, favicon-32.png) as part of the npm package, so downstream repos can
depend on `@bounded-systems/brand` directly instead of a git submodule. The
artwork stays outside the MIT grant — see LICENSE — this only changes
distribution, not licensing terms.

### Patch

- Regenerate tokens/tokens.ts, which had drifted from the type-scale
primitives added in #26 (missing font-size-* entries, stale comment).

