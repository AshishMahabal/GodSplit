# Commands

## Play the prototype
    open prototype/index.html

## Test (syntax check plus scripted playthroughs: doubter, middle, lazy)
    ./tools/test.sh
Expected: doubter and middle reach the Auditor ending. lazy stays stuck at the first gate (on purpose).

## Fetch the story text again (session 1)
    curl -sL https://aisiakshare.com/node/9377 -o story.html
    # then strip tags with a small Python snippet -> source/naikeshwar_story_raw.txt
