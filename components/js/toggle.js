const handleLabelClick = e => {
  const label = e.target.closest('label[for]');
  if (!label) return;
  
  const input = document.getElementById(label.htmlFor);
  if (!input || input.type !== 'radio') return;
  
  e.preventDefault();
  input.checked = !input.checked || input.required;
  input.dispatchEvent(new Event('change', { bubbles: true }));
};

const handleRadioKeydown = e => {
  const target = e.target;
  const isUncheckedRadio = e.key === ' ' && target?.type === 'radio' && target.checked && !target.required;
  
  if (isUncheckedRadio) {
    e.preventDefault();
    target.checked = false;
    target.dispatchEvent(new Event('change', { bubbles: true }));
  }
};

if (typeof document !== 'undefined') {
  document.addEventListener('click', handleLabelClick);
  document.addEventListener('keydown', handleRadioKeydown);
}