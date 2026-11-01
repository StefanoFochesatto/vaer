# Task Prompt: Redesign the VAER Systems Static Site

You are designing a static website for **VAER Systems** in this directory
(`/home/stefano/vaer_systems`). The repository currently contains only two things:

- `VAER_Systems_Brand_and_Technology_Framework.pdf` — the source of truth for all content.
- `assets/` — brand SVGs to reuse: `vaer_logo.svg`, `vaer_logo_horizontal.svg`,
  `vaer_mark.svg`, `vaer_symbol.svg`, `favicon.svg`, plus four framework diagrams
  (`diagram_full_chain.svg`, `diagram_cryosphere.svg`, `diagram_inversion.svg`,
  `diagram_aerosense.svg`).

Everything else has been removed on purpose. Build the new site from scratch.

---

## 1. Read the PDF First

Read `VAER_Systems_Brand_and_Technology_Framework.pdf` before writing a single
line. Every claim on the site must come from it. The framework mandates an
identity that is:

> "Discreet, rigorous, technically sophisticated, Scandinavian-inspired, and
> internationally oriented. The visual language should be understated, precise,
> and scientific — not a conventional green-and-blue environmental-consulting
> look and not generic futuristic AI branding. Tone: rigorous, confident,
> evidence-led, and careful about uncertainty."

Key content you must represent faithfully:

- **Company:** VAER Systems — evokes Norwegian *vær* (weather); VAER is the
  ASCII brand form. Name and trademark availability **not verified**.
- **Tagline:** Measure. Understand. Predict.
- **Mission:** VAER Systems develops integrated sensing, computational, and
  predictive technologies to solve complex Earth-system problems.
- **Three pillars:** Advanced Sensing Technologies · Computational Physics ·
  Predictive Systems — integrated: **observe → reconstruct → model → predict →
  decide**.
- **Programs:** (A) Snowpack sensing & avalanche decision support; (B) Winter
  temperature-inversion prognosis for open-pit mining in Alaska and Canada;
  (C) Drone-based atmospheric & aerosol sensing (AeroSense).
- **Provisional product families:** VAER Cryosphere · VAER Atmosphere ·
  VAER AeroSense · VAER Compute — areas of emphasis, not separate companies.
- **Six development & validation priorities:** (I) define the first customer and
  operational decision; (II) specify measurable performance requirements;
  (III) establish calibration, QC, field-testing, reproducibility protocols;
  (IV) validate against independent observations and historical cases;
  (V) communicate uncertainty, operating limits, and the role of human judgment;
  (VI) protect proprietary designs, software, algorithms, data workflows.
- **Caveats to carry through the site:** product-family names and taglines are
  provisional; the avalanche system supports risk assessment, not deterministic
  prediction; predictive functions must state uncertainty and limits.
- **Contact:** contact@vaer.systems (currently the only channel).

---

## 2. Reference Site: Model the Structure on stradagis.com

Study `https://stradagis.com/` and use its **structure, content pattern, and
delivery** as the model — adapted to VAER's more technical, scientific voice.

### What to copy from Strada

