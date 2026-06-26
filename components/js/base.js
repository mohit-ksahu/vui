export function keyNav(e, idx, len, { prevKey, nextKey, homeEnd = false }) {
  const { key } = e;
  let next = -1;

  if (key === nextKey) next = (idx + 1) % len;
  else if (key === prevKey) next = (idx - 1 + len) % len;
  else if (homeEnd && key === 'Home') next = 0;
  else if (homeEnd && key === 'End') next = len - 1;

  if (next >= 0) e.preventDefault();
  return next;
}

const resolveDialogCommand = (target, command) => {
  if (command === 'show-modal') return 'showModal';
  if (command === 'close') return 'close';
  return target.open ? 'close' : 'showModal';
};

document.addEventListener('click', e => {
  const btn = e.target.closest('button[commandfor]');
  if (!btn) return;

  const target = document.getElementById(btn.getAttribute('commandfor'));
  if (!target) return;

  const command = btn.getAttribute('command') || 'toggle';

  if (target instanceof HTMLDialogElement) {
    const action = resolveDialogCommand(target, command);
    if (action === 'showModal' && !target.open) {
      target.showModal();
      e.preventDefault();
    } else if (action === 'close' && target.open) {
      target.close();
      e.preventDefault();
    }
  } else if (target.hasAttribute('popover')) {
    const method = command === 'hide-popover' || command === 'close' ? 'hidePopover'
      : command === 'show-popover' ? 'showPopover'
      : target.matches(':popover-open') ? 'hidePopover' : 'showPopover';

    const isVisible = target.matches(':popover-open');
    if (method === 'showPopover' && !isVisible) {
      target.showPopover();
      e.preventDefault();
    } else if (method === 'hidePopover' && isVisible) {
      target.hidePopover();
      e.preventDefault();
    }
  }
});