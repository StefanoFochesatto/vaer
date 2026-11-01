# Task Prompt: Static Site Redesign Variations for VAER Systems

You are tasked with redesigning the static GitHub website for **VAER Systems** in this directory (`/home/stefano/vaer_systems`).

---

## 1. Context & Feedback on Previous Version

The previous implementation added too much "marketing fluff" (canvas particle stream animations, simulated interactive sliders, generic startup cards, and buzzword-heavy layouts). 

The source document `VAER_Systems_Brand_and_Technology_Framework.pdf` explicitly mandates an identity that is:
> **"Discreet, rigorous, technically sophisticated, Scandinavian-inspired, and internationally oriented."**  
> *"The visual language should be understated, precise, and scientific—not a conventional green-and-blue environmental-consulting look and not generic futuristic AI branding... Tone: rigorous, confident, evidence-led, and careful about uncertainty."*

---

## 2. Objective

Build **3 distinct, restrained design directions** in **3 separate git branches** (or git worktrees) so the user can easily checkout, preview, and compare them side by side.

Existing assets to reuse:
- Extracted brand logo SVGs in `assets/`: `vaer_logo.svg`, `vaer_logo_horizontal.svg`, `vaer_mark.svg`.
- Palette: Deep midnight navy (`#060b14` / `#0a1120`), silver/slate (`#94a3b8`), and restrained ice blue (`#558ed5`).

---

## 3. Strict Guidelines Across All Designs

1. **Zero Fluff:**
   - No animated canvas particle backgrounds.
   - No fake interactive sliders or mock telemetry widgets.
   - No generic SaaS marketing cards or exaggerated claims.
   - Zero unnecessary JavaScript.
2. **Substance First:**
   Structure content faithfully around the PDF framework:
   - **Identity & Heritage:** Norwegian *vær* (weather); ASCII form: *VAER*.
   - **Tagline:** *Measure. Understand. Predict.*
   - **The Three Pillars:** *Advanced Sensing Technologies*, *Computational Physics*, *Predictive Systems*.
   - **The Integrated Chain:** *Observe &rarr; Reconstruct &rarr; Model &rarr; Predict &rarr; Decide*.
   - **Initial Programs:**
     - Snowpack Sensing & Mountain Avalanche Decision Support
     - Winter Temperature Inversion Prognosis for High-Latitude Open-Pit Mining
     - Drone-Based Atmospheric & Aerosol Profiling (AeroSense)
   - **Product Families:** *VAER Cryosphere*, *VAER Atmosphere*, *VAER AeroSense*, *VAER Compute*.
   - **The 6 Development & Validation Priorities.**
   - **Contact / Technical Engagement.**
3. **Pure Static Stack:**
   - Clean, standards-compliant HTML5 and vanilla CSS.
   - Fully responsive across desktop and mobile.
   - Self-contained and immediately deployable to GitHub Pages.

---

## 4. The 3 Design Directions to Build

### Branch 1: `design/scandinavian-minimalist`
* **Concept:** Understated Nordic architectural minimalism (inspired by Dieter Rams, Scandinavian industrial research institutes, and Swiss typography).
* **Aesthetic:** Generous whitespace / darkspace, elegant typography (Times New Roman paired with clean Grotesk sans), subtle hairline dividing rules, pure high-contrast monochrome with single-point restrained ice blue accents (`#558ed5`).
* **Layout:** Clean document-style executive overview. Reads like an elite scientific whitepaper with crisp typography, quiet authority, and no visual clutter.

### Branch 2: `design/technical-spec-sheet`
* **Concept:** Engineering-first technical specification / aerospace prospectus (inspired by NASA JPL, Palantir Gotham, or high-density physics lab spec sheets).
* **Aesthetic:** High information density, monospace data tables, precise grid coordinates, hairline borders, clean section indices (`[SEC.01]`, `[SYS.02]`), and rigorous typographic hierarchy.
* **Layout:** Modular engineering specification sheet with structured tables for sensor parameters, mathematical formulations, and product family specifications.

### Branch 3: `design/editorial-monograph`
* **Concept:** Prestige academic & scientific journal editorial (inspired by *Stripe Press*, *Quanta Magazine*, or university press monographs).
* **Aesthetic:** Classical serif headings with sharp modern sans-serif body, structured two-column layout with marginalia / sidenotes for technical annotations, restrained quote callouts for the 6 validation principles.
* **Layout:** Structured narrative following the physical chain from field instrumentation to mathematical formulation and operational safety.

---

## 5. Execution Workflow

1. Base all branches off `main`:
   ```bash
   # Branch 1
   git checkout -b design/scandinavian-minimalist main
   # [Implement Design 1, test with local server, commit]

   # Branch 2
   git checkout -b design/technical-spec-sheet main
   # [Implement Design 2, test with local server, commit]

   # Branch 3
   git checkout -b design/editorial-monograph main
   # [Implement Design 3, test with local server, commit]
   ```
2. Verify that all 3 branches run cleanly with:
   ```bash
   python3 -m http.server 8000
   ```
3. Return to `main` when finished and provide a brief summary of how to view each branch.
