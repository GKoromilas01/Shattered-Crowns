# v0.25: Clearer Trade and Ironmere's Follow-up

Owner-approved implementation brief, 14 November 2026. Baseline released v0.24 main73939ea784122f88202c1219e798284b68690f78. No merge/deployment approval.

## Intent and scope
Make the existing shipment findable and its actual return legible, then add one optional follow-up. Preserve the town economy, first agreement, map and compact interface. The owner supplied the exact bounded scope and authorized implementation; this record does not reopen approval questions.

## Design
Sayings receive12 unobstructed readable wall-clock seconds then1second fade; reduced motion removes transition. Receipts receive12 unobstructed seconds and priority over sayings, without taking focus or pausing. Receipt acknowledgement/display never pays rewards. Important menus/inspectors, hidden tabs, offers and the shared trade panel suspend visible notification time. Notification state survives checkpoints; legacy completed v0.24 shipments do not replay first reward or receipt.

Engine regional version2 adds followup:null and receipts:[] beside the unchanged caravan and sayings. Receipt records identify first/followup, credited stone, completion time and shown flag. Engine return credits exactly once and queues its factual receipt. Migration of regional version1 creates empty receipts/followup; no historical receipts are invented.

One follow-up can be offered after the first return, on an economy cycle in eligible Marches home/Brookstead. Choose20wood or15gold for18stone, with one60+60game-second journey. Later costs nothing. Recheck housing/food/Market and resources at dispatch. Store the chosen payment, escrow, phases and outcome; return survives later Market loss. Pause/atlas/offline behavior unchanged. Strict schema8 validates followup/receipt relationships atomically; schemas1–7 remain readable and history preserved. Older clients cannot read8.

Neighbour trade moves near completed Market inspector heading. Its concise label shows availability, next requirement or progress. City Life reuses the same panel. Remove only the Construction-front Worksites duplicate; retain Menu, City Life and foundations. Help gets one native keyboard-shortcut disclosure, audited against handlers and actual keyboard behavior. Preserve native input and held-input restore safeguards.

Only modest existing-art/status polish; no new dependencies, physical caravan, settlement, reputation, mobile expansion or broader diplomacy.

## Approach
Extend the existing engine transaction and shared presentation rather than build a second trade system. A second independent window or reward handler would duplicate safeguards and add clutter. Chosen implementation detail: retain first-caravan fields/API, add separate followup state and dispatchFollowup(choice), and keep receipts a display ledger rather than economic authority.

## Acceptance
Both choices must spend actual earned resources, travel120running game seconds and return18stone once. First40wood→36stone stays unchanged. Receipt priority,13second saying total,12second receipt visibility, obstruction/hidden-tab timing, keyboard, all phase saves, legacy7 migration, Market loss and repeated/held activation across restore require tests. Full final-head CI/package smoke plus screenshots and an exact-source playable artifact required before recommendation.
