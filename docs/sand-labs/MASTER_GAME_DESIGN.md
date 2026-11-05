# Shattered Crowns — Master Game Design & Decision Register (living draft)
**Compiled 2026-11-05 by Alex.** This consolidates accessible owner discussions, milestone notes, the Sand Labs vision and proposed Art/World Bibles. **Not every prior chat has been exhaustively recovered.** This is a reference and planning document, not blanket implementation, merge, release, spending or legal authorization.

## Source-of-truth and status key
- **Implemented (verified by merged documentation/source):** present in main, subject to testing and known limitations.
- **Owner direction:** expressed gameplay preference; not necessarily implemented.
- **Proposed/deferred:** requires specification, feasibility, testing and milestone approval.
- **Commercial/legal hold:** no launch, money movement, subscription, paid API or external commitment without separate authorization.
When records conflict, current merged code/save contracts outrank drafts; owner decisions outrank assumptions. The canonical 16/128 names are those in the merged M17 catalogue; do not invent replacements. Do not mistake world inspection for playable settlements.

## North star
An original fantasy medieval **city-building and civilization simulator**, browser-first, isometric 2.5D, inspired by the *systems clarity* of Caesar III and Age of Empires II, with occasional strategic warfare and RPG-lite development. The Witcher, Dragon Age, Zelda, Defender of the Crown, Gauntlet and Total War were mood/system references, **not** permission to copy protected worlds, art or mechanics. Peaceful prosperity must remain meaningful; warfare should be expensive, politically risky and infrequent. Balance should resemble plausible economic and political incentives without becoming inaccessible.

## 1. Current baseline and safeguards
- **Implemented:** v0.17 world identity (six regions, 16 kingdoms, 128 inspectable settlements; two playable starts: Marches home and Brookstead); banners, mottos, histories, mythology, 32 heroes, read-only politics. See [M17](../MILESTONE17.md).
- **Implemented:** v0.16 visual proof (grass, trees, houses, unit clothing) within Canvas 2D; not full art replacement. See [M16](../MILESTONE16.md).
- **Implemented:** city food/production, fisheries, markets, staffing pauses/priorities, employment, housing growth, services, happiness/prosperity, trade policy/reserves, city diagnostics and Advisor guidance; see [M12](../MILESTONE12.md), [M14](../MILESTONE14.md), [M15](../MILESTONE15.md).
- **Implemented/preserve:** construction, workers/soldiers/archers, roads including 3×3 behavior, placement/Undo, camera drag/edge-pan/minimap/fullscreen, selection and keyboard/mobile controls, existing saves, offline playable package, regression and smoke tests. Do not regress or silently change costs.
- **Implemented:** peaceful city campaign and region exploration. Historic political/kingdom sandbox is not active multiplayer. See [M7](../MILESTONE7.md).
- **Owner direction:** city building before war; stable intuitive UI, large scrollable maps, consistent scale (workers/soldiers similar, buildings recognizable), river/shore/fishing terrain, no unwanted menu switching or overlapping controls, building cost information, clear selection and Advisor checklist, keyboard accessibility.
- **Known limitation:** world locations other than the two starts are dossiers only. M17's schematic kingdom maps are not natural playable maps. City Life overlap reported but not reproduced at tested viewport sizes; investigate on evidence. Draft docs PR #23 and future roadmap PR #24 are not merged at compilation.

## 2. World and political identity
- **Implemented:** original fictional heraldry and mottos for 16 kingdoms, six geographic regions, 128 settlements, legends, history, heroes and relationships; World → region → kingdom → settlement dossiers.
- **Owner direction:** world with mainland and two/three islands, coasts, fisheries, believable rivers/mountains/forests; settlements from villages through towns to cities; distinctive coats of arms and mottos; the player starts as a small governor and grows.
- **Proposed M18:** a bounded group of additional *real playable* governor starts, geographically coherent illustrated continent maps, distinct settlement portraits and honest start eligibility; preserve all saved IDs and existing starts. Expand by tested cohorts, not 128 simulated cities at once.
- **Deferred:** kingdom politics, rulers, noble support, succession, elections, dictatorship/democracy/feudal and other fictional government variants, loyalty, alliances, rebellion and public legitimacy. Government choices should change incentives and consequences; not a statement about real political beliefs.
- **Deferred:** player councils on war/economy/tax/crises with quorum, consent, votes and abuse protection; diplomacy and treaties.

