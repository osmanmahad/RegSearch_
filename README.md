# RegSearch — Regulatory Guidance Document Portal

A fast, searchable portal for regulatory guidance documents from the **FDA**, **Health Canada**, **EMA**, **ICH**, and **WHO**. Built as a single-file web app — no server, no dependencies, no build step required.

**Live demo:** *(deploy to GitHub Pages and add your link here)*

---

## Features

- **Instant cached search** — results appear as you type from a built-in database of ~45 key guidance documents across all agencies
- **Live search** — press Search or Enter to run a live search that finds additional documents in real time
- **Direct PDF links** — every result card shows the exact PDF filename and links directly to the `.pdf` file on the official agency server
- **Official page URLs** — each card displays and lets you copy the full official web page URL
- **Agency filters** — toggle FDA, Health Canada, EMA, ICH, and WHO on/off individually
- **Quick topic buttons** — one-click searches for GMP, pharmacovigilance, biosimilars, clinical trials, and more
- **Dark mode** — toggle between light and dark themes; preference is saved in `localStorage`
- **Fully responsive** — works on desktop and mobile

---

## Agencies Covered

| Agency | Full Name | Documents |
|--------|-----------|-----------|
| 🇺🇸 FDA | U.S. Food & Drug Administration | CDER, CBER, CDRH guidance |
| 🇨🇦 HC | Health Canada | TPD, BRGT, GMP, GCP guidance |
| 🇪🇺 EMA | European Medicines Agency | CHMP scientific guidelines, GVP modules |
| 🌐 ICH | Int'l Council for Harmonisation | Q, E, S, M series guidelines |
| 🌍 WHO | World Health Organization | TRS reports, GMP guidelines |

---

## Getting Started

### Option 1 — Open locally

No setup needed. Just download `index.html` and open it in any browser:

```bash
git clone https://github.com/YOUR_USERNAME/regsearch.git
cd regsearch
open index.html        # macOS
start index.html       # Windows
xdg-open index.html    # Linux
```

### Option 2 — Deploy to GitHub Pages

1. Fork or clone this repository
2. Go to **Settings → Pages** in your GitHub repo
3. Under **Source**, select `main` branch and `/ (root)`
4. Click **Save** — your site will be live at `https://YOUR_USERNAME.github.io/regsearch/`

### Option 3 — Deploy to Netlify / Vercel

Drop the `index.html` file into [Netlify Drop](https://app.netlify.com/drop) for an instant public URL — no account required.

---

## How Search Works

### Instant results (cached)
The portal includes a built-in database of ~45 curated guidance documents with verified PDF links. These are searched locally in the browser with no network request — results appear within 150ms as you type.

### Live search
When you press **Search** or **Enter**, a live search is triggered that finds additional documents beyond the cached list. Results are merged with the cached results and displayed together, with cached results labelled `cached` and live results labelled `✦ live`.

If the live search is unavailable, the portal falls back gracefully to the cached results with a warning banner.

---

## Cached Document Coverage

The built-in database includes key documents across the following topics:

- Good Manufacturing Practice (GMP)
- Good Clinical Practice (GCP)
- Pharmacovigilance & Risk Management
- Biosimilars & Biologics
- Bioequivalence & Biowaivers
- Drug Submissions & Administrative Processing
- Labeling & Product Monographs
- Medical Devices
- Pediatric Drug Development
- Stability Testing
- Common Technical Document (CTD)
- Drug Master Files (DMF)
- ICH Q, E, S, M Guidelines

---

## Project Structure

```
regsearch/
├── index.html      # The entire application — HTML, CSS, and JS in one file
└── README.md       # This file
```

The app is intentionally a single `index.html` file. This makes it trivial to host anywhere, share as an attachment, or open locally without a web server.

---

## Customisation

### Adding documents to the cached database
Open `index.html` and find the `const LOCAL = [...]` array. Each document follows this shape:

```js
{
  agency: "FDA",                         // FDA | HC | EMA | ICH | WHO
  title: "Full official document title",
  type: "Guidance",                      // Guidance | Draft Guidance | Guideline | etc.
  topic: "GMP",
  date: "2023-11",                       // YYYY-MM
  pdf_filename: "exact-filename.pdf",
  pdf_url: "https://direct-link-to.pdf",
  page_url: "https://official-page-url",
  kw: ["keyword1", "keyword2"]           // search keywords
}
```

### Changing the colour scheme
All colours are defined as CSS variables in the `:root` block at the top of the `<style>` section. Dark mode overrides are in the `body.dark` block directly below.

---

## Requirements

- A modern browser (Chrome, Firefox, Safari, Edge)
- No server, no Node.js, no build tools
- Internet connection required for Google Fonts and live search functionality; cached search works fully offline

---

## Built By

**Mahad Osman** — [LinkedIn](https://www.linkedin.com/in/osmanmahad/)

---

## Disclaimer

This portal links to publicly available regulatory guidance documents. All documents remain the property of their respective regulatory agencies. This tool is intended for informational and research purposes only and does not constitute regulatory or legal advice. Always refer to the official agency websites for the most current versions of guidance documents.
