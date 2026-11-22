# v0.60.0 — A Slower Frontier

Owner approved a three-times-slower rhythm and beginning war gameplay. This candidate also finishes the previously requested v059 naval controls and terrain improvements.

## Pace and frontier

Native simulation advances at one third real time: resources, building, population, recruitment, travel, combat and game calendar share the same clock. Music, story videos and interface animation retain normal speed. Pause/background time does not advance simulation. The ⅓× badge explains the rule.

A town with two houses and a farm or Fishery receives a frontier warning after eight simulation minutes (24 active real minutes). Four more simulation minutes (12 real minutes) allow preparation. Small real enemy armies then attack the Keep; later waves are six simulation minutes apart, capped at six. These are initial tuning values, not a promise of final balance.

Keep → Defend home places existing soldiers near the Keep with normal local engagement; it does not recruit free troops. Attack rival outpost sends the existing army against a real rival fortress on a free distant plot. Destroying it stops new waves; remaining attackers still fight. This is a local war foundation, not full city conquest or overseas invasion. Schema17 validates frontier state and enemy references; older mature towns get a fresh warning period.

## Sea and terrain

The sea extends south without moving the town or bridge. Click boats for their own orders; right-click water to move, fish schools to gather, and an agreed port to trade. Fishery builds fishing boats; Shipyard builds war/trade ships. No Open Fleet intermediary. Three finite schools have different catches/stocks; deeper banks recover slowly and visits reveal richness. Fishing returns Food to the home Fishery and repeats. Loaded redirects preserve cargo and avoid duplicate payments.

Market → Trade with settlements opens partner diplomacy. Ironmere uses its envoy/charter, Valewatch its surveyed introductory shipment. An agreement opens the corresponding port. Actual cargo trade and coastal escort/combat remain implemented. Ship upgrades, larger crews and wider conquest remain future work.

The existing painted bridge is preserved, with winding riverbanks and subtle meadow detail. No new generated art, music, video or credit spending.

## Playtest

Open index.html locally. Journal & objectives → Open guide → Guide: Tester contains current manual checks. Export your current town before importing PLAYTEST_FRONTIER.json: this optional separate funded town is just before the first raid, avoiding a 36-minute wait. Resume and prepare soldiers at the Keep. Imports replace the active town.

The owner’s v058 test pre-release remains untouched. This candidate needs green exact-commit GitHub CI before a verified release. Git push works; release API authentication does not. No self-merge or deployment.
