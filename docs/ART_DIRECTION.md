# Art direction – one palette for the whole game

Rule from the owner: all new graphics must look like they belong to the same game. Every AI-generated image (portraits, cut scenes, maps, icons) must use this palette and style.

## Style
Painterly medieval realism, warm natural light, slightly muted/desaturated, soft grain. No neon, no cartoon outlines, no glossy fantasy sheen, no photo-real modern elements.

## Palette (sampled from existing approved art: Caelan portrait, envoy, world map)
- Parchment / skin light: #d7c4a8, #cec3ba, #caa87b
- Warm tan / leather: #b88b5b, #a07250, #ab947a
- Earth brown / wood: #895d34, #6d4a31, #5e3421, #433121
- Deep shadow: #321e13, #34301c
- Moss / olive green: #6e6f4e, #5d5834, #505f4d
- Sea-green land: #87a297, #648271, #466d62
- Deep water blue: #2d4e66, #2a485d
- Accent (use sparingly): crown gold #d9a93c, banner red #8e2f2a

## Prompt suffix for image generators
"painterly medieval realism, muted warm earth palette (parchment, leather brown, olive green, deep teal-blue), soft natural light, subtle film grain, no neon, no cartoon outline"

## Checklist before adding an image
1. Prompt includes the suffix above.
2. Place it next to Caelan/envoy portraits and the world map: does it feel the same?
3. Log it in docs/ASSET_LOG.md with generator and terms.

## Before generating any key image (Claude reminds the owner every time)
1. Is this a defining asset (main portrait, logo, cut scene, box art)? If yes: generate on a PAID Leonardo plan with PRIVATE MODE ON (see docs/ASSET_LOG.md, Leonardo reply of 2026-11-17). Minor or background art may use the free plan.
2. Add the palette prompt suffix above.
3. Check the result for brand-like or watermark-like text. Do not use it if it resembles a real brand.
4. Send the image to Claude; Claude logs generator, plan, privacy mode and date in docs/ASSET_LOG.md.

## Long-term visual target (owner idea, 2026-11-20 — recorded, NOT scheduled)
The owner shared a screenshot of a mobile-strategy ad: stylised 3D-looking medieval map (towers with orange roofs, river, snowy mountains, blue enemy keep), dark rounded UI panels with gold buttons and level pips, a minimap in the corner.
- Treat it as a "later on" target, not a version item. The ad is almost certainly pre-rendered or AI-made marketing art, not real gameplay footage.
- What is reachable without a rewrite: richer building sprites drawn in code, warmer palette and lighting, soft shadows, a consistent panel style (dark rounded cards, gold accent, level pips) for building menus, a minimap.
- What needs a big decision first: real 3D or pre-rendered isometric assets (new engine or an asset pipeline), and licensed or commissioned art. Decide together before any version touches it.
- Reminder before any key image generation: Private Mode on a paid plan, check commercial-use terms, log it in docs/ASSET_LOG.md.
