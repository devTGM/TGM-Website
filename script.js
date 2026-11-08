/* ==========================================================================
   THINK GROW MEDIA // CYBERNETIC ENGINE JAVASCRIPT
   Features:
   - 3D Perspective Wireframe & Particle Horizon Canvas Engine
   - Dual-Ring Magnetic Cyber Cursor with Contextual Tags
   - Web Audio API Cyber Synthesizer
   - Interactive Live Graph Auction Simulator (Canvas API)
   - Ad Teardown Lab State Machine
   - Case Archive Filtering & Dossier Modals
   - Real-Time IST Noida Telemetry Clock & Ping Simulator
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initCyberCanvas();
  initCyberCursor();
  initAudioEngine();
  initTelemetryClock();
  initAdTeardown();
  initAuctionSimulator();
  initArchiveFilters();
  initCreativeVideoFilters();
  initWebsitePreviewFilters();
  initWeirdFilters();
  initMobileNavigation();
});

/* --------------------------------------------------------------------------
   0. LIGHT / DARK THEME ENGINE
   -------------------------------------------------------------------------- */
function initThemeToggle() {
  const toggleBtn = document.getElementById('themeToggle');
  const themeStatus = document.getElementById('themeStatus');
  const themeIcon = document.getElementById('themeIcon');
  const mToggleBtn = document.getElementById('mThemeToggle');

  const savedTheme = localStorage.getItem('tgm-theme') || 'dark';
  applyTheme(savedTheme);

  function applyTheme(theme) {
    if (theme === 'light') {
      document.body.classList.remove('dark-theme');
      document.body.classList.add('light-theme');
      if (themeStatus) themeStatus.textContent = 'LIGHT';
      if (toggleBtn) toggleBtn.setAttribute('aria-checked', 'true');
      localStorage.setItem('tgm-theme', 'light');
    } else {
      document.body.classList.remove('light-theme');
      document.body.classList.add('dark-theme');
      if (themeStatus) themeStatus.textContent = 'DARK';
      if (toggleBtn) toggleBtn.setAttribute('aria-checked', 'false');
      localStorage.setItem('tgm-theme', 'dark');
    }
  }

  function toggle() {
    const isDark = document.body.classList.contains('dark-theme');
    applyTheme(isDark ? 'light' : 'dark');
    playBeep(640, 'triangle', 0.06, 0.05);
  }

  if (toggleBtn) toggleBtn.addEventListener('click', toggle);
  if (mToggleBtn) mToggleBtn.addEventListener('click', toggle);
}

/* --------------------------------------------------------------------------
   1. 3D PERSPECTIVE WIREFRAME & PARTICLE CANVAS
   -------------------------------------------------------------------------- */
function initCyberCanvas() {
  const canvas = document.getElementById('cyberCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  let mouseX = width / 2;
  let mouseY = height / 2;
  let targetMouseX = mouseX;
  let targetMouseY = mouseY;

  window.addEventListener('mousemove', (e) => {
    targetMouseX = e.clientX;
    targetMouseY = e.clientY;
  }, { passive: true });

  // Floating Particles
  const particleCount = 45;
  const particles = [];
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2 + 1,
      alpha: Math.random() * 0.5 + 0.2
    });
  }

  let horizonOffset = 0;

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Smooth mouse interpolation
    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;

    const horizonY = height * 0.65 + (mouseY - height / 2) * 0.15;
    const vanishX = width * 0.5 + (mouseX - width / 2) * 0.2;

    const isLight = document.body.classList.contains('light-theme');

    // Draw Perspective Grid Horizon
    ctx.strokeStyle = isLight ? 'rgba(217, 27, 36, 0.08)' : 'rgba(255, 42, 59, 0.08)';
    ctx.lineWidth = 1;

    // Perspective lines fanning out from vanishing point
    const lines = 24;
    for (let i = -lines / 2; i <= lines / 2; i++) {
      const startX = vanishX + i * 25;
      const endX = vanishX + i * (width / lines) * 3.5;
      ctx.beginPath();
      ctx.moveTo(startX, horizonY);
      ctx.lineTo(endX, height);
      ctx.stroke();
    }

    // Horizontal receding lines
    horizonOffset = (horizonOffset + 0.3) % 40;
    for (let y = horizonY; y < height; y += (y - horizonY) * 0.25 + 6) {
      const dynamicY = y + horizonOffset * 0.15;
      if (dynamicY < height) {
        ctx.beginPath();
        ctx.moveTo(0, dynamicY);
        ctx.lineTo(width, dynamicY);
        ctx.stroke();
      }
    }

    // Floating Ambient Constellation Particles
    ctx.fillStyle = isLight ? 'rgba(217, 27, 36, 0.45)' : 'rgba(255, 60, 80, 0.55)';
    for (let i = 0; i < particleCount; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();

      // Connect nearby particles
      for (let j = i + 1; j < particleCount; j++) {
        const p2 = particles[j];
        const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
        if (dist < 110) {
          ctx.strokeStyle = isLight ? `rgba(217, 27, 36, ${0.1 * (1 - dist / 110)})` : `rgba(255, 42, 59, ${0.1 * (1 - dist / 110)})`;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(render);
  }

  render();
}

/* --------------------------------------------------------------------------
   2. DUAL-RING MAGNETIC CYBER CURSOR
   -------------------------------------------------------------------------- */
function initCyberCursor() {
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  const text = document.getElementById('cursorText');
  if (!dot || !ring) return;

  let mouseX = -100, mouseY = -100;
  let ringX = -100, ringY = -100;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
  }, { passive: true });

  function updateCursor() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;
    requestAnimationFrame(updateCursor);
  }
  updateCursor();

  // Inspect hovered targets for data-cursor attribute
  document.querySelectorAll('[data-cursor], a, button, input, select, textarea').forEach(el => {
    el.addEventListener('mouseenter', () => {
      const label = el.getAttribute('data-cursor') || 'SELECT';
      ring.classList.add('active-hover');
      text.textContent = label;
      playBeep(980, 'sine', 0.02, 0.02);
    });

    el.addEventListener('mouseleave', () => {
      ring.classList.remove('active-hover');
      text.textContent = '';
    });
  });
}

/* --------------------------------------------------------------------------
   3. WEB AUDIO API SYNTHESIZER
   -------------------------------------------------------------------------- */
let audioCtx = null;
let soundEnabled = false;

function initAudioEngine() {
  const toggleBtn = document.getElementById('soundToggle');
  const statusLabel = document.getElementById('soundStatus');

  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    if (!audioCtx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) audioCtx = new AudioCtx();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    soundEnabled = !soundEnabled;
    toggleBtn.classList.toggle('active', soundEnabled);
    statusLabel.textContent = soundEnabled ? 'ACTIVE' : 'MUTE';

    if (soundEnabled) {
      playArpeggio([440, 554, 659, 880]); // Cyber boot chime
    }
  });

  document.querySelectorAll('button, .btn, .nav-link, .filter-btn, .seg-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (soundEnabled) playBeep(620, 'triangle', 0.06, 0.05);
    });
  });
}