1. **Homepage pattern:**
   - A large two-line headline stating what the company does in plain terms
     (Strada: "Layering Geographic Data / into Actionable Insights."). For VAER,
     derive it from the tagline and mission — e.g. the shape of
     "Measuring the Environment. / Predicting What Comes Next." — and a single
     short positioning sentence below it (Strada: "your trusted partner … proudly
     serving clients from our headquarters in X").
   - An **"Our Services" section with 4–6 named service blocks**, each a short
     paragraph plus a "Key Benefits"-style bullet list. For VAER these are the
     three pillars plus its programs.
   - A **plain-language FAQ** ("What does Strada actually do?", "Who do you work
     with?", "We don't have a GIS team. Can you still help?"). Adapt to VAER:
     e.g. "What does VAER Systems actually do?", "Who do you work with?",
     "Do you provide deterministic predictions?" — and answer the last one
     honestly: *no*, the systems support risk assessment and decision-making,
     with uncertainty and limits made explicit.
   - **Direct CTAs** (Contact Us) placed after services and after the FAQ.
2. **Services-page pattern:** one section per capability — title, short
   explanatory paragraph, concrete bullet list of what the client gets, closing
   consultation CTA. No feature grids of invented products.
3. **About-page pattern:** founding mission paragraph, **"Our Values"** (3 short
   items with one-line descriptions — for VAER e.g. Rigor, Discretion,
   Scientific Integrity), then an identity/heritage section explaining the name
   (*vær*), the brand character, and visual identity parameters. Team bios are
   optional — include the section only as an empty placeholder if the framework
   has no team data.
4. **Simple global navigation** (Strada: Services / Industries / About us /
   Contact). For VAER: Technology · Programs · About · Contact. Footer with the
   same links plus the tagline and the availability caveat.

### What NOT to copy from Strada

- Its generic geospatial wording, "cutting-edge innovation" phrasing, and
  sustainability boilerplate. VAER's copy is evidence-led and specific.
- Any claim of guaranteed outcomes. Where Strada says "we help clients
  anticipate risks," VAER says *how*, from what data, and with what limits.

---

## 3. Visual Identity Constraints

- **Palette:** deep midnight navy (`#060b14` / `#0a1120`), silver/slate
  (`#94a3b8`), restrained ice blue (`#558ed5`) as the single accent. No greens,
  no gradient hero blobs, no neon.
- **Typography:** clean, architectural, highly legible sans serif (or Times New
  Roman for headings) — the framework explicitly allows either. Pick one
  pairing and use it consistently.
- **Symbol/mark:** reuse `assets/vaer_mark.svg` (and the logo lockups) in the
  header and footer. The four diagram SVGs may be used where they genuinely
  explain the integrated chain or a program — do not decorate with them.
- **Graphic language:** subtle contours, vectors, trajectories, sensor
  geometry, physical fields. If you need supporting graphics, draw precise,
  restrained SVG/CSS line-work — never stock imagery or AI-generated art.

---

## 4. Strict Guidelines

1. **Zero fluff.** No canvas particle animations, no simulated interactive
   sliders, no generic startup cards, no buzzword-heavy layouts, no marketing
   superlatives ("revolutionary", "cutting-edge", "world-class").
2. **Zero JavaScript.** Pure HTML + CSS. Static GitHub Pages ready. No
   frameworks, no build step, no external font/CDN dependencies.
3. **Faithful content only.** If a fact is not in the PDF, it does not go on
   the site. Include the availability caveat ("name and trademark availability
   not yet verified") and the provisional-status notes where they apply.
4. **Uncertainty-aware tone.** Capabilities are described with their limits.
   "Supports risk assessment" — never "predicts avalanches".
5. **Responsive and accessible.** Works from mobile to desktop; semantic
   headings, alt text on every image, visible focus states, sufficient
   contrast against the dark background.
6. **Page inventory:** `index.html`, `technology.html`, `programs.html`,
   `about.html`, `contact.html` — plus `css/style.css` and `assets/`. No extra
   pages, no blog, no news section.
7. **Single design direction.** Build one complete, opinionated site — not
   multiple branches.

---

## 5. Deliverable & Acceptance

Deliver the working tree on a single branch, committed, with all pages opening
correctly from `python3 -m http.server` (no server-side logic). Before you
finish, verify:

- [ ] Every claim traces back to the PDF.
- [ ] Homepage follows the Strada pattern: headline → positioning sentence →
      services with benefits → FAQ → CTA.
- [ ] All five pages share consistent navigation, typography, and palette.
- [ ] No JavaScript, no animations, no external dependencies.
- [ ] Caveats (provisional naming, unverified availability, uncertainty) present.
- [ ] Mobile layout is readable and the nav collapses sensibly.
