# v0.56 — First Harbour

Owner approved a functional coastal shipyard and the first buildable boat. Existing paid shipyard/ship art is reused; no new generation or purchases. A full scene ship image is clipped to its foreground at canvas-render time, like an atlas sprite; asset files remain unchanged.

## Playtest / Advisor Tester

Open **Journal & objectives → Open guide → Guide: Tester**. It contains these current manual checks:

1. **Construction → Shipyard**:120wood,90gold,40stone. Pan to the south coast. A near-shore click snaps to y755; inland/blocked/unfunded clicks spend nothing. Unselected gatherers retain their orders. Select a worker and right-click the foundation, or assign in **Menu → Worksites**. Construction takes60seconds with one map worker after travel.
2. **Menu → Fleet**, or inspect the completed Shipyard: order one boat for80wood+40gold. Two resident Shipwright jobs produce it in30full-staff active seconds; low staffing takes longer and a paused workplace waits. Each yard supports one boat/order; total fleet/orders limit20. Material payment occurs once. No automatic map-worker recruitment.
3. **Fleet → Sail west / Sail east / Stop / Return to berth**. Boats move at45map units/second through the southern sea band only. These are manual coastal controls; arbitrary map orders, rivers, sea trade and sea combat are later slices. Land units retain their orders. Fleet opens on request, not in the permanent top toolbar.
4. Save/Return during production or sailing. Progress/destination persists; Resume continues. Cancel an unfinished boat order to refund80wood+40gold once. If its yard is removed, an unfinished order refunds on next active tick. Launched boats survive and remain controllable through Fleet; an absent home berth disables Return.

Keep an earlier exported checkpoint if you may downgrade. Harbour saves use schema13; older versions cannot load them. Schemas1–12 remain loadable and gain no invented naval state. Earned Town charters and mixed commissions remain valid in schema13. New Game resets the harbour; restore invalidates held Fleet actions and closes it.

[Harbour browser preview](validation/v056/harbour.png) · [Narrow Fleet preview](validation/v056/fleet-mobile.png). These previews use funded test fixtures, not a free-resource gameplay mode. Version55's separate illustrated story screens, map clarity, original music and bells are retained.

## Validation and review

See [validation](validation/v056-first-harbour.md) and the PR for exact head/package/CI results. One fresh reviewer found an incoming coast-edge validation hole. A real browser RED accepted an x0 yard before the fix. Shared legal-coast validation now rejects edge/river yards and foundations before restore; the regression passes for0,river mouth and the actual world width. No second review loop.

## GitHub and release

This work is on ui/v056-first-harbour, separate from PR76/v055. Owner's release approval was given for delivered v055; it does not turn this unfinished branch into an approved production release. PR76 still requires successful CI, owner/Claude merge and successful main verification. Release workflow inputs must use that main run's ID and commit SHA, rollback=false,confirm=deploy. No main push, self-merge, production settings change or deployment performed.
