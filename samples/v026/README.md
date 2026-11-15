# Playable art spike for v0.26

Review stage only, based on released v0.25 f98d187. Read [the approval record](../../docs/superpowers/specs/2026-11-15-v026-working-trade-town-design.md), [validation and comparisons](../../docs/validation/v026-art-sample.md), and [playable instructions](PLAYABLE.md).

```sh
npm ci
node samples/v026/build.cjs
python3 -m http.server 8026 --directory work/v026-playable
# Open http://127.0.0.1:8026
```

`CHROMIUM_PATH=/usr/bin/chromium node samples/v026/check.cjs` selects a local system browser explicitly; omit CHROMIUM_PATH to use Playwright's pinned browser. `measure.cjs` records matched comparisons and6.5-second post-warmup running-scene measurements. Do not run another browser suite concurrently with measurements.

The dedicated sample workflow builds and checks this archive separately from production verification. It has read-only repository permissions and uploads an artifact; it cannot deploy. Root index.html and release.json remain byte-identical to the released baseline.
