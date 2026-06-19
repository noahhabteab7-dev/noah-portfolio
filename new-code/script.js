/* ============================================================
   GRAIN / FILM NOISE
   ============================================================ */
(function () {
  const c = document.getElementById('grain');
  if (!c) return;
  const ctx = c.getContext('2d');

  function resize() { c.width = window.innerWidth; c.height = window.innerHeight; }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  function tick() {
    const { width: w, height: h } = c;
    const img = ctx.createImageData(w, h);
    const d   = img.data;
    for (let i = 0; i < d.length; i += 4) {
      const v = Math.random() * 255 | 0;
      d[i] = d[i+1] = d[i+2] = v; d[i+3] = 255;
    }
    ctx.putImageData(img, 0, 0);
    requestAnimationFrame(tick);
  }
  tick();
})();

/* ============================================================
   PRELOADER
   ============================================================ */
(function () {
  const pl  = document.getElementById('preloader');
  const bar = document.getElementById('pl-fill');
  const num = document.getElementById('pl-num');
  if (!pl) return;
  document.body.style.overflow = 'hidden';

  let v = 0;
  const iv = setInterval(() => {
    v += Math.random() * 16;
    if (v >= 100) { v = 100; clearInterval(iv); done(); }
    bar.style.width = v + '%';
    num.childNodes[0].textContent = Math.round(v);
  }, 70);

  function done() {
    setTimeout(() => {
      pl.classList.add('gone');
      document.body.style.overflow = '';
    }, 350);
  }
})();

/* ============================================================
   NAV
   ============================================================ */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 24);
}, { passive: true });

/* ============================================================
   MOBILE NAV
   ============================================================ */
const burger  = document.getElementById('burger');
const mobNav  = document.getElementById('mob-nav');
burger.addEventListener('click', () => {
  const open = burger.classList.toggle('open');
  mobNav.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
});
mobNav.querySelectorAll('.mob-a').forEach(a => {
  a.addEventListener('click', () => {
    burger.classList.remove('open');
    mobNav.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ============================================================
   HERO PHOTO PARALLAX
   ============================================================ */
(function () {
  const frame = document.getElementById('hero-frame');
  const img   = document.getElementById('hero-img');
  if (!frame || !img) return;
  window.addEventListener('mousemove', e => {
    const nx = (e.clientX / window.innerWidth  - .5) * 2;
    const ny = (e.clientY / window.innerHeight - .5) * 2;
    img.style.transform = `translate(${nx * -10}px, ${ny * -10}px) scale(1.06)`;
  });
})();

/* ============================================================
   3D TILT
   ============================================================ */
document.querySelectorAll('.tilt').forEach(el => {
  el.addEventListener('mousemove', e => {
    const r  = el.getBoundingClientRect();
    const x  = (e.clientX - r.left) / r.width  - .5;
    const y  = (e.clientY - r.top)  / r.height - .5;
    el.style.transform = `perspective(800px) rotateX(${y * -7}deg) rotateY(${x * 7}deg) scale3d(1.01,1.01,1.01)`;
    el.style.transition = 'transform .08s linear';
  });
  el.addEventListener('mouseleave', () => {
    el.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale3d(1,1,1)';
    el.style.transition = 'transform .6s cubic-bezier(.25,.46,.45,.94)';
  });
});


/* ============================================================
   INTERSECTION OBSERVER — REVEAL + SIDE EFFECTS
   ============================================================ */
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('in');

    // Trigger skill bars inside this element
    entry.target.querySelectorAll('.sk-f').forEach(f => {
      f.style.width = f.dataset.w + '%';
    });
    entry.target.querySelectorAll('.sk-val').forEach(v => {
      animCount(v, parseInt(v.dataset.v), '%');
    });
    // Stats bar counters
    entry.target.querySelectorAll('.sb-n').forEach(n => {
      animCount(n, parseInt(n.dataset.t), '+');
    });
    // About stats
    entry.target.querySelectorAll('.a-stat-n').forEach(n => {
      animCount(n, parseInt(n.dataset.t), '');
    });

    io.unobserve(entry.target);
  });
}, { threshold: .14, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.rv').forEach(el => io.observe(el));

// Also observe skill cols independently
new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.querySelectorAll('.sk-f').forEach(f => {
      f.style.width = f.dataset.w + '%';
    });
    entry.target.querySelectorAll('.sk-val').forEach(v => {
      animCount(v, parseInt(v.dataset.v), '%');
    });
  });
}, { threshold: .3 }).observe(
  document.getElementById('skills') || document.body
);

// Stats bar
new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.querySelectorAll('.sb-n').forEach(n => {
      animCount(n, parseInt(n.dataset.t), '+');
    });
  });
}, { threshold: .5 }).observe(
  document.querySelector('.stats-bar') || document.body
);

