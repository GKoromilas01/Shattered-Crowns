# Milestone 27 — An Envoy to Ironmere

Implementation candidate based on released v0.26 (`8dff174`). Owner approved the design for implementation. Merge and production deployment require separate approval. Final-head validation and the playable package are recorded in [PR #43](https://github.com/GKoromilas01/Shattered-Crowns/pull/43).

## A paid visit and one permanent charter

Eligible Marches home and Brookstead cities must complete all three existing supplier agreements. In Market → Neighbour trade, send one envoy for **30 gold**, paid once and never refunded. The abstract visit takes **120 running game seconds**. Pause, World map and hidden tabs suspend city time; there is no offline catch-up. Market loss does not cancel a departed envoy.

On arrival, review Lady Elowen’s offers. Later leaves the audience pending. Sign one permanent charter or leave without signing, which concludes the visit permanently. There is no additional signing payment. Viewing the atlas, audience or summaries never grants progress or goods.

| Choice | Real cargo per manual commission | Gold returned | Ordinary two-batch standing order |
| --- | --- | --- | --- |
| Timber | 16 planks | 80 | 16 planks → 72 gold |
| Provisions | 24 reserved bread baskets | 108 | 24 baskets → 102 gold |

Each charter commission requires the existing completed Market loading yard, one batch and the shared supplier cargo slot. Its journey is 60 seconds outward and 60 returning. Cargo is deducted once and the reward credited once. A departed cargo returns even after yard or Market loss. No automatic dispatch is added. Original shipments, three agreements and standing-order terms remain unchanged.

The workshop still converts four wood to one plank per five-second full-staff cycle, so timber cargo requires 64 wood. Provisions uses actual produced baskets explicitly reserved through the existing controls, subject to food reserves/export policy. Reservation diverts baskets from ordinary sales rather than creating duplicate baskets or sale receipts. The visit fee is a sunk cost; timber’s uplift is eight gold per commission and provisions’ uplift six, compared with the same ordinary two-batch cargo.

The existing 512-return supplier-history limit remains. A city already at that limit cannot pay for a visit whose charter cargo could never be dispatched. Records are never truncated to unlock the chapter.

## Interface and artwork

The chapter uses Market → Neighbour trade, the Ironmere atlas details, City Life/Advisor and Chronicle. The atlas meter represents abstract travel, not a physical unit. Main actions retain native buttons and readable labels; longer economic and save explanations are disclosed. Native input guards prevent held Enter, Space or pointer input from paying/signing/dispatching for a different restored city. The portrait introduces no world-rendering pass, sound cue or animation requirement.

[Original envoy artwork and integrity accounting](../assets/v027/README.md). Existing v0.26 illustrated terrain, buildings, readable deposits and resource icons remain.

## Saves and downgrade limits

The first paid send introduces strict schema 10 with optional authoritative diplomacy state. Earlier schemas 1–9 load without inventing visits or charters; resources, shipments, receipts and history remain. Incoming save privileges are validated against that save’s own charter, never the currently open city. Unsupported fields, altered payment/terms, invalid chronology and conflicting charter cargo are rejected atomically.

Keep a separate older export if planning to return to v0.26: older clients cannot load schema 10. Unvisited cities continue using their existing schema. Save/load must preserve travel, pending audience, final choice, outbound cargo, returning cargo and completed rewards.

Physical caravans, seamless travel, warfare, multiplayer and mobile expansion remain deferred.
