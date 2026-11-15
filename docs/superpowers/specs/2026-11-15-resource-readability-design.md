# v0.26 resource readability

Owner request: distinguish gold and stone immediately by shape, texture and colour; replace top-bar rectangles with recognizable small graphics, retaining labels/tooltips. Supply matched before/after views and a fresh verified package. No merge/deploy.

Implementation choice: retain existing nature sheet and add a small transparent two-cell deposit atlas. Stone: low, broad, angular cool-grey slab pile with rough fractures. Gold: taller, narrower dark warm ore outcrop with large metallic-gold veins/nuggets. The world-size box and node coordinates/radii stay unchanged. New portable inline SVG icons depict coins, logs, stone, grain and a filled basket. Existing text labels, live value nodes and explanatory tooltip text remain accessible.

Alternatives: recolouring existing rocks alone would retain the silhouette problem; emoji would retain platform-dependent missing glyphs. A separate small atlas avoids repainting unrelated art. These are implementation choices within the owner's focused request.

No simulation, balance, progression, save-schema, sound, camera or placement changes. Compare identical paused city/state/camera/zoom before and after, inspect deposits at normal scale and in grayscale, check narrow HUD layout, locked art and packaged smoke, and require clean full final-head CI.
