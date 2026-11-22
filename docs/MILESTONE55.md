# v0.55 — Between the Chapters

Owner rejected the frozen-video narration presentation and explicitly confirmed restoring separate dark story screens between videos. The full story must remain. Owner also requested a small existing game graphic on those screens, pending longer videos later.

## Current opening

New Game → village choice → original video with short subtitle → separate dark story screen (when that clip has a longer passage) → next original video → town. Return to Game still skips the opening. No frozen movie frame is visible behind narration.

Story screens use the existing painted survivors' camp as a small decorative emblem, centred gold headings, warm serif text and a faint background glow. Existing gentle fades and reduced-motion handling remain. Full story words, all seven video files, reading times, captions, keyboard access and background-tab timing are unchanged. There are no visible Skip/Pause/Continue buttons and no subtitle strip. A missing decorative image is removed so the passage remains readable.

Map clarity, painted bridge, town/school bells, selected workers, original music and saves retain v054 behavior. No new assets, purchases, simulation rules or schema changes. This is a focused presentation correction; the next naval slice remains documented in Milestone54.

## Advisor Tester

**Journal & objectives → Open guide → Guide: Tester** contains these current manual checks:

1. Start New Game and choose a village. Short subtitles sit over the clips without visible story controls or the dark subtitle strip.
2. At a longer passage, the video image disappears behind a separate dark screen. The existing painted camp emblem appears above the heading and the full story text. Gentle fades remain; reduced motion removes drift.
3. Let the whole opening finish. All videos/passages remain; the town opens with the advisor if requested. Return to Game bypasses the opening.

## Implementation and validation

The current freeze came from the narration panel's transparent background while the ended video remained visible. Restore an opaque story surface and hide the ended video during prose; retain the existing state machine and foreground reading clock. Reuse camp art rather than generating a new crown asset. This follows the owner's explicit choice and requests, without another design approval loop.

Browser RED reproduced a transparent panel where the restored dark screen was expected. Final browser/entry/restore/keyboard, current Tester, pipeline and committed-package results are reported in PR76. [Actual browser preview](validation/v055/story-screen.png). No merge or deployment.
