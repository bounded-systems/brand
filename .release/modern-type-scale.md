---
bump: minor
---
modern accessible type scale: convert the type tokens to SEMANTIC roles in REM (scale with the user's font-size / zoom — px can't) with FLUID headings via clamp() (smooth across viewports; clamp max = prior desktop px so consumers don't shift), and add the missing roles (text-micro / caption / small / meta / lead / h3 / display). @property is skipped for rem/clamp (initial-values must be computationally independent). The token-a11y typography gate already prefers relative units and passes.
