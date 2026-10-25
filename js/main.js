/* =========================================================
   Junhao Liang · personal website
   ========================================================= */

const root = document.documentElement;
const media = (q) => window.matchMedia(q);
const wideMQ = media('(min-width: 769px)');
const noHoverMQ = media('(hover: none)');
const reduceMQ = media('(prefers-reduced-motion: reduce)');
const darkMQ = media('(prefers-color-scheme: dark)');
const nav = document.getElementById('topnav');
const afterFrames = (fn) => requestAnimationFrame(() => requestAnimationFrame(fn));

let lastPointer = 'mouse';
let keyboardNav = false;

document.addEventListener('pointerdown', (e) => { lastPointer = e.pointerType || 'mouse'; keyboardNav = false; }, true);
document.addEventListener('keydown', (e) => { if (e.key === 'Tab') keyboardNav = true; }, true);

/* =========================================================
   BibTeX
   ========================================================= */

const BIBTEX = {
  liang2026pathprism: `@article{liang2026pathprism,
  title   = {Spatial biomarker discovery via interpretable semantic learning in histopathology},
  author  = {Liang, Junhao and Jiang, Xiaofeng and Reitsam, Nic Gabriel and Lenz, Tim and Zhang, Li and Gustav, Marco and Carrero, Zunamys Itzell and Muti, Hannah Sophie and Neidlinger, Peter and Clusmann, Jan and Žigutytė, Laura and Sainath, Vidhya and Wolf, Fabian and Boardman, Lisa A. and French, Amy J. and Goode, Ellen L. and Gsur, Andrea and Brezina, Stefanie and Gunter, Marc J. and Steinfelder, Robert and Harrison, Tabitha and Peters, Ulrike and Phipps, Amanda I. and Quirke, Philip and West, Nicholas P. and Hoffmeister, Michael and Brenner, Hermann and Wankhede, Durgesh and Jonnagaddala, Jitendra and Hawkins, Nicholas and Ward, Robyn L. and Fountzilas, Elena and Papadopoulou, Kyriaki and Fountzilas, George and André, Thierry and Taieb, Julien and Emile, Jean-François and Svrcek, Magali and Kong, Lingjie and Kather, Jakob Nikolas},
  journal = {Cancer Cell},
  volume  = {44},
  number  = {8},
  year    = {2026},
  doi     = {10.1016/j.ccell.2026.05.014}
}`,
  zhang2026onpremise: `@article{zhang2026onpremise,
  title   = {On-premise medical AI agents for reliable clinical decision-making},
  author  = {Zhang, Li and Wölflein, Georg and Ferber, Dyke and Liang, Junhao and Carrero, Zunamys I. and Wu, Xuewei and Vibert, Julien and Clusmann, Jan and Möhrmann, Lino and Möhrmann, Elena E. and Wichmann, Catharina and Wolf, Fabian and Lenz, Tim and Kather, Jakob Nikolas},
  journal = {Nature Medicine},
  volume  = {32},
  pages   = {3705--3716},
  year    = {2026},
  doi     = {10.1038/s41591-026-04609-x}
}`,
  cai2026virtualmif: `@article{cai2026virtualmif,
  title   = {Transforming Histology into Virtual Multiplex Immunofluorescence to Decode Prognostic Spatial Immunity in Hepatocellular Carcinoma},
  author  = {Cai, Linghan and Jiang, Songhan and Liang, Junhao and Liu, Fengchun and Zhang, Buyi and Reitsam, Nic Gabriel and Zeng, Qinghe and Hu, Zheqi and Ma, Yanqing and Li, Ziqian and Feng, Shi and Hu, Maotong and Zhang, Xiuming and Zhang, Jing and Kather, Jakob Nikolas and Zhang, Yongbing and Liang, Wenjie},
  journal = {bioRxiv},
  year    = {2026},
  doi     = {10.1101/2026.02.25.707931}
}`,
  zhang2025calcium: `@inproceedings{zhang2025calcium,
  title     = {Towards a general-purpose foundation model for signal extraction in calcium imaging of neuronal network activities},
  author    = {Zhang, Weisheng and Liang, Junhao and Kong, Lingjie},
  booktitle = {European Conference on Biomedical Optics (ECBO)},
  note      = {Paper W2C.3},
  year      = {2025}
}`,
  shi2024rawifi: `@article{shi2024rawifi,
  title   = {Random-access wide-field mesoscopy for centimetre-scale imaging of biodynamics with subcellular resolution},
  author  = {Shi, Ruheng and Chen, Xinyue and Deng, Junhao and Liang, Junhao and Fan, Kuikui and Zhou, Feifan and Tang, Peifu and Zhang, Licheng and Kong, Lingjie},
  journal = {Nature Photonics},
  volume  = {18},
  number  = {7},
  pages   = {721--730},
  year    = {2024},
  doi     = {10.1038/s41566-024-01422-1}
}`,
  liang2023pathfinder: `@article{liang2023pathfinder,
  title   = {Deep learning supported discovery of biomarkers for clinical prognosis of liver cancer},
  author  = {Liang, Junhao and Zhang, Weisheng and Yang, Jianghui and Wu, Meilong and Dai, Qionghai and Yin, Hongfang and Xiao, Ying and Kong, Lingjie},
  journal = {Nature Machine Intelligence},
  volume  = {5},
  number  = {4},
  pages   = {408--420},
  year    = {2023},
  doi     = {10.1038/s42256-023-00635-3}
}`
};