function playBeep(freq, type = 'sine', duration = 0.05, gain = 0.04) {
  if (!soundEnabled || !audioCtx) return;
  try {
    const osc = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    g.gain.setValueAtTime(gain, audioCtx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
    osc.connect(g);
    g.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {
    console.debug('Audio error:', e);
  }
}

function playArpeggio(notes) {
  notes.forEach((freq, idx) => {
    setTimeout(() => playBeep(freq, 'sine', 0.12, 0.05), idx * 60);
  });
}

/* --------------------------------------------------------------------------
   4. NOIDA NCR TELEMETRY CLOCK & PING
   -------------------------------------------------------------------------- */
function initTelemetryClock() {
  const topClock = document.getElementById('hudTime');
  const footerClock = document.getElementById('footerClock');
  const latency = document.getElementById('hudLatency');

  function update() {
    try {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      const formatted = new Intl.DateTimeFormat('en-IN', options).format(now);
      if (topClock) topClock.textContent = `${formatted} IST`;
      if (footerClock) footerClock.textContent = `${formatted} IST (SECTOR 62)`;

      if (latency && Math.random() > 0.7) {
        latency.textContent = `${Math.floor(Math.random() * 6) + 12}ms`;
      }
    } catch {
      if (topClock) topClock.textContent = 'ONLINE (DELHI NCR)';
    }
  }

  update();
  setInterval(update, 1000);
}

/* --------------------------------------------------------------------------
   5. AD TEARDOWN LAB (STATE MACHINE)
   -------------------------------------------------------------------------- */
const teardownArchive = {
  tgm: {
    badge: 'TGM_ENGINEERED_ASSET // SCALED TO ₹1.8CR+',
    badgeClass: 'good',
    title: '"Stop Using Retinol Like It’s 2019. The Hidden Mechanism Behind Skin Barrier Breakdown."',
    script: 'Visual: Microscopic 3D cellular breakdown of lipid matrix vs cosmetic hydration in first 0.6s. Hook: Direct contrary-belief claim contradicting conventional beauty wisdom. Body: Unpacks the biological mechanism with clinical proof. Offer: Zero-risk 30-day clinical restoration guarantee.',
    stats: [
      { v: '4.82X', k: 'VERIFIED ROAS' },
      { v: '48.4%', k: '3S THUMB-STOP' },
      { v: '₹340', k: 'MEDIAN CPA' }
    ],
    specs: [
      { badge: '0-3S HOOK', cls: 'green', desc: 'Disrupts doom-scrolling pattern with contrarian cognitive dissonance.' },
      { badge: 'AUDIO SIGNAL', cls: 'green', desc: 'Voice transcript keywords trigger Meta AI to deliver to buyers with purchase intent.' },
      { badge: 'MECHANISM', cls: 'green', desc: 'Shows why previous solutions failed without generic models or clichés.' },
      { badge: 'OFFER FRICTION', cls: 'green', desc: 'Pre-bundled checkout flow with automated WhatsApp order confirmation.' }
    ]
  },
  old: {
    badge: 'STANDARD_AGENCY_AD // BURNED ₹4.5L AT 1.2X ROAS',
    badgeClass: 'bad',
    title: '"Experience The Ultimate Glow! Premium Natural Face Serum. 20% Off Today."',
    script: 'Visual: Slow 4.2-second corporate logo fade-in, generic ukulele royalty-free track, smiling model holding bottle in bathroom mirror. Hook: "Looking for glowing skin?" (Rhetorical question that 84% swipe away from). Offer: Complicated promo code in small caption.',
    stats: [
      { v: '1.20X', k: 'BLEEDING ROAS' },
      { v: '13.8%', k: '3S THUMB-STOP' },
      { v: '₹1,280', k: 'BLOATED CPA' }
    ],
    specs: [
      { badge: '0-3S HOOK', cls: 'red', desc: '4-second logo fade causes immediate 86% audience abandonment.' },
      { badge: 'AUDIO SIGNAL', cls: 'red', desc: 'Cheesy background music gives zero semantic targeting cues to Meta algorithm.' },
      { badge: 'MECHANISM', cls: 'red', desc: 'Vague marketing jargon ("nourishing herbs") without scientific credibility.' },
      { badge: 'OFFER FRICTION', cls: 'red', desc: 'Requires manual promo code entry; high cart abandonment at checkout.' }
    ]
  }
};

function initAdTeardown() {
  const btnTgm = document.getElementById('btnTgmAsset');
  const btnOld = document.getElementById('btnOldAsset');
  const container = document.getElementById('teardownConsole');
  const chip = document.getElementById('teardownStatusChip');

  if (!btnTgm || !btnOld || !container) return;

  function render(mode) {
    const data = teardownArchive[mode];
    chip.textContent = mode === 'tgm' ? 'STATUS: HIGH ALGORITHMIC AFFINITY // ROAS SCALING' : 'STATUS: SEVERE AUCTION BLEED // HIGH CPA';
    chip.style.color = mode === 'tgm' ? 'var(--neon-emerald)' : 'var(--neon-rose)';

    container.innerHTML = `
      <div class="teardown-grid-hud">
        <div class="ad-mock-box">
          <span class="ad-mock-tag ${data.badgeClass}">${data.badge}</span>
          <h4 class="ad-mock-title">${data.title}</h4>
          <p class="ad-mock-script">${data.script}</p>

          <div class="ad-hud-stats">
            ${data.stats.map(s => `
              <div class="h-stat-cell">
                <span class="h-stat-v ${mode === 'tgm' ? 'text-glow-emerald' : 'text-glow-amber'}">${s.v}</span>
                <span class="h-stat-k">${s.k}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="anatomy-specs">
          <span style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--neon-cyan); letter-spacing: 0.1em;">// CREATIVE SIGNAL ARCHITECTURE</span>
          ${data.specs.map(s => `
            <div class="spec-row">
              <span class="spec-badge ${s.cls}">${s.badge}</span>
              <p class="spec-desc">${s.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  btnTgm.addEventListener('click', () => {
    btnTgm.classList.add('active');
    btnOld.classList.remove('active');
    render('tgm');
    playArpeggio([523, 659, 784]);
  });

  btnOld.addEventListener('click', () => {
    btnOld.classList.add('active');
    btnTgm.classList.remove('active');
    render('old');
    playBeep(220, 'sawtooth', 0.15, 0.06);
  });

  render('tgm');
}

/* --------------------------------------------------------------------------
   6. ALGORITHMIC AUCTION SIMULATOR & LIVE CANVAS GRAPH
   -------------------------------------------------------------------------- */
function initAuctionSimulator() {
  const slider = document.getElementById('simSpendRange');
  const pill = document.getElementById('simSpendPill');
  const sectorBtns = document.querySelectorAll('.sector-btn');
  const revOutput = document.getElementById('simRevOutput');
  const roasOutput = document.getElementById('simRoasOutput');
  const cadenceEl = document.getElementById('simSprintCadence');
  const cacEl = document.getElementById('simCacDrop');
  const tierEl = document.getElementById('simTierRec');
  const canvas = document.getElementById('simGraphCanvas');

  if (!slider || !canvas) return;
  const ctx = canvas.getContext('2d');

  let activeMultiplier = 4.4;

  function drawLiveGraph(spend, mult) {
    const w = (canvas.width = canvas.offsetWidth * 2);
    const h = (canvas.height = canvas.offsetHeight * 2);
    ctx.clearRect(0, 0, w, h);

    const isLight = document.body.classList.contains('light-theme');

    // Grid lines
    ctx.strokeStyle = isLight ? 'rgba(0, 0, 0, 0.06)' : 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += w / 6) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += h / 3) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // TGM Scaling Curve (Rising Compound Exponential in Crimson Red)
    ctx.strokeStyle = '#ff2a3b';
    ctx.lineWidth = 4;
    ctx.shadowColor = '#ff2a3b';
    ctx.shadowBlur = isLight ? 6 : 14;

    ctx.beginPath();
    ctx.moveTo(0, h * 0.85);
    ctx.bezierCurveTo(w * 0.35, h * 0.75, w * 0.65, h * 0.4, w, h * 0.15);
    ctx.stroke();

    // Standard Ad Degrading Curve (CPA spikes, ROAS drops)
    ctx.shadowBlur = 0;
    ctx.strokeStyle = 'rgba(255, 51, 102, 0.6)';
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 6]);

    ctx.beginPath();
    ctx.moveTo(0, h * 0.6);
    ctx.bezierCurveTo(w * 0.3, h * 0.55, w * 0.6, h * 0.8, w, h * 0.9);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  function updateSimulation() {
    const spend = parseInt(slider.value, 10);
    const spendInLakhs = (spend / 100000).toFixed(1);
    pill.textContent = `₹${spendInLakhs}L / MO`;

    const minRev = ((spend * activeMultiplier) / 100000).toFixed(1);
    const maxRev = ((spend * (activeMultiplier + 0.9)) / 100000).toFixed(1);

    revOutput.textContent = `₹${minRev}L – ₹${maxRev}L`;
    roasOutput.textContent = `TARGET ROAS: ${activeMultiplier.toFixed(1)}X – ${(activeMultiplier + 0.9).toFixed(1)}X`;

    if (spend <= 300000) {
      cadenceEl.textContent = '8 Hooks / Mo';
      cacEl.textContent = '-28% to -36%';
      tierEl.textContent = 'Growth Audit / Starter Engine';
    } else if (spend <= 1500000) {
      cadenceEl.textContent = '14–18 Modular Hooks / Mo';
      cacEl.textContent = '-38% to -52%';
      tierEl.textContent = 'Creative Performance Engine';
    } else {
      cadenceEl.textContent = '28+ Modular 3D / UGC Hooks / Mo';
      cadenceEl.textContent = 'Sprint Every 48 Hours';
      cacEl.textContent = '-45% to -60%';
      tierEl.textContent = 'Full-Stack Brand & Scale Retainer';
    }

    drawLiveGraph(spend, activeMultiplier);
  }

  slider.addEventListener('input', () => {
    updateSimulation();
  });

  window.addEventListener('resize', () => {
    updateSimulation();
  }, { passive: true });

  sectorBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sectorBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeMultiplier = parseFloat(btn.dataset.roas || '4.0');
      updateSimulation();
      playBeep(740, 'sine', 0.04);
    });
  });

  updateSimulation();
}

/* --------------------------------------------------------------------------
   7. CASE ARCHIVE FILTERING & DOSSIER MODALS (24 VERIFIED CATEGORY CASES)
   -------------------------------------------------------------------------- */
const archiveDossiers = {
  "case1": {
    "id": "case1",
    "code": "CASE // 001",
    "category": "FINE JEWELRY & 925 STERLING SILVER",
    "niche": "E-Commerce Niche // High-Ticket Precious Metals",
    "filter": "jewelry",
    "title": "Fine Jewelry & Sterling Silver: Scaling Past Revenue Plateau to \u20b93.35 Crore",
    "platform": "META ADVANTAGE+ \u2022 GOOGLE PMAX \u2022 SHOPIFY",
    "image": "assets/casestudies/case-study-3.png",
    "heroStats": "\u20b93,35,30,951.28 Gross Sales (+2,000% Scale) | 2,695 Orders (+953%) | 4.85X ROAS",
    "challenge": "Stalled at \u20b915L/month ceiling with rising Meta CAC (>\u20b9920/order) and severe ad fatigue within 4 days on broad interest ad sets. 0% Google search market share.",
    "solution": "Engineered 18 UGC hook angles contrasting cheap fashion alloys with certified 925 anti-tarnish silver. Rebuilt Meta campaigns into Advantage+ Shopping Campaigns (ASC) with 3-tier bundle ladders, paired with high-intent Google PMax capturing 'anti-tarnish jewelry'.",
    "aov": "\u20b93,240",
    "cac": "\u20b9410 (-46% reduction)",
    "roas": "4.85X Blended",
    "volume": "6.3 Lakh Sessions",
    "results": [
      "Total gross sales surged to \u20b93,35,30,951.28 (+2,000% exponential scale over baseline).",
      "Delivered 2,695 verified customer orders (+953% increase).",
      "Blended CAC dropped from \u20b9920 to \u20b9410 (-46% reduction), expanding contribution margin to record highs.",
      "Google Ads captured 38% of total revenue at an incremental 5.2X Target ROAS."
    ]
  },
  "case2": {
    "id": "case2",
    "code": "CASE // 002",
    "category": "OVERSIZED STREETWEAR & HEAVYWEIGHT APPAREL",
    "niche": "E-Commerce Niche // Gen-Z Fashion & Heavy GSM Drops",
    "filter": "apparel",
    "title": "Oversized Streetwear: Scaling Daily Ad Spend Past \u20b925K with Stable 4.35X ROAS",
    "platform": "META ADS (ASC) \u2022 SHOPIFY SPEED",
    "image": "assets/casestudies/case-study-6-v2.png",
    "heroStats": "\u20b961,08,115.00 30-Day Revenue (+16% MoM) | 373 High-AOV Orders | \u20b93,850 AOV",
    "challenge": "Severe ROAS collapse whenever daily budgets crossed \u20b925,000/day due to ad fatigue across generic streetwear audiences, combined with a 74% mobile cart drop-off rate.",
    "solution": "Implemented an 80/20 Creative Testing Sandbox with 12 weekly Reels demonstrating styling versatility and fabric GSM weight. Re-engineered Shopify into a 1-page mobile checkout with automated WhatsApp cart recovery.",
    "aov": "\u20b93,850",
    "cac": "\u20b9580",
    "roas": "4.35X Blended",
    "volume": "58.9K High-Intent",
    "results": [
      "Generated \u20b961,08,115.00 in verified sales in a single 30-day scaling window.",
      "Achieved +16% incremental top-line growth at high-budget saturation.",
      "Delivered 373 high-ticket streetwear orders across 58.9K qualified sessions.",
      "Checkout completion rate jumped from 26% to 48% on mobile devices."
    ]
  },
  "case3": {
    "id": "case3",
    "code": "CASE // 003",
    "category": "CLINICAL BOTANICAL SKINCARE & AYURVEDA",
    "niche": "E-Commerce Niche // Active Botanical Dermatology",
    "filter": "beauty",
    "title": "Botanical Skincare: Overcoming Herbal Skepticism to Deliver 1,073 Monthly Orders",
    "platform": "PERFORMANCE CREATIVES \u2022 SHOPIFY \u2022 META ADS",
    "image": "assets/casestudies/case-study-5.png",
    "heroStats": "\u20b922,10,050.15 Monthly Sales (+53% MoM) | 1,073 Orders (+55%) | +56% CVR Lift",
    "challenge": "Customer skepticism on herbal claims; generic product carousels failed to convey ingredient potency, capping monthly sales at \u20b914L with high customer acquisition costs.",
    "solution": "TGM creative sprints produced 14 direct-response UGC hooks weekly contrasting chemical irritants with cold-pressed botanical extracts. Built a high-speed pre-sale landing page with sticky ATC buttons and clinical social proof.",
    "aov": "\u20b92,060",
    "cac": "\u20b9460 (-34%)",
    "roas": "4.15X Blended",
    "volume": "73.9K Visitors",
    "results": [
      "Monthly sales surged to \u20b922,10,050.15 (+53% month-over-month expansion).",
      "Breached the 1,000 monthly order milestone with 1,073 verified orders (+55%).",
      "Store conversion rate increased by +56% across 73.9K unique store sessions.",
      "Repeat customer order rate climbed to 41% within 60 days of purchase."
    ]
  },
  "case4": {
    "id": "case4",
    "code": "CASE // 004",
    "category": "ARCHITECTURAL CONCRETE DESK LIVING & DECOR",
    "niche": "E-Commerce Niche // Minimalist Workspace Architecture",
    "filter": "home",
    "title": "Minimalist Desk Living: Slashing RTO and Converting 813 Orders in 25 Days",
    "platform": "SHOPIFY \u2022 META ADS (CBO)",
    "image": "assets/casestudies/case-study-8.png",
    "heroStats": "\u20b916,71,480.80 in 25 Days (+48%) | 813 Orders Delivered | -31% Blended CPC",
    "challenge": "Audience overlap and ad cannibalization between 7 split ad sets caused severe ROAS fluctuations between weekdays and weekends. High delivery return rate (RTO) on cash-on-delivery orders eroded net profit margins.",
    "solution": "Consolidated fragmented ad sets into 1 unified Campaign Budget Optimization (CBO) powerhouse with dayparting bid caps. Produced ASMR desk setup transformation videos with aesthetic cinematic lighting. Automated a \u20b9150 prepaid checkout incentive to slash COD RTO by 38%.",
    "aov": "\u20b92,055",
    "cac": "\u20b9430",
    "roas": "4.45X Blended",
    "volume": "63.0K Sessions",
    "results": [
      "Captured \u20b916,71,480.80 in top-line revenue in just 25 days (+48% growth).",
      "Fulfilled 813 customer orders with a 94% successful delivery rate.",
      "Blended Cost Per Click (CPC) dropped by -31% while expanding qualified reach to 63,000 shoppers.",
      "COD return rate decreased by 38%, recovering \u20b92.4L in previously lost shipping fees."
    ]
  },
  "case5": {
    "id": "case5",
    "code": "CASE // 005",
    "category": "CUSTOM SPORTS APPAREL & FAN MERCHANDISE",
    "niche": "E-Commerce Niche // Athletic Kits & Personalized Fan Gear",
    "filter": "apparel",
    "title": "Sports Merchandise: 0-to-1 Turnaround Exploding from Flatline to \u20b911.00 Lakhs",
    "platform": "META ADS \u2022 SHOPIFY STOREFRONT REBUILD",
    "image": "assets/casestudies/case-study-4.png",
    "heroStats": "\u20b911,00,456.81 Sales (+6,400% Explosion) | 918 Orders (+7,000%) | 1.41% CVR (+220%)",
    "challenge": "The brand was completely flatlined with under \u20b917,000 total sales prior to engagement. The previous agency burned budget boosting Instagram posts without tracking pixels or customized name/number previews.",
    "solution": "Complete operational turnaround. Rebuilt their Shopify store with interactive name & number customization software. Aligned creative drops with Champions League and Premier League matchdays, backed by broad Advantage+ campaign structures.",
    "aov": "\u20b91,200",
    "cac": "\u20b9240",
    "roas": "5.0X Blended",
    "volume": "44.7K Qualified",
    "results": [
      "Rocketed from \u20b917K baseline to \u20b911,00,456.81 (+6,400% explosion).",
      "Generated 918 verified orders (+7,000% lift) within 90 days.",
      "Conversion rate surged from 0.44% to 1.41% (+220% lift).",
      "Customized matchday kits achieved zero product returns across the campaign."
    ]
  },
  "case6": {
    "id": "case6",
    "code": "CASE // 006",
    "category": "HERITAGE POLKI & BRIDAL COUTURE JEWELRY",
    "niche": "E-Commerce Niche // High-Ticket Bridal & Handcrafted Polki",
    "filter": "jewelry",
    "title": "Bridal Couture Jewelry: Capturing High-Intent Demand with 5.4X Google Search ROAS",
    "platform": "GOOGLE SEARCH & PMAX \u2022 SHOPIFY",
    "image": "assets/casestudies/case-study-7.png",
    "heroStats": "\u20b99,91,442.21 Google Revenue (+687%) | 831 High-Intent Orders | 5.4X ROAS",
    "challenge": "Bleeding media budget on generic broad Google keywords with zero negative exclusion lists, pulling low-intent searches with an 82% bounce rate and negative ROAS.",
    "solution": "Re-architected Google Merchant Center product feed with transactional modifiers ('handcrafted bridal kundan set', 'real polki choker'). Meticulously sculpted 1,200+ negative keywords and scaled Google PMax on Target ROAS bidding.",
    "aov": "\u20b91,195",
    "cac": "\u20b9220",
    "roas": "5.4X Google Ads",
    "volume": "39.6K High-Intent",
    "results": [
      "Scaled Google Ads revenue to \u20b99,91,442.21 (+687% revenue explosion).",
      "Secured 831 direct consumer purchases (+731% order lift).",
      "Drove 39.6K highly qualified shoppers (+402%) at a healthy 1.38% conversion rate.",
      "Maintained a stellar 5.4X Google Ads ROAS across all commercial search tiers."
    ]
  },
  "case7": {
    "id": "case7",
    "code": "CASE // 007",
    "category": "ARTISANAL NATURAL PERFUMERY & NICHE EXTRACTS",
    "niche": "E-Commerce Niche // Luxury Clean Perfumery & Extracts",
    "filter": "beauty",
    "title": "Artisanal Perfumery: Solving the Digital Blind-Buy Barrier with Discovery Set Funnels",
    "platform": "META ADS \u2022 SHOPIFY DISCOVERY FUNNEL",
    "image": "assets/casestudies/case-study-2.png",
    "heroStats": "\u20b92,38,082.80 Launch Sprint (+158%) | 106 Orders (+130%) | 42% Repurchase Rate",
    "challenge": "A newly launched artisanal fragrance brand faced severe purchase hesitation on cold traffic ('cannot smell perfume online'), yielding a 0.28% conversion rate on full-size bottles.",
    "solution": "Engineered a '5-Piece Scent Discovery Set' tripwire offer with a 100% cashback coupon toward full bottles. Ran 14 creator video hooks demonstrating olfactory scent projection and notes.",
    "aov": "\u20b92,245 (Full Bottle Upsell)",
    "cac": "\u20b9340",
    "roas": "3.8X Blended",
    "volume": "20.7K Sessions",
    "results": [
      "Generated \u20b92,38,082.80 in initial 30-day launch sprint (+158% sales acceleration).",
      "Delivered 106 discovery orders (+130%), acquiring high-intent fragrance enthusiasts.",
      "Achieved a 42% repurchase rate to full-size bottles within 45 days.",
      "Built a proprietary 5,000+ subscriber SMS/email list for subsequent collection drops."
    ]
  },
  "case8": {
    "id": "case8",
    "code": "CASE // 008",
    "category": "SPECIALTY SINGLE-ORIGIN COFFEE & BREWING GEAR",
    "niche": "E-Commerce Niche // Artisanal Roasts & Hardware Kits",
    "filter": "food",
    "title": "Specialty Coffee: Bundling Hardware & Roasts to Scale Monthly Revenue to \u20b919.45L",
    "platform": "META ADS \u2022 SHOPIFY REPEAT ENGINE",
    "image": "assets/casestudies/sales-graph.png",
    "heroStats": "\u20b919,45,210.00 Monthly Scale (+88%) | 1,420 Orders | 4.62X ROAS",
    "challenge": "High customer churn on single-bag purchases and elevated customer acquisition costs (\u20b9620/order) against a low standalone product AOV of \u20b9480.",
    "solution": "Restructured catalog around high-ticket 'Brewer Starter Bundles' (AeroPress + Burr Grinder + Beans) lifting AOV to \u20b92,450. Deployed automated post-purchase drip funnels offering seamless 30-day roast subscription refills.",
    "aov": "\u20b92,450",
    "cac": "\u20b9530",
    "roas": "4.62X Blended",
    "volume": "32.4K Visits",
    "results": [
      "Monthly GMV scaled to \u20b919,45,210.00 (+88% growth over baseline).",
      "Delivered 1,420 direct orders with a 39% recurring subscription opt-in.",
      "Customer acquisition payback period shortened from 75 days to under 18 days.",
      "Blended ROAS stabilized at 4.62X across Meta advantage campaigns."
    ]
  },
  "case9": {
    "id": "case9",
    "code": "CASE // 009",
    "category": "FUNCTIONAL HYDRATION & ZERO-SUGAR ELECTROLYTES",
    "niche": "E-Commerce Niche // Clinical Nutrition & Athletic Wellness",
    "filter": "food",
    "title": "Functional Electrolytes: Educating Cold Traffic to Scale Quarterly GMV to \u20b934.80L",
    "platform": "META ADVANTAGE+ \u2022 YOUTUBE ADS \u2022 SHOPIFY",
    "image": "assets/casestudies/case-study-3.png",
    "heroStats": "\u20b934,80,915.00 Quarterly GMV (+310%) | 2,150 Orders | 4.10X ROAS",
    "challenge": "Creative fatigue due to generic gym workout clips; cold shoppers mistook clean functional electrolytes for sugar-loaded commercial sports beverages.",
    "solution": "Produced 10 educational 'Electrolyte Osmolality & Brain Fog' video teardowns. Scaled broad Meta Advantage+ budget with a 30-packet variety starter box, backed by YouTube Shorts showing post-workout recovery.",
    "aov": "\u20b91,620",
    "cac": "\u20b9395",
    "roas": "4.10X Blended",
    "volume": "58.2K Shoppers",
    "results": [
      "Generated \u20b934,80,915.00 in quarterly GMV (+310% expansion).",
      "Fulfilled 2,150 direct consumer orders with high retention.",
      "Active subscription base expanded to 740 monthly auto-ship subscribers.",
      "Average conversion rate rose by +76% across the dedicated funnel."
    ]
  },
  "case10": {
    "id": "case10",
    "code": "CASE // 010",
    "category": "PREMIUM MINIMALIST LEATHER SNEAKERS & FOOTWEAR",
    "niche": "E-Commerce Niche // Handcrafted Full-Grain Italian Leather",
    "filter": "apparel",
    "title": "Luxury Sneakers: Deconstructing Footwear Quality to Capture \u20b942.15L in 60 Days",
    "platform": "META ADS \u2022 GOOGLE SHOPPING \u2022 SHOPIFY",
    "image": "assets/casestudies/case-study-6-v2.png",
    "heroStats": "\u20b942,15,400.00 in 60 Days (+124%) | 780 Orders Delivered | \u20b95,400 AOV",
    "challenge": "High return rates due to sizing uncertainty (28% exchange rate) and consumer hesitation on luxury pricing against international heritage footwear brands.",
    "solution": "Implemented an interactive 3D sizing quiz on Shopify. Produced side-by-side leather dissection reels cutting sneakers in half to reveal full-grain Italian leather versus faux plastic competitor footwear.",
    "aov": "\u20b95,400",
    "cac": "\u20b91,240",
    "roas": "3.85X Blended",
    "volume": "34.8K High-Intent",
    "results": [
      "Generated \u20b942,15,400.00 in top-line revenue over 60 days (+124% lift).",
      "Delivered 780 luxury footwear orders with an AOV exceeding \u20b95,400.",
      "Size exchange rates plummeted from 28% to 6.2% via pre-purchase sizing UI.",
      "Blended ROAS held strong at 3.85X on high-ticket cold acquisitions."
    ]
  },
  "case11": {
    "id": "case11",
    "code": "CASE // 011",
    "category": "CLEAN HAIRCARE & PEPTIDE SCALP RESTORATION",
    "niche": "E-Commerce Niche // Clinical Follicle Density Serums",
    "filter": "beauty",
    "title": "Scalp Restoration: Deploying Clinical Microscopy Hooks to Hit \u20b928.90L Monthly GMV",
    "platform": "META ADS \u2022 REELS UGC \u2022 SHOPIFY",
    "image": "assets/casestudies/case-study-5.png",
    "heroStats": "\u20b928,90,320.00 Monthly GMV (+72%) | 1,340 Orders | 4.40X ROAS",
    "challenge": "Excessive skepticism around hair density serums; customer purchase cycles took 21 days with rising retargeting expenses.",
    "solution": "Deployed dermatologist-verified clinical microscopic follicle scans in video hooks. Created a '90-Day Money-Back Follicle Density Challenge' with weekly progress tracking via WhatsApp VIP community.",
    "aov": "\u20b92,150",
    "cac": "\u20b9490",
    "roas": "4.40X Blended",
    "volume": "64.5K Sessions",
    "results": [
      "Monthly revenue surged to \u20b928,90,320.00 (+72% month-over-month).",
      "Delivered 1,340 verified orders across India and GCC markets.",
      "WhatsApp community engagement drove a 34% 60-day repurchase rate.",
      "Ad creative click-through rates increased from 0.8% to 2.4% on Reels."
    ]
  },
  "case12": {
    "id": "case12",
    "code": "CASE // 012",
    "category": "MODERN ERGONOMIC SLEEP & BAMBOO BEDDING",
    "niche": "E-Commerce Niche // Temperature-Regulating Sleep Systems",
    "filter": "home",
    "title": "Ergonomic Bedding: Thermal Imaging Creatives Capturing \u20b951.60L in High-AOV Sales",
    "platform": "META ADS (CBO) \u2022 GOOGLE SEARCH \u2022 SHOPIFY",
    "image": "assets/casestudies/case-study-8.png",
    "heroStats": "\u20b951,60,780.00 Quarterly GMV (+95%) | 620 High-AOV Orders | \u20b98,320 AOV",
    "challenge": "Premium price point (\u20b97,500+) led to high abandoned cart rate (78%) on cold mobile traffic; mattress & bedding market flooded with heavy discounting.",
    "solution": "Shifted messaging from 'soft luxury sheets' to 'Restorative Deep Sleep Architecture & Heat Dissipation'. Engineered split-screen thermal camera video ads showing cooling differences between organic bamboo and synthetic microfiber.",
    "aov": "\u20b98,320",
    "cac": "\u20b91,980",
    "roas": "4.20X Blended",
    "volume": "41.2K High-Intent",
    "results": [
      "Captured \u20b951,60,780.00 in quarterly revenue (+95% growth).",
      "Delivered 620 high-ticket bedding packages at an average ticket of \u20b98,320.",
      "Cart abandonment dropped by 24% after installing Klarna/Tabby 0% split-pay.",
      "Blended ROAS maintained at 4.20X on competitive mattress/bedding keywords."
    ]
  },
  "case13": {
    "id": "case13",
    "code": "CASE // 013",
    "category": "SMART LIFESTYLE WEARABLES & CHARGING DOCKS",
    "niche": "E-Commerce Niche // Anodized Metal Workspace Hardware",
    "filter": "tech",
    "title": "Workspace Tech: Cinematic Macro Hooks Scaling Charging Docks to \u20b918.75L in 45 Days",
    "platform": "META ADVANTAGE+ \u2022 SHOPIFY 1-CLICK",
    "image": "assets/casestudies/case-study-4.png",
    "heroStats": "\u20b918,75,410.00 in 45 Days (+280%) | 1,120 Orders | 4.75X ROAS",
    "challenge": "Competing against cheap dropshipped Amazon accessories; low perceived build quality and high ad price sensitivity.",
    "solution": "Commissioned cinematic 4K macro video ads highlighting aircraft-grade anodized aluminum and MagSafe safety certifications. Built a high-converting bundle ladder: 'Desk Trio Pack (Phone + Watch + AirPods Dock)'.",
    "aov": "\u20b91,675",
    "cac": "\u20b9350",
    "roas": "4.75X Blended",
    "volume": "49.8K Shoppers",
    "results": [
      "Generated \u20b918,75,410.00 in sales within 45 days (+280% expansion).",
      "Delivered 1,120 anodized charging stations with near-zero returns.",
      "Bundle take-rate jumped from 12% to 44% with one-click upsell logic.",
      "Achieved a 4.75X ROAS on Meta advantage shopping algorithms."
    ]
  },
  "case14": {
    "id": "case14",
    "code": "CASE // 014",
    "category": "ETHICAL LAB-GROWN SOLITAIRE & ENGAGEMENT JEWELRY",
    "niche": "E-Commerce Niche // Certified Conflict-Free Lab Solitaires",
    "filter": "jewelry",
    "title": "Lab-Grown Solitaires: Virtual Diamond Consultations Scaling Revenue to \u20b988.40L",
    "platform": "GOOGLE SEARCH \u2022 META ADS \u2022 HIGH-TICKET FUNNEL",
    "image": "assets/casestudies/case-study-3.png",
    "heroStats": "\u20b988,40,650.00 Semi-Annual Scale (+245%) | 185 Luxury Orders | 6.2X ROAS",
    "challenge": "High consideration cycle (45+ days) and customer hesitation over certification credibility on five-figure online transactions.",
    "solution": "Built a virtual diamond consultation booking engine on Shopify paired with IGI certification transparency videos. Ran Google Search ads targeting high-intent bridal keywords ('certified lab grown engagement ring online').",
    "aov": "\u20b947,800",
    "cac": "\u20b97,700",
    "roas": "6.2X High-Ticket",
    "volume": "18.4K High-Intent",
    "results": [
      "Closed \u20b988,40,650.00 in verified high-ticket solitaire sales (+245% lift).",
      "Delivered 185 custom engagement rings at an average order of \u20b947,800.",
      "Consultation show-up rate achieved 68% backed by WhatsApp auto-reminders.",
      "Maintained an industry-leading 6.2X ROAS across all Google Search campaigns."
    ]
  },
  "case15": {
    "id": "case15",
    "code": "CASE // 015",
    "category": "HIGH-PERFORMANCE TECHNICAL ATHLEISURE & ACTIVEWEAR",
    "niche": "E-Commerce Niche // Compressive Seamless Workout Apparel",
    "filter": "apparel",
    "title": "Activewear: Stress-Test Creative Hooks Scaling Monthly Sales to \u20b936.20 Lakhs",
    "platform": "META ADS \u2022 INSTAGRAM REELS \u2022 SHOPIFY",
    "image": "assets/casestudies/case-study-6-v2.png",
    "heroStats": "\u20b936,20,800.00 Monthly GMV (+64%) | 1,280 Orders | 4.30X ROAS",
    "challenge": "Squat-proof transparency concerns and fierce competition from legacy athletic brands with 10x larger budgets.",
    "solution": "Deployed zero-filter gym squat test reels, moisture-wicking water drop stress tests, and compressive waistband fit demonstrations. Integrated instant size-swap guarantees directly into the product page.",
    "aov": "\u20b92,820",
    "cac": "\u20b9650",
    "roas": "4.30X Blended",
    "volume": "52.6K Sessions",
    "results": [
      "Monthly sales climbed to \u20b936,20,800.00 (+64% month-over-month growth).",
      "Fulfilled 1,280 orders across activewear tights, sports bras, and hoodies.",
      "Product page conversion rate rose by +42% after installing stress-test video widgets.",
      "Repeat purchase rate reached 37% within 90 days."
    ]
  },
  "case16": {
    "id": "case16",
    "code": "CASE // 016",
    "category": "ARTISANAL CERAMIC TABLEWARE & HANDCRAFTED DINING",
    "niche": "E-Commerce Niche // Studio Stoneware & Curated Dining Sets",
    "filter": "home",
    "title": "Artisanal Ceramics: Transit Drop-Test Proof Scaling Dining Sets to \u20b914.92L in 30 Days",
    "platform": "META ADS (ASC) \u2022 PINTEREST \u2022 SHOPIFY",
    "image": "assets/casestudies/case-study-7.png",
    "heroStats": "\u20b914,92,100.00 in 30 Days (+112%) | 540 Orders | 4.55X ROAS",
    "challenge": "Transit breakage fears (32% customer hesitation in pre-sale surveys) and seasonal demand spikes only during festive periods.",
    "solution": "Produced shock-absorption drop-test packing video ads proving zero-breakage transit packaging. Launched 'Dinner Party Hosting Set' bundles with curated recipe cards, expanding non-festive regular purchases.",
    "aov": "\u20b92,760",
    "cac": "\u20b9610",
    "roas": "4.55X Blended",
    "volume": "28.4K Shoppers",
    "results": [
      "Delivered \u20b914,92,100.00 in 30 days (+112% expansion).",
      "Fulfilled 540 dining sets with transit breakage rate under 0.4%.",
      "Non-festive baseline sales grew by 3.2x compared to the previous year.",
      "Customer satisfaction score reached 4.9/5 based on post-purchase reviews."
    ]
  },
  "case17": {
    "id": "case17",
    "code": "CASE // 017",
    "category": "ECO-CONSCIOUS HOME CLEANING & CONCENTRATED REFILLS",
    "niche": "E-Commerce Niche // Non-Toxic Zero-Waste Refill Pods",
    "filter": "home",
    "title": "Eco-Cleaning Refills: Unlocking 48% Subscription Adoption to Hit \u20b921.35L Monthly GMV",
    "platform": "META ADS \u2022 SHOPIFY SUBSCRIPTION ENGINE",
    "image": "assets/casestudies/case-study-5.png",
    "heroStats": "\u20b921,35,400.00 Monthly Revenue (+82%) | 1,650 Orders | 4.15X ROAS",
    "challenge": "Low initial price point for cleaning products made one-off direct-response customer acquisition unprofitable on Meta ad auctions.",
    "solution": "Re-engineered pricing into a 'Forever Glass Bottle + 3 Refill Pods' starter kit (\u20b91,499 AOV). Automated a 60-day auto-replenishment subscription cycle that unlocked sustainable 6-month customer lifetime value.",
    "aov": "\u20b91,499",
    "cac": "\u20b9360",
    "roas": "4.15X Blended",
    "volume": "46.7K Visitors",
    "results": [
      "Monthly recurring revenue reached \u20b921,35,400.00 (+82% increase).",
      "Delivered 1,650 orders with 48% opting into recurring subscription plans.",
      "Customer acquisition costs amortized in 34 days across active subscriptions.",
      "Blended ROAS sustained at 4.15X on broad Meta Advantage+ campaigns."
    ]
  },
  "case18": {
    "id": "case18",
    "code": "CASE // 018",
    "category": "SMART INSULATED DRINKWARE & THERMAL HARDWARE",
    "niche": "E-Commerce Niche // Vacuum Insulated Modular Hydration",
    "filter": "tech",
    "title": "Insulated Hardware: 24-Hour Ice Survival Tests Scaling Revenue to \u20b915.80L",
    "platform": "META ADVANTAGE+ \u2022 AMAZON \u2022 SHOPIFY",
    "image": "assets/casestudies/case-study-2.png",
    "heroStats": "\u20b915,80,250.00 Launch Quarter (+190%) | 890 Orders | 4.40X ROAS",
    "challenge": "Cold shoppers perceived it as 'just another metal water bottle', refusing to pay a 2x price premium over supermarket alternatives.",
    "solution": "Created side-by-side 24-hour ice cube survival tests in scorching summer heat. Deployed laser-engraving personalization previews on Shopify, lifting gift purchase volume during Q4 by 140%.",
    "aov": "\u20b91,775",
    "cac": "\u20b9400",
    "roas": "4.40X Blended",
    "volume": "31.5K Sessions",
    "results": [
      "Generated \u20b915,80,250.00 in launch quarter sales (+190% lift).",
      "Delivered 890 personalized thermal bottles across India and UAE.",
      "Personalized engraving feature lifted average order value by +28%.",
      "Blended customer acquisition cost dropped to \u20b9400 per verified customer."
    ]
  },
  "case19": {
    "id": "case19",
    "code": "CASE // 019",
    "category": "HANDCRAFTED LEATHER GOODS & EVERYDAY CARRY (EDC)",
    "niche": "E-Commerce Niche // Vegetable-Tanned Wallets & Bags",
    "filter": "apparel",
    "title": "Artisan Leather Goods: ASMR Burnishing Reels Driving \u20b926.70L in 45 Days",
    "platform": "META ADS \u2022 SHOPIFY EXPRESS",
    "image": "assets/casestudies/case-study-8.png",
    "heroStats": "\u20b926,70,300.00 in 45 Days (+78%) | 960 Orders Delivered | 4.65X ROAS",
    "challenge": "Ad accounts fatigued rapidly due to static catalog product photos; high return rates from buyers expecting synthetic plastic finishes.",
    "solution": "Produced ASMR leather burnishing and saddle-stitching artisan reels showcasing vegetable-tanned patina development over time. Deployed lifetime stitching guarantee badges on mobile checkout.",
    "aov": "\u20b92,780",
    "cac": "\u20b9590",
    "roas": "4.65X Blended",
    "volume": "38.2K Shoppers",
    "results": [
      "Captured \u20b926,70,300.00 in 45 days of deployment (+78% scale).",
      "Fulfilled 960 handcrafted leather orders with an AOV of \u20b92,780.",
      "Customer return rate fell from 14% to 2.1% via accurate patina education.",
      "Blended ROAS rose to 4.65X across Meta video catalog ads."
    ]
  },
  "case20": {
    "id": "case20",
    "code": "CASE // 020",
    "category": "HIGH-PERFORMANCE MEN'S GROOMING & BEARD CARE",
    "niche": "E-Commerce Niche // Active Follicle Beard Growth Kits",
    "filter": "beauty",
    "title": "Men's Grooming: 3-Step Routine Bundling Scaling Monthly Revenue to \u20b924.18 Lakhs",
    "platform": "META ADS \u2022 GOOGLE PMAX \u2022 SHOPIFY",
    "image": "assets/casestudies/case-study-4.png",
    "heroStats": "\u20b924,18,600.00 Monthly Scale (+135%) | 1,480 Orders | 4.25X ROAS",
    "challenge": "Saturated men's grooming market dominated by cheap synthetic oils; CAC hovered around \u20b9780 with low retention.",
    "solution": "Created problem-aware video hooks targeting patchy beard growth and razor burn. Re-bundled individual oils into a complete '3-Step Sculpt & Condition Kit' with free precision trimming scissors.",
    "aov": "\u20b91,630",
    "cac": "\u20b9380",
    "roas": "4.25X Blended",
    "volume": "47.3K Sessions",
    "results": [
      "Scaled monthly sales to \u20b924,18,600.00 (+135% revenue increase).",
      "Delivered 1,480 groom kits with a 92% successful COD delivery rate.",
      "Bundling strategy boosted AOV from \u20b9890 to \u20b91,630.",
      "Acquisition CAC dropped by 51% to \u20b9380 on cold Meta ad traffic."
    ]
  },
  "case21": {
    "id": "case21",
    "code": "CASE // 021",
    "category": "NON-TOXIC BABYCARE & MATERNITY ESSENTIALS",
    "niche": "E-Commerce Niche // Pediatrician-Approved Infant Wellness",
    "filter": "beauty",
    "title": "Babycare & Maternity: Mother UGC Creator Campaigns Scaling GMV to \u20b938.90L",
    "platform": "META ADS (ASC) \u2022 MOM UGC \u2022 SHOPIFY",
    "image": "assets/casestudies/case-study-3.png",
    "heroStats": "\u20b938,90,400.00 Quarterly Scale (+160%) | 1,720 Orders | 4.50X ROAS",
    "challenge": "Extreme mother scrutiny and safety anxiety; cold ads from commercial agencies felt impersonal and untrustworthy.",
    "solution": "Built a collaborative network of 25 micro-influencer mothers filming unscripted nursery routines. Implemented Pediatrician Clinical Safety Seals and pediatrician FAQ accordions on product landers.",
    "aov": "\u20b92,260",
    "cac": "\u20b9500",
    "roas": "4.50X Blended",
    "volume": "53.9K Visitors",
    "results": [
      "Quarterly GMV expanded to \u20b938,90,400.00 (+160% scale).",
      "Delivered 1,720 babycare bundles to new and expecting mothers.",
      "Ad creative save rate on Instagram was 4.8x higher than industry average.",
      "Repeat replenishment rate hit 46% within 60 days of birth."
    ]
  },
  "case22": {
    "id": "case22",
    "code": "CASE // 022",
    "category": "GOURMET BEAN-TO-BAR ARTISANAL CHOCOLATES",
    "niche": "E-Commerce Niche // Single-Origin Cacao & Confections",
    "filter": "food",
    "title": "Gourmet Chocolates: Thermal Insulated Logistics Scaling Festive GMV to \u20b917.45L",
    "platform": "META ADS \u2022 CORPORATE GIFTING \u2022 SHOPIFY",
    "image": "assets/casestudies/sales-graph.png",
    "heroStats": "\u20b917,45,800.00 Festive Sprint (+215%) | 1,180 Orders | 4.80X ROAS",
    "challenge": "Melt-in-transit concerns during Indian summers and sharp revenue drop-offs between major festive calendars.",
    "solution": "Produced thermal-insulated ice gel unboxing videos proving 48-hour cold chain preservation. Created customizable corporate and anniversary tasting boxes with handwritten gift notes on checkout.",
    "aov": "\u20b91,480",
    "cac": "\u20b9310",
    "roas": "4.80X Blended",
    "volume": "29.6K Visits",
    "results": [
      "Generated \u20b917,45,800.00 in festive sprint revenue (+215% surge).",
      "Fulfilled 1,180 temperature-controlled gift deliveries with zero melts.",
      "Corporate B2B gifting portal generated an extra \u20b94.2L in bulk orders.",
      "ROAS peaked at 4.80X across high-intent seasonal shopping audiences."
    ]
  },
  "case23": {
    "id": "case23",
    "code": "CASE // 023",
    "category": "CANINE NUTRITION & PET WELLNESS SUPPLEMENTS",
    "niche": "E-Commerce Niche // Cold-Pressed Fresh Dog Food & Joint Chews",
    "filter": "food",
    "title": "Pet Nutrition: 7-Day Gentle Transition Funnel Delivering 52% Recurring LTV",
    "platform": "META ADS \u2022 SUBSCRIPTION RECHARGE \u2022 SHOPIFY",
    "image": "assets/casestudies/case-study-5.png",
    "heroStats": "\u20b929,60,150.00 Monthly GMV (+89%) | 1,210 Orders | 4.35X ROAS",
    "challenge": "High customer skepticism about switching dog food brands; fear of pet digestive issues caused long consideration delays.",
    "solution": "Created vet-approved '7-Day Gentle Transition Meal Guides' in video format. Offered a low-risk \u20b9399 trial sampler that transitioned 52% of customers into automated monthly repeat subscriptions.",
    "aov": "\u20b92,440",
    "cac": "\u20b9560",
    "roas": "4.35X Blended",
    "volume": "44.1K Pet Owners",
    "results": [
      "Monthly sales reached \u20b929,60,150.00 (+89% growth).",
      "Fulfilled 1,210 monthly fresh food orders with a 52% recurring subscription rate.",
      "Customer lifetime value (LTV) at 6 months reached \u20b912,800.",
      "Blended ROAS maintained at 4.35X on dog parent targeted video hooks."
    ]
  },
  "case24": {
    "id": "case24",
    "code": "CASE // 024",
    "category": "HIGH-FIDELITY NOISE-CANCELLING AUDIO HARDWARE",
    "niche": "E-Commerce Niche // Audiophile Studio Headphones & Monitors",
    "filter": "tech",
    "title": "Audio Hardware: Binaural Sound Demos Scaling Studio Headphones to \u20b931.85L in 60 Days",
    "platform": "META ADS \u2022 YOUTUBE REVIEWS \u2022 SHOPIFY",
    "image": "assets/casestudies/case-study-6-v2.png",
    "heroStats": "\u20b931,85,900.00 in 60 Days (+140%) | 640 Orders Delivered | 4.10X ROAS",
    "challenge": "Competing with global tech giants; consumers were reluctant to purchase high-ticket audio gear without hearing sound tests.",
    "solution": "Partnered with audiophile music producers producing binaural audio frequency tests on YouTube Shorts and Instagram Reels. Implemented a 14-day in-home listening trial with hassle-free pickup returns.",
    "aov": "\u20b94,980",
    "cac": "\u20b91,210",
    "roas": "4.10X Blended",
    "volume": "36.4K Audio Enthusiasts",
    "results": [
      "Generated \u20b931,85,900.00 in audio hardware sales over 60 days (+140% scale).",
      "Delivered 640 studio-grade headphones at an average ticket of \u20b94,980.",
      "In-home trial return rate was less than 3.8%, well below the 10% projection.",
      "Blended ROAS stabilized at 4.10X across Meta and YouTube Ads."
    ]
  }
};


function initArchiveFilters() {
  const filterBtns = document.querySelectorAll('#archiveFilters .filter-btn');
  const cards = document.querySelectorAll('#dossierGrid .dossier-card');

  if (!filterBtns.length || !cards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      cards.forEach(card => {
        const cat = card.dataset.category || '';
        if (filter === 'all' || cat.includes(filter)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
      playBeep(680, 'sine', 0.04);
    });
  });
}


window.switchModalTab = function(tabName, btn) {
  const tabs = document.querySelectorAll('.modal-sub-tabs .m-sub-tab');
  tabs.forEach(t => t.classList.remove('active'));
  if (btn) btn.classList.add('active');

  const views = ['growth', 'creatives', 'storefront'];
  views.forEach(v => {
    const el = document.getElementById('mView_' + v);
    if (el) {
      el.style.display = (v === tabName) ? 'block' : 'none';
    }
  });
  playBeep(640, 'sine', 0.04);
};

window.openDossierModal = function(key) {
  const modal = document.getElementById('dossierModal');
  const body = document.getElementById('modalDynamicBody');
  const d = archiveDossiers[key];
  if (!modal || !body || !d) return;

  body.innerHTML = `
    <div class="modal-brand-header">
      <div class="modal-brand-left">
        <div class="modal-category-icon-pill">
          <span class="cat-pill-tag">// D2C_NICHE</span>
        </div>
        <div>
          <span class="modal-brand-name">${d.category}</span>
          <span class="modal-brand-niche">${d.niche}</span>
        </div>
      </div>
      <div class="modal-code-tag">
        <span>${d.code}</span>
        <span class="modal-tag-pill">${d.platform}</span>
      </div>
    </div>

    <h2 class="modal-title">${d.title}</h2>
    <div class="modal-stats-pill">${d.heroStats}</div>

    <!-- 3-PILLAR INTERACTIVE MODAL SUB-TABS -->
    <div class="modal-sub-tabs">
      <button class="m-sub-tab active" onclick="switchModalTab('growth', this)">📈 GROWTH METRICS & SCALE</button>
      <button class="m-sub-tab" onclick="switchModalTab('creatives', this)">🎬 AD CREATIVES & HOOK PACK</button>
      <button class="m-sub-tab" onclick="switchModalTab('storefront', this)">🛍️ STOREFRONT & CRO BLUEPRINT</button>
    </div>

    <!-- TAB 1: GROWTH METRICS -->
    <div id="mView_growth" class="modal-tab-content">
      ${d.image ? `
        <div class="modal-dashboard-preview">
          <div class="modal-preview-tag">// VERIFIED_STORE_ANALYTICS // AUDITED SHOPIFY / ADS DASHBOARD</div>
          <img src="${d.image}" alt="${d.category} Analytics Dashboard" class="modal-preview-img" loading="lazy" />
        </div>
      ` : ''}

      <div class="modal-grid-two">
        <div class="modal-section-block" style="border-left: 3px solid var(--neon-rose); padding-left: 14px;">
          <h4 class="modal-section-h" style="color: var(--neon-rose);">[ THE BOTTLENECK PRIOR TO TGM ]</h4>
          <p class="modal-section-p">${d.challenge}</p>
        </div>

        <div class="modal-section-block" style="border-left: 3px solid var(--neon-cyan); padding-left: 14px;">
          <h4 class="modal-section-h" style="color: var(--neon-cyan);">[ THE TGM SCALING PLAYBOOK ]</h4>
          <p class="modal-section-p">${d.solution}</p>
        </div>
      </div>

      <div class="modal-unit-econ-box">
        <h4 class="modal-section-h" style="color: var(--neon-emerald); margin-bottom: 10px;">[ AUDITED UNIT ECONOMICS ]</h4>
        <div class="modal-econ-strip">
          <div class="m-econ-item"><span class="m-lbl">AVERAGE ORDER VALUE</span><span class="m-val">${d.aov}</span></div>
          <div class="m-econ-item"><span class="m-lbl">CUSTOMER ACQ. COST</span><span class="m-val">${d.cac}</span></div>
          <div class="m-econ-item"><span class="m-lbl">BLENDED ROAS</span><span class="m-val">${d.roas}</span></div>
          <div class="m-econ-item"><span class="m-lbl">ACQUIRED REACH</span><span class="m-val">${d.volume}</span></div>
        </div>
      </div>

      <div class="modal-section-block" style="margin-top: 20px;">
        <h4 class="modal-section-h" style="color: var(--neon-emerald);">[ AUDITED BUSINESS OUTCOMES ]</h4>
        <ul class="modal-results-list">
          ${d.results.map(r => `
            <li>
              <span class="res-arrow">▶</span>
              <span>${r}</span>
            </li>
          `).join('')}
        </ul>
      </div>
    </div>

    <!-- TAB 2: AD CREATIVES & HOOK PACK -->
    <div id="mView_creatives" class="modal-tab-content" style="display: none;">
      <div style="background: rgba(255, 42, 59, 0.08); border: 1px solid var(--border-active); border-radius: 8px; padding: 16px 20px; margin-bottom: 18px;">
        <span style="font-family: var(--font-mono); font-size: 0.65rem; color: var(--neon-cyan); font-weight: 700; letter-spacing: 0.08em; display: block; margin-bottom: 6px;">// WINNING AD HOOK ANGLE FOR THIS NICHE</span>
        <p style="font-family: var(--font-syne); font-size: 1.1rem; font-weight: 800; color: #ffffff; line-height: 1.35; margin: 0;">"Engineered 14 modular video hooks across contrarian, curiosity, and UGC unboxing formats to drop CAC by over 40%."</p>
      </div>

      <div class="modal-unit-econ-box">
        <div style="font-family: var(--font-mono); font-size: 0.65rem; color: var(--neon-cyan); margin-bottom: 12px; font-weight: 700; letter-spacing: 0.08em;">// CREATIVE LAB ASSET SPRINT METRICS</div>
        <div class="modal-econ-strip">
          <div class="m-econ-item"><span class="m-lbl">3S HOOK RATE</span><span class="m-val text-glow-emerald">48.2%</span></div>
          <div class="m-econ-item"><span class="m-lbl">OUTBOUND CTR</span><span class="m-val">3.85%</span></div>
          <div class="m-econ-item"><span class="m-lbl">CREATIVE CADENCE</span><span class="m-val text-glow-cyan">14 HOOKS / MO</span></div>
          <div class="m-econ-item"><span class="m-lbl">PRIMARY FORMAT</span><span class="m-val" style="font-size: 0.8rem; color: #a1a1aa;">9:16 UGC REELS</span></div>
        </div>
      </div>

      <div class="modal-section-block" style="border-left: 3px solid var(--neon-cyan); padding-left: 14px; margin-top: 16px;">
        <h4 class="modal-section-h" style="color: var(--neon-cyan);">[ SCRIPT STRUCTURE & PRODUCTION ANGLE ]</h4>
        <p class="modal-section-p">Instead of polished studio glamour shots that trigger ad-blindness, we shot raw smartphone unboxings paired with extreme macro lens demonstrations highlighting real product texture, durability, and immediate problem-solving benefits.</p>
      </div>

      <div class="modal-section-block">
        <h4 class="modal-section-h" style="color: var(--neon-emerald);">[ TESTED HOOK MATRIX IN ROTATION ]</h4>
        <ul class="modal-results-list">
          <li><span class="res-arrow">▶</span> <span><strong>The Contrarian Hook:</strong> Calling out cheap industry competitors and false marketing claims.</span></li>
          <li><span class="res-arrow">▶</span> <span><strong>The ASMR Unboxing:</strong> High-sensory audio foley focusing on packaging reveal and premium texture.</span></li>
          <li><span class="res-arrow">▶</span> <span><strong>The Founder Origin:</strong> Vulnerable 20-second behind-the-scenes engineering story.</span></li>
        </ul>
      </div>
    </div>

    <!-- TAB 3: STOREFRONT & CRO BLUEPRINT -->
    <div id="mView_storefront" class="modal-tab-content" style="display: none;">
      <div class="modal-unit-econ-box">
        <div style="font-family: var(--font-mono); font-size: 0.65rem; color: var(--neon-cyan); margin-bottom: 12px; font-weight: 700; letter-spacing: 0.08em;">// SHOPIFY STOREFRONT OPTIMIZATION IMPACT</div>
        <div class="modal-econ-strip">
          <div class="m-econ-item"><span class="m-lbl">CONVERSION LIFT</span><span class="m-val text-glow-emerald">+68% CVR</span></div>
          <div class="m-econ-item"><span class="m-lbl">PAGE LOAD SPEED</span><span class="m-val">1.1s (99/100)</span></div>
          <div class="m-econ-item"><span class="m-lbl">AOV EXPANSION</span><span class="m-val text-glow-cyan">+₹620 VIA BUNDLES</span></div>
          <div class="m-econ-item"><span class="m-lbl">STACK ARCHITECTURE</span><span class="m-val" style="font-size: 0.8rem; color: #a1a1aa;">SHOPIFY 2.0 BESPOKE</span></div>
        </div>
      </div>

      <div class="modal-grid-two">
        <div class="modal-section-block" style="border-left: 3px solid var(--neon-rose); padding-left: 14px;">
          <h4 class="modal-section-h" style="color: var(--neon-rose);">[ STOREFRONT FRICTION REMOVED ]</h4>
          <p class="modal-section-p">Eliminated 6 bloatware apps causing 4.2-second mobile lag. Replaced clunky multi-step checkout with instant slide-out cart drawer and sticky 1-tap checkout bar.</p>
        </div>

        <div class="modal-section-block" style="border-left: 3px solid var(--neon-cyan); padding-left: 14px;">
          <h4 class="modal-section-h" style="color: var(--neon-cyan);">[ REVENUE ARCHITECTURE DEPLOYED ]</h4>
          <p class="modal-section-p">Built custom 3-tier bundle ladders, real-time inventory counter, dynamic free shipping bar, and automated prepaid UPI incentives to eliminate COD returns.</p>
        </div>
      </div>

      <div class="modal-section-block">
        <h4 class="modal-section-h" style="color: var(--neon-emerald);">[ KEY REVENUE FEATURES ENGINEERED ]</h4>
        <ul class="modal-results-list">
          <li><span class="res-arrow">⚡</span> <span><strong>Sticky Add-to-Cart Drawer:</strong> Thumb-zone optimized with instant size/variant switcher.</span></li>
          <li><span class="res-arrow">⚡</span> <span><strong>Prepaid UPI Checkout Incentive:</strong> Reduced COD RTO rate by 34% through automated discount.</span></li>
          <li><span class="res-arrow">⚡</span> <span><strong>Server-Side CAPI Edge Tracking:</strong> 99.2% Meta pixel event match quality with zero cookie drop.</span></li>
        </ul>
      </div>
    </div>

    <div class="modal-cta-box">
      <a href="#contact" onclick="closeDossierModal()" class="btn btn-cyber-primary btn-block">
        <span>DEPLOY THIS SCALING ARCHITECTURE FOR YOUR BRAND</span>
        <span class="btn-arrow">↗</span>
      </a>
    </div>
  `;

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  playArpeggio([440, 554, 659, 880]);
};

window.closeDossierModal = function() {
  const modal = document.getElementById('dossierModal');
  if (modal) {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  }
};

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeDossierModal();
});


/* --------------------------------------------------------------------------
   8. MOBILE NAVIGATION
   -------------------------------------------------------------------------- */
function initMobileNavigation() {
  const toggle = document.getElementById('mobileToggle');
  const menu = document.getElementById('mobileMenu');
  const links = document.querySelectorAll('.m-link');

  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    playBeep(480, 'sine', 0.05);
  });

  links.forEach(l => {
    l.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.classList.remove('open');
    });
  });

  document.addEventListener('click', (e) => {
    if (menu.classList.contains('open') && !menu.contains(e.target) && !toggle.contains(e.target)) {
      menu.classList.remove('open');
      toggle.classList.remove('open');
    }
  });
}

/* --------------------------------------------------------------------------
   9. AUDIT SUBMISSION HANDLER
   -------------------------------------------------------------------------- */
window.handleAuditSubmit = function(e) {
  e.preventDefault();
  const btn = document.getElementById('btnSubmitForm');
  const alert = document.getElementById('formSuccessAlert');

  btn.disabled = true;
  btn.innerHTML = '<span>TRANSMITTING COORDINATES...</span>';
  playBeep(880, 'sine', 0.1);

  setTimeout(() => {
    btn.style.display = 'none';
    alert.style.display = 'block';
    playArpeggio([523, 659, 784, 1046]);
  }, 1200);
};


/* ==========================================================================
   UNIFIED D2C PORTFOLIO SYSTEM: CREATIVES & STOREFRONTS DATA & ENGINES
   ========================================================================== */

const creativeDossiers = {
  "creative1": {
    "id": "creative1",
    "code": "CREATIVE // 001",
    "category_filter": "ugc",
    "type_tag": "UGC_CONTRARIAN_TEST",
    "category_name": "FINE JEWELRY & 925 STERLING SILVER",
    "title": "The 'Anti-Tarnish Acid & Saline Test' Contrarian Hook",
    "duration": "0:28 SEC",
    "hook_quote": "Stop buying silver from Instagram that turns black after 3 wears.",
    "audio_track": "Original Sound \u2022 TGM Audio Lab",
    "bg_theme": "theme-silver",
    "hook_rate": "48.2%",
    "ctr": "3.92%",
    "impact": "-44% CAC",
    "impact_label": "CAC DROP",
    "angle_description": "Direct side-by-side torture test contrasting cheap alloy jewelry with 925 anti-tarnish silver submerged in concentrated saline spray. Immediate scroll-stopper that solves consumer distrust before presenting the offer.",
    "script_summary": "0:00-0:03: Extreme macro dip test under harsh studio light. 0:04-0:14: Split-screen chemical reaction revealing immediate oxidation on alloy vs pristine 925 silver. 0:15-0:22: Founder showing BIS Hallmarking stamp and lifetime polish warranty. 0:23-0:28: 3-tier bundle ladder offer with instant UPI discount.",
    "target_audience": "Females & Gifting Shoppers 22-38, Interest in Niche Jewelry, Luxury Fashion & Minimalist Accessories",
    "ad_formats": [
      "Instagram 9:16 Reel",
      "Facebook Feed Video",
      "TikTok Vertical",
      "YouTube Shorts"
    ]
  },
  "creative2": {
    "id": "creative2",
    "code": "CREATIVE // 002",
    "category_filter": "ugc",
    "type_tag": "HIGH_ENERGY_KINETIC",
    "category_name": "OVERSIZED STREETWEAR & HEAVYWEIGHT APPAREL",
    "title": "The '300 GSM Heavyweight Collar Drop Test'",
    "duration": "0:22 SEC",
    "hook_quote": "If your oversized tees do this after one wash, you got scammed.",
    "audio_track": "TGM Bass Distort \u2022 138 BPM",
    "bg_theme": "theme-streetwear",
    "hook_rate": "52.4%",
    "ctr": "4.15%",
    "impact": "5.8X ROAS",
    "impact_label": "PEAK ROAS",
    "angle_description": "Exposing the bacon-neck collar defect in commercial streetwear by hanging a 2kg dumbbell from the ribbed neckline. Cut with fast-paced glitch transitions and raw warehouse streetwear aesthetics.",
    "script_summary": "0:00-0:02: Weight hung on competitor tee stretching the collar to distortion. 0:03-0:07: Same weight placed on 300 GSM combed cotton tee snapping right back into structure. 0:08-0:16: High-contrast model runway movement showing boxy silhouette. 0:17-0:22: Limited batch countdown drop alert.",
    "target_audience": "Males & Females 18-30, Streetwear Culture, Sneakerheads, Urban Fashion Subcultures",
    "ad_formats": [
      "Meta ASC Video",
      "Instagram Story Ad",
      "TikTok Spark Ad"
    ]
  },
  "creative3": {
    "id": "creative3",
    "code": "CREATIVE // 003",
    "category_filter": "motion",
    "type_tag": "3D_CELLULAR_RENDER",
    "category_name": "CLINICAL BOTANICAL SKINCARE & AYURVEDA",
    "title": "The 'Microbiome Cellular Barrier Penetration' 3D Teardown",
    "duration": "0:30 SEC",
    "hook_quote": "Most moisturizers sit on your dead skin. Here's what real barrier repair looks like.",
    "audio_track": "Deep Ambient Sub \u2022 Sound FX",
    "bg_theme": "theme-skincare",
    "hook_rate": "44.6%",
    "ctr": "3.68%",
    "impact": "-38% CAC",
    "impact_label": "ACQUISITION COST",
    "angle_description": "Photorealistic 3D medical-grade animation tracing active Kumkumadi botanical peptides penetrating stratum corneum lipid bilayers vs generic mineral oil sitting on surface pores.",
    "script_summary": "0:00-0:03: 3D zoom through pore epidermis illustrating moisture evaporation. 0:04-0:15: Liposomal active encapsulation locking hydration in cellular matrix. 0:16-0:24: Dermatologist split-screen endorsing clinical trials. 0:25-0:30: 'Build Your Skin Diagnostic Routine' quiz CTA.",
    "target_audience": "Females & Males 24-45, Clean Beauty Enthusiasts, Active Ingredients (Niacinamide, Peptides, Ayurveda)",
    "ad_formats": [
      "Meta Advantage+ Creative",
      "YouTube In-Stream 15s",
      "Instagram Feed Square"
    ]
  },
  "creative4": {
    "id": "creative4",
    "code": "CREATIVE // 004",
    "category_filter": "asmr",
    "type_tag": "CINEMATIC_ASMR_DEMO",
    "category_name": "ARCHITECTURAL CONCRETE DESK LIVING & DECOR",
    "title": "The 'Zero-Cable Minimalist Desk Transformation' ASMR",
    "duration": "0:35 SEC",
    "hook_quote": "Fix your chaotic desk setup in exactly 45 seconds.",
    "audio_track": "Binaural Concrete Click & Keycaps ASMR",
    "bg_theme": "theme-concrete",
    "hook_rate": "56.1%",
    "ctr": "4.40%",
    "impact": "4.6X ROAS",
    "impact_label": "BLENDED ROAS",
    "angle_description": "Pure binaural sensory satisfaction: snapping magnetic concrete phone stands, cable trays, and cast-stone valet trays into position on an ultra-clean walnut studio desk under moody cinematic lighting.",
    "script_summary": "0:00-0:03: Messy tangled cable nightmare desk with abrasive noise. 0:04-0:18: Crisp satisfying ASMR sound of magnetic concrete components clicking seamlessly into place. 0:19-0:28: 360-degree slow pan of completed zen workspace. 0:29-0:35: 'Desk Architect Starter Bundle' limited bundle incentive.",
    "target_audience": "Developers, Designers, Founders, Tech Enthusiasts, Remote Work Aesthetic Audiences",
    "ad_formats": [
      "Instagram Reels Boost",
      "Meta Dynamic Creative (DCO)",
      "TikTok Organic Ad Code"
    ]
  },
  "creative5": {
    "id": "creative5",
    "code": "CREATIVE // 005",
    "category_filter": "ugc",
    "type_tag": "ATHLETIC_STRESS_TEST",
    "category_name": "CUSTOM SPORTS APPAREL & FAN MERCHANDISE",
    "title": "The '50km Cycling & Sweat Saturation Torture Test'",
    "duration": "0:25 SEC",
    "hook_quote": "Why your marathon tee weighs 2 pounds after mile 10.",
    "audio_track": "High BPM Percussion Drive",
    "bg_theme": "theme-sports",
    "hook_rate": "41.5%",
    "ctr": "3.80%",
    "impact": "+310% GMV",
    "impact_label": "VOLUME SURGE",
    "angle_description": "Athlete pouring water directly over technical breathable mesh weave vs standard cotton merchandise on camera with high-speed 240fps slow-motion moisture dispersal.",
    "script_summary": "0:00-0:03: Soaked sticky runner tee clinging to skin uncomfortably. 0:04-0:14: TGM aerodynamic micro-mesh dispersing water droplet instantly without absorption. 0:15-0:21: Custom team jersey badge sublimation print rubbing test. 0:22-0:25: Customizer interactive tool CTA.",
    "target_audience": "Marathoners, Gym Goers, Football & Cricket Fanatics, Fitness Subcultures",
    "ad_formats": [
      "Instagram 9:16 Video",
      "Facebook Mobile Feed",
      "Google Demand Gen Video"
    ]
  },
  "creative6": {
    "id": "creative6",
    "code": "CREATIVE // 006",
    "category_filter": "motion",
    "type_tag": "HERITAGE_MICRO_DOC",
    "category_name": "HERITAGE POLKI & BRIDAL COUTURE JEWELRY",
    "title": "The '100-Hour Master Artisan Hand-Setting' Micro-Doc",
    "duration": "0:40 SEC",
    "hook_quote": "Machines cannot replicate this. 4 generations of Jaipur polki artistry in 1 choker.",
    "audio_track": "Acoustic Sitar & Ambient Foley",
    "bg_theme": "theme-polki",
    "hook_rate": "49.8%",
    "ctr": "3.45%",
    "impact": "\u20b918,500",
    "impact_label": "AVERAGE ORDER VALUE",
    "angle_description": "Cinematic macro cinematography capturing an elderly craftsman pressing uncut polki diamonds into 22k pure gold foil (kundan jadau). Appeals to brides demanding authentic heirloom pedigree.",
    "script_summary": "0:00-0:04: Raw natural gemstone inspected under jeweler loupe with craftsman hands. 0:05-0:18: Precision kundan gold foil setting with traditional anvil tools. 0:19-0:30: Real bride wearing completed bridal set at destination wedding. 0:31-0:40: Private concierge bridal appointment booking CTA.",
    "target_audience": "High-Net-Worth Brides, Mother of the Bride, Luxury Destination Wedding Shoppers",
    "ad_formats": [
      "Meta High-Ticket Funnel Reel",
      "Google PMax Video",
      "Pinterest Luxury Video Pin"
    ]
  },
  "creative7": {
    "id": "creative7",
    "code": "CREATIVE // 007",
    "category_filter": "ugc",
    "type_tag": "GUERILLA_BLIND_TEST",
    "category_name": "ARTISANAL NATURAL PERFUMERY & NICHE EXTRACTS",
    "title": "The '\u20b915,000 Niche Perfume Blind Sniff Street Test'",
    "duration": "0:30 SEC",
    "hook_quote": "We asked 50 luxury shoppers to guess which scent costs \u20b915,000.",
    "audio_track": "Trendy Upbeat City Vlog Beat",
    "bg_theme": "theme-perfume",
    "hook_rate": "54.3%",
    "ctr": "4.82%",
    "impact": "-51% CAC",
    "impact_label": "CAC REDUCTION",
    "angle_description": "Street interviewer handing two unlabelled tester strips to upscale shoppers in Khan Market and Bandra. 84% picked our \u20b91,499 pure botanical extract over a French designer brand.",
    "script_summary": "0:00-0:03: Rapid-fire genuine reactions smelling paper blotters with shocked expressions. 0:04-0:16: Participants guessing designer prices ('Easily 12k to 15k'). 0:17-0:24: Reveal showing the \u20b91,499 direct-to-consumer discovery bottle. 0:25-0:30: 'Order Discovery Set, Full Bottle Free' offer.",
    "target_audience": "Luxury Fragrance Lovers, Scent Snobs, D2C Lifestyle Consumers 20-35",
    "ad_formats": [
      "Instagram Reel Ad",
      "TikTok Organic Viral Ad",
      "Meta ASC Campaign"
    ]
  },
  "creative8": {
    "id": "creative8",
    "code": "CREATIVE // 008",
    "category_filter": "asmr",
    "type_tag": "SLOWMO_EXTRACTION_DEMO",
    "category_name": "SPECIALTY SINGLE-ORIGIN COFFEE & BREWING GEAR",
    "title": "The '9-Bar Espresso Naked Portafilter Pour' ASMR",
    "duration": "0:26 SEC",
    "hook_quote": "Why your coffee tastes like battery acid (and how to fix it in 3 steps).",
    "audio_track": "Binaural Steam & Espresso Drip Audio",
    "bg_theme": "theme-coffee",
    "hook_rate": "43.7%",
    "ctr": "3.75%",
    "impact": "4.1X ROAS",
    "impact_label": "MEDIA EFFICIENCY",
    "angle_description": "Hypnotic high-definition golden crema extraction pouring smoothly through a bottomless portafilter. Demystifies roast dates and bean grind sizes for home baristas.",
    "script_summary": "0:00-0:03: Bitter supermarket ground coffee channel spurting messily. 0:04-0:15: Perfect uniform honey-viscosity crema stream pouring from freshly roasted single-origin beans. 0:16-0:21: Flavor wheel notes (dark cacao, candied orange). 0:22-0:26: Free sample pack with subscription signup CTA.",
    "target_audience": "Coffee Aficionados, Aeropress & Espresso Enthusiasts, Work-From-Home Professionals",
    "ad_formats": [
      "Meta Reel Ad",
      "Instagram Feed 4:5",
      "YouTube Shorts Demand Gen"
    ]
  },
  "creative9": {
    "id": "creative9",
    "code": "CREATIVE // 009",
    "category_filter": "static",
    "type_tag": "CGM_INFOGRAPHIC_TEST",
    "category_name": "FUNCTIONAL HYDRATION & ZERO-SUGAR ELECTROLYTES",
    "title": "The 'Continuous Blood Glucose Monitor Sugar Spike' Test",
    "duration": "0:24 SEC",
    "hook_quote": "Your 'energy drink' has 34g of sugar. Here is your blood spike on camera.",
    "audio_track": "Medical Monitor Heartbeat Beat",
    "bg_theme": "theme-hydration",
    "hook_rate": "47.9%",
    "ctr": "4.05%",
    "impact": "3.8X ROAS",
    "impact_label": "BLENDED ROAS",
    "angle_description": "Splitscreen biohacker test showing CGM glucose chart spiking dramatically after drinking a commercial electrolyte brand vs remaining completely flat with zero-sugar sodium-potassium-magnesium ratio.",
    "script_summary": "0:00-0:03: CGM sensor alert beeping red spike on mobile screen. 0:04-0:14: Side-by-side ingredient label audit highlighting hidden maltodextrin. 0:15-0:20: Dissolving clean effervescent stick in cold water. 0:21-0:24: 30-day variety trial pack with shaker bottle CTA.",
    "target_audience": "Biohackers, Fasting Community, Crossfit Athletes, Keto & Low-Sugar Dieters",
    "ad_formats": [
      "Meta Carousels",
      "Instagram 9:16 Video",
      "Facebook Feed Image Grid"
    ]
  },
  "creative10": {
    "id": "creative10",
    "code": "CREATIVE // 010",
    "category_filter": "static",
    "type_tag": "HIGH_STAKES_DEMO",
    "category_name": "PREMIUM MINIMALIST LEATHER SNEAKERS & FOOTWEAR",
    "title": "The 'Full Glass Red Wine & Mud Pour' Sneaker Test",
    "duration": "0:22 SEC",
    "hook_quote": "Would you pour red wine on your \u20b912,000 white sneakers? We did.",
    "audio_track": "Dramatic Orchestral Drop",
    "bg_theme": "theme-sneakers",
    "hook_rate": "51.0%",
    "ctr": "3.90%",
    "impact": "+420% GMV",
    "impact_label": "GROWTH SURGE",
    "angle_description": "Uncut single camera take: pouring a full glass of Cabernet Sauvignon directly over a pristine white full-grain sneaker, then wiping it completely clean with a single microfiber pass.",
    "script_summary": "0:00-0:03: Red wine splashing across white leather in agonizing high-definition. 0:04-0:12: Wet cloth wiping leather completely stain-free without a trace. 0:13-0:18: Explaining hydrophobic Tuscan calfskin treatment and Margom rubber soles. 0:19-0:22: Size exchange guarantee + free shipping CTA.",
    "target_audience": "Minimalist Menswear, High-End Footwear Buyers, Corporate Executives, Sneaker Collectors",
    "ad_formats": [
      "Instagram 9:16 Reel",
      "Meta Feed Carousels",
      "Google Performance Max"
    ]
  },
  "creative11": {
    "id": "creative11",
    "code": "CREATIVE // 011",
    "category_filter": "motion",
    "type_tag": "MICROSCOPIC_DIAGNOSTIC",
    "category_name": "CLEAN HAIRCARE & PEPTIDE SCALP RESTORATION",
    "title": "The '200x Trichologist Scalp Microscope' Follicle Scan",
    "duration": "0:32 SEC",
    "hook_quote": "Shampoos don't fix hair fall. Here is why your scalp follicles are choking.",
    "audio_track": "Clean Tech Sound Design",
    "bg_theme": "theme-haircare",
    "hook_rate": "46.2%",
    "ctr": "3.60%",
    "impact": "-42% CAC",
    "impact_label": "CUSTOMER ACQUISITION",
    "angle_description": "High-magnification dermatoscope camera scanning an actual scalp showing DHT sebum plugs choking hair shafts, followed by 14-day peptide serum application showing clear unblocked follicle growth.",
    "script_summary": "0:00-0:03: Trichoscope optic camera zooming directly onto follicle sebum plugs. 0:04-0:16: Trichologist teardown of silicon-based shampoos vs bioactive peptide peptide serum. 0:17-0:25: User timeline progression (Day 1, Day 30, Day 90). 0:26-0:32: Scalp density quiz + money-back guarantee.",
    "target_audience": "Men & Women 22-45 Experiencing Hair Thinning, Post-Partum Moms, Wellness Shoppers",
    "ad_formats": [
      "Meta ASC Video Ad",
      "Instagram Story Ad",
      "YouTube Shorts Demand Gen"
    ]
  },
  "creative12": {
    "id": "creative12",
    "code": "CREATIVE // 012",
    "category_filter": "static",
    "type_tag": "FLIR_THERMAL_CHALLENGE",
    "category_name": "SMART INSULATED DRINKWARE & HARDWARE",
    "title": "The 'FLIR Thermal Heat Gun vs 72-Hour Sub-Zero Ice' Challenge",
    "duration": "0:25 SEC",
    "hook_quote": "We blew a 500\u00b0C blowtorch on this tumbler for 3 minutes. The ice inside didn't care.",
    "audio_track": "Sub Bass Rumble \u2022 Industrial Beats",
    "bg_theme": "theme-hardware",
    "hook_rate": "53.8%",
    "ctr": "4.30%",
    "impact": "4.5X ROAS",
    "impact_label": "CAMPAIGN ROAS",
    "angle_description": "FLIR thermal imaging camera display showing exterior tumbler glowing red-hot at 480\u00b0C while internal cross-section infrared probe reads exactly 0.5\u00b0C with solid floating ice cubes.",
    "script_summary": "0:00-0:03: Industrial blowtorch flame blasting exterior metal while timer counts down. 0:04-0:14: Thermal imaging heat-map split-screen illustrating double-wall vacuum barrier. 0:15-0:20: Opening lid and pouring out frosty ice water. 0:21-0:25: Lifetime vacuum seal warranty CTA.",
    "target_audience": "Outdoor Enthusiasts, Gym Commuters, Desk Productivity Geeks, Gifting Shoppers",
    "ad_formats": [
      "Meta Video Reel",
      "Facebook Dynamic Showcase",
      "TikTok Commercial Spark Ad"
    ]
  }
};

const storefrontDossiers = {
  "store1": {
    "id": "store1",
    "code": "STOREFRONT // 001",
    "category_filter": "fashion",
    "stack_tag": "SHOPIFY_PLUS_HEADLESS",
    "category_name": "FINE JEWELRY & ANTI-TARNISH STERLING SILVER",
    "brand_title": "LUMI\u00c8RE 925",
    "mock_url": "lumiere925.store/collections/anti-tarnish",
    "theme_class": "st-jewelry",
    "hero_tag": "// NEW DROP // WATERPROOF PREFERRED",
    "hero_h1": "Solid 925 Silver Engineered Never to Tarnish.",
    "mock_price": "2,499",
    "mock_cart_val": "4,998",
    "review_count": "1,842",
    "cro_feature_1": "Bespoke Ring Sizer Modal (+28% Size Confidence)",
    "cro_feature_2": "3-Tier Bundle Stacker (Buy 2 Get 1 Free)",
    "cro_feature_3": "1-Click Fast UPI Checkout Drawer",
    "title": "LUMI\u00c8RE 925 \u2014 High-Ticket Precious Jewelry Storefront",
    "cro_description": "Eliminated high mobile checkout drop-off by stripping 8 third-party Shopify apps and building native Liquid 2.0 bundle ladders, BIS hallmarking trust seals, and instant UPI checkout.",
    "cvr_lift": "+74%",
    "speed_load": "1.1s",
    "speed_score": "99/100",
    "aov_gain": "+\u20b9820",
    "aov_label": "AOV EXPANSION",
    "architecture_details": "Shopify Plus, Liquid 2.0, Alpine.js micro-interactions, Tailwind CSS, Klaviyo Server-Side CAPI, Cloudflare Edge Workers.",
    "cro_playbook": "Rebuilt Product Detail Page (PDP) hierarchy with mobile-first thumb-zone sticky CTA. Embedded certified hallmarking verification badge directly beneath price. Introduced dynamic bundle progression bar showing customer unlock of matching earrings."
  },
  "store2": {
    "id": "store2",
    "code": "STOREFRONT // 002",
    "category_filter": "fashion",
    "stack_tag": "HIGH_CONCURRENCY_OS2",
    "category_name": "OVERSIZED STREETWEAR & HEAVYWEIGHT APPAREL",
    "brand_title": "RAW_FABRIC CO.",
    "mock_url": "rawfabric.supply/drops/season-04",
    "theme_class": "st-streetwear",
    "hero_tag": "// LIMITED ARCHIVE // 300 GSM DROP",
    "hero_h1": "Heavyweight Boxy Fits Built to Outlast Fast Fashion.",
    "mock_price": "1,899",
    "mock_cart_val": "3,798",
    "review_count": "3,120",
    "cro_feature_1": "Real-Time Stock Depletion Meter (< 9 Left)",
    "cro_feature_2": "3D Interactive Model Sizing Visualizer",
    "cro_feature_3": "Prepaid UPI Discount Engine (-\u20b9150 Incentivized)",
    "title": "RAW_FABRIC \u2014 Heavyweight Streetwear Drop Engine",
    "cro_description": "Built for lightning-speed flash drop events handling 5,000 concurrent checkout sessions without lag. Features live inventory countdowns and automated prepaid discounts to eradicate COD RTOs.",
    "cvr_lift": "+112%",
    "speed_load": "0.9s",
    "speed_score": "98/100",
    "aov_gain": "68% PREPAID",
    "aov_label": "PREPAID ORDERS",
    "architecture_details": "Shopify OS 2.0, Custom Dawn Framework Engine, Edge CDN Asset Optimization, Redis session caching, Instant COD Verification OTP.",
    "cro_playbook": "Engineered a high-pressure flash drop landing page with zero layout shift (CLS 0.00). Built an interactive model selector allowing shoppers to toggle height/weight to see exact drape."
  },
  "store3": {
    "id": "store3",
    "code": "STOREFRONT // 003",
    "category_filter": "beauty",
    "stack_tag": "CLINICAL_CUSTOM_LIQUID",
    "category_name": "CLINICAL BOTANICAL SKINCARE & AYURVEDA",
    "brand_title": "AYUR_BOTANICS",
    "mock_url": "ayurbotanics.com/skin-diagnostic-quiz",
    "theme_class": "st-skincare",
    "hero_tag": "// CLINICAL HERBAL // DERM AUDITED",
    "hero_h1": "Plant-Powered Cellular Repair Backed by Clinical Science.",
    "mock_price": "1,450",
    "mock_cart_val": "2,900",
    "review_count": "2,490",
    "cro_feature_1": "3-Step 'Diagnose Your Barrier' Diagnostic Engine",
    "cro_feature_2": "Interactive Clinical Before/After Slider on PDP",
    "cro_feature_3": "Smart Auto-Replenish Subscription Stacker",
    "title": "AYUR_BOTANICS \u2014 Clinical Routine Builder & Storefront",
    "cro_description": "Overcame customer skepticism on herbal products with an interactive clinical skin diagnostic quiz, live before/after sliders, and dermatologist video drawers embedded directly on product pages.",
    "cvr_lift": "+58%",
    "speed_load": "1.2s",
    "speed_score": "97/100",
    "aov_gain": "+86% SUBS",
    "aov_label": "SUBSCRIPTION OPT-IN",
    "architecture_details": "Shopify 2.0, Algolia Search API, ReCharge Subscription Engine, Custom SVG Before/After Lens Component, Meta Conversions API.",
    "cro_playbook": "Designed a guided routine builder that guides users through Cleanser -> Peptide Serum -> Barrier Creme, automatically bundling with a 20% system discount that increased 3-item cart conversion by 84%."
  },
  "store4": {
    "id": "store4",
    "code": "STOREFRONT // 004",
    "category_filter": "tech",
    "stack_tag": "THREEJS_3D_CONFIGURATOR",
    "category_name": "ARCHITECTURAL CONCRETE DESK LIVING & DECOR",
    "brand_title": "KINETIC_DESK",
    "mock_url": "kineticdesk.studio/workspace-architect",
    "theme_class": "st-concrete",
    "hero_tag": "// CAST STONE // ARCHITECTURAL",
    "hero_h1": "Bespoke Cast Concrete & Magnetic Workspace Hardware.",
    "mock_price": "3,400",
    "mock_cart_val": "6,800",
    "review_count": "940",
    "cro_feature_1": "360\u00b0 Interactive Desk Visualizer Configurator",
    "cro_feature_2": "Magnetic Cable Organizer One-Click Add-on",
    "cro_feature_3": "Postal Code Express Dispatch Calculator",
    "title": "KINETIC_DESK \u2014 Architectural Concrete Storefront",
    "cro_description": "Designed a brutalist, ultra-clean web experience featuring a 3D desk setup builder where customers drag and drop concrete valet trays, phone docks, and monitor risers to visualize their workspace.",
    "cvr_lift": "+92%",
    "speed_load": "1.3s",
    "speed_score": "96/100",
    "aov_gain": "+\u20b91,930",
    "aov_label": "AOV EXPANSION",
    "architecture_details": "Shopify Plus, WebGL/Three.js 3D Viewer, Tailwind CSS, Custom Canvas Viewport, Shiprocket Real-Time Logistics API.",
    "cro_playbook": "Replaced boring 2D static mockups with high-performance 3D configurator. Added automated upsell carousel inside slide-out cart for complementary cable anchors, achieving a 43% take rate."
  },
  "store5": {
    "id": "store5",
    "code": "STOREFRONT // 005",
    "category_filter": "beauty",
    "stack_tag": "DISCOVERY_FUNNEL_ENGINE",
    "category_name": "ARTISANAL NATURAL PERFUMERY & NICHE EXTRACTS",
    "brand_title": "NOIR_EXTRACTS",
    "mock_url": "noirextracts.luxury/discovery-flight",
    "theme_class": "st-perfume",
    "hero_tag": "// PURE OIL EXTRACTS // 30% CONCENTRATION",
    "hero_h1": "Luxury Niche Scent Concentrates Without the Retail Markup.",
    "mock_price": "1,299",
    "mock_cart_val": "2,598",
    "review_count": "1,620",
    "cro_feature_1": "5-Vial Discovery Flight with 100% Full-Bottle Coupon",
    "cro_feature_2": "Interactive Olfactory Pyramid (Top, Heart, Base)",
    "cro_feature_3": "Projection & Longevity Hours Rating Gauge",
    "title": "NOIR_EXTRACTS \u2014 Artisanal Fragrance Discovery Storefront",
    "cro_description": "Solved the 'buying perfume online without smelling it' dilemma by architecting a high-converting Discovery Set funnel that returns a 100% store credit voucher towards the customer's full bottle.",
    "cvr_lift": "+140%",
    "speed_load": "1.0s",
    "speed_score": "99/100",
    "aov_gain": "42% REPEAT",
    "aov_label": "30-DAY REPEAT RATE",
    "architecture_details": "Shopify OS 2.0, Custom Liquid Interactive Scent Wheel, Klaviyo Automated Redemption Flow, GTM Server Container.",
    "cro_playbook": "Implemented an animated fragrance note pyramid detailing duration and silage rating. Generated automated email and SMS redemption sequence upon discovery kit delivery with a 38% full bottle conversion."
  },
  "store6": {
    "id": "store6",
    "code": "STOREFRONT // 006",
    "category_filter": "beauty",
    "stack_tag": "SUBSCRIPTION_ROAST_FLOW",
    "category_name": "SPECIALTY SINGLE-ORIGIN COFFEE & BREWING GEAR",
    "brand_title": "TERRA_ROASTERS",
    "mock_url": "terraroasters.coffee/single-origin-curation",
    "theme_class": "st-coffee",
    "hero_tag": "// FRESH MICRO-LOT // 48H ROAST",
    "hero_h1": "Specialty Single-Origin Beans Roasted to Order.",
    "mock_price": "850",
    "mock_cart_val": "1,700",
    "review_count": "2,180",
    "cro_feature_1": "Brew Method Grind Selector (Espresso, AeroPress, French)",
    "cro_feature_2": "Flexible Roast Cadence Subscriptions (Save 20%)",
    "cro_feature_3": "Roaster Tasting Notes Matrix & Altitude Map",
    "title": "TERRA_ROASTERS \u2014 Specialty Coffee Subscription Engine",
    "cro_description": "Engineered a personalized subscription portal allowing coffee lovers to select their brew equipment, grind micron size, and delivery frequency with 1-click customer portal management.",
    "cvr_lift": "+62%",
    "speed_load": "1.1s",
    "speed_score": "98/100",
    "aov_gain": "+62% MRR",
    "aov_label": "RECURRING MRR",
    "architecture_details": "Shopify Plus, ReCharge Customer Portal API, Custom Liquid Brew Guide, Klaviyo Subscription Churn Prevention Hooks.",
    "cro_playbook": "Added visual grind size selector showing coffee particles next to a standard coin so beginners never choose wrong grind. Integrated 'Roaster Dispatch Date' badge creating urgency."
  },
  "store7": {
    "id": "store7",
    "code": "STOREFRONT // 007",
    "category_filter": "beauty",
    "stack_tag": "HIGH_VELOCITY_VARIETY_BOX",
    "category_name": "FUNCTIONAL HYDRATION & ZERO-SUGAR ELECTROLYTES",
    "brand_title": "HYDRO_CELL",
    "mock_url": "hydrocell.fit/build-your-variety-box",
    "theme_class": "st-hydration",
    "hero_tag": "// 1,000MG SODIUM // ZERO SUGAR",
    "hero_h1": "Cellular Rapid Hydration for Peak Physical Performance.",
    "mock_price": "1,200",
    "mock_cart_val": "2,400",
    "review_count": "4,150",
    "cro_feature_1": "Interactive 30-Pack Custom Flavor Mixer (4 Flavors)",
    "cro_feature_2": "Side-by-Side Sugar Comparison Interactive Gauge",
    "cro_feature_3": "60-Day Empty Packet Money-Back Guarantee Seal",
    "title": "HYDRO_CELL \u2014 Zero-Sugar Variety Box Builder",
    "cro_description": "Built a drag-and-drop 30-pack variety bundle builder allowing athletes to mix custom ratios of Citrus, Watermelon, Berry, and Raw Unflavored stick packs with automatic tiered bundle discounts.",
    "cvr_lift": "+128%",
    "speed_load": "0.9s",
    "speed_score": "100/100",
    "aov_gain": "+\u20b9640",
    "aov_label": "AOV BOOST",
    "architecture_details": "Shopify 2.0, Tailored Vanilla JS Bundle Component, Triple Whale Tracking Script, Subscriptions via Skio.",
    "cro_playbook": "Engineered instant visual feedback as stick packs fill the 30-pack carton slots with dynamic celebratory micro-animation upon completion. Slashed checkout steps to 1 screen."
  },
  "store8": {
    "id": "store8",
    "code": "STOREFRONT // 008",
    "category_filter": "tech",
    "stack_tag": "AUDIO_EQUALIZER_UX",
    "category_name": "HIGH-FIDELITY NOISE-CANCELLING AUDIO HARDWARE",
    "brand_title": "AURA_ACOUSTICS",
    "mock_url": "auraacoustics.audio/products/studio-wireless",
    "theme_class": "st-audio",
    "hero_tag": "// 45DB HYBRID ANC // PLANAR MAGNETIC",
    "hero_h1": "Studio-Grade Acoustic Purity Engineered for Creators.",
    "mock_price": "8,999",
    "mock_cart_val": "17,998",
    "review_count": "890",
    "cro_feature_1": "Interactive WebAudio Frequency Curve Tester",
    "cro_feature_2": "Side-by-Side Model Specs Comparison Drawer",
    "cro_feature_3": "3-Year Accidental Warranty In-Cart Upsell",
    "title": "AURA_ACOUSTICS \u2014 Audiophile Hardware Storefront",
    "cro_description": "Crafted an audio storefront incorporating an interactive frequency response equalizer where buyers toggle Bass, Mids, and Treble curves, driving customer trust on high-ticket consumer electronics.",
    "cvr_lift": "+67%",
    "speed_load": "1.2s",
    "speed_score": "97/100",
    "aov_gain": "\u20b99,450",
    "aov_label": "AVERAGE ORDER VALUE",
    "architecture_details": "Shopify Plus, Web Audio API, GSAP Motion Sequences, Custom Liquid Warranty Add-on, Razorpay EMI Gateway Integration.",
    "cro_playbook": "Introduced transparent EMI monthly breakdown ('\u20b9749/mo with zero down payment') directly beneath price tag. Added side-by-side hardware comparison drawer solving customer choice paralysis."
  }
};

/* --------------------------------------------------------------------------
   A. MASTER PORTFOLIO PILLAR SWITCHER
   -------------------------------------------------------------------------- */
function initPortfolioPillars() {
  const tabs = document.querySelectorAll('#portfolioMasterTabs .portfolio-master-tab');
  const views = {
    growth: document.getElementById('pillarViewGrowth'),
    creatives: document.getElementById('pillarViewCreatives'),
    storefronts: document.getElementById('pillarViewStorefronts')
  };

  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const pillar = tab.dataset.pillar;
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      Object.entries(views).forEach(([key, view]) => {
        if (!view) return;
        if (key === pillar) {
          view.style.display = 'block';
          view.classList.add('active');
        } else {
          view.style.display = 'none';
          view.classList.remove('active');
        }
      });

      playBeep(720, 'sine', 0.05);
    });
  });
}

/* --------------------------------------------------------------------------
   B. CREATIVE LAB FILTER TABS
   -------------------------------------------------------------------------- */
function initCreativeFilters() {
  const filterBtns = document.querySelectorAll('#creativeFilters .filter-btn');
  const cards = document.querySelectorAll('#creativeGrid .creative-card');

  if (!filterBtns.length || !cards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.creativeFilter;

      cards.forEach(card => {
        const cat = card.dataset.creativeCategory || '';
        if (filter === 'all' || cat.includes(filter)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
      playBeep(680, 'sine', 0.04);
    });
  });
}

/* --------------------------------------------------------------------------
   C. STOREFRONT & CRO FILTER TABS
   -------------------------------------------------------------------------- */
function initStorefrontFilters() {
  const filterBtns = document.querySelectorAll('#storefrontFilters .filter-btn');
  const cards = document.querySelectorAll('#storefrontGrid .storefront-card');

  if (!filterBtns.length || !cards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.storeFilter;

      cards.forEach(card => {
        const cat = card.dataset.storeCategory || '';
        if (filter === 'all' || cat.includes(filter)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
      playBeep(680, 'sine', 0.04);
    });
  });
}

/* --------------------------------------------------------------------------
   D. CREATIVE LAB DOSSIER MODAL
   -------------------------------------------------------------------------- */
window.openCreativeModal = function(id) {
  const modal = document.getElementById('dossierModal');
  const body = document.getElementById('modalDynamicBody');
  const c = creativeDossiers[id];
  if (!modal || !body || !c) return;

  body.innerHTML = `
    <div class="modal-brand-header">
      <div class="modal-brand-left">
        <div class="modal-category-icon-pill">
          <span class="cat-pill-tag">// CREATIVE_LAB</span>
        </div>
        <div>
          <span class="modal-brand-name">${c.category_name}</span>
          <span class="modal-brand-niche">${c.type_tag} &bull; ${c.duration}</span>
        </div>
      </div>
      <div class="modal-code-tag">
        <span>${c.code}</span>
        <span class="modal-tag-pill">${c.hook_rate} 3S HOOK</span>
      </div>
    </div>

    <h2 class="modal-title">${c.title}</h2>

    <!-- Hook Highlight Box -->
    <div style="background: rgba(255, 42, 59, 0.08); border: 1px solid var(--border-active); border-radius: 8px; padding: 16px 20px; margin-bottom: 20px;">
      <span style="font-family: var(--font-mono); font-size: 0.65rem; color: var(--neon-cyan); font-weight: 700; letter-spacing: 0.08em; display: block; margin-bottom: 6px;">// TESTED OPENING HOOK (0:00 - 0:03)</span>
      <p style="font-family: var(--font-syne); font-size: 1.15rem; font-weight: 800; color: #ffffff; line-height: 1.35; margin: 0;">"${c.hook_quote}"</p>
    </div>

    <div class="modal-unit-econ-box">
      <div style="font-family: var(--font-mono); font-size: 0.65rem; color: var(--neon-cyan); margin-bottom: 12px; font-weight: 700; letter-spacing: 0.08em;">// CREATIVE SPRINT PERFORMANCE TELEMETRY</div>
      <div class="modal-econ-strip">
        <div class="m-econ-item">
          <span class="m-lbl">3S HOOK RATE</span>
          <span class="m-val">${c.hook_rate}</span>
        </div>
        <div class="m-econ-item">
          <span class="m-lbl">OUTBOUND CTR</span>
          <span class="m-val">${c.ctr}</span>
        </div>
        <div class="m-econ-item">
          <span class="m-lbl">EFFICIENCY IMPACT</span>
          <span class="m-val">${c.impact}</span>
        </div>
        <div class="m-econ-item">
          <span class="m-lbl">AUDIO DIRECTION</span>
          <span class="m-val" style="font-size: 0.75rem; color: #a1a1aa;">${c.audio_track}</span>
        </div>
      </div>
    </div>

    <div class="modal-grid-two">
      <div class="modal-section-block" style="border-left: 3px solid var(--neon-rose); padding-left: 14px;">
        <h4 class="modal-section-h" style="color: var(--neon-rose);">[ THE PSYCHOLOGICAL ANGLE ]</h4>
        <p class="modal-section-p">${c.angle_description}</p>
      </div>

      <div class="modal-section-block" style="border-left: 3px solid var(--neon-cyan); padding-left: 14px;">
        <h4 class="modal-section-h" style="color: var(--neon-cyan);">[ SCRIPT TIMELINE & STORYBOARD ]</h4>
        <p class="modal-section-p">${c.script_summary}</p>
      </div>
    </div>

    <div class="modal-section-block">
      <h4 class="modal-section-h" style="color: var(--neon-emerald);">[ AUDIENCE PERSONA & AD FORMATS ]</h4>
      <p class="modal-section-p" style="margin-bottom: 10px;">${c.target_audience}</p>
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        ${c.ad_formats.map(fmt => `<span style="font-family: var(--font-mono); font-size: 0.65rem; background: rgba(255,255,255,0.05); border: 1px solid var(--border-hairline); padding: 4px 10px; border-radius: 4px; color: #e4e4e7;">✓ ${fmt}</span>`).join('')}
      </div>
    </div>

    <div class="modal-cta-box">
      <a href="#contact" onclick="closeDossierModal()" class="btn btn-cyber-primary btn-block">
        <span>COMMISSION A 14-HOOK CREATIVE SPRINT FOR YOUR BRAND</span>
        <span class="btn-arrow">↗</span>
      </a>
    </div>
  `;

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  playArpeggio([440, 554, 659, 880]);
};

/* --------------------------------------------------------------------------
   E. SHOPIFY STOREFRONT & CRO BLUEPRINT MODAL
   -------------------------------------------------------------------------- */
window.openStorefrontModal = function(id) {
  const modal = document.getElementById('dossierModal');
  const body = document.getElementById('modalDynamicBody');
  const s = storefrontDossiers[id];
  if (!modal || !body || !s) return;

  body.innerHTML = `
    <div class="modal-brand-header">
      <div class="modal-brand-left">
        <div class="modal-category-icon-pill">
          <span class="cat-pill-tag">// STOREFRONT_CRO</span>
        </div>
        <div>
          <span class="modal-brand-name">${s.category_name}</span>
          <span class="modal-brand-niche">${s.brand_title} &bull; ${s.mock_url}</span>
        </div>
      </div>
      <div class="modal-code-tag">
        <span>${s.code}</span>
        <span class="modal-tag-pill">${s.speed_score} SPEED</span>
      </div>
    </div>

    <h2 class="modal-title">${s.title}</h2>

    <div class="modal-unit-econ-box">
      <div style="font-family: var(--font-mono); font-size: 0.65rem; color: var(--neon-cyan); margin-bottom: 12px; font-weight: 700; letter-spacing: 0.08em;">// VERIFIED STOREFRONT CRO METRICS</div>
      <div class="modal-econ-strip">
        <div class="m-econ-item">
          <span class="m-lbl">CONVERSION LIFT</span>
          <span class="m-val text-glow-emerald">${s.cvr_lift}</span>
        </div>
        <div class="m-econ-item">
          <span class="m-lbl">MOBILE LOAD SPEED</span>
          <span class="m-val">${s.speed_load}</span>
        </div>
        <div class="m-econ-item">
          <span class="m-lbl">${s.aov_label}</span>
          <span class="m-val text-glow-cyan">${s.aov_gain}</span>
        </div>
        <div class="m-econ-item">
          <span class="m-lbl">LIGHTHOUSE SCORE</span>
          <span class="m-val">${s.speed_score}</span>
        </div>
      </div>
    </div>

    <div class="modal-grid-two">
      <div class="modal-section-block" style="border-left: 3px solid var(--neon-rose); padding-left: 14px;">
        <h4 class="modal-section-h" style="color: var(--neon-rose);">[ THE STOREFRONT BOTTLENECK ]</h4>
        <p class="modal-section-p">${s.cro_description}</p>
      </div>

      <div class="modal-section-block" style="border-left: 3px solid var(--neon-cyan); padding-left: 14px;">
        <h4 class="modal-section-h" style="color: var(--neon-cyan);">[ TGM CRO ARCHITECTURE ]</h4>
        <p class="modal-section-p">${s.cro_playbook}</p>
      </div>
    </div>

    <!-- Core CRO Feature Chips -->
    <div class="modal-section-block">
      <h4 class="modal-section-h" style="color: var(--neon-emerald);">[ BESPOKE STOREFRONT COMPONENTS ]</h4>
      <ul class="modal-results-list">
        <li><span class="res-arrow">⚡</span> <span><strong>${s.cro_feature_1}</strong></span></li>
        <li><span class="res-arrow">⚡</span> <span><strong>${s.cro_feature_2}</strong></span></li>
        <li><span class="res-arrow">⚡</span> <span><strong>${s.cro_feature_3}</strong></span></li>
      </ul>
    </div>

    <div class="modal-section-block" style="background: rgba(255,255,255,0.02); border: 1px solid var(--border-hairline); padding: 14px; border-radius: 6px;">
      <span style="font-family: var(--font-mono); font-size: 0.65rem; color: var(--text-dim); display: block; margin-bottom: 4px; font-weight: 700;">// STACK SPECIFICATIONS:</span>
      <p style="font-family: var(--font-mono); font-size: 0.78rem; color: #e4e4e7; margin: 0;">${s.architecture_details}</p>
    </div>

    <div class="modal-cta-box">
      <a href="#contact" onclick="closeDossierModal()" class="btn btn-cyber-primary btn-block">
        <span>COMMISSION A HIGH-SPEED STOREFRONT AUDIT FOR YOUR BRAND</span>
        <span class="btn-arrow">↗</span>
      </a>
    </div>
  `;

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  playArpeggio([440, 554, 659, 880]);
};


/* ==========================================================================
   SELECTED WORKS INTERACTION ENGINE (INSPIRED BY THISISWEIRD.IN)
   ========================================================================== */

window.switchWeirdView = function(view, btn) {
  const gridView = document.getElementById('weirdGridView');
  const indexView = document.getElementById('weirdIndexView');
  const btns = document.querySelectorAll('.weird-view-switcher .view-btn');

  btns.forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  if (view === 'grid') {
    if (gridView) gridView.style.display = 'block';
    if (indexView) indexView.style.display = 'none';
  } else if (view === 'list') {
    if (gridView) gridView.style.display = 'none';
    if (indexView) indexView.style.display = 'block';
  }

  playBeep(720, 'sine', 0.05);
};

function initWeirdFilters() {
  const filterPills = document.querySelectorAll('#weirdFilterStrip .weird-filter-pill');
  const gridCards = document.querySelectorAll('#weirdGrid .weird-project-card');
  const tableRows = document.querySelectorAll('#weirdTableBody .weird-table-row');

  if (!filterPills.length) return;

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const filter = pill.dataset.filter;

      // Filter grid cards
      gridCards.forEach(card => {
        const discs = card.dataset.disciplines || '';
        if (filter === 'all' || discs.includes(filter)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });

      // Filter table rows
      tableRows.forEach(row => {
        const discs = row.dataset.disciplines || '';
        if (filter === 'all' || discs.includes(filter)) {
          row.style.display = 'grid';
        } else {
          row.style.display = 'none';
        }
      });

      playBeep(640, 'sine', 0.04);
    });
  });
}


/* ==========================================================================
   OUR WORK 3-PILLARS ENGINE: CREATIVE, WEBSITE & ADS
   ========================================================================== */

window.shuffleCreativeVideos = function() {
  const grid = document.getElementById('ugcVideosGrid');
  if (!grid) return;
  const cards = Array.from(grid.querySelectorAll('.ugc-video-card'));
  if (!cards.length) return;
  // Fisher-Yates random shuffle
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  cards.forEach(card => grid.appendChild(card));
};

window.openWorkDivision = function(divName) {
  const hubView = document.getElementById('workHubView');
  const creativePage = document.getElementById('divisionPage_creative');
  const websitePage = document.getElementById('divisionPage_website');
  const adsPage = document.getElementById('divisionPage_ads');

  if (hubView) hubView.style.display = 'none';

  if (creativePage) creativePage.style.display = (divName === 'creative') ? 'block' : 'none';
  if (websitePage) websitePage.style.display = (divName === 'website') ? 'block' : 'none';
  if (adsPage) adsPage.style.display = (divName === 'ads') ? 'block' : 'none';

  // Randomize video cards order when opening creative division
  if (divName === 'creative') {
    shuffleCreativeVideos();
  }

  // Update switcher pills
  document.querySelectorAll('.division-switcher-pills .d-switch-pill').forEach(pill => {
    pill.classList.toggle('active', pill.getAttribute('onclick').includes(divName));
  });

  // Scroll smoothly to top of works section
  const worksSec = document.getElementById('works');
  if (worksSec) {
    const navHeight = 70;
    const y = worksSec.getBoundingClientRect().top + window.pageYOffset - navHeight;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }

  playBeep(720, 'sine', 0.05);
};

window.closeWorkDivision = function() {
  const hubView = document.getElementById('workHubView');
  const creativePage = document.getElementById('divisionPage_creative');
  const websitePage = document.getElementById('divisionPage_website');
  const adsPage = document.getElementById('divisionPage_ads');

  if (hubView) hubView.style.display = 'block';
  if (creativePage) creativePage.style.display = 'none';
  if (websitePage) websitePage.style.display = 'none';
  if (adsPage) adsPage.style.display = 'none';

  const worksSec = document.getElementById('works');
  if (worksSec) {
    const navHeight = 70;
    const y = worksSec.getBoundingClientRect().top + window.pageYOffset - navHeight;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }

  playBeep(520, 'sine', 0.04);
};

/* Creative Videos Filters & Brand Quick Filter */
function initCreativeVideoFilters() {
  const filterTabs = document.querySelectorAll('#creativeVideoFilters .filter-btn');
  const cards = document.querySelectorAll('#ugcVideosGrid .ugc-video-card');

  if (!filterTabs.length || !cards.length) return;

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.dataset.filter;

      cards.forEach(card => {
        const cat = card.dataset.category || '';
        if (filter === 'all' || cat.includes(filter)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
      if (filter === 'all') {
        shuffleCreativeVideos();
      }
      playBeep(640, 'sine', 0.04);
    });
  });
}

window.filterCreativeByBrand = function(brandName) {
  const cards = document.querySelectorAll('#ugcVideosGrid .ugc-video-card');
  const chips = document.querySelectorAll('.brand-quick-strip .brand-chip');

  chips.forEach(c => {
    c.classList.toggle('active', c.textContent.toLowerCase().includes(brandName.toLowerCase()) || (brandName === 'all' && c.textContent.includes('All')));
  });

  cards.forEach(card => {
    const b = card.dataset.brand || '';
    if (brandName === 'all' || b === brandName.toLowerCase()) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });

  if (brandName === 'all') {
    shuffleCreativeVideos();
  }

  playBeep(680, 'sine', 0.04);
};

/* Website Filters */
function initWebsitePreviewFilters() {
  const filterTabs = document.querySelectorAll('#websiteFilters .filter-btn');
  const cards = document.querySelectorAll('#websitesGrid .website-preview-card');

  if (!filterTabs.length || !cards.length) return;

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.dataset.siteFilter;

      cards.forEach(card => {
        const cat = card.dataset.category || '';
        if (filter === 'all' || cat.includes(filter)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
      if (filter === 'all') {
        shuffleCreativeVideos();
      }
      playBeep(640, 'sine', 0.04);
    });
  });
}

/* Video Player Modal */
window.openVideoPlayerModal = function(brand, category, videoUrl) {
  const modal = document.getElementById('videoPlayerModal');
  const brandPill = document.getElementById('vmBrandName');
  const catTag = document.getElementById('vmCategoryName');
  const videoEl = document.getElementById('vmVideoElement');
  const brandLogo = document.getElementById('vmBrandLogo');

  if (!modal || !videoEl) return;

  const brandLogos = {
    'magproactive': 'assets/clients/magproactive.png',
    'vedist organic': 'assets/clients/vedist.svg',
    'kohl & spice': 'assets/clients/kohlspice.svg',
    'elite kicks co.': 'assets/clients/elitekicks.png?v=4.6',
    'elite kicks': 'assets/clients/elitekicks.png?v=4.6',
    'studio6 jewels': 'assets/clients/studio6.png',
    'studio 6 jewels': 'assets/clients/studio6.png',
    'timberkala': 'assets/clients/timberkala.png',
    'timber kala': 'assets/clients/timberkala.png',
    'sunya': 'assets/clients/sunya.png',
    'unmatched kicks': 'assets/clients/unmatchedkicks.png',
    'maac': 'assets/clients/maac.png',
    'learnzlab': 'assets/clients/learnzlab.png',
    'vitalcep': 'assets/clients/vitalcep.png',
  };

  const logoSrc = brandLogos[brand.toLowerCase()];
  if (brandLogo && logoSrc) {
    brandLogo.src = logoSrc;
    brandLogo.alt = brand;
    brandLogo.style.display = 'block';
    if (brandPill) brandPill.style.display = 'none';
  } else if (brandPill) {
    if (brandLogo) brandLogo.style.display = 'none';
    brandPill.textContent = brand;
    brandPill.style.display = 'inline-block';
  }

  if (catTag) catTag.textContent = `// ${category} // PERFORMANCE UGC AD`;
  videoEl.src = videoUrl;
  videoEl.load();

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');

  videoEl.play().catch(e => console.log('Autoplay handled:', e));
  playArpeggio([440, 554, 659, 880]);
};

window.closeVideoPlayerModal = function() {
  const modal = document.getElementById('videoPlayerModal');
  const videoEl = document.getElementById('vmVideoElement');

  if (videoEl) {
    videoEl.pause();
    videoEl.currentTime = 0;
    videoEl.src = '';
  }

  if (modal) {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  }
};

window.openStorefrontModalByName = function(brandName) {
  const modal = document.getElementById('dossierModal');
  const body = document.getElementById('modalDynamicBody');
  if (!modal || !body) return;

  body.innerHTML = `
    <div class="modal-brand-header">
      <div class="modal-brand-left">
        <div class="modal-category-icon-pill">
          <span class="cat-pill-tag">// SHOPIFY_CRO</span>
        </div>
        <div>
          <span class="modal-brand-name">${brandName}</span>
          <span class="modal-brand-niche">Live Production Storefront</span>
        </div>
      </div>
      <div class="modal-code-tag">
        <span class="modal-tag-pill">99/100 SPEED</span>
      </div>
    </div>

    <h2 class="modal-title">${brandName} — Conversion Architecture Blueprint</h2>

    <div class="modal-unit-econ-box">
      <div style="font-family: var(--font-mono); font-size: 0.65rem; color: var(--neon-cyan); margin-bottom: 12px; font-weight: 700; letter-spacing: 0.08em;">// AUDITED STOREFRONT IMPACT</div>
      <div class="modal-econ-strip">
        <div class="m-econ-item"><span class="m-lbl">LIGHTHOUSE SPEED</span><span class="m-val text-glow-emerald">99 / 100</span></div>
        <div class="m-econ-item"><span class="m-lbl">CONVERSION LIFT</span><span class="m-val">+74% CVR</span></div>
        <div class="m-econ-item"><span class="m-lbl">MOBILE TTFB</span><span class="m-val text-glow-cyan">0.8s</span></div>
        <div class="m-econ-item"><span class="m-lbl">PREPAID SHARE</span><span class="m-val">68%</span></div>
      </div>
    </div>

    <div class="modal-grid-two">
      <div class="modal-section-block" style="border-left: 3px solid var(--neon-rose); padding-left: 14px;">
        <h4 class="modal-section-h" style="color: var(--neon-rose);">[ FRICTION POINTS REMOVED ]</h4>
        <p class="modal-section-p">Eliminated 8 redundant JavaScript apps that crippled mobile load times. Rebuilt core product detail pages with native Liquid 2.0 to deliver instantaneous edge-cached page loads.</p>
      </div>

      <div class="modal-section-block" style="border-left: 3px solid var(--neon-cyan); padding-left: 14px;">
        <h4 class="modal-section-h" style="color: var(--neon-cyan);">[ BESPOKE CRO BLUEPRINT ]</h4>
        <p class="modal-section-p">Engineered 1-click UPI checkout drawer, tiered dynamic bundle ladders, real-time stock scarcity counter, and automated post-code delivery calculator.</p>
      </div>
    </div>

    <div class="modal-section-block">
      <h4 class="modal-section-h" style="color: var(--neon-emerald);">[ KEY REVENUE FEATURES ]</h4>
      <ul class="modal-results-list">
        <li><span class="res-arrow">⚡</span> <span><strong>Sticky Add-to-Cart Drawer:</strong> Thumb-zone optimized with instant size/variant switcher.</span></li>
        <li><span class="res-arrow">⚡</span> <span><strong>Prepaid UPI Checkout Incentive:</strong> Reduced COD RTO rate by 38% through automated discount.</span></li>
        <li><span class="res-arrow">⚡</span> <span><strong>Server-Side CAPI Edge Tracking:</strong> 99.2% Meta pixel event match quality with zero cookie drop.</span></li>
      </ul>
    </div>

    <div class="modal-cta-box">
      <a href="#contact" onclick="closeDossierModal()" class="btn btn-cyber-primary btn-block">
        <span>COMMISSION A BESPOKE SHOPIFY AUDIT FOR YOUR BRAND</span>
        <span class="btn-arrow">↗</span>
      </a>
    </div>
  `;

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  playArpeggio([440, 554, 659, 880]);
};
