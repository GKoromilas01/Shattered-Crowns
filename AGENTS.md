# Working agreement for AI agents (Codex, ChatGPT, Claude)

Project: Shattered Crowns, a browser RTS and city builder by Sand Labs (owner: Giannis). It is sold commercially, so everything must be original and legally usable. Read `docs/HANDOFF.md`, `docs/ROADMAP_IDEAS.md`, `docs/ART_DIRECTION.md`, `docs/ASSET_LOG.md` and `RELEASE_NOTES.md` first.

For future single-player versions, start with the [single-player roadmap and version briefs](docs/ROADMAP_SINGLE_PLAYER.md).

## Roles
- **Claude**: owns releases, art/music/video integration, reviews and merges pull requests, and sets version priorities.
- **Codex**: engineering on its own branch: bug fixes with tests, performance, refactors, new systems. One topic per branch, one pull request per topic, never merge your own.
- **ChatGPT**: ideas, story and dialogue, balance numbers, naming, text. Output goes into a markdown file in `docs/` (for example `docs/IDEAS_<topic>.md`), not into code.

## Hard rules
1. Never push to `main`. Branch from `main`, open a PR, and let the owner and Claude merge it.
2. `index.html` is a single large generated file. Edit sources in `src/` and run `node scripts/embed-v026.cjs && node scripts/embed-v047.cjs && node scripts/embed-v026.cjs --check`. Do not hand-edit embedded art, music or video blocks (`sc47Art`, `sc47Media`).
3. Run the tests relevant to your change (`node --test tests/<name>.test.cjs`) and say which you ran. CI (quick, live-smoke, verify) must be green.
4. Do not release or deploy. The owner approves releases himself.
5. Art, music and video: do not add new art. The game's look is the painted Leonardo style (see `docs/ART_DIRECTION.md`). Any new asset must be logged in `docs/ASSET_LOG.md`.
6. Each version should bring a few visible changes that can each be checked in about 30 seconds. Ask the owner before starting a version. Add an idea only if it is genuinely valuable; the aim is an addictive, balanced game, not the most detailed one.
7. Building menus belong inside that building's own panel; keep the global UI light.
8. Write conclusions down. If you discussed a decision with the owner, put it in `docs/` so it is not lost.
