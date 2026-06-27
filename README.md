# ☄️ VUI

A collection of ready-to-use UI components built with plain HTML, CSS, and JavaScript.

**[Browse components](https://mohit-ksahu.github.io/vui/)**

## Features

- **No external dependencies** — entirely self-contained
- **Framework-agnostic** — works with React, Vue, or plain HTML
- **Design-token driven** — easy customization via CSS variables


| Metric                 |                   VUI                  |
| ---------------------- | :------------------------------------: |
| CSS (gzipped)          |                **10 KB**               |
| JavaScript (gzipped)   |                **3 KB**                |
| Total Download         |                **13 KB**               |
| Components             |                 **35**                 |
| Components / KB        |                **2.69**                |
| CSS Variables          |                    ✅                   |
| Dark Mode              |                    ✅                   |
| External JS Dependency |                **None**                |
| Browser Support        | Chrome, Edge, Firefox, Safari (latest) |


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

For production, you can bundle and minify the source files using **esbuild** to optimize network requests and file sizes.

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

## Setup with Bundlers (optional)

If you use a bundler (Vite, Webpack, Parcel, etc.), you can import VUI directly in your entry file:

```js
import "./components/index.css";
import "./components/index.js";
```

## Usage

Use any component markup from the documentation (`index.html`). Interaction behavior (like tabs switching) is automatically handled once `index.js` or `index.min.js` is imported.

### Button Example

```html
<button class="btn">Default</button>
<button class="btn btn-secondary">Secondary</button>
```
