# Leonardo briefs — Settlement Cinema

Status: prompts only; no generation, no spending, no new assets supplied. Owner approved the concept, not an unknown credit charge. Before EACH generation: Private Mode ON; confirm duration/model/resolution and displayed credits with owner. Start with Homes only. Download the original and supply it for review before commissioning Market/Growth. Do not bake captions, titles, logos or music into the clips.

## Shared video settings
16:9 landscape, 6–7 seconds (choose 7 if available), original painterly medieval realism, consistent with existing game footage. Use a relevant existing owner-approved settlement still as image-to-video reference if supported; no modern objects, no text, no watermarks, no cuts. If model only offers 5/10 seconds, report the actual options/cost; do not silently buy 10 seconds. Keep title/caption area readable and camera movement restrained. Preserve existing original game music under the clips.

## 1. A Hearth for Every Family
**Output:** `milestone_homes.webm` after approved conversion; original download retained.

Prompt:
> A single continuous cinematic shot of three modest newly built timber-and-stone homes along a small medieval village lane. Warm chimney smoke curls gently into the cool morning air; a parent opens a wooden door while a child steps towards the family home. The scene conveys shelter, belonging and rebuilding after hardship. Slow subtle camera push forward, natural human movement, coherent buildings and faces, no dramatic transformation. Painterly medieval realism, muted warm earth palette: parchment, leather brown, olive green, deep teal-blue; soft natural light, subtle film grain, no neon, no cartoon outline. Widescreen 16:9. No text, subtitles, logo, watermark or modern objects. Six to seven seconds.

In-game opening caption: **A hearth for every family.**
Following subtitle: **Smoke rises. At last, a place to call home.**

## 2. Market Day
**Output:** `milestone_market.webm`.

Prompt:
> A single continuous cinematic shot of the first market morning in a modest medieval settlement. Three simple timber stalls with restrained ochre and terracotta cloth awnings, fresh bread, woven baskets and wooden crates. A baker hands a loaf to a neighbour while a few villagers exchange goods and greetings. Gentle lateral camera drift; lively yet unhurried, believable hands and faces, stable architecture. Painterly medieval realism, muted warm earth palette: parchment, leather brown, olive green, deep teal-blue; soft natural light, subtle film grain, no neon, no cartoon outline. Widescreen 16:9. No text, subtitles, logo, watermark, modern money or objects. Six to seven seconds.

Caption: **The first market opens.**
Subtitle: **Bread, honest trade, and stories shared.**

## 3. The Village Grows
**Output:** `milestone_growth.webm`.

Prompt:
> A single continuous cinematic shot of a small medieval settlement becoming a thriving village. Timber-and-stone houses, a modest square and connected dirt lanes; a small arriving family carries bundles past neighbours repairing a fence, with a few children and a working cart in the distance. Slow gentle camera rise revealing the village, not a monumental city. A hopeful sense of shared work and a new future. Stable buildings and realistic unhurried human motion. Painterly medieval realism, muted warm earth palette: parchment, leather brown, olive green, deep teal-blue; soft natural light, subtle film grain, no neon, no cartoon outline. Widescreen 16:9. No text, subtitles, logo, watermark or modern objects. Six to seven seconds.

Caption: **Our village grows.**
Subtitle: **New neighbours. New hands. A future together.**

## 4. Two-minute anthem — A Crown Reforged
Leonardo Audio → Music, duration **2 minutes**, **Instrumental only ON**, **Private Mode ON**, one generation. If 2 minutes is unavailable, report supported duration and credit cost before proceeding. Do not infer price from previous models.

Prompt:
> An original instrumental anthem for Shattered Crowns, a medieval settlement-building strategy game. Exactly two minutes. Begin intimately with solo wooden flute and warm low strings, evoking survivors finding a home. Gradually introduce lyrical violins, restrained French horn, subtle frame drums and a light medieval lute texture. Build into a hopeful, noble and memorable original theme: dignity, community and rebuilding rather than constant battle. Around the final third reach one warm orchestral climax, then settle gently into the opening tonal centre with a clean natural tail suitable for an unobtrusive repeating game soundtrack. Moderate steady tempo around 76 BPM. Organic acoustic orchestration, clear balanced mix, no vocals, spoken words, electric guitars or modern electronic drums. Entirely original melody, no quotations from existing music.

Working title is a proposal, not approved branding. Request original WAV/MP3 if offered. Listen before replacement; keep previous music available. A seamless loop must be verified after export, not assumed from prompt.

## Integration checklist for Claude / another AI
- Log actual generation date, tool/model, plan, Private Mode, prompt, credits and original file hash in ASSET_LOG.md.
- Review visual continuity, hands/faces, hidden logos and duration. Reject/ask before any retry cost.
- Store converted approved videos in `assets/v069/video/` and add that directory to `scripts/embed-v047.cjs` only once files exist.
- Runtime keys MUST be `milestone_homes`, `milestone_market`, `milestone_growth`; source wiring already supports them. Missing keys retain the original cards.
- Do not fill these slots with unrelated existing footage. Tests use an existing clip only as a temporary runtime fixture, never a shipped substitute.
- Store anthem original separately, integrate playlist selection/crossfade after owner listening approval. Current music remains unchanged.
- Rebuild generated HTML, verify embedded hashes and player/subtitle/readability tests. Do not merge/release without owner/Claude.
