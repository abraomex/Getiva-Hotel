# UI Style Guide & Frontend Prompt Blueprint
> **Design Theme:** Editorial Luxury, High-End Hospitality & Curated Club Aesthetic  
> **Origin:** QuickDine / GourmetReserve Design System  
> **Tech Stack Compatibility:** Tailwind CSS v4 / v3, React / Next.js / Vue / Svelte, HTML5 + Vanilla CSS

---

## 1. System Prompt for AI Code Generators
*Copy and paste this section directly as a prompt for any AI coding assistant (Gemini, Claude, ChatGPT, Cursor, v0) to generate interfaces in this exact aesthetic.*

```markdown
You are a senior UI/UX designer and frontend engineer specializing in luxury editorial design, Michelin-star hospitality, and private-club digital experiences.

When designing or coding pages and components for this project, you MUST strictly adhere to the following design system:

### 1. Aesthetic DNA & Philosophy
- **Vibe:** "Curation for the Discerning Palette" — quiet luxury, warm minimalism, editorial restraint, and crisp typography.
- **Tone:** High-end boutique, timeless elegance, generous breathing room, intentional alignment.
- **Avoid:** Generic tech startup styles, bubbly rounded-2xl/full buttons everywhere, neon gradients, harsh 100% black borders, saturated primary blues/purples, or cluttered cards.

### 2. Color Palette & Tokens
- **Background & Canvas:**
  - Base Surface: `#f9f9f9` (Porcelain / Soft Linen)
  - Card / Panel (Lowest): `#ffffff` (Pure White)
  - Inset Container / Alt Surface: `#f3f3f4` (Muted Warm Grey)
- **Ink & Foregrounds:**
  - High-Contrast Text: `#1a1c1c` (Deep Obsidian Ink)
  - Muted / Secondary Text: `rgba(0, 0, 0, 0.55)` to `rgba(0, 0, 0, 0.70)`
  - Subdued / Disabled: `rgba(0, 0, 0, 0.25)` to `rgba(0, 0, 0, 0.35)`
- **Accents (Warm Gold & Brass):**
  - Primary Accent: `#775a19` (Antique Brass / Warm Gold)
  - Light Accent Container: `#fed488` / `#fef3db`
  - Accent Hover Highlight: `#c5a059`
  - Accent Text on Light: `#785a1a`
- **Primary Contrast (Obsidian):**
  - Primary Solid: `#000000` or `#1c1b1b`
  - On-Primary: `#ffffff`
  - Primary Hover: `#775a19` (shifts to warm gold on interactive hover)
- **Subtle Outlines & Dividers:**
  - Border Variant: `#c4c7c7` (used primarily as `border-outline-variant/10` to `/30` for ultra-fine hairlines)
- **Status & Alerts:**
  - Destructive / Error: `#ba1a1a` (deep crimson), Container: `#ffdad6`, On-Error: `#93000a`
  - Success / Confirmed: Forest emerald or warm gold badges.

### 3. Typography Rules
- **Display / Heading Font:** `Playfair Display`, serif.
  - Used for hero headers, section titles, restaurant/brand names, and modal titles.
  - Characteristics: `font-medium` or `font-semibold`, `tracking-tight`, `leading-[1.15]`.
- **Body & Interface Font:** `Outfit`, sans-serif (or `Manrope` / `Inter` fallback).
  - Used for body copy, form fields, numbers, and navigation.
- **Eyebrow Headers / Micro-Labels:**
  - Always uppercase with expansive letter spacing: `text-[9px]` or `text-[10px]`, `tracking-[0.2em]` or `tracking-widest`, `font-medium`, colored in accent gold (`#775a19`).
- **Interactive Buttons:**
  - Uppercase, wide tracking: `text-xs tracking-widest uppercase font-medium`.

### 4. Component Patterns
- **Hero & Headers:**
  - Immersive full-height or large banner with dimmed photograph (`brightness-70` + subtle black vignette `bg-black/30`).
  - Floating high-elevation search/filter bar in pure white with hairline internal dividers (`border-outline-variant/30`).
- **Cards & Surfaces:**
  - Pure white background, 1px subtle hairline border (`border-outline-variant/10`), minimal radius (`rounded-md` or `rounded-lg`).
  - Smooth lift on hover: `translate-y-[-4px]` with diffused ambient shadow (`0 20px 40px rgba(26, 26, 26, 0.06)`).
  - Image header with dark gradient scrim (`bg-linear-to-t from-black/30 via-transparent to-transparent`) and top/bottom floating micro-badges (`bg-secondary text-white uppercase text-[9px] tracking-widest py-1 px-2.5`).
