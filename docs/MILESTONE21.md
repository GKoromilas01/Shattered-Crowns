# Milestone 21 — Room to Build

v0.21 keeps the current free-placement city and useful road networks. Supply and Markets are live diagnostics, not commands: find them under City Life → City figures and services → Supply and market details. The detailed Food ledger remains available through the existing navigation.

New civic buildings and foundations reserve their physical radius plus the neighbour's radius plus at least ten map units, while retaining any larger previous clearance. This makes new homes and major workplaces less crowded. Existing road rules remain: roads can run near homes and small neighbourhood road blocks still work. Existing accepted saves are not relocated or rejected for their layout. Production, prices, construction work and movement speeds remain unchanged. Compact amenities retain their existing grid assistance, now respecting the same plot validation.

While a civic construction tool is active, nearby dashed clearance rings show the space the new plot must avoid. Red highlights indicate a neighbouring reservation; resource deposits, shorelines, boundaries and the river still have separate placement requirements. These are temporary guides, not permanent land claims. Roads and defense previews retain their current behaviour.

At large display sizes, the whole 2450×900 local city can fit at 100% zoom. There is no terrain beyond its boundary. A hint appears when the whole city is visible; use + to enlarge the view and pan. Moving a unit to a boundary does not auto-follow it. The World map remains a separate overview, not a connected conquest simulation. No scrolling failure was reproduced; the owner confirmed zooming in restores scrolling.

## Reference decisions and future world

The original [Caesar III manual](https://sierrahelp.com/Documents/Manuals/Caesar_III_-_Manual.pdf), Paths & Roads, describes road-dependent recruitment and walking services. Importing that full model would substantially change Shattered Crowns. The [official AoE III update 26865](https://www.ageofempires.com/news/aoe3de-update-26865/) also illustrates why physical placement/pathfinding and adequate building space matter; it is not a specification for our road rules. Our choice is free civic placement with current road benefits and clearer spacing. No assets or code were imported.

Later: roads may improve travel speed after dedicated movement/balance testing. The owner wants continuous travel beyond the city, through countryside to neighbouring cities and ultimately the wider world. Begin with one connected trade route, then diplomacy/conflict; this needs regional streaming/travel, persistent world state and multiplayer-aware authority rather than merely a larger canvas. Preserve server-authoritative multiplayer saves/rejoin, private cooperative sessions first, a grounded world with restrained religion/magic, and the dense working harbour reference as future design directions. None is implemented or charged for here.
