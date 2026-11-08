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
