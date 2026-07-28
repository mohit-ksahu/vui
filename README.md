<h1 align="center">VUI</h1>

<p align="center">
  A collection of UI components built with plain HTML, CSS, and JavaScript.
</p>

<p align="center">
  <a href="https://mohit-ksahu.github.io/vui/">
    <strong>Browse Components</strong>
  </a>
</p>

---

## Features

- **No external dependencies** — entirely self-contained
- **Framework-agnostic** — works with React, Vue, or plain HTML
- **Design-token driven** — easy customization via CSS variables
- **Dark mode** — built-in light/dark/system theme support
- **Accessible** — keyboard navigation and ARIA attributes throughout

## Metrics

|                        |                   VUI                  |
| ---------------------- | :------------------------------------: |
| Components             |                 **35**                 |
| Dark Mode              |                    ✅                   |
| External JS Dependency |                **None**                |
| Bundle Size (CSS)      |              ~59 KB minified           |
| Browser Support        |         Chrome 123+, Edge 123+, Safari 17.4+, Firefox 125+        |

> Components using CSS Anchor Positioning (`popover`, `dropdown`, `tooltip`, `combobox`) require **Chrome 125+ / Edge 125+**. All other components work across all modern browsers.

## Setup

Include VUI in your project by copying the source files directly or by referencing compiled, minified bundles.

### Using Source Files Directly

1. **Copy the `components/` folder** into your project.
   - `components/index.css` imports all component styles.
   - `components/index.js` exports/loads component behavior modules.

2. **Include VUI in your HTML**:
   ```html
   <link rel="stylesheet" href="path/to/components/index.css">
   <script type="module" src="path/to/components/index.js"></script>
   ```

3. **Run with a local server (recommended)**:
   Because VUI uses ES modules, run your project through a local server instead of opening HTML directly via `file://`:
   ```bash
   python -m http.server
   ```
   Then open `http://localhost:8000`.

### Using Minified Bundles (Recommended for Production)

You can bundle and minify the source files using **esbuild** to optimize network requests and file sizes.

1. **Generate the minified bundles**:
   ```bash
   npx esbuild components/index.js --bundle --minify --format=esm --outfile=index.min.js
   npx esbuild components/index.css --bundle --minify --outfile=index.min.css
   ```

2. **Include the minified files in your HTML**:
   ```html
   <link rel="stylesheet" href="path/to/index.min.css">
   <script type="module" src="path/to/index.min.js"></script>
   ```

## Usage

Use any component markup from the [documentation](https://mohit-ksahu.github.io/vui/). Interaction behavior (like tabs switching, dropdowns, toasts) is automatically handled once `index.js` or `index.min.js` is imported.
