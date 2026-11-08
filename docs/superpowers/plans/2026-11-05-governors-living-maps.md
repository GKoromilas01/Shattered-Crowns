# Governors & Living World Maps Implementation Plan

> Execute inline with Superpowers TDD, systematic debugging and verification-before-completion; one fresh final code review. Owner authorized routine implementation without repeated approval questions. No merge/deploy.

**Goal:** Five reliable governor starts and attractive explorable continent/kingdom maps.
**Architecture:** Extend static origin profiles, existing engine initializer/save validator and atlas controller. Deterministic SVG geography/settlement art and transient map state; no backend or simulation redesign.
**Tech:** Existing HTML/Canvas/SVG, Node24/Playwright1.57; no new dependencies.
**Spec:** `docs/superpowers/specs/2026-11-05-governors-living-maps-design.md`.

## Tasks

1. Origins/save contract: RED `tests/governors.test.cjs` for five profiles, three distinct playable starts, validation/old-save preservation, schema4 roundtrip and correct governor IDs. Implement in `index.html` using stable supported-origin records. GREEN focused engine tests; commit.
2. Start/identity journey: extend radio chooser from profiles, start availability in canonical atlas, explicit dossier start action/confirmation and player kingdom/settlement/banner display. RED native UI/restore/cancel tests, implement and verify. Update only intentional two-start/version assertions in existing tests; preserve old-start exact expectations.
3. Living maps: deterministic six-region geography, terrain-appropriate site positions, original isometric miniatures and a pan-able continent stage inside current dialog. RED geography/marker/keyboard/camera tests, implement and capture desktop/phone evidence. Retain legacy detailed Marches map and all128 inspection routes. Scope live palettes to new origins, with unchanged hitboxes/water rules.
4. Audio/interface: reuse tested preview as optional bowed-string style; retain default city and ambient behavior and sound settings. Reuse layout checks, record any real overlap before fixing. Full regression, final package/source validation/five smokes, fresh review, confirmed fixes and draft PR with exact-head CI/evidence/limitations.

## Review focus

Origin/schema mismatch cannot silently choose another city. Unsupported start inspection cannot replace a save. Confirm/reject and title/restore must leave identity and camera coherent. Natural map coordinates remain deterministic and on land; miniature labels/controls fit or pan accessibly. Atlas pan cannot move the live camera. New palettes cannot alter collision/road/gathering rules. Optional audio cannot replace saved/default preferences. PR23 remains separate until owner-authorized integration.
