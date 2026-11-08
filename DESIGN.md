# God Split: Design Plan

Source: the story *नैकेश्वर* (Naikeshwar), ऐसी अक्षरे, 13 Oct 2025, https://aisiakshare.com/node/9377
Raw page text saved in `source/naikeshwar_story_raw.txt`.

## 1. What the story says about the game

The passage (near the end of the story):

> मायलीनं एक मुक्त-स्रोत धर्मशास्त्रीय खेळ, गॉडस्प्लिट, वितरित केला. यात पुढच्या फेऱ्या गाठण्यासाठी प्रत्येक खेळाडूला खेळातल्या गृहीतकांवरच शंका घ्याव्या लागत, नैतिक विरोधाभासांशी सामना करावा लागे. नचिकेत, थिसियस, युधिष्ठिर, मॉण्टी हॉल या सर्वांशी दोन हात करावे लागत. श्रेयस बरं, की प्रेयस ... पाच लोकांना वाचवण्यासाठी दुसऱ्याच एखाद्याला मारलेलं चालेल का? तो तुमचा सख्खा कोणी असेल तर? ... खेळाडूंच्या अहंभावाचा बीमोड करण्यासाठी मधूनमधून त्यांना त्यांच्या अवताराची ओळख उघड करावी लागे. ... गॉडस्प्लिट जुळवून घेत सफाईनं उत्क्रांत होत असे ... लोक एकमेकांशी बोलून खेळत, पण त्यांचं एकमत होत नसे.

Other lines that set the game's purpose:

