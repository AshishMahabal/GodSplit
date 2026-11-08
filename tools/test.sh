#!/bin/sh
# Syntax-check the game, validate the dilemma content, and run scripted playthroughs.
# Set GS_WORD="<secret word>" to also check that the right word opens the gate.
cd "$(dirname "$0")"
python3 -c "
import re
page=open('../prototype/index.html').read()
inline=re.findall(r'<script>(.*?)</script>',page,re.S)[0]
open('g.js','w').write(open('../prototype/dilemmas.js').read()+'\n'+inline)"
node --check g.js && echo "syntax ok"
node validate.js
for m in doubter middle decoy lazy; do node sim.js $m; done
node sim.js reach
rm -f g.js
