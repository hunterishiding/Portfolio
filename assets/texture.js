/* ============================================================================
   texture.js — cherry-blossom background for the whole site
   ----------------------------------------------------------------------------
   Adds soft branches on the left and right edges, drifting petals, a gentle
   vignette and film grain. It sits on top of the page, never blocks a click,
   and is created by this script at load time, so it never ends up inside
   index.html when you save from the editor (it also stays off inside the
   editor preview on purpose).

   Both index.html and entry.html load this one file, so change the look here.
   You can also override any setting from a page with, for example:
       <script>window.SITE_TEXTURE = { branchOpacity: 0.2, color: '#fcddec' };</script>
   placed BEFORE the <script src="assets/texture.js"> line.

   Testing: add ?texture=off to any address to switch it off.
   ============================================================================ */
(function(){
  'use strict';

  const DEFAULTS = {
    enabled:       true,
    color:         '#ffffff',   // '#ffffff' white · '#f7f4ec' ivory · '#fcddec' pale blush
    branchOpacity: 0.12,        // 0.03 (barely there) … 0.5 (bold)
    branchScale:   1,           // 0.7 … 1.4, how far the branches reach in
    bloom:         0,           // soft glow around the branches, in px (0 = off, 16 = max)
    petals:        true,        // falling petals
    petalCount:    26,          // fewer on phones automatically
    vignette:      true,        // darkens the corners slightly
    grain:         true         // faint dotted film grain
  };

  const inEditor = window.self !== window.top;
  if (inEditor) return;
  if (/[?&]texture=off\b/.test(location.search)) return;

  const cfg = Object.assign({}, DEFAULTS, window.SITE_TEXTURE || {});
  if (!cfg.enabled) return;

  const reduceMotion = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  const BRANCH = `<g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"> <path d="M -20,60 Q 90,80 180,130 T 290,190 T 380,210" stroke-width="5" opacity="0.95" /> <path d="M 180,130 Q 230,80 320,60" stroke-width="2.5" opacity="0.85" /> <path d="M 290,190 Q 330,260 410,280" stroke-width="2.2" opacity="0.85" /> <path d="M 320,60 Q 370,40 430,45" stroke-width="1.6" opacity="0.8" /> <path d="M 380,210 Q 430,215 470,185" stroke-width="1.5" opacity="0.75" /> <path d="M -30,340 C 60,320 120,400 240,410 C 330,418 390,370 470,410" stroke-width="6" opacity="0.95" /> <path d="M 130,370 Q 180,310 260,280" stroke-width="3" opacity="0.85" /> <path d="M 260,280 Q 310,250 370,265" stroke-width="1.8" opacity="0.8" /> <path d="M 240,410 Q 270,490 350,540" stroke-width="2.8" opacity="0.85" /> <path d="M 350,540 Q 410,560 460,610" stroke-width="1.8" opacity="0.8" /> <path d="M 350,540 Q 390,490 440,480" stroke-width="1.5" opacity="0.75" /> <path d="M -20,680 Q 110,670 190,730 T 320,770 T 430,850" stroke-width="4.5" opacity="0.9" /> <path d="M 190,730 Q 250,680 340,660" stroke-width="2.2" opacity="0.8" /> <path d="M 340,660 Q 400,645 450,670" stroke-width="1.5" opacity="0.75" /> <path d="M 320,770 Q 350,830 400,890" stroke-width="1.8" opacity="0.8" /> </g> <g fill="currentColor"> <g transform="translate(320, 60) scale(1.1)"> <circle cx="0" cy="-9" r="6" /> <circle cx="8" cy="-3" r="6" /> <circle cx="5" cy="8" r="6" /> <circle cx="-5" cy="8" r="6" /> <circle cx="-8" cy="-3" r="6" /> <circle cx="0" cy="0" r="3.2" style="fill:var(--pine-deep,#152019)" /> </g> <g transform="translate(430, 45) scale(0.95)"> <circle cx="0" cy="-8" r="5.5" /><circle cx="7.5" cy="-2.5" r="5.5" /><circle cx="4.5" cy="7.5" r="5.5" /><circle cx="-4.5" cy="7.5" r="5.5" /><circle cx="-7.5" cy="-2.5" r="5.5" /> <circle cx="0" cy="0" r="2.8" style="fill:var(--pine-deep,#152019)" /> </g> <g transform="translate(380, 210) scale(1.2)"> <circle cx="0" cy="-9" r="6" /><circle cx="8" cy="-3" r="6" /><circle cx="5" cy="8" r="6" /><circle cx="-5" cy="8" r="6" /><circle cx="-8" cy="-3" r="6" /> <circle cx="0" cy="0" r="3.2" style="fill:var(--pine-deep,#152019)" /> </g> <g transform="translate(470, 185) scale(0.85)"> <circle cx="0" cy="-8" r="5.5" /><circle cx="7.5" cy="-2.5" r="5.5" /><circle cx="4.5" cy="7.5" r="5.5" /><circle cx="-4.5" cy="7.5" r="5.5" /><circle cx="-7.5" cy="-2.5" r="5.5" /> <circle cx="0" cy="0" r="2.5" style="fill:var(--pine-deep,#152019)" /> </g> <g transform="translate(260, 280) scale(1.25)"> <circle cx="0" cy="-9" r="6.2" /><circle cx="8" cy="-3" r="6.2" /><circle cx="5" cy="8" r="6.2" /><circle cx="-5" cy="8" r="6.2" /><circle cx="-8" cy="-3" r="6.2" /> <circle cx="0" cy="0" r="3.5" style="fill:var(--pine-deep,#152019)" /> </g> <g transform="translate(370, 265) scale(0.9)"> <circle cx="0" cy="-8" r="5.5" /><circle cx="7.5" cy="-2.5" r="5.5" /><circle cx="4.5" cy="7.5" r="5.5" /><circle cx="-4.5" cy="7.5" r="5.5" /><circle cx="-7.5" cy="-2.5" r="5.5" /> <circle cx="0" cy="0" r="2.5" style="fill:var(--pine-deep,#152019)" /> </g> <g transform="translate(470, 410) scale(1.3)"> <circle cx="0" cy="-9" r="6.5" /><circle cx="8.5" cy="-3" r="6.5" /><circle cx="5.5" cy="8.5" r="6.5" /><circle cx="-5.5" cy="8.5" r="6.5" /><circle cx="-8.5" cy="-3" r="6.5" /> <circle cx="0" cy="0" r="3.5" style="fill:var(--pine-deep,#152019)" /> </g> <g transform="translate(440, 480) scale(0.9)"> <circle cx="0" cy="-8" r="5.5" /><circle cx="7.5" cy="-2.5" r="5.5" /><circle cx="4.5" cy="7.5" r="5.5" /><circle cx="-4.5" cy="7.5" r="5.5" /><circle cx="-7.5" cy="-2.5" r="5.5" /> <circle cx="0" cy="0" r="2.5" style="fill:var(--pine-deep,#152019)" /> </g> <g transform="translate(460, 610) scale(1.05)"> <circle cx="0" cy="-8.5" r="5.8" /><circle cx="8" cy="-2.8" r="5.8" /><circle cx="5" cy="8" r="5.8" /><circle cx="-5" cy="8" r="5.8" /><circle cx="-8" cy="-2.8" r="5.8" /> <circle cx="0" cy="0" r="3" style="fill:var(--pine-deep,#152019)" /> </g> <g transform="translate(340, 660) scale(1.15)"> <circle cx="0" cy="-9" r="6" /><circle cx="8" cy="-3" r="6" /><circle cx="5" cy="8" r="6" /><circle cx="-5" cy="8" r="6" /><circle cx="-8" cy="-3" r="6" /> <circle cx="0" cy="0" r="3" style="fill:var(--pine-deep,#152019)" /> </g> <g transform="translate(450, 670) scale(0.9)"> <circle cx="0" cy="-8" r="5.5" /><circle cx="7.5" cy="-2.5" r="5.5" /><circle cx="4.5" cy="7.5" r="5.5" /><circle cx="-4.5" cy="7.5" r="5.5" /><circle cx="-7.5" cy="-2.5" r="5.5" /> <circle cx="0" cy="0" r="2.5" style="fill:var(--pine-deep,#152019)" /> </g> <g transform="translate(430, 850) scale(1.2)"> <circle cx="0" cy="-9" r="6.2" /><circle cx="8" cy="-3" r="6.2" /><circle cx="5" cy="8" r="6.2" /><circle cx="-5" cy="8" r="6.2" /><circle cx="-8" cy="-3" r="6.2" /> <circle cx="0" cy="0" r="3.2" style="fill:var(--pine-deep,#152019)" /> </g> <g transform="translate(400, 890) scale(0.95)"> <circle cx="0" cy="-8" r="5.5" /><circle cx="7.5" cy="-2.5" r="5.5" /><circle cx="4.5" cy="7.5" r="5.5" /><circle cx="-4.5" cy="7.5" r="5.5" /><circle cx="-7.5" cy="-2.5" r="5.5" /> <circle cx="0" cy="0" r="2.6" style="fill:var(--pine-deep,#152019)" /> </g> <ellipse cx="290" cy="190" rx="4" ry="7" transform="rotate(25 290 190)" /> <ellipse cx="210" cy="115" rx="3.5" ry="6" transform="rotate(-30 210 115)" /> <ellipse cx="330" cy="240" rx="4" ry="7" transform="rotate(40 330 240)" /> <ellipse cx="285" cy="445" rx="4.2" ry="7.5" transform="rotate(15 285 445)" /> <ellipse cx="385" cy="515" rx="3.8" ry="6.5" transform="rotate(-45 385 515)" /> <ellipse cx="260" cy="710" rx="3.5" ry="6" transform="rotate(20 260 710)" /> <ellipse cx="365" cy="805" rx="4" ry="7" transform="rotate(-35 365 805)" /> </g> `;
  const svg = `<svg viewBox="0 0 500 1000" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMid meet" aria-hidden="true">${BRANCH}</svg>`;

  /* ---------- styles ---------- */
  const css = document.createElement('style');
  css.id = 'site-texture-style';
  css.textContent = `
    #site-texture{position:fixed; inset:0; z-index:40; pointer-events:none; overflow:hidden;}
    #site-texture *{pointer-events:none;}
    #site-texture .tx-vignette{position:absolute; inset:0;
      background:radial-gradient(ellipse at center, transparent 45%, rgba(9,15,11,.5) 100%);}
    #site-texture .tx-grain{position:absolute; inset:0;
      background-image:radial-gradient(rgba(255,255,255,.04) 1px, transparent 0); background-size:24px 24px;}
    #site-texture .tx-branch{position:absolute; top:0; height:100vh; width:42vw; max-width:580px;
      -webkit-mask-image:linear-gradient(to right, #000 50%, transparent 100%);
              mask-image:linear-gradient(to right, #000 50%, transparent 100%);}
    #site-texture .tx-branch svg{width:100%; height:100%; display:block;}
    #site-texture .tx-left{left:0;}
    #site-texture .tx-right{right:0; transform:scaleX(-1);}
    #site-texture canvas{position:absolute; inset:0; width:100%; height:100%;}
    @media (max-width:700px){
      #site-texture .tx-branch{width:34vw;}
    }`;
  document.head.appendChild(css);

  /* ---------- markup ---------- */
  const root = document.createElement('div');
  root.id = 'site-texture';
  root.setAttribute('aria-hidden', 'true');
  root.innerHTML =
    (cfg.vignette ? '<div class="tx-vignette"></div>' : '') +
    (cfg.grain    ? '<div class="tx-grain"></div>'    : '') +
    `<div class="tx-branch tx-left">${svg}</div>` +
    `<div class="tx-branch tx-right">${svg}</div>` +
    (cfg.petals && !reduceMotion ? '<canvas></canvas>' : '');
  document.body.appendChild(root);

  const left  = root.querySelector('.tx-left');
  const right = root.querySelector('.tx-right');

  function paintBranches(){
    const glow = cfg.bloom > 0
      ? `drop-shadow(0 0 ${cfg.bloom}px ${cfg.color}) blur(${cfg.bloom * 0.15}px)` : 'none';
    [[left, ''], [right, 'scaleX(-1) ']].forEach(([el, flip]) => {
      el.style.color = cfg.color;
      el.style.opacity = cfg.branchOpacity;
      el.style.filter = glow;
      el.style.transform = `${flip}scale(${cfg.branchScale})`;
      el.style.transformOrigin = flip ? 'right center' : 'left center';
    });
  }
  paintBranches();

  /* ---------- falling petals ---------- */
  const canvas = root.querySelector('canvas');
  let ctx = canvas && canvas.getContext ? canvas.getContext('2d') : null;
  let W = 0, H = 0, petals = [], running = false;

  function size(){
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth; H = window.innerHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  class Petal{
    constructor(){ this.reset(true); }
    reset(initial){
      const fromLeft = Math.random() > 0.5;
      this.x = fromLeft ? Math.random() * W * 0.35 : W - Math.random() * W * 0.35;
      this.y = initial ? Math.random() * H : -20;
      this.size = 5 + Math.random() * 8;
      this.vy = 0.5 + Math.random() * 1.0;
      this.vx = (Math.random() - 0.45) * 1.0;
      this.angle = Math.random() * Math.PI * 2;
      this.spin = (Math.random() - 0.5) * 0.03;
      this.flip = Math.random() * Math.PI;
      this.flipSpeed = 0.02 + Math.random() * 0.03;
      this.alpha = 0.15 + Math.random() * 0.4;
    }
    step(){
      this.y += this.vy;
      this.x += this.vx + Math.sin(this.angle) * 0.4;
      this.angle += this.spin;
      this.flip += this.flipSpeed;
      if (this.y > H + 20 || this.x < -30 || this.x > W + 30) this.reset(false);
    }
    draw(){
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      ctx.scale(Math.sin(this.flip), 1);
      ctx.fillStyle = cfg.color;
      // Petals stay a touch stronger than the branches so they read as motion.
      ctx.globalAlpha = Math.min(1, this.alpha * (0.4 + cfg.branchOpacity * 4));
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(this.size * 0.7, -this.size * 0.6, 0, -this.size * 1.4);
      ctx.quadraticCurveTo(-this.size * 0.7, -this.size * 0.6, 0, 0);
      ctx.fill();
      ctx.restore();
    }
  }

  function frame(){
    if (!running) return;
    ctx.clearRect(0, 0, W, H);
    petals.forEach(p => { p.step(); p.draw(); });
    requestAnimationFrame(frame);
  }
  function start(){ if (!ctx || running || !petals.length) return; running = true; requestAnimationFrame(frame); }
  function stop(){ running = false; }

  function buildPetals(){
    if (!ctx) return;
    const n = window.innerWidth < 700 ? Math.round(cfg.petalCount * 0.4) : cfg.petalCount;
    petals = Array.from({length: n}, () => new Petal());
  }

  if (ctx){
    size(); buildPetals(); start();
    window.addEventListener('resize', size);
    // No point animating a tab nobody is looking at.
    document.addEventListener('visibilitychange', () => document.hidden ? stop() : start());
  }

  /* Small hook for experimenting from the browser console:
       SiteTexture.set({ branchOpacity: 0.25, color: '#fcddec' })  */
  window.SiteTexture = {
    set(patch){
      Object.assign(cfg, patch || {});
      paintBranches();
      if (canvas) canvas.style.display = cfg.petals ? '' : 'none';
    }
  };
})();
