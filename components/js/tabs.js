import { keyNav } from './base.js';

const updateIndicator = (tablist, activeTab) => {
  let indicator = tablist.querySelector('.tabs-indicator');
  
  if (!indicator) {
    indicator = document.createElement('div');
    indicator.className = 'tabs-indicator';
    tablist.appendChild(indicator);
  }
  
  indicator.style.width = `${activeTab.offsetWidth}px`;
  indicator.style.height = `${activeTab.offsetHeight}px`;
  indicator.style.left = `${activeTab.offsetLeft}px`;
  indicator.style.top = `${activeTab.offsetTop}px`;
};

const activateTab = tab => {
  const tablist = tab.closest('[role="tablist"]');
  
  tablist.querySelectorAll('[role="tab"]').forEach(item => {
    const isActive = item === tab;
    const panel = document.getElementById(item.getAttribute('aria-controls'));
    
    item.setAttribute('aria-selected', isActive);
    item.tabIndex = isActive ? 0 : -1;
    
    if (panel) {
      panel.hidden = !isActive;
    }
    
    if (isActive) {
      updateIndicator(tablist, item);
    }
  });
};

const refreshAllIndicators = () => {
  document.querySelectorAll('[role="tablist"]').forEach(tablist => {
    const activeTab = tablist.querySelector('[aria-selected="true"]');
    if (activeTab) {
      updateIndicator(tablist, activeTab);
    }
  });
};

window.addEventListener('load', refreshAllIndicators);
window.addEventListener('resize', refreshAllIndicators);

const observer = new ResizeObserver(refreshAllIndicators);
observer.observe(document.body);

document.addEventListener('click', e => {
  const tab = e.target.closest('[role="tab"]');
  if (tab) {
    activateTab(tab);
  }
});

document.addEventListener('keydown', e => {
  const tab = e.target.closest('[role="tab"]');
  if (!tab) return;
  
  const tablist = tab.closest('[role="tablist"]');
  const tabs = [...tablist.querySelectorAll('[role="tab"]')];
  const isVertical = tablist.getAttribute('aria-orientation') === 'vertical';
  
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