function showNotice(text) {
  const notice = document.getElementById('copynotice');
  notice.textContent = text;
  notice.classList.add('show');
  clearTimeout(showNotice.timer);
  showNotice.timer = setTimeout(() => notice.classList.remove('show'), 2000);
}

function fallbackCopy(text) {
  const area = document.createElement('textarea');
  area.value = text;
  area.setAttribute('readonly', '');
  area.style.position = 'fixed';
  area.style.opacity = '0';
  document.body.appendChild(area);
  area.select();
  let ok = false;
  try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
  document.body.removeChild(area);
  return ok;
}

function copyBibtex(key) {
  const text = BIBTEX[key];
  if (!text) return;
  const done = () => showNotice('BibTeX copied to clipboard!');
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(done, () => { if (fallbackCopy(text)) done(); });
  } else if (fallbackCopy(text)) {
    done();
  }
}

document.querySelectorAll('.bibtex').forEach((el) => {
  el.addEventListener('click', () => copyBibtex(el.dataset.key));
  el.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); copyBibtex(el.dataset.key); }
  });
});

/* =========================================================
   Show all authors
   ========================================================= */

document.querySelectorAll('.author-toggle').forEach((btn) => {
  btn.addEventListener('click', () => {
    const p = btn.closest('.authors');
    const more = p.querySelector('.authors-more');
    const dots = p.querySelector('.authors-ellipsis');
    const open = more.hidden;
    more.hidden = !open;
    if (dots) dots.hidden = open;
    btn.textContent = open ? btn.dataset.less : btn.dataset.more;
    btn.setAttribute('aria-expanded', String(open));
  });
});

/* =========================================================
   Light / dark theme: a slow radial reveal with a soft edge
   ========================================================= */

const themeToggle = document.getElementById('theme-toggle');
const themeMeta = document.querySelector('meta[name="theme-color"]');
const currentTheme = () => root.getAttribute('data-theme') || (darkMQ.matches ? 'dark' : 'light');
const THEME_EASE = 'cubic-bezier(0.45, 0.05, 0.25, 1)';

// the soft edge needs an animatable (registered) custom property
let softReveal = false;
if (window.CSS && CSS.registerProperty) {
  try {
    CSS.registerProperty({ name: '--vt-r', syntax: '<length>', inherits: false, initialValue: '0px' });
    softReveal = true;
  } catch (e) {
    softReveal = Boolean(e && e.name === 'InvalidModificationError');   // already registered
  }
}

