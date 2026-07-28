import { keyNav } from './base.js';

const activateTab = tab => {
  const tablist = tab.closest('[role="tablist"]');
  if (!tablist) return;
  
  tablist.querySelectorAll('[role="tab"]').forEach(item => {
    const isActive = item === tab;
    const panel = document.getElementById(item.getAttribute('aria-controls'));
    
    item.setAttribute('aria-selected', isActive);
    item.tabIndex = isActive ? 0 : -1;
    if (panel) panel.hidden = !isActive;
  });
};

if (typeof document !== 'undefined') {
  document.addEventListener('click', e => {
    const tab = e.target.closest('[role="tab"]');
    if (tab) activateTab(tab);
  });
  
  document.addEventListener('keydown', e => {
    const tab = e.target.closest('[role="tab"]');
    if (!tab) return;
    
    const wrapper = tab.closest('[role="tablist"]');
    if (!wrapper) return;
    
    const isVertical = wrapper.getAttribute('aria-orientation') === 'vertical';
    const tabs = [...wrapper.querySelectorAll('[role="tab"]')];
    
    const nextIndex = keyNav(e, tabs.indexOf(tab), tabs.length, {
      prevKey: isVertical ? 'ArrowUp' : 'ArrowLeft',
      nextKey: isVertical ? 'ArrowDown' : 'ArrowRight',
      homeEnd: true
    });
    
    if (nextIndex >= 0) {
      tabs[nextIndex].click();
      tabs[nextIndex].focus();
    }
  });
}