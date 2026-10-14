function toggle(el) {
  const child = el.nextElementSibling;
  if(child) {
    child.style.display = child.style.display === 'none' ? 'block' : 'none';
  }
}
