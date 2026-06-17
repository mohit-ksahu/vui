# Components Usage Guide

A comprehensive collection of zero-dependency components built entirely on standard web platform APIs. No build tools, no frameworks, no setup ceremony.

## Design Principles

- **Native-first** — built on standard semantics
- **Zero dependencies** — no npm packages, no external runtimes, no CDN requirements
- **Framework-agnostic** — integrates with React, Vue, Svelte, plain HTML, or anything
- **Accessible by default** — keyboard navigation, focus trapping, and ARIA handled
- automatically
- **Modern CSS** — Cascade Layers keep specificity predictable; OKLCH design tokens for
- perceptually uniform theming
- **Auto-initialising** — interactive components activate on the first user interaction via
- global event delegation; no per-element setup required

---

## Table of Contents

- [Integration](#integration)
- [Theming](#theming)
- [Components](#components)
  - [Accordion](#accordion)
  - [Avatar](#avatar)
  - [Badge](#badge)
  - [Breadcrumb](#breadcrumb)
  - [Button Group](#button-group)
  - [Button](#button)
  - [Card](#card)
  - [Checkbox](#checkbox)
  - [Combobox](#combobox)
  - [Dialog](#dialog)
  - [Dropdown Menu](#dropdown-menu)
  - [Hover Card](#hover-card)
  - [Input Group](#input-group)
  - [Input](#input)
  - [Kbd](#kbd)
  - [Label](#label)
  - [Pagination](#pagination)
  - [Popover](#popover)
  - [Progress](#progress)
  - [Radio Group](#radio-group)
  - [Select](#select)
  - [Separator](#separator)
  - [Sheet](#sheet)
  - [Sidebar](#sidebar)
  - [Skeleton](#skeleton)
  - [Slider](#slider)
  - [Spinner](#spinner)
  - [Switch](#switch)
  - [Table](#table)
  - [Tabs](#tabs)
  - [Textarea](#textarea)
  - [Toast](#toast)
  - [Toggle Group](#toggle-group)
  - [Toggle](#toggle)
  - [Tooltip](#tooltip)

---

## Integration

Add a stylesheet and a script to your page — the library initialises everything
                automatically with zero configuration required.

### 1. Stylesheet

Link the core stylesheet in your `<head>`. It uses Cascade Layers to ensure predictably
                low specificity and easy overrides.

```html
<link rel="stylesheet" href="path/to/index.css">
```

### 2. Script

Load the library script anywhere on your page. It registers global listeners for all components via event delegation.

```html
<script type="module" src="path/to/index.js"></script>
```

---

## Theming

The library is built on a robust system of design tokens and modern CSS features. Nearly every visual aspect is controlled by CSS variables, making it effortlessly customisable for any brand or project.

### Design Tokens

All core visual properties are defined as tokens in the root stylesheet using OKLCH for perceptually
                uniform color palettes. Override these in your local stylesheet to change the look and feel.

```css
:root {
  --primary: oklch(0.205 0 0);
  --radius: 0.25rem;
  --spacing: 0.25rem;
  --font-sans: "Geist", "Inter", sans-serif;
  ...
}
```

### Dark Mode

Dark mode support is built-in. Simply apply the `.dark` class to the `<html>`
                element to activate the dark color palette. The system automatically handles color inversion based on
                these tokens.

```html
<html class="dark">...</html>
```

### Theme Visibility

Show or hide elements based on the active theme using simple utility classes.

```html
<span class="dark:hidden">Visible in light mode</span>
<span class="hidden dark:block">Visible in dark mode</span>
```

### Theme Change Event

Whenever the theme changes, the library dispatches a `theme:change` CustomEvent on the `document`. You can listen to this event to manually update things like syntax highlighters or dynamic images.

```javascript
document.addEventListener('theme:change', (e) => {
    const isDark = e.detail.isDark;
    const activeThemeName = e.detail.theme; // 'light', 'dark', or 'system'
    
    // Example: Swapping an image source manually
    const logo = document.getElementById('logo');
    logo.src = isDark ? 'logo-dark.png' : 'logo-light.png';
});
```

### JavaScript Helpers

Utility functions are provided to programmatically manage themes. These handle state persistence and
                system preference synchronization automatically.

```javascript
import { setTheme, switchTheme } from '../components/index.js';

switchTheme(); // Switches between light and dark
setTheme('dark'); // Forces a specific theme
setTheme('system'); // Syncs with OS preference
```

---

# Components

## Accordion

A vertically stacked set of interactive headings that each reveal a section of content.

### Basic

By default, only one item can be open at a time using the `name` attribute.

```html
<div style="width: 100%; max-width: 480px;">
    <details class="accordion" name="basic-acc" open>
        <summary class="accordion-trigger">
            Is it accessible?
            <i data-lucide="plus" class="accordion-icon accordion-collapsed-only"></i>
            <i data-lucide="minus" class="accordion-icon accordion-expanded-only"></i>
        </summary>
        <div class="accordion-content">Yes. It adheres to the WAI-ARIA design pattern and uses semantic HTML elements.</div>
    </details>
    <details class="accordion" name="basic-acc">
        <summary class="accordion-trigger">
            Is it styled?
            <i data-lucide="plus" class="accordion-icon accordion-collapsed-only"></i>
            <i data-lucide="minus" class="accordion-icon accordion-expanded-only"></i>
        </summary>
        <div class="accordion-content">Yes. It comes with default styles that match the rest of the components' aesthetic.</div>
    </details>
    <details class="accordion" name="basic-acc">
        <summary class="accordion-trigger">
            Is it animated?
            <i data-lucide="plus" class="accordion-icon accordion-collapsed-only"></i>
            <i data-lucide="minus" class="accordion-icon accordion-expanded-only"></i>
        </summary>
        <div class="accordion-content">Yes. It uses smooth transitions when opening and closing sections.</div>
    </details>
</div>
```

### Multiple

Remove the `name` attribute to allow multiple items to be open at once.

```html
<div style="width: 100%; max-width: 480px;">
    <details class="accordion">
        <summary class="accordion-trigger">
            Enable notifications?
            <i data-lucide="plus" class="accordion-icon accordion-collapsed-only"></i>
            <i data-lucide="minus" class="accordion-icon accordion-expanded-only"></i>
        </summary>
        <div class="accordion-content">Receive real-time alerts about account activity and updates.</div>
    </details>
    <details class="accordion">
        <summary class="accordion-trigger">
            Use dark mode?
            <i data-lucide="plus" class="accordion-icon accordion-collapsed-only"></i>
            <i data-lucide="minus" class="accordion-icon accordion-expanded-only"></i>
        </summary>
        <div class="accordion-content">Switch between light and dark themes based on your preference.</div>
    </details>
</div>
```

### Disabled

Use the `aria-disabled="true"` attribute to disable individual items.

```html
<div style="width: 100%; max-width: 480px;">
    <details class="accordion">
        <summary class="accordion-trigger">
            Supported features
            <i data-lucide="plus" class="accordion-icon accordion-collapsed-only"></i>
            <i data-lucide="minus" class="accordion-icon accordion-expanded-only"></i>
        </summary>
        <div class="accordion-content">The library supports over 36 components with full documentation.</div>
    </details>
    <details class="accordion" aria-disabled="true">
        <summary class="accordion-trigger">
            Premium themes
            <i data-lucide="plus" class="accordion-icon accordion-collapsed-only"></i>
            <i data-lucide="minus" class="accordion-icon accordion-expanded-only"></i>
        </summary>
        <div class="accordion-content">Custom branded themes are available in the advanced package.</div>
    </details>
</div>
```

### Borders

Achieved by wrapping items in a custom container with border styling.

```html
<div style="width: 100%; max-width: 480px;">
    <div style="border: 1px solid var(--border); border-radius: 0.75rem; padding: 0 1rem;">
        <details class="accordion" name="border-acc">
            <summary class="accordion-trigger">
                Project Overview
                <i data-lucide="plus" class="accordion-icon accordion-collapsed-only"></i>
                <i data-lucide="minus" class="accordion-icon accordion-expanded-only"></i>
            </summary>
            <div class="accordion-content">View general statistics and progress for your current project.</div>
        </details>
        <details class="accordion" name="border-acc">
            <summary class="accordion-trigger">
                Member Settings
                <i data-lucide="plus" class="accordion-icon accordion-collapsed-only"></i>
                <i data-lucide="minus" class="accordion-icon accordion-expanded-only"></i>
            </summary>
            <div class="accordion-content">Manage permissions and roles for your team members.</div>
        </details>
    </div>
</div>
```

### Card

Accordion can be placed inside a `.card` component.

```html
<div style="width: 100%; max-width: 480px;">
    <div class="card">
        <div class="card-header">
            <h4 class="card-title">Settings</h4>
            <p class="card-description">Manage your account preferences and security settings.</p>
        </div>
        <div class="card-content">
            <details class="accordion" name="card-acc">
                <summary class="accordion-trigger">
                    Security
                    <i data-lucide="plus" class="accordion-icon accordion-collapsed-only"></i>
                    <i data-lucide="minus" class="accordion-icon accordion-expanded-only"></i>
                </summary>
                <div class="accordion-content">Update your password and enable two-factor authentication.</div>
            </details>
            <details class="accordion" name="card-acc">
                <summary class="accordion-trigger">
                    Privacy
                    <i data-lucide="plus" class="accordion-icon accordion-collapsed-only"></i>
                    <i data-lucide="minus" class="accordion-icon accordion-expanded-only"></i>
                </summary>
                <div class="accordion-content">Control how your data is shared and used across the platform.</div>
            </details>
        </div>
    </div>
</div>
```


---

## Avatar

A component for representing the user with a fallback.

```html
<span class="avatar">
    <img src="https://i.pravatar.cc/150?u=admin" alt="Alex" class="avatar-image"><span class="avatar-fallback">AL</span>
</span>
```

### Badge

```html
<span class="avatar">
    <img src="https://i.pravatar.cc/150?u=cloud" alt="Elena" class="avatar-image"><span class="avatar-fallback">EL</span>
    <span class="avatar-badge" style="background-color: var(--success, #10b981);"></span>
</span>
<span class="avatar">
    <img src="https://i.pravatar.cc/150?u=devops" alt="Marcus" class="avatar-image"><span class="avatar-fallback">MA</span>
    <span class="avatar-badge" style="background-color: var(--warning, #f59e0b);"></span>
</span>
<span class="avatar">
    <span class="avatar-fallback">SR</span>
    <span class="avatar-badge" style="background-color: var(--destructive, #ef4444);"></span>
</span>
```

### Badge with Icon

```html
<span class="avatar" style="width:2.5rem;height:2.5rem;">
    <img src="https://i.pravatar.cc/150?u=ai" alt="AI Research" class="avatar-image"><span class="avatar-fallback">AI</span>
    <span class="avatar-badge" style="background-color: var(--primary);">
        <i data-lucide="bot" style="stroke-width:3;"></i>
    </span>
</span>
<span class="avatar" style="width:2.5rem;height:2.5rem;">
    <img src="https://i.pravatar.cc/150?u=terminal" alt="Infrastructure" class="avatar-image"><span class="avatar-fallback">IN</span>
    <span class="avatar-badge" style="background-color: var(--secondary);">
        <i data-lucide="terminal" style="stroke-width:3;"></i>
    </span>
</span>
```

### Avatar Group

```html
<div class="avatar-group">
    <span class="avatar">
        <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Sophia" class="avatar-image"><span class="avatar-fallback">SO</span>
    </span>
    <span class="avatar">
        <img src="https://i.pravatar.cc/150?u=a04258a2462d826712d" alt="Elena" class="avatar-image">
        <span class="avatar-fallback">EL</span>
    </span>
    <span class="avatar">
        <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" alt="Marcus" class="avatar-image">
        <span class="avatar-fallback">MA</span>
    </span>
    <span class="avatar">
        <span class="avatar-fallback">OP</span>
    </span>
</div>
```

### Avatar Group Count

```html
<div class="avatar-group">
    <span class="avatar">
        <img src="https://i.pravatar.cc/150?u=1" alt="Designer" class="avatar-image"><span class="avatar-fallback">D1</span>
    </span>
    <span class="avatar">
        <img src="https://i.pravatar.cc/150?u=2" alt="Reviewer" class="avatar-image">
        <span class="avatar-fallback">R1</span>
    </span>
    <div class="avatar-group-count">+12</div>
</div>
```

### Avatar Group with Icon

```html
<div class="avatar-group">
    <span class="avatar">
        <img src="https://i.pravatar.cc/150?u=root" alt="Root" class="avatar-image"><span class="avatar-fallback">RT</span>
    </span>
    <span class="avatar">
        <img src="https://i.pravatar.cc/150?u=guest" alt="Guest" class="avatar-image"><span class="avatar-fallback">GS</span>
    </span>
    <div class="avatar-group-count" style="cursor: pointer;" title="Add node">
        <i data-lucide="plus-circle"></i>
    </div>
</div>
```

### Sizes

```html
<span class="avatar" style="width:1.5rem;height:1.5rem;">
    <img src="https://i.pravatar.cc/150?u=5" alt="Mini" class="avatar-image"><span class="avatar-fallback">MN</span>
</span>
<span class="avatar">
    <img src="https://i.pravatar.cc/150?u=5" alt="Standard" class="avatar-image"><span class="avatar-fallback">ST</span>
</span>
<span class="avatar" style="width:3rem;height:3rem;">
    <img src="https://i.pravatar.cc/150?u=5" alt="Large" class="avatar-image"><span class="avatar-fallback">LG</span>
</span>
<span class="avatar" style="width:4rem;height:4rem;">
    <img src="https://i.pravatar.cc/150?u=5" alt="Extra Large" class="avatar-image"><span class="avatar-fallback">XL</span>
</span>
```

### Dropdown

Avatar can be used as a trigger for a dropdown menu.

```html
<button aria-haspopup="menu" popovertarget="avatar-dropdown" class="avatar" style="anchor-name:--avatar-dropdown; border: none; padding: 0; background: transparent; cursor: pointer;">
    <img src="https://i.pravatar.cc/150?u=admin" alt="Alex" class="avatar-image"><span class="avatar-fallback">AL</span>
</button>
<menu id="avatar-dropdown" popover class="dropdown" data-placement="bottom-start" role="menu" style="position-anchor:--avatar-dropdown; width: 14rem;">
    <div class="menu-label" style="display: flex; flex-direction: column;">
        <span style="font-weight:600;color:var(--foreground);">Alex</span>
        <span style="font-weight:normal;font-size:0.75rem;">alex@example.com</span>
    </div>
    <div class="menu-separator"></div>
    <button class="menu-item" role="menuitem"><i data-lucide="user"></i> Profile <span class="shortcut">⌘P</span></button>
    <button class="menu-item" role="menuitem"><i data-lucide="settings"></i> Settings</button>
    <button class="menu-item" role="menuitem"><i data-lucide="bell"></i> Notifications <span class="shortcut">⌘N</span></button>
    <div class="menu-separator"></div>
    <button class="menu-item" role="menuitem" style="color: var(--destructive);"><i data-lucide="log-out"></i> Log out</button>
</menu>
```


---

## Badge

Displays a badge or a component that looks like a badge.

### Variants

Standard styles for different semantic contexts.

```html
<span class="badge badge-default">Active</span>
<span class="badge badge-secondary">Pending</span>
<span class="badge badge-outline">Draft</span>
<span class="badge badge-destructive">Archived</span>
```

### With Icon

Composing badges with icons for better visual recognition.

```html
<span class="badge badge-default">
    <i data-lucide="check-circle"></i> Success
</span>
<span class="badge badge-outline">
    <i data-lucide="clock"></i> Processing
</span>
<span class="badge badge-secondary">
    <i data-lucide="star"></i> Featured
</span>
```

### Link

Use the `<a>` tag to render a link as a badge.

```html
<a href="#" class="badge badge-secondary">
    View Profile <i data-lucide="user"></i>
</a>
<a href="#" class="badge badge-outline">
    Source Code <i data-lucide="code"></i>
</a>
```

### Custom Colors

You can customize badges using inline styles or CSS variables.

```html
<div style="display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: center;">
    <span class="badge" style="background-color: #1e3a8a; color: #bfdbfe; border-color: transparent;">Default</span>
    <span class="badge" style="background-color: #0c4a6e; color: #bae6fd; border-color: transparent;">Info</span>
    <span class="badge" style="background-color: #134e4a; color: #99f6e4; border-color: transparent;">Success</span>
    <span class="badge" style="background-color: #064e3b; color: #a7f3d0; border-color: transparent;">Warning</span>
    <span class="badge" style="background-color: #78350f; color: #fde68a; border-color: transparent;">v1.0.0</span>
    <span class="badge" style="background-color: #7c2d12; color: #fed7aa; border-color: transparent;">New</span>
    <span class="badge" style="background-color: #7f1d1d; color: #fecaca; border-color: transparent;">Urgent</span>
    <span class="badge" style="background-color: #831843; color: #fbcfe8; border-color: transparent;">Beta</span>
    <span class="badge" style="background-color: #4c1d95; color: #ddd6fe; border-color: transparent;">Primary</span>
    <span class="badge" style="background-color: #312e81; color: #c7d2fe; border-color: transparent;">Secondary</span>
    <span class="badge" style="background-color: #0f172a; color: #e2e8f0; border-color: transparent;">Outline</span>
</div>
```


---

## Breadcrumb

Displays the path to the current resource using a hierarchy of links.

```html
<nav aria-label="breadcrumb">
    <ol class="breadcrumb-list">
        <li class="breadcrumb-item">
            <a href="#breadcrumb" class="breadcrumb-link">Home</a>
        </li>
        <li class="breadcrumb-separator" aria-hidden="true">
            <i data-lucide="chevron-right"></i>
        </li>
        <li class="breadcrumb-item">
            <a href="#breadcrumb" class="breadcrumb-link">Docs</a>
        </li>
        <li class="breadcrumb-separator" aria-hidden="true">
            <i data-lucide="chevron-right"></i>
        </li>
        <li class="breadcrumb-item">
            <span class="breadcrumb-page" aria-current="page">Components</span>
        </li>
    </ol>
</nav>
```

### Custom Separator

```html
<nav aria-label="breadcrumb">
    <ol class="breadcrumb-list">
        <li class="breadcrumb-item">
            <a href="#breadcrumb" class="breadcrumb-link">Project</a>
        </li>
        <li class="breadcrumb-separator" aria-hidden="true">
            <i data-lucide="slash"></i>
        </li>
        <li class="breadcrumb-item">
            <a href="#breadcrumb" class="breadcrumb-link">Source</a>
        </li>
        <li class="breadcrumb-separator" aria-hidden="true">
            <i data-lucide="slash"></i>
        </li>
        <li class="breadcrumb-item">
            <span class="breadcrumb-page" aria-current="page">Main.js</span>
        </li>
    </ol>
</nav>
```

### Collapsed

```html
<nav aria-label="breadcrumb">
    <ol class="breadcrumb-list">
        <li class="breadcrumb-item">
            <a href="#breadcrumb" class="breadcrumb-link">Dashboard</a>
        </li>
        <li class="breadcrumb-separator" aria-hidden="true">
            <i data-lucide="chevron-right"></i>
        </li>
        <li class="breadcrumb-item">
            <span class="breadcrumb-ellipsis" role="presentation" aria-hidden="true">
                <i data-lucide="ellipsis"></i>
                <span style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);">More Sections</span>
            </span>
        </li>
        <li class="breadcrumb-separator" aria-hidden="true">
            <i data-lucide="chevron-right"></i>
        </li>
        <li class="breadcrumb-item">
            <a href="#breadcrumb" class="breadcrumb-link">Files</a>
        </li>
        <li class="breadcrumb-separator" aria-hidden="true">
            <i data-lucide="chevron-right"></i>
        </li>
        <li class="breadcrumb-item">
            <span class="breadcrumb-page" aria-current="page">Documents</span>
        </li>
    </ol>
</nav>
```

### With Dropdown

```html
<nav aria-label="breadcrumb">
    <ol class="breadcrumb-list">
        <li class="breadcrumb-item">
            <a href="#breadcrumb" class="breadcrumb-link">Account</a>
        </li>
        <li class="breadcrumb-separator" aria-hidden="true">
            <i data-lucide="chevron-right"></i>
        </li>
        <li class="breadcrumb-item" style="position:relative;">
            <button class="breadcrumb-ellipsis btn btn-ghost" style="padding:0;width:1.25rem;height:1.25rem;anchor-name:--bc-drop;"
                popovertarget="bc-dropdown" aria-label="Show more">
                <i style="width: 1rem; height: 1rem;" data-lucide="ellipsis"></i>
            </button>
            <menu id="bc-dropdown" popover class="dropdown"
                style="position-anchor:--bc-drop;" data-placement="bottom-start">
                <a href="#breadcrumb" class="menu-item" role="menuitem">Profile</a>
                <a href="#breadcrumb" class="menu-item" role="menuitem">Billing</a>
                <a href="#breadcrumb" class="menu-item" role="menuitem">Security</a>
            </menu>
        </li>
        <li class="breadcrumb-separator" aria-hidden="true">
            <i data-lucide="chevron-right"></i>
        </li>
        <li class="breadcrumb-item">
            <a href="#breadcrumb" class="breadcrumb-link">Projects</a>
        </li>
        <li class="breadcrumb-separator" aria-hidden="true">
            <i data-lucide="chevron-right"></i>
        </li>
        <li class="breadcrumb-item">
            <span class="breadcrumb-page" aria-current="page">Active</span>
        </li>
    </ol>
</nav>
```

### With Home Icon

```html
<nav aria-label="breadcrumb">
    <ol class="breadcrumb-list">
        <li class="breadcrumb-item">
            <a href="#breadcrumb" class="breadcrumb-link" style="align-items: center;" aria-label="Home"
               >
                <i data-lucide="home" style="width:0.875rem;height:0.875rem;"></i>
                <span style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0);">Home</span>
            </a>
        </li>
        <li class="breadcrumb-separator" aria-hidden="true">
            <i data-lucide="chevron-right"></i>
        </li>
        <li class="breadcrumb-item">
            <a href="#breadcrumb" class="breadcrumb-link">Settings</a>
        </li>
        <li class="breadcrumb-separator" aria-hidden="true">
            <i data-lucide="chevron-right"></i>
        </li>
        <li class="breadcrumb-item">
            <span class="breadcrumb-page" aria-current="page">Privacy</span>
        </li>
    </ol>
</nav>
```


---

## Button Group

Groups related buttons with shared border radius.

```html
<div class="btn-group">
    <button class="btn btn-outline">Left</button>
    <button class="btn btn-outline">Center</button>
    <button class="btn btn-outline">Right</button>
</div>
<div class="btn-group radius-full">
    <button class="btn btn-outline">View</button>
    <button class="btn btn-outline">Edit</button>
    <button class="btn btn-outline">Share</button>
</div>
```

### Toolbar (Icons)

```html
<div class="btn-group">
    <button class="btn btn-icon btn-outline" aria-label="Pause"><i data-lucide="pause-circle"></i></button>
    <button class="btn btn-icon btn-outline" aria-label="Play"><i data-lucide="play-circle"></i></button>
    <button class="btn btn-icon btn-outline" aria-label="Stop"><i data-lucide="stop-circle"></i></button>
</div>
<div class="btn-group radius-full">
    <button class="btn btn-icon btn-outline" aria-label="Refresh"><i data-lucide="refresh-cw"></i></button>
    <button class="btn btn-icon btn-outline" aria-label="Settings"><i data-lucide="settings"></i></button>
    <button class="btn btn-icon btn-outline" aria-label="Delete"><i data-lucide="trash-2"></i></button>
</div>
```

### Sizes

```html
<div>
    <div class="label-sm">XS</div>
    <div class="btn-group">
        <button class="btn btn-outline btn-xs">Text</button>
        <button class="btn btn-outline btn-xs">HTML</button>
    </div>
</div>
<div>
    <div class="label-sm">Small</div>
    <div class="btn-group">
        <button class="btn btn-outline btn-sm">Day</button>
        <button class="btn btn-outline btn-sm">Week</button>
        <button class="btn btn-outline btn-sm">Month</button>
    </div>
</div>
<div>
    <div class="label-sm">Default</div>
    <div class="btn-group">
        <button class="btn btn-outline">Profile</button>
        <button class="btn btn-outline">Account</button>
        <button class="btn btn-outline">Privacy</button>
    </div>
</div>
<div>
    <div class="label-sm">Large</div>
    <div class="btn-group">
        <button class="btn btn-outline btn-lg">Free</button>
        <button class="btn btn-outline btn-lg">Pro</button>
        <button class="btn btn-outline btn-lg">Enterprise</button>
    </div>
</div>
<div>
    <div class="label-sm">XL</div>
    <div class="btn-group">
        <button class="btn btn-outline btn-xl">Confirm</button>
        <button class="btn btn-outline btn-xl">Cancel</button>
    </div>
</div>
```

### Orientation: Vertical

```html
<div class="btn-group" data-orientation="vertical">
    <button class="btn btn-outline">Small</button>
    <button class="btn btn-outline">Medium</button>
    <button class="btn btn-outline">Large</button>
</div>
<div class="btn-group radius-full" data-orientation="vertical">
    <button class="btn btn-icon btn-outline" aria-label="Move Up"><i data-lucide="chevron-up"></i></button>
    <button class="btn btn-icon btn-outline" aria-label="Move Down"><i data-lucide="chevron-down"></i></button>
</div>
```

### With Dropdown

```html
<div class="btn-group">
    <button class="btn btn-outline">Save Changes</button>
    <button class="btn btn-outline">Preview</button>
    <button class="btn btn-outline" popovertarget="bg-dropdown" aria-haspopup="menu" style="anchor-name: --bg-drop-anchor;">
        More Actions <i data-lucide="chevron-down"></i>
    </button>
</div>
<menu id="bg-dropdown" popover class="dropdown" data-placement="bottom-end" role="menu" style="position-anchor: --bg-drop-anchor;">
    <button class="menu-item" role="menuitem">Export</button>
    <button class="menu-item" role="menuitem">Delete</button>
</menu>
```


---

## Button

Displays a button or a component that looks like a button.

```html
<button class="btn">Default</button>
```

### Secondary

```html
<button class="btn btn-secondary">Secondary</button>
```

### Destructive

```html
<button class="btn btn-destructive">Destructive</button>
```

### Outline

```html
<button class="btn btn-outline">Outline</button>
```

### Ghost

```html
<button class="btn btn-ghost">Ghost</button>
```

### Link

```html
<button class="btn btn-link">Link</button>
```

### Icon

```html
<button class="btn btn-outline btn-icon" aria-label="Magic">
    <i data-lucide="wand-2"></i>
</button>
```

### With Icon

```html
<button class="btn">
    <i data-lucide="send"></i>
    Send Message
</button>
```

### Loading

```html
<button class="btn" disabled>
    <div class="spinner"></div>
    Please wait
</button>
<button class="btn btn-secondary" disabled>
    <div class="spinner"></div>
    Loading...
</button>
<button class="btn btn-outline btn-icon" disabled aria-label="Loading">
    <div class="spinner"></div>
</button>
```

### Size

```html
<button class="btn btn-xs">Extra Small</button>
<button class="btn btn-sm">Small</button>
<button class="btn">Default</button>
<button class="btn btn-lg">Large</button>
<button class="btn btn-xl">Extra Large</button>
```

### Disabled

```html
<button class="btn" disabled>Default</button>
<button class="btn btn-secondary" disabled>Secondary</button>
<button class="btn btn-outline" disabled>Outline</button>
<button class="btn btn-ghost" disabled>Ghost</button>
<button class="btn btn-link" disabled>Link</button>
```

### Icon Sizes

```html
<button class="btn btn-outline btn-icon-xs" aria-label="xs"><i data-lucide="settings"></i></button>
<button class="btn btn-outline btn-icon-sm" aria-label="sm"><i data-lucide="settings"></i></button>
<button class="btn btn-outline btn-icon" aria-label="md"><i data-lucide="settings"></i></button>
<button class="btn btn-outline btn-icon-lg" aria-label="lg"><i data-lucide="settings"></i></button>
<button class="btn btn-outline btn-icon-xl" aria-label="xl"><i data-lucide="settings"></i></button>
```


---

## Card

Displays a card with header, content, and footer.

```html
<div class="card" style="width:350px;">
    <div class="card-header">
        <div class="card-title">Project Details</div>
        <div class="card-description">Edit the general information for this project.</div>
    </div>
    <div class="card-content" style="display: flex; flex-direction: column; gap: 1.25rem;">
        <div style="display: flex; flex-direction: column; gap: 0.375rem;">
            <label for="k-name" class="label">Project Name</label>
            <input id="k-name" class="input" placeholder="e.g. Portfolio Website">
        </div>
        <div style="display: flex; flex-direction: column; gap: 0.375rem;">
            <label for="k-status" class="label">Project Status</label>
            <select class="select" id="k-status">
                <button><selectedcontent></selectedcontent><i data-lucide="chevron-down" class="select-indicator"></i></button>
                <option value="" disabled selected hidden>Select status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="archived">Archived</option>
            </select>
        </div>
    </div>
    <div class="card-footer" style="justify-content: space-between;">
        <button class="btn btn-outline">Cancel</button>
        <button class="btn">Save Project</button>
    </div>
</div>
```

### With Action

```html
<div class="card" style="width:350px;">
    <div class="card-header">
        <div class="card-title">Connected Accounts</div>
        <div class="card-description">Manage your social connections.</div>
        <div class="card-action">
            <button class="btn btn-outline btn-sm">
                <i data-lucide="link"></i> Connect
            </button>
        </div>
    </div>
    <div class="card-content" style="display: flex; flex-direction: column; gap: 1.25rem;">
        <div style="display: flex; align-items: center; gap: 1rem;">
            <span class="avatar" data-size="sm" style="background-color: #f6851b; color: white;">
                <i data-lucide="wallet" style="width: 1rem; height: 1rem;"></i>
            </span>
            <div style="flex:1;">
                <div style="font-weight:500;font-size:0.875rem;">Google Account</div>
                <div style="font-size:0.75rem;color:var(--muted-foreground);">alex@example.com</div>
            </div>
            <span class="badge badge-default">Active</span>
        </div>
        <div style="display: flex; align-items: center; gap: 1rem;">
            <span class="avatar" data-size="sm" style="background-color: #3b99fc; color: white;">
                <i data-lucide="smartphone" style="width: 1rem; height: 1rem;"></i>
            </span>
            <div style="flex:1;">
                <div style="font-weight:500;font-size:0.875rem;">GitHub</div>
                <div style="font-size:0.75rem;color:var(--muted-foreground);">@alex_dev</div>
            </div>
            <span class="badge badge-outline">Inactive</span>
        </div>
    </div>
</div>
```

### Privacy Settings

```html
<div class="card" style="width:350px;">
    <div class="card-header">
        <div class="card-title">Data Collection</div>
        <div class="card-description">Control what information we collect.</div>
    </div>
    <div class="card-content" style="display: flex; flex-direction: column; gap: 1.5rem;">
        <div style="display: flex; align-items: flex-start; gap: 1rem;">
            <i style="width: 1.25rem; height: 1.25rem; margin-top: 0.125rem; color: var(--foreground);" data-lucide="activity"></i>
            <div style="flex:1;min-width:0; display: flex; flex-direction: column; gap: 0.125rem;">
                <div style="font-size:0.875rem;font-weight:500;line-height:1.2;">Usage Analytics</div>
                <div style="font-size:0.75rem;color:var(--muted-foreground);">Share anonymous usage data to help us improve.</div>
            </div>
            <input type="checkbox" role="switch" class="switch" checked>
        </div>
        <div style="display: flex; align-items: flex-start; gap: 1rem;">
            <i style="width: 1.25rem; height: 1.25rem; margin-top: 0.125rem; color: var(--muted-foreground);" data-lucide="bug"></i>
            <div style="flex:1;min-width:0; display: flex; flex-direction: column; gap: 0.125rem;">
                <div style="font-size:0.875rem;font-weight:500;line-height:1.2;">Crash Reports</div>
                <div style="font-size:0.75rem;color:var(--muted-foreground);">Automatically send crash logs when errors occur.</div>
            </div>
            <input type="checkbox" role="switch" class="switch">
        </div>
    </div>
    <div class="card-footer" style="gap: 0.5rem; justify-content: flex-end;">
        <button class="btn" style="width: 100%;">Save Preferences</button>
    </div>
</div>
```

### Small

```html
<div class="card" style="width:300px;">
    <div class="card-header">
        <div class="card-title">Project Stats</div>
        <div class="card-description">Overview of your activity.</div>
        <div class="card-action">
            <button class="btn btn-ghost btn-sm btn-icon" aria-label="Refresh">
                <i data-lucide="refresh-cw"></i>
            </button>
        </div>
    </div>
    <div class="card-content" style="display: flex; flex-direction: column; gap: 1rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border); padding-bottom: 0.5rem;">
            <span style="color:var(--muted-foreground); font-size: 0.875rem;">Storage Used</span>
            <span style="font-weight:500; font-size: 0.875rem; color: var(--success, #10b981);">12%</span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border); padding-bottom: 0.5rem;">
            <span style="color:var(--muted-foreground); font-size: 0.875rem;">Bandwidth</span>
            <span style="font-weight:500; font-size: 0.875rem;">4.2 GB</span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="color:var(--muted-foreground); font-size: 0.875rem;">Team Size</span>
            <span style="font-weight:500; font-size: 0.875rem;">8 / 8</span>
        </div>
    </div>
</div>
```


---

## Checkbox

A control that allows the user to toggle between checked and not checked.

```html
<div style="display: flex; align-items: center;">
    <input type="checkbox" id="cb-1" class="checkbox">
    <label for="cb-1" class="label">Accept terms and conditions</label>
</div>
```

### Checked

```html
<div style="display: flex; align-items: center;">
    <input type="checkbox" id="cb-2" class="checkbox" checked>
    <label for="cb-2" class="label">Remember me on this device</label>
</div>
```

### Disabled

```html
<div style="display: flex; flex-direction: column;">
    <div style="display: flex; align-items: center;">
        <input type="checkbox" id="cb-3" class="checkbox" disabled>
        <label for="cb-3" class="label">Public profile</label>
    </div>
    <div style="display: flex; align-items: center;">
        <input type="checkbox" id="cb-4" class="checkbox" disabled checked>
        <label for="cb-4" class="label">Email notifications</label>
    </div>
</div>
```

### With Text

```html
<div style="display:grid;grid-template-columns:auto 1fr;gap:0.5rem 0.75rem;align-items:start;max-width:300px;">
    <input type="checkbox" id="cb-5" class="checkbox" style="margin-top:3px;">
    <div>
        <label for="cb-5" class="label" style="display:block;margin-bottom:0.25rem;">Opt-in to experimental features</label>
        <p style="margin:0;font-size:0.75rem;color:var(--muted-foreground);">Get early access to beta features. These may be unstable and could affect your workflow.</p>
    </div>
</div>
```

### In a Form

```html
<div class="card" style="width:350px;">
    <div class="card-header">
        <div class="card-title">Notifications</div>
        <div class="card-description">Choose how you want to be notified.</div>
    </div>
    <div class="card-content" style="display: flex; flex-direction: column; gap: 1rem;">
        <div style="display: flex; align-items: center; gap: 0.5rem;">
            <input type="checkbox" id="cb-app" class="checkbox" checked>
            <label for="cb-app" class="label">Mobile App</label>
        </div>
        <div style="display: flex; align-items: center; gap: 0.5rem;">
            <input type="checkbox" id="cb-browser" class="checkbox">
            <label for="cb-browser" class="label">Browser Push</label>
        </div>
        <div style="display: flex; align-items: center; gap: 0.5rem;">
            <input type="checkbox" id="cb-email" class="checkbox" checked>
            <label for="cb-email" class="label">Email Digest</label>
        </div>
    </div>
    <div class="card-footer">
        <button class="btn">Save Preferences</button>
    </div>
</div>
```

### Choice Card

Card-style selection where the wrapper acts as a clickable card pattern.

```html
<div style="display: flex; flex-direction: column; gap: 1rem; width: 100%; max-width: 440px;">
    <label class="card checkbox-card-showcase" style="display: flex; flex-direction: row; align-items: flex-start; gap: 1rem; padding: 1rem; cursor: pointer;">
        <input type="checkbox" class="checkbox" checked style="margin-top: 0.125rem;">
        <div style="display: flex; flex-direction: column; gap: 0.125rem;">
            <span style="font-size: 0.875rem; font-weight: 500; letter-spacing: -0.01em;">Private Project</span>
            <span style="font-size: 0.875rem; color: var(--muted-foreground);">Only invited members can see this project.</span>
        </div>
    </label>
    <label class="card checkbox-card-showcase" style="display: flex; flex-direction: row; align-items: flex-start; gap: 1rem; padding: 1rem; cursor: pointer;">
        <input type="checkbox" class="checkbox" style="margin-top: 0.125rem;">
        <div style="display: flex; flex-direction: column; gap: 0.125rem;">
            <span style="font-size: 0.875rem; font-weight: 500; letter-spacing: -0.01em;">Search Indexing</span>
            <span style="font-size: 0.875rem; color: var(--muted-foreground);">Allow search engines to index your project pages.</span>
        </div>
    </label>
</div>
```


---

## Combobox

Autocomplete input and command palette with a list of suggestions.

### Basic

A combobox acting as a select with search capabilities.

```html
<!-- Trigger Button -->
<button popovertarget="combo-lang" class="combobox-trigger" style="width: 200px; anchor-name: --a-combo-lang;">
    <span class="combobox-value">Select project...</span>
    <i data-lucide="chevrons-up-down" style="width: 1rem; height: 1rem; opacity: 0.5;"></i>
</button>

<!-- Popover Content -->
<div id="combo-lang" popover class="popover combobox-popover" data-placement="bottom-start" style="position-anchor: --a-combo-lang;">
    <div class="combobox-search">
        <i data-lucide="search"></i>
        <input type="text" class="combobox-input" placeholder="Search project...">
    </div>
    <div class="combobox-content">
        <div class="combobox-empty">No project found.</div>
        <div class="combobox-item" data-value="documentation">
            <div class="combobox-item-icon"><i data-lucide="check"></i></div>
            Documentation
        </div>
        <div class="combobox-item" data-value="marketing">
            <div class="combobox-item-icon"><i data-lucide="check"></i></div>
            Marketing
        </div>
        <div class="combobox-item" data-value="research">
            <div class="combobox-item-icon"><i data-lucide="check"></i></div>
            Research
        </div>
        <div class="combobox-item" data-value="development">
            <div class="combobox-item-icon"><i data-lucide="check"></i></div>
            Development
        </div>
        <div class="combobox-item" data-value="design">
            <div class="combobox-item-icon"><i data-lucide="check"></i></div>
            Design
        </div>
    </div>
</div>
```

### Disabled

Disable the entire combobox to prevent user interaction.

```html
<!-- Trigger Button -->
<button disabled popovertarget="combo-disabled" class="combobox-trigger" style="width: 200px; anchor-name: --a-combo-disabled;">
    <span class="combobox-value">Select timezone...</span>
    <i data-lucide="chevrons-up-down" style="width: 1rem; height: 1rem; opacity: 0.5;"></i>
</button>

<!-- Popover Content -->
<div id="combo-disabled" popover class="popover combobox-popover" data-placement="bottom-start" style="position-anchor: --a-combo-disabled;">
    <div class="combobox-search">
        <i data-lucide="search"></i>
        <input type="text" class="combobox-input" placeholder="Search timezone...">
    </div>
    <div class="combobox-content">
        <div class="combobox-empty">No timezone found.</div>
        <div class="combobox-item" data-value="utc">
            <div class="combobox-item-icon"><i data-lucide="check"></i></div>
            UTC
        </div>
    </div>
</div>
```

### Grouped Items

Organize options into groups using group labels.

```html
<!-- Trigger Button -->
<button popovertarget="combo-browser" class="combobox-trigger" style="width: 220px; anchor-name: --a-combo-browser;">
    <span class="combobox-value">Select a browser...</span>
    <i data-lucide="chevrons-up-down" style="width: 1rem; height: 1rem; opacity: 0.5;"></i>
</button>

<!-- Popover Content -->
<div id="combo-browser" popover class="popover combobox-popover" data-placement="bottom-start" style="position-anchor: --a-combo-browser; --combobox-width: 220px;">
    <div class="combobox-search">
        <i data-lucide="search"></i>
        <input type="text" class="combobox-input" placeholder="Search browsers...">
    </div>
    <div class="combobox-content">
        <div class="combobox-empty">No browser found.</div>
        
        <div class="combobox-group">
            <div class="combobox-group-label">Desktop</div>
            <div class="combobox-item" data-value="chrome">
                <div class="combobox-item-icon"><i data-lucide="check"></i></div>
                Google Chrome
            </div>
            <div class="combobox-item" data-value="safari">
                <div class="combobox-item-icon"><i data-lucide="check"></i></div>
                Apple Safari
            </div>
        </div>
        
        <div class="combobox-group">
            <div class="combobox-group-label">Mobile</div>
            <div class="combobox-item" data-value="firefox-ios">
                <div class="combobox-item-icon"><i data-lucide="check"></i></div>
                Firefox for iOS
            </div>
            <div class="combobox-item" data-value="opera-mini">
                <div class="combobox-item-icon"><i data-lucide="check"></i></div>
                Opera Mini
            </div>
        </div>
    </div>
</div>
```

### Fixed Height

Force a fixed height to prevent the popover from resizing drastically when filtering returns few or no results.

```html
<!-- Trigger Button -->
<button popovertarget="combo-height" class="combobox-trigger" style="width: 200px; anchor-name: --a-combo-height;">
    <span class="combobox-value">Select state...</span>
    <i data-lucide="chevrons-up-down" style="width: 1rem; height: 1rem; opacity: 0.5;"></i>
</button>

<!-- Popover Content -->
<div id="combo-height" popover class="popover combobox-popover" data-placement="bottom-start" style="position-anchor: --a-combo-height;">
    <div class="combobox-search">
        <i data-lucide="search"></i>
        <input type="text" class="combobox-input" placeholder="Search state...">
    </div>
    <div class="combobox-content" style="height: 120px;">
        <div class="combobox-empty">No state found.</div>
        <div class="combobox-item" data-value="california">
            <div class="combobox-item-icon"><i data-lucide="check"></i></div>
            California
        </div>
        <div class="combobox-item" data-value="texas">
            <div class="combobox-item-icon"><i data-lucide="check"></i></div>
            Texas
        </div>
        <div class="combobox-item" data-value="florida">
            <div class="combobox-item-icon"><i data-lucide="check"></i></div>
            Florida
        </div>
        <div class="combobox-item" data-value="new-york">
            <div class="combobox-item-icon"><i data-lucide="check"></i></div>
            New York
        </div>
    </div>
</div>
```

### Inline Search

A modernized combobox where the search input itself acts as the trigger, similar to modern combobox components.

```html
<!-- Trigger Input Group -->
<div class="input-group combobox-input-trigger" style="width: 250px; anchor-name: --a-combo-inline;">
    <span class="input-group-addon text-muted-foreground">
        <i data-lucide="search" style="width: 1rem; height: 1rem;"></i>
    </span>
    <input type="text" class="input" data-popover-target="combo-inline" placeholder="Search frameworks...">
</div>
    
<!-- Popover Content (No internal search box needed) -->
<div id="combo-inline" popover class="popover combobox-popover" data-placement="bottom-start" style="position-anchor: --a-combo-inline; min-width: anchor-size(width);">
    <div class="combobox-content">
        <div class="combobox-empty">No framework found.</div>
        <div class="combobox-item" data-value="nextjs">
            <div class="combobox-item-icon"><i data-lucide="check"></i></div>
            Next.js
        </div>
        <div class="combobox-item" data-value="react">
            <div class="combobox-item-icon"><i data-lucide="check"></i></div>
            React
        </div>
        <div class="combobox-item" data-value="vue">
            <div class="combobox-item-icon"><i data-lucide="check"></i></div>
            Vue
        </div>
        <div class="combobox-item" data-value="svelte">
            <div class="combobox-item-icon"><i data-lucide="check"></i></div>
            Svelte
        </div>
    </div>
</div>
```

### Custom Items

You can render custom components or complex layouts inside the combobox items.

```html
<!-- Trigger Input Group -->
<div class="input-group combobox-input-trigger" style="width: 280px; anchor-name: --a-combo-custom;">
    <input type="text" class="input" data-popover-target="combo-custom" placeholder="Assign to...">
    <span class="input-group-addon text-muted-foreground">
        <i data-lucide="chevron-down" style="width: 1rem; height: 1rem;"></i>
    </span>
</div>

<div id="combo-custom" popover class="popover combobox-popover" data-placement="bottom-start" style="position-anchor: --a-combo-custom; min-width: anchor-size(width);">
    <div class="combobox-content">
        <div class="combobox-empty">No user found.</div>
        
        <div class="combobox-item" data-value="alex" data-label="Alex">
            <div style="display: flex; flex-direction: column; gap: 0.125rem;">
                <span>Alex</span>
                <span class="text-muted-foreground" style="font-size: 0.75rem;">Project Manager</span>
            </div>
            <div class="combobox-item-icon"><i data-lucide="check"></i></div>
        </div>
        
        <div class="combobox-item" data-value="elena" data-label="Elena">
            <div style="display: flex; flex-direction: column; gap: 0.125rem;">
                <span>Elena</span>
                <span class="text-muted-foreground" style="font-size: 0.75rem;">Lead Designer</span>
            </div>
            <div class="combobox-item-icon"><i data-lucide="check"></i></div>
        </div>
        
        <div class="combobox-item" data-value="marcus" data-label="Marcus">
            <div style="display: flex; flex-direction: column; gap: 0.125rem;">
                <span>Marcus</span>
                <span class="text-muted-foreground" style="font-size: 0.75rem;">Frontend Developer</span>
            </div>
            <div class="combobox-item-icon"><i data-lucide="check"></i></div>
        </div>
        
        <div class="combobox-item" data-value="sarah" data-label="Sarah">
            <div style="display: flex; flex-direction: column; gap: 0.125rem;">
                <span>Sarah Connor</span>
                <span class="text-muted-foreground" style="font-size: 0.75rem;">Quality Assurance</span>
            </div>
            <div class="combobox-item-icon"><i data-lucide="check"></i></div>
        </div>
    </div>
</div>
```


---

## Dialog

A window overlaid on either the primary window or another dialog window, rendering the content underneath inert.

```html
<button class="btn btn-outline" commandfor="dlg-edit" command="show-modal">Edit Profile</button>
<dialog id="dlg-edit" class="dialog" style="max-width: 425px;" onclick="if(event.target===this)this.close()">
    <header class="dialog-header">
        <div style="display: flex; justify-content: space-between;">
            <div style="display:grid; gap:0.375rem;">
                <h4 style="font-size:1.125rem;font-weight:600;line-height:1;margin:0;">Edit Profile</h4>
                <p style="font-size:0.875rem;color:var(--muted-foreground);margin:0;">Update your account information. Click save when done.</p>
            </div>
            <button class="btn btn-ghost btn-icon-sm" style="margin-top:-0.5rem; margin-right:-0.5rem;" commandfor="dlg-edit" command="close">
                <i data-lucide="x"></i>
            </button>
        </div>
    </header>
    <div style="display:grid; gap:1.25rem;">
        <div style="display:grid; gap:0.50rem;">
            <label for="dlg-name" class="label">Display Name</label>
            <input id="dlg-name" class="input" value="Alex">
        </div>
        <div style="display:grid; gap:0.50rem;">
            <label for="dlg-email" class="label">Email Address</label>
            <input id="dlg-email" class="input" value="alex@example.com">
        </div>
    </div>
    <footer class="dialog-footer">
        <button class="btn btn-outline" commandfor="dlg-edit" command="close">Cancel</button>
        <button class="btn" commandfor="dlg-edit" command="close">Save Changes</button>
    </footer>
</dialog>
```

### Alert Dialog

```html
<button class="btn btn-outline" commandfor="dlg-alert" command="show-modal">Delete Account</button>
<dialog id="dlg-alert" class="dialog" style="max-width: 425px;">
    <header class="dialog-header">
        <h4 style="font-size:1.125rem;font-weight:600;line-height:1.4;margin:0;">Are you absolutely sure?</h4>
        <p style="font-size:0.875rem;color:var(--muted-foreground);margin:0;line-height:1.6;">This action cannot be undone. This will permanently delete your account and remove your data from our servers.</p>
    </header>
    <footer class="dialog-footer">
        <button class="btn btn-outline" commandfor="dlg-alert" command="close">Cancel</button>
        <button class="btn" commandfor="dlg-alert" command="close">Delete Account</button>
    </footer>
</dialog>
```

### Destructive

```html
<button class="btn btn-destructive" commandfor="dlg-del" command="show-modal">
    <i data-lucide="trash-2"></i> Remove Project
</button>
<dialog id="dlg-del" class="dialog" style="max-width: 425px;">
    <header class="dialog-header">
        <h4 style="font-size:1.125rem;font-weight:600;line-height:1.4;margin:0;color:var(--destructive);">Remove Project</h4>
        <p style="font-size:0.875rem;color:var(--muted-foreground);margin:0;">This will permanently remove the project and all associated files. This action is irreversible.</p>
    </header>
    <footer class="dialog-footer">
        <button class="btn btn-outline" commandfor="dlg-del" command="close">Cancel</button>
        <button class="btn btn-destructive" commandfor="dlg-del" command="close">Remove Project</button>
    </footer>
</dialog>
```

### Scrollable Content

```html
<button class="btn btn-outline" commandfor="dlg-scroll" command="show-modal">View Terms</button>
<dialog id="dlg-scroll" class="dialog" style="max-width: 600px;" onclick="if(event.target===this)this.close()">
    <header class="dialog-header" autofocus tabindex="-1">
        <h4 style="font-size:1.125rem;font-weight:600;line-height:1;margin:0;">Terms of Service</h4>
        <p style="font-size:0.875rem;color:var(--muted-foreground);margin:0;">Please review our terms and conditions.</p>
    </header>
    <div style="display: flex; flex-direction: column; gap: 1rem;">
        <h5 style="margin:0;font-size:1rem;font-weight:600;">1. General Usage</h5>
        <p style="margin:0;font-size:0.875rem;line-height:1.6;">By accessing this platform, you agree to comply with all local laws and regulations. You are responsible for maintaining the confidentiality of your account information.</p>
        
        <h5 style="margin:0;font-size:1rem;font-weight:600;">2. Data Privacy</h5>
        <p style="margin:0;font-size:0.875rem;line-height:1.6;">We value your privacy. Any data collected during your session is handled in accordance with our Privacy Policy. We do not sell your personal information to third parties.</p>

        <h5 style="margin:0;font-size:1rem;font-weight:600;">3. Limitation of Liability</h5>
        <p style="margin:0;font-size:0.875rem;line-height:1.6;">The platform is provided "as is" without any warranties. We shall not be liable for any direct, indirect, or incidental damages arising from your use of the service.</p>
        
        <h5 style="margin:0;font-size:1rem;font-weight:600;">4. Modifications</h5>
        <p style="margin:0;font-size:0.875rem;line-height:1.6;">We reserve the right to modify these terms at any time. Continued use of the platform constitutes acceptance of the updated terms.</p>
    </div>
    <footer class="dialog-footer">
        <button class="btn btn-outline" commandfor="dlg-scroll" command="close">Dismiss</button>
        <button class="btn" commandfor="dlg-scroll" command="close">Acknowledge</button>
    </footer>
</dialog>
```


---

## Dropdown Menu

Displays a menu to the user — such as a set of actions or functions — triggered by a button.

### Basic

```html
<button aria-haspopup="menu" popovertarget="dd-basic" class="btn btn-outline" style="anchor-name:--dd-basic;">
    Filter
</button>
<menu id="dd-basic" popover class="dropdown" data-placement="bottom-start" role="menu" style="position-anchor:--dd-basic;">
    <button class="menu-item" role="menuitem">By Date</button>
    <button class="menu-item" role="menuitem">By Size</button>
    <button class="menu-item" role="menuitem">By Author</button>
</menu>
```

### Submenu

```html
<button aria-haspopup="menu" popovertarget="dd-sub" class="btn btn-outline" style="anchor-name:--dd-sub;">
    Export
</button>
<menu id="dd-sub" popover class="dropdown" data-placement="bottom-start" role="menu" style="position-anchor:--dd-sub;">
    <button class="menu-item" role="menuitem">Export as CSV</button>
    <button class="menu-item" role="menuitem">Export as JSON</button>
    <button aria-haspopup="menu" popovertarget="dd-sub-sub" class="menu-item submenu-trigger" role="menuitem" style="anchor-name:--dd-sub-sub;">
        Advanced
        <i data-lucide="chevron-right" class="submenu-icon"></i>
    </button>
    <menu id="dd-sub-sub" popover class="dropdown submenu" data-placement="right-start" role="menu" style="position-anchor:--dd-sub-sub;">
        <button class="menu-item" role="menuitem">SQL Dump</button>
        <button class="menu-item" role="menuitem">XML Format</button>
    </menu>
</menu>
```

### Shortcuts

```html
<button aria-haspopup="menu" popovertarget="dd-short" class="btn btn-outline" style="anchor-name:--dd-short;">
    File Actions
</button>
<menu id="dd-short" popover class="dropdown" data-placement="bottom-start" role="menu" style="position-anchor:--dd-short;">
    <button class="menu-item" role="menuitem">
        New Document <span class="shortcut">⌘N</span>
    </button>
    <button class="menu-item" role="menuitem">
        Open File <span class="shortcut">⌘O</span>
    </button>
    <button class="menu-item" role="menuitem">
        Save Changes <span class="shortcut">⌘S</span>
    </button>
</menu>
```

### Icons

```html
<button aria-haspopup="menu" popovertarget="dd-icons" class="btn btn-outline" style="anchor-name:--dd-icons;">
    Media Options
</button>
<menu id="dd-icons" popover class="dropdown" data-placement="bottom-start" role="menu" style="position-anchor:--dd-icons;">
    <button class="menu-item" role="menuitem">
        <i data-lucide="play"></i> Play Sequence
    </button>
    <button class="menu-item" role="menuitem">
        <i data-lucide="volume-x"></i> Mute Audio
    </button>
    <button class="menu-item" role="menuitem">
        <i data-lucide="closed-captioning"></i> Toggle Subtitles
    </button>
</menu>
```

### Checkboxes

```html
<button aria-haspopup="menu" popovertarget="dd-check" class="btn btn-outline" style="anchor-name:--dd-check;">
    View Layers
</button>
<menu id="dd-check" popover class="dropdown" data-placement="bottom-start" role="menu" style="position-anchor:--dd-check;">
    <label class="menu-item" style="justify-content: space-between;" role="menuitemcheckbox">
        Background
        <input type="checkbox" class="checkbox" checked aria-hidden="true" tabindex="-1">
    </label>
    <label class="menu-item" style="justify-content: space-between;" role="menuitemcheckbox">
        Foreground
        <input type="checkbox" class="checkbox" aria-hidden="true" tabindex="-1">
    </label>
    <label class="menu-item" style="justify-content: space-between;" role="menuitemcheckbox">
        Overlays
        <input type="checkbox" class="checkbox" checked aria-hidden="true" tabindex="-1">
    </label>
</menu>
```

### Checkboxes Icons

```html
<button aria-haspopup="menu" popovertarget="dd-check-icons" class="btn btn-outline" style="anchor-name:--dd-check-icons;">
    Integrations
</button>
<menu id="dd-check-icons" popover class="dropdown" data-placement="bottom-start" role="menu" style="position-anchor:--dd-check-icons;">
    <label class="menu-item" style="justify-content: space-between;" role="menuitemcheckbox">
        <span style="display: flex; align-items: center; gap: 0.5rem;">
            <i data-lucide="github"></i> GitHub Sync
        </span>
        <input type="checkbox" class="checkbox" checked aria-hidden="true" tabindex="-1">
    </label>
    <label class="menu-item" style="justify-content: space-between;" role="menuitemcheckbox">
        <span style="display: flex; align-items: center; gap: 0.5rem;">
            <i data-lucide="slack"></i> Slack Alerts
        </span>
        <input type="checkbox" class="checkbox" aria-hidden="true" tabindex="-1">
    </label>
    <label class="menu-item" style="justify-content: space-between;" role="menuitemcheckbox">
        <span style="display: flex; align-items: center; gap: 0.5rem;">
            <i data-lucide="trello"></i> Trello Cards
        </span>
        <input type="checkbox" class="checkbox" checked aria-hidden="true" tabindex="-1">
    </label>
</menu>
```

### Radio Group

```html
<button aria-haspopup="menu" popovertarget="dd-radio" class="btn btn-outline" style="anchor-name:--dd-radio;">
    Sort Order
</button>
<menu id="dd-radio" popover class="dropdown" data-placement="bottom-start" role="menu" style="position-anchor:--dd-radio;">
    <div class="menu-label">Direction</div>
    <label class="menu-item" role="menuitemradio">
        <input type="radio" name="dd-radio-group" class="radio" style="flex-shrink:0;" checked>
        Ascending
    </label>
    <label class="menu-item" role="menuitemradio">
        <input type="radio" name="dd-radio-group" class="radio" style="flex-shrink:0;">
        Descending
    </label>
</menu>
```

### Radio Icons

```html
<button aria-haspopup="menu" popovertarget="dd-radio-icons" class="btn btn-outline" style="anchor-name:--dd-radio-icons;">
    Connection
</button>
<menu id="dd-radio-icons" popover class="dropdown" data-placement="bottom-start" role="menu" style="position-anchor:--dd-radio-icons;">
    <div class="menu-label">Protocol</div>
    <label class="menu-item" role="menuitemradio">
        <input type="radio" name="dd-radio-icons-group" class="radio" style="flex-shrink:0;" checked>
        <i data-lucide="wifi"></i> WebSocket
    </label>
    <label class="menu-item" role="menuitemradio">
        <input type="radio" name="dd-radio-icons-group" class="radio" style="flex-shrink:0;">
        <i data-lucide="globe"></i> HTTP Polling
    </label>
</menu>
```

### Destructive

```html
<button aria-haspopup="menu" popovertarget="dd-destructive" class="btn btn-outline" style="anchor-name:--dd-destructive;">
    Account Actions
</button>
<menu id="dd-destructive" popover class="dropdown" data-placement="bottom-start" role="menu" style="position-anchor:--dd-destructive;">
    <button class="menu-item" role="menuitem">Sign out of all devices</button>
    <button class="menu-item" role="menuitem">Deactivate Account</button>
    <div class="menu-separator"></div>
    <button class="menu-item menu-item-destructive" role="menuitem">
        Delete Account
        <span class="shortcut">⌘⌫</span>
    </button>
</menu>
```

### Avatar

```html
<button aria-haspopup="menu" popovertarget="dd-avatar" class="avatar" style="anchor-name:--dd-avatar; border: none; padding: 0; background: transparent; cursor: pointer;">
    <img src="https://i.pravatar.cc/80?u=admin" alt="Admin" class="avatar-image"><span class="avatar-fallback">AD</span>
</button>
<menu id="dd-avatar" popover class="dropdown" data-placement="bottom-start" role="menu" style="position-anchor:--dd-avatar;">
    <div class="menu-label" style="display: flex; flex-direction: column;">
        <span style="font-weight:600;color:var(--foreground);">Alex</span>
        <span style="font-weight:normal;font-size:0.75rem;">alex@example.com</span>
    </div>
    <div class="menu-separator"></div>
    <button class="menu-item" role="menuitem">Profile</button>
    <button class="menu-item" role="menuitem">Settings</button>
    <button class="menu-item" role="menuitem">Notifications</button>
    <div class="menu-separator"></div>
    <button class="menu-item" role="menuitem">Log out</button>
</menu>
```

### Complex

```html
<button aria-haspopup="menu" popovertarget="dd-complex" class="btn btn-outline" style="anchor-name:--dd-complex;">
    Settings
</button>
<menu id="dd-complex" popover class="dropdown" data-placement="bottom-start" role="menu" style="position-anchor:--dd-complex; width: 14rem;">
    
    <div class="menu-label">Projects</div>
    <button class="menu-item" role="menuitem">
        <i data-lucide="plus-circle"></i> Create New
    </button>
    <button class="menu-item" role="menuitem">
        <i data-lucide="folder"></i> Open Existing
    </button>

    <button aria-haspopup="menu" popovertarget="dd-complex-recent" class="menu-item submenu-trigger" role="menuitem" style="anchor-name:--dd-complex-recent;">
        <i data-lucide="clock"></i> Recent Files
        <i data-lucide="chevron-right" class="submenu-icon"></i>
    </button>
    <menu id="dd-complex-recent" popover class="dropdown submenu" data-placement="right-start" role="menu" style="position-anchor:--dd-complex-recent; width: 13rem;">
        <div class="menu-label">History</div>
        <button class="menu-item" role="menuitem">
            <i data-lucide="file-text"></i> index.html
        </button>
        <button class="menu-item" role="menuitem">
            <i data-lucide="file-text"></i> styles.css
        </button>

        <button aria-haspopup="menu" popovertarget="dd-complex-more-proj" class="menu-item submenu-trigger" role="menuitem" style="anchor-name:--dd-complex-more-proj;">
            <i data-lucide="more-horizontal"></i> More
            <i data-lucide="chevron-right" class="submenu-icon"></i>
        </button>
        <menu id="dd-complex-more-proj" popover class="dropdown submenu" data-placement="right-start" role="menu" style="position-anchor:--dd-complex-more-proj; width: 12rem;">
            <button class="menu-item" role="menuitem">
                <i data-lucide="archive"></i> Archived
            </button>
            <button class="menu-item" role="menuitem">
                <i data-lucide="trash"></i> Deleted
            </button>
        </menu>
    </menu>

    <div class="menu-separator"></div>
    <button class="menu-item" role="menuitem">
        <i data-lucide="download"></i> Export Data
        <span class="shortcut">⌘E</span>
    </button>

    <div class="menu-separator"></div>
    
    <div class="menu-label">Notifications</div>
    <label class="menu-item" style="justify-content: space-between;" role="menuitemcheckbox">
        <span style="display: flex; align-items: center; gap: 0.5rem;">
            <i data-lucide="mail"></i> Email Updates
        </span>
        <input type="checkbox" class="checkbox" checked aria-hidden="true" tabindex="-1">
    </label>
    <label class="menu-item" style="justify-content: space-between;" role="menuitemcheckbox">
        <span style="display: flex; align-items: center; gap: 0.5rem;">
            <i data-lucide="bell"></i> Push Alerts
        </span>
        <input type="checkbox" class="checkbox" aria-hidden="true" tabindex="-1">
    </label>

    <button aria-haspopup="menu" popovertarget="dd-complex-theme" class="menu-item submenu-trigger" role="menuitem" style="anchor-name:--dd-complex-theme;">
        <i data-lucide="palette"></i> Theme Mode
        <i data-lucide="chevron-right" class="submenu-icon"></i>
    </button>
    <menu id="dd-complex-theme" popover class="dropdown submenu" data-placement="right-start" role="menu" style="position-anchor:--dd-complex-theme; width: 11rem;">
        <div class="menu-label">Preferences</div>
        <label class="menu-item" role="menuitemradio">
            <input type="radio" name="dd-complex-time" class="radio" style="flex-shrink:0;" checked>
            Light
        </label>
        <label class="menu-item" role="menuitemradio">
            <input type="radio" name="dd-complex-time" class="radio" style="flex-shrink:0;">
            Dark
        </label>
        <label class="menu-item" role="menuitemradio">
            <input type="radio" name="dd-complex-time" class="radio" style="flex-shrink:0;">
            System
        </label>
    </menu>

    <div class="menu-separator"></div>

    <button class="menu-item menu-item-destructive" role="menuitem">
        <i data-lucide="trash"></i> Clear History
        <span class="shortcut">⇧⌘D</span>
    </button>
</menu>
```

### Placements

```html
<button aria-haspopup="menu" popovertarget="dd-ts" class="btn btn-secondary btn-sm" style="anchor-name: --dd-ts;">Top-Start</button>
<menu id="dd-ts" popover class="dropdown" data-placement="top-start" role="menu" style="position-anchor: --dd-ts; width: auto;">
    <button class="menu-item" role="menuitem">Top-start</button>
</menu>

<button aria-haspopup="menu" popovertarget="dd-t" class="btn btn-secondary btn-sm" style="anchor-name: --dd-t;">Top</button>
<menu id="dd-t" popover class="dropdown" data-placement="top" role="menu" style="position-anchor: --dd-t; width: auto;">
    <button class="menu-item" role="menuitem">Top</button>
</menu>

<button aria-haspopup="menu" popovertarget="dd-te" class="btn btn-secondary btn-sm" style="anchor-name: --dd-te;">Top-End</button>
<menu id="dd-te" popover class="dropdown" data-placement="top-end" role="menu" style="position-anchor: --dd-te; width: auto;">
    <button class="menu-item" role="menuitem">Top-end</button>
</menu>

<button aria-haspopup="menu" popovertarget="dd-bs" class="btn btn-secondary btn-sm" style="anchor-name: --dd-bs;">Bottom-Start</button>
<menu id="dd-bs" popover class="dropdown" data-placement="bottom-start" role="menu" style="position-anchor: --dd-bs; width: auto;">
    <button class="menu-item" role="menuitem">Bottom-start</button>
</menu>

<button aria-haspopup="menu" popovertarget="dd-b" class="btn btn-secondary btn-sm" style="anchor-name: --dd-b;">Bottom</button>
<menu id="dd-b" popover class="dropdown" data-placement="bottom" role="menu" style="position-anchor: --dd-b; width: auto;">
    <button class="menu-item" role="menuitem">Bottom</button>
</menu>

<button aria-haspopup="menu" popovertarget="dd-be" class="btn btn-secondary btn-sm" style="anchor-name: --dd-be;">Bottom-End</button>
<menu id="dd-be" popover class="dropdown" data-placement="bottom-end" role="menu" style="position-anchor: --dd-be; width: auto;">
    <button class="menu-item" role="menuitem">Bottom-end</button>
</menu>

<button aria-haspopup="menu" popovertarget="dd-ls" class="btn btn-secondary btn-sm" style="anchor-name: --dd-ls;">Left-Start</button>
<menu id="dd-ls" popover class="dropdown" data-placement="left-start" role="menu" style="position-anchor: --dd-ls; width: auto;">
    <button class="menu-item" role="menuitem">Left-start</button>
</menu>

<button aria-haspopup="menu" popovertarget="dd-l" class="btn btn-secondary btn-sm" style="anchor-name: --dd-l;">Left</button>
<menu id="dd-l" popover class="dropdown" data-placement="left" role="menu" style="position-anchor: --dd-l; width: auto;">
    <button class="menu-item" role="menuitem">Left</button>
</menu>

<button aria-haspopup="menu" popovertarget="dd-le" class="btn btn-secondary btn-sm" style="anchor-name: --dd-le;">Left-End</button>
<menu id="dd-le" popover class="dropdown" data-placement="left-end" role="menu" style="position-anchor: --dd-le; width: auto;">
    <button class="menu-item" role="menuitem">Left-end</button>
</menu>

<button aria-haspopup="menu" popovertarget="dd-rs" class="btn btn-secondary btn-sm" style="anchor-name: --dd-rs;">Right-Start</button>
<menu id="dd-rs" popover class="dropdown" data-placement="right-start" role="menu" style="position-anchor: --dd-rs; width: auto;">
    <button class="menu-item" role="menuitem">Right-start</button>
</menu>

<button aria-haspopup="menu" popovertarget="dd-r" class="btn btn-secondary btn-sm" style="anchor-name: --dd-r;">Right</button>
<menu id="dd-r" popover class="dropdown" data-placement="right" role="menu" style="position-anchor: --dd-r; width: auto;">
    <button class="menu-item" role="menuitem">Right</button>
</menu>

<button aria-haspopup="menu" popovertarget="dd-re" class="btn btn-secondary btn-sm" style="anchor-name: --dd-re;">Right-End</button>
<menu id="dd-re" popover class="dropdown" data-placement="right-end" role="menu" style="position-anchor: --dd-re; width: auto;">
    <button class="menu-item" role="menuitem">Right-end</button>
</menu>
```


---

## Hover Card

For sighted users to preview content available behind a link.

```html
<span class="hover-card-trigger" style="anchor-name: --hc-1;">
    <a href="javascript:void(0)"
        style="font-weight:500;text-decoration:none;color:var(--foreground);">
        @nextjs
    </a>
    <span class="hover-card-content" style="position-anchor: --hc-1;">
        <div style="display: flex; gap: 1rem;">
            <span class="avatar" data-size="lg" style="background-color: var(--foreground); color: var(--background);">
                <i data-lucide="layers" style="width: 1.5rem; height: 1.5rem;"></i>
            </span>
            <div style="flex:1;min-width:0;">
                <div style="font-weight:500;font-size:0.875rem;line-height:1.3;">Next.js</div>
                <div style="font-size:0.75rem;color:var(--muted-foreground);margin-top:1px;">Web Framework</div>
            </div>
        </div>
        <p style="margin:0.625rem 0 0;font-size:0.75rem;color:var(--muted-foreground);line-height:1.5;">
            The React framework for the web. Used by some of the world's largest companies.
        </p>
        <div style="display: flex; gap: 1rem; margin-top: 0.5rem;">
            <span>
                <strong style="color:var(--foreground);font-weight:500;">120k</strong>
                <span style="color:var(--muted-foreground);"> Stars</span>
            </span>
            <span>
                <strong style="color:var(--foreground);font-weight:500;">4.2m</strong>
                <span style="color:var(--muted-foreground);"> Installs</span>
            </span>
        </div>
    </span>
</span>
```

### Dependencies

```html
<span class="hover-card-trigger" tabindex="0" style="anchor-name: --hc-2;">
    <span class="badge badge-secondary" style="cursor:default;">
        react@18.2.0
    </span>
    <span class="hover-card-content" style="position-anchor: --hc-2;">
        <div style="display: flex; flex-direction: column; gap: 0.25rem;">
            <div style="font-weight:500;font-size:0.875rem;">React</div>
            <div style="font-size:0.75rem;color:var(--muted-foreground);">A JavaScript library for building user interfaces</div>
            <div style="display: flex; align-items: center; margin-top: 0.25rem;">
                <span class="badge badge-default">MIT License</span>
            </div>
        </div>
    </span>
</span>

<span class="hover-card-trigger" tabindex="0" style="anchor-name: --hc-3;">
    <span class="badge badge-outline" style="cursor:default;">
        typescript@5.4.5
    </span>
    <span class="hover-card-content" style="position-anchor: --hc-3;">
        <div style="display: flex; flex-direction: column; gap: 0.25rem;">
            <div style="font-weight:500;font-size:0.875rem;">TypeScript</div>
            <div style="font-size:0.75rem;color:var(--muted-foreground);">TypeScript is a language for application-scale JavaScript.</div>
            <div style="display: flex; align-items: center; margin-top: 0.25rem;">
                <span class="badge badge-default">Apache-2.0</span>
            </div>
        </div>
    </span>
</span>
```

### Placements

```html
<span class="hover-card-trigger" style="anchor-name:--hcs-b;">
    <button class="btn btn-outline btn-sm">Bottom</button>
    <span class="hover-card-content" data-placement="bottom" style="position-anchor:--hcs-b;position-try-fallbacks:none;">
        <div style="font-weight:500;font-size:0.875rem;margin-bottom:0.25rem;">Bottom</div>
        <p style="margin:0;font-size:0.75rem;color:var(--muted-foreground);">Opens below the trigger element.</p>
    </span>
</span>

<span class="hover-card-trigger" style="anchor-name:--hcs-t;">
    <button class="btn btn-outline btn-sm">Top</button>
    <span class="hover-card-content" data-placement="top" style="position-anchor:--hcs-t;position-try-fallbacks:none;">
        <div style="font-weight:500;font-size:0.875rem;margin-bottom:0.25rem;">Top</div>
        <p style="margin:0;font-size:0.75rem;color:var(--muted-foreground);">Opens above the trigger element.</p>
    </span>
</span>

<span class="hover-card-trigger" style="anchor-name:--hcs-r;">
    <button class="btn btn-outline btn-sm">Right</button>
    <span class="hover-card-content" data-placement="right" style="position-anchor:--hcs-r;position-try-fallbacks:none;">
        <div style="font-weight:500;font-size:0.875rem;margin-bottom:0.25rem;">Right</div>
        <p style="margin:0;font-size:0.75rem;color:var(--muted-foreground);">Opens to the right of the trigger.</p>
    </span>
</span>

<span class="hover-card-trigger" style="anchor-name:--hcs-l;">
    <button class="btn btn-outline btn-sm">Left</button>
    <span class="hover-card-content" data-placement="left" style="position-anchor:--hcs-l;position-try-fallbacks:none;">
        <div style="font-weight:500;font-size:0.875rem;margin-bottom:0.25rem;">Left</div>
        <p style="margin:0;font-size:0.75rem;color:var(--muted-foreground);">Opens to the left of the trigger.</p>
    </span>
</span>
```


---

## Input Group

A group of related inputs and addons, useful for combining labels, icons, and actions.

### Icon

```html
<div class="input-group">
    <div class="input-group-addon">
        <i data-lucide="search"></i>
    </div>
    <input type="text" class="input" placeholder="Search website...">
</div>
<div class="input-group">
    <input type="text" class="input" placeholder="Username">
    <div class="input-group-addon">
        <i data-lucide="user"></i>
    </div>
</div>
```

### Text

```html
<div class="input-group">
    <div class="input-group-addon">https://</div>
    <input type="text" class="input" placeholder="example.com">
</div>
<div class="input-group">
    <input type="text" class="input" placeholder="user-id">
    <div class="input-group-addon">@domain.com</div>
</div>
```

### Button

```html
<div class="input-group">
    <div class="input-group-addon">
        <button class="btn btn-secondary">Copy Link</button>
    </div>
    <input type="text" class="input" value="https://example.com/share/unique-id" readonly>
</div>
<div class="input-group">
    <input type="text" class="input" placeholder="Enter website URL">
    <div class="input-group-addon">
        <button class="btn btn-primary">Connect</button>
    </div>
</div>
<div class="input-group">
    <input type="text" class="input" placeholder="Filter items...">
    <div class="input-group-addon">
        <button class="btn btn-ghost btn-icon" aria-label="Filter">
            <i data-lucide="filter"></i>
        </button>
    </div>
</div>
```

### Kbd

```html
<div class="input-group">
    <div class="input-group-addon">
        <i data-lucide="help-circle"></i>
    </div>
    <input type="text" class="input" placeholder="Search help articles...">
    <div class="input-group-addon">
        <kbd class="kbd"><i data-lucide="command"></i> K</kbd>
    </div>
</div>
```

### Dropdown

```html
<div class="input-group" style="width:380px; anchor-name: --dd-ig-1;">
    <div class="input-group-addon">
        <button class="btn btn-secondary" popovertarget="dd-ig-1">
            Method <i data-lucide="chevron-down"></i>
        </button>
        <menu id="dd-ig-1" popover class="dropdown" style="position-anchor: --dd-ig-1;"
            data-placement="bottom-start">
            <button class="menu-item" role="menuitem">GET</button>
            <button class="menu-item" role="menuitem">POST</button>
            <button class="menu-item" role="menuitem">PUT</button>
            <button class="menu-item" role="menuitem">DELETE</button>
        </menu>
    </div>
    <input type="text" class="input" placeholder="/api/v1/users">
</div>
```

### Spinner

```html
<div class="input-group">
    <input type="text" class="input" placeholder="Validating connection...">
    <div class="input-group-addon">
        <div class="spinner spinner-xs"></div>
    </div>
</div>
```

### Textarea

```html
<div class="input-group editor-showcase">
        <!-- Header -->
        <div class="input-group-addon editor-header" style="justify-content: space-between;">
            <div style="display: flex; align-items: center; gap: 0.5rem; color: var(--muted-foreground);">
                <i style="width: 1rem; height: 1rem;" data-lucide="file-text"></i>
                <span style="font-family: ui-monospace, monospace;">notes.txt</span>
            </div>
            <div style="display: flex; align-items: center; gap: 0.25rem;">
                <button class="btn btn-ghost btn-icon-xs" style="color:var(--muted-foreground);"><i
                        data-lucide="edit-3"></i></button>
                <button class="btn btn-ghost btn-icon-xs" style="color:var(--muted-foreground);"><i
                        data-lucide="save"></i></button>
            </div>
        </div>
 
        <!-- Editor Area -->
        <textarea class="textarea"
            style="padding:1rem;font-family:ui-monospace,monospace;font-size:0.875rem;line-height:1.6;min-height:240px;background:transparent;"
            spellcheck="false">Dear Team,
 
I've updated the project roadmap for Q3. 
Please review the latest design changes and provide feedback.
 
- New landing page
- Improved onboarding
- Refined typography
 
Best,
Alex</textarea>
 
        <!-- Footer -->
        <div class="input-group-addon editor-footer" style="justify-content: space-between;">
            <span style="font-size:0.75rem;color:var(--muted-foreground);font-family:ui-monospace,monospace;">Markdown</span>
            <button class="btn btn-primary btn-sm"
                style="display: flex; align-items: center; gap: 0.5rem; height: 1.75rem; border-radius: min(var(--radius), 6px);">
                Save Changes <i style="width: 0.875rem; height: 0.875rem;" data-lucide="check"></i>
            </button>
        </div>
    </div>
```

### Custom Input

```html
<div class="input-group">
    <div class="input-group-addon"><i data-lucide="user"></i></div>
    <input type="text" class="input" placeholder="u-xxxxxxxxxx">
    <div class="input-group-addon">User</div>
</div>
<div class="input-group">
    <div class="input-group-addon">
        <i data-lucide="credit-card"></i>
    </div>
    <input type="number" class="input" placeholder="100.00">
    <div class="input-group-addon">
        <span style="font-size:0.75rem;font-weight:600;color:var(--muted-foreground);">USD</span>
    </div>
</div>
```


---

## Input

Displays a form input field or a component that looks like an input field.

### Basic

```html
<div style="width: 100%; max-width: 320px;">
    <input type="text" class="input" placeholder="Project Name">
</div>
```

### Field

```html
<div style="display: flex; flex-direction: column; gap: 0.375rem; width: 100%; max-width: 320px;">
    <label for="f-endpoint" class="label">Website URL</label>
    <input type="text" id="f-endpoint" class="input" placeholder="https://example.com">
</div>
```

### Disabled

```html
<div style="width: 100%; max-width: 320px;">
    <input disabled type="text" class="input" value="my-personal-website">
</div>
```

### Invalid

```html
<div style="display: flex; flex-direction: column; gap: 0.375rem; width: 100%; max-width: 320px;">
    <label for="inv-age" class="label">Age</label>
    <input type="number" id="inv-age" class="input" value="-5" aria-invalid="true">
    <p style="font-size:0.875rem;color:var(--destructive);margin:0;">Age must be a positive number.</p>
</div>
```

### File

Use the `type="file"` prop to create a file input.

```html
<div style="display: flex; flex-direction: column; gap: 0.375rem; width: 100%; max-width: 320px;">
    <label for="file-up" class="label">Profile Picture</label>
    <input type="file" id="file-up" class="input" accept=".jpg,.png">
    <p style="font-size:0.875rem;color:var(--muted-foreground);margin:0;">Upload a square image (.jpg or .png).</p>
</div>
```

### Inline

Horizontal layout using simple flex alignment on the wrapper.

```html
<div style="display: flex; align-items: center; gap: 1rem; width: 100%; max-width: 320px;">
    <label for="inl-token" class="label" style="flex-shrink:0;">Secret</label>
    <input type="password" id="inl-token" class="input" placeholder="Access Token">
</div>
```

### Required

```html
<div style="display: flex; flex-direction: column; gap: 0.375rem; width: 100%; max-width: 320px;">
    <label for="req-email" class="label">Email Address <span style="color:var(--destructive);">*</span></label>
    <input type="email" id="req-email" class="input" placeholder="alex@example.com" required>
</div>
```

### Badge

```html
<div style="display: flex; flex-direction: column; gap: 0.375rem; width: 100%; max-width: 320px;">
    <div style="display: flex; align-items: center; justify-content: space-between;">
        <label for="b-proj" class="label">Project Title</label>
        <span class="badge badge-secondary" style="font-size:0.75rem;padding:0.125rem 0.5rem;border-radius:9999px;">Private</span>
    </div>
    <input type="text" id="b-proj" class="input" value="Marketing Strategy 2024">
</div>
```

### With Button

```html
<div style="display: flex; gap: 0.5rem; width: 100%; max-width: 320px;">
    <input type="text" id="bg-domain" class="input" placeholder="Custom Domain" style="flex:1; min-width:0;">
    <button class="btn btn-outline" style="flex:none;">Verify</button>
</div>
```

### Form

```html
<form class="card" style="width: 100%; max-width: 380px;">
    <div class="card-header">
        <div class="card-title">Update Profile</div>
        <div class="card-description">Manage your public information and preferences.</div>
    </div>
    <div class="card-content" style="display: flex; flex-direction: column; gap: 1.25rem;">
        <div style="display: flex; flex-direction: column; gap: 0.375rem;">
            <label for="form-name" class="label">Display Name</label>
            <input type="text" id="form-name" class="input" placeholder="Alex" required>
        </div>
        <div style="display: flex; flex-direction: column; gap: 0.375rem;">
            <label for="form-pass" class="label">New Password</label>
            <input type="password" id="form-pass" class="input" required>
        </div>
    </div>
    <div class="card-footer">
        <button class="btn btn-primary" style="width:100%;">Save Changes</button>
    </div>
</form>
```


---

## Kbd

Keyboard key indicator.

```html
<p style="display: flex; align-items: center; gap: 0.375rem;">
    <span>Press</span>
    <span class="kbd-group">
        <kbd class="kbd"><i data-lucide="command" style="width: 12px; height: 12px;"></i></kbd>
        <kbd class="kbd">P</kbd>
    </span>
    <span>to search files.</span>
</p>
```

### Combinations

```html
<div class="kbd-group" style="display: flex; align-items: center; gap: 0.25rem;">
    <kbd class="kbd">Ctrl</kbd>
    <span style="font-size: 0.875rem;">+</span>
    <kbd class="kbd"><i data-lucide="arrow-big-up" style="width: 12px; height: 12px;"></i></kbd>
    <span style="font-size: 0.875rem;">+</span>
    <kbd class="kbd">B</kbd>
</div>
```

### Common Keys

```html
<div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
    <kbd class="kbd"><i data-lucide="command" style="width: 12px; height: 12px;"></i></kbd>
    <span>Command</span>
</div>
<div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
    <kbd class="kbd"><i data-lucide="arrow-big-up" style="width: 12px; height: 12px;"></i></kbd>
    <span>Shift</span>
</div>
<div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
    <kbd class="kbd"><i data-lucide="option" style="width: 12px; height: 12px;"></i></kbd>
    <span>Option</span>
</div>
<div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
    <kbd class="kbd"><i data-lucide="arrow-up" style="width: 12px; height: 12px;"></i></kbd>
    <span>Up</span>
</div>
<div style="display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
    <kbd class="kbd">Esc</kbd>
    <span>Escape</span>
</div>
```


---

## Label

Renders an accessible label associated with controls.

```html
<div style="display: flex; align-items: center;">
    <input type="checkbox" id="terms" class="checkbox">
    <label for="terms" class="label">Accept terms and conditions</label>
</div>
```


---

## Pagination

Page navigation controls.

```html
<nav aria-label="pagination" class="pagination">
    <ul class="pagination-content">
        <li class="pagination-item">
            <button class="btn btn-ghost" aria-label="Go to previous page">
                <i data-lucide="chevron-left"></i>
                <span>Prev</span>
            </button>
        </li>
        <li class="pagination-item">
            <button class="btn btn-ghost btn-icon">1</button>
        </li>
        <li class="pagination-item">
            <button class="btn btn-outline btn-icon" aria-current="page">2</button>
        </li>
        <li class="pagination-item">
            <button class="btn btn-ghost btn-icon">3</button>
        </li>
        <li class="pagination-item">
            <span class="pagination-ellipsis" aria-label="More pages">
                <i data-lucide="ellipsis" aria-hidden="true"></i>
            </span>
        </li>
        <li class="pagination-item">
            <button class="btn btn-ghost" aria-label="Go to next page">
                <span>Next</span>
                <i data-lucide="chevron-right"></i>
            </button>
        </li>
    </ul>
</nav>
```


---

## Popover

Floating panel anchored to a trigger using native Popover and CSS Anchor Positioning APIs.

### Basic

```html
<button popovertarget="p-basic" class="btn btn-outline" style="anchor-name: --a-basic;">View Profile</button>
<div id="p-basic" popover class="popover" data-placement="bottom-start" style="position-anchor: --a-basic;">
    <p style="margin:0;">Profile updated successfully.</p>
</div>
```

### With Form

Popovers can contain complex forms and structured content.

```html
<button popovertarget="p-form" class="btn btn-outline" style="anchor-name: --a-form;">
    Quick Settings
</button>
<div id="p-form" popover class="popover" data-placement="bottom-start" style="position-anchor: --a-form;">
    <header class="popover-header">
        <h4 class="popover-title">Dimensions</h4>
        <p class="popover-description">Set the default size for your project.</p>
    </header>
    <div style="height: 1px; background: var(--border); margin: 0 -0.625rem;"></div>
    <div style="display: grid; gap: 0.75rem; padding-top: 0.25rem;">
        <div style="align-items: center; gap: 1rem;">
            <label class="label">Width (px)</label>
            <input class="input" type="number" value="1200">
        </div>
        <div style="align-items: center; gap: 1rem;">
            <label class="label">Height (px)</label>
            <input class="input" type="number" value="800">
        </div>
        <div style="align-items: center; gap: 1rem;">
            <label class="label">Padding</label>
            <input class="input" value="20px">
        </div>
    </div>
    <div style="margin-top: 0.75rem;">
         <button class="btn btn-sm btn-primary" style="width: 100%;">Apply</button>
    </div>
</div>
```

### Placements

Use the `data-placement` attribute to dictate explicit edge and placement pinning.

```html
<button popovertarget="p-ts" class="btn btn-secondary btn-sm" style="anchor-name: --a-ts;">Top-Start</button>
<div id="p-ts" popover class="popover" data-placement="top-start" style="position-anchor: --a-ts; width: auto;">
    <div class="popover-title">Top-start</div>
</div>

<button popovertarget="p-t" class="btn btn-secondary btn-sm" style="anchor-name: --a-t;">Top</button>
<div id="p-t" popover class="popover" data-placement="top" style="position-anchor: --a-t; width: auto;">
    <div class="popover-title">Top</div>
</div>

<button popovertarget="p-te" class="btn btn-secondary btn-sm" style="anchor-name: --a-te;">Top-End</button>
<div id="p-te" popover class="popover" data-placement="top-end" style="position-anchor: --a-te; width: auto;">
    <div class="popover-title">Top-end</div>
</div>

<button popovertarget="p-bs" class="btn btn-secondary btn-sm" style="anchor-name: --a-bs;">Bottom-Start</button>
<div id="p-bs" popover class="popover" data-placement="bottom-start" style="position-anchor: --a-bs; width: auto;">
    <div class="popover-title">Bottom-start</div>
</div>

<button popovertarget="p-b" class="btn btn-secondary btn-sm" style="anchor-name: --a-b;">Bottom</button>
<div id="p-b" popover class="popover" data-placement="bottom" style="position-anchor: --a-b; width: auto;">
    <div class="popover-title">Bottom</div>
</div>

<button popovertarget="p-be" class="btn btn-secondary btn-sm" style="anchor-name: --a-be;">Bottom-End</button>
<div id="p-be" popover class="popover" data-placement="bottom-end" style="position-anchor: --a-be; width: auto;">
    <div class="popover-title">Bottom-end</div>
</div>

<button popovertarget="p-ls" class="btn btn-secondary btn-sm" style="anchor-name: --a-ls;">Left-Start</button>
<div id="p-ls" popover class="popover" data-placement="left-start" style="position-anchor: --a-ls; width: auto;">
    <div class="popover-title">Left-start</div>
</div>

<button popovertarget="p-l" class="btn btn-secondary btn-sm" style="anchor-name: --a-l;">Left</button>
<div id="p-l" popover class="popover" data-placement="left" style="position-anchor: --a-l; width: auto;">
    <div class="popover-title">Left</div>
</div>

<button popovertarget="p-le" class="btn btn-secondary btn-sm" style="anchor-name: --a-le;">Left-End</button>
<div id="p-le" popover class="popover" data-placement="left-end" style="position-anchor: --a-le; width: auto;">
    <div class="popover-title">Left-end</div>
</div>

<button popovertarget="p-rs" class="btn btn-secondary btn-sm" style="anchor-name: --a-rs;">Right-Start</button>
<div id="p-rs" popover class="popover" data-placement="right-start" style="position-anchor: --a-rs; width: auto;">
    <div class="popover-title">Right-start</div>
</div>

<button popovertarget="p-r" class="btn btn-secondary btn-sm" style="anchor-name: --a-r;">Right</button>
<div id="p-r" popover class="popover" data-placement="right" style="position-anchor: --a-r; width: auto;">
    <div class="popover-title">Right</div>
</div>

<button popovertarget="p-re" class="btn btn-secondary btn-sm" style="anchor-name: --a-re;">Right-End</button>
<div id="p-re" popover class="popover" data-placement="right-end" style="position-anchor: --a-re; width: auto;">
    <div class="popover-title">Right-end</div>
</div>
```


---

## Progress

Displays an indicator showing the completion progress of a task, with support for various functional color states.

### Default (Accent)

```html
<div style="width: 100%; max-width: 400px; display: flex; flex-direction: column; gap: 0.5rem;">
    <div style="display: flex; justify-content: space-between; font-size: 0.875rem;">
        <span style="font-weight: 500;">Downloading Assets</span>
        <span style="color: var(--muted-foreground);">60%</span>
    </div>
    <progress class="progress" value="60" max="100" style="width:100%;"></progress>
</div>
```

### Variants

```html
<!-- Primary -->
<div style="width: 100%; max-width: 400px; display: flex; flex-direction: column; gap: 0.5rem;">
    <div style="display: flex; justify-content: space-between; font-size: 0.875rem;">
        <span style="font-weight: 500;">Indexing Files</span>
        <span style="color: var(--muted-foreground);">75%</span>
    </div>
    <progress class="progress progress-primary" value="75" max="100" style="width:100%;"></progress>
</div>

<!-- Success -->
<div style="width: 100%; max-width: 400px; display: flex; flex-direction: column; gap: 0.5rem;">
    <div style="display: flex; justify-content: space-between; font-size: 0.875rem;">
        <span style="font-weight: 500;">Task Completed</span>
        <span style="color: var(--muted-foreground);">100%</span>
    </div>
    <progress class="progress progress-success" value="100" max="100" style="width:100%;"></progress>
</div>

<!-- Warning -->
<div style="width: 100%; max-width: 400px; display: flex; flex-direction: column; gap: 0.5rem;">
    <div style="display: flex; justify-content: space-between; font-size: 0.875rem;">
        <span style="font-weight: 500;">Storage Usage</span>
        <span style="color: var(--muted-foreground);">85%</span>
    </div>
    <progress class="progress progress-warning" value="85" max="100" style="width:100%;"></progress>
</div>

<!-- Destructive -->
<div style="width: 100%; max-width: 400px; display: flex; flex-direction: column; gap: 0.5rem;">
    <div style="display: flex; justify-content: space-between; font-size: 0.875rem;">
        <span style="font-weight: 500;">Memory Usage</span>
        <span style="color: var(--muted-foreground);">98%</span>
    </div>
    <progress class="progress progress-destructive" value="98" max="100" style="width:100%;"></progress>
</div>
```

### Indeterminate

```html
<progress class="progress" style="width: 100%; max-width: 400px;"></progress>
<progress class="progress progress-primary" style="width: 100%; max-width: 400px;"></progress>
```


---

## Radio Group

A set of checkable buttons—known as radio buttons—where no more than one of the buttons can be checked at a time.

```html
<div class="radio-group" style="flex-direction: column;">
    <label class="radio-label">
        <input type="radio" class="radio" name="env" value="dev">
        <span>Development</span>
    </label>
    <label class="radio-label">
        <input type="radio" class="radio" name="env" value="stage" checked>
        <span>Staging</span>
    </label>
    <label class="radio-label">
        <input type="radio" class="radio" name="env" value="prod">
        <span>Production</span>
    </label>
</div>
```

### With Description

```html
<div style="display:grid;gap:0.75rem;max-width:320px;width:100%;">
    <label style="display:grid;grid-template-columns:auto 1fr;gap:0.375rem 0.75rem;align-items:start;cursor:default;">
        <input type="radio" class="radio" name="size" value="small" style="margin-top:3px;">
        <div>
            <span class="label" style="display:block;">Small</span>
            <span style="font-size:0.75rem;color:var(--muted-foreground);">Perfect for personal use and side projects.</span>
        </div>
    </label>
    <label style="display:grid;grid-template-columns:auto 1fr;gap:0.375rem 0.75rem;align-items:start;cursor:default;">
        <input type="radio" class="radio" name="size" value="medium" checked style="margin-top:3px;">
        <div>
            <span class="label" style="display:block;">Medium</span>
            <span style="font-size:0.75rem;color:var(--muted-foreground);">Balanced performance for professional teams.</span>
        </div>
    </label>
    <label style="display:grid;grid-template-columns:auto 1fr;gap:0.375rem 0.75rem;align-items:start;cursor:default;">
        <input type="radio" class="radio" name="size" value="large" style="margin-top:3px;">
        <div>
            <span class="label" style="display:block;">Large</span>
            <span style="font-size:0.75rem;color:var(--muted-foreground);">High-performance resources for complex workflows.</span>
        </div>
    </label>
</div>
</div>
```

### Choice Card

Card-style selection where the wrapper acts as a clickable card pattern.

```html
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; width: 100%; max-width: 500px;">
    <label class="card radio-card-showcase" style="display: flex; flex-direction: column; padding: 1rem; gap: 1rem; cursor: pointer;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <input type="radio" class="radio" name="plan_sub">
        </div>
        <div style="display: flex; flex-direction: column; gap: 0.25rem;">
            <span style="font-size: 1rem; font-weight: 500;">Monthly</span>
            <span style="font-size: 0.875rem; color: var(--muted-foreground);">USD 20.00/month + tax</span>
        </div>
    </label>
    
    <label class="card radio-card-showcase" style="display: flex; flex-direction: column; padding: 1rem; gap: 1rem; cursor: pointer;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <input type="radio" class="radio" name="plan_sub" checked>
            <span class="badge badge-secondary" style="background-color: color-mix(in oklch, var(--accent) 20%, transparent); color: var(--accent); border: none;">Save 17%</span>
        </div>
        <div style="display: flex; flex-direction: column; gap: 0.25rem;">
            <span style="font-size: 1rem; font-weight: 500;">Yearly</span>
            <span style="font-size: 0.875rem; color: var(--muted-foreground);">USD 200.00/year + tax</span>
        </div>
    </label>
</div>
```

### Disabled

```html
<div class="radio-group" style="flex-direction: column;">
    <label class="radio-label">
        <input type="radio" class="radio" name="dis-theme" value="light" checked disabled>
        <span>Light Theme</span>
    </label>
    <label class="radio-label">
        <input type="radio" class="radio" name="dis-theme" value="dark" disabled>
        <span>Dark Theme</span>
    </label>
</div>
```


---

## Select

Displays a list of options for the user to pick from—triggered by a button.

```html
<select class="select" style="max-width:220px;width:100%;">
    <button>
        <selectedcontent></selectedcontent>
        <i data-lucide="chevron-down" class="select-indicator"></i>
    </button>
    <option value="" disabled selected hidden>Select project type…</option>
    <option value="design">Design</option>
    <option value="marketing">Marketing</option>
    <option value="research">Research</option>
    <option value="development">Development</option>
</select>
```

### Scrollable

Select menus automatically handle vertical scrolling when content exceeds the viewport height.

```html
<select class="select" style="max-width:280px;width:100%;">
    <button>
        <selectedcontent></selectedcontent>
        <i data-lucide="chevron-down" class="select-indicator"></i>
    </button>
    <option value="" disabled selected hidden>Select timezone…</option>
    <option value="utc-12">(UTC-12:00) International Date Line West</option>
    <option value="utc-11">(UTC-11:00) Coordinated Universal Time-11</option>
    <option value="utc-10">(UTC-10:00) Hawaii</option>
    <option value="utc-9">(UTC-09:00) Alaska</option>
    <option value="utc-8">(UTC-08:00) Pacific Time (US & Canada)</option>
    <option value="utc-7">(UTC-07:00) Mountain Time (US & Canada)</option>
    <option value="utc-6">(UTC-06:00) Central Time (US & Canada)</option>
    <option value="utc-5">(UTC-05:00) Eastern Time (US & Canada)</option>
    <option value="utc-4">(UTC-04:00) Atlantic Time (Canada)</option>
    <option value="utc-3">(UTC-03:00) Brasilia</option>
    <option value="utc-2">(UTC-02:00) Coordinated Universal Time-02</option>
    <option value="utc-1">(UTC-01:00) Azores</option>
    <option value="utc+0">(UTC+00:00) London, Dublin, Lisbon</option>
</select>
```

### Groups

Organize options into groups using the native `optgroup` element.

```html
<select class="select" style="max-width:280px;width:100%;">
    <button>
        <selectedcontent></selectedcontent>
        <i data-lucide="chevron-down" class="select-indicator"></i>
    </button>
    <option value="" disabled selected hidden>Select a framework…</option>
    <optgroup>
      <legend>Frontend</legend>
      <option value="react">React</option>
      <option value="vue">Vue.js</option>
      <option value="svelte">Svelte</option>
      <option value="angular">Angular</option>
    </optgroup>
    <optgroup>
      <legend>Backend</legend>
      <option value="express">Express</option>
      <option value="nestjs">NestJS</option>
      <option value="fastapi">FastAPI</option>
      <option value="django">Django</option>
    </optgroup>
</select>
```

### Disabled

Disable the entire select to prevent user interaction.

```html
<select class="select" disabled style="max-width:220px;width:100%;">
    <button>
        <selectedcontent></selectedcontent>
        <i data-lucide="chevron-down" class="select-indicator"></i>
    </button>
    <option value="" disabled selected hidden>Select country…</option>
    <option value="us">United States</option>
    <option value="uk">United Kingdom</option>
</select>
```

### Invalid

Use the `aria-invalid` attribute to indicate a validation error state.

```html
<select class="select" aria-invalid="true" style="max-width:220px;width:100%;">
    <button>
        <selectedcontent></selectedcontent>
        <i data-lucide="chevron-down" class="select-indicator"></i>
    </button>
    <option value="" disabled selected hidden>Select category…</option>
    <option value="general">General</option>
    <option value="professional">Professional</option>
</select>
```

### Native Select

A styled native HTML `<select>` element with consistent design system integration, relying on native OS dropdown menus for maximum compatibility.

```html
<div style="position: relative; max-width:220px; width:100%;">
    <select class="input" style="appearance: none; padding-right: 2rem; cursor: pointer;">
        <option value="" disabled selected hidden>Select version…</option>
        <option value="1.0">v1.0</option>
        <option value="2.0">v2.0</option>
        <option value="3.0">v3.0</option>
    </select>
    <i data-lucide="chevron-down" class="text-muted-foreground" style="position: absolute; right: 0.75rem; top: 50%; translate: 0 -50%; width: 1rem; height: 1rem; pointer-events: none; opacity: 0.5;"></i>
</div>
```


---

## Separator

Visually or semantically separates content.

```html
<div style="width:100%;max-width:400px;">
    <div style="font-size:0.875rem;">
        <div style="font-weight:500;line-height:1.5;">Account Settings</div>
        <p style="margin:0.25rem 0 0;font-size:0.875rem;color:var(--muted-foreground);">Manage your profile and preferences.</p>
    </div>
    <div class="separator" style="margin:1rem 0;"></div>
    <div style="display: flex; align-items: center; gap: 1rem;">
        <span>Profile</span>
        <div class="separator" style="height: 1rem;" aria-orientation="vertical"></div>
        <span>Security</span>
        <div class="separator" style="height: 1rem;" aria-orientation="vertical"></div>
        <span>Notifications</span>
    </div>
</div>
```


---

## Sheet

Slide-in panel from any edge. Extends dialog styles.

### Top

A sheet that slides in from the top of the viewport.

```html
<button class="btn btn-outline" commandfor="sheet-top" command="show-modal">Open Top Sheet</button>
<dialog id="sheet-top" class="dialog sheet sheet-side-top" onclick="if(event.target===this)this.close()">
    <button class="btn btn-ghost btn-icon-sm sheet-close" commandfor="sheet-top" command="close" aria-label="Close">
        <i data-lucide="x"></i>
    </button>
    <div class="sheet-header">
        <p class="sheet-title">Global Search</p>
        <p class="sheet-description">Search projects, files, or documentation.</p>
    </div>
    <div class="sheet-content" style="display: flex; flex-direction: column; gap: 1rem;">
        <input type="text" class="input" placeholder="Search...">
    </div>
</dialog>
```

### Right

A sheet that slides in from the right of the viewport. This is the default placement.

```html
<button class="btn btn-outline" commandfor="sheet-right" command="show-modal">Open Right Sheet</button>
<dialog id="sheet-right" class="dialog sheet sheet-side-right" onclick="if(event.target===this)this.close()">
    <button class="btn btn-ghost btn-icon-sm sheet-close" commandfor="sheet-right" command="close" aria-label="Close">
        <i data-lucide="x"></i>
    </button>
    <div class="sheet-header">
        <p class="sheet-title">Edit Profile</p>
        <p class="sheet-description">Update your personal information and preferences.</p>
    </div>
    <div class="sheet-content" style="display: flex; flex-direction: column; gap: 1.5rem;">
        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
            <label class="label">Display Name</label>
            <input type="text" class="input" placeholder="e.g. Alex" value="Alex">
        </div>
        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
            <label class="label">Bio</label>
            <textarea class="textarea" placeholder="Tell us about yourself..."></textarea>
        </div>
    </div>
    <div class="sheet-footer">
        <button class="btn" style="width: 100%;" commandfor="sheet-right" command="close">Save Changes</button>
    </div>
</dialog>
```

### Bottom

A sheet that slides in from the bottom of the viewport.

```html
<button class="btn btn-outline" commandfor="sheet-bottom" command="show-modal">Open Bottom Sheet</button>
<dialog id="sheet-bottom" class="dialog sheet sheet-side-bottom" onclick="if(event.target===this)this.close()">
    <button class="btn btn-ghost btn-icon-sm sheet-close" commandfor="sheet-bottom" command="close" aria-label="Close">
        <i data-lucide="x"></i>
    </button>
    <div class="sheet-header">
        <p class="sheet-title">Project Actions</p>
        <p class="sheet-description">Manage the current task workflow.</p>
    </div>
    <div class="sheet-content" style="flex-direction: row; flex-wrap: wrap;">
        <button class="btn btn-outline" style="flex: 1; min-width: 120px;" commandfor="sheet-bottom" command="close">
            <i data-lucide="archive" style="width:16px;height:16px;margin-right: 0.5rem;"></i> Archive
        </button>
        <button class="btn btn-primary" style="flex: 1; min-width: 120px;" commandfor="sheet-bottom" command="close">
            <i data-lucide="check" style="width:16px;height:16px;margin-right: 0.5rem;"></i> Complete
        </button>
    </div>
</dialog>
```

### Left

A sheet that slides in from the left of the viewport.

```html
<button class="btn btn-outline" commandfor="sheet-left" command="show-modal">Open Left Sheet</button>
<dialog id="sheet-left" class="dialog sheet sheet-side-left" onclick="if(event.target===this)this.close()">
    <button class="btn btn-ghost btn-icon-sm sheet-close" commandfor="sheet-left" command="close" aria-label="Close">
        <i data-lucide="x"></i>
    </button>
    <div class="sheet-header">
        <p class="sheet-title">Main Menu</p>
        <p class="sheet-description">Access different sections of the application.</p>
    </div>
    <nav class="sheet-content">
        <a href="#" class="btn btn-ghost" style="gap: 0.5rem; justify-content: flex-start;">
            <i data-lucide="home" style="width:16px;height:16px;"></i> Dashboard
        </a>
        <a href="#" class="btn btn-ghost" style="gap: 0.5rem; justify-content: flex-start;">
            <i data-lucide="folder" style="width:16px;height:16px;"></i> Projects
        </a>
        <a href="#" class="btn btn-ghost" style="gap: 0.5rem; justify-content: flex-start;">
            <i data-lucide="users" style="width:16px;height:16px;"></i> Team
        </a>
        <div class="separator" style="margin: calc(var(--spacing) * 2) 0;"></div>
        <a href="#" class="btn btn-ghost" style="gap: 0.5rem; justify-content: flex-start;">
            <i data-lucide="settings" style="width:16px;height:16px;"></i> Settings
        </a>
    </nav>
</dialog>
```


---

## Sidebar

Responsive, collapsible application sidebar with rail mode, nested navigation, and visibility control.

### Offcanvas Mode

Disappears completely when collapsed.

```html
<div class="sidebar-provider" data-state="open" style="height: 460px; border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden;">
  <aside class="sidebar" id="sidebar-default-offcanvas" role="navigation" data-collapsible="offcanvas">
    <header class="sidebar-header">
      <span class="sidebar-expanded-only" style="font-weight: 700; font-size: 1.1rem; letter-spacing: -0.02em;">Acme Corp</span>
      <i data-lucide="command" class="sidebar-collapsed-only" style="width: 1.4rem; height: 1.4rem; color: var(--primary);"></i>
    </header>

    <nav class="sidebar-content">
      <div class="sidebar-group-label"><span class="sidebar-expanded-only">Platform</span></div>
      <ul class="sidebar-menu">
        <li>
          <a href="javascript:void(0)" class="sidebar-menu-button active" title="Dashboard">
            <i data-lucide="layout-dashboard"></i>
            <span class="sidebar-expanded-only">Dashboard</span>
          </a>
        </li>
        <li>
          <a href="javascript:void(0)" class="sidebar-menu-button" title="Inbox">
            <i data-lucide="inbox"></i>
            <span class="sidebar-expanded-only">Inbox</span>
          </a>
        </li>
        <li>
          <a href="javascript:void(0)" class="sidebar-menu-button" title="Analytics">
            <i data-lucide="bar-chart-2"></i>
            <span class="sidebar-expanded-only">Analytics</span>
          </a>
        </li>
        <li>
          <details class="sidebar-group" open>
            <summary class="sidebar-menu-button" title="Projects">
              <div class="summary-content">
                <i data-lucide="folder" class="sidebar-collapsed-only"></i>
                <i data-lucide="folder-open" class="sidebar-expanded-only"></i>
              </div>
              <span class="sidebar-expanded-only">Projects</span>
            </summary>
            <ul class="sidebar-menu sidebar-menu-sub">
              <li><a href="javascript:void(0)" class="sidebar-menu-button"><span class="sidebar-expanded-only">Frontend</span></a></li>
              <li><a href="javascript:void(0)" class="sidebar-menu-button"><span class="sidebar-expanded-only">Backend</span></a></li>
            </ul>
          </details>
        </li>
        <li>
          <a href="javascript:void(0)" class="sidebar-menu-button" title="Settings">
            <i data-lucide="settings"></i>
            <span class="sidebar-expanded-only">Settings</span>
          </a>
        </li>
      </ul>
    </nav>

    <footer class="sidebar-footer">
      <button aria-haspopup="menu" popovertarget="sidebar-footer-menu-sidebar-default-offcanvas" class="btn btn-ghost sidebar-footer-user" style="anchor-name: --sidebar-footer-sidebar-default-offcanvas-anchor;" title="Profile">
        <span class="avatar">
          <img src="https://i.pravatar.cc/80" alt="Alex" class="avatar-image"><span class="avatar-fallback">AL</span>
        </span>
        <div class="sidebar-expanded-only footer-user-info">
          <span class="user-name">Alex</span>
          <span class="user-role">Admin</span>
        </div>
        <i data-lucide="chevron-up" class="sidebar-expanded-only chevron"></i>
      </button>

      <menu id="sidebar-footer-menu-sidebar-default-offcanvas" popover class="dropdown" data-placement="top-start" role="menu" style="position-anchor: --sidebar-footer-sidebar-default-offcanvas-anchor; width: anchor-size(width);">
        <div class="menu-label">My Account</div>
        <button class="menu-item" role="menuitem"><i data-lucide="user"></i>Profile</button>
        <div class="menu-separator"></div>
        <button class="menu-item menu-item-destructive" role="menuitem"><i data-lucide="log-out"></i>Log out</button>
      </menu>
    </footer>
  </aside>

  <div class="sidebar-inset">
    <header class="topnav">
      <button class="btn btn-ghost btn-icon-sm sidebar-trigger" aria-label="Toggle Sidebar"><i data-lucide="panel-left" style="stroke-width: 1.5;"></i></button>
      <span style="font-size: 0.875rem; font-weight: 500;">Dashboard</span>
    </header>
    <main>
      <div style="padding: 1.5rem;">
        <p style="color: var(--muted-foreground); font-size: 0.875rem;">Main content area.</p>
      </div>
    </main>
  </div>
</div>
```

### Icon Rail Mode

Shrinks to an icon-only rail.

```html
<div class="sidebar-provider" data-state="open" style="height: 460px; border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden;">
  <aside class="sidebar" id="sidebar-default-icon" role="navigation" data-collapsible="icon">
    <header class="sidebar-header">
      <span class="sidebar-expanded-only" style="font-weight: 700; font-size: 1.1rem; letter-spacing: -0.02em;">Acme Corp</span>
      <i data-lucide="command" class="sidebar-collapsed-only" style="width: 1.4rem; height: 1.4rem; color: var(--primary);"></i>
    </header>

    <nav class="sidebar-content">
      <div class="sidebar-group-label"><span class="sidebar-expanded-only">Platform</span></div>
      <ul class="sidebar-menu">
        <li>
          <a href="javascript:void(0)" class="sidebar-menu-button active" title="Dashboard">
            <i data-lucide="layout-dashboard"></i>
            <span class="sidebar-expanded-only">Dashboard</span>
          </a>
        </li>
        <li>
          <a href="javascript:void(0)" class="sidebar-menu-button" title="Inbox">
            <i data-lucide="inbox"></i>
            <span class="sidebar-expanded-only">Inbox</span>
          </a>
        </li>
        <li>
          <a href="javascript:void(0)" class="sidebar-menu-button" title="Analytics">
            <i data-lucide="bar-chart-2"></i>
            <span class="sidebar-expanded-only">Analytics</span>
          </a>
        </li>
        <li>
          <details class="sidebar-group" open>
            <summary class="sidebar-menu-button" title="Projects">
              <div class="summary-content">
                <i data-lucide="folder" class="sidebar-collapsed-only"></i>
                <i data-lucide="folder-open" class="sidebar-expanded-only"></i>
              </div>
              <span class="sidebar-expanded-only">Projects</span>
            </summary>
            <ul class="sidebar-menu sidebar-menu-sub">
              <li><a href="javascript:void(0)" class="sidebar-menu-button"><span class="sidebar-expanded-only">Frontend</span></a></li>
              <li><a href="javascript:void(0)" class="sidebar-menu-button"><span class="sidebar-expanded-only">Backend</span></a></li>
            </ul>
          </details>
        </li>
        <li>
          <a href="javascript:void(0)" class="sidebar-menu-button" title="Settings">
            <i data-lucide="settings"></i>
            <span class="sidebar-expanded-only">Settings</span>
          </a>
        </li>
      </ul>
    </nav>

    <footer class="sidebar-footer">
      <button aria-haspopup="menu" popovertarget="sidebar-footer-menu-sidebar-default-icon" class="btn btn-ghost sidebar-footer-user" style="anchor-name: --sidebar-footer-sidebar-default-icon-anchor;" title="Profile">
        <span class="avatar">
          <img src="https://i.pravatar.cc/80" alt="Alex" class="avatar-image"><span class="avatar-fallback">AL</span>
        </span>
        <div class="sidebar-expanded-only footer-user-info">
          <span class="user-name">Alex</span>
          <span class="user-role">Admin</span>
        </div>
        <i data-lucide="chevron-up" class="sidebar-expanded-only chevron"></i>
      </button>

      <menu id="sidebar-footer-menu-sidebar-default-icon" popover class="dropdown" data-placement="top-start" role="menu" style="position-anchor: --sidebar-footer-sidebar-default-icon-anchor; width: anchor-size(width);">
        <div class="menu-label">My Account</div>
        <button class="menu-item" role="menuitem"><i data-lucide="user"></i>Profile</button>
        <div class="menu-separator"></div>
        <button class="menu-item menu-item-destructive" role="menuitem"><i data-lucide="log-out"></i>Log out</button>
      </menu>
    </footer>
  </aside>

  <div class="sidebar-inset">
    <header class="topnav">
      <button class="btn btn-ghost btn-icon-sm sidebar-trigger" aria-label="Toggle Sidebar"><i data-lucide="arrow-left-to-line" class="sidebar-expanded-only" style="stroke-width: 1.5;"></i><i data-lucide="panel-left" class="sidebar-collapsed-only" style="stroke-width: 1.5;"></i></button>
      <span style="font-size: 0.875rem; font-weight: 500;">Dashboard</span>
    </header>
    <main>
      <div style="padding: 1.5rem;">
        <p style="color: var(--muted-foreground); font-size: 0.875rem;">Main content area.</p>
      </div>
    </main>
  </div>
</div>
```

### Always Open

Cannot be collapsed.

```html
<div class="sidebar-provider" data-state="open" style="height: 460px; border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden;">
  <aside class="sidebar" id="sidebar-default-none" role="navigation" data-collapsible="none">
    <header class="sidebar-header">
      <span class="sidebar-expanded-only" style="font-weight: 700; font-size: 1.1rem; letter-spacing: -0.02em;">Acme Corp</span>
      <i data-lucide="command" class="sidebar-collapsed-only" style="width: 1.4rem; height: 1.4rem; color: var(--primary);"></i>
    </header>

    <nav class="sidebar-content">
      <div class="sidebar-group-label"><span class="sidebar-expanded-only">Platform</span></div>
      <ul class="sidebar-menu">
        <li>
          <a href="javascript:void(0)" class="sidebar-menu-button active" title="Dashboard">
            <i data-lucide="layout-dashboard"></i>
            <span class="sidebar-expanded-only">Dashboard</span>
          </a>
        </li>
        <li>
          <a href="javascript:void(0)" class="sidebar-menu-button" title="Inbox">
            <i data-lucide="inbox"></i>
            <span class="sidebar-expanded-only">Inbox</span>
          </a>
        </li>
        <li>
          <a href="javascript:void(0)" class="sidebar-menu-button" title="Analytics">
            <i data-lucide="bar-chart-2"></i>
            <span class="sidebar-expanded-only">Analytics</span>
          </a>
        </li>
        <li>
          <details class="sidebar-group" open>
            <summary class="sidebar-menu-button" title="Projects">
              <div class="summary-content">
                <i data-lucide="folder" class="sidebar-collapsed-only"></i>
                <i data-lucide="folder-open" class="sidebar-expanded-only"></i>
              </div>
              <span class="sidebar-expanded-only">Projects</span>
            </summary>
            <ul class="sidebar-menu sidebar-menu-sub">
              <li><a href="javascript:void(0)" class="sidebar-menu-button"><span class="sidebar-expanded-only">Frontend</span></a></li>
              <li><a href="javascript:void(0)" class="sidebar-menu-button"><span class="sidebar-expanded-only">Backend</span></a></li>
            </ul>
          </details>
        </li>
        <li>
          <a href="javascript:void(0)" class="sidebar-menu-button" title="Settings">
            <i data-lucide="settings"></i>
            <span class="sidebar-expanded-only">Settings</span>
          </a>
        </li>
      </ul>
    </nav>

    <footer class="sidebar-footer">
      <button aria-haspopup="menu" popovertarget="sidebar-footer-menu-sidebar-default-none" class="btn btn-ghost sidebar-footer-user" style="anchor-name: --sidebar-footer-sidebar-default-none-anchor;" title="Profile">
        <span class="avatar">
          <img src="https://i.pravatar.cc/80" alt="Alex" class="avatar-image"><span class="avatar-fallback">AL</span>
        </span>
        <div class="sidebar-expanded-only footer-user-info">
          <span class="user-name">Alex</span>
          <span class="user-role">Admin</span>
        </div>
        <i data-lucide="chevron-up" class="sidebar-expanded-only chevron"></i>
      </button>

      <menu id="sidebar-footer-menu-sidebar-default-none" popover class="dropdown" data-placement="top-start" role="menu" style="position-anchor: --sidebar-footer-sidebar-default-none-anchor; width: anchor-size(width);">
        <div class="menu-label">My Account</div>
        <button class="menu-item" role="menuitem"><i data-lucide="user"></i>Profile</button>
        <div class="menu-separator"></div>
        <button class="menu-item menu-item-destructive" role="menuitem"><i data-lucide="log-out"></i>Log out</button>
      </menu>
    </footer>
  </aside>

  <div class="sidebar-inset">
    <header class="topnav">
      <span style="font-size: 0.875rem; font-weight: 500;">Console</span>
    </header>
    <main>
      <div style="padding: 1.5rem;">
        <p style="color: var(--muted-foreground); font-size: 0.875rem;">Main content area.</p>
      </div>
    </main>
  </div>
</div>
```

### Offcanvas Mode

Disappears completely when collapsed.

```html
<div class="sidebar-provider" data-state="open" style="height: 460px; border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden;">
  <aside class="sidebar" id="sidebar-inset-offcanvas" role="navigation" data-variant="inset" data-collapsible="offcanvas">
    <header class="sidebar-header">
      <span class="sidebar-expanded-only" style="font-weight: 700; font-size: 1.1rem; letter-spacing: -0.02em;">Acme Corp</span>
      <i data-lucide="command" class="sidebar-collapsed-only" style="width: 1.4rem; height: 1.4rem; color: var(--primary);"></i>
    </header>

    <nav class="sidebar-content">
      <div class="sidebar-group-label"><span class="sidebar-expanded-only">Platform</span></div>
      <ul class="sidebar-menu">
        <li>
          <a href="javascript:void(0)" class="sidebar-menu-button active" title="Dashboard">
            <i data-lucide="layout-dashboard"></i>
            <span class="sidebar-expanded-only">Dashboard</span>
          </a>
        </li>
        <li>
          <a href="javascript:void(0)" class="sidebar-menu-button" title="Inbox">
            <i data-lucide="inbox"></i>
            <span class="sidebar-expanded-only">Inbox</span>
          </a>
        </li>
        <li>
          <a href="javascript:void(0)" class="sidebar-menu-button" title="Analytics">
            <i data-lucide="bar-chart-2"></i>
            <span class="sidebar-expanded-only">Analytics</span>
          </a>
        </li>
        <li>
          <details class="sidebar-group" open>
            <summary class="sidebar-menu-button" title="Projects">
              <div class="summary-content">
                <i data-lucide="folder" class="sidebar-collapsed-only"></i>
                <i data-lucide="folder-open" class="sidebar-expanded-only"></i>
              </div>
              <span class="sidebar-expanded-only">Projects</span>
            </summary>
            <ul class="sidebar-menu sidebar-menu-sub">
              <li><a href="javascript:void(0)" class="sidebar-menu-button"><span class="sidebar-expanded-only">Frontend</span></a></li>
              <li><a href="javascript:void(0)" class="sidebar-menu-button"><span class="sidebar-expanded-only">Backend</span></a></li>
            </ul>
          </details>
        </li>
        <li>
          <a href="javascript:void(0)" class="sidebar-menu-button" title="Settings">
            <i data-lucide="settings"></i>
            <span class="sidebar-expanded-only">Settings</span>
          </a>
        </li>
      </ul>
    </nav>

    <footer class="sidebar-footer">
      <button aria-haspopup="menu" popovertarget="sidebar-footer-menu-sidebar-inset-offcanvas" class="btn btn-ghost sidebar-footer-user" style="anchor-name: --sidebar-footer-sidebar-inset-offcanvas-anchor;" title="Profile">
        <span class="avatar">
          <img src="https://i.pravatar.cc/80" alt="Alex" class="avatar-image"><span class="avatar-fallback">AL</span>
        </span>
        <div class="sidebar-expanded-only footer-user-info">
          <span class="user-name">Alex</span>
          <span class="user-role">Admin</span>
        </div>
        <i data-lucide="chevron-up" class="sidebar-expanded-only chevron"></i>
      </button>

      <menu id="sidebar-footer-menu-sidebar-inset-offcanvas" popover class="dropdown" data-placement="top-start" role="menu" style="position-anchor: --sidebar-footer-sidebar-inset-offcanvas-anchor; width: anchor-size(width);">
        <div class="menu-label">My Account</div>
        <button class="menu-item" role="menuitem"><i data-lucide="user"></i>Profile</button>
        <div class="menu-separator"></div>
        <button class="menu-item menu-item-destructive" role="menuitem"><i data-lucide="log-out"></i>Log out</button>
      </menu>
    </footer>
  </aside>

  <div class="sidebar-inset">
    <header class="topnav">
      <button class="btn btn-ghost btn-icon-sm sidebar-trigger" aria-label="Toggle Sidebar" aria-controls="sidebar-inset-offcanvas"><i data-lucide="panel-left" style="stroke-width: 1.5;"></i></button>
      <span style="font-size: 0.875rem; font-weight: 500;">Console</span>
    </header>
    <main>
      <div style="padding: 1.5rem;">
        <p style="color: var(--muted-foreground); font-size: 0.875rem;">Main content area.</p>
      </div>
    </main>
  </div>
</div>
```

### Icon Rail Mode

Shrinks to an icon-only rail.

```html
<div class="sidebar-provider" data-state="open" style="height: 460px; border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden;">
  <aside class="sidebar" id="sidebar-inset-icon" role="navigation" data-variant="inset" data-collapsible="icon">
    <header class="sidebar-header">
      <span class="sidebar-expanded-only" style="font-weight: 700; font-size: 1.1rem; letter-spacing: -0.02em;">Acme Corp</span>
      <i data-lucide="command" class="sidebar-collapsed-only" style="width: 1.4rem; height: 1.4rem; color: var(--primary);"></i>
    </header>

    <nav class="sidebar-content">
      <div class="sidebar-group-label"><span class="sidebar-expanded-only">Platform</span></div>
      <ul class="sidebar-menu">
        <li>
          <a href="javascript:void(0)" class="sidebar-menu-button active" title="Dashboard">
            <i data-lucide="layout-dashboard"></i>
            <span class="sidebar-expanded-only">Dashboard</span>
          </a>
        </li>
        <li>
          <a href="javascript:void(0)" class="sidebar-menu-button" title="Inbox">
            <i data-lucide="inbox"></i>
            <span class="sidebar-expanded-only">Inbox</span>
          </a>
        </li>
        <li>
          <a href="javascript:void(0)" class="sidebar-menu-button" title="Analytics">
            <i data-lucide="bar-chart-2"></i>
            <span class="sidebar-expanded-only">Analytics</span>
          </a>
        </li>
        <li>
          <details class="sidebar-group" open>
            <summary class="sidebar-menu-button" title="Projects">
              <div class="summary-content">
                <i data-lucide="folder" class="sidebar-collapsed-only"></i>
                <i data-lucide="folder-open" class="sidebar-expanded-only"></i>
              </div>
              <span class="sidebar-expanded-only">Projects</span>
            </summary>
            <ul class="sidebar-menu sidebar-menu-sub">
              <li><a href="javascript:void(0)" class="sidebar-menu-button"><span class="sidebar-expanded-only">Frontend</span></a></li>
              <li><a href="javascript:void(0)" class="sidebar-menu-button"><span class="sidebar-expanded-only">Backend</span></a></li>
            </ul>
          </details>
        </li>
        <li>
          <a href="javascript:void(0)" class="sidebar-menu-button" title="Settings">
            <i data-lucide="settings"></i>
            <span class="sidebar-expanded-only">Settings</span>
          </a>
        </li>
      </ul>
    </nav>

    <footer class="sidebar-footer">
      <button aria-haspopup="menu" popovertarget="sidebar-footer-menu-sidebar-inset-icon" class="btn btn-ghost sidebar-footer-user" style="anchor-name: --sidebar-footer-sidebar-inset-icon-anchor;" title="Profile">
        <span class="avatar">
          <img src="https://i.pravatar.cc/80" alt="Alex" class="avatar-image"><span class="avatar-fallback">AL</span>
        </span>
        <div class="sidebar-expanded-only footer-user-info">
          <span class="user-name">Alex</span>
          <span class="user-role">Admin</span>
        </div>
        <i data-lucide="chevron-up" class="sidebar-expanded-only chevron"></i>
      </button>

      <menu id="sidebar-footer-menu-sidebar-inset-icon" popover class="dropdown" data-placement="top-start" role="menu" style="position-anchor: --sidebar-footer-sidebar-inset-icon-anchor; width: anchor-size(width);">
        <div class="menu-label">My Account</div>
        <button class="menu-item" role="menuitem"><i data-lucide="user"></i>Profile</button>
        <div class="menu-separator"></div>
        <button class="menu-item menu-item-destructive" role="menuitem"><i data-lucide="log-out"></i>Log out</button>
      </menu>
    </footer>
  </aside>

  <div class="sidebar-inset">
    <header class="topnav">
      <button class="btn btn-ghost btn-icon-sm sidebar-trigger" aria-label="Toggle Sidebar" aria-controls="sidebar-inset-icon"><i data-lucide="arrow-left-to-line" class="sidebar-expanded-only" style="stroke-width: 1.5;"></i><i data-lucide="panel-left" class="sidebar-collapsed-only" style="stroke-width: 1.5;"></i></button>
      <span style="font-size: 0.875rem; font-weight: 500;">Console</span>
    </header>
    <main>
      <div style="padding: 1.5rem;">
        <p style="color: var(--muted-foreground); font-size: 0.875rem;">Main content area.</p>
      </div>
    </main>
  </div>
</div>
```

### Always Open

Cannot be collapsed.

```html
<div class="sidebar-provider" data-state="open" style="height: 460px; border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden;">
  <aside class="sidebar" id="sidebar-inset-none" role="navigation" data-variant="inset" data-collapsible="none">
    <header class="sidebar-header">
      <span class="sidebar-expanded-only" style="font-weight: 700; font-size: 1.1rem; letter-spacing: -0.02em;">Acme Corp</span>
      <i data-lucide="command" class="sidebar-collapsed-only" style="width: 1.4rem; height: 1.4rem; color: var(--primary);"></i>
    </header>

    <nav class="sidebar-content">
      <div class="sidebar-group-label"><span class="sidebar-expanded-only">Platform</span></div>
      <ul class="sidebar-menu">
        <li>
          <a href="javascript:void(0)" class="sidebar-menu-button active" title="Dashboard">
            <i data-lucide="layout-dashboard"></i>
            <span class="sidebar-expanded-only">Dashboard</span>
          </a>
        </li>
        <li>
          <a href="javascript:void(0)" class="sidebar-menu-button" title="Inbox">
            <i data-lucide="inbox"></i>
            <span class="sidebar-expanded-only">Inbox</span>
          </a>
        </li>
        <li>
          <a href="javascript:void(0)" class="sidebar-menu-button" title="Analytics">
            <i data-lucide="bar-chart-2"></i>
            <span class="sidebar-expanded-only">Analytics</span>
          </a>
        </li>
        <li>
          <details class="sidebar-group" open>
            <summary class="sidebar-menu-button" title="Projects">
              <div class="summary-content">
                <i data-lucide="folder" class="sidebar-collapsed-only"></i>
                <i data-lucide="folder-open" class="sidebar-expanded-only"></i>
              </div>
              <span class="sidebar-expanded-only">Projects</span>
            </summary>
            <ul class="sidebar-menu sidebar-menu-sub">
              <li><a href="javascript:void(0)" class="sidebar-menu-button"><span class="sidebar-expanded-only">Frontend</span></a></li>
              <li><a href="javascript:void(0)" class="sidebar-menu-button"><span class="sidebar-expanded-only">Backend</span></a></li>
            </ul>
          </details>
        </li>
        <li>
          <a href="javascript:void(0)" class="sidebar-menu-button" title="Settings">
            <i data-lucide="settings"></i>
            <span class="sidebar-expanded-only">Settings</span>
          </a>
        </li>
      </ul>
    </nav>

    <footer class="sidebar-footer">
      <button aria-haspopup="menu" popovertarget="sidebar-footer-menu-sidebar-inset-none" class="btn btn-ghost sidebar-footer-user" style="anchor-name: --sidebar-footer-sidebar-inset-none-anchor;" title="Profile">
        <span class="avatar">
          <img src="https://i.pravatar.cc/80" alt="Alex" class="avatar-image"><span class="avatar-fallback">AL</span>
        </span>
        <div class="sidebar-expanded-only footer-user-info">
          <span class="user-name">Alex</span>
          <span class="user-role">Admin</span>
        </div>
        <i data-lucide="chevron-up" class="sidebar-expanded-only chevron"></i>
      </button>

      <menu id="sidebar-footer-menu-sidebar-inset-none" popover class="dropdown" data-placement="top-start" role="menu" style="position-anchor: --sidebar-footer-sidebar-inset-none-anchor; width: anchor-size(width);">
        <div class="menu-label">My Account</div>
        <button class="menu-item" role="menuitem"><i data-lucide="user"></i>Profile</button>
        <div class="menu-separator"></div>
        <button class="menu-item menu-item-destructive" role="menuitem"><i data-lucide="log-out"></i>Log out</button>
      </menu>
    </footer>
  </aside>

  <div class="sidebar-inset">
    <header class="topnav">
      <span style="font-size: 0.875rem; font-weight: 500;">Console</span>
    </header>
    <main>
      <div style="padding: 1.5rem;">
        <p style="color: var(--muted-foreground); font-size: 0.875rem;">Main content area.</p>
      </div>
    </main>
  </div>
</div>
```

### Offcanvas Mode

Disappears completely when collapsed.

```html
<div class="sidebar-provider" data-state="open" style="height: 460px; border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden;">
  <aside class="sidebar" id="sidebar-floating-offcanvas" role="navigation" data-variant="floating" data-collapsible="offcanvas">
    <header class="sidebar-header">
      <span class="sidebar-expanded-only" style="font-weight: 700; font-size: 1.1rem; letter-spacing: -0.02em;">Acme Corp</span>
      <i data-lucide="command" class="sidebar-collapsed-only" style="width: 1.4rem; height: 1.4rem; color: var(--primary);"></i>
    </header>

    <nav class="sidebar-content">
      <div class="sidebar-group-label"><span class="sidebar-expanded-only">Platform</span></div>
      <ul class="sidebar-menu">
        <li>
          <a href="javascript:void(0)" class="sidebar-menu-button active" title="Dashboard">
            <i data-lucide="layout-dashboard"></i>
            <span class="sidebar-expanded-only">Dashboard</span>
          </a>
        </li>
        <li>
          <a href="javascript:void(0)" class="sidebar-menu-button" title="Inbox">
            <i data-lucide="inbox"></i>
            <span class="sidebar-expanded-only">Inbox</span>
          </a>
        </li>
        <li>
          <a href="javascript:void(0)" class="sidebar-menu-button" title="Analytics">
            <i data-lucide="bar-chart-2"></i>
            <span class="sidebar-expanded-only">Analytics</span>
          </a>
        </li>
        <li>
          <details class="sidebar-group" open>
            <summary class="sidebar-menu-button" title="Projects">
              <div class="summary-content">
                <i data-lucide="folder" class="sidebar-collapsed-only"></i>
                <i data-lucide="folder-open" class="sidebar-expanded-only"></i>
              </div>
              <span class="sidebar-expanded-only">Projects</span>
            </summary>
            <ul class="sidebar-menu sidebar-menu-sub">
              <li><a href="javascript:void(0)" class="sidebar-menu-button"><span class="sidebar-expanded-only">Frontend</span></a></li>
              <li><a href="javascript:void(0)" class="sidebar-menu-button"><span class="sidebar-expanded-only">Backend</span></a></li>
            </ul>
          </details>
        </li>
        <li>
          <a href="javascript:void(0)" class="sidebar-menu-button" title="Settings">
            <i data-lucide="settings"></i>
            <span class="sidebar-expanded-only">Settings</span>
          </a>
        </li>
      </ul>
    </nav>

    <footer class="sidebar-footer">
      <button aria-haspopup="menu" popovertarget="sidebar-footer-menu-sidebar-floating-offcanvas" class="btn btn-ghost sidebar-footer-user" style="anchor-name: --sidebar-footer-sidebar-floating-offcanvas-anchor;" title="Profile">
        <span class="avatar">
          <img src="https://i.pravatar.cc/80" alt="Alex" class="avatar-image"><span class="avatar-fallback">AL</span>
        </span>
        <div class="sidebar-expanded-only footer-user-info">
          <span class="user-name">Alex</span>
          <span class="user-role">Admin</span>
        </div>
        <i data-lucide="chevron-up" class="sidebar-expanded-only chevron"></i>
      </button>

      <menu id="sidebar-footer-menu-sidebar-floating-offcanvas" popover class="dropdown" data-placement="top-start" role="menu" style="position-anchor: --sidebar-footer-sidebar-floating-offcanvas-anchor; width: anchor-size(width);">
        <div class="menu-label">My Account</div>
        <button class="menu-item" role="menuitem"><i data-lucide="user"></i>Profile</button>
        <div class="menu-separator"></div>
        <button class="menu-item menu-item-destructive" role="menuitem"><i data-lucide="log-out"></i>Log out</button>
      </menu>
    </footer>
  </aside>

  <div class="sidebar-inset">
    <header class="topnav">
      <button class="btn btn-ghost btn-icon-sm sidebar-trigger" aria-label="Toggle Sidebar" aria-controls="sidebar-floating-offcanvas"><i data-lucide="panel-left" style="stroke-width: 1.5;"></i></button>
      <span style="font-size: 0.875rem; font-weight: 500;">Console</span>
    </header>
    <main>
      <div style="padding: 1.5rem;">
        <p style="color: var(--muted-foreground); font-size: 0.875rem;">Main content area.</p>
      </div>
    </main>
  </div>
</div>
```

### Icon Rail Mode

Shrinks to an icon-only rail.

```html
<div class="sidebar-provider" data-state="open" style="height: 460px; border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden;">
  <aside class="sidebar" id="sidebar-floating-icon" role="navigation" data-variant="floating" data-collapsible="icon">
    <header class="sidebar-header">
      <span class="sidebar-expanded-only" style="font-weight: 700; font-size: 1.1rem; letter-spacing: -0.02em;">Acme Corp</span>
      <i data-lucide="command" class="sidebar-collapsed-only" style="width: 1.4rem; height: 1.4rem; color: var(--primary);"></i>
    </header>

    <nav class="sidebar-content">
      <div class="sidebar-group-label"><span class="sidebar-expanded-only">Platform</span></div>
      <ul class="sidebar-menu">
        <li>
          <a href="javascript:void(0)" class="sidebar-menu-button active" title="Dashboard">
            <i data-lucide="layout-dashboard"></i>
            <span class="sidebar-expanded-only">Dashboard</span>
          </a>
        </li>
        <li>
          <a href="javascript:void(0)" class="sidebar-menu-button" title="Inbox">
            <i data-lucide="inbox"></i>
            <span class="sidebar-expanded-only">Inbox</span>
          </a>
        </li>
        <li>
          <a href="javascript:void(0)" class="sidebar-menu-button" title="Analytics">
            <i data-lucide="bar-chart-2"></i>
            <span class="sidebar-expanded-only">Analytics</span>
          </a>
        </li>
        <li>
          <details class="sidebar-group" open>
            <summary class="sidebar-menu-button" title="Projects">
              <div class="summary-content">
                <i data-lucide="folder" class="sidebar-collapsed-only"></i>
                <i data-lucide="folder-open" class="sidebar-expanded-only"></i>
              </div>
              <span class="sidebar-expanded-only">Projects</span>
            </summary>
            <ul class="sidebar-menu sidebar-menu-sub">
              <li><a href="javascript:void(0)" class="sidebar-menu-button"><span class="sidebar-expanded-only">Frontend</span></a></li>
              <li><a href="javascript:void(0)" class="sidebar-menu-button"><span class="sidebar-expanded-only">Backend</span></a></li>
            </ul>
          </details>
        </li>
        <li>
          <a href="javascript:void(0)" class="sidebar-menu-button" title="Settings">
            <i data-lucide="settings"></i>
            <span class="sidebar-expanded-only">Settings</span>
          </a>
        </li>
      </ul>
    </nav>

    <footer class="sidebar-footer">
      <button aria-haspopup="menu" popovertarget="sidebar-footer-menu-sidebar-floating-icon" class="btn btn-ghost sidebar-footer-user" style="anchor-name: --sidebar-footer-sidebar-floating-icon-anchor;" title="Profile">
        <span class="avatar">
          <img src="https://i.pravatar.cc/80" alt="Alex" class="avatar-image"><span class="avatar-fallback">AL</span>
        </span>
        <div class="sidebar-expanded-only footer-user-info">
          <span class="user-name">Alex</span>
          <span class="user-role">Admin</span>
        </div>
        <i data-lucide="chevron-up" class="sidebar-expanded-only chevron"></i>
      </button>

      <menu id="sidebar-footer-menu-sidebar-floating-icon" popover class="dropdown" data-placement="top-start" role="menu" style="position-anchor: --sidebar-footer-sidebar-floating-icon-anchor; width: anchor-size(width);">
        <div class="menu-label">My Account</div>
        <button class="menu-item" role="menuitem"><i data-lucide="user"></i>Profile</button>
        <div class="menu-separator"></div>
        <button class="menu-item menu-item-destructive" role="menuitem"><i data-lucide="log-out"></i>Log out</button>
      </menu>
    </footer>
  </aside>

  <div class="sidebar-inset">
    <header class="topnav">
      <button class="btn btn-ghost btn-icon-sm sidebar-trigger" aria-label="Toggle Sidebar" aria-controls="sidebar-floating-icon"><i data-lucide="arrow-left-to-line" class="sidebar-expanded-only" style="stroke-width: 1.5;"></i><i data-lucide="panel-left" class="sidebar-collapsed-only" style="stroke-width: 1.5;"></i></button>
      <span style="font-size: 0.875rem; font-weight: 500;">Console</span>
    </header>
    <main>
      <div style="padding: 1.5rem;">
        <p style="color: var(--muted-foreground); font-size: 0.875rem;">Main content area.</p>
      </div>
    </main>
  </div>
</div>
```

### Always Open

Cannot be collapsed.

```html
<div class="sidebar-provider" data-state="open" style="height: 460px; border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden;">
  <aside class="sidebar" id="sidebar-floating-none" role="navigation" data-variant="floating" data-collapsible="none">
    <header class="sidebar-header">
      <span class="sidebar-expanded-only" style="font-weight: 700; font-size: 1.1rem; letter-spacing: -0.02em;">Acme Corp</span>
      <i data-lucide="command" class="sidebar-collapsed-only" style="width: 1.4rem; height: 1.4rem; color: var(--primary);"></i>
    </header>

    <nav class="sidebar-content">
      <div class="sidebar-group-label"><span class="sidebar-expanded-only">Platform</span></div>
      <ul class="sidebar-menu">
        <li>
          <a href="javascript:void(0)" class="sidebar-menu-button active" title="Dashboard">
            <i data-lucide="layout-dashboard"></i>
            <span class="sidebar-expanded-only">Dashboard</span>
          </a>
        </li>
        <li>
          <a href="javascript:void(0)" class="sidebar-menu-button" title="Inbox">
            <i data-lucide="inbox"></i>
            <span class="sidebar-expanded-only">Inbox</span>
          </a>
        </li>
        <li>
          <a href="javascript:void(0)" class="sidebar-menu-button" title="Analytics">
            <i data-lucide="bar-chart-2"></i>
            <span class="sidebar-expanded-only">Analytics</span>
          </a>
        </li>
        <li>
          <details class="sidebar-group" open>
            <summary class="sidebar-menu-button" title="Projects">
              <div class="summary-content">
                <i data-lucide="folder" class="sidebar-collapsed-only"></i>
                <i data-lucide="folder-open" class="sidebar-expanded-only"></i>
              </div>
              <span class="sidebar-expanded-only">Projects</span>
            </summary>
            <ul class="sidebar-menu sidebar-menu-sub">
              <li><a href="javascript:void(0)" class="sidebar-menu-button"><span class="sidebar-expanded-only">Frontend</span></a></li>
              <li><a href="javascript:void(0)" class="sidebar-menu-button"><span class="sidebar-expanded-only">Backend</span></a></li>
            </ul>
          </details>
        </li>
        <li>
          <a href="javascript:void(0)" class="sidebar-menu-button" title="Settings">
            <i data-lucide="settings"></i>
            <span class="sidebar-expanded-only">Settings</span>
          </a>
        </li>
      </ul>
    </nav>

    <footer class="sidebar-footer">
      <button aria-haspopup="menu" popovertarget="sidebar-footer-menu-sidebar-floating-none" class="btn btn-ghost sidebar-footer-user" style="anchor-name: --sidebar-footer-sidebar-floating-none-anchor;" title="Profile">
        <span class="avatar">
          <img src="https://i.pravatar.cc/80" alt="Alex" class="avatar-image"><span class="avatar-fallback">AL</span>
        </span>
        <div class="sidebar-expanded-only footer-user-info">
          <span class="user-name">Alex</span>
          <span class="user-role">User</span>
        </div>
        <i data-lucide="chevron-up" class="sidebar-expanded-only chevron"></i>
      </button>

      <menu id="sidebar-footer-menu-sidebar-floating-none" popover class="dropdown" data-placement="top-start" role="menu" style="position-anchor: --sidebar-footer-sidebar-floating-none-anchor; width: anchor-size(width);">
        <div class="menu-label">My Account</div>
        <button class="menu-item" role="menuitem"><i data-lucide="user"></i>Profile</button>
        <div class="menu-separator"></div>
        <button class="menu-item menu-item-destructive" role="menuitem"><i data-lucide="log-out"></i>Log out</button>
      </menu>
    </footer>
  </aside>

  <div class="sidebar-inset">
    <header class="topnav">
      <span style="font-size: 0.875rem; font-weight: 500;">Dashboard</span>
    </header>
    <main>
      <div style="padding: 1.5rem;">
        <p style="color: var(--muted-foreground); font-size: 0.875rem;">Main content area.</p>
      </div>
    </main>
  </div>
</div>
```

### Offcanvas Mode

Disappears completely when collapsed.

```html
<div class="sidebar-provider" data-state="open" style="height: 460px; border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden;">
  <aside class="sidebar" id="sidebar-right-offcanvas" role="navigation" data-placement="right" data-collapsible="offcanvas">
    <header class="sidebar-header">
      <span class="sidebar-expanded-only" style="font-weight: 700; font-size: 1.1rem; letter-spacing: -0.02em;">Acme Corp</span>
      <i data-lucide="command" class="sidebar-collapsed-only" style="width: 1.4rem; height: 1.4rem; color: var(--primary);"></i>
    </header>

    <nav class="sidebar-content">
      <div class="sidebar-group-label"><span class="sidebar-expanded-only">Menu</span></div>
      <ul class="sidebar-menu">
        <li>
          <a href="javascript:void(0)" class="sidebar-menu-button active" title="Dashboard">
            <i data-lucide="layout-dashboard"></i>
            <span class="sidebar-expanded-only">Dashboard</span>
          </a>
        </li>
        <li>
          <a href="javascript:void(0)" class="sidebar-menu-button" title="Inbox">
            <i data-lucide="inbox"></i>
            <span class="sidebar-expanded-only">Inbox</span>
          </a>
        </li>
        <li>
          <a href="javascript:void(0)" class="sidebar-menu-button" title="Analytics">
            <i data-lucide="bar-chart-2"></i>
            <span class="sidebar-expanded-only">Analytics</span>
          </a>
        </li>
        <li>
          <details class="sidebar-group" open>
            <summary class="sidebar-menu-button" title="Projects">
              <div class="summary-content">
                <i data-lucide="folder" class="sidebar-collapsed-only"></i>
                <i data-lucide="folder-open" class="sidebar-expanded-only"></i>
              </div>
              <span class="sidebar-expanded-only">Projects</span>
            </summary>
            <ul class="sidebar-menu sidebar-menu-sub">
              <li><a href="javascript:void(0)" class="sidebar-menu-button"><span class="sidebar-expanded-only">Frontend</span></a></li>
              <li><a href="javascript:void(0)" class="sidebar-menu-button"><span class="sidebar-expanded-only">Backend</span></a></li>
            </ul>
          </details>
        </li>
        <li>
          <a href="javascript:void(0)" class="sidebar-menu-button" title="Settings">
            <i data-lucide="settings"></i>
            <span class="sidebar-expanded-only">Settings</span>
          </a>
        </li>
      </ul>
    </nav>

    <footer class="sidebar-footer">
      <button aria-haspopup="menu" popovertarget="sidebar-footer-menu-sidebar-right-offcanvas" class="btn btn-ghost sidebar-footer-user" style="anchor-name: --sidebar-footer-sidebar-right-offcanvas-anchor;" title="Profile">
        <span class="avatar">
          <img src="https://i.pravatar.cc/80" alt="Alex" class="avatar-image"><span class="avatar-fallback">AL</span>
        </span>
        <div class="sidebar-expanded-only footer-user-info">
          <span class="user-name">Alex</span>
          <span class="user-role">User</span>
        </div>
        <i data-lucide="chevron-up" class="sidebar-expanded-only chevron"></i>
      </button>

      <menu id="sidebar-footer-menu-sidebar-right-offcanvas" popover class="dropdown" data-placement="top-start" role="menu" style="position-anchor: --sidebar-footer-sidebar-right-offcanvas-anchor; width: anchor-size(width);">
        <div class="menu-label">My Account</div>
        <button class="menu-item" role="menuitem"><i data-lucide="user"></i>Profile</button>
        <div class="menu-separator"></div>
        <button class="menu-item menu-item-destructive" role="menuitem"><i data-lucide="log-out"></i>Log out</button>
      </menu>
    </footer>
  </aside>

  <div class="sidebar-inset">
    <header class="topnav">
      <span style="font-size: 0.875rem; font-weight: 500; flex: 1;">Console</span>
      <button class="btn btn-ghost btn-icon-sm sidebar-trigger" aria-label="Toggle Sidebar" aria-controls="sidebar-right-offcanvas"><i data-lucide="panel-right" style="stroke-width: 1.5;"></i></button>
    </header>
    <main>
      <div style="padding: 1.5rem;">
        <p style="color: var(--muted-foreground); font-size: 0.875rem;">Main content area.</p>
      </div>
    </main>
  </div>
</div>
```

### Icon Rail Mode

Shrinks to an icon-only rail.

```html
<div class="sidebar-provider" data-state="open" style="height: 460px; border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden;">
  <aside class="sidebar" id="sidebar-right-icon" role="navigation" data-placement="right" data-collapsible="icon">
    <header class="sidebar-header">
      <span class="sidebar-expanded-only" style="font-weight: 700; font-size: 1.1rem; letter-spacing: -0.02em;">Acme Corp</span>
      <i data-lucide="command" class="sidebar-collapsed-only" style="width: 1.4rem; height: 1.4rem; color: var(--primary);"></i>
    </header>

    <nav class="sidebar-content">
      <div class="sidebar-group-label"><span class="sidebar-expanded-only">Menu</span></div>
      <ul class="sidebar-menu">
        <li>
          <a href="javascript:void(0)" class="sidebar-menu-button active" title="Dashboard">
            <i data-lucide="layout-dashboard"></i>
            <span class="sidebar-expanded-only">Dashboard</span>
          </a>
        </li>
        <li>
          <a href="javascript:void(0)" class="sidebar-menu-button" title="Inbox">
            <i data-lucide="inbox"></i>
            <span class="sidebar-expanded-only">Inbox</span>
          </a>
        </li>
        <li>
          <a href="javascript:void(0)" class="sidebar-menu-button" title="Analytics">
            <i data-lucide="bar-chart-2"></i>
            <span class="sidebar-expanded-only">Analytics</span>
          </a>
        </li>
        <li>
          <details class="sidebar-group" open>
            <summary class="sidebar-menu-button" title="Projects">
              <div class="summary-content">
                <i data-lucide="folder" class="sidebar-collapsed-only"></i>
                <i data-lucide="folder-open" class="sidebar-expanded-only"></i>
              </div>
              <span class="sidebar-expanded-only">Projects</span>
            </summary>
            <ul class="sidebar-menu sidebar-menu-sub">
              <li><a href="javascript:void(0)" class="sidebar-menu-button"><span class="sidebar-expanded-only">Frontend</span></a></li>
              <li><a href="javascript:void(0)" class="sidebar-menu-button"><span class="sidebar-expanded-only">Backend</span></a></li>
            </ul>
          </details>
        </li>
        <li>
          <a href="javascript:void(0)" class="sidebar-menu-button" title="Settings">
            <i data-lucide="settings"></i>
            <span class="sidebar-expanded-only">Settings</span>
          </a>
        </li>
      </ul>
    </nav>

    <footer class="sidebar-footer">
      <button aria-haspopup="menu" popovertarget="sidebar-footer-menu-sidebar-right-icon" class="btn btn-ghost sidebar-footer-user" style="anchor-name: --sidebar-footer-sidebar-right-icon-anchor;" title="Profile">
        <span class="avatar">
          <img src="https://i.pravatar.cc/80" alt="Alex" class="avatar-image"><span class="avatar-fallback">AL</span>
        </span>
        <div class="sidebar-expanded-only footer-user-info">
          <span class="user-name">Alex</span>
          <span class="user-role">User</span>
        </div>
        <i data-lucide="chevron-up" class="sidebar-expanded-only chevron"></i>
      </button>

      <menu id="sidebar-footer-menu-sidebar-right-icon" popover class="dropdown" data-placement="top-start" role="menu" style="position-anchor: --sidebar-footer-sidebar-right-icon-anchor; width: anchor-size(width);">
        <div class="menu-label">My Account</div>
        <button class="menu-item" role="menuitem"><i data-lucide="user"></i>Profile</button>
        <div class="menu-separator"></div>
        <button class="menu-item menu-item-destructive" role="menuitem"><i data-lucide="log-out"></i>Log out</button>
      </menu>
    </footer>
  </aside>

  <div class="sidebar-inset">
    <header class="topnav">
      <span style="font-size: 0.875rem; font-weight: 500; flex: 1;">Console</span>
      <button class="btn btn-ghost btn-icon-sm sidebar-trigger" aria-label="Toggle Sidebar" aria-controls="sidebar-right-icon"><i data-lucide="panel-right" style="stroke-width: 1.5;"></i></button>
    </header>
    <main>
      <div style="padding: 1.5rem;">
        <p style="color: var(--muted-foreground); font-size: 0.875rem;">Main content area.</p>
      </div>
    </main>
  </div>
</div>
```

### Always Open

Cannot be collapsed.

```html
<div class="sidebar-provider" data-state="open" style="height: 460px; border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden;">
  <aside class="sidebar" id="sidebar-right-none" role="navigation" data-placement="right" data-collapsible="none">
    <header class="sidebar-header">
      <span class="sidebar-expanded-only" style="font-weight: 700; font-size: 1.1rem; letter-spacing: -0.02em;">Acme Corp</span>
      <i data-lucide="command" class="sidebar-collapsed-only" style="width: 1.4rem; height: 1.4rem; color: var(--primary);"></i>
    </header>

    <nav class="sidebar-content">
      <div class="sidebar-group-label"><span class="sidebar-expanded-only">Menu</span></div>
      <ul class="sidebar-menu">
        <li>
          <a href="javascript:void(0)" class="sidebar-menu-button active" title="Dashboard">
            <i data-lucide="layout-dashboard"></i>
            <span class="sidebar-expanded-only">Dashboard</span>
          </a>
        </li>
        <li>
          <a href="javascript:void(0)" class="sidebar-menu-button" title="Inbox">
            <i data-lucide="inbox"></i>
            <span class="sidebar-expanded-only">Inbox</span>
          </a>
        </li>
        <li>
          <a href="javascript:void(0)" class="sidebar-menu-button" title="Analytics">
            <i data-lucide="bar-chart-2"></i>
            <span class="sidebar-expanded-only">Analytics</span>
          </a>
        </li>
        <li>
          <details class="sidebar-group" open>
            <summary class="sidebar-menu-button" title="Projects">
              <div class="summary-content">
                <i data-lucide="folder" class="sidebar-collapsed-only"></i>
                <i data-lucide="folder-open" class="sidebar-expanded-only"></i>
              </div>
              <span class="sidebar-expanded-only">Projects</span>
            </summary>
            <ul class="sidebar-menu sidebar-menu-sub">
              <li><a href="javascript:void(0)" class="sidebar-menu-button"><span class="sidebar-expanded-only">Frontend</span></a></li>
              <li><a href="javascript:void(0)" class="sidebar-menu-button"><span class="sidebar-expanded-only">Backend</span></a></li>
            </ul>
          </details>
        </li>
        <li>
          <a href="javascript:void(0)" class="sidebar-menu-button" title="Settings">
            <i data-lucide="settings"></i>
            <span class="sidebar-expanded-only">Settings</span>
          </a>
        </li>
      </ul>
    </nav>

    <footer class="sidebar-footer">
      <button aria-haspopup="menu" popovertarget="sidebar-footer-menu-sidebar-right-none" class="btn btn-ghost sidebar-footer-user" style="anchor-name: --sidebar-footer-sidebar-right-none-anchor;" title="Profile">
        <span class="avatar">
          <img src="https://i.pravatar.cc/80" alt="Alex" class="avatar-image"><span class="avatar-fallback">AL</span>
        </span>
        <div class="sidebar-expanded-only footer-user-info">
          <span class="user-name">Alex</span>
          <span class="user-role">User</span>
        </div>
        <i data-lucide="chevron-up" class="sidebar-expanded-only chevron"></i>
      </button>

      <menu id="sidebar-footer-menu-sidebar-right-none" popover class="dropdown" data-placement="top-start" role="menu" style="position-anchor: --sidebar-footer-sidebar-right-none-anchor; width: anchor-size(width);">
        <div class="menu-label">My Account</div>
        <button class="menu-item" role="menuitem"><i data-lucide="user"></i>Profile</button>
        <div class="menu-separator"></div>
        <button class="menu-item menu-item-destructive" role="menuitem"><i data-lucide="log-out"></i>Log out</button>
      </menu>
    </footer>
  </aside>

  <div class="sidebar-inset">
    <header class="topnav">
      <span style="font-size: 0.875rem; font-weight: 500;">Dashboard</span>
    </header>
    <main>
      <div style="padding: 1.5rem;">
        <p style="color: var(--muted-foreground); font-size: 0.875rem;">Main content area.</p>
      </div>
    </main>
  </div>
</div>
```


---

## Skeleton

Use to show a placeholder while content is loading.

### Status Indicator

A circular placeholder alongside metadata lines.

```html
<div style="display: flex; align-items: center; gap: 1rem;">
    <div class="skeleton" style="width:3rem;height:3rem;border-radius:9999px;flex-shrink:0;"></div>
    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
        <div class="skeleton" style="height: 1rem;"></div>
        <div class="skeleton" style="height: 1rem;"></div>
    </div>
</div>
```

### Project Card

A structure mirroring a standard card layout.

```html
<div class="card" style="width:100%;max-width:320px;">
    <div class="card-header" style="padding-bottom:1rem;">
        <div class="skeleton" style="height:1.25rem;width:40%;"></div>
        <div class="skeleton" style="height: 1rem;"></div>
    </div>
    <div class="card-content">
        <div class="skeleton" style="height:160px;width:100%;border-radius:var(--radius);"></div>
        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
            <div class="skeleton" style="height: 1rem;"></div>
            <div class="skeleton" style="height: 1rem;"></div>
            <div class="skeleton" style="height: 1rem;"></div>
        </div>
    </div>
    <div class="card-footer" style="display: flex;">
        <div class="skeleton" style="height:2.25rem;width:80px;"></div>
        <div class="skeleton" style="height:2.25rem;width:80px;"></div>
    </div>
</div>
```

### Article Content

Multiple staggered lines for paragraph placeholders.

```html
<div style="display: flex; flex-direction: column; gap: 0.5rem; width: 100%; max-width: 320px;">
    <div class="skeleton" style="height: 1rem; width: 100%;"></div>
    <div class="skeleton" style="height: 1rem; width: 100%;"></div>
    <div class="skeleton" style="height: 1rem; width: 100%;"></div>
    <div class="skeleton" style="height: 1rem; width: 80%;"></div>
</div>
```

### Settings Form

Placeholders for labels and input fields.

```html
<div style="display:grid;gap:1.5rem;width:100%;max-width:320px;">
    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
        <div class="skeleton" style="height:0.875rem;width:25%;"></div>
        <div class="skeleton" style="height:2.25rem;width:100%;"></div>
    </div>
    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
        <div class="skeleton" style="height:0.875rem;width:30%;"></div>
        <div class="skeleton" style="height:2.25rem;width:100%;"></div>
    </div>
    <div class="skeleton" style="height:2.25rem;width:100px;"></div>
</div>
```

### Data Table

A tabular structure for data loading states.

```html
<div style="display:grid;gap:1.5rem;width:100%;">
    <!-- Table Header -->
    <div style="display: flex; gap: 1rem; border-bottom: 1px solid var(--border); padding-bottom: 0.5rem;">
        <div class="skeleton" style="height: 1.25rem; flex: 1;"></div>
        <div class="skeleton" style="height: 1.25rem; flex: 1;"></div>
        <div class="skeleton" style="height: 1.25rem; flex: 1;"></div>
        <div class="skeleton" style="height: 1.25rem; flex: 1;"></div>
    </div>
    <!-- Table Body -->
    <div style="display: flex; flex-direction: column; gap: 1rem;">
        <div style="display: flex; gap: 1rem;">
            <div class="skeleton" style="height: 1rem; flex: 1;"></div>
            <div class="skeleton" style="height: 1rem; flex: 1;"></div>
            <div class="skeleton" style="height: 1rem; flex: 1;"></div>
            <div class="skeleton" style="height: 1rem; flex: 1;"></div>
        </div>
        <div style="display: flex; gap: 1rem;">
            <div class="skeleton" style="height: 1rem; flex: 1;"></div>
            <div class="skeleton" style="height: 1rem; flex: 1;"></div>
            <div class="skeleton" style="height: 1rem; flex: 1;"></div>
            <div class="skeleton" style="height: 1rem; flex: 1;"></div>
        </div>
        <div style="display: flex; gap: 1rem;">
            <div class="skeleton" style="height: 1rem; flex: 1;"></div>
            <div class="skeleton" style="height: 1rem; flex: 1;"></div>
            <div class="skeleton" style="height: 1rem; flex: 1;"></div>
            <div class="skeleton" style="height: 1rem; flex: 1;"></div>
        </div>
        <div style="display: flex; gap: 1rem;">
            <div class="skeleton" style="height: 1rem; flex: 1;"></div>
            <div class="skeleton" style="height: 1rem; flex: 1;"></div>
            <div class="skeleton" style="height: 1rem; flex: 1;"></div>
            <div class="skeleton" style="height: 1rem; flex: 1;"></div>
        </div>
    </div>
</div>
```


---

## Slider

An input where the user selects a value from within a given range.

```html
<div style="width: 100%; max-width: 320px;">
    <label class="label" style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
        Volume <span>50%</span>
    </label>
    <input type="range" class="slider" min="0" max="100" value="50" style="width:100%;--val:50%;" oninput="this.style.setProperty('--val', this.valueAsNumber + '%'); this.previousElementSibling.querySelector('span').innerText = this.value + '%'">
</div>
```

### Disabled

```html
<div style="width: 100%; max-width: 320px;">
    <label class="label" style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; opacity: 0.5;">
        Brightness <span>32%</span>
    </label>
    <input type="range" class="slider" min="0" max="100" value="32" disabled style="width:100%;--val:32%;" oninput="this.style.setProperty('--val', this.valueAsNumber + '%')">
</div>
```


---

## Spinner

A circular loading indicator used to show that an operation is in progress.

```html
<div class="spinner"></div>
```

### Size

Spinners scale natively with the parent's `font-size` using `em` units. You can also override the size directly.

```html
<div style="display: flex; align-items: center; gap: 1rem;">
    <div class="spinner" style="font-size:0.75rem;"></div>
    <div class="spinner"></div>
    <div class="spinner" style="font-size:1.5rem;"></div>
</div>
```

### Button

Include a spinner within a button. It will automatically match the button's text size.

```html
<div style="display: flex; align-items: center; gap: 1rem;">
    <button class="btn btn-primary" disabled>
        <div class="spinner"></div>
        Saving Changes
    </button>
    <button class="btn btn-secondary btn-sm" disabled>
        <div class="spinner"></div>
        Loading Data...
    </button>
    <button class="btn btn-outline btn-icon" disabled aria-label="Loading">
        <div class="spinner"></div>
    </button>
</div>
```

### Badge

Add a spinner to a badge. The spinner inherits the badge's font-size perfectly.

```html
<div style="display: flex; align-items: center; gap: 1rem;">
    <span class="badge badge-secondary">
        <div class="spinner" style="border-width:0.1em;"></div>
        Processing
    </span>
    <span class="badge badge-outline">
        <div class="spinner" style="border-width:0.1em;"></div>
        Updating
    </span>
</div>
```

### Input Group

Spinners can be used within input groups to show field-level loading states.

```html
<div style="display: flex; flex-direction: column; gap: 1rem;">
    <div class="input-group">
        <input type="text" class="input" placeholder="Connecting..." readonly>
        <div class="input-group-addon">
            <div class="spinner"></div>
        </div>
    </div>
    <div class="input-group">
        <div class="input-group-addon">
            <div class="spinner"></div>
        </div>
        <input type="text" class="input" placeholder="Searching..." readonly>
    </div>
</div>
```


---

## Switch

A control that allows the user to toggle between checked and not checked.

```html
<div style="display: flex; align-items: center; gap: 0.5rem;">
    <input type="checkbox" id="sw-default" role="switch" class="switch" checked>
    <label for="sw-default" class="label">Airplane Mode</label>
</div>
```

### Size

Switches come in multiple sizes to fit different contexts.

```html
<div style="display: flex; flex-direction: column; gap: 0.5rem;">
    <div style="display: flex; align-items: center; gap: 0.5rem;">
        <input type="checkbox" id="sw-size-def" role="switch" class="switch" checked>
        <label for="sw-size-def" class="label">Default</label>
    </div>
    <div style="display: flex; align-items: center; gap: 0.5rem;">
        <input type="checkbox" id="sw-size-sm" role="switch" class="switch switch-sm" checked>
        <label for="sw-size-sm" class="label">Small</label>
    </div>
</div>
```

### Description

Extend the label with a descriptive text to provide more context.

```html
<div style="display: flex; gap: 0.5rem;">
    <input type="checkbox" id="sw-desc" role="switch" class="switch" style="margin-top: 0.125rem;">
    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
        <label for="sw-desc" class="label">Marketing Emails</label>
        <p style="margin:0;font-size:0.875rem;color:var(--muted-foreground);">Receive updates about new features and special offers.</p>
    </div>
</div>
```

### Choice Card

Card-style selection where the wrapper acts as a clickable card pattern.

```html
<div style="display: flex; flex-direction: column; gap: 1rem; width: 100%; max-width: 440px;">
    <label class="card switch-card-showcase" style="display: flex; flex-direction: row; align-items: flex-start; justify-content: space-between; padding: 1rem; cursor: pointer;" for="sw-card-1">
        <div style="display: flex; flex-direction: column; gap: 0.125rem;">
            <span style="font-size: 0.875rem; font-weight: 500; letter-spacing: -0.01em;">Stay logged in</span>
            <span style="font-size: 0.875rem; color: var(--muted-foreground);">Keep your session active for up to 30 days on this device.</span>
        </div>
        <input type="checkbox" id="sw-card-1" role="switch" class="switch" checked style="margin-top: 0.125rem;">
    </label>
    <label class="card switch-card-showcase" style="display: flex; flex-direction: row; align-items: flex-start; justify-content: space-between; padding: 1rem; cursor: pointer;" for="sw-card-2">
        <div style="display: flex; flex-direction: column; gap: 0.125rem;">
            <span style="font-size: 0.875rem; font-weight: 500; letter-spacing: -0.01em;">Notifications</span>
            <span style="font-size: 0.875rem; color: var(--muted-foreground);">Get real-time alerts for new messages and activity.</span>
        </div>
        <input type="checkbox" id="sw-card-2" role="switch" class="switch" style="margin-top: 0.125rem;">
    </label>
</div>
```

### Disabled

Prevent user interaction by disabling the switch.

```html
<div style="display: flex; flex-direction: column; gap: 1rem;">
    <div style="display: flex; align-items: center; gap: 0.5rem;">
        <input type="checkbox" id="sw-dis-off" role="switch" class="switch" disabled>
        <label for="sw-dis-off" class="label" style="opacity: 0.5;">Private Account</label>
    </div>
    <div style="display: flex; align-items: center; gap: 0.5rem;">
        <input type="checkbox" id="sw-dis-on" role="switch" class="switch" checked disabled>
        <label for="sw-dis-on" class="label" style="opacity: 0.5;">Public Profile</label>
    </div>
</div>
```

### Invalid

Indicate a validation error state using `aria-invalid`.

```html
<div style="display: flex; align-items: center; gap: 0.5rem;">
    <input type="checkbox" id="sw-invalid" role="switch" class="switch" aria-invalid="true">
    <label for="sw-invalid" class="label">Accept terms and conditions</label>
</div>
```


---

## Table

Styled table with header, body, and responsive support.

```html
<div class="table-wrapper" style="margin: 0; border: none; border-radius: 0;">
    <table class="table">
        <caption class="table-caption">Recent projects in the organization.</caption>
        <thead class="table-thead">
            <tr>
                <th class="table-th">Project Name</th>
                <th class="table-th">Category</th>
                <th class="table-th">Status</th>
                <th class="table-th" align="right">Due Date</th>
            </tr>
        </thead>
        <tbody class="table-tbody">
            <tr>
                <td class="table-td">Website Redesign</td>
                <td class="table-td">Development</td>
                <td class="table-td"><span style="color: var(--success, #10b981);">Completed</span></td>
                <td class="table-td" align="right">May 12, 2024</td>
            </tr>
            <tr>
                <td class="table-td">Mobile Application</td>
                <td class="table-td">Design</td>
                <td class="table-td"><span style="color: var(--success, #10b981);">In Progress</span></td>
                <td class="table-td" align="right">Jun 04, 2024</td>
            </tr>
            <tr>
                <td class="table-td">User Interviews</td>
                <td class="table-td">Research</td>
                <td class="table-td"><span style="color: var(--muted-foreground);">On Hold</span></td>
                <td class="table-td" align="right">Jun 20, 2024</td>
            </tr>
            <tr>
                <td class="table-td">Content Audit</td>
                <td class="table-td">Marketing</td>
                <td class="table-td"><span style="color: var(--destructive);">Cancelled</span></td>
                <td class="table-td" align="right">—</td>
            </tr>
        </tbody>
        <tfoot class="table-footer">
            <tr>
                <td class="table-td" colspan="3">Total active projects</td>
                <td class="table-td" align="right">3</td>
            </tr>
        </tfoot>
    </table>
</div>
```


---

## Tabs

A set of layered sections of content—known as tab panels—that are displayed one at a time.

```html
<div class="tabs" id="tabs-default">
    <div class="tabs-list" role="tablist" aria-label="Account options">
        <button class="tabs-trigger" role="tab" aria-controls="tab-account" aria-selected="true">Account</button>
        <button class="tabs-trigger" role="tab" aria-controls="tab-password">Password</button>
    </div>
    <div class="tabs-content" id="tab-account" role="tabpanel" tabindex="0">
        <p style="margin:0;font-size:0.875rem;color:var(--muted-foreground);">Make changes to your account here. Click save when you're done.</p>
    </div>
    <div class="tabs-content" id="tab-password" role="tabpanel" tabindex="0" hidden>
        <p style="margin:0;font-size:0.875rem;color:var(--muted-foreground);">Change your password here. After saving, you'll be logged out.</p>
    </div>
</div>
```

### Line Variant

```html
<style>
    .custom-line-tabs .tabs-list {
        background: transparent;
        gap: 1.5rem;
        border-radius: 0;
        padding: 0;
        border-bottom: 1px solid var(--border);
    }
    .custom-line-tabs .tabs-trigger {
        background: transparent !important;
        border-radius: 0;
        padding-inline: 0;
        padding-block: 0.5rem;
    }
    .custom-line-tabs .tabs-trigger[aria-selected="true"] {
        background: transparent !important;
        box-shadow: none !important;
        border-color: transparent !important;
    }
    .custom-line-tabs .tabs-trigger::after {
        content: '';
        position: absolute;
        background: var(--foreground);
        opacity: 0;
        transition: opacity 150ms ease;
        inset-inline: 0;
        bottom: -1px;
        height: 2px;
    }
    .custom-line-tabs .tabs-trigger[aria-selected="true"]::after {
        opacity: 1;
    }
</style>
<div class="tabs custom-line-tabs" id="tabs-line">
    <div class="tabs-list" role="tablist" aria-label="Line tabs">
        <button class="tabs-trigger" role="tab" aria-controls="tab-line-overview" aria-selected="true">Overview</button>
        <button class="tabs-trigger" role="tab" aria-controls="tab-line-integrations">Analytics</button>
        <button class="tabs-trigger" role="tab" aria-controls="tab-line-settings">Reports</button>
    </div>
    <div class="tabs-content" id="tab-line-overview" role="tabpanel" tabindex="0" style="margin-top: 1rem;">
        <p style="margin:0;font-size:0.875rem;color:var(--muted-foreground);">A summary of your recent activity and performance.</p>
    </div>
    <div class="tabs-content" id="tab-line-integrations" role="tabpanel" tabindex="0" style="margin-top: 1rem;" hidden>
        <p style="margin:0;font-size:0.875rem;color:var(--muted-foreground);">Detailed data and visualization of your progress.</p>
    </div>
    <div class="tabs-content" id="tab-line-settings" role="tabpanel" tabindex="0" style="margin-top: 1rem;" hidden>
        <p style="margin:0;font-size:0.875rem;color:var(--muted-foreground);">Generate and download custom reports for your projects.</p>
    </div>
</div>
```

### Vertical

```html
<div class="tabs" id="tabs-vertical">
    <div class="tabs-list" role="tablist" aria-orientation="vertical" aria-label="Vertical tabs" style="width:12rem;flex-shrink:0;">
        <button class="tabs-trigger" role="tab" aria-controls="tab-vert-account" aria-selected="true">General</button>
        <button class="tabs-trigger" role="tab" aria-controls="tab-vert-password">Security</button>
        <button class="tabs-trigger" role="tab" aria-controls="tab-vert-notifications">Notifications</button>
    </div>
    <div class="tabs-content" id="tab-vert-account" role="tabpanel" tabindex="0" style="padding-left:1rem;">
        <p style="margin:0;font-size:0.875rem;color:var(--muted-foreground);">Basic account settings and profile information.</p>
    </div>
    <div class="tabs-content" id="tab-vert-password" role="tabpanel" tabindex="0" style="padding-left:1rem;" hidden>
        <p style="margin:0;font-size:0.875rem;color:var(--muted-foreground);">Manage your passwords and two-factor authentication.</p>
    </div>
    <div class="tabs-content" id="tab-vert-notifications" role="tabpanel" tabindex="0" style="padding-left:1rem;" hidden>
        <p style="margin:0;font-size:0.875rem;color:var(--muted-foreground);">Configure how you receive alerts and updates.</p>
    </div>
</div>
```

### With Icons

```html
<div class="tabs" id="tabs-icons">
    <div class="tabs-list" role="tablist" aria-label="Navigation">
        <button class="tabs-trigger" role="tab" aria-controls="tab-profile" aria-selected="true">
            <i data-lucide="user"></i> Profile
        </button>
        <button class="tabs-trigger" role="tab" aria-controls="tab-billing">
            <i data-lucide="credit-card"></i> Billing
        </button>
        <button class="tabs-trigger" role="tab" aria-controls="tab-settings-i">
            <i data-lucide="settings"></i> Settings
        </button>
    </div>
    <div class="tabs-content" id="tab-profile" role="tabpanel" tabindex="0">
        <p style="margin:0;font-size:0.875rem;color:var(--muted-foreground);">Manage your public profile information.</p>
    </div>
    <div class="tabs-content" id="tab-billing" role="tabpanel" tabindex="0" hidden>
        <p style="margin:0;font-size:0.875rem;color:var(--muted-foreground);">View your subscription plan and payment history.</p>
    </div>
    <div class="tabs-content" id="tab-settings-i" role="tabpanel" tabindex="0" hidden>
        <p style="margin:0;font-size:0.875rem;color:var(--muted-foreground);">Configure your general application preferences.</p>
    </div>
</div>
```

### Disabled

```html
<div class="tabs" id="tabs-disabled">
    <div class="tabs-list" role="tablist" aria-label="Tabs with disabled">
        <button class="tabs-trigger" role="tab" aria-controls="tab-active" aria-selected="true">Basic</button>
        <button class="tabs-trigger" role="tab" aria-controls="tab-dis-tab" disabled>Advanced Features</button>
        <button class="tabs-trigger" role="tab" aria-controls="tab-another">Usage Stats</button>
    </div>
    <div class="tabs-content" id="tab-active" role="tabpanel" tabindex="0">
        <p style="margin:0;font-size:0.875rem;color:var(--muted-foreground);">Access core features available to all users.</p>
    </div>
    <div class="tabs-content" id="tab-dis-tab" role="tabpanel" tabindex="0" hidden>
        <p style="margin:0;font-size:0.875rem;color:var(--muted-foreground);">This tab is disabled. Upgrade your plan to access.</p>
    </div>
    <div class="tabs-content" id="tab-another" role="tabpanel" tabindex="0" hidden>
        <p style="margin:0;font-size:0.875rem;color:var(--muted-foreground);">View your account usage statistics.</p>
    </div>
</div>
```


---

## Textarea

Displays a form textarea or a component that looks like a textarea.

```html
<textarea class="textarea" placeholder="Type your message here..." style="max-width:320px;width:100%;"></textarea>
```

### Disabled

```html
<textarea class="textarea" placeholder="Biography..." disabled style="max-width:320px;width:100%;"></textarea>
```

### With Label

```html
<div style="display:grid;gap:0.375rem;max-width:320px;width:100%;">
    <label for="ta-desc" class="label">Project Description</label>
    <textarea id="ta-desc" class="textarea" placeholder="Briefly describe your project goals..." rows="3"></textarea>
    <p style="margin:0;font-size:0.75rem;color:var(--muted-foreground);">This will be visible to all team members.</p>
</div>
```

### With Button

```html
<div style="display: flex; flex-direction: column; gap: 0.5rem; max-width:320px;">
    <textarea class="textarea" placeholder="Write a comment..." rows="3"></textarea>
    <button class="btn btn-primary" style="align-self: flex-start;"><i data-lucide="send" style="width:16px;height:16px;margin-right:0.5rem;"></i> Post Comment</button>
</div>
```


---

## Toast

A non-blocking notification component. Uses the `card` component for content and `data-dismiss` to cancel.

### Default

```html
<button class="btn btn-secondary" onclick="toast('Settings saved successfully.')">Show Toast</button>
```

### With Dismiss

```html
<button class="btn btn-secondary" onclick="toast('<div style=&quot;display: grid; gap: 0.25rem;&quot;><div style=&quot;font-weight: 600; line-height: 1;&quot;>Upload Complete</div><div style=&quot;color: var(--muted-foreground);&quot;>Your file has been uploaded to the cloud.</div></div><button class=&quot;btn btn-outline btn-sm&quot; data-dismiss>Dismiss</button>')">With Dismiss</button>
```

### Placements

```html
<button class="btn btn-secondary" onclick="toast('Message sent.', { placement: 'top-right' })">Top Right</button>
<button class="btn btn-secondary" onclick="toast('Profile updated.', { placement: 'top-center' })">Top Center</button>
<button class="btn btn-secondary" onclick="toast('New comment.', { placement: 'top-left' })">Top Left</button>
<button class="btn btn-secondary" onclick="toast('File deleted.', { placement: 'bottom-right' })">Bottom Right</button>
<button class="btn btn-secondary" onclick="toast('Changes saved.', { placement: 'bottom-center' })">Bottom Center</button>
<button class="btn btn-secondary" onclick="toast('Task completed.', { placement: 'bottom-left' })">Bottom Left</button>
```

### Persistent & Clear

```html
<button class="btn btn-secondary" onclick="toast('<span>Sending message...</span><button class=&quot;btn btn-outline btn-sm&quot; data-dismiss>Abort</button>', { duration: 0 })">Persistent</button>
<button class="btn btn-outline" onclick="toastClear()">Clear All</button>
```

### Element-based

```html
<button class="btn btn-primary" onclick="toastEl(document.getElementById('custom-toast'))">New Message</button>
<template id="custom-toast">
    <div style="display: flex; gap: 1rem;">
        <div class="avatar" style="width: 2.25rem; height: 2.25rem; flex-shrink: 0; background-color: color-mix(in oklch, var(--primary) 10%, transparent); color: var(--primary);">
            <span class="avatar-fallback" style="font-size: 0.75rem;"><i data-lucide="user" style="width: 1rem; height: 1rem;"></i></span>
        </div>
        <div style="flex: 1; min-width: 0;">
            <div style="display: flex; justify-content: space-between;">
                <div style="font-weight: 600; color: var(--foreground);">Alex Doe</div>
                <span style="font-size: 0.75rem; color: var(--muted-foreground);">Just now</span>
            </div>
            <div style="color: var(--muted-foreground); margin-bottom: 0.75rem; line-height: 1.4;">
                Hey, I just shared the project files with you. Let me know what you think!
            </div>
            <div style="display: flex; gap: 0.5rem;">
                <button class="btn btn-primary btn-sm" data-dismiss>Reply</button>
                <button class="btn btn-outline btn-sm" data-dismiss>Ignore</button>
            </div>
        </div>
        <button class="btn btn-plain btn-icon-sm" style="margin-top: -0.25rem; margin-right: -0.5rem; color: var(--muted-foreground);" data-dismiss>
            <i data-lucide="x"></i>
        </button>
    </div>
</template>
```


---

## Toggle Group

A set of two-state buttons that can be toggled on or off.

```html
<div class="toggle-group" role="group" aria-label="View selection">
    <input type="radio" name="tg-view" id="tg-view-grid" class="toggle-input">
    <label class="toggle" for="tg-view-grid"><i data-lucide="layout-grid"></i></label>
    <input type="radio" name="tg-view" id="tg-view-list" class="toggle-input" checked>
    <label class="toggle" for="tg-view-list"><i data-lucide="list"></i></label>
    <input type="radio" name="tg-view" id="tg-view-table" class="toggle-input">
    <label class="toggle" for="tg-view-table"><i data-lucide="table-2"></i></label>
</div>
```

### Single Selection (Enforced)

By default, `toggle.js` allows unselecting radio buttons. To enforce that at least one option remains selected (preventing unselection), add the `required` attribute to your native radio inputs.

```html
<div class="toggle-group" role="group" aria-label="Enforced single selection">
    <input type="radio" name="tg-enforced" id="tg-e-1" class="toggle-input" required checked>
    <label class="toggle" for="tg-e-1">Option 1</label>
    
    <input type="radio" name="tg-enforced" id="tg-e-2" class="toggle-input" required>
    <label class="toggle" for="tg-e-2">Option 2</label>
    
    <input type="radio" name="tg-enforced" id="tg-e-3" class="toggle-input" required>
    <label class="toggle" for="tg-e-3">Option 3</label>
</div>
```

### Outline

```html
<div class="toggle-group gap-0" role="group" aria-label="Format selection">
    <input type="radio" name="tg-fmt" id="tg-fmt-left" class="toggle-input">
    <label class="toggle toggle-outline" for="tg-fmt-left"><i data-lucide="align-left"></i></label>
    <input type="radio" name="tg-fmt" id="tg-fmt-center" class="toggle-input" checked>
    <label class="toggle toggle-outline" for="tg-fmt-center"><i data-lucide="align-center"></i></label>
    <input type="radio" name="tg-fmt" id="tg-fmt-right" class="toggle-input">
    <label class="toggle toggle-outline" for="tg-fmt-right"><i data-lucide="align-right"></i></label>
</div>
```

### With Text

```html
<div class="toggle-group" role="group" aria-label="Language selection">
    <input type="checkbox" id="tg-lang-en" class="toggle-input">
    <label class="toggle" for="tg-lang-en">English</label>
    <input type="checkbox" id="tg-lang-fr" class="toggle-input" checked>
    <label class="toggle" for="tg-lang-fr">French</label>
    <input type="checkbox" id="tg-lang-de" class="toggle-input">
    <label class="toggle" for="tg-lang-de">German</label>
</div>
```

### Size

```html
<div class="toggle-group" role="group" aria-label="Size sm">
    <input type="radio" name="tg-sm" id="tg-sm-s" class="toggle-input">
    <label class="toggle toggle-sm" for="tg-sm-s">S</label>
    <input type="radio" name="tg-sm" id="tg-sm-m" class="toggle-input" checked>
    <label class="toggle toggle-sm" for="tg-sm-m">M</label>
    <input type="radio" name="tg-sm" id="tg-sm-l" class="toggle-input">
    <label class="toggle toggle-sm" for="tg-sm-l">L</label>
</div>
<div class="toggle-group" role="group" aria-label="Size default">
    <input type="radio" name="tg-md" id="tg-md-s" class="toggle-input">
    <label class="toggle" for="tg-md-s">S</label>
    <input type="radio" name="tg-md" id="tg-md-m" class="toggle-input" checked>
    <label class="toggle" for="tg-md-m">M</label>
    <input type="radio" name="tg-md" id="tg-md-l" class="toggle-input">
    <label class="toggle" for="tg-md-l">L</label>
</div>
<div class="toggle-group" role="group" aria-label="Size lg">
    <input type="radio" name="tg-lg" id="tg-lg-s" class="toggle-input">
    <label class="toggle toggle-lg" for="tg-lg-s">S</label>
    <input type="radio" name="tg-lg" id="tg-lg-m" class="toggle-input" checked>
    <label class="toggle toggle-lg" for="tg-lg-m">M</label>
    <input type="radio" name="tg-lg" id="tg-lg-l" class="toggle-input">
    <label class="toggle toggle-lg" for="tg-lg-l">L</label>
</div>
```

### Spacing

```html
<div class="toggle-group gap-0" role="group" aria-label="Style selection">
    <input type="radio" name="tg-sp" id="tg-sp-1" class="toggle-input">
    <label class="toggle" for="tg-sp-1"><i data-lucide="bold"></i></label>
    <input type="radio" name="tg-sp" id="tg-sp-2" class="toggle-input" checked>
    <label class="toggle" for="tg-sp-2"><i data-lucide="italic"></i></label>
    <input type="radio" name="tg-sp" id="tg-sp-3" class="toggle-input">
    <label class="toggle" for="tg-sp-3"><i data-lucide="underline"></i></label>
</div>
```

### Vertical

```html
<div class="toggle-group flex-col" role="group" aria-label="Status selection">
    <input type="radio" name="tg-vert" id="tg-vert-i" class="toggle-input">
    <label class="toggle" for="tg-vert-i"><i data-lucide="circle-check"></i> Active</label>
    <input type="radio" name="tg-vert" id="tg-vert-w" class="toggle-input" checked>
    <label class="toggle" for="tg-vert-w"><i data-lucide="circle-dashed"></i> Pending</label>
    <input type="radio" name="tg-vert" id="tg-vert-e" class="toggle-input">
    <label class="toggle" for="tg-vert-e"><i data-lucide="circle-x"></i> Inactive</label>
</div>
```

### Disabled

```html
<div class="toggle-group" role="group" aria-label="Disabled selection">
    <input type="radio" name="tg-dis" id="tg-dis-1" class="toggle-input" disabled>
    <label class="toggle" for="tg-dis-1"><i data-lucide="moon"></i></label>
    <input type="radio" name="tg-dis" id="tg-dis-2" class="toggle-input" checked disabled>
    <label class="toggle" for="tg-dis-2"><i data-lucide="sun"></i></label>
    <input type="radio" name="tg-dis" id="tg-dis-3" class="toggle-input" disabled>
    <label class="toggle" for="tg-dis-3"><i data-lucide="cloud"></i></label>
</div>
```

### Custom

A custom toggle group example.

```html
<div class="tier-container">
    <div style="font-weight: 500; font-size: 0.875rem;">Project Tier</div>
    <div class="toggle-group" style="gap: 0.5rem;" role="group" aria-label="Project Tier">
        <input type="radio" name="tg-tier" id="tg-tier-l" class="toggle-input">
        <label class="toggle toggle-outline tier-toggle" for="tg-tier-l">
            <i data-lucide="user" class="tier-icon"></i>
            <span class="tier-label">Basic</span>
        </label>

        <input type="radio" name="tg-tier" id="tg-tier-n" class="toggle-input" checked>
        <label class="toggle toggle-outline tier-toggle" for="tg-tier-n">
            <i data-lucide="users" class="tier-icon"></i>
            <span class="tier-label">Team</span>
        </label>

        <input type="radio" name="tg-tier" id="tg-tier-b" class="toggle-input">
        <label class="toggle toggle-outline tier-toggle" for="tg-tier-b">
            <i data-lucide="building" class="tier-icon"></i>
            <span class="tier-label">Enterprise</span>
        </label>
    </div>
    <div style="font-size: 0.875rem; color: var(--muted-foreground);">
        Select a tier optimized for your team's needs.
    </div>
</div>
```


---

## Toggle

A two-state button that can be either on or off.

```html
<input type="checkbox" id="t-power" class="toggle-input">
<label class="toggle" for="t-power"><i data-lucide="power"></i></label>
```

### Outline

```html
<input type="checkbox" id="t-outline-lock" class="toggle-input">
<label class="toggle toggle-outline" for="t-outline-lock"><i data-lucide="lock"></i></label>
```

### With Text

```html
<input type="checkbox" id="t-text-private" class="toggle-input" checked>
<label class="toggle" for="t-text-private"><i data-lucide="eye-off"></i> Private Mode</label>
```

### Size

```html
<input type="checkbox" id="t-sm-w" class="toggle-input">
<label class="toggle toggle-sm" for="t-sm-w"><i data-lucide="wifi"></i></label>

<input type="checkbox" id="t-md-w" class="toggle-input">
<label class="toggle" for="t-md-w"><i data-lucide="wifi"></i></label>

<input type="checkbox" id="t-lg-w" class="toggle-input">
<label class="toggle toggle-lg" for="t-lg-w"><i data-lucide="wifi"></i></label>
```

### Disabled

```html
<input type="checkbox" id="t-dis-off" class="toggle-input" disabled>
<label class="toggle" for="t-dis-off"><i data-lucide="bookmark"></i></label>

<input type="checkbox" id="t-dis-on" class="toggle-input" checked disabled>
<label class="toggle" for="t-dis-on"><i data-lucide="heart"></i></label>
```

### Icon Change

Toggle icons can dynamically change on active states using native CSS overriding.

```html
<style>
    .toggle-icon-swap i.lucide-play {
        display: inline-flex;
    }
    .toggle-icon-swap i.lucide-square {
        display: none;
    }
    .toggle-input:checked + .toggle-icon-swap i.lucide-play {
        display: none;
    }
    .toggle-input:checked + .toggle-icon-swap i.lucide-square {
        display: inline-flex;
    }
    .toggle-input:checked + .toggle-icon-swap {
        color: var(--destructive);
        background-color: color-mix(in oklch, var(--destructive) 10%, transparent);
        border-color: color-mix(in oklch, var(--destructive) 20%, transparent);
    }
</style>
<input type="checkbox" id="t-icon-change" class="toggle-input">
<label class="toggle toggle-outline toggle-icon-swap" for="t-icon-change">
    <i data-lucide="bell"></i>
    <i data-lucide="bell-off"></i>
    <span class="state-text">Notifications</span>
</label>
```


---

## Tooltip

CSS-driven tooltip via Anchor Positioning, activated on hover or focus.

```html
<span class="tooltip-trigger" style="anchor-name: --tt-demo">
    <button class="btn btn-outline">Hover for Info</button>
    <span class="tooltip-content" style="position-anchor: --tt-demo;" data-placement="top">
        This is a helpful tooltip message.
    </span>
</span>
```

### Placements

```html
<span class="tooltip-trigger" style="anchor-name: --tt-top">
    <button class="btn btn-outline">Top</button>
    <span class="tooltip-content" data-placement="top" style="position-anchor: --tt-top;">
        Top Center
    </span>
</span>

<span class="tooltip-trigger" style="anchor-name: --tt-bottom">
    <button class="btn btn-outline">Bottom</button>
    <span class="tooltip-content" data-placement="bottom" style="position-anchor: --tt-bottom;">
        Bottom Center
    </span>
</span>

<span class="tooltip-trigger" style="anchor-name: --tt-left">
    <button class="btn btn-outline">Left</button>
    <span class="tooltip-content" data-placement="left" style="position-anchor: --tt-left;">
        Left Center
    </span>
</span>

<span class="tooltip-trigger" style="anchor-name: --tt-right">
    <button class="btn btn-outline">Right</button>
    <span class="tooltip-content" data-placement="right" style="position-anchor: --tt-right;">
        Right Center
    </span>
</span>
```