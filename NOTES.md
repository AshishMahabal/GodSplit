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
