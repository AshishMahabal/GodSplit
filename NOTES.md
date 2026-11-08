# Notes

## 2026-11-07: Session 1

**Goal (aim.txt):** design God Split, the game from the story नैकेश्वर (ऐसी अक्षरे), plan it, and build a prototype.

### Done
- Fetched the story page and saved its text to `source/naikeshwar_story_raw.txt`.
- Pulled out every line about the game, and the Auditor's three conditions, into `DESIGN.md` section 1.
- Wrote the design plan: requirements, core loop, what a full build needs, milestones, open questions (`DESIGN.md`).
- Built prototype M0: `prototype/index.html`, a single file with no dependencies. Open it in a browser.
- Added a headless test: `tools/test.sh` (syntax check plus 3 scripted playthroughs).

### Design decisions taken in the prototype
- The three meters map onto the Auditor's three conditions: Doubt = accepting that definitions evolve, Tolerance = tolerance of contradictory views, Ego (lower is better) = the inverse of वयंकार.
- No dilemma has a scored right answer. Only the process is scored: exposing assumptions, calibrated confidence, steelmanning.
- Certainty costs ego only when you examined nothing (or just one assumption). This keeps Monty Hall honest: it has a right answer under the standard rules, and certainty there is fine once you have checked the rules.
- Each dilemma's third assumption unlocks a reframing option. This is how "doubting the game's assumptions" opens new paths.
- Ladder gate: total Doubt of 2 / 5 / 8 is needed to climb past rungs 1 / 2 / 3. Otherwise you replay a dilemma you answered without doubting.
- Avatar reveal at the end of each rung. The name comes from your most frequent choice tag. Accepting it clears ego, denying it adds 1.
- Adaptation (the "evolves" part), stub version: the second trolley depends on the first answer. If you pulled, your sibling is the one on the side track. If you did not, your sibling is among the five.
- The final round questions the game's own score ("Seeker, Sage, or God"). The "God" rank can never be reached.
- The figures for how other players split are made up and labelled as simulated.
- UI is in English with Marathi titles and quotes from the story. Language is an open question for the author.

### Known limitations / next
- Content is hardcoded in JS. Move to data files (M1).
- An "always reveal every assumption" strategy wins easily. Needs anti-gaming (see DESIGN.md section 4).
- Replaying a dilemma lets you collect Doubt again for the same assumptions.
- Steelman strawmen are fixed per dilemma, so a repeat player learns them.
- No persistence and no real multiplayer.

### Open questions for the author
See DESIGN.md section 6 (language, audience, story frame vs standalone, licence, how public the reveal is).

## 2026-11-07: Session 2

### Author's answers
English first, adults, story words included but not the limit, reveal shown to everyone, licence options wanted. Recorded in DESIGN.md section 6.

### Author's playtest findings and what changed
- **All 120 stars lit and the game went on.** The star formula saturated after about 7 dilemmas. Now stars = progress toward the Auditor's verdict: 50% from Doubt (max 30), 50% from Tolerance (max 20), minus 3% per Ego point. Full sky only possible at the end. The ending verdict uses the same number (>= 75%), so the sky and the verdict can't disagree. Decision: the ladder is the structure, the sky is a running verdict, so the game does not end early.
- **"Ego cleared" shown when ego was already 0.** Reveal now says "Ego cleared (N → 0)" only when N > 0, and has separate wording for zero.
- **Mechanism too predictable.**
  - Feedback lines are now drawn from pools of three.
  - Option order and assumption order are shuffled every time, so the unlocking assumption is not always last.
  - Steelman now has a decoy: the good argument for a *different* side. Before this, the honest argument was always the long reasoned one and could be spotted by length.
  - Doubt counts once per assumption, so replaying a dilemma no longer farms it.
- **Meters.** Horizontal 6px bars replaced with vertical columns with the number on top. Doubt and Tolerance use categorical blue and aqua (checked with the dataviz palette validator on the panel colour: pass). Ego is a status meter: grey "low" (0-2), amber "rising" (3-5), red "high" (6+), captioned "keep this low".
- **Stars lit** is now a ring with the percentage and the count in the middle. A ring rather than a pie because the Auditor in the story appears as a doughnut (डोनट).
- **Public reveal.** The reveal says everyone can see the name, shows six simulated other players' reveals, and the header shows "seen as <name>" from then on.

### Tests
`tools/test.sh` now runs four playthroughs: doubter (120/120 at the end, 108 max before the final round), middle (80, verdict "audit continues"), decoy (60), lazy (stuck at gate one).

