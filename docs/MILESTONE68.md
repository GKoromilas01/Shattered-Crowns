# v0.68 candidate — First Winter

Owner-approved settlement-focused next version. This branch starts at main v0.66; v0.67 is a separate unfinished/fix branch and is not replaced or merged here.

## Visible changes
1. Select your **Keep → Begin First Winter**. Optional charter, six actual readiness checks, a countdown of about24 active minutes at normal relaxed pace. The ordinary sandbox remains playable.
2. At about6/12/18 active minutes, review the Keep's **Winter council**: food caravan (40gold→30food), cold snap (30wood→+8happiness or conserve with−8happiness), stone merchant (25gold→30stone). Costs are checked at click time; each decision commits once. Pending choices remain until answered; no missed deadlines or automatic spending.
3. **Assess settlement readiness** after the countdown and allthree choices. Requirements: two living houses; staffed/unpaused food producer; production covers demand and max(40,2×population) food stored; happiness55; wood40/stone20; two soldiers/archers or a Watchtower. Missing needs stay visible and can be corrected without restarting. Success records completion without closing the sandbox or adding a repeat reward.
4. Select idle workers and review food/employment from the same panel; concise gathering/building instructions and updated Advisor Tester steps.

## Save and timing
First Winter travels with manual saves, autosaves and portable city backups under strict schema18. Starting it initializes native trade/naval prerequisites but does not award a charter or fabricate progress. War can be null in18 until native escalation starts. Saves1–17 retain their original schema and semantics without an active winter charter. Export a backup before testing; older versions cannot read18. Existing upgrade/banner local-browser storage behavior is unchanged.

No wall-clock timer, offline catch-up, background progress or new weather renderer. Uses the existing saved simulation elapsed time; one simulation second corresponds to roughlythree active real seconds. Paused time adds nothing. A late decision can make the scenario take longer than24minutes.

## Art/music and scope
All existing painted buildings, world, cinematics and original music are reused, with no new assets or Leonardo spending. New buildings are unnecessary: existing Farm/Fishery, Granary, Lumberyard, houses and Watchtower cover the approved roles. Broader combat/diplomacy and winter-specific artwork remain later work. No deployment/self-merge; Claude/owner reviews the PR and exact-headCI before publication and Sand Labs update.