function syncThemeUI() {
  const dark = currentTheme() === 'dark';
  const label = dark ? 'Switch to light mode' : 'Switch to dark mode';
  themeToggle.setAttribute('aria-label', label);
  themeToggle.title = label;
  if (themeMeta) themeMeta.setAttribute('content', dark ? '#0e1116' : '#ffffff');
}

themeToggle.addEventListener('click', () => {
  const next = currentTheme() === 'dark' ? 'light' : 'dark';
  const apply = () => {
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) { /* storage unavailable */ }
    syncThemeUI();
  };
  if (!document.startViewTransition || reduceMQ.matches) { apply(); return; }

  const r = themeToggle.getBoundingClientRect();
  const x = r.left + r.width / 2;
  const y = r.top + r.height / 2;
  const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

  if (softReveal) {
    const soft = Math.round(Math.min(640, radius * 0.45));
    root.style.setProperty('--vt-x', `${x}px`);
    root.style.setProperty('--vt-y', `${y}px`);
    root.style.setProperty('--vt-soft', `${soft}px`);
    root.classList.add('vt-soft');
    const transition = document.startViewTransition(apply);
    transition.ready.then(() => {
      root.animate(
        { '--vt-r': ['0px', `${radius + soft}px`] },
        { duration: 1300, easing: THEME_EASE, fill: 'forwards', pseudoElement: '::view-transition-new(root)' }
      );
    }).catch(() => {});
    transition.finished.finally(() => {
      root.classList.remove('vt-soft');
      ['--vt-x', '--vt-y', '--vt-soft'].forEach((p) => root.style.removeProperty(p));
    });
  } else {
    const transition = document.startViewTransition(apply);
    transition.ready.then(() => {
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 1100, easing: THEME_EASE, fill: 'forwards', pseudoElement: '::view-transition-new(root)' }
      );
    }).catch(() => {});
  }
});

darkMQ.addEventListener('change', syncThemeUI);
syncThemeUI();

/* =========================================================
   Top navigation: border on scroll, brand reveal, active section
   ========================================================= */

const navLinks = Array.from(document.querySelectorAll('.nav-links a[data-section]'));
const navSections = navLinks.map((a) => document.getElementById(a.dataset.section)).filter(Boolean);
const nameEl = document.getElementById('name');
const navScroller = document.querySelector('.nav-links');
let activeSection = '';
let pinnedSection = null;   // a section chosen from the menu stays highlighted until the reader scrolls
let navTicking = false;

function setActiveSection(id) {
  if (!id || id === activeSection) return;
  activeSection = id;
  navLinks.forEach((a) => {
    const on = a.dataset.section === id;
    a.classList.toggle('active', on);
    if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
    if (on && navScroller.scrollWidth > navScroller.clientWidth) {
      navScroller.scrollTo({ left: a.offsetLeft - 16, behavior: reduceMQ.matches ? 'auto' : 'smooth' });
    }
  });
}

function updateNav() {
  navTicking = false;
  const navH = nav.offsetHeight;
  nav.classList.toggle('scrolled', window.scrollY > 4);
  nav.classList.toggle('show-brand', nameEl.getBoundingClientRect().bottom < navH);
  if (pinnedSection) return;

  const probe = navH + window.innerHeight * 0.3;
  let current = navSections[0];
  navSections.forEach((s) => { if (s.getBoundingClientRect().top <= probe) current = s; });
  if (window.innerHeight + window.scrollY >= root.scrollHeight - 4) current = navSections[navSections.length - 1];
  if (current) setActiveSection(current.id);
}

navLinks.forEach((a) => {
  a.addEventListener('click', () => { pinnedSection = a.dataset.section; setActiveSection(pinnedSection); });
});

const releasePin = () => { if (pinnedSection) { pinnedSection = null; updateNav(); } };
window.addEventListener('wheel', releasePin, { passive: true });
window.addEventListener('touchstart', releasePin, { passive: true });
window.addEventListener('keydown', (e) => {
  if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(e.key)) releasePin();
});

