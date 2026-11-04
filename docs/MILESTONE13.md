# v0.13.0 — Gameplay Usability & Polish

Choose your starting place shows the two playable homes as visible radio cards: Marches home and Brookstead village. Aurelia and the Marches are current region context. Other continents and kingdoms remain inspection-only previews, not governor choices. Arrow keys, Home/End, Space and Tab work in the chooser; only Begin commits the selected home. Enter city and Begin with the Advisor preserve their existing behavior, including restored cities.

The chooser no longer uses operating-system select popups. The approved opening score, audio controller, scheduling and volume are unchanged; music still starts after a trusted click or navigation key, as browsers require, then continues into the city. Existing mute, zero-volume, music/effects and restored-city choices remain respected. Automated graph/context tests cannot confirm physical Windows output or establish the cause of a particular device's earlier interruption.

All construction tools can be armed without manually selecting units. Civilian construction keeps its existing council-led rules. Towers, fortresses and walls automatically use the nearest living friendly worker, requiring that worker to be strictly within180mapunits of the plot. Move any worker closer when needed; the game does not move workers automatically. The blue range ring follows the nearest worker to the pointer. Missing workers, insufficient funds, occupied terrain and the exact180boundary still reject placement without spending. Army selection and orders remain untouched, and Undo refunds exact costs.

Hovering map controls, Pause and other HUD controls no longer edge-pans the city behind them; terrain edge-panning and camera shortcuts remain available.

World map retains the world/continent navigation and gains an explicit Explore detailed terrain action for the Marches. Regional terrain already contains mountains, valley contours, rivers, forests, coastlines, settlement sizes and landmarks; the new scope guide explains where to see them. Future regions are read-only previews. Find city resources returns to the existing City Life → Village guide after city entry, preserving Pause, view, home and units. It does not locate a deposit or order gathering automatically. Regional artwork is descriptive geography, not new gatherable deposits or terrain simulation.

Economy, growth, staffing, roads, costs, controls, peaceful/classic modes and save schemas1/2/3 remain unchanged. Genuine v0.12paused-workplace and earlier save fixtures are included in regression coverage. No new dependencies, services, multiplayer or architecture are introduced.

Draft review only. Alex reviews independently; merging and production deployment require separate owner approval.
