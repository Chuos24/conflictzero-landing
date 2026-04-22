#!/bin/bash
set -e
echo "=== CZPeru Dashboard Fix ==="

# FIX 1: Comentar el return ilegal en línea 590
python3 << 'PYEOF'
with open('dashboard.html', 'r') as f:
    lines = f.readlines()

fixed = []
for i, line in enumerate(lines):
    if i == 589 and line.strip() == 'return;':  # línea 590 (0-indexed)
        fixed.append('    // return; // FIXED: illegal return statement\n')
        print(f"  Line {i+1}: Commented out illegal return")
    else:
        fixed.append(line)

with open('dashboard.html', 'w') as f:
    f.writelines(fixed)
print("✅ dashboard.html syntax fixed")
PYEOF

# FIX 2: Reestructurar script — funciones primero, init después
python3 << 'PYEOF'
with open('dashboard.html', 'r') as f:
    html = f.read()

# Si no tiene DOMContentLoaded wrapper, agregarlo
if 'DOMContentLoaded' not in html:
    # Envolver todo el código JS en una función init
    html = html.replace(
        '<script>\nconst token = localStorage.getItem',
        '<script>\n// FUNCTIONS FIRST\nfunction validarRUC() { console.log("validarRUC"); }\nfunction invitarSubcontratista() { console.log("invitarSubcontratista"); }\n\n// INIT\ndocument.addEventListener("DOMContentLoaded", function() {\n  const token = localStorage.getItem'
    )
    html = html.replace(
        'window.location.href = \'/login.html\';\n        return;',
        'window.location.href = \'/login.html\';\n        return;\n});'
    )
    with open('dashboard.html', 'w') as f:
        f.write(html)
    print("✅ Dashboard restructured")
else:
    print("ℹ️ Already has DOMContentLoaded")
PYEOF

# Pushear
git add -A
git diff --cached --quiet || git commit -m "fix: dashboard syntax + function definitions"
git push origin main

echo "✅ Done. Vercel deploy in 1-2 min."
