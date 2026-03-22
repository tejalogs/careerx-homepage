# CareerX Homepage -- Design Specification

> **Version:** 1.0
> **Last Updated:** 2026-03-22
> **Purpose:** Complete Figma-ready design specification for rebuilding the CareerX homepage from scratch.

---

## Table of Contents

1. [Brand Overview](#1-brand-overview)
2. [Color System](#2-color-system)
3. [Typography Scale](#3-typography-scale)
4. [Spacing & Layout Grid](#4-spacing--layout-grid)
5. [Component Library](#5-component-library)
6. [Section-by-Section Breakdown](#6-section-by-section-breakdown)
7. [Responsive Behavior Notes](#7-responsive-behavior-notes)
8. [Animation & Motion Specs](#8-animation--motion-specs)

---

## 1. Brand Overview

### Positioning

CareerX is a modern career services platform that guides users through four distinct stages: **Discover, Prepare, Validate, and Activate**. The visual identity communicates professionalism, trust, and forward momentum.

### Tagline

Position the tagline prominently in the hero section. Use a confident, action-oriented tone.

### Logo Usage

- Place logo in the top-left of the navbar.
- Ensure minimum clear space of 16px around the logo mark.
- Logo should be legible at navbar height (44px container).

### Design Personality

| Trait         | Expression                                      |
|---------------|--------------------------------------------------|
| Professional  | Clean layout, structured grid, Inter typeface    |
| Modern        | Glass morphism navbar, subtle gradients          |
| Energetic     | Accent yellow highlights, orbit animation        |
| Trustworthy   | Blue primary, consistent spacing, clear hierarchy|

---

## 2. Color System

### 2.1 Brand Palette

| Swatch | Name          | Hex / Value   | Usage                                      |
|--------|---------------|---------------|---------------------------------------------|
| ![#3C61A8](https://placehold.co/40x40/3C61A8/3C61A8) | Primary Blue  | `#3C61A8`     | Primary buttons, links, active states, key accents |
| ![#F5D134](https://placehold.co/40x40/F5D134/F5D134) | Accent Yellow | `#F5D134`     | CTAs, highlights, badges, the Activate stage |
| ![#0C0E14](https://placehold.co/40x40/0C0E14/0C0E14) | Dark          | `#0C0E14`     | Navbar CTA gradient start, dark backgrounds  |
| ![#F7F8FC](https://placehold.co/40x40/F7F8FC/F7F8FC) | Light BG      | `#F7F8FC`     | Page background, alternating section fills    |
| ![#FFFFFF](https://placehold.co/40x40/FFFFFF/FFFFFF) | White         | `#FFFFFF`     | Card backgrounds, text on dark surfaces       |

### 2.2 Text Colors

| Swatch | Name     | Value                    | Usage                            |
|--------|----------|--------------------------|----------------------------------|
| --     | Heading  | `#111827`                | H1, H2, H3 headings             |
| --     | Body     | `rgba(12, 14, 20, 0.6)` | Paragraphs, descriptions         |
| --     | Muted    | `rgba(12, 14, 20, 0.45)`| Secondary labels, helper text    |
| --     | Disabled | `rgba(12, 14, 20, 0.25)`| Disabled inputs, inactive states |

### 2.3 Stage Colors

Each career stage has a **solid** color and a **light tint** for backgrounds.

| Stage    | Solid       | Light Tint  | Usage                                      |
|----------|-------------|-------------|---------------------------------------------|
| Discover | `#4267B2`   | `#EEF2FF`   | Discover badges, icons, card accents        |
| Prepare  | `#2D6A4F`   | `#ECFDF5`   | Prepare badges, icons, card accents         |
| Validate | `#92400E`   | `#FFF7ED`   | Validate badges, icons, card accents        |
| Activate | `#6B21A8`   | `#F5F3FF`   | Activate badges, icons, card accents        |

### 2.4 Gradients

Use these exact gradient definitions for key surfaces.

| Name            | CSS Value                                        | Usage                    |
|-----------------|--------------------------------------------------|--------------------------|
| Navbar CTA      | `linear-gradient(135deg, #0C0E14, #1a1e2e)`     | Navbar call-to-action button |
| Discover Card   | `linear-gradient(306deg, #0a1628, #3C61A8)`     | Discover stage card bg   |
| Prepare Card    | `linear-gradient(306deg, #1e4d6e, #3C8CA8)`     | Prepare stage card bg    |
| Validate Card   | `linear-gradient(306deg, #0d2240, #3C61A8)`     | Validate stage card bg   |
| Activate Card   | `linear-gradient(306deg, #c49a00, #F5D134)`     | Activate stage card bg   |

> **Figma note:** Set gradient angle to 306 degrees for stage cards and 135 degrees for the navbar CTA. All gradients use a two-stop linear fill.

---

## 3. Typography Scale

### Font Family

```
Inter, system-ui, -apple-system, sans-serif
```

Import from Google Fonts or use the Figma plugin "Inter" by Rasmus Andersson.

### Type Scale

| Token    | Size   | Weight | Letter Spacing | Line Height | Transform | Usage Example                  |
|----------|--------|--------|----------------|-------------|-----------|--------------------------------|
| Hero     | 72px   | 900    | -0.025em       | 1.05        | --        | Main hero headline             |
| H2       | 48px   | 800    | -0.025em       | 1.15*       | --        | Section headings               |
| H3       | 30px   | 700    | 0              | 1.25*       | --        | Card titles, sub-headings      |
| Body L   | 18px   | 400    | 0              | 1.625       | --        | Hero sub-text, lead paragraphs |
| Body     | 16px   | 400-500| 0              | 1.625       | --        | Standard paragraphs            |
| Small    | 14px   | 400    | 0              | 1.5*        | --        | Helper text, metadata          |
| Caption  | 12px   | 500    | 0              | 1.4*        | --        | Timestamps, fine print         |
| Overline | 10-12px| 900    | 0.18-0.25em    | 1.4*        | UPPERCASE | Section labels, badges         |

> *Approximate line-heights for tokens not explicitly defined. Adjust to taste in Figma.

### Type Pairing Examples

```
[Overline]  YOUR CAREER JOURNEY
[H2]        How CareerX Works
[Body L]    A brief description of the section that provides
            context and sets expectations for the content below.
```

---

## 4. Spacing & Layout Grid

### 4.1 Container

| Property    | Value               |
|-------------|---------------------|
| Max Width   | 1152px              |
| Alignment   | Centered (auto margins) |
| Padding (mobile)  | 16px left/right |
| Padding (desktop) | 24px left/right |

### 4.2 Section Spacing

| Breakpoint | Vertical Padding (top & bottom) |
|------------|--------------------------------|
| Mobile     | 56px                           |
| Desktop    | 96px                           |

### 4.3 Spacing Scale

Use these values consistently throughout the design:

| Token | Value | Common Usage                          |
|-------|-------|---------------------------------------|
| xs    | 4px   | Inline icon gaps                      |
| sm    | 8px   | Tight element spacing                 |
| md    | 12px  | Form field gaps, tight card gaps      |
| base  | 16px  | Card padding (compact), standard gaps |
| lg    | 24px  | Card padding (standard), column gaps  |
| xl    | 32px  | Card padding (spacious), section gaps |
| 2xl   | 48px  | Large section internal spacing        |
| 3xl   | 56px  | Mobile section padding                |
| 4xl   | 96px  | Desktop section padding               |

### 4.4 Grid System

- **Desktop (1024px+):** 12-column grid, 24px gutters, within 1152px container.
- **Tablet (640-1023px):** 8-column grid, 16px gutters.
- **Mobile (<640px):** 4-column grid, 16px gutters, full-bleed where needed.

---

## 5. Component Library

### 5.1 Navbar

| Property         | Value                                         |
|------------------|-----------------------------------------------|
| Height           | 44px (inner pill)                             |
| Shape            | Pill (border-radius: 22px)                    |
| Background       | `rgba(255, 255, 255, 0.72)` + backdrop blur   |
| Backdrop Filter   | `blur(40px) saturate(180%)`                  |
| Shadow           | `0 4px 30px rgba(0, 0, 0, 0.08)`             |
| Position         | Fixed, top, full width                        |
| Z-index          | 50                                            |
| Padding          | 0 16px (internal)                             |

**Navbar CTA Button:**
- Background: `linear-gradient(135deg, #0C0E14, #1a1e2e)`
- Text: White, 14px, weight 600
- Border-radius: pill (9999px)
- Height: 36px (fits inside 44px navbar)

### 5.2 Buttons

#### Primary Button
| Property       | Value                      |
|----------------|----------------------------|
| Height         | 40px                       |
| Padding        | 0 24px                     |
| Background     | `#3C61A8`                  |
| Text Color     | `#FFFFFF`                  |
| Font Size      | 16px                       |
| Font Weight    | 600                        |
| Border Radius  | Pill (9999px) or 8px       |
| Hover BG       | Darken 10%                 |
| Hover Transform| `translateY(-2px)`         |

#### Secondary Button
| Property       | Value                      |
|----------------|----------------------------|
| Height         | 40px                       |
| Padding        | 0 24px                     |
| Background     | Transparent                |
| Border         | 1.5px solid `#3C61A8`     |
| Text Color     | `#3C61A8`                  |
| Border Radius  | Pill (9999px) or 8px       |

#### Accent / CTA Button
| Property       | Value                      |
|----------------|----------------------------|
| Height         | 40px                       |
| Background     | `#F5D134`                  |
| Text Color     | `#0C0E14`                  |
| Font Weight    | 700                        |
| Border Radius  | Pill (9999px)              |

### 5.3 Cards

#### Standard Card
| Property       | Value                            |
|----------------|----------------------------------|
| Background     | `#FFFFFF`                        |
| Border         | `1px solid rgba(12, 14, 20, 0.07)` |
| Border Radius  | 16px                             |
| Padding        | 24px (default), 16px-32px range  |
| Shadow         | `0 2px 16px rgba(12, 14, 20, 0.04)` |
| Hover Shadow   | `0 10px 15px rgba(0, 0, 0, 0.1)` |
| Hover Translate| `translateY(-4px)`               |

#### Pricing Card (Neobrutalism)
| Property       | Value                            |
|----------------|----------------------------------|
| Background     | `#FFFFFF`                        |
| Border         | `2px solid [stage-color]`        |
| Border Radius  | 16px                             |
| Shadow         | `4px 4px 0px 0px [stage-color]`  |
| Padding        | 32px                             |

> **Figma note:** For neobrutalism shadow, create a second rectangle offset 4px right and 4px down, filled with the stage color, placed behind the card. Or use Figma's drop shadow with x:4, y:4, blur:0, spread:0.

#### Stage Gradient Card
| Property       | Value                            |
|----------------|----------------------------------|
| Background     | Stage-specific gradient (see 2.4)|
| Border Radius  | 16px                             |
| Text Color     | `#FFFFFF`                        |
| Padding        | 32px                             |

### 5.4 Badges / Overline Labels

| Property       | Value                            |
|----------------|----------------------------------|
| Font Size      | 10-12px                          |
| Font Weight    | 900                              |
| Letter Spacing | 0.18em - 0.25em                  |
| Text Transform | UPPERCASE                        |
| Color           | Stage color (solid) or muted    |
| Background     | Stage color (light tint) or none |
| Padding        | 4px 12px (if background)         |
| Border Radius  | Pill (9999px)                    |

### 5.5 Hero Orbit

The hero section features an orbital animation with floating cards.

| Property               | Mobile  | Tablet  | Desktop |
|------------------------|---------|---------|---------|
| Orbit Radius           | 145px   | 180px   | 210px   |
| Card Dimensions        | 80x110px| 80x110px| 80x110px|
| Card Border Radius     | 12px    | 12px    | 12px    |
| Orbit Z-index          | 20      | 20      | 20      |

- Cards orbit around a central element.
- Each card has a subtle shadow and white background.
- Orbit path is a perfect circle at the defined radius.

### 5.6 Input Fields

| Property       | Value                            |
|----------------|----------------------------------|
| Height         | 40px                             |
| Border         | `1px solid rgba(12, 14, 20, 0.15)` |
| Border Radius  | 8px                              |
| Padding        | 0 12px                           |
| Font Size      | 16px                             |
| Focus Border   | `#3C61A8`                        |
| Placeholder    | Muted text color                 |

---

## 6. Section-by-Section Breakdown

### 6.1 Hero Section

**Layout:**
- Full-viewport height (100vh) or near it.
- Two-column on desktop: text left, orbit visual right.
- Single column on mobile: text stacked above orbit.

**Content:**
- Overline label (uppercase, small, muted or accent).
- Hero headline: 72px / 900 weight / tight tracking.
- Sub-headline: 18px / 400-500 weight / body text color.
- CTA button group: Primary + Secondary buttons, horizontal row.
- Trust indicators or social proof below CTAs.

**Visual:**
- Orbit animation with floating cards on the right (desktop).
- Light background (`#F7F8FC`) or white.

**Figma frame:**
- Desktop: 1440px wide artboard, content within 1152px container.
- Hero text column: ~55% width. Orbit column: ~45% width.

---

### 6.2 Problem / Pain Points Section

**Layout:**
- Centered heading with overline.
- 2-3 column card grid below.

**Content:**
- Overline: Stage label or "THE PROBLEM".
- H2 heading centered.
- Body text paragraph centered beneath heading.
- Cards showing pain points (icon + title + description).

**Specs:**
- Background: White or Light BG alternating.
- Card style: Standard card with icon at top.
- Grid gap: 24px.

---

### 6.3 How It Works Section (4 Stages)

**Layout:**
- Overline + H2 centered.
- 4 cards in a row (desktop), 2x2 (tablet), stacked (mobile).

**Content per card:**
- Stage number or icon.
- Stage name (H3).
- Brief description (body text).
- Stage gradient background OR white card with stage-colored accent.

**Specs:**
- Each card uses its stage gradient (see Gradients in section 2.4).
- Text on gradient cards is white.
- Card border-radius: 16px.
- Gap between cards: 24px.

---

### 6.4 Services / Features Section

**Layout:**
- Overline + H2 left-aligned or centered.
- Feature list or alternating image-text rows.

**Content:**
- Each feature: icon/illustration + H3 title + body description.
- Optional CTA link per feature.

**Specs:**
- Alternating row layout: image left / text right, then swap.
- Image containers: rounded-2xl (16px radius), subtle shadow.
- Spacing between rows: 48-64px.

---

### 6.5 Pricing Section

**Layout:**
- Overline + H2 centered.
- 2-3 pricing cards in a row.

**Content per card:**
- Plan name (H3).
- Price (large, bold).
- Feature list with checkmarks.
- CTA button at bottom.

**Specs:**
- Use neobrutalism card style (see 5.3).
- Each card uses a different stage color for border and shadow.
- Highlighted/recommended card: slightly larger or with accent badge.
- Card padding: 32px.
- Gap: 24px.

---

### 6.6 Testimonials Section

**Layout:**
- Overline + H2 centered.
- Horizontal scroll or 3-column grid.

**Content:**
- Quote text.
- Author name, title, company.
- Optional avatar (circle, 48px).

**Specs:**
- Standard card style.
- Quote text: 18px italic or normal, body color.
- Author: 14px, weight 600.
- Role: 14px, muted color.

---

### 6.7 CTA / Footer Section

**Layout:**
- Full-width dark background (`#0C0E14`).
- Centered text + CTA button.

**Content:**
- H2 headline in white.
- Sub-text in `rgba(255, 255, 255, 0.6)`.
- Accent yellow CTA button.

**Footer below:**
- Dark background continued.
- Multi-column link layout.
- Copyright text: caption size, muted white.

---

## 7. Responsive Behavior Notes

### Breakpoints

| Name    | Range          | Columns | Container Padding |
|---------|----------------|---------|-------------------|
| Mobile  | < 640px        | 4       | 16px              |
| Tablet  | 640 - 1023px   | 8       | 16px              |
| Desktop | 1024px+        | 12      | 24px              |

### Key Responsive Changes

| Component           | Mobile               | Tablet               | Desktop              |
|---------------------|----------------------|----------------------|----------------------|
| Hero layout         | Single column, stacked| Single column        | Two columns (55/45)  |
| Hero headline       | 40-48px              | 56px                 | 72px                 |
| Section padding     | 56px top/bottom      | 72px top/bottom      | 96px top/bottom      |
| Stage cards         | 1 column stack       | 2x2 grid             | 4 in a row           |
| Pricing cards       | 1 column stack       | 2 + 1 centered       | 3 in a row           |
| Navbar              | Hamburger menu       | Hamburger or compact  | Full horizontal nav  |
| Orbit radius        | 145px                | 180px                | 210px                |
| H2 size             | 32-36px              | 40px                 | 48px                 |

### Mobile-Specific Notes

- Navbar collapses to hamburger icon with slide-out or overlay menu.
- Cards go full-width with 16px horizontal margin.
- Buttons stretch to full-width inside cards.
- Orbit visual may be hidden or scaled down significantly.
- Horizontal scroll for testimonial cards if not stacked.

---

## 8. Animation & Motion Specs

### 8.1 Global Easing & Duration

| Property   | Value                              |
|------------|------------------------------------|
| Easing     | `cubic-bezier(0.22, 1, 0.36, 1)`  |
| Duration   | 300ms (standard interactions)      |

> This is a custom ease-out curve. In Figma Smart Animate, use "Custom" spring or bezier and input these values. For prototyping, "Ease Out" is an acceptable approximation.

### 8.2 Hover Effects

| Element     | Property       | From       | To                  | Duration |
|-------------|----------------|------------|---------------------|----------|
| Card        | translateY     | 0          | -4px                | 300ms    |
| Card        | box-shadow     | Card shadow| Hover shadow        | 300ms    |
| Button      | translateY     | 0          | -2px                | 300ms    |
| Button      | background     | Default    | 10% darker          | 300ms    |
| Link        | color          | Body color | Primary Blue        | 200ms    |

### 8.3 Orbit Animation

| Property          | Value                                    |
|-------------------|------------------------------------------|
| Type              | Continuous rotation                      |
| Duration          | 20-30s per full revolution               |
| Direction         | Clockwise                                |
| Easing            | Linear (constant speed)                  |
| Cards             | Counter-rotate to stay upright           |

### 8.4 Scroll-Triggered Animations

| Element          | Animation            | Trigger        | Duration | Delay     |
|------------------|----------------------|----------------|----------|-----------|
| Section headings | Fade up + slide up   | Enter viewport | 500ms    | 0ms       |
| Cards            | Fade up + slide up   | Enter viewport | 500ms    | Staggered 100ms each |
| Stats/numbers    | Count up             | Enter viewport | 1000ms   | 0ms       |

### 8.5 Z-Index Layering

| Layer              | Z-Index | Notes                          |
|--------------------|---------|--------------------------------|
| Page content       | 0       | Default                        |
| Section content    | 10      | Overlapping decorative elements|
| Orbit content      | 20      | Hero orbit cards               |
| Navbar / Modals    | 50      | Always on top                  |

---

## Appendix A: Figma Setup Checklist

1. **Create Color Styles** -- Add all brand, text, and stage colors as Figma color styles with clear naming (e.g., `brand/primary-blue`, `text/heading`, `stage/discover-solid`).
2. **Create Text Styles** -- Define each typography token as a Figma text style (Hero, H2, H3, Body L, Body, Small, Caption, Overline).
3. **Create Effect Styles** -- Set up shadow styles (Subtle, Card, Hover, Neobrutalism) and the glass blur effect.
4. **Build Components** -- Start with atomic components (buttons, badges, inputs), then compose cards, then full sections.
5. **Set Up Auto Layout** -- Use auto layout on all components with the spacing tokens defined above.
6. **Create Variants** -- Button variants (primary, secondary, accent) x states (default, hover, disabled). Card variants (standard, pricing, gradient).
7. **Responsive Frames** -- Create frames at 375px (mobile), 768px (tablet), and 1440px (desktop).

## Appendix B: Token Quick Reference

```
--color-primary:       #3C61A8
--color-accent:        #F5D134
--color-dark:          #0C0E14
--color-light-bg:      #F7F8FC
--color-white:         #FFFFFF

--text-heading:        #111827
--text-body:           rgba(12, 14, 20, 0.6)
--text-muted:          rgba(12, 14, 20, 0.45)
--text-disabled:       rgba(12, 14, 20, 0.25)

--font-family:         Inter, system-ui, sans-serif

--radius-sm:           8px
--radius-md:           12px
--radius-lg:           16px
--radius-xl:           32px
--radius-pill:         9999px

--shadow-subtle:       0 2px 8px rgba(0, 0, 0, 0.06)
--shadow-card:         0 2px 16px rgba(12, 14, 20, 0.04)
--shadow-hover:        0 10px 15px rgba(0, 0, 0, 0.1)
--shadow-neo:          4px 4px 0px 0px [color]

--ease-default:        cubic-bezier(0.22, 1, 0.36, 1)
--duration-default:    300ms

--container-max:       1152px
--breakpoint-sm:       640px
--breakpoint-md:       1024px
```

---

*End of Design Specification*
