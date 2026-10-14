// 自动渲染 PDF 链接
// 全局变量保存文件清单
let fileListData = null;

// 加载json
async function loadFileList() {
  try {
    const res = await fetch("filelist.json");
    fileListData = await res.json();
  } catch (err) {
    console.error("加载文件列表失败", err);
  }
}

// 渲染指定模块PDF列表
async function renderPdfList(moduleName, containerSelector) {
  await loadFileList();
  const container = document.querySelector(containerSelector);
  if (!container || !fileListData || !fileListData[moduleName]) return;

  const baseUrl = "https://pdf.zx-jx.top/book/" + moduleName + "/";
  let html = "";
  fileListData[moduleName].forEach(filename => {
    html += `
<div class="file-item">
  <span>📄</span>
  <a target="_blank" href="${baseUrl}${filename}">${filename}</a>
</div>
`;
  });
  container.innerHTML = html;
}
