# Milestone 2: City Life & Economy

Authority: GitHub issue #1 and the owner's instruction to work independently through a tested PR. Base: f7222487b353731ffd818869f09cd58c19e273d7. Release approval is reserved until completion.

## Approach

Extend the existing engine and reuse its five-second economy cycle, resident workforce, food reserve, buildings, City Life panel, Advisor and Chronicle. A parallel economy would create inconsistent numbers; a wholesale engine rewrite would risk the working RTS. The following balance choices are implementation decisions, not additional owner requirements.

## Rules

- Eight initial residents live in the Keep. House occupancy is allocated from the remaining civilian population; show displaced residents if housing is lost. Residents and separately recruited tactical units are explicitly different cohorts. Reserve two residents for essential duties; staffed + idle + reserved equals civilian population.
- Houses start as cottages (8 spaces). Homestead/Townhouse/Manor retain existing service/beauty requirements and add two spaces per tier. Upgrade one level only after ten continuous game seconds of requirements, downgrade one level only after thirty seconds of unmet current requirements. Show progress and missing requirements. Food, nearby water and a usable nearby road are required for migration; add at most one resident per fifteen seconds. Food shortages cause gradual departures; no instant unexplained level changes or extra residents from feasts.
- Retain farm/fishery base output (13/9 per five seconds), scaled by assigned staffing. Staffed granaries on usable roads provide the existing 25% local producer bonus. Existing 90 baseline + 160 per granary storage is a shared reserve, shown as stock allocations, never duplicated inventory. Markets must be staffed and road connected to distribute food. Track opening stock + harvest + logistics + bakery net - exports - household delivery - overflow = closing stock. Show demand, unmet demand, reserve duration and bottlenecks. Bakeries consume and produce in proportion to staffing; no overflow creation.
- Prosperity becomes a bounded 0–100 indicator. Target contributions: housing quality 25, food reserves 25, job staffing 20, accessible services 20, happiness 10. Move up/down at most two points per economy cycle. Show every contribution and practical advice.
- All new and corrected City Life, housing, workforce and food displays read the engine's read-only snapshot. Reconcile obsolete Chronicle estimates. Use the existing City Life button and mutually exclusive panels, bounded to the viewport. Keep selection and minimap intact.

## Verification and delivery

Keep all fourteen prior Chromium checks. Add browser tests for gradual housing, occupancy totals, staffing arithmetic and proportional output, food accounting/storage/distribution, prosperity, pause/reset/service loss, panel accessibility, recruitment/minimap and five simulated minutes through the actual tick function. Test fixtures may inject starting resources/buildings and a private tick adapter into the served HTML; no test-only mutation API ships in production. Add PR CI, screenshots and repeatable commands. Road geometry and stabilized Construction/Units controller must remain byte-identical. Open a PR targeting main; do not merge or deploy.