## 3. City economy and construction
- **Owner direction:** production and employment matter: housing, roads, wells, granary, bakery, market, healer, gardens, plaza, townhouse, farms, fishery, lumber, stone, gold, food, population and services. Supply chains, staffing and prosperity should be legible.
- **Proposed:** more industries and resource chains; upgradable buildings with visual tiers, upkeep and tradeoffs; legendary landmarks unique to cities/kingdoms with lore and balanced benefits; civic service radius and logistics where meaningful.
- **Proposed:** smithies/armouries, weapon and armour quality tied to materials and workshop tiers; stables/cavalry; unit training, veteran experience and RPG-lite specialties. Never allow RPG systems to eclipse city management.
- **Proposed:** deep yet simple menus: top-level actions remain few; building-specific actions (recruit at barracks, forge at smithy, trade at market, policy at council hall), sensible tooltips, progressive disclosure and no nested menu maze.
- **Proposed:** realistic but understandable economic relationships: supply, wages, taxes, employment, reserves, public services, prices, scarcity, transport, satisfaction and social stability. Test anti-exploit invariants and peaceful viable strategies.

## 4. Global trade and currency
- **Proposed:** continent trade hubs and a global stock-exchange-*like* market UI for goods; transparent prices, supply/demand, regional availability, transport cost, fees, market history and safeguards against manipulation/bots.
- **Proposed:** a **fictional, nonredeemable in-game coin** as the unit of exchange for market transactions, alongside tangible resources (gold, wood, stone, fish, food, equipment). Design money sources/sinks before launching an economy.
- **Commercial/legal hold:** possible later Sand Coin/cryptocurrency, conversion to EUR/USD or real-money value. Requires legal/tax/financial/security review, clear ownership, anti-fraud controls and explicit separate approval. Do not imply token value, financial returns or a future exchange is guaranteed.

## 5. Military, conquest and consequences
- **Owner direction:** occasional raids/war, towers, fortresses, walls, archers, soldiers, cavalry, equipment and training; strategy rather than constant combat.
- **Proposed:** conquering a player's city offers preserve/occupy, selectively dismantle, or raze; preserving workers/buildings can aid economy, destruction can harm legitimacy, morale, productivity, diplomacy and provoke rebellions. War incurs mobilization, food, equipment, casualties, opportunity costs and postwar recovery. Balance for nonaggression and fair competition.
- **Multiplayer hold:** player-vs-player architecture, protection of beginners, opt-in/eligibility, griefing safeguards, fair combat and recovery must be specified before destructive PvP. No live multiplayer claim in present version.

## 6. Community, communications and history
- **Proposed:** world bulletins for wars, market shocks, shortages, major political events and version updates; admin announcements; direct player messages, reporting, block/mute, privacy and anti-spam.
- **Proposed:** moderated forum, player help desk, comprehensive searchable manual, onboarding/tutorial and accessible support.
- **Proposed:** persistent *Chronicles of Shattered Crowns*, organized by epochs, campaigns, kingdoms and cities, recording rulers, landmarks, prosperity, wars, councils and world events. Define retention, authorship, moderation and what persists between games.

## 7. Visuals, sound and game AI
- **Owner direction:** coherent original fantasy 2.5D visual language, readable on desktop and phone, recognizable houses/units/buildings, natural terrain and consistent scale. Gradual upgrades from a representative playable scene rather than a costly premature engine rewrite. See proposed [Art Bible](ART_BIBLE.md) in PR #23.
- **Owner direction:** gentle original ambience, quiet bowed strings as a separate preview candidate, restrained natural tool/armour selection sounds and occasional short spoken acknowledgements; mute and volume controls. Verify commercial rights.
- **Proposed:** bounded, inspectable opponent AI and advisors that explain actual simulation; different strategic personalities, constrained adaptive difficulty and opt-in aggregated metrics. Do not promise autonomous self-modifying game code or require hosted AI for core gameplay.
- **Art reference process:** owner may provide example websites, images, music and games; extract principles, check licensing, create original assets, record provenance and test at actual game scale. Scenario, Ludo and Suno are exploratory only; no subscriptions approved.

