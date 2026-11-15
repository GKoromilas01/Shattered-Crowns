# v0.28 — Beyond the Town Gates

Status: owner approved for implementation on 16 November 2026. First deliver the Valewatch prototype for review before expanding the full set. The owner played and accepted v0.27 and directed proceeding with the published exploration/diplomacy proposal. This document makes its gameplay and delivery boundaries concrete. It does not authorize merging or deploying either version.

Baseline: owner-playtested v0.27 head `522f192a8e2a3f077f16355cadf48120d3c7efa3`. v0.27 remains a separate, unmerged PR. Develop v0.28 separately and stack its PR on that branch until the owner separately authorizes integration.

## Intent

Deliver a substantial new playable chapter: send an envoy to survey a route, discover a neighbour's needs, choose how to help, fulfil real shipments, and establish a lasting pact with better trade terms. The world map must visibly change and the settlement must gain real opportunities. All peaceful starts receive the same access. Classic Skirmish remains combat-focused.

The owner's direction is a meaningful gameplay step with continuing graphical improvements. Routine interface fixes remain part of v0.27 rather than separate small releases.

## Approaches and recommendation

1. Extend the existing atlas and game-time simulation with survey missions and consequential relations. This retains current city camera/input/economics and supports a complete chapter. This implements the published proposal the owner asked to proceed with.
2. Seamless physical travel between city maps would require persistent region loading, movement and new campaign architecture. Keep it deferred as the existing world-direction documents require.
3. Additional conversations alone would not deliver discovery or changes to actual trade. Dialogues must be backed by transactions and persistent outcomes.

Use approach 1. Implementation details below are proposed design decisions, rather than previously approved lore or numerical balance.

## The playable progression

### 1. Survey a route

City Life → Diplomacy & neighbour trade shows Ironmere and two additional contacts from the existing catalogue. It remains visible from the beginning in every peaceful start. Ironmere's current visit, permanent charter choice, shipments and terms remain intact.

Valewatch and Ashford begin as unsurveyed diplomatic routes. A survey costs **10 real gold** and takes **60 running game seconds**, with one survey/envoy journey at a time. Surveying does not require a Market, a supplier chapter or a particular starting kingdom. A living Keep and the ordinary active-city/input guards are required. Explain the cost and duration before departure.

On completion, reveal the route and its destination detail, portrait, needs and first offers. Discovery is permanent for that saved city. Existing public geographic labels and saved atlas browsing remain: the shaded overlay represents campaign exploration and route knowledge, without erasing known geography or pretending that static rivals are simulated cities.

A departed survey is not refundable or repeatable. No second charge on repeated clicks, reload or restored held input. A pending conversation may be read later without blocking another completed survey's report. One travelling envoy is shared across Ironmere visits and new surveys; both dispatch directions check the same busy state. Existing pending audiences remain readable, without a new payment. Pause, atlas and hidden tabs stop travel; there is no offline catch-up.

### 2. Meet two established neighbours

**Valewatch — Warden Mira:** established northern woodland stronghold. Offers favour timber and manufactured planks.

**Ashford — Lord Caelan:** established river-border garrison. Offers favour grain/bread and crossing supplies.

These names, roles and locations already exist in the game. Give each an original portrait and concise original dialogue consistent with that limited canon. Do not add unrelated wars, dynasties, religion or racial stereotypes. Contacts are reachable from all peaceful homes, including starts outside the Marches; do not require relocating the player's home or picking a special kingdom.

### 3. Choose a real commitment

Each discovered contact offers two visibly different ways to help, or Later. A commitment consumes real cargo only when the player dispatches it. No unseen deadlines or random failures. The player can defer indefinitely.

Initial balance proposals:

| Contact | Accessible supplies | Manufactured supplies |
| --- | --- | --- |
| Valewatch | 40 wood → 30 stone; +1 trust | 12 planks → 60 gold; +2 trust |
| Ashford | 20 stone → 48 gold; +1 trust | 12 reserved bread baskets → 60 gold; +2 trust |

These introductory orders are one-off per partner, not repeatable resource-conversion faucets. The two introductory choices are mutually exclusive only when actual cargo is dispatched; reviewing/selecting an offer spends nothing. An explicit refusal consumes no goods and applies a clearly disclosed one-time −1 trust penalty for that partner. It closes the current conversation, but a free Reopen negotiations action retains both supply choices until one is committed. Repeated refusals cannot farm additional penalties or reset history. Both partners can therefore be refused and later approached again without making the chapter impossible. Later has no trust penalty. Dispatched cargo has the existing no-recall rule, so there is no artificial 'broken promise' outcome after the game has already taken payment. Wider treaty-breaking and war ultimatums are deferred.

