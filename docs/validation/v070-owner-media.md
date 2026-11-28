# v0.70 media verification

Base0.69 f48eec9; branch feat/owner-cinematics. Owner uploaded7ZIPs containing4MP4s +3MP3s, all unique SHA256. Real durations and originals/runtime hashes: assets/v070/inventory.json. Representative frame at2s inspected in each film; correct scenes identified, no caption text visible in inspected frames. Three decoded-audio fingerprints also differ; no duplicate music recordings found. Neutral Crown Anthem I/II naming explicitly approved by owner. No lyrics/language or narrator quality claims inferred from filenames.

## Red→Green evidence
- Initial five browser regressions failed on missing media/playlist/replay/parade APIs and serial milestone playback. After integration all5passed, including actual decoding, native MP3 duration/signal and exact music bytes.
- Changing a replay mid-film reproduced stuck pause; immediate prior cleanup fixes pause ownership. Full owner+retained first-scenes/milestones/settlement/player-control run25/25passed.
- Independent review found a fade race: done=true blocked cancellation while600ms cleanup remained scheduled, allowing stale pause restoration after city restore or duplicate overlays on replacement. Two new tests reproduced old overlay count1 vs0 and2 vs1. Fix tracks cleanup separately, clears timeout, allows immediate teardown during fading and verifies scene epoch/city before resume/callback.
- Final fade/owner/retained runs recorded below once complete. No full-suite success claimed.

## Scope limits
No recorded narrator supplied; script prepared in NARRATION_SCRIPT_V070.md, voice sample/provider still pending. Existing footage/movie audio remains muted under game music. Graphics/zoom/gameplay expansion is subsequent-version direction in FUTURE_VISUAL_GAMEPLAY_UPGRADES.md, not a delivered renderer upgrade.

Source PR/packaged exact hashes and Sand Labs playtest publication will be recorded at handoff. No protected game merge/release; required exact-head full CI must be checked before production release.

Final fade/owner/first-scenes/settlement command20/20passed, including both independently reviewed fade regressions. Corrected14-track rotation focused rerun1/1passed. Owner requested immediate ZIP/checkpoint due chat-credit limit; remaining native command/full requiredCI/broad exact packaged smoke must be handled from START-HERE-CLAUDE.md.
