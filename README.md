<h1 align="center">VUI</h1>

<p align="center">
  A set of 35 UI components built with plain HTML, CSS, and vanilla JavaScript.<br>
  No build step. No dependencies. Drop it in and go.
</p>

<p align="center">
  <a href="https://mohit-ksahu.github.io/vui/">Live Preview →</a>
</p>

---

## Why VUI

Most component libraries come with a lot — a bundler, a framework, dozens of dependencies, and a steep learning curve just to render a button. VUI doesn't. It's plain HTML, CSS, and JavaScript. If you can write a `<div>`, you can use VUI.

It's designed for projects where you want polished UI without the overhead. Use it in a static site, drop it into a Laravel or Rails view, or reach for it whenever a full framework feels like overkill.

## Components

| | | | | |
|---|---|---|---|---|
| Accordion | Avatar | Badge | Breadcrumb | Button |
| Button Group | Card | Checkbox | Combobox | Dialog |
| Dropdown | Hover Card | Input | Input Group | Kbd |
| Label | Pagination | Popover | Progress | Radio Group |
| Select | Separator | Sheet | Sidebar | Skeleton |
| Slider | Spinner | Switch | Table | Tabs |
| Textarea | Toast | Toggle | Toggle Group | Tooltip |

## Features

- **Zero dependencies** — no npm, no bundler required to use it
- **Framework-agnostic** — works with React, Vue, Svelte, or plain HTML
- **CSS custom properties** — theme anything with a variable override
- **Dark mode** — light, dark, and system preference, with View Transitions
- **Keyboard accessible** — focus management and ARIA throughout
- **Modern CSS** — built on `@layer`, `oklch`, `popover`, and CSS Anchor Positioning

## Getting Started

### Option 1 — Source files

Copy the `components/` folder into your project:

```
components/
  index.css   ← all styles
  index.js    ← all behavior
  css/        ← per-component styles
  js/         ← per-component scripts
```

Then include them in your HTML:

```html
<link rel="stylesheet" href="path/to/components/index.css">
<script type="module" src="path/to/components/index.js"></script>
```

> VUI uses ES modules, so open your project through a local server — not `file://` directly.
> `npx serve .` or `python -m http.server` both work.

### Option 2 — Minified bundles

For production, bundle and minify with [esbuild](https://esbuild.github.io/):

```bash
npx esbuild components/index.js --bundle --minify --format=esm --outfile=index.min.js
npx esbuild components/index.css --bundle --minify --outfile=index.min.css
```

Then swap the paths in your HTML:

```html
<link rel="stylesheet" href="path/to/index.min.css">
<script type="module" src="path/to/index.min.js"></script>
```

## Theming

VUI is built on CSS custom properties. Override them to match your brand:

```css
:root {
  --background: oklch(0.985 0 0);
  --foreground: oklch(0.145 0 0);
  --primary: oklch(0.200 0.004 286.099);
  --accent: oklch(0.522 0.177 255.830);
  --radius: 0.375rem;
}
```

Dark mode is handled automatically based on system preference, or you can control it manually:

```js
import { setTheme, switchTheme } from './components/js/theme.js';

setTheme('dark');    // 'light' | 'dark' | 'system'
switchTheme();       // toggles between light and dark
```

## Browser Support

All modern browsers. CSS Anchor Positioning (used by `popover`, `dropdown`, `tooltip`, and `combobox`) reached [Baseline 2026](https://web.dev/baseline) and is supported in Chrome 125+, Firefox 147+, and Safari 26+.

## License

MIT