function animCount(el, target, suffix) {
  const dur = 1500, start = performance.now();
  function step(now) {
    const p = Math.min((now - start) / dur, 1);
    const e = 1 - Math.pow(1 - p, 3);
    const v = Math.round(e * target);
    // For sk-val keep suffix display via CSS ::after, so just set number
    if (suffix === '%') { el.textContent = v; }
    else el.textContent = v;
    if (p < 1) requestAnimationFrame(step);
    else el.textContent = target;
  }
  requestAnimationFrame(step);
}

/* ============================================================
   PORTFOLIO FILTER
   ============================================================ */
document.querySelectorAll('.pf-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.pf-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.f;
    document.querySelectorAll('.mc').forEach(card => {
      const show = f === 'all' || card.dataset.c === f;
      card.classList.toggle('hidden', !show);
    });
  });
});

/* ============================================================
   CONTACT FORM
   ============================================================ */
(function () {
  const form = document.getElementById('cf');
  const ok   = document.getElementById('cf-ok');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = form.querySelector('#cf-name').value.trim();
    const mail = form.querySelector('#cf-email').value.trim();
    const msg  = form.querySelector('#cf-msg').value.trim();
    if (!name || !mail || !msg) {
      if (!name) flash(form.querySelector('#cf-name'));
      if (!mail) flash(form.querySelector('#cf-email'));
      if (!msg)  flash(form.querySelector('#cf-msg'));
      return;
    }
    const btn = form.querySelector('.cf-submit');
    btn.disabled = true;
    btn.firstChild.textContent = 'Wird gesendet…';
    setTimeout(() => {
      form.reset();
      btn.disabled = false;
      btn.firstChild.textContent = 'Nachricht senden';
      ok.classList.add('show');
      setTimeout(() => ok.classList.remove('show'), 5000);
    }, 1100);
  });

  function flash(el) {
    el.style.borderColor = '#d63a2f';
    setTimeout(() => { el.style.borderColor = ''; }, 2000);
  }
})();

/* ============================================================
   ACTIVE NAV SECTION HIGHLIGHT
   ============================================================ */
(function () {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a[href^="#"]');
  const io2 = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      links.forEach(a => {
        a.style.color = a.getAttribute('href') === '#' + e.target.id
          ? 'var(--white)' : '';
      });
    });
  }, { threshold: .4 });
  sections.forEach(s => io2.observe(s));
})();

/* ============================================================
   FOOTER NAME PARALLAX (scroll-driven)
   ============================================================ */
(function () {
  const name = document.querySelector('.footer-name');
  if (!name) return;
  window.addEventListener('scroll', () => {
    const rect = name.parentElement.getBoundingClientRect();
    if (rect.top > window.innerHeight || rect.bottom < 0) return;
    const pct = 1 - rect.bottom / (window.innerHeight + rect.height);
    name.style.transform = `translateX(${pct * -4}%)`;
  }, { passive: true });
})();

/* ============================================================
   LIGHTBOX
   ============================================================ */
