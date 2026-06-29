---
bump: minor
---
modern baobab token structure: emit tokens in `@layer baobab` with `@property`-typed, clean semantic names (drop the Bootstrap-flavoured `--bs-` prefix — the layer is the namespace). Add the spacing/sizing scale (`--space-*` 4px ramp, `--size-prose`/`--size-container`/`--size-card`, `--radius-sm`/`--radius-pill`) so layout composes from a coherent scale instead of raw values. Legacy `--bs-*` aliases are emitted alongside for a non-breaking transition; migrate consumers off them, then drop.
