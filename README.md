# VAER Systems &mdash; Static Website

Official static website for **VAER Systems**, an elite scientific engineering and deep-technology company that turns physical understanding of Earth systems into operational predictive technologies.

> **Measure. Understand. Predict.**  
> *Advanced Sensing Technologies &bull; Computational Physics &bull; Predictive Systems*

---

## 1. Brand Concept & Origin

- **Company Name:** VAER Systems
- **Brand Rationale:** Evokes the Norwegian word **vær**, meaning *weather* and atmospheric conditions. It embodies restraint, technical credibility, and an intimate relationship with northern environments.
- **Spelling Convention:** The Norwegian spelling is `vær`; **VAER** is the ASCII brand form designed for international keyboards, URLs, and computational systems.
- **Brand Identity:** Discreet, rigorous, technically sophisticated, Scandinavian-inspired, and internationally oriented.
- **Palette:** Deep midnight navy (`#060b14`), silver/slate (`#94a3b8`), and restrained ice blue (`#558ed5`).

---

## 2. Logo Assets (Extracted from Brand Framework PDF)

In accordance with project guidelines, the official logo was pulled directly from `VAER_Systems_Brand_and_Technology_Framework.pdf` and converted to scalable vector graphics:

- `assets/vaer_logo.svg` &mdash; The complete stacked wordmark (`vær` over `SYSTEMS`) with exact letterform geometry and brand color `#558ed5`.
- `assets/vaer_logo_horizontal.svg` &mdash; Horizontal lockup designed for website headers and navigation bars.
- `assets/vaer_mark.svg` &mdash; Standalone Norwegian `vær` lettermark.
- `assets/vaer_symbol.svg` &mdash; Geometric 3-pillar brand icon (field lines, 3 connected branches representing Measurement &rarr; Modeling &rarr; Prediction).
- `assets/favicon.svg` &mdash; Multi-resolution SVG favicon.

---

## 3. Technology Pillars & Initial Programs

### The Three Technology Pillars
1. **Advanced Sensing Technologies:** Custom environmental instrumentation, sub-zero low-power telemetry, distributed snowpack thermal arrays, and drone-mounted atmospheric/aerosol profiling.
2. **Computational Physics:** Terrain-conforming Navier-Stokes wind boundary layer CFD, thermodynamic stratification solvers, and real-time variational data assimilation (4D-Var).
3. **Predictive Systems:** Integrated operational dashboards, prognostic functions for temperature inversion duration, and physically constrained risk probability envelopes.

### Initial Technology Programs
- **Program A (VAER Cryosphere):** Snowpack Sensing & Mountain Avalanche Decision Support.
- **Program B (VAER Atmosphere):** Winter Temperature Inversion Prognosis for High-Latitude Open-Pit Mining Operations (Alaska and Canada).
- **Program C (VAER AeroSense):** Drone-Based Atmospheric and Aerosol Profiling (PM1, PM2.5, PM10).
- **Family 04 (VAER Compute):** Numerical Physics Solvers & Data Assimilation API.

---

## 4. Site Structure

```
vaer_systems/
├── index.html                           # Main Homepage & Executive Overview
├── technology.html                      # 3 Pillars, Physics & Data Assimilation Deep Dive
├── programs.html                        # Flagship Technology Programs Case Studies
├── products.html                        # Product-Family Architecture Matrix
├── about.html                           # Brand Rationale, Ethos & Validation Principles
├── contact.html                         # Operational Inquiries & Form
├── css/
│   └── style.css                        # Scandinavian Minimalist Technical Design System
├── js/
│   └── main.js                          # Streamline Flow Canvas, Sandbox Simulation & UI
├── assets/
│   ├── vaer_logo.svg                    # Extracted Stacked Logo from Brand PDF
│   ├── vaer_logo_horizontal.svg         # Horizontal Brand Lockup
│   ├── vaer_mark.svg                    # Standalone 'vær' Wordmark
│   ├── vaer_symbol.svg                  # 3-Pillar Geometric Icon
│   ├── favicon.svg                      # Site Favicon
│   ├── diagram_full_chain.svg           # Observation-to-Decision Pipeline Vector
│   ├── diagram_cryosphere.svg           # Snowpack & Wind Assimilation Vector
│   ├── diagram_inversion.svg            # Mining Inversion Sounding Vector
│   └── diagram_aerosense.svg            # Drone Aerosol Profiling Platform Vector
└── VAER_Systems_Brand_and_Technology_Framework.pdf  # Source Brand Document
```

---

## 5. Deployment to GitHub Pages

This repository is built as a zero-dependency static site and deploys immediately to GitHub Pages:

### Standard GitHub Pages Setup:
1. Push this repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initialize VAER Systems static site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/vaer_systems.git
   git push -u origin main
   ```
2. In your GitHub repository:
   - Navigate to **Settings** &rarr; **Pages**.
   - Under **Build and deployment** &rarr; **Source**, select **Deploy from a branch**.
   - Select Branch: `main`, Folder: `/ (root)`, and click **Save**.
3. Your site will be live at `https://<your-username>.github.io/vaer_systems/`.

### Local Development / Preview:
Run any local static file server:
```bash
python3 -m http.server 8000
```
Then visit `http://localhost:8000`.

---

## 6. License & Legal Notice

&copy; 2026 VAER Systems. All rights reserved.  
*VAER Systems is a working brand concept and technology framework. Norwegian "vær" is the heritage spelling; "VAER" is the ASCII brand form.*