- The Auditor's three conditions for the stars to relight: **सर्वव्यापी वयंकार** (a pervasive sense of "we"), **विरोधाभासी मतांप्रती बहुजनांची सहिष्णुता** (wide tolerance of contradictory views), **काळाप्रमाणे व्याख्यांच्या बदलांची, उत्क्रांतीची स्वीकृती** (accepting that definitions change and evolve).
- Sam: "धर्मसंकटांची एक शिडीच" (a ladder of moral dilemmas).
- The Avashesh declaration: "आम्हांला माहीत नाही दैवी कोण आहे किंवा काय आहे, परंतु आम्ही कोणा एकाची सत्यावर मक्तेदारी असू शकते, हे नाकारतो."
- Mayli's earlier work, *GodSim*, packaged one game in many forms with AI for different communities.
- The Fifth Head myth (Brahma's fifth head, Kalabhairava, Kashi) is the story's central image.

## 2. Requirements pulled from the story

| # | Story element | Game requirement |
|---|---|---|
| R1 | Advance only by doubting the game's own assumptions | Each dilemma has hidden premises the player can expose. Climbing a rung needs enough of them exposed. |
| R2 | Moral contradictions, ladder of dilemmas | Content is a graded ladder of dilemmas, grouped in rungs. |
| R3 | Nachiketa, Theseus, Yudhishthira, Monty Hall, shreyas/preyas, trolley, trolley-with-kin | Launch content set. |
| R4 | Periodic forced reveal of avatar identity to break ego | Avatar reveal at rung ends: the game names you by your choice pattern. Accepting it clears ego. |
| R5 | Adapts and evolves, new paradoxes each time | Next dilemma depends on past answers. Later: generated variants. |
| R6 | Children, AIs, and hostile players all play | Age-tiered content. Bot/AI play API. Must hold up against players trying to "beat" it. |
| R7 | People talk while playing but never reach consensus | No answer is scored as right. Show how others split. Reward arguing the other side well. |
| R8 | Goal: accept uncertainty | Scoring rewards calibrated doubt and tolerance, penalises unexamined certainty. |
| R9 | Open source, free, viral, game features and prizes | Open licence, shareable results, cheap to run. |
| R10 | Auditor's three conditions | Three meters: Doubt (evolving definitions), Tolerance, Ego (inverse of "we"). |

## 3. Core loop (as built in the prototype)

1. **Dilemma** appears with 2 options.
2. **Pick a first answer, then question the premise** (optional): reveal hidden assumptions one by one. Some reveal a third, reframing option. Revealing is only possible once a first answer is picked.
3. **Choose** an option and a **confidence** (certain / leaning / unsure).
   - Doubt: +1 for each assumption exposed (once each), and +2 when the committed answer differs from the first answer. The change bonus counts for at most a quarter of the dilemmas, so exposing everything without ever changing fills about 85% of the Doubt meter, and changing every answer is not a strategy either.
   - Ego rises with confidence, but only if you examined no assumption. Certainty after examination is allowed. (This matters for Monty Hall, which has a real answer under its stated rules.)
4. **The Split**: see how other players divided (simulated in the prototype).
5. **Steelman**: pick the strongest argument for an option you did *not* choose, out of three: the honest argument, a strawman (picked from two), and a decoy that is a good argument for a different side. Right pick raises Tolerance, a strawman lowers it, the decoy does neither.
6. **Stars** relight as the meters improve. The sky is scaled so it can only fill completely at the very end, with every assumption examined and every steelman right. The same fraction decides the Auditor's verdict (75% or more = audit complete).
7. At the end of each rung: **Avatar reveal** and a **ladder gate** (needs enough Doubt, otherwise you replay a dilemma you answered without doubting).
8. Final round questions the game's own score. Then the Auditor speaks.

## 4. What a full build needs

### Design
- Dilemma authoring format (the prototype uses a JS object per dilemma: text, options, assumptions, unlockable reframe, split, steelman).
- A content bible: Indian sources (Upanishads, Mahabharata, Bhakti, Buddhist and Jain texts), Greek, Abrahamic, philosophy-of-mind and decision-theory puzzles. Each with a scholar check.
- Difficulty ladder and age tiers (children vs adults).
- Reward design that does not reward a "correct" moral answer. Only reward process: doubt, calibration, steelmanning, listening.
- Anti-gaming: players who learn to click every assumption and always say "unsure" should not win. Ideas: assumptions cost time or tokens, calibration scored on dilemmas that do have answers (Monty Hall), steelman distractors that change each run.

### Party mode: everyone on their own device (idea, not built)
Kept apart from the current game. A separate page and mode, sharing only `dilemmas.js`, and later the scoring rules.

- **What it fixes.** In pass-and-play, everyone waits while one person reads and answers. With a phone each, all answer at once, answers are truly private, and there is no handing round.
- **Two forms.** (a) Rounds: a host starts a room with a short code, everyone sees the same dilemma, answers on their own phone, and the split appears on every phone at once. (b) Parallel climbs: each person climbs their own ladder and the room meets at each rung gate to compare. (a) suits "talk about it" better, so build it first. (b) can share most of the same parts later.
- **Why it is a good first use of a server.** It needs a small relay and nothing kept: no accounts, and a room disappears when the game ends. It gives real splits among real people without the moderation and privacy work of a public sky or daily dilemma. So it fits after the testers' reports and before Stage 4, and teaches what Stage 4 needs.
- **What it changes in play.** A soft timer, or "waiting for 2 more", because the slowest player now holds up the room. Steelmen can be typed by each player and voted on. Each player keeps their own meters and constellation, and the sky is shared.
- **What is hard.** Phones sleeping and players dropping out or joining late. It should carry on without them, and let them back in. It also won't work from a plain file, or offline.
- **Choices to make then.** Hosting (a managed realtime service is the least work). Whether a shared big screen is optional (suggested: yes, phones alone must be enough).

### Adaptive engine ("evolves")
- Player model from tags on choices (utilitarian, loyalty, duty, later-reward, etc.).
- Selector that picks the dilemma that most strains the current model (if you pull the lever, the one on the track becomes your sibling).
- Built (session 14): tags grouped into four opposed axes (`AXES`). Each rung is drawn when reached, favouring the player's strongest leaning, or in a group what divides the table most. A "what changed?" note after an answer that leans against an earlier one, at most once per rung. The second avatar reveal says whether the name moved. None of it touches the meters.
- Later: LLM-generated variants with human review. Generated text needs a review queue before going live, because religious content is sensitive.

### Social ("talk but never agree")
- Real split data per dilemma, shown after you answer.
- Small group rooms: 3-5 players see the same dilemma, chat, each must steelman someone else. Scoring rewards accurate restatement of others.
- Optional reveal to group (the avatar reveal becomes social).
- Moderation: theology plus anonymous chat invites abuse.

### Packaging ("Mayli packages it for many groups")
- Localisation first in Marathi, Hindi, English. Then the content itself, not just strings, adapted per culture.
- Web first (single page, works offline). Mobile wrapper later.
- AI player API: the same game over JSON so AI agents can play and be compared with humans.

### Tech
- Prototype: one HTML file, vanilla JS, no build.
- Next: content in JSON/YAML files, a tiny engine, local storage for progress, a small backend (e.g. SQLite + one API) for split counts.
- Privacy: store only aggregate counts, no profile tied to identity unless the player opts in.

### Open source and safety
- Licence: code MIT or GPL, content CC BY-SA (decision for the author).
- Sensitivity review for religious material. The Trump-statue frame belongs to the story. The game itself should stay neutral and point at the "single claim to truth" pattern, not at any one group.

### Team (rough)
Writer/curator of dilemmas (the author), a game designer, one web developer, a scholar or two as reviewers, a translator, later a backend developer and a moderator.

## 5. Milestones

1. **M1 (pass-and-play), done**: 2 to 5 players on one device. Private turns with a hand-off screen, the room's real split with names, each player steelmans the next player's differing answer (or a side nobody took), a room-wide avatar reveal, a gate that holds back only the players short of doubt (they replay while the others wait), a shared sky (average of players). Brings part of M3 forward without a server.
1. **M1 (beta polish), done**: scoring change above, a card at the start of each rung, a one-time explanation of the meters, runs saved between dilemmas, phone layout checked, feedback link at the end (GitHub issue, prefilled).
1. **M1 (part), done**: content in `prototype/dilemmas.js`, 46 dilemmas and 9 variants, 5 rungs drawn at random.
1. **M0, done**: single-file playable prototype, 10 dilemmas, 3 rungs, public reveal (simulated), gate, steelman with decoys, star ring, Auditor ending.
2. **M1**: content moved to data files, Marathi UI, 25 dilemmas, playtest with 10 people.
3. **M2**: real split counts via a small backend, shareable result card.
4. **M3**: group rooms with steelman chat, moderation.
5. **M4**: adaptive generation with review queue, AI-player API.

## 6. Decisions (author, 2026-11-07)

- **Language:** English first. Marathi titles and story lines stay.
- **Audience:** adults.
- **Frame:** use the story's words and world (Auditor, stars, Avashesh, the Fifth Head, वयंकार), but don't stop there. Content can come from any tradition.
- **Avatar reveal:** public, shown to everyone. In the prototype other players are simulated. A real version needs the backend from M3.
- **Licence:** AGPL-3.0-or-later for code, CC BY-SA 4.0 for content (chosen 2026-11-08). Story text in `source/` stays all rights reserved.

## 7. Licence options

Code and content are best licensed separately.

**Code**

| Licence | What it means | Fits if |
|---|---|---|
| MIT | Anyone can use, change, sell, close. Only keep the notice. | You want the widest spread, the "most viral game in history" path. |
| Apache-2.0 | Like MIT, plus an explicit patent grant. | Companies may build on it. |
| GPL-3.0 | Changed versions that are distributed must stay open. | You want forks to stay open. |
| AGPL-3.0 | Like GPL, and also covers forks run as a web service. | Once there is a server (M2+), and you don't want a closed hosted fork. |

**Content** (dilemmas, text, art)

| Licence | What it means |
|---|---|
| CC BY 4.0 | Reuse anything with credit. |
| CC BY-SA 4.0 | Reuse with credit, and adaptations must use the same licence. |
| CC BY-NC-SA 4.0 | As above, but no commercial use. Not "open source" in the strict sense. |

**Suggestion:** AGPL-3.0 for code and CC BY-SA 4.0 for content. Both keep every fork open, which matches the story's "no one holds a monopoly on truth". If the main goal is reach, MIT plus CC BY 4.0 is the low-friction alternative.

The story itself stays © the author. Quoting short lines in the game is fine as the author's own choice. The full story text in `source/` should be checked against ऐसी अक्षरे's terms before it stays in a public repo.
