# v0.52 validation — Your Workers, Your Orders

Candidate based on v0.51/a84743d (PR74). PR74 full CI44983574739 completed successfully on that exact head. No merge/deployment performed.

## Functional evidence

- Production-default selected-builder test (no scNoAutoBuilders fixture suppression), Leonardo-only preference migration/rotation, exact embedded original MP3 bytes, and native Journal→Guide→Tester checks passed. User-defined manual tester Next changes no city state.
- Chapel/School map and command images use the existing paid sources, with immutable building fixtures. Renderer before/after PNGs under v052/ are isolated-object comparisons, not full-town captures.
- New feature plus final review regression group: **10/10**. Includes native delayed-image-load fallback/repaint and audio restart timing after music-off, mute and a simulated visibility event.
- Existing construction, worker follow-up/manual priority, pending saves across origins, camp/reinforcement and paused legacy render checks: **20/20**.
- Final wider sound/opening/archive and release-pipeline checks after fixes: **50/50**. Actual audio graph signal, default useful level, mute/zero silence, headroom, preferences, keyboard entry and archived composition/envelope assertions retained. The archived synth probe renders one bar explicitly in test code; regular playback never selects it.
- Native Tester opens on request, selects Tester mode, shows v052's current instructions and advances manually without a city-state change: **1/1** within the new group and separately checked.

## Fresh review and corrections

One fresh read-only reviewer found two Important issues. Both reproduced with failing tests before fixes:

1. Paid command icons returned no fallback while decoding and the real button was not repainted on load. The renderer now supplies the existing fallback immediately and emits an image-ready event; native command presentation repaints that icon. Actual DOM test avoids polling the renderer helper.
2. Returning from mute/music-off/hidden restarted the file at zero using its old rotation clock. File stop/start now resets transport timing and fade state together; a restart receives a full recording window. This restarts the track rather than resuming its previous position. Rotation stops the old file before scheduling the next; no artificial default gap.

Final review regression group10/10 and wider sound/pipeline50/50 passed after corrections. No second reviewer loop.

Deferred minor: the Sound panel's generic “Original synthesized sounds” footnote has old wording. Synthesized effects remain, but active music is verified Leonardo original files. Inherited v051 atlas-caption minors remain in its validation record; no new atlas behavior here.

## Media and diagnosis

- All art source/runtime files unchanged; sc47Art block byte-identical to v051 (SHA256170ff4c4bf3a2d7a406864bcc4bb146b669fe8ab71e58ed3f4bba0d5e64b981d).
- All7video data URIs unchanged; media loader unchanged.
- Four music payloads match exact v048 original MP3 bytes, no edits/re-encoding. Files approximately60.0seconds,128kbps,44.1kHz stereo. Old compressed files, extended copies and synth source remain archived.
- All originals and extended copies decode without FFmpeg errors. The repeat/crossfade extension script is a plausible cause of the owner's perceived seams, not evidence of corrupt MP3s or a subjective listening audit.
- Self-contained index reduced from21,410,525bytes to approximately17.2MB by selecting originals instead of the extended copies; no new asset credits/generation/purchases.

## Implementation rulings

- Explicit user requests and continuation authorization define this bug-fix bundle; no additional design approval loop or new large system.
- Existing explicit builder follow-up remains; only fallback recruitment of unselected workers is removed. Existing saved build orders are preserved, since prior gathering targets cannot be invented.
- Legacy style tests now check the authorized Leonardo-only migration while retaining audible signal, sound controls and original synth-composition tests. One archived bar matches the former live scheduling scope; the separate16-bar strings preview remains.
- Navigation receives its own30-second budget where relevant, retaining existing action deadlines; embedded self-contained media can otherwise exceed a6-second page-load allowance under CPU contention.

## Delivery gates

Final committed-source package smoke and full final-head GitHub CI are reported in the candidate PR when complete. No clean-CI/merge readiness claimed until required checks pass. No main push, merge or deployment; owner/Claude decides integration of the combined v050/v051/v052 candidate.
