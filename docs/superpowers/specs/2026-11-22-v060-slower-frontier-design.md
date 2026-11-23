# A slower frontier

Owner corrected the earlier pace request: everything must develop much more slowly, specifically three times slower. They also explicitly approved starting war gameplay now. Native frame advances simulation at dt/3; all resource cycles, construction, residents and recruitment take3x real time. Visual time, UI, music, videos and narration remain normal. Saved elapsed time remains simulation time, so no existing clock fields are reinterpreted.

A developed village (two houses and a farm or Fishery, with a living Keep) gets a frontier warning at8 simulation minutes (24 active real minutes at the new pace). First small raid follows4 simulation minutes later; further waves every6 simulation minutes, capped at6 waves. War is introduced with warning and preparation, not immediate attacks on a fresh camp. Existing land combat/art handles soldiers, archers and a rival fortress on the far side of the map. Keep commands send the army to attack that outpost or defend home. Outpost destruction ends new waves; existing attackers still need defeating. Original land combat/recruitment remains authoritative. No new assets.

War state is created only on the warning, ensures an empty compatible naval checkpoint, and uses schema17 to persist warning, active/won phase, raid timing and rival fortress reference. Earlier schemas remain strict and load without inventing old wars; mature imported towns get a fresh warning/grace period. Schema17 alone permits the matching hostile outpost and inland armed enemies during active/won phases. Existing coastal raiders retain their earlier validation.

This is the first local war foundation, not a full diplomacy/capture/invasion simulation. Warship systems and v059 sea/river/market changes are included. Owner's trade first-contact approval and no Open Fleet preference remain. Crew/cargo upgrades are still future ideas. No deployment or release before actual verification.

Defense uses normal local auto-engagement near the Keep, not hold-position. A native 250-second combat regression proves soldiers engage and the Keep survives. Rival placement searches free plots, avoiding existing buildings, work sites and live nodes.
