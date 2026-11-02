/* ==========================================================================
   VAER Systems — Ultra-Smooth Atmospheric Wave & Field Streamlines
   Pure vanilla JavaScript + HTML5 Canvas (Hardware accelerated).
   Zero external dependencies. Works on GitHub Pages and all static hosts.
   ========================================================================== */
(() => {
  "use strict";

  const container = document.querySelector("[data-field-background]");
  if (!container) return;
  const hero = container.closest(".hero") || document.body;

  let canvas = container.querySelector("canvas");
  if (!canvas) {
    canvas = document.createElement("canvas");
    canvas.className = "field-canvas";
    container.innerHTML = "";
    container.appendChild(canvas);
  }

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let width = 0;
  let height = 0;
  let dpr = 1;

  // Streamlines configuration
  const LINE_COUNT = 28;
  const STEP_PX = 5; // High resolution: a sample point every 5px for silk-smooth curvature

  // Pointer state in CSS pixels relative to canvas
  const pointer = {
    x: -9999,
    y: -9999,
    targetX: -9999,
    targetY: -9999,
    intensity: 0,
    targetIntensity: 0
  };

  // Base parameters for the wave travelling left-to-right
  const WAVE_SPEED = 0.0016; // Speed of propagation to the right
  const lines = [];

  function initLines() {
    lines.length = 0;
    for (let i = 0; i < LINE_COUNT; i++) {
      const frac = i / (LINE_COUNT - 1);
      lines.push({
        baseY: frac,
        // Individual frequency & phase variations for natural fluid feel
        freq1: 0.0022 + (i % 5) * 0.0003,
        freq2: 0.0055 + (i % 3) * 0.0004,
        amp1: 18 + (i % 4) * 8,
        amp2: 8 + (i % 3) * 4,
        phase: i * 0.28,
        speedMult: 0.85 + (i % 5) * 0.08,
        alpha: 0.18 + Math.sin(frac * Math.PI) * 0.32
      });
    }
  }

  function resize() {
    const rect = container.getBoundingClientRect();
    width = Math.max(rect.width, 320);
    height = Math.max(rect.height, 240);
    dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
  }

  initLines();
  resize();
  window.addEventListener("resize", resize, { passive: true });

  let lastTime = 0;
  let time = 0;

  function draw(now) {
    if (document.hidden) {
      requestAnimationFrame(draw);
      return;
    }

    const dt = lastTime ? Math.min(now - lastTime, 40) : 16.67;
    lastTime = now;
    time += dt;

    // Smooth cursor interpolation
    const ease = 1 - Math.exp(-dt / 70);
    pointer.x += (pointer.targetX - pointer.x) * ease;
    pointer.y += (pointer.targetY - pointer.y) * ease;
    pointer.intensity += (pointer.targetIntensity - pointer.intensity) * ease;

    ctx.clearRect(0, 0, width, height);

    const px = pointer.x;
    const py = pointer.y;
    const pIntensity = pointer.intensity;
    const cursorRadius = 260;
    const cursorRadiusSq = cursorRadius * cursorRadius;

    // Create horizontal fade so lines dissolve softly behind text on left
    const fadeGrad = ctx.createLinearGradient(0, 0, width, 0);
    fadeGrad.addColorStop(0, "rgba(85, 142, 213, 0.08)");
    fadeGrad.addColorStop(0.35, "rgba(85, 142, 213, 0.45)");
    fadeGrad.addColorStop(1, "rgba(126, 175, 232, 0.7)");

    ctx.lineWidth = 1.15;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    for (let l = 0; l < lines.length; l++) {
      const line = lines[l];
      const y0 = line.baseY * (height + 120) - 60;
      const t = time * WAVE_SPEED * line.speedMult;

      ctx.beginPath();
      let started = false;

      // Sample every STEP_PX for ultra-high resolution
      for (let x = -20; x <= width + 20; x += STEP_PX) {
        // Wave equation propagating left to right: (k * x - omega * t)
        const wave1 = Math.sin(x * line.freq1 - t + line.phase) * line.amp1;
        const wave2 = Math.cos(x * line.freq2 - t * 1.3 + line.phase * 1.5) * line.amp2;
        let y = y0 + wave1 + wave2;

        // Cursor deflection field (smooth cosine repulsion)
        if (pIntensity > 0.005) {
          const dx = x - px;
          const dy = y - py;
          const distSq = dx * dx + dy * dy;

          if (distSq < cursorRadiusSq) {
            const dist = Math.sqrt(distSq);
            const factor = Math.cos((dist / cursorRadius) * (Math.PI / 2));
            const push = 60 * factor * factor * pIntensity;
            const angle = Math.atan2(dy, dx);
            y += Math.sin(angle) * push;
          }
        }

        if (!started) {
          ctx.moveTo(x, y);
          started = true;
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.strokeStyle = fadeGrad;
      ctx.globalAlpha = line.alpha;
      ctx.stroke();
    }

    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }

  requestAnimationFrame(draw);

  // Pointer tracking
  function handlePointerMove(e) {
    if (e.pointerType === "touch") return; // Touch leaves natural scrolling

    const rect = canvas.getBoundingClientRect();
    const heroRect = hero.getBoundingClientRect();
    const margin = 80;

    const inHero =
      e.clientX >= heroRect.left - margin &&
      e.clientX <= heroRect.right + margin &&
      e.clientY >= heroRect.top - margin &&
      e.clientY <= heroRect.bottom + margin;

    if (inHero) {
      pointer.targetX = e.clientX - rect.left;
      pointer.targetY = e.clientY - rect.top;
      if (pointer.intensity === 0) {
        pointer.x = pointer.targetX;
        pointer.y = pointer.targetY;
      }
      pointer.targetIntensity = 1;
    } else {
      pointer.targetIntensity = 0;
    }
  }

  function handleLeave() {
    pointer.targetIntensity = 0;
  }

  window.addEventListener("pointermove", handlePointerMove, { passive: true });
  window.addEventListener("mousemove", handlePointerMove, { passive: true });
  document.addEventListener("mouseleave", handleLeave);
  window.addEventListener("blur", handleLeave);
})();
