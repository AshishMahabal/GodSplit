#!/bin/sh
# Screenshot the prototype headless, skipping the secret word screen.
# Usage: tools/shot.sh [dilemma-id] [out.png]
#   no id: the start screen.  out.png defaults to shot.png in the current folder.
# Needs Google Chrome (set CHROME to use another path) and Python 3.
# Copyright (C) 2026 Ashish Mahabal. SPDX-License-Identifier: AGPL-3.0-or-later
set -e
cd "$(dirname "$0")/.."
ID="$1"
OUT="${2:-shot.png}"
case "$OUT" in /*) ;; *) OUT="$PWD/$OUT" ;; esac
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"
if [ -n "$ID" ] && ! grep -q "^  $ID: {" prototype/dilemmas.js; then
  echo "no dilemma called '$ID' in prototype/dilemmas.js" >&2; exit 1
fi
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
cp prototype/dilemmas.js "$TMP/"
# Copy the page with transitions off (or bars render empty), the gate skipped, and the dilemma opened.
python3 - "$TMP/index.html" "$ID" <<'EOF'
import sys
out, did = sys.argv[1], sys.argv[2]
s = open("prototype/index.html").read()
s = s.replace("</head>", "<style>*{transition:none!important}</style></head>", 1)
go = f'showDilemma("{did}");' if did else ""
s = s.replace("</body>", f"<script>setTimeout(()=>{{unlock();{go}}},50)</script></body>", 1)
open(out, "w").write(s)
EOF
"$CHROME" --headless=new --window-size=760,1300 --virtual-time-budget=2000 \
  --screenshot="$OUT" "file://$TMP/index.html" 2>/dev/null
echo "$OUT"
