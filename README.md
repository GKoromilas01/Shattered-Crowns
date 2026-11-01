# Shattered Crowns

Browser RTS prototype. Serve this directory with `python3 -m http.server 8000` and open http://localhost:8000.

## Chromium regression tests

Requires Node.js 20+ and Playwright 1.57.0:

```sh
npm install
npx playwright install chromium
npm test
```

The suite uses system Chromium at `/usr/bin/chromium` when available, otherwise Playwright's bundled Chromium. Set `CHROMIUM_PATH` to override it. A local HTTP server starts and stops automatically; no external game service or deployment is needed.

Tests exercise the actual game with browser clicks, pointer drags, keyboard input, wheel scrolling, and the Fullscreen API. Coverage includes repeated and rapid Construction/Units switching, cancellation, house placement and undo, road dimensions/costs/refunds, road extension, affordability, advisor checklist persistence, camera controls, atlas selection, supply updates, and UI hit targets at 1440, 1024, and 768 pixels. Every scenario rejects uncaught JavaScript errors.

Road tests that need larger budgets replace only the starting resource amounts in the HTML response within Playwright. Production starting resources, road planner, placement validation, and costs remain unchanged. Horizontal palette scrolling is intentional; tests scroll every enabled command into view and verify that it can receive a click.

Changes are local until explicitly approved for release. See `STABILIZATION.md` for findings and validation.
