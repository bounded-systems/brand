# Changelog

## 2.0.0 — 2026-08-21

### Major

- **BREAKING — the legacy alias prefix is renamed from `--bs-` to `--bnd-`.**
Every legacy custom property `--bs-<name>` is now `--bnd-<name>`, and every
legacy recipe class `.bs-text-<k>` is now `.bnd-text-<k>`. The old names are
**not** emitted alongside the new ones: a major version is the honest signal,
and consumers pin versions.

  Why: `--bs-` is Bootstrap 5's own CSS custom-property prefix (`--bs-primary`,
`--bs-body-bg`, `--bs-border-color`). This package was squatting on a major
framework's namespace — a real collision risk wherever Bootstrap shares a page,
and a misreading risk everywhere else, since `var(--bs-color-forest)` reads as
Bootstrap to anyone (human or agent) skimming it.

  Migration is mechanical, and a search-and-replace over your stylesheets and
markup is the whole of it:

  | before | after |
  | --- | --- |
  | `--bs-` | `--bnd-` |
  | `.bs-text-` | `.bnd-text-` |

  **The canonical unprefixed names are unaffected.** `--color-forest`,
`--text-h1`, `--space-4`, `.text-h1` and the rest — the `@layer baobab` tokens
with their `@property` registrations — did not change, because the layer is the
namespace and they never needed a defensive prefix. They remain the eventual
target: the `--bnd-*` layer is still a transition shim to migrate off, and this
release only stops that shim from borrowing someone else's prefix while it
lasts.

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

