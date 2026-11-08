# Prompts

## Session 1 (2026-11-07)

**User:** read aim.txt and do

**aim.txt:**
> In my story naikeshwar that appeared in aisi akshare last year (see https://aisiakshare.com/node/9377) I describe a game called God Split. If we want to actaully design it, what will be needed? Let us plan and create a prototype.
>
> Maintain notes, commands, prompts.

**Prompt used to extract the game from the story (WebFetch):**
> This is a Marathi story "Naikeshwar". Extract EVERYTHING describing the game "God Split" (गॉड स्प्लिट or similar): its rules, mechanics, goals, players, gods, splitting, scoring, setting, characters who play it, how it works technically, and any quotes about it. Translate to English, and include the original Marathi passages verbatim where the game is described.

(Then the full page was downloaded with curl and the passage read directly, so DESIGN.md quotes the original text.)

## Session 2 (2026-11-07)

**User:**
> (1) English first is fine (2) adults is fines (3) it should include those words from the story, but not be limited to those (4) provide suggestions for license. (5) I think shown to everyone will be great. (0) even when 120/120 were lit in my first try, the game continued. Should it? (00) even when ego points were at zero, it told be ego was cleared (when ceryain conditions were met). (000) yes, we may want variations on wording, and not make the mechanism predictable. The horizontal bars are harder to read - we may want them to be vertical. And clearly ego should be low, so maybe different color. Starslit could be a pie chart showing progress visually. Do these seem good suggestions? I have pushed the current version to github. let us also create a readme with that in mind

**User:**
> I will keep committing peridically. Story text on github for now is file. aisi was open in any case. we will turn on pages after we have finessed things a bit. For beta testing I wonder if we should need a password (perhaps shared - more like a secret word). Did you add questions, words, etc? or is it the same set of questions for now?

## Session 3 (2026-11-07)

**User:**
> the repo is private. I can have pages while it stays private. So lets add the secret word. Do propose a host of other questions/dilemmas in line with the kind of things godsplit needs. Should that be a separate md file?

## Session 4 (2026-11-08)

**User:**
> I made a few mods, in particular to the marathi titles you had. Otherwise they look good. Go for it.

## Session 5 (2026-11-08)

**User:**
> I have made GodSplit temporarily public. How can I take people directly to the game when they go to the github io pages?

## Session 6 (2026-11-08)

**User:**
> we should add a license before I announce it to beta testers. Also, are there any files we should gitignore?

**Choice (asked):** AGPL-3.0 + CC BY-SA 4.0.

## Session 7 (2026-11-08)

**User:**
> do we need to add a copyright line on the pages?

**User:**
> lets add the footer without the source link. Also, other players are simulated should be simulated for now. Finally, other players names were shown only in English, and one of them had been the same as the player. The player was shown as english and marathi, so that may have seemed different

## Session 8 (2026-11-08)

**User:**
> the max height of doubt/tolerance/ego is not known. Also, most questions are rather compact and make sense only to those who already know the dilemmas. We should add proper flesh to those bones

**User:**
> does each dilemma always have the same options and sets of assumptions? This is just a question, not a request to change

**User:**
> let me know once done

**User:**
> are the tests included or only scratch? I think we should have them

**User:**
> yes, add tools/shot.sh

**User:**
> this is great so far. Let us plan what will make the game better

**User:**
> go with your recommendation, 1 and 2 first

**User:**
> go ahead with 3
