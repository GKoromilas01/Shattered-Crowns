# Construction, music and opening-screen polish — v0.8.1

Giannis reported clipped Construction choices in a Windows screenshot, requested fuller music, and reported the map/units appearing before the title. His standing instruction delegates routine implementation decisions and requests reviewable results, with explicit approval still required for merge/deploy/spending.

## Approach

Repair the existing command strip rather than changing placement or roads: suppress its native horizontal scrollbar (which takes height from centered cards), keep wheel/touch/keyboard scrolling, and add separate previous/next buttons with fully sized cards. Avoid increasing the 88px HUD and disturbing existing map/panel clearances. The previous scroll-only presentation caused the confirmed clip; a multi-row palette would unnecessarily reduce the playable map.

Add an original, quiet melodic city theme using the current Web Audio engine: a16bar,72bpm theme, soft plucked arpeggios, bass, sustained harmony and sparse melody. Keep original ambience as a separate style option, preserving existing four-field sound preferences and separate music/effects/master controls. Persist style independently. No licensed media/dependency/network request. The owner explicitly asked to evolve the previously approved ambient-only music; melody and mix remain subject to listening feedback.

Make the opening dialog static first-body markup with critical first-paint CSS, before engine scripts. It covers the city until initialization completes and the player chooses Enter city/Advisor. Default page openings show the title consistently; the old Advisor-intro seen key still records the choice, but no longer bypasses the title. Use the approved original city illustration as an embedded, optimized WebP background; this is title art, not a new gameplay renderer. Buttons stay disabled until ready; loading/error status must not expose an interactive half-built game. Keep native keyboard focus and safe unavailable-audio behavior, saves and scenarios.

## Acceptance

- Native-scrollbar tests at1366x606,1440x900,768x800,390x844: card rectangles fit vertically, icon/label/cost are visible, arrows expose all choices, focus and touch scrolling work. No road/controller/placement changes.
- Real oscillator scheduling includes melody, accompaniment and variation; switching style, mute, volume0, hidden pages and repeated toggles stop future notes and keep voice count bounded. Old preferences load unchanged. Generate WAV preview from the same score/voices for listening.
- A deliberately streamed partial HTML response must show the title, not the map, before late scripts arrive; clock waits. Enter/Advisor transition once; reloads show the title. Screenshot at desktop/mobile. No external requests for title art or audio; extracted build works as index.html.
- Full existing regression suite, package verification/smoke, read-only whole-branch review, then open PR and a verified downloadable test build. No merge/deploy/spend.
