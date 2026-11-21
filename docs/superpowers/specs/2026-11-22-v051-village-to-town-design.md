# v0.51 — From Village to Town

Owner asked for next-version ideas and explicitly instructed implementation. The implementer chose one connected growth/production/trade slice from DESIGN_GROWTH_AND_WAR.md. Existing native execution method and one final review retained; no additional approval loop for routine choices. Visual reference briefs are recorded separately and do not add new art/naval systems to this scope.

## Outcome

All peaceful starts begin as villages. The player can earn a permanent Town charter by reaching 20 residents, 6 homes with road access and water, happiness at least 65, a road-connected Market with at least half staffing, and food security (current staffed base production meets household demand, 4 demand cycles in storage, no shortfall in the latest measured cycle). Pay 80 gold and 8 real planks explicitly, once. Recognition is permanent; later shortages remain real problems but do not erase the earned charter.

Charter recognition unlocks the existing builder-funded Market loading yard without requiring the legacy Ironmere chain or a specific envoy charter. Once the yard is built, a manually dispatched Town mixed order consumes 8 planks and 12 explicitly reserved bread baskets and returns 110 gold after the existing 60+60 game-second journey. It shares the existing supplier/frontier cargo slot and existing history limit. No automatic dispatch or duplicate production/payment/reward.

## Economics

Charter opportunity cost: 80 gold + 8 planks (32 wood / 40 full-staff seconds; 36 gold standing-order opportunity). Mixed cargo's existing standing-order equivalent is 36+51=87 gold; direct basket sales plus plank standing value is 48+36=84. The 110-gold Town return rewards earned infrastructure by 23–26 gold per 2-minute shared-slot trip, consuming real goods. Roughly five such trips recover the charter's standing-order opportunity cost. Existing workshop costs, yard costs (60 wood, 80 gold, 30 stone, 8 planks), staffing, food reserves, basket sales, shipments, pacts and their terms stay unchanged.

## UI and persistence

Progress and missing requirements belong in the Keep inspector and existing City Life/Advisor summaries. Mixed cargo/reservation/yard controls belong in Market → Neighbour trade. The player's atlas settlement and governor summary show the earned Town tier; other places remain their existing kinds. No floating objective panel or automatic story/decision popup.

Strict schema12 adds only earned charter state; schemas1–11 load without invented recognition. Existing resources, shipments, reservations, receipts and histories survive. Once a charter/new order is saved, older clients cannot load that schema; exported older checkpoints remain the downgrade path. State and terms are validated against the incoming save, never the current city. Starting a city resets charter state; restore invalidates held activation.

## Delivery constraints

Separate ui/v051-village-to-town worktree, based on current v0.50 candidate0dac78c while PR73CI completes. Main and v0.50 branch untouched. Draft PR must disclose its dependency; no own merge or deployment. Existing art/media/input/camera/sound/hidden-tab behavior retained. No new assets, real accounts, ships, warfare or global NPC growth.

New text/art reference briefs record the owner's shipyard, boat, priest/chapel and market preferences for future original asset work. They do not authorize copying film content or spending asset credits.
