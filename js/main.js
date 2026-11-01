/**
 * VAER SYSTEMS - Static Site JavaScript
 * Discreet, rigorous, technically sophisticated Earth-system simulations.
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileNav();
  initHeroCanvas();
  initChainTabs();
  initTelemetrySandbox();
  initContactForm();
});

/* ==========================================================================
   1. Theme Management (Dark / Light)
   ========================================================================== */
function initTheme() {
  const toggleBtn = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('vaer_theme') || 'dark';
  
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('vaer_theme', next);
      updateThemeIcon(next);
    });
  }
}

function updateThemeIcon(theme) {
  const toggleBtn = document.getElementById('themeToggle');
  if (!toggleBtn) return;
  toggleBtn.innerHTML = theme === 'dark' 
    ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
    : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  toggleBtn.setAttribute('title', theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
}

/* ==========================================================================
   2. Mobile Navigation
   ========================================================================== */
function initMobileNav() {
  const toggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (toggle && navMenu) {
    toggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const expanded = navMenu.classList.contains('active');
      toggle.setAttribute('aria-expanded', expanded);
    });
  }
}

/* ==========================================================================
   3. Hero Streamline / Vector Field Animated Canvas
   Simulates 2D atmospheric wind streamlines & particle trajectories
   ========================================================================== */
function initHeroCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let animationFrameId;

  // Streamline particle system
  const numParticles = 120;
  const particles = [];

  function resize() {
    const parent = canvas.parentElement;
    width = canvas.width = parent.clientWidth;
    height = canvas.height = parent.clientHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  class Particle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = initial ? Math.random() * width : -10;
      this.y = Math.random() * height;
      this.speed = 1.2 + Math.random() * 2.2;
      this.size = 1.2 + Math.random() * 1.8;
      this.life = 0;
      this.maxLife = 100 + Math.random() * 160;
      this.history = [];
    }

    update() {
      // Atmospheric wave flow: u(x,y) = base + wave perturbations
      const angle = Math.sin(this.y * 0.008 + Date.now() * 0.0004) * 0.35 + 
                    Math.cos(this.x * 0.005) * 0.2;
      
      this.x += Math.cos(angle) * this.speed;
      this.y += Math.sin(angle) * (this.speed * 0.5) + (Math.sin(this.x * 0.01) * 0.3);

      this.history.push({ x: this.x, y: this.y });
      if (this.history.length > 18) this.history.shift();

      this.life++;
      if (this.life > this.maxLife || this.x > width + 20 || this.y < -20 || this.y > height + 20) {
        this.reset();
      }
    }

    draw() {
      if (this.history.length < 2) return;
      ctx.beginPath();
      ctx.moveTo(this.history[0].x, this.history[0].y);
      for (let i = 1; i < this.history.length; i++) {
        ctx.lineTo(this.history[i].x, this.history[i].y);
      }
      const alpha = Math.sin((this.life / this.maxLife) * Math.PI) * 0.45;
      ctx.strokeStyle = `rgba(85, 142, 213, ${alpha})`;
      ctx.lineWidth = this.size;
      ctx.stroke();

      // Leading head
      ctx.fillStyle = `rgba(56, 189, 248, ${alpha * 1.5})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * 0.8, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Draw background subtle vector field grid points
    ctx.fillStyle = 'rgba(85, 142, 213, 0.08)';
    const step = 60;
    for (let x = 30; x < width; x += step) {
      for (let y = 30; y < height; y += step) {
        ctx.fillRect(x, y, 1.5, 1.5);
      }
    }

    // Update and draw particles
    particles.forEach(p => {
      p.update();
      p.draw();
    });

    animationFrameId = requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   4. Interactive Full Chain Tab Switcher
   ========================================================================== */
function initChainTabs() {
  const tabBtns = document.querySelectorAll('.tabs-nav .tab-btn');
  const panes = document.querySelectorAll('.tab-pane');

  if (!tabBtns.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');

      tabBtns.forEach(b => b.classList.remove('active'));
      panes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPane = document.getElementById(targetId);
      if (targetPane) targetPane.classList.add('active');
    });
  });
}

/* ==========================================================================
   5. Interactive Live Simulation Sandbox
   Renders real-time scientific telemetry & profiles for:
   - Mode 1: Cryosphere Snowpack Thermistor Profile & Ridge Wind
   - Mode 2: Atmosphere Open-Pit Mining Inversion Sounding
   - Mode 3: AeroSense Drone Ascent Sounding
   ========================================================================== */
function initTelemetrySandbox() {
  const canvas = document.getElementById('simulationCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const modeBtns = document.querySelectorAll('.sandbox-mode-selector .sandbox-btn');
  let currentMode = 'cryo'; // 'cryo' | 'inversion' | 'aerosense'
  let simTime = 0;

  function resizeCanvas() {
    const parent = canvas.parentElement;
    canvas.width = parent.clientWidth;
    canvas.height = parent.clientHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  modeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentMode = btn.getAttribute('data-mode');
      updateMetricsLabels(currentMode);
    });
  });

  function updateMetricsLabels(mode) {
    const m1Title = document.getElementById('m1Title');
    const m1Val = document.getElementById('m1Val');
    const m2Title = document.getElementById('m2Title');
    const m2Val = document.getElementById('m2Val');
    const m3Title = document.getElementById('m3Title');
    const m3Val = document.getElementById('m3Val');
    const m4Title = document.getElementById('m4Title');
    const m4Val = document.getElementById('m4Val');

    if (!m1Title) return;

    if (mode === 'cryo') {
      m1Title.textContent = 'Snowpack Depth:';
      m1Val.textContent = '165 cm';
      m2Title.textContent = 'Facet Gradient (dT/dz):';
      m2Val.textContent = '-0.85 °C/10cm';
      m3Title.textContent = 'Ridge Surface Wind:';
      m3Val.textContent = '14.2 m/s [285° WNW]';
      m4Title.textContent = 'Slab Stability Index:';
      m4Val.textContent = 'Elevated Hazard (0.68)';
    } else if (mode === 'inversion') {
      m1Title.textContent = 'Pit Floor Temp (Base):';
      m1Val.textContent = '-37.4 °C';
      m2Title.textContent = 'Inversion Cap Height:';
      m2Val.textContent = '480 m AGL';
      m3Title.textContent = 'PM2.5 Stagnation:';
      m3Val.textContent = '124 µg/m³ [Air Alert]';
      m4Title.textContent = 'Expected Duration:';
      m4Val.textContent = '38 hours (± 4.5h)';
    } else if (mode === 'aerosense') {
      m1Title.textContent = 'Current Altitude:';
      m1Val.textContent = '620 m AGL';
      m2Title.textContent = 'Rate of Climb:';
      m2Val.textContent = '+2.4 m/s';
      m3Title.textContent = 'Thermodynamics (P, T):';
      m3Val.textContent = '938.2 hPa | -11.6 °C';
      m4Title.textContent = 'Aerosol OPC (PM10):';
      m4Val.textContent = '22.8 µg/m³';
    }
  }

  function renderSimulation() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const w = canvas.width;
    const h = canvas.height;
    simTime += 0.03;

    // Draw grid lines
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.1)';
    ctx.lineWidth = 1;
    for (let x = 40; x < w; x += 50) {
      ctx.beginPath();
      ctx.moveTo(x, 20);
      ctx.lineTo(x, h - 30);
      ctx.stroke();
    }
    for (let y = 30; y < h - 30; y += 40) {
      ctx.beginPath();
      ctx.moveTo(40, y);
      ctx.lineTo(w - 20, y);
      ctx.stroke();
    }

    if (currentMode === 'cryo') {
      renderCryoGraph(w, h);
    } else if (currentMode === 'inversion') {
      renderInversionGraph(w, h);
    } else if (currentMode === 'aerosense') {
      renderAeroSenseGraph(w, h);
    }

    requestAnimationFrame(renderSimulation);
  }

  function renderCryoGraph(w, h) {
    // Mode 1: Depth vs Temperature with multiple sensor depths
    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px monospace';
    ctx.fillText('Depth (cm)', 45, 25);
    ctx.fillText('Temp (°C)', w - 80, h - 12);

    // Profile curve: T vs z
    const numPoints = 8;
    const depths = [0, 25, 50, 75, 100, 125, 150, 165];
    const baseTemps = [-18.5, -15.2, -12.0, -9.4, -6.8, -4.2, -1.8, -0.4];

    ctx.beginPath();
    ctx.strokeStyle = '#558ed5';
    ctx.lineWidth = 3;

    for (let i = 0; i < numPoints; i++) {
      const z = depths[i];
      const t = baseTemps[i] + Math.sin(simTime + i * 0.8) * 0.3;
      const px = 60 + ((t + 20) / 22) * (w - 120);
      const py = 40 + (z / 180) * (h - 80);

      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // Sensor nodes
    for (let i = 0; i < numPoints; i++) {
      const z = depths[i];
      const t = baseTemps[i] + Math.sin(simTime + i * 0.8) * 0.3;
      const px = 60 + ((t + 20) / 22) * (w - 120);
      const py = 40 + (z / 180) * (h - 80);

      ctx.fillStyle = i >= 4 ? '#ef4444' : '#38bdf8';
      ctx.beginPath();
      ctx.arc(px, py, 4.5, 0, Math.PI * 2);
      ctx.fill();

      // Readout text
      ctx.fillStyle = '#cbd5e1';
      ctx.fillText(`${t.toFixed(1)}°C @ ${z}cm`, px + 8, py + 3);
    }

    // Legend
    ctx.fillStyle = '#f59e0b';
    ctx.fillText('CRITICAL WEAK LAYER: FACETS @ 100-125cm (GRADIENT > 10°C/m)', 60, h - 12);
  }

  function renderInversionGraph(w, h) {
    // Mode 2: Height vs Temperature (Inversion S-curve)
    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px monospace';
    ctx.fillText('Altitude z (m AGL)', 45, 25);
    ctx.fillText('Temperature T (°C)', w - 120, h - 12);

    ctx.beginPath();
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 3;

    // Generate inversion sounding: cold at bottom, warm cap, cooling aloft
    for (let py = h - 40; py >= 40; py -= 5) {
      const normY = (h - 40 - py) / (h - 80); // 0 at bottom, 1 at top
      let temp = -38;
      if (normY < 0.45) {
        // Strong inversion cap layer
        temp = -38 + normY * (28 / 0.45);
      } else {
        // Standard adiabatic lapse rate cooling aloft
        temp = -10 - (normY - 0.45) * 16;
      }
      temp += Math.sin(simTime * 2 + normY * 10) * 0.4;
      const px = 60 + ((temp + 42) / 45) * (w - 120);

      if (py === h - 40) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // Inversion cap highlight line
    const capY = (h - 40) - 0.45 * (h - 80);
    ctx.strokeStyle = 'rgba(239, 68, 68, 0.4)';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(40, capY);
    ctx.lineTo(w - 20, capY);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = '#ef4444';
    ctx.fillText('INVERSION CAP BOUNDARY (480m) - SUBSIDENCE LID', 60, capY - 6);

    ctx.fillStyle = '#38bdf8';
    ctx.fillText('COLD AIR POOL (-38°C) - TRAPPED PARTICULATES', 60, h - 25);
  }

  function renderAeroSenseGraph(w, h) {
    // Mode 3: Drone Ascent Sounding (Simultaneous P, T, PM Profiles)
    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px monospace';
    ctx.fillText('Ascent Altitude (0 to 1200m AGL)', 45, 25);

    // Temperature curve (blue)
    ctx.beginPath();
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2.5;
    for (let py = h - 40; py >= 40; py -= 4) {
      const zNorm = (h - 40 - py) / (h - 80);
      const temp = -2.0 - zNorm * 8.5 + Math.sin(simTime + zNorm * 6) * 0.5;
      const px = 60 + ((temp + 12) / 16) * (w * 0.45);
      if (py === h - 40) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // Aerosol PM2.5 curve (amber)
    ctx.beginPath();
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2.5;
    for (let py = h - 40; py >= 40; py -= 4) {
      const zNorm = (h - 40 - py) / (h - 80);
      const pm = 45 * Math.exp(-zNorm * 3.5) + 3 + Math.cos(simTime + zNorm * 8) * 1.5;
      const px = w * 0.55 + (pm / 50) * (w * 0.38);
      if (py === h - 40) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // Current drone position blip
    const droneZNorm = (Math.sin(simTime * 0.5) * 0.5 + 0.5);
    const droneY = (h - 40) - droneZNorm * (h - 80);

    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(w * 0.5, droneY, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#34d399';
    ctx.fillText(`DRONE SOUNDING FIX: ${(droneZNorm * 1200).toFixed(0)}m AGL`, w * 0.5 + 14, droneY + 4);

    // Legend
    ctx.fillStyle = '#38bdf8';
    ctx.fillText('— Temperature Profile T(z)', 60, h - 12);
    ctx.fillStyle = '#f59e0b';
    ctx.fillText('— Particulate PM2.5 (µg/m³)', w * 0.55, h - 12);
  }

  renderSimulation();
}

/* ==========================================================================
   6. Contact Form Validation & Feedback
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const alertBox = document.getElementById('formAlert');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('[name="name"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    const category = form.querySelector('[name="category"]').value;
    const message = form.querySelector('[name="message"]').value.trim();

    if (!name || !email || !message) {
      showAlert('Please complete all required fields.', 'error');
      return;
    }

    // Email regex test
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showAlert('Please provide a valid technical email address.', 'error');
      return;
    }

    // Success response
    showAlert(`Thank you, ${name}. Your operational inquiry regarding [${category}] has been queued for review by our engineering team.`, 'success');
    form.reset();
  });

  function showAlert(msg, type) {
    if (!alertBox) return;
    alertBox.textContent = msg;
    alertBox.style.display = 'block';
    alertBox.style.padding = '1rem';
    alertBox.style.borderRadius = '6px';
    alertBox.style.marginBottom = '1.5rem';
    alertBox.style.fontFamily = 'monospace';
    alertBox.style.fontSize = '0.88rem';

    if (type === 'error') {
      alertBox.style.background = 'rgba(239, 68, 68, 0.15)';
      alertBox.style.border = '1px solid #ef4444';
      alertBox.style.color = '#fca5a5';
    } else {
      alertBox.style.background = 'rgba(52, 211, 153, 0.15)';
      alertBox.style.border = '1px solid #34d399';
      alertBox.style.color = '#6ee7b7';
    }
  }
}
