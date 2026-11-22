# v0.56 validation — First Harbour

Base3252d57/v055, isolated linked worktree on ui/v056-first-harbour. Design/plan under docs/superpowers. v055 production candidate/PR76 preserved separately.

- New harbour production, real costs, selected builders, sea navigation, queued/voyage saves, cancellation, orphan boats, native Construction/Fleet, restore-held actions, narrow Fleet, malformed schema/IDs/targets:7 browser flow checks passed after integration.
- Review regression: one fresh read-only reviewer proved an edge-yard restore could launch outside water. Browser RED reproduced x0 acceptance. Shared coast guard used by placement, incoming building/site validation and live-yard lookup. Final edge test1/1 rejectsx0,river mouth and actual world width, atomically. The test initially used1280 as an assumed world width; corrected to save.world.width because1280 is a legal position in this world.
- Existing construction/save/charter/funded mixed-route group43/43; includes earned Town charter migrating to schema13. Separate charter13 regression1/1 also passed before the group.
- Existing civic art/renderer/release pipeline26/26.
- Current manual Advisor Tester Next without world mutation1/1.
- Initial expected missing-API RED, staffing-role-order omission and presentation syntax failure were resolved before green flow checks. All script blocks parse; embed/diff checks pass.
- Paid media blocks, full story and audio untouched. No new media files, API usage, token spending or production rights.
- Desktop harbour and390px Fleet previews inspected using funded browser test fixtures. The full-scene ship asset is masked at runtime to avoid a rectangular scene tile on the map; no asset bytes edited.

Final committed-source build, package smoke and full exact-head GitHub CI are recorded in the candidate PR. Local checks alone do not authorize merge readiness. No merge/main push/deployment. Naval movement is deliberately limited to the convex southern coastal band; river/general water pathfinding, arbitrary map fleet selection, trade/combat are not implemented in this slice.
