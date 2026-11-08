# Commands

## Play the prototype
    open prototype/index.html

## Set the beta secret word
    python3 tools/set_secret.py "<word>"
Case and surrounding spaces are ignored. Marathi words work.

## Test (syntax check, content check of dilemmas.js, scripted playthroughs: doubter, middle, decoy, lazy, and reachability)
    ./tools/test.sh
    GS_WORD="<word>" ./tools/test.sh     # also checks that the right word opens the gate
Expected: doubter, middle and decoy reach the Auditor ending (only doubter gets "audit complete"). lazy stays stuck at the first gate (on purpose). `maxLitBeforeFinal` must stay below 120.

## How often the adaptation fires (for tuning, not a pass/fail test; test.sh removes g.js, so rebuild it first)
    cd tools && python3 -c "import re;p=open('../prototype/index.html').read();open('g.js','w').write(open('../prototype/dilemmas.js').read()+'\n'+re.findall(r'<script>(.*?)</script>',p,re.S)[0])" && node sim.js adaptstats; rm -f g.js; cd ..

## Screenshot the prototype headless (skips the secret word, turns transitions off)
    tools/shot.sh                     # start screen -> shot.png
    tools/shot.sh dog                 # a dilemma by id -> shot.png
    tools/shot.sh dog /tmp/dog.png    # choose the output file
    CHROME=/path/to/chrome tools/shot.sh dog
    WIDTH=390 tools/shot.sh dog       # phone width (headless Chrome's own minimum is 500px, so the page is narrowed instead)

## Check meter colours (dataviz skill validator)
    node <dataviz-skill>/scripts/validate_palette.js "#3987e5,#199e70" --mode dark --surface "#151926"

## Fetch the story text again (session 1)
    curl -sL https://aisiakshare.com/node/9377 -o story.html
    # then strip tags with a small Python snippet -> source/naikeshwar_story_raw.txt
