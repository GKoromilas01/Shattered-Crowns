# Original Valewatch portrait

`mira.png` is original AI-assisted artwork created for Shattered Crowns on 2026-11-16: Warden Mira in a green wool cloak with a route map at a limestone and timber woodland gate. `mira.webp` is its 1254×1254 runtime derivative. `integrity.json` locks both files. The geographic route chart is authored in `src/v028/frontier-presentation.js` and follows actual atlas marker positions and survey state.

Mira adds 378,326 compressed bytes and 6,290,064 decoded RGBA bytes. All three runtime packs total 2,859,746 compressed and 37,744,372 decoded bytes. The compressed ceiling remains 4 MiB; the decoded asset ceiling rises from 32 to 48 MiB to accommodate this portrait and the planned second partner after prototype review. These figures describe asset storage/decoded pixels, not total browser memory. The portrait uses the existing DOM panel and adds no city drawing pass.


# Lord Caelan portrait

`caelan.png` (1254×1254) is an owner-supplied AI-generated portrait of Lord Caelan at the Ashford river crossing (red wool cloak, ledger, bread baskets, stone bridge), added 2026-11-16. `caelan.webp` is its runtime derivative (418,236 bytes). `integrity.json` locks both. Combined runtime packs now total about 3.28 MB compressed and 44.0 MB decoded, inside the 4 MiB and 48 MiB ceilings. Generator and licence terms of the supplying tool should be confirmed and recorded in `docs/ASSET_LOG.md`.
