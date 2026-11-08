#!/bin/sh
# Extract the game script from the prototype, syntax-check it, and run scripted playthroughs.
cd "$(dirname "$0")"
python3 -c "import re;s=open('../prototype/index.html').read();open('g.js','w').write(re.search(r'<script>(.*)</script>',s,re.S).group(1))"
node --check g.js && echo "syntax ok"
for m in doubter middle lazy; do node sim.js $m; done
rm -f g.js
