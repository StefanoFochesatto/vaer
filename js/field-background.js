/* A decorative contour lens. No dependencies, tracking, or perpetual render loop. */
(() => {
  "use strict";

  const field = document.querySelector("[data-field-background]");
  if (!field) return;
  const hero = field.closest(".hero");
  const svg = field.querySelector("svg");
  if (!hero || !svg) return;

  const motion = matchMedia("(prefers-reduced-motion: no-preference)");
  const pointer = matchMedia("(hover: hover) and (pointer: fine)");
  const contours = Array.from(svg.querySelectorAll("path"), (path) => {
    const original = path.getAttribute("d");
    const coordinates = original.match(/-?\d+(?:\.\d+)?/g).map(Number);
    const points = [];
    for (let i = 0; i < coordinates.length; i += 2) {
      points.push([coordinates[i], coordinates[i + 1]]);
    }
    return { path, original, points };
  });

  const current = { x: 0, y: 0, strength: 0 };
  const target = { x: 0, y: 0, strength: 0 };
  let frame = 0;
  let lastTime = 0;
  let active = false;

  function draw() {
    // Coordinates stay in the SVG viewBox, independent of viewport and pixel ratio.
    for (const { path, points } of contours) {
      const curve = points.map(([x, y], index) => {
        const dx = x - current.x;
        const dy = y - current.y;
        const influence = Math.exp(-(dx * dx + dy * dy) / (180 * 180));
        const lens = .42 * current.strength * influence;
        return `${index ? "L" : "M"}${(x + dx * lens).toFixed(1)},${(y + dy * lens).toFixed(1)}`;
      });
      path.setAttribute("d", curve.join(" "));
    }
  }

  function tick(time) {
    frame = 0;
    if (!active || document.hidden) return;
    const elapsed = lastTime ? Math.min(time - lastTime, 50) : 16.67;
    const ease = 1 - Math.exp(-elapsed / 85);
    lastTime = time;
    current.x += (target.x - current.x) * ease;
    current.y += (target.y - current.y) * ease;
    current.strength += (target.strength - current.strength) * ease;
    draw();

    if (Math.abs(target.x - current.x) > .1 ||
        Math.abs(target.y - current.y) > .1 ||
        Math.abs(target.strength - current.strength) > .001) {
      frame = requestAnimationFrame(tick);
    } else {
      Object.assign(current, target);
      if (target.strength === 0) restore();
      else draw();
      lastTime = 0;
    }
  }

  function schedule() {
    if (!frame && active && !document.hidden) frame = requestAnimationFrame(tick);
  }

  function move(event) {
    if (!active || event.pointerType === "touch") return;
    const matrix = svg.getScreenCTM();
    if (!matrix) return;
    const point = new DOMPoint(event.clientX, event.clientY).matrixTransform(matrix.inverse());
    target.x = point.x;
    target.y = point.y;
    if (!target.strength && current.strength === 0) {
      current.x = point.x;
      current.y = point.y;
    }
    target.strength = 1;
    schedule();
  }

  function leave() {
    target.strength = 0;
    schedule();
  }

  function restore() {
    for (const { path, original } of contours) path.setAttribute("d", original);
  }

  function reset() {
    cancelAnimationFrame(frame);
    frame = 0;
    lastTime = 0;
    target.strength = 0;
    current.strength = 0;
    restore();
  }

  function configure() {
    active = motion.matches && pointer.matches;
    reset();
  }

  hero.addEventListener("pointermove", move, { passive: true });
  hero.addEventListener("pointerleave", leave, { passive: true });
  hero.addEventListener("pointercancel", reset, { passive: true });
  window.addEventListener("blur", reset);
  window.addEventListener("resize", reset, { passive: true });
  window.addEventListener("scroll", reset, { passive: true });
  document.addEventListener("visibilitychange", reset);
  motion.addEventListener("change", configure);
  pointer.addEventListener("change", configure);
  configure();
})();
