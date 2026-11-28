# v0.70 candidate — Hearths and Homecoming

Owner supplied all media28 November2026 and requested integration plus a stronger graphics/gameplay direction for subsequent versions. Dependent on0.69 source PR93; no protected game merge/release.

## Included media
- A Hearth for Every Family:7.292s.
- Market Day:7.292s.
- The Village Grows:7.292s.
- The Defenders Return (parade):6.583s.
- Crown Anthem I:120.033s; Crown Anthem II:119.980s; Roman Rebuilding:170.005s. Neutral titles for first two explicitly approved by owner; do not label one Greek based on its filename.

Original source bytes/hashes and archive filenames: assets/v070/inventory.json. MP4 originals preserved; optimized VP9/WebM presentation copies omit audio because the game soundtrack plays beneath them. MP3 originals remain byte-for-byte unchanged. No duplicate uploads found. The prompt duration is not the output duration: two files named four-minute anthem are actually two minutes; Roman prompt requested3min but produced2:50.

## Behavior
Homes/Market/Growth use actual films in place of corresponding cards. Captions/subtitles remain matching Georgia Italic22px, ivory, transparent backgrounds. Parade celebrates the first cleared dispatched land raid with a surviving Keep and no remaining live enemy units; per-city presentation receipt, no resource bonus. Menu → Films & new music lets owner replay all four and select/listen to the new recordings without changing city progress. Replay and automatic queues must not overlap; restoring a city cancels old playback/queue.

Music retains existing originals and actual native file durations; no synthetic extension or enforced60second cutoff. Next/mute/volume remain native. Audio controller is now sourced in src/v070/audio-controller.js instead of hand-editing the generated page.

## Check in30seconds
1. Menu → Films & new music → play Homes/Market/Growth/Parade: correct footage, matching italic subtitles, no black strip. Escape closes; prior pause state returns.
2. Select each new recording: native audio starts after interaction; displayed names/durations match above. Mute and next track work.
3. Queue/restore tests prove no previous city's film appears later. Parade must not play merely when a raid begins or while attackers remain.

## Next-version direction and unfinished narration
Read FUTURE_VISUAL_GAMEPLAY_UPGRADES.md: larger buildings, reliable zoom/camera/hit testing, richer coherent map, then consequential economy/defence progression. These are future proposals, not changes included in0.70. Stored art briefs/concept are available; exact other-game screenshots not located.

Owner also requested spoken narration for all video subtitles. No narrator recordings supplied; natural voice sample/provider and timing/mix work remain pending. Do not describe films as having subtitle voiceover. No new Leonardo generation/credits by this agent. Source review/fullCI/owner-approval gates remain for production; separate owner-requested Sand Labs playtest only.
