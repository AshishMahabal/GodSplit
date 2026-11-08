# God Split · गॉडस्प्लिट

A game about doubt, built from the game imagined in the Marathi science-fiction story
[नैकेश्वर (Naikeshwar)](https://aisiakshare.com/node/9377), ऐसी अक्षरे, 2025.

In the story, set in 2046, the stars go dark after a giant golden head on a mountain proclaims itself the only god.
To answer it, a game developer named Mayli releases **God Split**, a free, open-source "theological game".
To climb its rounds you have to doubt the game's own assumptions and face moral contradictions:
Nachiketa, Theseus, Yudhishthira, Monty Hall, the pleasant against the good, the trolley that is heading for someone you love.
Every so often you must reveal who your avatar really is. People play it, argue about it, and never agree.
Enough of them learn to live with uncertainty, and the stars come back.

This repository is an attempt to build that game.

## Play

Open `prototype/index.html` in any modern browser. It is one file with no install, no build and no network calls.

    open prototype/index.html        # macOS

Online (GitHub Pages): https://ashishmahabal.github.io/GodSplit/
The top-level `index.html` only redirects to `prototype/`.

During beta the game asks for a shared **secret word**. Ask the author for it. To change it: `python3 tools/set_secret.py <word>` (only a hash is stored in the page).

## How it plays

1. **A dilemma.** Two choices, and no answer is scored as right.
2. **Question the premise.** Expose the assumptions the dilemma rests on. Some of them open a third way out.
3. **Choose, and say how sure you are.** Certainty is free once you have examined the question. Unexamined certainty feeds your **Ego**.
4. **The Split.** See how other players divided.
5. **Argue the other side.** Pick the strongest case for a side you did not choose. One choice is honest, one is a caricature, and one is a good argument for the wrong side.
6. **Climb.** Each rung of the ladder needs enough doubt. At the end of a rung your avatar is named from your choices and **shown to everyone**.
7. **The Auditor.** Stars relight as you go. At the end, the Auditor delivers a verdict.

The three meters follow the Auditor's conditions in the story:

| Meter | Story | Raised by |
|---|---|---|
| Doubt | काळाप्रमाणे व्याख्यांच्या बदलांची स्वीकृती (accepting that definitions change) | exposing assumptions |
| Tolerance | विरोधाभासी मतांप्रती सहिष्णुता (tolerance of contradictory views) | steelmanning the other side |
| Ego, kept low | सर्वव्यापी वयंकार (a pervasive sense of "we") | goes up with certainty you never examined, and is cleared by accepting your public avatar |

## Status

Prototype **M1**: 24 dilemmas in 5 rungs (Doors, Bodies, Words, Gods, Mirrors). Each run draws 2 per rung, so ladders differ between plays. One adaptive branch. Other players' choices are simulated.
English first, with Marathi titles and lines from the story. Aimed at adult players.
See [DESIGN.md](DESIGN.md) for the full plan and milestones.

## Repository

| Path | What |
|---|---|
| `index.html` | Redirect for GitHub Pages: sends visitors to `prototype/` |
| `prototype/index.html` | The playable prototype (game engine and page) |
| `prototype/dilemmas.js` | All dilemma content and the rung pools |
| `DESIGN.md` | Requirements taken from the story, the core loop, what a full build needs, milestones, licence options |
| `DILEMMAS.md` | Proposed new dilemmas, for review before they are built |
| `NOTES.md` | Running log of decisions and known limitations |
| `COMMANDS.md` | Commands to play and test |
| `PROMPTS.md` | Prompts used while building this with Claude Code |
| `tools/` | `test.sh`: syntax check, content check, scripted playthroughs (needs Node and Python 3). `set_secret.py`: set the beta secret word |
| `source/` | Text of the story page, for reference |

## Contributing

The most useful contributions are **dilemmas**. The story's own sources (the Upanishads, the Mahabharata,
the Fifth Head of Brahma) are the start, not the limit: other traditions, philosophy and decision theory are welcome.
A dilemma needs two options, three hidden assumptions (one of which opens a reframing option),
and for each option one honest argument and two caricatures. See [DILEMMAS.md](DILEMMAS.md) for proposals and `prototype/dilemmas.js` for the code format. `./tools/test.sh` checks that a new dilemma is complete.

## Licence

Not chosen yet. The options are in [DESIGN.md](DESIGN.md#7-licence-options). The story text is © its author.