## 8. Business, marketing and Sand Labs
- **Owner direction:** Sand Labs as a broader games/websites studio with Alex coordinating/reviewing, Atlas implementing, and specialist art, lore, audio, QA, marketing, finance, legal, sales, SEO and other agents introduced when useful. A shared GitHub knowledge base is preferred to uncoordinated agents.
- **Brand proposal:** Sand Labs identity could evoke Oracle of Delphi (mystery, wisdom, discovery) through original symbolism; preserve existing logo until approved revision.
- **Owner direction:** free launch to learn from players; later evaluate Steam, paid game, subscriptions or cosmetic monetization. Avoid pay-to-win and premature pricing commitments.
- **Commercial/legal hold:** proposal to redistribute **20% of subscription revenue** to successful players, with success including prosperity and governance, not only conquest. Requires revenue definition, legality, age/jurisdiction rules, tax, anti-cheat, economics and explicit approval.
- **Commercial/legal hold:** paid usability testers, owner example €10/8 hours for 1–2 days; not an approved pay rate. Comply with labour rules and fair compensation.
- **Proposed promotion:** X, YouTube, Google Ads, Steam wishlists, organic clips, community and creators; test with clear conversion/retention measurement before scaling spend. Planning hypotheses: €300–€600 validation, €1,500–€3,000+ only after evidence; not vendor quotes or approved budget.
- **Social-contribution proposal:** affordable, transparent support for education/children, poverty, cancer/illness causes after viability; vet charities and define actual contribution basis before claims. See [Sand Labs vision](../SAND_LABS_VISION.md).

## 9. Recommended staged roadmap
**Now — M18:** governor start prototypes, geography/illustrated settlements, preservation of existing economy, tests and save compatibility. Owner review before merge.
**Next — city depth:** building-local menus, upgrade trees, distinctive landmarks, equipment workshop/stables and unit progression, balanced with city services.
**Then — economy/world life:** fictional coin, simulated trade hubs, clearer price/transport systems, announcements and chronicle prototype.
**Later — strategy/community:** diplomacy, councils, persistent history, moderated player communication and multiplayer groundwork.
**Long horizon — PvP and commercial:** conquest/occupation, social economy, Steam/commercial tests and separately assessed financial/token concepts.

## 10. Decisions still needed, not blockers for M18
- Which settlement cohorts become playable after the first two and what their distinctive geography should be.
- How to score prosperity/peaceful success and prevent war from dominating.
- How many persistent multiplayer worlds, their reset/epoch cadence and player protection.
- Whether global markets are NPC-simulated first or require live multiplayer.
- Whether real-money rewards and crypto should ever exist; no commitment assumed.
- How to measure effective marketing and when a demo merits a Steam page.

## 11. Development and release protocol
Owner makes final creative/financial decisions; Alex coordinates and independently reviews; Atlas develops on dedicated branches with tests and evidence. Keep existing gameplay and saves stable, use PRs, record exact-head CI and limitations. **Every merge requires explicit owner approval; every deployment requires separate explicit owner approval.** No spending, external outreach, live token issuance or paid services without approval. Do not run overlapping active implementation workstreams.

## Reference index
- Merged baseline: [M7](../MILESTONE7.md), [M12](../MILESTONE12.md), [M13](../MILESTONE13.md), [M14](../MILESTONE14.md), [M15](../MILESTONE15.md), [M16](../MILESTONE16.md), [M17](../MILESTONE17.md), [Sand Labs founder vision](../SAND_LABS_VISION.md).
- Pending design docs PR #23: [Knowledge Base](README.md), [Art Bible](ART_BIBLE.md), [World Bible](WORLD_BIBLE.md); these links resolve after PR #23 is merged, or on its branch.
- Pending roadmap PR #24: [Long-Term Roadmap](LONG_TERM_ROADMAP.md).
- This master is an editorial synthesis; any feature marked proposed/deferred must not be represented as implemented.
