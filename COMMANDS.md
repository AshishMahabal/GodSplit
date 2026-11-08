# Commands

## Play the prototype
    open prototype/index.html

## Test (syntax check plus scripted playthroughs: doubter, middle, decoy, lazy)
    ./tools/test.sh
Expected: doubter, middle and decoy reach the Auditor ending (only doubter gets "audit complete"). lazy stays stuck at the first gate (on purpose). `maxLitBeforeFinal` must stay below 120.

## Screenshot the prototype headless (transitions must be turned off, or bars render empty)
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --window-size=760,1100 --screenshot=shot.png file://$PWD/prototype/index.html

## Check meter colours (dataviz skill validator)
    node <dataviz-skill>/scripts/validate_palette.js "#3987e5,#199e70" --mode dark --surface "#151926"

## Fetch the story text again (session 1)
    curl -sL https://aisiakshare.com/node/9377 -o story.html
    # then strip tags with a small Python snippet -> source/naikeshwar_story_raw.txt
