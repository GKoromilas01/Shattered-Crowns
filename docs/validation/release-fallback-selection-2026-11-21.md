# Release fallback diagnostic —21November2026

Read-only investigation authorized by the owner. Existing PR70/controller head`edf24c971223728602e576688d688c2f0119d546`. Diagnostic branch`probe/fallback-selection-codex`; implementation`5feb2bf349a8a6d9920c3e63694cd4be9d117c9e`. No release, merge, game/media edits, PR70 changes, probe branch deletion or release-check bypass.

## Result

**PR70 does not fix the observed API omission.** At14:24Athens time, the same Actions job queried the exact workflow-specific endpoint using the standard repository GitHub Actions token/API version. Both filtered queries omitted the known successful v0.47 run. The unfiltered query included it and the unchanged client-side successful-run predicate selected it correctly. Every response fit on the first page (`Link:null`), so this observation is not a pagination miss.

| Actual workflow query | Results | Selected fallback |
| --- | ---: | --- |
| `runs?status=success&per_page=100` |32|44777198395 (older release)|
| `runs?status=completed&per_page=100` (PR70) |37|44777198395 (older release)|
| `runs?per_page=100` + existing client-side success predicate |38|44864060304 (v0.47)|

[Actions evidence44903683249](https://github.com/GKoromilas01/Shattered-Crowns/actions/runs/44903683249) · [Initial two-query probe44903470015](https://github.com/GKoromilas01/Shattered-Crowns/actions/runs/44903470015) · [Trimmed machine-readable evidence](release-fallback-selection-evidence-2026-11-21.json).

The probe is intentionally red because its assertion asks whether **the current PR70** selects the known stable release; it demonstrably does not. This is not a release attempt. Its regression/existing release-integrity test step passed **31/31**, locally and in Actions. The third, unfiltered candidate selected the expected stable run and passed existing `assertStableReleaseRun` validation.

## Bytes and safety

The job downloaded the published archive and current live game independently. Both yielded13,666,996 decoded bytes, SHA256`b65a3942c280981001f60b9bb09fae9a4574be0a512985f3dd3eafe8f6c6dfcf`. Live used the real`?preflight=` request and gzip, with9,786,728encoded bytes; decoded body arrived in286ms. The archive download took325ms. No timeout/truncation/compression difference was reproduced.

Live metadata and bytes passed the **unchanged** existing`assertLiveSite` against the stable archive’s manifest. Direct GET of run44864060304 confirms successful completed main/workflow_dispatch/verified-pages-release provenance. Its published archive is not provisional. This supports wrong fallback discovery, not corrupted live media, as the problem.

## Concrete proposed correction — not applied

[Unapplied one-line patch](pr70-unfiltered-query-proposal.patch): relative to PR70, remove`status=completed&` from the history URL and retain its `r.conclusion==='success'` predicate. Keep `assertStableReleaseRun`, candidate checks, main/environment protections, exact live-byte/metadata matching and restore behavior unchanged. The existing provenance validator continues to require completion/success on the selected run.

`git apply --check docs/validation/pr70-unfiltered-query-proposal.patch` validates against this checkout. It has **not** been applied to the release controller, PR70 or main. Owner approval is required before making that controller change. A corrected candidate still needs its normal full CI; green general CI alone cannot prove what a live API listing returns.

This is a point-in-time verification of the observed problem, not proof against future API omissions. Existing pagination/100-entry discovery behavior is unchanged by the proposed one-line correction. Any broader fallback-discovery redesign needs separate review.

## Other handoff observations

PR70 CI44900988074 was still running at the last check; no full-CI success is claimed. The stable manifest still labels its artifact version`0.28.0` despite the gameplay being calledv0.47; this metadata drift is separate from the proven fallback selection issue and has not been changed here.

The latest Claude handoff supersedes the old unfinished Ashford work. Keep`feat/v049-prep`, painted art, embedded audio/video and Leonardo assets intact. No further gameplay/version work is included in this diagnostic.
