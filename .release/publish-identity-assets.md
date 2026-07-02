---
bump: minor
---
Publish content/strings.json and the identity artwork (mark/, avatar/,
lockup/, favicon-32.png) as part of the npm package, so downstream repos can
depend on `@bounded-systems/brand` directly instead of a git submodule. The
artwork stays outside the MIT grant — see LICENSE — this only changes
distribution, not licensing terms.