- **Form Inputs:**
  - Form Fields: Either minimal underline style (`border-b border-outline-variant/60 focus:border-secondary focus:outline-none`) with Lucide leading icons, or tinted container wells (`bg-surface-container-low/30 border border-outline-variant/40 rounded-md`).
- **Quick Selection Pills (Time slots, filters, tags):**
  - Minimal compact chips (`text-[10px] font-medium tracking-wider uppercase border border-outline-variant/40 px-3 py-1.5 transition-colors`).
  - Selected state: `bg-secondary border-secondary text-white shadow-sm`.
- **Navigation:**
  - Fixed transparent navbar at top of page, seamlessly transitioning to frosted glass (`bg-white/95 backdrop-blur-md shadow-sm border-b border-outline-variant/10`) on scroll.
- **Micro-Animations:**
  - Use `transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1)` for creamy, organic easing.
```

---

## 2. Design Tokens & Setup

### Google Fonts Link
Place this in your `<head>` or HTML template:
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet" />
```

### Tailwind CSS v4 `@theme` Configuration
Add directly to `index.css`:
```css
@import "tailwindcss";

@theme {
  /* Surfaces */
  --color-surface: #f9f9f9;
  --color-surface-container-lowest: #ffffff;
  --color-surface-container-low: #f3f3f4;
  --color-on-surface: #1a1c1c;
  --color-outline-variant: #c4c7c7;

  /* Primary Obsidian */
  --color-primary: #000000;
  --color-on-primary: #ffffff;
  --color-primary-container: #1c1b1b;
  --color-on-primary-container: #858383;

  /* Secondary Luxury Warm Gold / Brass */
  --color-secondary: #775a19;
  --color-on-secondary: #ffffff;
  --color-secondary-container: #fed488;
  --color-on-secondary-container: #785a1a;

  /* Semantic Alerts */
  --color-error: #ba1a1a;
  --color-on-error: #ffffff;
  --color-error-container: #ffdad6;
  --color-on-error-container: #93000a;

  /* Typography */
  --font-display: "Playfair Display", serif;
  --font-body: "Outfit", sans-serif;
}

body {
  font-family: var(--font-body);
  background-color: var(--color-surface);
  color: var(--color-on-surface);
}

/* Custom Shadows & Motion Utilities */
.ambient-shadow {
  box-shadow: 0 30px 60px -15px rgba(26, 26, 26, 0.04);
}

.transition-soft {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.card-hover-effect {
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.card-hover-effect:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(26, 26, 26, 0.06);
}

/* Editorial Minimalist Scrollbar */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
  background: #f9f9f9;
}
::-webkit-scrollbar-thumb {
  background: #dadada;
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover {
  background: #c5a059;
}
```

---

## 3. Component Code Blueprints

### A. Eyebrow Super-Heading & Section Title
```html
<div className="mb-10 text-left">
  <span className="text-[10px] text-secondary tracking-[0.2em] font-medium uppercase block mb-2">
    CURATED SELECTION
  </span>
  <h2 className="font-display text-2xl md:text-3xl font-semibold text-primary tracking-tight">
    Featured Collections
  </h2>
</div>
```

---

### B. High-End Editorial Button Styles

```html
<!-- 1. Primary Solid Black Button (Shifts to Brass on Hover) -->
<button className="bg-primary text-on-primary text-xs tracking-widest uppercase px-8 py-4 hover:bg-secondary hover:text-white transition-soft cursor-pointer">
  Explore Collection
</button>

<!-- 2. Secondary Outline / Ghost Button -->
<button className="border border-outline-variant/40 text-black/70 hover:border-primary hover:text-primary text-xs tracking-widest uppercase px-6 py-3 transition-colors cursor-pointer bg-transparent">
  View Menu
</button>

<!-- 3. Minimal Link with Animated Arrow -->
<a href="#" className="text-xs text-secondary hover:text-primary transition-colors flex items-center gap-1.5 group tracking-wider uppercase font-medium">
  EXPLORE ALL <span className="group-hover:translate-x-1 transition-transform">→</span>
</a>
```

---

### C. Luxury Entity / Product Card

