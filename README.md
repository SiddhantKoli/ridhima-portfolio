# Ridhima Chavan — Portfolio Website

A clean, responsive, editorial single-page portfolio website for **Ridhima Chavan** (Graphic Designer & Content Creator, Mumbai).
Inspired by the bold typography and seamless layout mechanics of [colin-moy.webflow.io](https://colin-moy.webflow.io/).

---

## 🚀 Quick Start (No Build Step Required)

This website is built with vanilla **HTML5, CSS3, and JavaScript**. There are **no node modules, no dependencies, and no build commands** required.

- **Option 1**: Double-click `index.html` in your file explorer to view it immediately in your browser.
- **Option 2**: Run a local HTTP server with Python or VS Code / Antigravity Live Server:
  ```bash
  python -m http.server 8000
  # Then open http://localhost:8000
  ```

---

## 📁 Project Structure

```
ridhima-portfolio/
│
├── index.html               # Semantic HTML5 single page layout
├── styles.css               # Vanilla CSS with fluid typography, marquee & lightbox styles
├── script.js                # Vanilla JS for lightbox, active nav, mobile menu, and clipboard
├── README.md                # Documentation & swap guide
│
└── assets/
    ├── favicon.svg          # Custom typographic RC monogram favicon
    │
    └── work/                # Portfolio artwork files
        ├── fincredible-2026.png       # Real design: Fincredible 2026 cover
        ├── fincredible-2025.png       # Real design: Fincredible 2025 collage cover
        ├── smooth-roads-campaign.png  # Real design: Safe Journeys infographic
        ├── epoch-fest-poster.png      # Real design: Epoch 4.0 fest poster
        └── daily-bugle-id.png         # Real design: Daily Bugle pass card
```

---

## ✏️ How to Customize & Swap Content

### 1. Adding or Swapping Portfolio Images
All portfolio items are located inside `index.html` in the `<section id="work">` block.
- To add a new project card or replace an existing artwork:
  1. Drop your `.jpg` or `.png` file into `assets/work/` (e.g., `assets/work/my-brand-project.jpg`).
  2. In `index.html`, update or duplicate an `<article class="project-card">` block and configure:
     - `data-image="assets/work/my-brand-project.jpg"`
     - `<img src="assets/work/my-brand-project.jpg" ...>`
     - `data-title="Your Project Title"`
     - `data-caption="A short sentence about the project."`

### 2. Updating Contact Links & Email
In `index.html`, navigate to the `<section id="contact">` block:
- **Email**: Update `EMAIL@PLACEHOLDER.com` in lines ~430-440 (both the text display, the `mailto:` link, and the `data-email` attribute).
- **Instagram**: Update `<a href="#">` with your actual profile link (e.g., `https://instagram.com/yourhandle`).
- **LinkedIn**: Update `<a href="#">` with your actual LinkedIn URL (e.g., `https://linkedin.com/in/yourprofile`).

### 3. Adding a Headshot Photo
In the `<section id="about">` block:
- Currently, a stylized typographic monogram badge (`RC`) is displayed.
- To use a real photo of Ridhima, replace `<div class="avatar-monogram">RC</div>` with:
  ```html
  <img src="assets/photos/ridhima.jpg" alt="Ridhima Chavan" style="width:120px;height:120px;border-radius:50%;object-fit:cover;margin-bottom:1.5rem;border:3px solid var(--accent);">
  ```

---

## 🌐 Deploying Online (Free & Instant)

### Option A: Vercel (Easiest)
1. Go to [vercel.com](https://vercel.com) and sign in.
2. Drag and drop the `ridhima-portfolio` folder directly into the Vercel dashboard.
3. Your site is live instantly with an HTTPS link (e.g., `ridhima-portfolio.vercel.app`).

### Option B: Netlify
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag and drop the project folder.
3. Claim your free `.netlify.app` URL.

### Option C: GitHub Pages
1. Push this folder to a GitHub repository.
2. In the repository **Settings** → **Pages**, select **Deploy from a branch** (`main` / root).
3. Your site will be published at `https://username.github.io/reponame/`.
