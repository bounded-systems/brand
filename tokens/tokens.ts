// AUTO-GENERATED from tokens/tokens.json by Style Dictionary (npm run build:sd).
// Do not edit by hand — drift-checked by `npm run tokens:ts:check`.

export const tokens = {
  primitive: {
    "green-700": "#0c5a42", // Brand green
    "green-900": "#073d2c", // Deep green
    "green-100": "#e2ebe6", // Green wash
    "green-200": "#d2e0d8", // Green soft
    "green-300": "#bbd1ca", // Muted mint — text on forest (AA, 5.1:1)
    "green-500": "#58b196", // Bright sage — hairline/border on forest (non-text AA, 3.19:1; CVD-safe)
    "green-600": "#5f8971", // Deep sage — functional border/divider on LIGHT surfaces (non-text AA ≥3:1 on white/paper/tint; CVD-safe)
    paper: "#edeae1", // Warm paper
    white: "#ffffff",
    "ink-900": "#16221c", // Near-black ink
    "ink-600": "#5c6b63", // Muted ink (secondary + mono-label text — one canonical muted grey)
    line: "#888374", // Hairline / divider — warm grey, non-text AA ≥3:1 on white/paper (CVD-safe)
    "clay-600": "#9f3e2b", // Clay — text AA + CVD-safe (≥4.5:1 under deuteranopia/protanopia/tritanopia on paper & clay wash)
    "clay-100": "#f9ede9", // Clay wash (lightened so clay-on-clay-tint text clears 4.5:1 on all CVD variants — deuteranopia was 4.22:1 at #F2DED8)
    "amber-600": "#8c5818", // Amber — text AA + CVD-safe (≥4.5:1 under deuteranopia/protanopia/tritanopia on paper & amber wash)
    "amber-100": "#f3e8d6", // Amber wash
    "font-size-10": "0.625rem",
    "font-size-11": "0.6875rem",
    "font-size-12": "0.75rem",
    "font-size-13": "0.8125rem",
    "font-size-14": "0.875rem",
    "font-size-16": "1rem",
    "font-size-18": "1.125rem",
    "font-size-24": "1.5rem",
    "font-size-26": "1.625rem",
    "font-size-46": "2.875rem",
    "font-size-52": "3.25rem",
  },
  color: {
    forest: "#0c5a42", // Primary brand fill
    "forest-deep": "#073d2c", // Pressed / deep surfaces
    paper: "#edeae1", // App background, warm
    card: "#ffffff", // Card surface
    "card-alt": "#edeae1", // Light avatar fill — alias of paper (collapsed from cream #F4F1EA; ΔE 1.78 was an imperceptible near-duplicate)
    ink: "#16221c", // Primary text
    "ink-soft": "#5c6b63", // Secondary text
    "ink-mono": "#5c6b63", // Mono label / slug text — alias of ink-soft (collapsed from ink-500 #5E6B62; ΔE 0.92 was an imperceptible near-duplicate)
    line: "#888374", // Hairline borders
    white: "#ffffff", // Mark on forest
    "forest-tint": "#e2ebe6", // Subtle tinted surface
    "forest-soft": "#5f8971", // Functional border/divider on light surfaces (non-text AA ≥3:1; was green-200 — split out so on-forest text can stay light while borders meet 1.4.11)
    "on-forest": "#d2e0d8", // Primary text on the forest panel (AA, 6.0:1)
    "on-forest-soft": "#bbd1ca", // Muted text / eyebrow on forest (AA, 5.1:1)
    "on-forest-line": "#58b196", // Hairline / border on forest — functional non-text contrast (AA ≥3:1, CVD-safe)
    clay: "#9f3e2b", // Accent / negative
    "clay-tint": "#f9ede9", // Negative surface
    amber: "#8c5818", // Caution / highlight
    "amber-tint": "#f3e8d6", // Caution surface
  },
  font: {
    display: ["Space Grotesk","sans-serif"], // Headings & UI
    mono: ["IBM Plex Mono","monospace"], // Labels, slugs, code
  },
  size: {
    "text-micro": "0.625rem", // Micro labels / tags (10px).
    "text-label": "0.6875rem", // Mono labels / slugs (11px).
    "text-caption": "0.75rem", // Captions, fine print (12px).
    "text-small": "0.8125rem", // Small / dense UI text (13px).
    "text-meta": "0.875rem", // Secondary / metadata text (14px).
    "text-body": "1rem", // Body — 16px root so primary body clears the APCA size-aware comfort tier (Lc ≥90), and scales with the user's font-size preference.
    "text-lead": "1.125rem", // Lead paragraphs / large body (18px).
    "text-title": "1.125rem", // Card / section titles (18px).
    "text-h3": "1.5rem", // Sub-heading (24px).
    "text-h2": "1.625rem", // Heading (26px).
    "text-h1": "2.875rem", // Page heading (46px).
    "text-display": "3.25rem", // Hero / display (52px).
    "size-readable": "40ch", // Narrow measure — a single column of dense text.
    "size-prose": "65ch", // Comfortable reading measure (~65 characters) for body content.
    "size-card": "220px", // Min track width for an auto-fill card grid.
    "size-card-sm": "160px", // Min track width for a compact card grid (swatches, tiles).
    "size-container": "1100px", // Default page content max-width.
    "size-wide": "1280px", // Wide page content max-width.
  },
  radius: {
    "radius-sm": "8px", // Chips, tags, small controls
    "radius-md": "12px", // Inputs, small surfaces
    "radius-lg": "18px", // Cards, large surfaces
    "radius-pill": "999px", // Fully-rounded (pills, avatars, toggles)
  },
  space: {
    "space-0": "0",
    "space-px": "1px", // Hairline.
    "space-1": "4px",
    "space-2": "8px",
    "space-3": "12px",
    "space-4": "16px",
    "space-5": "20px",
    "space-6": "24px",
    "space-7": "28px",
    "space-8": "32px",
    "space-10": "40px",
    "space-12": "48px",
    "space-16": "64px",
    "space-20": "80px",
    "space-24": "96px",
  },
  control: {
    "min-tap-target": "24px", // WCAG 2.2 SC 2.5.8 (AA) minimum pointer-target side — the floor. Apply as min-width/min-height on any interactive control.
    sm: "36px", // Compact control (chips, dense toolbars) — clears 2.5.8 AA (24px) with margin.
    md: "44px", // Default control — meets 2.5.5 (AAA, 44px) and Apple HIG / Material touch-target guidance.
    lg: "52px", // Prominent / primary control.
  },
  grade: {
    enforced: "#3fb984", // Proven/enforced in running code
    partial: "#c8902f", // Partially enforced
    aspirational: "#7e8c83", // Aspirational / not yet enforced
  },
  text: {
    h1: {"fontFamily":["Space Grotesk","sans-serif"],"fontSize":"2.875rem","fontWeight":600,"lineHeight":1.02,"letterSpacing":"-0.025em"},
    h2: {"fontFamily":["Space Grotesk","sans-serif"],"fontSize":"1.625rem","fontWeight":600,"lineHeight":1.1,"letterSpacing":"-0.02em"},
    title: {"fontFamily":["Space Grotesk","sans-serif"],"fontSize":"1.125rem","fontWeight":600,"lineHeight":1.3,"letterSpacing":"-0.01em"},
    body: {"fontFamily":["Space Grotesk","sans-serif"],"fontSize":"1rem","fontWeight":400,"lineHeight":1.5,"letterSpacing":"0"},
    label: {"fontFamily":["IBM Plex Mono","monospace"],"fontSize":"0.6875rem","fontWeight":500,"lineHeight":1,"letterSpacing":"0.14em","textTransform":"uppercase"}, // Slug / eyebrow: mono uppercase tracked label.
  },
} as const;

/** The full, resolved token tree. */
export type Tokens = typeof tokens;

/** Top-level token categories: `primitive` | `color` | `font` | `size` | `radius` | `space` | `control` | `grade` | `text`. */
export type TokenCategory = keyof Tokens;

/** Every fully-qualified token name, e.g. `color.forest`. */
export type TokenName = {
  [C in TokenCategory]: `${C}.${Extract<keyof Tokens[C], string>}`;
}[TokenCategory];
