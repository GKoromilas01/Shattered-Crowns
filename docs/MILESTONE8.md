# Version 0.8.0 — City Planning & Economy Clarity

Milestone 8 builds on PR #11's v0.7.0 (`d5cb8ca`). It improves planning with the current economy and art palette; it does not replace the simulation or renderer.

## Plan the next neighborhood

Open **City Life** for four compact summaries:

- **Food:** measured production minus household demand during the last five-second cycle, before storage overflow. Unmet meals, overflow lost and the actual reserve change are separate figures. Before the first cycle, the panel says it is waiting for measurement. Reserve seconds exclude future production.
- **Housing:** residents/capacity, displacement, total vacant spaces and the engine's current migration explanation. Vacant space still needs services before residents can move in.
- **Employment:** staffed/available jobs, unfilled jobs, idle residents and essential duties. Recruited map workers remain separate from the civilian workforce.
- **Home services:** water, healthcare and market readiness across all built houses, including vacant ones. These counts show service availability now; last-cycle household meals remain in the detailed ledger.

Food, Housing, Employment and Satisfaction buttons navigate directly to their existing detailed sections. Keyboard focus and expanded building details survive live updates. Space activates focused controls without reaching the game Pause shortcut. If a focused building disappears, focus returns to a visible Housing or Employment heading with an explanation. The panel uses the existing forest-green, cream and warm-gold palette with consistent borders, spacing and focus outlines. Cards stack on narrow screens.

House and workplace details include **Locate**. It centers the current living building at the existing zoom and closes City Life. It retains selected units, their orders, armed construction and Pause. Location never builds or spends; click the building normally to inspect it. If a building disappears before activation, the panel stays open with a message. Enemy buildings and invalid IDs cannot be located through this city-planning action.

Representative UI captures: [390px overview](screenshots/m8-overview-390.png) · [1440px overview](screenshots/m8-overview-1440.png).

## Milestone 7 correction

The title screen's opening-music preview now reflects the audio controller's settings rather than retaining a separate, stale pressed state. Muting sound clears its playing indication, and browsers without Web Audio get a disabled “Music unavailable” button. The ambient chords, timing, gain and selection cues are unchanged.

## Compatibility and limits

Peaceful city remains the default; classic skirmish, kingdom overview, construction, roads/costs/undo, recruitment, camera controls, full-screen behavior and save safeguards are retained. No save schema or storage key changes. The real released v0.6 checkpoint remains a regression fixture. `tests/fixtures/city-v070.json` was captured from the exact PR #11 merge source, without replacing engine logic, to verify v0.7 campaign restoration into v0.8. No balance rules, trade, diplomacy, AI, accounts, dependencies or paid assets are added.

This is a focused usability milestone, not the proposed full playable art-direction upgrade. Real-device touch behavior and long-campaign balance still need human playtesting. Selection sounds remain provisional; the approved gentle ambience is preserved.

## Verification

Run the README's full suite, then build/verify the exact committed candidate and smoke-test `dist`. The PR records fresh counts, browser versions, candidate SHA and CI evidence. Local verification may explicitly use installed Chromium; CI uses Playwright 1.57.0's pinned Chromium. Source, packaged and live checks are separate evidence and must not be conflated.

No merge, deployment or expenditure is authorized by this milestone.