window.addEventListener('scroll', () => {
  if (!navTicking) { navTicking = true; requestAnimationFrame(updateNav); }
}, { passive: true });
updateNav();

/* =========================================================
   Page piles: hovering or clicking slides the pages out side by side
   and pushes the text of the row to the right (transforms only)
   ========================================================= */

const GAP = 14;          // gap between spread pages
const MIN_W = 150;       // pages narrower than this do not spread
const PEEK = [[0, 0, 0], [12, 6, 2], [5, 12, -1.5]];   // resting x, y offset and tilt
const piles = [];
let lastScrollAt = 0;
window.addEventListener('scroll', () => { lastScrollAt = performance.now(); }, { passive: true });

/* place a card by its visual centre (cx, cy), tilt and scale; w × h is its layout size */
function cardTransform(cx, cy, rot, s, w, h) {
  return `translate(${cx}px, ${cy}px) rotate(${rot}deg) translate(${(-s * w) / 2}px, ${(-s * h) / 2}px) scale(${s})`;
}

class Pile {
  constructor(el) {
    this.el = el;
    el._pile = this;
    this.pub = el.closest('.pub');
    this.media = el.parentElement;
    this.cards = Array.from(el.querySelectorAll('.card'));
    this.n = this.cards.length;
    this.ratios = this.cards.map((c) => {
      const img = c.querySelector('img');
      const w = Number(img.getAttribute('width'));
      const h = Number(img.getAttribute('height'));
      return w && h ? h / w : 1.33;
    });
    el.style.setProperty('--ar', this.ratios[0].toFixed(4));
    this.isOpen = false;
    this.spreadable = false;
    this.openTimer = null;

    this.hit = document.createElement('div');
    this.hit.className = 'stack-hit';
    el.prepend(this.hit);
    if (this.n > 1) {
      this.edge = document.createElement('div');
      this.edge.className = 'pub-edge';
      this.edge.setAttribute('aria-hidden', 'true');
      this.pub.appendChild(this.edge);
    }
    this.bind();
  }

