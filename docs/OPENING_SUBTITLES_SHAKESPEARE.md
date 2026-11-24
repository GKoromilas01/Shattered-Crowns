# Opening subtitles — Shakespeare version (owner chose this style, 23 November 2026)

Shown over the slowed opening clips (12–20 s each) instead of separate text screens. Lines describe what is on screen, in order. Original writing in blank-verse style; shown as lines, about 2–4 per clip, spaced evenly across the clip. Sample video rendered by Claude on 23 November 2026 used the plain-English version of these same beats.

## dawn (5 s, new in v0.64) — caption "An ordinary morning."
Through morning mist the thatchèd chimneys breathe;
An old man leads his cow down the sunlit lane.
(First half of the clip: rooftops, mist and chimney smoke. Second half: an old man leading a brown-and-white cow along a muddy lane, sun rising behind the cottages. The lines were written to match exactly that.)

## village (20 s) — title "Before the fire"
Behold the morn, that gilds our thatchèd eaves,
Where Marian bears the water from the well,
And patient oxen draw the harvest home.
We were not rich, yet had we all enough.

## attack (20 s) — title "The night the roads changed"
But hark! The night puts on a crimson cloak;
Our roofs are torches to the weeping sky.
Iron-clad strangers stride where children played,
And neighbours flee with all that hands can hold.

## march (12 s)
We left our homes, but left not one another:
A weary line of mothers, beasts and banners,
Winding through the mist toward the unknown.

## hill (20 s) — title "A place without a name"
Beyond the ridge the sun climbs up the valley.
Here let our banner stand upon the stone:
No walls, no throne, but water, wood and soil.

## house (12 s)
First rise the beams; then thatch; then, God willing, a town.
Yon child runs laughing through the straw.

## market (20 s) — title "The town we could make"
Imagine streets where bargains sweetly sound,
Where scarlet banners flutter over bread,
And grain-carts roll in through an open gate.

## raiders (20 s) — title "The first hearth"
Yet look: far torches on the darkening plain.
The world forgets us not, nor shall it long.
Make ready, friends; for peace is but a guest.

## Notes for the build
- Keep the existing fades and the Skip button; Return skips the introduction.
- The old separate text screens (src/v050/opening-story.js `title`/`text`) are replaced by these overlay lines; keep the captions as the first line of each clip.
- Slowed clips: render offline with motion-interpolated frames (ffmpeg minterpolate, 24 fps). Size: 7 clips at ~1.2 Mbit/s were about 18 MB total, which would double index.html (now ~17 MB). Re-encode at ~0.5 Mbit/s or 720px to keep the file small, or play at reduced speed in the browser; decide before building.
- Scenes needing a new Leonardo clip are decided after viewing the slowed result; 90 tokens each, always ask the owner first.

## Building clips (generated 23 November 2026, planned for first-building scenes)

### school (first schoolhouse)
The beams are laid, the tiles upon the roof.
A scholar opens wide the oaken door,
And little feet step in to meet the light.
Here shall our children learn what swords forget.

### chapel (first chapel)
At dawn the stones are set, the bell is raised;
A humble priest doth bless the threshold new.
Let candles keep the vigil of our hopes,
And let this hamlet pray for gentler days.

### theater (first theatre)
Behold a stage of timber, bright with banners,
Where players practise sorrow, wit and war.
The town doth gather round to laugh and weep:
This village is a stage, and we its players.

### shipyard (first shipyard)
Hard by the river's brim the ribs are bent,
And patient hands do coax a hull from oak.
The mist doth lift; the water beckons forth:
Make fast the rope, and let the keel be laid.

## calm (10 s, new in v0.65, between "Morning in our village" and the attack) — caption "Evening, and bread to share."
On screen: golden light on thatched roofs, neighbours around a small fire sharing bread, a woman pouring water, children laughing. Verse (original):
The sun lies golden on the thatchèd eaves;
Round the small fire the neighbours break their bread;
A goodwife pours the water, children laugh.
(The dawn clip was re-rendered in v0.65 at 15 s, motion-smoothed, so its two lines are readable.)
