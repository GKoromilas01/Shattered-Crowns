# Milestone 9 owner-playtest follow-up

The owner tested PR #14's v0.9.0 ZIP and requested removal of the opening music-preview control, music during gameplay, visible map access and guidance before choosing a starting home.

## Diagnosis

A real-browser comparison on the original candidate showed that enabled music continues after title dismissal (nonzero measured output after 0.5, 5.5 and 10.5 seconds). Clicking the opening preview twice, however, persists `music:false` while leaving effects enabled. Entering the city preserves that setting and remains musically silent. This reproduces one path matching the reported symptom; it does not prove which setting or browser condition existed on the owner's device. No speculative gain boost or claimed engine scheduler failure is introduced.

## Resulting behavior

- No opening music-preview button. The title and starting guide stay silent; enabled music unlocks only when actually entering the city, including keyboard activation and Begin as governor.
- A visible **Music on/off** control in the city toolbar reflects the existing settings. A deliberate click can re-enable music saved as off, or unmute/restore nonzero volume if necessary. It does not change effects or music style. Ordinary entry preserves all saved sound choices. Menu → Sound retains detailed controls and Enable sound & test.
- **World map** is the first city-toolbar action, with mouse and native Space/Enter activation. Menu map entries and minimum-zoom entry remain available.
- The primary title action is **Choose your starting place**. A compact guide shows continent, kingdom and village/city fields, with only the real home enabled. Other continent/settlement options are explicitly future/inspection-only. It can inspect the world before city entry, return to starting choices, or begin as governor. It never creates a different city or claims other regions are playable.
- The existing Enter city and Advisor paths remain on the initial title. Back to title returns from the chooser without starting the simulation. City state stays frozen during pre-entry atlas browsing; Escape restores focus to the guide. The illustration is retained.

## Regression development

Seven missing-behavior cases failed before implementation; the existing enabled-music gameplay-continuity case already passed. Eight follow-up browser cases cover opening silence/removal, chooser fields and honest availability, pre-entry map/return, visible map controls at three sizes, native keyboard activation, saved music-off recovery without changing effects, sustained gameplay music, and missing Web Audio. The first implementation exposed two real integration failures: the critical title CSS also hid the pre-entry dialog, and Space on new toolbar buttons reached legacy Pause handling. The failing cases passed after a more specific dialog visibility rule and a scoped native-Space guard. Back-to-title navigation had its own failing-then-passing regression.

Existing audio and presentation assertions are updated only where the requested removal changes the interface: test the in-game music control instead of the removed preview; check a quiet opening and actual music after entry. Melody timing, cue behavior, gains/headroom, bounded voices, preferences and missing-audio checks remain. No save format, city-economy, roads or audio-score changes.

Final focused/full/package evidence and pinned candidate download are recorded in PR #14. Independent review and real screenshots accompany the completed candidate; physical Windows listening remains owner feedback rather than Linux browser certification.

Fresh focused read-only review found no Critical, Important or Minor findings. It inspected the regenerated compact chooser and city toolbar at phone/desktop sizes. Physical Windows audibility was explicitly left to owner listening feedback. A focused-run failure was traced to the new test's inherited five-second page-load budget, before any interaction or application assertion; browser logs had no JavaScript errors. The navigation budget is now thirty seconds, while control/assertion timeouts remain five seconds. This does not change product code or relax any gameplay assertion.

The navigation case passed in isolation after that harness change (1/1, 3.9 seconds). Fresh complete-suite evidence follows before PR handoff; no product changes were made after the review.

[Compact starting guide](../screenshots/m9-start-choices-390.png) · [Visible city map/music controls](../screenshots/m9-city-controls-1366.png). These are actual game screenshots.
