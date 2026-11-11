# Milestone 19 — A Living, Prosperous City

**Status: owner authorized implementation after Alex scope review, 2026-11-05.** Prepared 2026-11-05. Implementation proceeds separately under this authorization. PR #25 remains unchanged. No merge/deployment authorized.

## Baseline and intent

Use M18 candidate `2c37c7838cfa7e3dc20e2b7b934a69cddb9d97a0` as the planning reference. PR #25 remains unchanged and unmerged pending separate owner approval. After approval/integration, start implementation on a dedicated branch from the verified latest main; reconcile intervening changes first. Do not create a competing M18 implementation.

Make the existing food → storage/logistics → baking/export → household-service economy understandable and enjoyable to manage. Governors should see what is wrong, inspect its cause and take a reversible action without losing their place or issuing accidental unit orders.

Reviewed current `citySnapshot`, `cityBuildingDetails`, `cityAdvice`, workplace and trade APIs, M14/M15/M18 documentation and PR #24's Sand Labs Master Game Design at `0fab1018a0553cd3691f5cd472155672fb2a4dc2`. The master reflects M17 at compilation; its two-start wording does not override the five-start M18 candidate. Read proposed PR #23 art/world guidance previously; neither documentation PR is modified here.

## Approaches and recommendation

1. **Recommended: deepen the existing economy through direct controls, truthful feedback and measured balance.** Reuse current production/storage/staffing rules and save fields. The milestone delivers a useful Governor overview, five building panels and evidence that all starts support a playable growth route. Avoid changing rates until extended tests demonstrate a specific problem.
2. **Defer: add a new industry or split grain/bread inventories alongside the interface work.** This creates new balancing and save contracts before the current chain is fully legible, making results harder to assess. Consider it after M19 playtesting.

Alex recommended the existing-chain scope with three clarifications; the owner subsequently authorized its implementation.

## 1. Governor overview and actionable Advisor

Use the existing City Life entry/navigation for a Governor overview, with the current Village tools still reachable. Do not add a competing global menu or replace the compact HUD/world atlas in this milestone.

- Show actual governor/settlement/banner, population, food stock, happiness and gold using the existing snapshot. Add housing occupancy/capacity, civilian staffing, services, food-chain status and prosperity-factor links.
- Apply the approved Governor frame's card hierarchy, parchment text, brass headings, dark surfaces and forest action panels. Adapt cards to available width (for example two columns in the current desktop side panel and one on phones); this responsive interpretation is proposed, not an approved new full-screen layout.
- Clearly separate last completed five-second cycle, present staffing/eligibility and conditional reserve estimate. State that reserve duration assumes no new production and uses the displayed demand basis. Before the first cycle, show “Waiting for first cycle”, not invented output.
- Surface at most three useful Advisor items: unmet food/displacement first, then staffing/service/growth blockers and storage waste. Each item explains evidence and links to the relevant existing section or identified building. Missing/deleted targets fall back safely to the section.
- Prosperity is a score with actual factors; do not claim a trend without measured history. The initial scope shows current status and next achievable requirement rather than adding persistent history.
- No automatic spending, construction, staffing changes or camera movement on refresh. Keep map workers distinct from civilian staffing. Preserve current Advisor checklist and its access.

## 2. Building-specific controls: bounded first set

Start with **farm, fishery, granary, bakery and market**, using the approved building-menu visual structure beside the actual playable city. Keep house/clinic and other buildings' existing inspection paths; Advisor links may inspect these without requiring a complete panel redesign for every building.

- Common panel: name/ID, status, actual staffing, latest measured result, active blockers, next useful action, Close and Locate.
- Staffed sites reuse existing Open/Pause and High priority/Normal controls, retaining default food-first staffing and existing shortage/service warnings. No new manual worker-allocation model.
- Farm/fishery: base harvest versus measured output, current road/granary bonus eligibility and missing links.
- Granary: allocated share of the common food reserve, capacity, staffing and logistics connectivity. Clarify that granaries do not contain independent inventories; paused physical storage remains available under existing rules.
- Bakery: actual input/output/net food and baskets, granary/market prerequisites, export permission and food-reserve settings. Existing export settings are city-wide; clearly label that scope rather than implying a new per-bakery policy.
- Market: actual household reach/distribution, food savings, trade readiness and measured sales where current data supports it. Do not infer revenue by subtracting treasury balances that also include gathering and spending.
- Preserve existing construction/unit tabs, selection events, placement/Undo, Keep recruitment and keyboard controls. Inspecting a building must not silently cancel placement or reorder workers. Preserve focus/scroll through updates; close or invalidate a stale panel after destruction, restart or load.

## 3. Economic depth and balance boundary

