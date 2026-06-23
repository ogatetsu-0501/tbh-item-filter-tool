from __future__ import annotations

import json
from pathlib import Path

# ============================================================
# dataフォルダ内のJSONを、ブラウザで直接読めるdata.jsへ変換します。
# ============================================================
project_dir = Path(__file__).resolve().parent
data_dir = project_dir / "data"

payload = {
    "meta": json.loads((data_dir / "meta.json").read_text(encoding="utf-8")),
    "ja": json.loads((data_dir / "ja.json").read_text(encoding="utf-8")),
    "items": json.loads((data_dir / "items.json").read_text(encoding="utf-8")),
}

output = "window.TBH_DATA=" + json.dumps(
    payload,
    ensure_ascii=False,
    separators=(",", ":"),
) + ";\n"

(project_dir / "data.js").write_text(output, encoding="utf-8")
print("data.jsを更新しました。")
