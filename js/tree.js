// 读取本地存储的折叠状态
function loadTreeState() {
  const saved = localStorage.getItem("treeState");
  return saved ? JSON.parse(saved) : {};
}
// 保存折叠状态
function saveTreeState(state) {
  localStorage.setItem("treeState", JSON.stringify(state));
}

const treeState = loadTreeState();

function toggle(el) {
  const child = el.nextElementSibling;
  if (!child) return;

  const key = el.textContent.trim();
  child.style.display = child.style.display === 'none' ? 'block' : 'none';
  treeState[key] = child.style.display;
  saveTreeState(treeState);
}

// 页面加载完成自动恢复所有目录折叠状态
window.addEventListener('DOMContentLoaded', () => {
  const toggles = document.querySelectorAll('.tree-toggle');
  toggles.forEach(el => {
    const key = el.textContent.trim();
    const child = el.nextElementSibling;
    if (treeState[key] && child) {
      child.style.display = treeState[key];
    }
  })
})
