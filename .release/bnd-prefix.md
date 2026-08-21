---
bump: major
---
BREAKING: rename the legacy alias prefix `--bs-*` → `--bnd-*` and the legacy recipe classes `.bs-text-*` → `.bnd-text-*`. `--bs-` is Bootstrap 5's own custom-property prefix (`--bs-primary`, `--bs-body-bg`), so this package was squatting on a major framework's namespace — a collision risk on any page that loads both, and a misreading risk everywhere else. The old names are not emitted alongside the new ones; the major bump is the signal. The canonical unprefixed names (`--color-forest`, `.text-h1`, …) are unaffected and remain the migration target — `--bnd-*` is still a transition layer to drop.
