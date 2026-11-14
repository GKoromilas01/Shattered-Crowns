# Milestone 25 — Clearer Trade and Ironmere's Follow-up

Approved14 November2026, based on released v0.24 main73939ea784122f88202c1219e798284b68690f78. Feature branch feat/v025-clearer-trade. Implementation approved; merge and deployment require separate approval.

## Existing behavior retained
First Ironmere agreement costs40wood and returns36stone, once per city. Town conditions and real resources govern dispatch. Timed journeys advance only with running city time; Pause, atlas and offline time grant no travel. Returns remain owed after Market loss. Existing First Charter, roads, production, basket sales and construction finance are unchanged.

## Usability
Proverbs remain readable for12 unobstructed seconds, then fade over1second. Reduced motion removes the fade transition. A factual receipt states `Shipment returned from Ironmere: +36 stone credited.` (follow-up:+18). Receipts receive12 unobstructed seconds and precede sayings. Hidden tabs, important menus, inspectors and shared trade details suspend notification visibility/time. Notifications do not pause, steal focus, intercept input or pay resources; engine return is the only credit operation. Earned facts remain in Chronicle History.

Completed owned Markets expose **Neighbour trade** near the inspector heading, showing offer/journey status or the next unmet requirement. City Life opens the same interface. Worksites is removed only from the front Construction strip; Menu→Worksites, City Life→Construction worksites and clickable foundations retain management, assignment, release and cancellation. Help→Keyboard shortcuts is a native disclosure covering audited city and interface controls without adding permanent HUD clutter.

## Follow-up
After the first return, one optional Ironmere order can become available on an eligible city's economy cycle. Choose20wood→18stone or15gold→18stone; Later spends nothing. A chosen payment is deducted once at dispatch, with60game seconds outbound and60returning. One follow-up per city, no recall, duplicate sends or duplicate credits. Chronicle records the chosen cost and actual return. Eligible Marches home and Brookstead, including sandbox, do not need First Charter enrollment.

## Checkpoints
Regional version2 adds explicit follow-up and receipt state. New regional saves use strict schema8. Schemas1–7 still load, including an unfinished or completed v0.24 first shipment. Completed old shipments keep history/resources and may unlock the new order without replaying first payment or inventing a historical receipt. Earlier clients cannot read8; retain an older separate exported checkpoint when planning a downgrade. Single-player older-checkpoint restoration remains a whole-city rewind, not a server reward ledger.

## Playtest guide
1. Start Brookstead or Marches home, or load a compatible city. Build/staff housing, water, roads, food production and a connected Market with actual resources.
2. Inspect Market→Neighbour trade. Meet its requirements and fund the first40wood shipment. Let running time advance120seconds. Read the+36stone receipt and check History.
3. On a later eligible economy cycle, review Ironmere's follow-up. Choose20wood or15gold, or Later. Confirm the selected payment only is deducted.
4. Save/reload outbound and returning. Resume normally and confirm+18stone once, the factual receipt, and the chosen cost in Chronicle→History.
5. Open a menu/inspector while a saying or receipt is active: it must resume with readable time afterward. Check Help's disclosure with keyboard; confirm construction management remains accessible.

No physical caravan, new settlement, reputation, expanded diplomacy, new dependency or mobile expansion. Only restrained original status styling; no new sound that overrides existing preferences.

Unread receipts are acknowledged only after the readable window completes. Loading a checkpoint saved during receipt reading restarts its12-second window; this can repeat wording but never pays again. Sayings preserve their existing one-time delivery/history flags across reloads.
