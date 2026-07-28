import { keyNav } from './base.js';

const filterPopover = (popover, searchValue) => {
  let hasVisibleItems = false;
  
  popover.querySelectorAll('.combobox-item').forEach(item => {
    const isVisible = item.textContent.toLowerCase().includes(searchValue);
    item.classList.toggle('hidden', !isVisible);
    if (isVisible) hasVisibleItems = true;
  });
  
  popover.querySelectorAll('.combobox-group').forEach(group => {
    const hasVisibleChild = group.querySelector('.combobox-item:not(.hidden)');
    group.classList.toggle('hidden', !hasVisibleChild);
  });
  
  const emptyState = popover.querySelector('.combobox-empty');
  if (emptyState) {
    emptyState.style.display = hasVisibleItems ? 'none' : 'block';
  }
};

const getPopover = id => document.getElementById(id);

const openInlinePopover = group => {
  const input = group.querySelector('.input');
  const popover = input ? getPopover(input.getAttribute('data-popover-target')) : null;
  
  if (popover && !popover.matches(':popover-open')) {
    popover.showPopover();
    filterPopover(popover, '');
  }
};

const updateTriggerLabel = (popover, label) => {
  const triggerBtn = document.querySelector(`button[popovertarget="${popover.id}"] .combobox-value`);
  if (triggerBtn) triggerBtn.textContent = label;
  
  const inputGroup = document.querySelector(`.combobox-input-trigger:has(input[data-popover-target="${popover.id}"])`);
  const inlineInput = inputGroup?.querySelector('.input');
  
  if (inlineInput) {
    inlineInput.value = label;
    inlineInput.dispatchEvent(new Event('input', { bubbles: true }));
  }
};

const handleItemClick = target => {
  const item = target.closest('.combobox-item');
  const popover = item?.closest('.combobox-popover');
  if (!popover) return;
  
  popover.querySelector('[data-selected]')?.removeAttribute('data-selected');
  item.setAttribute('data-selected', 'true');
  updateTriggerLabel(popover, item.dataset.label || item.textContent.trim());
  
  if (typeof popover.hidePopover === 'function') {
    popover.hidePopover();
  }
};

const handleKeydown = e => {
  const popover = e.target.closest('.combobox-popover') || getPopover(e.target.getAttribute('data-popover-target'));
  if (!popover || !popover.matches(':popover-open')) return;
  
  const items = [...popover.querySelectorAll('.combobox-item:not(.hidden)')];
  const currentIndex = items.indexOf(document.activeElement);
  if (!items.length) return;
  
  if (['ArrowDown', 'ArrowUp'].includes(e.key)) {
    const nextIndex = keyNav(e, currentIndex, items.length, { prevKey: 'ArrowUp', nextKey: 'ArrowDown', homeEnd: true });
    if (nextIndex >= 0) items[nextIndex].focus();
  } else if (e.key === 'Enter' && currentIndex >= 0) {
    e.preventDefault();
    handleItemClick(document.activeElement);
  }
};

if (typeof document !== 'undefined') {
  document.addEventListener('input', e => {
    const target = e.target;
    if (target.matches('.combobox-input')) {
      const popover = target.closest('.combobox-popover');
      if (popover) filterPopover(popover, target.value.toLowerCase());
    } else if (target.matches('.input') && target.closest('.combobox-input-trigger')) {
      const popover = getPopover(target.getAttribute('data-popover-target'));
      if (!popover) return;
      
      if (!popover.matches(':popover-open')) popover.showPopover();
      filterPopover(popover, target.value.toLowerCase());
      
      if (target.value === '') {
        popover.querySelector('[data-selected]')?.removeAttribute('data-selected');
      }
    }
  });

  document.addEventListener('focusin', e => {
    const group = e.target.closest('.combobox-input-trigger');
    if (group && e.target.matches('.input')) openInlinePopover(group);
  });
  
  document.addEventListener('click', e => {
    const group = e.target.closest('.combobox-input-trigger');
    if (group) {
      openInlinePopover(group);
    } else {
      handleItemClick(e.target);
    }
  });
  
  document.addEventListener('keydown', handleKeydown);
  
  document.addEventListener('toggle', e => {
    if (e.newState !== 'open' || !e.target.classList?.contains('combobox-popover')) return;
    
    const searchInput = e.target.querySelector('.combobox-input');
    if (searchInput) {
      searchInput.value = '';
      searchInput.dispatchEvent(new Event('input', { bubbles: true }));
      searchInput.focus();
    }
  }, { capture: true });
}