Manufactured supplies require actual production. Basket reservations use existing food/export protection and cannot double-sell. The accessible alternatives let a starting town engage without first completing every old production chapter. Main actions state actual missing cargo; extra explanations stay in disclosures.

### 4. Build a relationship and establish a pact

Trust starts at zero, is bounded from−1 to6, and increases only after a unique shipment actually returns. Introductory choice awards the listed +1 or +2. A fulfilled repeat order adds +1, capped at six. Refusing or deferring an uncommitted offer does not consume cargo. Display why trust changed and what the next threshold unlocks.

After the introductory return, offer a basic manual repeat commission:

- Valewatch: 8 planks → 38 gold.
- Ashford: 12 reserved baskets → 53 gold.

At **3 trust**, the player may sign that partner's permanent supply pact:

- Valewatch: 16 planks → 84 gold.
- Ashford: 24 reserved baskets → 112 gold.

At **6 trust**, enable a clearly labelled two-batch dispatch of that same pact, consuming twice the goods for twice the return. Schema11 raises real basket reservation capacity to48 for active exploration/relations; schemas9/10 retain their32 cap. Expose Reserve48 only when the Ashford two-batch pact is earned. Capacity never manufactures baskets or bypasses food/export rules. Newly active relations enable production/reservation services in every peaceful origin without inventing an Ironmere visit or unlocking old supplier agreements. No automatic dispatch. Each partner's pact is independently earned; the existing exclusive Ironmere timber/provisions decision remains exclusive and unchanged.

A completed introductory return unlocks normal Market loading-yard construction in that city, independently of any Ironmere visit or old supplier chain. Its existing cost remains60wood,80gold,30stone and8planks, with real builders. All repeat/pact cargo requires the real completed Market loading yard, an open road-connected Market with at least half its jobs staffed, and actual goods. All introductory cargo, including manufactured supplies, requires an active city and living Keep but does not require a yard or separate Market readiness check; actual ordinary basket production retains its own Market/food requirements. Every new cargo takes60seconds outbound plus60returning. First discovery does not require the yard. An unfinished yard is not operational. A cargo already in transit returns once even if the Market or yard is later lost.

Use **one logical supplier-cargo slot** across existing supplier/charter orders and new partner cargo. Centralize eligibility, deduction and credit helpers; do not create independent dispatch systems that bypass one another. Preserve the older original regional shipments and all their committed terms.

The chapter resolves when the player signs their first earned pact: show the surveyed route as established, record the actual history, and summarize the opportunity in Advisor. The second partner remains an optional further goal. There must be a clear complete outcome, not an endless checklist with no resolution.

## Economics and material scope

The workshop remains four wood → one plank per five seconds at full two-job staffing. Automatic basket sales remain four gold per basket; current standing two-batch rates remain 16 planks → 72 gold /24 baskets →102 gold, and current Ironmere charters remain80/108.

Proposed repeat rates38/53 are modest improvements over ordinary single-batch36/51; earned pact84/112 improves on Ironmere80/108 after exploration, deliveries and trust. Timbers' real production cost is64 wood per16-plank pact. Food requires production and reservation rather than a reward-created stockpile.

Before finalizing values, measure both complete resource-funded routes, opportunity costs of the two introductory choices, staffing and sustainable food, normal basket-sale income, and cross-partner conversion cycles. Routine numerical balancing is delegated. Report material changes to the progression shape, a new resource/service, new paid work, or a new system before proceeding.

## Graphics and interface

Use the existing asset-assisted Canvas city renderer and atlas. Deliver original portraits for Mira and Caelan, original route/dispatch graphics, readable settlement silhouettes, shaded unexplored-route areas and earned-route markers. Mission indicators reflect actual progress; do not show fake caravans moving in the city. Respect reduced motion.

Keep the main HUD quiet. Main diplomacy actions remain in the existing City Life/Market surface; the atlas is the visual route/discovery view. Partner details show one primary next action, concise needs, trust and its next threshold. Explanations, rates and full receipts are behind disclosures. Advisor uses actual current shortages/production to explain the next step. Chronicle records discovery, chosen commitment, each unique return and signed pact.

