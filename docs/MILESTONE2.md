# Milestone 2 — City Life & Economy

Implements [issue #1](https://github.com/GKoromilas01/Shattered-Crowns/issues/1), based on stabilized commit `f7222487b353731ffd818869f09cd58c19e273d7`. Work is isolated on `feat/city-life-economy`; release requires approval.

## Gameplay changes

- The initial eight civilian residents live in the Keep. Houses show real occupancy, capacity, tier, pending development and missing requirements. New arrivals use only vacant homes with food, water and connected roads. One resident arrives per 15 seconds of sustained conditions. Existing occupants stay when services lapse; lost capacity is shown as displacement and causes gradual departures if serviced housing cannot be restored.
- Cottages hold eight residents; Homestead, Townhouse and Manor hold ten, twelve and fourteen. Each upgrade needs ten continuous game seconds of its services; deterioration needs thirty seconds per tier. Higher tiers retain the existing health, road, market and beauty requirements. Feasts improve morale but no longer create residents outside housing rules.
- Farms/fisheries retain their 13/9 food base production per five seconds, multiplied by actual civilian staffing. Staffed, connected granaries provide the existing local 25% logistics bonus. Shared storage remains 90 base + 160 per granary. Granary stock allocations add up to the actual city reserve; inventories are never counted twice.
- A visible ledger reconciles opening food + harvest + logistics + net bakery output − exports − household delivery − overflow = closing food. Show unmet demand, reserve duration, staffed market coverage and storage bottlenecks. Half-staffed bakeries scale both food inputs and outputs. Existing ration/export controls still apply.
- Civilian staffing + idle residents + two reserved for essential duties equals population. Map workers and soldiers are a separate recruited cohort, explicitly labelled. Chronicle's contradictory capacity/workforce estimates now use actual assignments.
- Prosperity is bounded to 0–100 and moves gradually toward explained contributions: housing quality 25, food reserves 25, staffing 20, accessible services 20, happiness 10. Existing festivals can still give their explicit +4 celebration bonus, capped at 100. Advisor gives actions from the same snapshot.
- The existing City Life button opens a bounded, scrollable panel with an explicit close control. House inspection preserves keyboard focus. City panels block edge-camera movement while being read. The existing minimap is reachable above the battlefield instead of hidden behind the command bar.

## Regression constraints

The road planner/placement block and `sc140UnifiedUI` Construction/Units controller are byte-identical to stabilized main. The original fourteen tests and assertions remain intact. Road SHA-256: `65945570c75e0414d8bf089652f2217955551c2062ff4345054d3d735488d6f8`; controller SHA-256: `f5c5e1658e5aadf6f175f6d1398b029fbdc3b05a6aa8c6fa5e84e32f44531be5`.

## Repeatable verification

```sh
npm ci
npx playwright install --with-deps chromium
npm test
```

The managed workspace uses the already installed Playwright 1.57.0 and system Chromium:

```sh
NODE_PATH=/opt/codex/cua_node/lib/node_modules npm test
```

Fourteen milestone scenarios cover gradual housing and occupancy, proportional staffing/production, storage/distribution/bakery accounting, prosperity/service loss, five simulated minutes with active AI, recruitment, displacement/reset, pause, Chronicle consistency, actual palette construction and road drawing, partial bakery staffing, lost granaries, migration isolation, keyboard focus, Advisor consistency, and panel/minimap/camera interaction at 1440, 1024 and 768 pixels. Every browser scenario rejects uncaught JavaScript errors.

The five-minute simulation advances the production engine's tick in 0.25-second steps. Test-only response fixtures provide a starting construction budget, neighborhood and three defensive fortresses. The real economy, unit movement, AI and recruitment run; there is no shipped tick/mutation API. This is an accelerated simulation, not five minutes of wall-clock rendering or a complete balance certification. A separate browser test builds a growing settlement through actual palette clicks and a real road gesture.

Review found migration into unserviced housing and keyboard focus loss. Both had failing browser regressions before fixes. Further browser inspection caught panel-edge camera drift and duplicate legacy Advisor guidance; both were reproduced and corrected.

## Verified result

Final local full run: **28 passed, 0 failed, 0 skipped**, 167.0 seconds, Playwright 1.57.0 with Chromium 154.0.8037.57. This includes all original fourteen checks, unchanged, and fourteen milestone scenarios. Zero uncaught JavaScript errors. `git diff --check` and JavaScript syntax checks passed. [Full test output](validation/chromium-milestone2.txt).

The earlier single-fortress five-minute fixture could lose to normal enemy raids, ending the battle early. The final scenario uses three defensive fortresses, within its test starting-resource budget, keeps AI active and asserts all sixty economy cycles complete. Warfare balance itself is unchanged.

## Screenshots

- [City Life at 1440px](screenshots/city-life-1440.png)
- [City Life at 1024px](screenshots/city-life-1024.png)
- [City Life at 768px](screenshots/city-life-768.png)
- [Prosperity and staffing](screenshots/prosperity-1440.png)

## Release limits

Chromium desktop coverage only. Firefox, WebKit and touch input have not been certified; extended economy/warfare balance still needs broader playtesting. Distribution uses the existing shared city reserve rather than physical cart inventories. PR CI runs all tests and uploads output/screenshots; making that check mandatory through branch protection remains a repository setting. The existing main-triggered GitHub Pages hosting configuration is unchanged. This branch must not be merged/deployed without the owner's release approval.
