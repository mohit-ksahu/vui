<h1 align="center">VUI</h1>

<p align="center">
  UI components built with plain HTML, CSS, and vanilla JavaScript.<br>
  No build step. No dependencies.
</p>

<p align="center">
  <a href="https://mohit-ksahu.github.io/vui/">Live Preview</a>
</p>

---

## Why

Plain HTML, CSS, and JavaScript — no build step, no framework, no dependencies. 

Good fit for static sites, server-rendered apps, or any project where you want polished UI without the overhead.

## Features

- **Zero dependencies** — no npm, no bundler required to use it
- **Framework-agnostic** — works with React, Vue, Svelte, or plain HTML
- **Theming** — fully customizable via CSS variables
- **Dark mode** — light, dark, and system preference, with View Transitions and a `setTheme` helper
- **Keyboard accessible** — focus management and ARIA throughout
- **Modern CSS** — built on `@layer`, `oklch`, `popover`, and CSS Anchor Positioning

## Components (35)

| | | | | |
|---|---|---|---|---|
| Accordion | Avatar | Badge | Breadcrumb | Button |
| Button Group | Card | Checkbox | Combobox | Dialog |
| Dropdown | Hover Card | Input | Input Group | Kbd |
| Label | Pagination | Popover | Progress | Radio Group |
| Select | Separator | Sheet | Sidebar | Skeleton |
| Slider | Spinner | Switch | Table | Tabs |
| Textarea | Toast | Toggle | Toggle Group | Tooltip |

## Getting Started

Copy the `components/` folder into your project and include the files in your HTML:

```html
<link rel="stylesheet" href="path/to/components/index.css">
<script type="module" src="path/to/components/index.js"></script>
```

> ES modules require a local server — not `file://` directly. `npx serve .` works.

For production, bundle and minify with [esbuild](https://esbuild.github.io/):

```bash
npx esbuild components/index.js --bundle --minify --format=esm --outfile=index.min.js
npx esbuild components/index.css --bundle --minify --outfile=index.min.css
```

## Browser Support

All modern browsers. CSS Anchor Positioning reached Baseline 2026 and is supported in Chrome 125+, Firefox 147+, and Safari 26+.

## License

MIT