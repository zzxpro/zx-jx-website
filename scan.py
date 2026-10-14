import os
import json

root = "./book"
result = {}

for folder in os.listdir(root):
    folder_path = os.path.join(root, folder)
    if os.path.isdir(folder_path):
        pdfs = []
        for f in sorted(os.listdir(folder_path)):
            if f.lower().endswith(".pdf"):
                pdfs.append(f)
        if pdfs:
            result[folder] = pdfs

with open("filelist.json", "w", encoding="utf-8") as f:
    json.dump(result, f, ensure_ascii=False, indent=2)

print("✅ filelist.json generated successfully")