```jsx
<div className="group relative bg-white border border-outline-variant/10 card-hover-effect overflow-hidden rounded-md flex flex-col h-full">
  {/* Image Container with Scrim & Badges */}
  <div className="relative h-60 overflow-hidden block">
    <img
      src="/image.jpg"
      alt="Card Title"
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      loading="lazy"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
    
    {/* Floating Badges */}
    <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
      <span className="text-[9px] font-medium tracking-widest text-white bg-secondary py-1 px-2.5 uppercase">
        EXCLUSIVE
      </span>
      <span className="text-[9px] font-medium tracking-widest text-on-primary bg-primary py-1 px-2.5 uppercase">
        RECOMMENDED
      </span>
    </div>
  </div>

  {/* Card Body */}
  <div className="p-5 flex-1 flex flex-col justify-between">
    <div>
      {/* Eyebrow info */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-[10px] font-medium text-secondary tracking-widest uppercase">
          CONTEMPORARY FRENCH
        </span>
        <span className="text-[10px] font-medium text-black/55">$$$$</span>
      </div>

      {/* Main Title */}
      <h3 className="font-display text-lg font-semibold text-primary group-hover:text-secondary transition-colors line-clamp-1 mb-2">
        L'Ambroisie Royal
      </h3>

      {/* Subtitle / Location */}
      <p className="text-xs text-black/55 mb-4 flex items-center gap-1">
        Manhattan, New York
      </p>
    </div>

    {/* Selection Pills / Quick Actions */}
    <div>
      <div className="border-t border-outline-variant/10 my-3" />
      <span className="block text-[9px] font-medium text-black/55 tracking-wider uppercase mb-2">
        RESERVATION SLOTS
      </span>
      <div className="flex flex-wrap gap-1.5">
        <button className="text-[10px] font-medium border border-outline-variant/60 hover:border-primary px-3 py-1.5 transition-colors cursor-pointer text-black/70 hover:text-primary bg-surface">
          19:00
        </button>
        <button className="text-[10px] font-medium border border-secondary bg-secondary text-white px-3 py-1.5 shadow-sm">
          20:30
        </button>
      </div>
    </div>
  </div>
</div>
```

---

### D. Floating Search / Filter Bar (Multi-segment)

```jsx
<form className="bg-white p-3 md:p-2.5 ambient-shadow max-w-4xl mx-auto flex flex-col md:flex-row gap-2 border border-outline-variant/10">
  {/* Segment 1 */}
  <div className="flex-1 flex items-center border-b md:border-b-0 md:border-r border-outline-variant/30 px-4 py-3">
    <span className="text-outline-variant mr-3 shrink-0">🔍</span>
    <input
      type="text"
      placeholder="Search cuisines, venues..."
      className="w-full bg-transparent border-none focus:outline-none text-sm text-on-surface placeholder:text-black/40"
    />
  </div>

  {/* Segment 2 */}
  <div className="flex-1 flex items-center border-b md:border-b-0 md:border-r border-outline-variant/30 px-4 py-3">
    <span className="text-outline-variant mr-3 shrink-0">📍</span>
    <input
      type="text"
      placeholder="Location (e.g. Mayfair)"
      className="w-full bg-transparent border-none focus:outline-none text-sm text-on-surface placeholder:text-black/40"
    />
  </div>

  {/* CTA Action */}
  <button
    type="submit"
    className="bg-primary text-on-primary text-xs tracking-widest uppercase px-8 py-4 md:py-3 hover:bg-secondary hover:text-white transition-soft cursor-pointer shrink-0"
  >
    SEARCH
  </button>
</form>
```

---

### E. Underline Form Inputs (Auth / Contact Modals)

```jsx
<div className="space-y-1 text-left">
  <label className="block text-[10px] font-medium text-black/55 tracking-wider uppercase">
    EMAIL ADDRESS
  </label>
  <div className="relative">
    <input
      type="email"
      placeholder="you@domain.com"
      className="w-full pb-2 pt-1 text-sm bg-transparent border-b border-outline-variant/60 focus:border-secondary focus:outline-none transition-colors placeholder:text-black/30"
    />
  </div>
</div>
```

---

### F. Dark Toast Notification Settings (`react-hot-toast`)

```javascript
toastOptions={{
  style: {
    background: "#1a1c1c",
    color: "#ffffff",
    fontFamily: "Outfit, sans-serif",
    fontSize: "12px",
    letterSpacing: "0.02em",
    borderRadius: "4px",
    border: "1px solid rgba(255, 255, 255, 0.08)",
  },
}}
```

---

## 4. Key Design Checklist for New Projects
1. [ ] **Typography Hierarchy:** Did you use serif (`Playfair Display`) exclusively for headings and sans-serif (`Outfit`) for body copy/inputs?
2. [ ] **Micro-Header Spacing:** Are super-headings and labels styled with uppercase `text-[9px]` or `text-[10px]` and `tracking-[0.2em]`?
3. [ ] **Hairline Borders:** Are borders tinted down (`border-outline-variant/10` or `border-outline-variant/20`) rather than solid dark outlines?
4. [ ] **Brass Hover Accents:** Do black CTA buttons transition gracefully to `#775a19` (antique brass) on hover with cubic-bezier easing?
5. [ ] **Card Depth:** Is elevation handled using `.ambient-shadow` and `.card-hover-effect` rather than heavy blur shadows?
6. [ ] **Editorial Restraint:** Is there ample whitespace (`py-20` to `py-32` between sections) giving the content room to breathe?
