# v0.52 — Your Workers, Your Orders

Owner-authorized fixes after playing v0.51. No merge, deployment, asset purchases or new generation.

## In-game Advisor Tester

Open **Journal & objectives → Open guide → Guide: Tester**. The same manual checks below appear there, with actions and expected results. **Done — Next** confirms your own observation; it does not silently validate, grant goods or complete a chapter. The guide opens only on request.

1. Send different workers to wood, gold and stone. Deselect them, then place an affordable Farm foundation. **Expected:** all keep gathering; the foundation waits.
2. Select exactly one worker and right-click the foundation. **Expected:** only that worker builds; others retain their jobs. Explicitly select more only when wanted. Save/return preserves assignments. Existing builders can follow up another queued site; a newer manual order still wins.
3. Enable Music and use Next through **Heroic Dawn, March of the Crown, Hearthfire Morning, Roads and Caravans**. **Expected:** only the original one-minute recordings rotate. Synthesized compositions and extended copies stay archived, not active.
4. Check mute, Music off, volume, effects and reload. **Expected:** preferences remain effective; music-style migration does not reset your master settings. Hidden tabs retain existing suspension behavior.
5. Build/select a **Chapel** and **School**, and inspect their Construction icons. **Expected:** existing painted assets appear both on the map and in icons, instead of old procedural drawings. Costs, footprints, services and selection remain unchanged.
6. Complete a chapter or earn Town recognition. **Expected:** neither gives a free castle. The existing **Reinforce Keep** action costs **100 stone + 80 gold** and switches the camp to the existing castle art. Save/load preserves it. Leave it alone if not choosing that upgrade.

## Music findings and choice

Four original recordings are about60seconds. The extended copies are97.7–125.3seconds; the extension script repeats selected passages with250ms crossfades. All eight decode cleanly, so no corrupt-MP3 diagnosis was established. No subjective listening audit or exact audible seam timestamps claimed. Owner chose original one-minute files instead of repairs. The bundle uses exact bytes from assets/v048/music-originals, with existing fades and zero artificial inter-track gap; extended copies and original synth source remain available for future work. No MP3 edited/re-encoded, no credits used.

## Graphics findings

The finished Chapel/School originals and runtime cutouts already existed. Map rendering and command icons bypassed them. The renderer now prefers those originals, with a fallback if absent/loading, without mutating simulation entities. Isolated renderer comparisons (not a full-town before/after):

| Building | Before | After |
| --- | --- | --- |
| Chapel | [Old drawing](validation/v052/chapel-before.png) | [Existing painted asset](validation/v052/chapel-after.png) |
| School | [Old drawing](validation/v052/school-before.png) | [Existing painted asset](validation/v052/school-after.png) |

## Compatibility and continuation

No schema or economic change: current schemas1–12 continue loading normally, and existing selected build orders remain valid. Old music style names/preferences migrate to the Leonardo playlist; original mute, volume, effects and voice settings are retained.

Feature branch ui/v052-player-control includes v0.50/v0.51 ancestors from PR74/a84743d. Owner/Claude decides integration after full final-head CI. See [asset/sound options](ART_AND_SOUND_OPTIONS.md), [plan notes](LEONARDO_PLAN_NOTES.md), and validation record for current gates.
