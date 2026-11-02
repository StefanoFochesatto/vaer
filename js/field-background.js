/* ==========================================================================
   VAER Systems — Interactive Physical Contour Field
   Pure vanilla JS, zero external dependencies.
   Works seamlessly on GitHub Pages, local preview, and all static hosts.
   ========================================================================== */
(() => {
  "use strict";

  const field = document.querySelector("[data-field-background]");
  if (!field) return;
  const hero = field.closest(".hero") || document.body;
  const svg = field.querySelector("svg");
  if (!svg) return;

  // Extract initial baseline paths
  const contours = Array.from(svg.querySelectorAll("path"), (path) => {
    const original = path.getAttribute("d");
    const nums = original.match(/-?\d+(?:\.\d+)?/g).map(Number);
    const pts = [];
    for (let i = 0; i < nums.length; i += 2) {
      pts.push([nums[i], nums[i + 1]]);
    }
    return { path, original, pts };
  });

  const pointer = {
    x: -9999,
    y: -9999,
    targetX: -9999,
    targetY: -9999,
    intensity: 0,
    targetIntensity: 0
  };

  let animFrame = 0;
  let lastTime = 0;

  function render() {
    const rx = pointer.x;
    const ry = pointer.y;
    const intensity = pointer.intensity;
    const radius = 320;
    const radiusSq = radius * radius;

    for (let c = 0; c < contours.length; c++) {
      const { path, pts, original } = contours[c];
      if (intensity < 0.01) {
        path.setAttribute("d", original);
        continue;
      }

      const coords = [];
      for (let i = 0; i < pts.length; i++) {
        const x = pts[i][0];
        const y = pts[i][1];
        const dx = x - rx;
        const dy = y - ry;
        const distSq = dx * dx + dy * dy;

        if (distSq < radiusSq) {
          const dist = Math.sqrt(distSq);
          // Smooth cosine falloff from center to radius
          const factor = Math.cos((dist / radius) * (Math.PI / 2));
          const push = 65 * factor * factor * intensity;
          // Repulsive physical vector from cursor
          const angle = Math.atan2(dy, dx);
          const nx = x + Math.cos(angle) * push * 0.45;
          const ny = y + Math.sin(angle) * push;
          coords.push(`${i === 0 ? "M" : "L"}${nx.toFixed(1)},${ny.toFixed(1)}`);
        } else {
          coords.push(`${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`);
        }
      }
      path.setAttribute("d", coords.join(" "));
    }
  }

  function loop(now) {
    animFrame = 0;
    if (document.hidden) return;

    const delta = lastTime ? Math.min(now - lastTime, 40) : 16.67;
    lastTime = now;
    const ease = 1 - Math.exp(-delta / 60);

    pointer.x += (pointer.targetX - pointer.x) * ease;
    pointer.y += (pointer.targetY - pointer.y) * ease;
    pointer.intensity += (pointer.targetIntensity - pointer.intensity) * ease;

    render();

    const moving = Math.hypot(pointer.targetX - pointer.x, pointer.targetY - pointer.y) > 0.5;
    const fading = Math.abs(pointer.targetIntensity - pointer.intensity) > 0.005;

    if (moving || fading || pointer.intensity > 0.01) {
      animFrame = requestAnimationFrame(loop);
    } else {
      pointer.x = pointer.targetX;
      pointer.y = pointer.targetY;
      pointer.intensity = pointer.targetIntensity;
      render();
      lastTime = 0;
    }
  }

  function wake() {
    if (!animFrame && !document.hidden) {
      animFrame = requestAnimationFrame(loop);
    }
  }

  function handlePointerMove(e) {
    if (e.pointerType === "touch") return; // Touch scrolling remains natural

    const rect = svg.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    // Convert screen coordinates directly into SVG viewBox (1440 x 700)
    const svgX = (e.clientX - rect.left) * (1440 / rect.width);
    const svgY = (e.clientY - rect.top) * (700 / rect.height);

    // Check if within or near hero area
    const heroRect = hero.getBoundingClientRect();
    const margin = 120;
    const inHero =
      e.clientX >= heroRect.left - margin &&
      e.clientX <= heroRect.right + margin &&
      e.clientY >= heroRect.top - margin &&
      e.clientY <= heroRect.bottom + margin;

    if (inHero) {
      pointer.targetX = svgX;
      pointer.targetY = svgY;
      if (pointer.intensity === 0) {
        pointer.x = svgX;
        pointer.y = svgY;
      }
      pointer.targetIntensity = 1;
    } else {
      pointer.targetIntensity = 0;
    }

    wake();
  }

  function handleLeave() {
    pointer.targetIntensity = 0;
    wake();
  }

  // Window-level listeners ensure smooth tracking without hover media queries
  window.addEventListener("pointermove", handlePointerMove, { passive: true });
  window.addEventListener("mousemove", handlePointerMove, { passive: true });
  document.addEventListener("mouseleave", handleLeave);
  window.addEventListener("blur", handleLeave);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) handleLeave();
  });
})();
