/* =========================================================
   Aurora Auth — Interaction Layer
   ========================================================= */

(() => {
  'use strict';

  const container   = document.getElementById('container');
  const signUpLink  = document.querySelector('.SignUpLink');
  const signInLink  = document.querySelector('.SignInLink');

  /* ---------- Form switching ---------- */
  const showRegister = (e) => {
    e?.preventDefault();
    container.classList.add('active');
  };
  const showLogin = (e) => {
    e?.preventDefault();
    container.classList.remove('active');
  };

  signUpLink?.addEventListener('click', showRegister);
  signInLink?.addEventListener('click', showLogin);

  /* Keyboard shortcut: Ctrl/Cmd + K toggles forms */
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      container.classList.toggle('active');
    }
  });

  /* ---------- Form submit (demo only) ---------- */
  document.querySelectorAll('.auth-form').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('.btn');
      if (!btn) return;
      const original = btn.innerHTML;
      btn.innerHTML = '<span>Please wait\u2026</span>';
      btn.style.pointerEvents = 'none';
      setTimeout(() => {
        btn.innerHTML = '<span>Success</span>';
        setTimeout(() => {
          btn.innerHTML = original;
          btn.style.pointerEvents = 'auto';
          form.reset();
          /* Reset strength bar on form reset */
          const fill = document.getElementById('strengthFill');
          const label = document.getElementById('strengthLabel');
          if (fill) fill.style.width = '0%';
          if (label) {
            label.textContent = 'Password strength';
            label.style.color = '';
          }
        }, 1400);
      }, 1100);
    });
  });

  /* ---------- Password strength ---------- */
  const regPass = document.getElementById('regPass');
  const fill    = document.getElementById('strengthFill');
  const label   = document.getElementById('strengthLabel');

  const strengthMeta = [
    { txt: 'Too weak',    color: '#ff5577', w: 20  },
    { txt: 'Weak',        color: '#ff9b3d', w: 40  },
    { txt: 'Okay',        color: '#ffd23d', w: 60  },
    { txt: 'Strong',      color: '#5cf5b0', w: 80  },
    { txt: 'Very strong', color: '#00eaff', w: 100 },
  ];

  regPass?.addEventListener('input', () => {
    const v = regPass.value;
    let score = 0;

    if (v.length >= 6)  score++;
    if (v.length >= 10) score++;
    if (/[A-Z]/.test(v) && /[a-z]/.test(v)) score++;
    if (/\d/.test(v))           score++;
    if (/[^A-Za-z0-9]/.test(v)) score++;

    score = Math.min(score, 5);

    if (!v) {
      fill.style.width = '0%';
      fill.style.background = '';
      fill.style.filter = '';
      label.textContent = 'Password strength';
      label.style.color = '';
      return;
    }

    const meta = strengthMeta[score - 1] || strengthMeta[0];

    fill.style.width      = meta.w + '%';
    fill.style.background = meta.color;
    fill.style.filter     = `drop-shadow(0 0 8px ${meta.color})`;

    label.textContent  = meta.txt;
    label.style.color  = meta.color;
  });

  /* ---------- Floating particles ---------- */
  const particlesEl = document.getElementById('particles');
  if (particlesEl) {
    const COUNT = window.matchMedia('(max-width: 600px)').matches ? 18 : 38;
    for (let i = 0; i < COUNT; i++) {
      const p = document.createElement('span');
      p.className = 'particle';
      const size = (Math.random() * 3 + 1).toFixed(2);
      p.style.width  = `${size}px`;
      p.style.height = `${size}px`;
      p.style.left   = `${Math.random() * 100}%`;
      p.style.top    = `${100 + Math.random() * 20}%`;
      p.style.opacity = (Math.random() * 0.5 + 0.2).toFixed(2);
      p.style.animationDuration = `${(Math.random() * 18 + 14).toFixed(1)}s`;
      p.style.animationDelay    = `${(Math.random() * -20).toFixed(1)}s`;
      particlesEl.appendChild(p);
    }
  }

  /* ---------- Pointer-reactive glow on container ---------- */
  if (container && !window.matchMedia('(hover: none)').matches) {
    container.addEventListener('pointermove', (e) => {
      const r = container.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width)  * 100;
      const y = ((e.clientY - r.top)  / r.height) * 100;
      container.style.background = `
        radial-gradient(600px circle at ${x}% ${y}%,
          rgba(124,77,255,0.18),
          rgba(18,22,45,0.55) 40%)
      `;
    });
    container.addEventListener('pointerleave', () => {
      container.style.background = '';
    });
  }
})();