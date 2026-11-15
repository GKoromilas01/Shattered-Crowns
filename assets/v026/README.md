# Original v0.26 world art

Created for Shattered Crowns with OpenAI image generation on 15 November 2026, following the owner-approved playable sample. Warm limestone, timber, terracotta/slate and natural vegetation. No third-party asset pack or copied concept-image pixels.

- settlement.png: approved keep/cottage/Market/oak, staged cottage construction and civilian action poses.
- buildings.png: remaining civic/defense buildings, workshop, loading yard and road material.
- deposits.png: focused readability follow-up; low cool-grey stone slabs and tall gold-veined dark ore, used only for live stone/gold nodes.
- nature.png: oak/birch/pine/shrub, stone/gold/depleted props and terrain/water materials.

Original PNGs are retained unchanged. Runtime WebP encodings preserve dimensions and atlas coordinates, at Canvas encoder quality 0.90; no cropping or resizing of the source sheets. `integrity.json` records original/runtime SHA256, dimensions and bytes. `src/v026/renderer.js` owns explicit crop/anchor metadata and bounded pre-scaled drawing caches.

Run `node scripts/embed-v026.cjs --check` and `node --test tests/asset-integrity.test.cjs` to verify the reviewed modules and locked assets against the self-contained production HTML. The verified release format remains three files; no network asset dependency is introduced.

The resource bar uses original inline SVG pictograms (`src/v026/resource-icons.js`) for coins, timber logs, rock, grain and a filled trade basket. Adjacent text/value nodes remain readable and icons are decorative to assistive technology.
