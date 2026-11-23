# v0.58 — Working Fleet

Select a completed Fishery or Shipyard and choose Open Fleet (or Menu → Fleet). Production costs from v057 remain unchanged. Shipyard buttons work; the owner corrected that earlier report.

- Fishing boat → Send fishing: sail offshore, spend10 staffed active seconds fishing, return6 base Food through the home Fishery's next production cycle, scaled by staffing and normal logistics. Fish is part of Food. Parked boats no longer give a passive bonus.
- Trade ship → Trade voyage: reserve10 Trade Goods, sail to the coastal exchange, wait8 active seconds, return25 gold. Payment happens only at home. Return before exchange refunds goods at home; after exchange brings payment. Full80-goods storage can delay unloading a recalled cargo.
- Warship → Protect working boats: follow an active fishing/merchant ship and fire on coastal enemies within200 map units. Attack nearest coastal hostile approaches an actual target and returns after it dies. No hostile means Attack is unavailable. Return ends patrol.
- Trade routes can reveal up to two holding shore raiders, using existing soldier art. They damage nearby hulls within180 units at4/second. Warships deal16 damage/second. Fishing/trade/warship hulls have60/100/160 health. Sinking loses cargo and frees fleet capacity; ship IDs are never reused.

This is coastal support and a bounded coastal exchange, not a full overseas route map, ship-versus-ship combat or invasion system. Lost home facilities cannot pay out remotely. Keep routes protected; no hull repair system is included yet.

Every opening video and caption fades at both ends, using actual playback time and animation-frame updates. Separate illustrated story screens and their full reading time remain; no frozen holds or visible story buttons. Reduced motion keeps video clear without fades. Existing music and media files are unchanged.

Save schema15/version3 preserves missions, cargo, hulls and IDs;13/14 migrate without payment and at full hull health. New coastal enemy units are permitted only by15; earlier town save restrictions remain. Keep an exported older save if you want to downgrade. Pause/background stops voyages.

Manual checks: Journal & objectives → Open guide → Guide: Tester. No new art generation or spending. Candidate only; no merge/deployment.
