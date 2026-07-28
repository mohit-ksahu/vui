<h1 align="center">VUI</h1>

<p align="center">
  35 UI components. Plain HTML, CSS, and JavaScript. No dependencies.
</p>

<p align="center">
  <a href="https://mohit-ksahu.github.io/vui/">vui →</a>
</p>

---

- No external dependencies
- Works with any framework or none
- Customizable via CSS variables
- Dark mode built in
- Keyboard accessible

## Install

Copy the `components/` folder into your project and include the files:

```html
<link rel="stylesheet" href="path/to/components/index.css">
<script type="module" src="path/to/components/index.js"></script>
```

**For production**, build minified bundles with esbuild:

```bash
npx esbuild components/index.js --bundle --minify --format=esm --outfile=index.min.js
npx esbuild components/index.css --bundle --minify --outfile=index.min.css
```

> ES modules require a local server. Use `npx serve .` or `python -m http.server`.
