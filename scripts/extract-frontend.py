# -*- coding: utf-8 -*-
"""Extract CSS/JS modules from the one-file HTML app."""
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
HTML = ROOT / "baza-wiedzy-produkcyjnej.html"
PUBLIC = ROOT / "public"
text = HTML.read_text(encoding="utf-8")
lines = text.splitlines(keepends=True)

def write(rel, content):
    path = ROOT / rel
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content, encoding="utf-8")
    print(f"wrote {rel} ({len(content)} chars)")

# CSS: lines 8-548 are inside <style> (1-indexed)
css = "".join(lines[7:548])
write("public/css/app.css", css)

# SheetJS: first <script> after </style>
# Find the two script blocks after body start
scripts = []
i = 0
while i < len(lines):
    if lines[i].strip() == "<script>":
        start = i + 1
        i += 1
        while i < len(lines) and lines[i].strip() != "</script>":
            i += 1
        scripts.append("".join(lines[start:i]))
    i += 1

if len(scripts) < 2:
    raise SystemExit(f"expected 2 script blocks, got {len(scripts)}")

write("public/vendor/xlsx.full.min.js", scripts[0])

app_js = scripts[1]
markers = [
    ("js/storage.js", "/* ===== js/storage.js ===== */"),
    ("js/state.js", "/* ===== js/state.js ===== */"),
    ("js/backup.js", "/* ===== js/backup.js ===== */"),
    ("js/ui.js", "/* ===== js/ui.js ===== */"),
    ("js/render.js", "/* ===== js/render.js ===== */"),
    ("js/handlers.js", "/* ===== js/handlers.js ===== */"),
    ("js/app.js", "/* ===== js/app.js ===== */"),
]
positions = []
for name, marker in markers:
    pos = app_js.find(marker)
    if pos < 0:
        raise SystemExit(f"missing marker {marker}")
    positions.append((pos, name, marker))
positions.sort()

for idx, (pos, name, marker) in enumerate(positions):
    end = positions[idx + 1][0] if idx + 1 < len(positions) else len(app_js)
    write(f"public/{name}", app_js[pos:end].rstrip() + "\n")

print("extraction done")