### Still open
- Exposing every assumption every time still maxes Doubt. Possible fix: a budget of doubts per rung, or doubts that cost time.
- Strawmen are fixed text. A larger pool per option, or generated variants, would help.
- `source/naikeshwar_story_raw.txt` is in the public repo with the site's navigation, reader comments and "All rights reserved" footer. Author to decide whether to keep it.
- GitHub Pages not yet confirmed.

## 2026-11-07: Session 2, follow-up
- Author commits and pushes periodically. Don't commit unless asked.
- Story text in `source/` stays: ऐसी अक्षरे is openly readable anyway.
- GitHub Pages: turn on later, after polishing.
- Open: should beta testing need a shared password (secret word)? The repo is public, so a password on the page only keeps out casual visitors. See the options in the session 2 discussion: client-side secret word, or real access control via a host such as Cloudflare Pages with Access.
- Content is still the original 10 dilemmas. Session 2 added only feedback wording pools and decoy arguments (reusing existing text).

## 2026-11-07: Session 3
- Repo is private. Author will use GitHub Pages while it stays private. Note: Pages from a private repo needs a paid plan, and the published site is still public to anyone with the URL (unless on Enterprise Cloud with private Pages). So the secret word is a casual gate. The game's text can be read via view-source.
- Added the beta secret word gate. Only an FNV-1a hash is stored (`SECRET_HASH`). Set it with `python3 tools/set_secret.py <word>`. Once entered, the browser remembers it (localStorage `gs_word`). Changing the word logs everyone out.
- **The word is currently a placeholder ("test word"). Set the real one before Pages goes live.**
- `tools/test.sh` now checks the gate: lock screen shows first, a wrong word keeps it locked, and (if `GS_WORD` is set) the right word opens it.
- Wrote `DILEMMAS.md`: 35 proposed dilemmas in four groups (story world, Indian traditions, other traditions, decision theory and modern), a proposed 5-rung structure (Doors, Bodies, Words, Gods, Mirrors) with random draws per rung, and a suggested first batch of 10. Waiting for the author's keep/change/drop review before building them.

