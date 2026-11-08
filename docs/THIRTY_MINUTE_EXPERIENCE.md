# Thirty-minute experience and owner direction

Recorded 2026-11-08. These are proposed design targets and the owner's future requests, not implemented features or final lore. Keep the current playable session as the priority. PR #29's city-management integration remains separate from this document and the Chronicle scroll fix.

## Proposed session arc

| Game time | Player experience | Useful milestone |
| --- | --- | --- |
| 0–5 minutes | Learn the settlement's immediate needs and the reason for founding it. Establish food and housing. | One working food chain; clear next objective. |
| 5–15 minutes | Choose which projects receive scarce workers and materials. Expand the town. | A visible tradeoff between gathering, construction and services. |
| 15–25 minutes | Explore outward and encounter a neighbouring power. | One meaningful trade, diplomatic or military preparation decision. |
| 25–30 minutes | See consequences and resolve a small chapter. | A recorded outcome and a reason to continue playing. |

Times are playtest targets, not timers that force actions or a claim that these systems already exist. Make a complete small chapter before widening the campaign.

## Next gameplay slice: construction and pacing

The owner's observation is that nearly everything can be built in about three minutes. First measure the current opening: time to a sustainable food chain, resources earned and spent, building completion times, and idle workers. Balance construction and gathering together rather than applying an arbitrary global slowdown.

Prototype explicit villager assignments to construction, with several builders completing a project sooner, a readable progress indicator, cancellation and worker release. Define and test the tradeoff between building and gathering. Avoid unlimited linear speedups; determine the builder cap and diminishing returns from a small playtest. Construction and assigned repairs should use a consistent interaction model. Save restoration must preserve assignments and unfinished projects.

Acceptance direction: players can understand why a project is waiting, see builders working, change priorities, and cannot complete the whole town during the opening minutes. Exact numbers and resource rules need a focused design before implementation.

## Town layout and art

Recommended direction: free placement inspired by Age of Empires II, with Caesar-style road benefits. Maintain readable footprints, minimum spacing and clear entrances. Roads should improve movement and organise the town; prototype their benefits before making them mandatory for every service. Preserve room for fields and later expansion.

Improve graphics in small coherent passes: terrain and building readability, construction stages, working villagers, then roads and environmental detail. Use original art and lore. Take systems inspiration from Caesar III, Age of Empires II/III, Rome: Total War, Command & Conquer, the StarCraft series and World of Warcraft.

## Future requests to preserve

- **Story:** original prehistory explaining the fractured political order and events leading to the current epoch. Player actions should write the present history through consequential Chronicle entries. Do not declare new lore canon without reviewing existing world material.
- **Exploration:** begin with a small visible area. Send a diplomat to reveal dark regions. Decide later how unexplored terrain and previously explored terrain differ.
- **Diplomacy:** trade routes, agreements, alliances and war ultimatums; conversations with several meaningful choices. Diplomats gain upgrades and stats that influence results and deal chances. Explain the factors behind outcomes.
- **Warfare:** armies improve through victories; experienced soldiers and generals with visible star ranks. Reach other kingdoms by moving or scrolling across the map and attack after an initial peace period. Define the peace rules and their UI before implementation.
- **Farming:** a central farm gathering building with expandable fields around it, rather than a single self-contained farm footprint.
- **Counsellors:** economy, war, politics, trade and people. Advice must inspect recent actual game state and changes, building on the measured Advisor rather than repeating generic tips.
- **Repairs:** assign people to repair damaged buildings, making labour cost and progress visible.

## Delivery order

1. Fix Chronicle Economy scrolling independently of balance changes.
2. Review and integrate the existing PR #29 city-management work after its main-base checks and owner merge approval.
3. Design and implement one construction-and-gathering prototype; playtest the opening before changing more systems.
4. Add a short original story framing and a small chapter outcome using existing systems.
5. Expand toward exploration and one neighbouring-kingdom interaction, then deepen diplomacy and military progression.

Graphics and road experiments can support these slices, but should not delay a coherent opening. Do not start all future systems together. No automatic CI polling: report focused local checks, allow CI to finish independently, and inspect it once when requested.
