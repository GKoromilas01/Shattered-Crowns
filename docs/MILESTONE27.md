# Milestone 27 — An Envoy to Ironmere

Implementation candidate based on released v0.26 (`8dff174`). Owner approved the design for implementation. Merge and production deployment require separate approval. Final-head validation and the playable package are recorded in [PR #43](https://github.com/GKoromilas01/Shattered-Crowns/pull/43).

## A paid visit and one permanent charter

Diplomacy is visible from the beginning in every peaceful city start. Open City Life → Diplomacy & neighbour trade (or the same action in a Market inspector), and send an envoy for **30 gold**, paid once and never refunded. The abstract visit takes **120 running game seconds**. Pause, World map and hidden tabs suspend city time; there is no offline catch-up. A Market and the old supplier agreements are not required to send a visit. Market loss does not cancel a departed envoy.

On arrival, review Lady Elowen’s offers. Later leaves the audience pending. Sign one permanent charter or leave without signing, which concludes the visit permanently. There is no additional signing payment. Viewing the atlas, audience or summaries never grants progress or goods.

| Choice | Real cargo per manual commission | Gold returned | Ordinary two-batch standing order |
| --- | --- | --- | --- |
| Timber | 16 planks | 80 | 16 planks → 72 gold |
| Provisions | 24 reserved bread baskets | 108 | 24 baskets → 102 gold |

A signed charter unlocks the existing loading-yard construction independently of the optional old agreements. Each charter commission requires an open, road-connected Market with at least half its jobs staffed, a completed Market loading yard, one batch and the shared supplier cargo slot. Its journey is 60 seconds outward and 60 returning. Cargo is deducted once and the reward credited once. A departed cargo returns even after yard or Market loss. No automatic dispatch is added. Original shipments, three agreements and standing-order terms remain unchanged.

The workshop still converts four wood to one plank per five-second full-staff cycle, so timber cargo requires 64 wood. Provisions uses actual produced baskets explicitly reserved through the existing controls, subject to food reserves/export policy. Reservation diverts baskets from ordinary sales rather than creating duplicate baskets or sale receipts. The visit fee is a sunk cost; timber’s uplift is eight gold per commission and provisions’ uplift six, compared with the same ordinary two-batch cargo.

The existing 512-return supplier-history limit remains. A city already at that limit cannot pay for a visit whose charter cargo could never be dispatched. Records are never truncated to unlock the chapter.

## Interface and artwork

The chapter uses Market → Neighbour trade, the Ironmere atlas details, City Life/Advisor and Chronicle. The atlas meter represents abstract travel, not a physical unit. Main actions retain native buttons and readable labels; longer economic and save explanations are disclosed. Native input guards prevent held Enter, Space or pointer input from paying/signing/dispatching for a different restored city. The portrait introduces no world-rendering pass, sound cue or animation requirement.

[Original envoy artwork and integrity accounting](../assets/v027/README.md). Existing v0.26 illustrated terrain, buildings, readable deposits and resource icons remain.

## Saves and downgrade limits

The first paid send introduces strict schema 10 with optional authoritative diplomacy state. Earlier schemas 1–9 load without inventing visits or charters; resources, shipments, receipts and history remain. Incoming save privileges are validated against that save’s own charter, never the currently open city. Unsupported fields, altered payment/terms, invalid chronology and conflicting charter cargo are rejected atomically.

Keep a separate older export if planning to return to v0.26: older clients cannot load schema 10. Unvisited cities continue using their existing schema. Save/load must preserve travel, pending audience, final choice, outbound cargo, returning cargo and completed rewards.

Physical caravans, seamless travel, warfare, multiplayer and mobile expansion remain deferred.

## Opening and interface amendment

Fresh starting workers stand in a spread in front of the Keep in every start; existing saved units keep their real positions and orders. Construction and recruitment buttons reuse original world artwork and portable resource-cost graphics, with readable labels/tooltips. House Plots and the replay settlement-interlude option are removed. Automatic settlement messages remain once per saved event, with Chronicle history and attributed literature retained. Classic Skirmish stays combat-focused.

These changes amend v0.27, rather than creating a separate small version. [Owner access amendment](superpowers/specs/2026-11-15-v027-access-amendment.md). The next substantial release proposal is exploration and lasting relations with several neighbours; that work is not implemented in this candidate.
