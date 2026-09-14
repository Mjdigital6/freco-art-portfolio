---
name: "FRECO ART LTD"
description: "A strategic Kenyan property development company turning land into opportunity through partnerships and purposeful real estate, with a private owner desk for keeping the public story current."
colors:
  background: "#fbfbf8"
  foreground: "#19211c"
  card: "#ffffff"
  card-foreground: "#19211c"
  popover: "#ffffff"
  popover-foreground: "#19211c"
  primary: "#174b35"
  primary-foreground: "#ffffff"
  secondary: "#e8efe9"
  secondary-foreground: "#174b35"
  muted: "#eef1ed"
  muted-foreground: "#68736c"
  accent: "#d5e6d9"
  accent-foreground: "#174b35"
  destructive: "#a64a38"
  border: "#dbe2dc"
  input: "#dbe2dc"
  ring: "#174b35"
  sidebar-ring: "#174b35"
  sidebar-border: "#dbe2dc"
  sidebar-accent-foreground: "#174b35"
  sidebar-accent: "#e8efe9"
  sidebar-primary-foreground: "#ffffff"
  sidebar-primary: "#174b35"
typography:
  display:
    fontFamily: "Arial, Helvetica, sans-serif with tight display tracking"
  body:
    fontFamily: "Arial, Helvetica, sans-serif"
  mono:
    fontFamily: "\"Courier New\", monospace"
rounded:
  sm: "calc(var(--radius) * 0.6)"
  md: "calc(var(--radius) * 0.8)"
  lg: "0.15rem"
  xl: "calc(var(--radius) * 1.4)"
---

<!-- Generated from .project/DESIGN_SYSTEM.md + app/globals.css by the engine. Tokens above are normative and mirror the CSS; edit the CSS and DESIGN_SYSTEM.md, not this file. -->

## Overview

Architectural field notes: white space, deep development green, charcoal contrast, oversized editorial type and precise hairline grids. The private owner desk extends this into a focused content workspace with clear editing controls, narrow reading columns and strong saved-state feedback.

## Colors

| Token | Value |
| background | #fbfbf8 |
| surface | #ffffff |
| text / muted | #19211c / #68736c |
| border | #dbe2dc |
| primary | #174b35 |
| accent | #d5e6d9 |
| success / warning / danger | #174b35 / #9b6b2f / #a64a38 |

Declared in `globals.css` as `--color-*` and mirrored in the frontmatter. Use the token, never a raw hex.

## Typography

- Headings: Arial, Helvetica, sans-serif with tight display tracking
- Body: Arial, Helvetica, sans-serif

- Display: `Arial, Helvetica, sans-serif with tight display tracking`
- Body: `Arial, Helvetica, sans-serif`
- Mono: `"Courier New", monospace`

## Layout

- Small-radius editorial blocks, thin borders, deep green action surfaces, no decorative gradients.
- Shared components: Button, project cards, insight cards, form shell, filter pills, page intro, callout, footer, mobile navigation and owner content editor.

## Shapes

Radii: `sm` calc(var(--radius) * 0.6), `md` calc(var(--radius) * 0.8), `lg` 0.15rem, `xl` calc(var(--radius) * 1.4)

## Do's and Don'ts

- Voice: Plain, confident and strategic. No hype, guarantees or invented proof.

- Do load faces through Fontsource, not `next/font/google`.
- Don't introduce a colour or radius that isn't a token above.
- Don't use gradient text, or a purple/violet gradient as the brand signal.
- Don't use bounce or elastic easing; real objects decelerate smoothly.
