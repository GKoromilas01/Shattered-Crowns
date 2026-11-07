# City Management and Released Advisor Integration Plan

> Execute inline with existing TDD/verification workflow and one fresh final review. Owner said to proceed; existing M19 scope is owner-authorized. No changes to original PR26 branch or main; no deployment.

**Goal:** Combine existing PR26 city-management work with verified governor/advisor integration PR28.
**Architecture:** Merge origin/feat/m19-living-prosperous-city (bcf8288) into a new branch based on PR28 (69ee439). Keep the released Advisor as an optional dialog and the grounded Governor report inside City Life; both consume current snapshots. Preserve existing operations as the single source of truth.
**Tech Stack:** Existing self-contained HTML/Canvas/SVG, Node24/Playwright1.57; no dependencies.
**Specs:** docs/superpowers/specs/2026-11-05-living-prosperous-city-design.md and docs/superpowers/specs/2026-11-07-city-advisor-design.md.

## Global Constraints
Original PR25/26/28 branches unchanged. Stack the new draft against PR28 while it awaits separate integration approval. No main merge, deployment, rate/cost/job-slot changes, new save schema or new service. Retain Advisor live refresh/native activation and five-origin/schema-four contracts. Incoming starvation-timer clamp is an ordinary confirmed save bug fix, not a change to population behavior.

## Review Focus
- Governor reports and released Advisor both reflect current measured state without fabricated trends or automatic orders.
- Inspecting or reviewing must preserve orders, armed placement, camera and Pause as their action contracts require.
- Workplace controls invoke existing operations exactly once and reject stale activation after restore/start.
- Thirty-minute baseline/guided routes use actual resources and retain valid saves at minimum population.
- The stacked PR describes its dependency and does not claim a main-base integration/deployment.

## Tasks
- [ ] Add tests/city-management-advisor.test.cjs: missing Governor model/action and starvation checkpoint validity fail on PR28, with no injected stocks/population/buildings.
- [ ] Merge existing PR26 locally. Preserve the released Advisor and existing five-origin tests; run focused Advisor/Governor/workplace/long-run cases and inspect responsive screenshots.
- [ ] Run the full npm test suite and obtain a fresh independent review; address confirmed important findings with reproductions. Keep economic reports and original test assertions.
- [ ] Commit frozen source, verify build/package and five packaged smokes; push only the new branch and open a stacked review draft. Record exact-source CI and dependency limits. Leave main and production unchanged.
