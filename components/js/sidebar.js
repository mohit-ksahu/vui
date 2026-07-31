const mobileQuery = typeof window !== 'undefined' ? window.matchMedia('(max-width: 768px)') : null;
const initialized = new WeakSet();

const getProviders = () => Array.from(document.querySelectorAll('.sidebar-provider'));

const syncAria = (p) => {
  const open = p.dataset.state === 'open';
  p.querySelectorAll('.sidebar-trigger').forEach(t => t.setAttribute('aria-expanded', open ? 'true' : 'false'));
};

const init = (p) => {
  if (initialized.has(p)) return;
  initialized.add(p);
  const mobile = mobileQuery?.matches;
  p.dataset.desktopState ||= mobile ? 'open' : (p.dataset.state || 'open');
  if (mobile) p.dataset.state = 'closed';
  syncAria(p);
};

const animate = (s) => {
  if (!s) return;
  s.classList.add('is-animating');
  s.addEventListener('transitionend', () => s.classList.remove('is-animating'), { once: true });
};

if (typeof document !== 'undefined') {
  const runInit = () => getProviders().forEach(init);
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', runInit) : runInit();

  if (typeof MutationObserver !== 'undefined') {
    new MutationObserver(m => {
      m.forEach(r => r.addedNodes.forEach(n => {
        if (n.nodeType === 1) {
          if (n.classList?.contains('sidebar-provider')) init(n);
          n.querySelectorAll?.('.sidebar-provider')?.forEach(init);
        }
      }));
    }).observe(document.body, { childList: true, subtree: true });
  }

  mobileQuery?.addEventListener('change', e => {
    requestAnimationFrame(() => {
      getProviders().forEach(p => {
        if (e.matches) {
          if (p.dataset.state) p.dataset.desktopState = p.dataset.state;
          p.dataset.state = 'closed';
        } else {
          p.dataset.state = p.dataset.desktopState || 'open';
        }
        syncAria(p);
      });
    });
  });

  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape' || !mobileQuery?.matches) return;
    getProviders().filter(p => p.dataset.state === 'open').forEach(p => {
      animate(p.querySelector('.sidebar'));
      requestAnimationFrame(() => {
        p.dataset.state = 'closed';
        syncAria(p);
        p.querySelector('.sidebar-trigger')?.focus();
      });
    });
  });

  document.addEventListener('click', e => {
    const trigger = e.target.closest('.sidebar-trigger');
    const p = e.target.closest('.sidebar-provider');
    if (!p) return;
    const mobile = mobileQuery?.matches;

    if (trigger) {
      const s = p.querySelector('.sidebar');
      if (!s || s.getAttribute('data-collapsible') !== 'none' || mobile) {
        const next = (p.dataset.state || 'open') === 'open' ? 'closed' : 'open';
        animate(s);
        requestAnimationFrame(() => {
          p.dataset.state = next;
          if (!mobile) p.dataset.desktopState = next;
          syncAria(p);
        });
      }
    } else if (mobile && p.dataset.state === 'open') {
      if (e.target === p || e.target.closest('a[href], .sidebar-menu-button:not(summary)')) {
        animate(p.querySelector('.sidebar'));
        requestAnimationFrame(() => {
          p.dataset.state = 'closed';
          syncAria(p);
        });
      }
    }
  });
}