Native keyboard actions, focus retention, narrow layouts, sound preferences, camera suspension and held-input epoch guards remain required. No House Plots or replay-interlude controls return.

## State, compatibility and transaction invariants

Introduce strict optional **schema 11** for exploration/relations state. Schemas1–10 continue to load without fabricated contacts, surveys, trust or pacts. Preserve all resources, original histories, pending shipments, paid visits, existing charter choices, worker orders and crowded-town placement.

New state activates only on an actual paid survey or explicit new relationship action, not snapshot reads. Validate exact field sets, known contact/mission IDs, numeric ranges, immutable costs/returns, chronological phases, unique receipt IDs and earned thresholds. Validate privileges against incoming saved state, never the currently open city. Prepare all state before replacing the city; reject malformed imports atomically.

Existing Ironmere diplomacy is optional in schema11; absence must not fabricate a visit. Validate legitimate existing diplomacy/yard privileges in schemas10 and11, and derive new yard/reservation privileges solely from incoming relations and its validated returned receipts. Keep old transaction records in their old shape. New partner records use an explicit schema11 variant and immutable committed terms. Derive or cross-check trust from unique fulfilled transactions and decisions; never grant trust or rewards from a visible message, portrait or opening a panel.

A centralized slot check must reject simultaneous legacy supplier and new cargo, including an imported save claiming both. Cross-validate the combined historical supplier/new-partner cargo intervals as well, rejecting overlapping committed intervals. The older original regional first shipment/follow-up retain their separate existing behavior and are not retroactively put into this slot. New contact history must not consume/truncate old historical records or silently make old full-ledger towns unable to explore. Give the new partner ledger its own512-return bound and monotonically increasing IDs, while preserving the old supplier ledger shape and ID sequence. Reserve receipt capacity before taking payment/cargo; count an outstanding return against the new limit. Survey/decision records are bounded by the two known contacts and do not consume old ledger capacity. Retain all recorded receipts, and disable a paid survey or commitment if the new ledger cannot support its eventual progression. An old full512-entry supplier ledger alone does not block the new chapter.

Export/load must preserve every survey, pending conversation, committed cargo, return and pact phase. Older clients cannot load schema11; document keeping a separate older export for downgrade. No offline catches, restored duplicate deductions, duplicate rewards or replayed production.

## Delivery stages and acceptance

1. **Playable full-loop prototype:** survey Valewatch, see original map/portrait changes, choose real supplies, complete an actual return and earn an improved deal. Supply an ordinary-start route and a clearly identified earned late-town checkpoint. This is an owner review gate before expanding the full set.
2. **Full partner/art pass:** add Ashford, complete both portraits/routes/choices and keep all starts accessible.
3. **Integration/validation:** strict saves/migrations, chronological mixed old/new history, complete funded timber and basket paths, staffing/food tradeoffs, narrow keyboard flow, cancellation/decline rules, paused/hidden/atlas behavior and repeated/restored actions. Separate accelerated tests from normal-clock playtesting.
4. **Candidate handoff:** feature PR with actual screenshots, fresh exact-source playable package, packaged smoke and clean full CI on the final head. Run CI independently rather than repeated automatic polling or long waits for minor fixes. Do not represent an earlier green build as verification of later changes.

No merge or deployment without a separate owner decision. Physical caravans, seamless travel, warfare, alliance AI, multiplayer and mobile expansion remain deferred.

## Implementer calls to review

- 10gold/60seconds survey, trust thresholds3/6 and the listed numerical cargo terms are proposed defaults, subject to funded balancing.
- Route knowledge is shown on the current atlas; local-city resources, footprints and camera are not hidden or reset.
- Commitments do not expire automatically; consequences come from delivered real goods and explicit permanent decisions.
- Preserve Ironmere and extend one shared logical supplier slot; do not replace old agreements or create parallel unlimited payouts.
- First deliver one complete playable loop for review, then expand; graphics and actual economic effects are both gates.

## Builder check

A fresh read-only builder review found seven interfaces needing clarification. This revision resolves them: independent new yard unlock, schema11 reservation capacity48, all-origin services from actual relations, repairable explicit refusals, immutable60+60 cargo and shared travelling envoy, separate bounded ledgers plus historical interval checks, and schema11 preservation of existing diplomacy. Numerical values remain delegated funded-balance defaults. No additional owner-only ambiguity is concealed as an implementation assumption.