  bind() {
    const el = this.el;
    el.addEventListener('pointerenter', (e) => {
      if (e.pointerType === 'mouse') clearTimeout(this.closeTimer);
    });
    // open on real mouse movement only, so scrolling past a pile never triggers it
    el.addEventListener('pointermove', (e) => {
      if (e.pointerType !== 'mouse' || !this.spreadable || this.isOpen || this.openTimer) return;
      if (!e.movementX && !e.movementY) return;
      if (performance.now() - lastScrollAt < 160) return;
      this.openTimer = setTimeout(() => { this.openTimer = null; this.open(); }, 40);
    });
    el.addEventListener('pointerleave', (e) => {
      if (e.pointerType !== 'mouse') return;
      clearTimeout(this.openTimer);
      this.openTimer = null;
      if (this.isOpen) this.closeTimer = setTimeout(() => this.close(), 70);
    });
    el.addEventListener('focus', () => {
      if (keyboardNav && this.spreadable && !this.isOpen) this.open();
    });
    el.addEventListener('blur', () => { if (this.isOpen) this.close(); });
    el.addEventListener('keydown', (e) => {
      if (!this.spreadable) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (this.isOpen) this.close(); else this.open();
      } else if (e.key === 'Escape') {
        this.close();
      }
    });
  }

  freeze(on) {
    this.el.classList.toggle('no-anim', on);
    this.pub.classList.toggle('no-anim', on);
  }

  setAccessible(on) {
    const el = this.el;
    if (on) {
      el.setAttribute('tabindex', '0');
      el.setAttribute('role', 'button');
      el.setAttribute('aria-label', `Show all ${this.n} pages side by side`);
      el.setAttribute('aria-expanded', String(this.isOpen));
    } else {
      ['tabindex', 'role', 'aria-label', 'aria-expanded'].forEach((a) => el.removeAttribute(a));
    }
  }

  /* measure and place the resting pile; called on load and resize */
  layout() {
    const el = this.el;
    this.close(true);
    this.freeze(true);

    if (!wideMQ.matches) {
      el.classList.remove('js', 'can-spread');
      this.pub.classList.remove('can-push');
      this.spreadable = false;
      this.setAccessible(false);
      this.cards.forEach((c) => { c.style.removeProperty('width'); c.style.removeProperty('transform'); });
      afterFrames(() => this.freeze(false));
      return;
    }

    el.classList.add('js');
    const mediaW = this.media.clientWidth;
    const restW = mediaW - 20;
    const rowW = this.pub.clientWidth;
    // same size as resting pages; only shrink if they would not fit in the row
    const spreadCardW = Math.min(restW, (rowW - (this.n - 1) * GAP) / this.n);
    this.spreadable = this.n > 1 && spreadCardW >= MIN_W;
    this.restW = restW;
    this.spreadCardW = spreadCardW;
    this.spreadW = this.n * spreadCardW + (this.n - 1) * GAP;

    el.classList.toggle('can-spread', this.spreadable);
    this.pub.classList.toggle('can-push', this.spreadable);
    this.setAccessible(this.spreadable);
    this.pub.style.setProperty('--shift', `${Math.max(0, this.spreadW - mediaW)}px`);
    this.cards.forEach((c) => { c.style.width = `${restW}px`; });
    this.placeResting();
    afterFrames(() => this.freeze(false));
  }

  cardHeight(i) {
    return this.restW * this.ratios[i] + 2;   // + 1px border top and bottom
  }

  placeResting() {
    this.cards.forEach((c, i) => {
      const [px, py, rot] = PEEK[Math.min(i, PEEK.length - 1)];
      const h = this.cardHeight(i);
      c.style.transform = cardTransform(this.restW / 2 + px, h / 2 + py, rot, 1, this.restW, h);
    });
  }

  open() {
    if (!this.spreadable || this.isOpen) return;
    piles.forEach((p) => { if (p !== this) p.close(); });
    this.isOpen = true;

    const w = this.spreadCardW;
    const s = w / this.restW;
    this.cards.forEach((c, i) => {
      const h = this.cardHeight(i);
      c.style.transform = cardTransform(i * (w + GAP) + w / 2, (s * h) / 2, 0, s, this.restW, h);
    });
    this.hit.style.width = `${this.spreadW + 8}px`;
    this.hit.style.height = 'calc(100% + 30px)';
    this.pub.classList.add('is-open');
    this.el.classList.add('is-open');
    this.el.setAttribute('aria-expanded', 'true');
  }

  close(instant = false) {
    clearTimeout(this.openTimer);
    this.openTimer = null;
    clearTimeout(this.closeTimer);
    if (!this.isOpen) return;
    this.isOpen = false;
    if (instant) this.freeze(true);
    this.el.classList.remove('is-open');
    this.pub.classList.remove('is-open');
    if (this.el.hasAttribute('aria-expanded')) this.el.setAttribute('aria-expanded', 'false');
    this.placeResting();
    this.hit.style.width = '';
    this.hit.style.height = '';
    if (instant) afterFrames(() => this.freeze(false));
  }
}

document.querySelectorAll('.stack').forEach((el) => piles.push(new Pile(el)));
piles.forEach((p) => p.layout());

let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => piles.forEach((p) => p.layout()), 120);
});

// a click spreads a pile; on touch screens a second tap folds it back; clicking elsewhere closes it
document.addEventListener('click', (e) => {
  const stackEl = e.target.closest('.stack');
  piles.forEach((p) => { if (p.isOpen && p.el !== stackEl) p.close(); });
  const p = stackEl && stackEl._pile;
  if (!p || !p.spreadable) return;
  const touchLike = lastPointer !== 'mouse' || noHoverMQ.matches;
  if (!p.isOpen) p.open();
  else if (touchLike) p.close();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') piles.forEach((p) => p.close());
});
