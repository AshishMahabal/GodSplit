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
2. **Question the premise** (optional): reveal hidden assumptions one by one. Some reveal a third, reframing option.
3. **Choose** an option and a **confidence** (certain / leaning / unsure).
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

### Adaptive engine ("evolves")
- Player model from tags on choices (utilitarian, loyalty, duty, later-reward, etc.).
- Selector that picks the dilemma that most strains the current model (if you pull the lever, the one on the track becomes your sibling).
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
- **Licence:** open. Options below.

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
