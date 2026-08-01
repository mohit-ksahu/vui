if (typeof document !== 'undefined') {
  let closeTimeout = null;

  const hideActivePopovers = (container) => {
    const root = container || document;
    const activePopovers = root.querySelectorAll('.nav-menu-content[popover]:popover-open');
    activePopovers.forEach(popover => popover.hidePopover());
  };

  document.addEventListener('mouseover', event => {
    const trigger = event.target.closest('.nav-menu-trigger');
    const popoverContent = event.target.closest('.nav-menu-content[popover]');

    if (popoverContent) {
      if (closeTimeout) clearTimeout(closeTimeout);
      return;
    }

    if (!trigger) return;

    if (closeTimeout) clearTimeout(closeTimeout);

    const nav = trigger.closest('.nav-menu');
    const targetId = trigger.getAttribute('popovertarget');
    const targetPopover = targetId ? document.getElementById(targetId) : null;

    hideActivePopovers(nav);

    if (targetPopover && !targetPopover.matches(':popover-open')) {
      targetPopover.showPopover();
    }
  });

  document.addEventListener('mouseout', event => {
    const destination = event.relatedTarget;
    const isStayingInMenu = destination?.closest('.nav-menu, .nav-menu-content[popover]');

    if (!isStayingInMenu) {
      if (closeTimeout) clearTimeout(closeTimeout);
      closeTimeout = setTimeout(() => {
        hideActivePopovers();
      }, 150);
    }
  });
}