## 2026-11-08: Session 4
- Author reviewed DILEMMAS.md: all kept, Marathi titles corrected. Go-ahead to build.
- Content moved out of the page into `prototype/dilemmas.js` (loaded with a plain script tag, so it still works from file://).
- Built 13 new dilemmas: the suggested ten plus Shibi and Angulimala (Bodies pool had only the trolley pair and the dog) and the Answer Sheet (Mirrors). Wrote one honest argument and two caricatures per side for each. These need the author's read.
- Ladder is now 5 rungs (Doors, Bodies, Words, Gods, Mirrors). Each run draws 2 per rung from its pool. The trolley and its adaptive sequel stay together and use both Bodies slots. The Fifth Head always closes the Gods rung. Then the Final Rank. 12 dilemmas per run in total (10 before).
- Doubt and Tolerance maxima are now computed from the run's plan (3 and 2 per dilemma), so the sky still fills only at the very end.
- Gate needs Doubt equal to the number of dilemmas played so far (about one assumption each).
- Avatar reveal now only after rungs 2 and 4 ("मधूनमधून", now and then), not after every rung. Rungs without a reveal go straight to the gate.
- Tests: `tools/validate.js` checks every dilemma's structure (2 options, 3 assumptions with exactly one unlock, split for every option, steel arguments, known tags, no em dashes) and that every dilemma sits in some pool. `sim.js reach` checks every dilemma can be drawn. All pass.
- The secret word has been changed by the author (hash no longer the placeholder).

### Open
- Climbing a rung with no reveal has no "you climbed" moment. Might want a short transition card naming the next rung.
- PER_RUNG = 2 gives 12 dilemmas a run. 3 per rung would give 17. Author's call after playtesting.

## 2026-11-08: Session 5
- Repo made public (temporarily) by the author, with GitHub Pages.
- Added top-level `index.html` that redirects to `prototype/` (meta refresh, JS redirect, and a plain link). Relative path, so it works under `/GodSplit/`. Checked with a local server: root, `prototype/` and `prototype/dilemmas.js` all serve, and the root lands on the secret word screen.
- At the time, sessions 2 to 4 were not yet committed. `prototype/dilemmas.js` must be committed together with `prototype/index.html`, or the online game breaks.

## 2026-11-08: Session 6
- Licence chosen by the author: AGPL-3.0-or-later (code) + CC BY-SA 4.0 (content). Official texts downloaded into `LICENSE` (gnu.org) and `LICENSE-CONTENT` (creativecommons.org legalcode.txt). SPDX tags added to the top of each code/content file. README has a licence table. `source/` is explicitly not licensed.
- Copyright line uses the GitHub account name. The story's pen name is not linked to it anywhere in the repo.
- Added `.gitignore`: macOS files, editor folders, Claude Code local settings, `tools/g.js` (test scratch), node/python caches, `.env*`.

## 2026-11-08: Session 7
- Footer: "Other players are simulated for now." plus "© 2026 Ashish Mahabal · Code: AGPL-3.0 · Content: CC BY-SA 4.0 · No warranty". No source link (repo may go private again).
- Avatar reveal: the six simulated players now get distinct names, never the player's own, each shown in English and Marathi like the player's. The header's "seen as" also shows both languages. Before, a simulated player could share the player's name and look different because it showed only the English.
- New test `sim.js reveal` (in test.sh): 500 reveals, checks 6 distinct bilingual names and none equal to the player's.

## 2026-11-08: Session 8
- Meters now show their scale. Doubt and Tolerance show "value / max" for this run (max = 3 and 2 per planned dilemma, e.g. 36 and 24 for 12 dilemmas). Doubt has a white line at the doubt needed for the next rung, with "next rung: N" above. Ego has no real maximum (the lazy sim reaches 62), so its bar says "full at 12" and has faint lines at 3 (rising) and 6 (high).
- All 24 dilemma texts rewritten with background, so they make sense to someone who doesn't know the original: who, where, what is at stake. Texts are 2 paragraphs (split on a blank line). The texts avoid giving away the hidden assumptions.
- New `src` field on every dilemma: one line on where it comes from (Upanishad, Mahabharata book, Plato, Newcomb, the story itself). Shown in small italics under the text. `validate.js` now requires it.
- The trolley follow-ups now remind you what you did a minute ago ("A minute ago you pulled it").
- Questions answered: each dilemma always has the same 2 options and 3 assumptions. Only their order, the strawman, the decoy and the feedback wording vary. Variety between runs comes mainly from which dilemmas are drawn.
- Added `tools/shot.sh [dilemma-id] [out.png]`: headless Chrome screenshot of the start screen or any dilemma. Works on a temp copy of the page with transitions off and the secret word skipped, so the real page and the stored word are untouched. The HUD still says Rung 1, whichever dilemma is shown.

## 2026-11-08: Session 9 (plan items 1 and 2)
Plan agreed with the author (in order): 1 scoring loophole, 2 polish for beta, then 3 pass-and-play group mode, 4 variants and more dilemmas, 5 adaptation by tags, 6 backend and share card.

Item 1, scoring:
- A first answer must be picked before any assumption can be revealed. After a reveal the page asks "Does this change your answer?".
- Doubt: +1 per assumption (once each, as before), and +2 if the committed answer differs from the first one (the reframe counts). The +2 counts once per dilemma and for at most CHANGES = ceil(dilemmas/4) dilemmas, so 3 in a 12-dilemma run. DMAX = 3·N + 2·CHANGES (42 for 12).
- Result (sim): reveal everything and never change = 36/42 Doubt, 111 of 120 stars, still the strong ending if steelmen are right. Reveal and change on a quarter = full sky. Changing every answer gains nothing past the cap, with its own message.
- Not done: calibration on "knowable" dilemmas. On reflection, no dilemma here has a clean right answer once its assumptions are exposed (even Monty Hall depends on the host's rule, which is the point of its assumptions), so marking "unsure" as wrong would go against the game. Confidence is still only costly when nothing was examined. The loophole is narrowed, not closed. If testers still click through, the next step is a per-rung reveal budget.

Item 2, polish:
- Rung card at the start of each rung: rung name, a line about it (new `about` field in RUNGS), a line from the Auditor.
- "The three meters" explanation on the start screen, open on first visit, folded afterwards (`gs_help` in localStorage).
- Save and resume: the run is saved in localStorage (`gs_save`) at each point between dilemmas, with where to resume (next dilemma, rung card, reveal, gate). Start screen offers Continue or Start over. Saves from an older version, or naming dilemmas no longer in the game, are dropped. The ending clears the save. A dilemma in progress is not saved, it restarts.
- Phone check at 390px: the ring stacks above the meters, nothing overflows. Headless Chrome can't make a window under 500px, so `shot.sh` narrows the page itself when WIDTH < 500.
- Feedback link on the ending screen: opens a new GitHub issue prefilled with the run (meters and path). Only works while the repo is public. `FEEDBACK_URL` in index.html.
- Tests: new `changer` playthrough and a `resume` check. The sim also checks that revealing before a first answer does nothing.

## 2026-11-08: Session 10 (plan item 3: pass-and-play)
- Start screen: "Play alone" or "Play together on one device (2 to 5 people)". Names are entered once (at least 2, all different).
- State: `S.players` holds each player's meters, tags, history and seen-assumption records. The ladder (plan, rung, step) is shared. `S.turn` is whose meters the HUD shows. Solo is the same code with one player called "You". Save version is now 2, so older saves are dropped.
- A round, together: for each player, a "Pass the device to X" screen, then the dilemma in private (first answer, reveals, change, confidence), then a private feedback card ("Hide this and pass on"). Then the room's split, with counts and names for every option, including third ways nobody found. Then each player in turn, on the shared screen, picks the strongest case for another player's real answer: the next player round the table whose answer differs from theirs and is one of the two main options. If nobody differs, a side nobody took.
- Avatar reveal, together: all players named in front of the room. Each says "that is me" or not. No simulated players.
- Gate, together: every player needs the doubt for the next rung. Anyone short replays one of their own unexamined dilemmas alone (with a hand-off), and the gate checks again. "The ladder takes all of you or none of you."
- Sky: the average of the players' progress. Auditor's verdict on that average. Ending lists each player with avatar, meters and rank line. The rank's third way says "Ask the others at the table. They will not agree."
- The trolley follow-up depends on the room's majority (ties count as pulled). The follow-up text says "A minute ago you pulled it", which won't fit the minority.
- Tolerance is now capped at its maximum, since replays add steelmen beyond the plan (this could already happen in solo).
- Footer: "In solo play, other players are simulated for now."
- Test: `sim.js group` plays 4 players with different styles (one skips looking at first, so the gate holds that player back alone). Checks hand-offs, split counts, steelman targets, reveal and that the run ends.
- Not done: a timer or a way to stop players peeking, a discussion prompt per dilemma, real-group votes on whose steelman was fairest. Steelmen are still multiple choice.

## 2026-11-08: Session 11
- Reviewed the notes and listed next steps for the author.
- Trolley sequel wording fixed for group play. The room still shares one sequel, chosen by majority, but "A minute ago ..." now comes from each player's own latest trolley answer (`{earlier}` in the text, `EARLIER` in dilemmas.js), including the third way (shout). Sequel option labels are now neutral ("Pull the lever", "Do not pull"), since "Still do not pull" was false for anyone who pulled and is also shown on the room's split. New test: `sim.js earlier`.
- Left as is: in the minority, the assumption "the rule you used a moment ago should hold when it costs you something" can miss, since that player's rule may cost them nothing in this sequel. It still reads sensibly. Each player getting their own sequel would break the room's shared split.
- `dilemmas-review.html` (project root, not tracked, snapshot): readable page of the 13 batch 1 dilemmas for the author's review.
- `dilemmas-review.md` (project root, not tracked): the same content as Markdown, for the author to edit, since Markdown is easier to update. `DILEMMAS.md` only has the short proposals, without the session 8 texts or the arguments. The game reads `prototype/dilemmas.js`, so edits to the review copy are carried over by hand (by Claude, on request).

## 2026-11-08: Session 12 (plan item 4: variants and more dilemmas)
- Author read the 13 from batch 1: fine, no changes.
- Built the other 22 proposals from DILEMMAS.md (all 35 now built), in the rungs proposed there. 46 dilemmas in all. Pools: Doors 6, Bodies 8, Words 9, Gods 10, Mirrors 9. Still 2 per rung, 12 a run.
- Texts, arguments and simulated splits are new, and the sources were written from memory, not checked against references. The Marathi titles are the ones the author corrected in DILEMMAS.md. No new Marathi was written.
- Variants: `VARIANTS` in dilemmas.js holds a second version of 9 dilemmas, with a changed setup that changes the question (monty, boxes, dog, theseus, kashi, tyrant, bhishma, euthyphro, halftruth). A variant replaces only the fields it lists and keeps the option ids. Each has its own title, so the path and the feedback link show which version was played.
- `dilemmaOf(id)` draws the version the first time a dilemma comes up (evenly among original and variants) and keeps it in `S.variants`, so replays and everyone at the table get the same one, and it survives a save. Save version is now 3, so saves from before this are dropped.
- Tests: `validate.js` checks every variant merged over its dilemma, and that it has its own title, text and source and keeps the option ids. New `sim.js variants` plays all 55 versions through reveal, third way, split and steelman, and checks a version stays fixed within a run and through a save.
- `dilemmas-review-batch2.md` (project root, not tracked): the 22 and the 9 variants, for the author to read.
- Side effect, author's call: the trolley chain is now in 1 run in 8 (it was 1 in 4), measured over 100,000 draws. It is the only adaptive branch, and the story's own question. It could be weighted up, or plan item 5 may make this matter less.
- Not done: a larger pool of caricatures per side. With 46 dilemmas, repeats are much rarer, so this can wait for playtest evidence.

## 2026-11-08: Session 13 (planning item 5, nothing built yet)
- Author pushed session 12. Trolley frequency is on hold until item 5 is decided.
- Tags as they stand are lopsided on the main options (duty 21, change 16, later 3), and Doors uses now/later/stay/switch, which rarely appear higher up. Proposal given to the author: group tags into four opposed axes (rule/result, hold/change, mine/many, here/beyond), then a targeted rung draw, a "what changed?" note after a commit that leans against an earlier answer, and the second avatar reveal naming any shift. No meter effect. Waiting for the author's choice.

## 2026-11-08: Session 14 (plan item 5: adaptation)
Author chose A, B and C, with a curious tone. "Should not affect the meters much": built with no meter effect at all.
- `AXES` in dilemmas.js: duty/util, continuity+stay/change+switch, loyal/we, now+world/later+seeker. An option with tags on both sides of an axis counts as neither. No dilemma was re-tagged.
- Few dilemmas put both sides of an axis head to head (Gods: 2 of 10), so the design compares across dilemmas, and a dilemma counts if it offers either side.
- A, the note: after a commit, if the answer leans against an earlier one on some axis: "Earlier, at X, you chose Y and leaned toward the rule. Here you leaned toward the result. Both can be true. What changed?" Three wordings. At most once per rung per player, not on the final rank, never compared with the same dilemma, and it uses only the latest answer to each dilemma. In a group it stays on the player's private card.
- B, targeted draw: `retarget()` draws each rung again when it is reached, keeping its length, so meter maxima and gates don't change. Rung 1 stays random. Weight 1 for a dilemma offering neither side of the target axis, 3 for one side, 5 for both. Target: the strongest leaning, or in a group the axis with the widest spread. Leaning = taken/(offered+2) for one side minus the same for the other, so common tags and single answers don't look like a leaning.
- C, reveal: the second reveal says whether the name moved. Three wordings each way, solo and group.
- Measured, 2000 scripted runs per kind of player (`sim.js adaptstats`). Notes per run: about 3 if random, 2.7 if always choosing results, 2.3 if always holding on, 1.8 if always choosing rules. Runs with no note: 1 to 15%, highest for rule-followers. Share of dilemmas (rungs 2 to 5) on their own axis: rules 68% against 59% untargeted, holders 50% against 43%, results 60% against 59%, so targeting is modest, and barely helps those who favour results, because util is offered less. The name moved at the second reveal in about 75% of runs. These are scripted players, not people.
- Trolley: B alone took it to about 1 run in 10 (it was 1 in 8), because B favours other dilemmas when the target isn't rule or result, and at rung 2 it rarely is: Doors offers no rule-or-result choices. Author chose 1 in 4. `CHANCE` in dilemmas.js fixes this, whatever the targeting does. The other seven Bodies dilemmas share the remaining draws.
- Tests: `sim.js adapt` (in test.sh) checks when the note fires and doesn't, once per rung, no meter change, group privacy, rung lengths, no target before any answer, reveal lines, and the trolley's 1 in 4 before and after targeting. `validate.js` checks the axes and `CHANCE`.

## 2026-11-08: Session 14, wording check
- Author found "Go back to a dilemma answered without looking under it" ambiguous. Now: "Go back to one you answered too quickly, and this time look at what it assumes."
- Read the rest of the game's text for the same problem. The author approved all 20 proposed rewordings, and they are applied: dangling phrases ("Playing together, the sky is shared"), "looked" and "looking under" with no clear object, "pass on" (also means die), the note's "toward your own" (now "your own people"), the ego lines that slotted in "leaning" badly, and four assumptions in Boxes, One Grain, Sleeping Beauty and Beacon. The review copies were updated to match.

## 2026-11-08: Session 15 (attractiveness plan, nothing built)
Plan given to the author, waiting for their choices and the testers' reports. Diagnosis: the meters take over half a phone screen before the dilemma, the sky is only a faint background, every dilemma repeats the same 8 taps, and nothing carries over between runs. Principle: reward discovery, never an answer, since no answer is right. Four stages:
1. Stage: slim phone HUD, the sky as the main visual, staged key moments (third way appearing, split, reveal, Fifth Head), a look for each rung, the Auditor as a doughnut character, optional sound.
2. Pacing: a faster start, varied dilemma formats, a countdown on the trolley, a shorter run.
3. Reasons to return (no backend): a record of third ways, names and dilemmas found, the Auditor remembering earlier runs, a personal sky made from each run.
4. Together (needs the backend of item 6): a daily dilemma with real splits, a share card, one sky shared by all players, group steelmen in players' own words with a room vote.
Avoid: leaderboards, guilt-based streaks, confetti for answers, timers everywhere.
Suggested extra tester questions: where did you feel like stopping, and would you play again unprompted?

## 2026-11-08: Session 16 (look and feel, first three items)
Author chose the minimal starfield style and the first three items.
- Slim phone bar: at 520px and under, the meters fold into a sticky bar (stars, Doubt against the next rung, Tolerance, Ego), and tapping it opens the full meters. A number that changes pops. Desktop is unchanged. The first screen of a dilemma now starts near the top.
- Third way: when the unlocking assumption is revealed, the new option opens with a gold glow and a dashed border, a line appears ("There was another door all along", three wordings), the page scrolls it into view, and the dark stars stir. The animation plays once, and the mark stays until commit.
- Sky: dark stars are a little more visible. The sky no longer follows the meters live. It catches up in an interlude of about 2 seconds after each dilemma: the card fades, new stars light one by one with a soft flare, and "+7, stars lit, 43 of 120" shows. A tap skips it. There is no interlude if no stars were gained, or under the system's reduced-motion setting, which also turns off the other animations. Each next dilemma now starts at the top of the page, which also fixes staying scrolled down on phones.
- Your skies: each finished run saves a constellation per player in localStorage (`gs_skies`, newest 60 kept, not cleared by a new run). It climbs from bottom to top. Sideways position comes from a hash of dilemma and answer, so the same choices draw the same shape. Size = assumptions examined. Gold = third way taken. Faint branch = first answer let go. It is drawn on the ending, and the start screen offers "Your skies (N)". Only shapes and summaries are stored, no answers in words.
- Also fixed "1 doubts" in the path list and feedback link.
- Tests: new `sim.js look` covers these. Also played a whole run in real headless Chrome with real timers: no script errors, no sideways overflow. Looked at phone-width screenshots of each screen, including 320px. Headless Chrome freezes CSS animations, so those were checked at fixed frames only. The motion itself has not been seen by anyone.
- Party mode (own devices, in one room) written up in DESIGN.md as a separate idea, not built.

## Where things stand (end of 2026-11-08)
- Done: plan items 1 (scoring), 2 (beta polish), 3 (pass-and-play), 4 (variants and more dilemmas), 5 (adaptation). All tests pass (`tools/test.sh`). Nothing committed by Claude, the author commits.
- The three `dilemmas-review*` files went in with the author's push (commit bec1497), so they are tracked now, despite what sessions 11 and 12 say above. They are snapshots of `prototype/dilemmas.js`, which remains the source.
- Paused here at the author's request. Item 5 and the trolley's 1 in 4 are uncommitted, and the live site won't have them until the author pushes. Do that before sending testers the link.
- Questions for testers: did "what changed?" feel curious or nagging, and fit their answers? Did the second reveal's name feel earned or random? Did they click through every assumption, or did some change their answer? Was 12 dilemmas the right length? In a group: was passing the phone awkward, and did they actually argue? The feedback link needs a GitHub account, so testers without one should report directly.
- Open choice for the author: keep the three `dilemmas-review*` files in the repo or remove them. They make the hidden assumptions and arguments easy to find while the repo is public.
- Look and feel items 1 to 3 are done (session 16), and uncommitted. The author should see the motion on a real phone before pushing.
- Next: waiting for reports back from 2 or 3 people playing. The author also still has `dilemmas-review-batch2.md` to read, especially the source lines, which were written from memory, ideally before testers see them. Decide after the reports: reveal budget, run length (2 or 3 per rung), group extras, whether the note and the name shift fire too often. Item 6 (backend, share card, Marathi UI) only after that, and when asked.
- Before announcing: try a round of pass-and-play with 2 or 3 real people on a phone.
