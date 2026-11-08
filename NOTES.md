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
