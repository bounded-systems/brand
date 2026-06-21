# Bounded Systems — Brand

Identity assets and design tokens for **Bounded Systems**.
*Bounded authority for AI agents — drawn at the door, not the process or container.*

The mark is the capability model made physical: a **room** (the boundary), a
**door** (the gap — one sanctioned unit of authority), and an **agent** (the
guest, sitting low near the door).

```
brand/
├── tokens/
│   ├── tokens.json        ← SOURCE OF TRUTH (W3C design tokens)
│   ├── tokens.css         ← generated CSS variables + text styles (do not hand-edit)
│   └── build-tokens.mjs   ← generator; `--check` fails CI on drift
├── mark/                  ← logo only, transparent
│   ├── mark-white.svg     ← on forest / dark
│   ├── mark-forest.svg    ← on light
│   └── *-1024.png
├── avatar/                ← square masters (surfaces mask to rounded/circle)
│   ├── avatar-forest.svg  ← recommended
│   ├── avatar-light.svg
│   └── avatar-{forest,light}-{200,280,420,460,1024}.png
├── lockup/                ← wide link-card lockup (OG 1.91:1, 1200×630)
│   ├── lockup-forest.svg  ← repo social preview
│   └── lockup-light.svg
├── favicon-32.png
├── style-dictionary.config.mjs  ← native / Figma outputs → dist/ (gitignored)
└── package.json           ← build:css · check · build:sd
```

## Tokens

`tokens.json` is the only file you edit. Everything else is generated.

```bash
node tokens/build-tokens.mjs          # regenerate tokens.css
node tokens/build-tokens.mjs --check  # exit 1 if tokens.css is stale (CI)
```

Wire the check into the pipeline so the CSS can never drift from the JSON:

```yaml
# .github/workflows/tokens.yml (sketch)
- run: node brand/tokens/build-tokens.mjs --check
```

### Layers

| Layer | What | Example |
| --- | --- | --- |
| **Primitive token** | one named value | `color.forest` = `#0C5A42` |
| **Text style** (composite) | a recipe bundling primitives | `text.label` → mono + 11px + `0.14em` + uppercase |
| **Component** | the mark, built from tokens | `mark/*.svg` |

The **slug / eyebrow** ("AVATAR SYSTEM · v1") is the `text.label` style — *not*
a single token, but a composite that references `font.mono`, `size.text-label`,
etc. Consume it as the `.bs-text-label` class or read its parts from JSON.

## Consuming

**CSS / web** — import the generated variables and styles:

```css
@import "brand/tokens/tokens.css";
.eyebrow { } /* or just add class="bs-text-label" */
h1        { color: var(--bs-color-ink); }
```

**Anything that can't read CSS** (native iOS/Android, email, Figma, print) reads
`tokens.json` directly, or builds a platform output from it via Style Dictionary:

```bash
npm install
npm run build:sd   # → dist/{tokens.scss,tokens.js,tokens.flat.json,Tokens.swift,tokens.xml}
```

`tokens.css` stays the curated **web** artifact (it carries the composite
`.bs-text-*` classes); Style Dictionary covers everything else. `dist/` is
gitignored — it's generated, never committed. JSON is the source; every CSS,
SCSS, JS, Swift, and XML file is a derived artifact.

Fonts: [Space Grotesk] + [IBM Plex Mono] (Google Fonts).

## Palette

| Token | Hex | Use |
| --- | --- | --- |
| `forest` | `#0C5A42` | primary fill, mark on light |
| `forest-deep` | `#073D2C` | pressed / deep |
| `paper` | `#EDEAE1` | app background, warm |
| `card` | `#FFFFFF` | card surface (aliases `white`) |
| `card-alt` | `#F4F1EA` | light avatar fill |
| `ink` | `#16221C` | primary text |
| `ink-soft` | `#5C6B63` | secondary text |
| `ink-mono` | `#6E7C73` | mono label / slug text |
| `line` | `#E4E0D4` | hairline borders |
| `white` | `#FFFFFF` | mark on forest |

## Avatar usage

- Upload **`avatar/avatar-forest-460.png`** as the GitHub org avatar (or the SVG
  master). GitHub masks to rounded-square / circle itself — the mark sits inside
  a ~16% safe area so the door never clips.
- Forest is the hero treatment. Light is for placing on dark/photographic backgrounds.
- Don't recolor the mark, rotate it, add effects, or close the door gap.
- Below 20px, prefer `favicon-32.png`.

## Link cards / social preview

The square avatar center-crops badly on wide (~1.91:1) social/link cards and
clips the door. Use the dedicated wide lockup instead:

- Set **`lockup/lockup-forest.svg`** as the repo's social preview
  (Settings → Social preview). `lockup-light.svg` is for light/photographic contexts.
- 1200×630 (OG), mark + wordmark + slug + tagline, with safe margins.
- The lockups are SVG with live text. To rasterize to PNG (with the brand fonts
  installed), e.g. `rsvg-convert -o lockup-forest-1200.png lockup/lockup-forest.svg`.

[Space Grotesk]: https://fonts.google.com/specimen/Space+Grotesk
[IBM Plex Mono]: https://fonts.google.com/specimen/IBM+Plex+Mono