(function () {
  const lb        = document.getElementById('lightbox');
  const lbImg     = document.getElementById('lb-img');
  const lbVideo   = document.getElementById('lb-video');
  const lbIframe  = document.getElementById('lb-iframe');
  const lbCap     = document.getElementById('lb-caption');
  const lbDesc    = document.getElementById('lb-desc');
  const lbClose   = document.getElementById('lb-close');
  if (!lb) return;

  function hideAll() {
    lbImg.style.display = 'none'; lbImg.src = '';
    lbVideo.style.display = 'none'; lbVideo.pause(); lbVideo.src = '';
    lbIframe.style.display = 'none'; lbIframe.src = '';
  }

  function showImg(src, caption, desc, id) {
    hideAll();
    lbImg.src = src;
    lbImg.style.display = '';
    lbCap.textContent = caption || '';
    lbDesc.textContent = desc || '';
    openLb(id);
  }

  function showVideo(src, caption, desc, id) {
    hideAll();
    lbVideo.src = src;
    lbVideo.style.display = '';
    lbCap.textContent = caption || '';
    lbDesc.textContent = desc || '';
    openLb(id);
    lbVideo.play();
  }

  function showYoutube(ytId, caption, desc, id, aspect) {
    hideAll();
    lbIframe.src = 'https://www.youtube.com/embed/' + ytId + '?autoplay=1&rel=0';
    lbIframe.style.aspectRatio = aspect || '16/9';
    lbIframe.style.width = (aspect === '9/16') ? '38vw' : '60vw';
    lbIframe.style.display = '';
    lbCap.textContent = caption || '';
    lbDesc.textContent = desc || '';
    openLb(id);
  }

  // Poster / design cards
  document.querySelectorAll('.dsgn-card').forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('.dc-vis img');
      if (!img) return;
      const title = card.querySelector('.dc-title') ? card.querySelector('.dc-title').textContent : '';
      showImg(img.src, title, card.dataset.desc || '', card.dataset.id);
    });
  });

  // Photo cards in mosaic
  document.querySelectorAll('.mc[data-c="foto"]').forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('.mc-img img');
      if (!img) return;
      const title = card.querySelector('h3') ? card.querySelector('h3').textContent : '';
      showImg(img.src, title, card.dataset.desc || '', card.dataset.id);
    });
  });

  // Video cards in mosaic
  document.querySelectorAll('.mc[data-c="video"]').forEach(card => {
    card.addEventListener('click', () => {
      const title = card.querySelector('h3') ? card.querySelector('h3').textContent : '';
      if (card.dataset.ytUrl) {
        window.open(card.dataset.ytUrl, '_blank', 'noopener');
      } else if (card.dataset.youtube) {
        showYoutube(card.dataset.youtube, title, card.dataset.desc || '', card.dataset.id, card.dataset.aspect);
      } else if (card.dataset.video) {
        showVideo(card.dataset.video, title, card.dataset.desc || '', card.dataset.id);
      }
    });
  });

  // Slideshow images
  document.querySelectorAll('.ps-item img').forEach(img => {
    img.addEventListener('click', () => {
      const item = img.closest('.ps-item');
      showImg(img.src, item ? item.dataset.title || '' : '', item ? item.dataset.desc || '' : '', item ? item.dataset.id || '' : '');
    });
  });

  function openLb(id) {
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (window._psCtrl) window._psCtrl.pause();
    if (id) history.replaceState(null, '', '#' + id);
  }

  function closeLb() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
    lbVideo.pause(); lbVideo.src = '';
    lbIframe.src = '';
    if (window._psCtrl) window._psCtrl.resume();
    history.replaceState(null, '', window.location.pathname);
  }

  lbClose.addEventListener('click', closeLb);
  lb.addEventListener('click', e => { if (e.target === lb) closeLb(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLb(); });

  // Deep link: open project from URL hash on page load
  const hash = window.location.hash.replace('#', '');
  if (hash) {
    const target = document.querySelector('[data-id="' + hash + '"]');
    if (target) setTimeout(() => target.click(), 600);
  }
})();

/* ============================================================
   PHOTO SCROLL CONTROLLER (JS-driven, prev/next)
   ============================================================ */
(function () {
  const track   = document.getElementById('ps-track');
  const prevBtn = document.getElementById('ps-prev');
  const nextBtn = document.getElementById('ps-next');
  const wrap    = document.querySelector('.photo-scroll');
  if (!track || !prevBtn) return;

  const ITEM_W = 486; // 480px width + 6px gap
  let pos      = 0;
  let auto     = true;
  let lastT    = null;
  const SPEED  = 0.22; // px per ms

  function tick(t) {
    if (auto) {
      const dt = lastT !== null ? t - lastT : 0;
      pos += dt * SPEED;
      const hw = track.scrollWidth / 2;
      if (pos >= hw) pos -= hw;
      track.style.transform = `translateX(${-pos}px)`;
    }
    lastT = t;
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  // Expose pause/resume for lightbox
  window._psCtrl = {
    pause:  () => { auto = false; lastT = null; },
    resume: () => { auto = true; }
  };

  // Hover pauses
  wrap.addEventListener('mouseenter', () => { auto = false; lastT = null; });
  wrap.addEventListener('mouseleave', () => { auto = true; });

  function jumpNext() {
    auto = false; lastT = null;
    track.style.transition = 'transform .55s cubic-bezier(.25,.46,.45,.94)';
    pos += ITEM_W;
    track.style.transform = `translateX(${-pos}px)`;
    setTimeout(() => {
      track.style.transition = '';
      const hw = track.scrollWidth / 2;
      if (pos >= hw) { pos -= hw; track.style.transform = `translateX(${-pos}px)`; }
      setTimeout(() => { auto = true; }, 400);
    }, 580);
  }

  function jumpPrev() {
    auto = false; lastT = null;
    const hw = track.scrollWidth / 2;
    if (pos < ITEM_W) {
      // Seamless: jump to equivalent position in second half, then animate back
      pos += hw;
      track.style.transition = 'none';
      track.style.transform = `translateX(${-pos}px)`;
      track.getBoundingClientRect(); // force reflow
    }
    track.style.transition = 'transform .55s cubic-bezier(.25,.46,.45,.94)';
    pos -= ITEM_W;
    track.style.transform = `translateX(${-pos}px)`;
    setTimeout(() => {
      track.style.transition = '';
      setTimeout(() => { auto = true; }, 400);
    }, 580);
  }

  prevBtn.addEventListener('click', jumpPrev);
  nextBtn.addEventListener('click', jumpNext);
})();