Explain the existing trade-offs: food-first versus selected essential jobs, food reserves versus exports, staffed depots/roads versus raw production, and services versus premature housing expansion. Use the same readiness checks that actual production uses.

Keep the existing shared food pool, production/conversion rates, storage capacity, costs, job slots, immigration and prosperity formulas as the initial baseline. Document any reproducible dead end or misleading rule discovered during balancing, with before/after measurements and a narrow proposed correction. Material rate/rule changes come back to Alex/owner before implementation; ordinary confirmed bug fixes remain within the subsequently authorized scope. No unannounced balance rewrite.

## 4. Extended verification across all five starts

Test Marches Landing, Brookstead, Thornmere, Datehaven and Bell Shoal.

- Run a 30-simulation-minute baseline per start, recording reserves, harvest/logistics/baking/exports/consumption/overflow, staffing, population, occupied housing, services, happiness and prosperity. An unattended empty start need not prosper: document expected shortages instead of forcing every default to be self-sustaining.
- Within a separate 30-simulation-minute run, demonstrate a resource-funded guided growth route per start: gather/build through existing actions, grow above its own initial population, achieve occupied upgraded housing and maintain a final five-minute period without unmet food. Do not inject stocks, population or buildings to claim playability. Time acceleration alone is permitted in the test harness.
- At simulation checkpoints, save/restore and continue; compare meaningful state and outcomes with an uninterrupted reference, accounting for wall-clock metadata and the existing paused-on-load behavior.
- Preserve genuine legacy schema 1/2/3 fixtures and cover all three schema-four origins, priorities, paused workplaces, policies, selection/orders and camera restoration. No save schema change is planned.
- Exercise a bounded set of failure/recovery scenarios: shortage, overflow, lost road/service, workplace pause/priority reversal, and export reserve changes. Assert conservation and actual outcomes, not copies of implementation formulas.
- UI checks: 390×844, 1366×606 and 1440×900; keyboard/Space/focus, scrolling, live updates and controls remaining distinct from camera shortcuts. Compare approved Figma elements with actual responsive screenshots; no schematic viewport or placeholder stats become product assets.
- Pilot the long-run harness once and measure runtime before expanding the matrix; keep the normal CI budget viable. Run focused tests while developing, then one final full regression run and the five exact-source packaged smokes. No repeated unchanged broad suites merely for reassurance.

## Design references and explicit exclusions

Figma file: https://www.figma.com/design/PmPh834ycCYkyDzeYrRdAi

Read node `3:27` (Governor Dashboard) and `3:68` (Smithy Building Menu) with design context and screenshots. Use their existing visual direction in the current HTML/CSS/Canvas stack; no React/Tailwind migration or paid dependency. Existing reusable controls/styles take precedence where they can express the design. Font/assets must be checked before implementation; no new remote runtime font/asset dependency is assumed.

The Smithy frame explicitly says future concept. Its iron tools, levels, upgrade prices and Coin are excluded. Dashboard sample population, “12 weeks reserve”, “+42 weekly” and its positive prosperity claim are examples, not simulation requirements. No fabricated weekly income/calendar mapping. Atlas and compact HUD redesign, new industries/inventories, new currencies/taxes/wages, warfare, diplomacy, multiplayer, paid services and architectural changes are excluded.

## Delivery and review gates

After scope/implementation authorization: separate feature branch; small verified changes; fresh code review; draft PR with exact SHA, screenshots, clean full CI, source-verified playable download, balance matrix and known limitations. Preserve audio/graphics/roads/camera/fullscreen/selection and all existing saves. Alex reviews independently; owner separately authorizes every merge and deployment.

## Scope review

A fresh read-only builder check found no blocking contradictions. Its suggested finite growth horizon is incorporated above. Explicit owner approval of all four Figma designs is recorded in the conversation; their example mechanics remain excluded. Measured market-sales telemetry stays conditional on data already exposed by the simulation. This review does not authorize implementation.

**Scope decision:** Alex recommended this bounded existing-chain scope; owner authorization and the three binding clarifications are recorded below. No merge or deployment approval is implied.

## Authorized clarifications and branch arrangement

Building panels call the existing workplace operations as the single source of truth; no duplicated staffing/pause/priority logic. Guided growth uses legitimate gameplay and distinguishes script failures, valid choices and genuine balance defects; thirty minutes means simulation time. The dashboard stays unobtrusive and responsive, preserving construction/camera/selection/keyboard controls. Implementation order: measurements, Governor/Advisor, five building panels, extended verification.

PR #25 is still unmerged. M19 is isolated on `feat/m19-living-prosperous-city`, based on its verified head `2c37c7838cfa7e3dc20e2b7b934a69cddb9d97a0`; its eventual draft PR is stacked against the M18 branch until separate owner-approved integration. This does not change or merge PR #25.
