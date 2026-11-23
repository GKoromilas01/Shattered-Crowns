# v0.62 — Shakespeare opening, first-building films, verse voices, more music

Owner decisions (23 Nov 2026): slow the opening clips and put subtitles over the picture that describe it, in Shakespearean style (original verse, no quotations); add a short film when the first school, chapel, theatre and shipyard are finished; every new narrative text, subtitle and voice line stays Shakespearean; ships answer with “Ahoy, my captain!”; use all the music and graphics made so far. From the next version on, each version adds one new song and one new graphic only, and the work is gameplay.

## What is in it

1. **Opening.** Seven clips, slowed to 12–20 s each (original 6 s files kept in `assets/v047/video-originals/`). A caption fades in, then verse lines over the picture describe what is on screen. No text screen, no legacy journey. Enter skips a clip, Space pauses, Esc ends. Music keeps playing; the clips are silent. Text lives in `src/v050/opening-story.js` and `docs/OPENING_SUBTITLES_SHAKESPEARE.md`.
2. **First-building films** (`src/v062/first-scenes.js`). When the first School, Chapel, Theatre or Shipyard of a city is completed, a 12 s film with verse plays once per city (remembered in `shattered-crowns-first-scenes-v1`). The game pauses and resumes; Continue or Esc skips. Automated browsers skip it unless `?intro=1`.
3. **Voices.** Worker, soldier and archer lines are now verse; ships (fishing, trade, warship) speak their own greeting through the new `sc-ship-selected` event.
4. **Music.** Playlist grows from 4 to 8 recordings: Banners of the Realm, Byzantine Hall, Celtic Hills, Silk Road (3 min each, unmodified originals in `assets/v062/music/`).
5. **Graphics.** Three tested images are stored in `assets/v062/art-candidates/` (cottage, oak, grass). They were judged not clearly better than the existing art and are not drawn in the map yet; the next version takes one of them (or another) and replaces or adds it properly.

## Size note

`index.html` grows to about 40 MB because the four three-minute recordings are embedded as unmodified MP3 (about 2.9 MB each). Re-encoding them to about 96 kbps would save about 9 MB if load time matters; the owner decides.

## Checks

See `src/v052/tester-steps.js` (five manual steps, about 30 s each). Tests: `tests/cinematic-opening.test.cjs`, `tests/journey.test.cjs` (rewritten for clips with subtitles), new `tests/first-scenes.test.cjs`, `tests/voices.test.cjs` (ship test), music order in `tests/player-control.test.cjs` and `tests/anthem.test.cjs`.

Also in this branch: the four v0.61 test fixes (travel step, boats, raid timing, recruit check) that were pushed to the v0.61 pull request.
