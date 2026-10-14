import os
import json
import subprocess

# PDF仓库地址
DOC_REPO_URL = "https://github.com/zzxpro/zx-docs-fille.git"
CLONE_TMP_DIR = "./tmp_docs_repo"

# 清理上次临时目录
if os.path.exists(CLONE_TMP_DIR):
    subprocess.run(["rm", "-rf", CLONE_TMP_DIR])

print(f"🔄 Cloning {DOC_REPO_URL} ...")
# --depth 1 只拉取最新commit，加速构建
subprocess.run(["git", "clone", "--depth", "1", DOC_REPO_URL, CLONE_TMP_DIR], check=True)

book_root = os.path.join(CLONE_TMP_DIR, "book")
result = {}

# 遍历book下所有子文件夹
for folder in os.listdir(book_root):
    folder_path = os.path.join(book_root, folder)
    if os.path.isdir(folder_path):
        pdf_files = []
        for filename in sorted(os.listdir(folder_path)):
            if filename.lower().endswith(".pdf"):
                pdf_files.append(filename)
        if pdf_files:
            result[folder] = pdf_files

# 生成清单文件，输出到网站根目录
with open("filelist.json", "w", encoding="utf-8") as f:
    json.dump(result, f, ensure_ascii=False, indent=2)

print("✅ filelist.json generated successfully")
