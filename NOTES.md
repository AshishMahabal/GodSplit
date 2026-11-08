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
