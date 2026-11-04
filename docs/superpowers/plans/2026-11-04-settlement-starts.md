# Settlement Starts Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans. Execute inline with targeted RED/GREEN tests and one final independent review.

**Goal:** Two genuine Aurelia home starts, persistent village identity and explicit new-game music defaults.
**Architecture:** Existing single-city engine with origin-specific initialization. Default home retains schema2, classic schema1; Brookstead uses schema3 campaign.originId. Rendering stays the existing city terrain; the village has a different keep/resource arrangement and starter neighborhood, not a new biome or second simulation.
**Tech Stack:** Inline vanilla JS/HTML/CSS, Node24, Playwright1.57; no dependencies.
**Spec:** docs/superpowers/specs/2026-11-04-settlement-starts-scope.md

## Global Constraints
- PR14 at5b3ab15 remains unchanged and is a dependency; no merge/deploy/spend.
- Preserve classic and home startup, roads44-unit snapping, costs/undo, economy, title silence and approved score/mix.
- Validate schema3 strictly and atomically; schemas1/2 remain accepted with default home origin.
- Version0.10.0; exact old assertions retained except current-version, explicit new-game music and available-home changes.

## Review Focus
- Home identity and inspection selection must not become aliases; only one owned marker.
- Unsupported/foreign origin and enemy injection into peaceful schema3 fail before mutation.
- Restore never runs new-game initialization or resets existing city/sound choices.
- Village initial buildings/resources are in bounds and usable; real gathering and3x3roads work.
- Choosing/previewing a home cannot reset a city until explicit entry; fresh music never defeats master mute or volume.

### Task1: Engine origins and save persistence
**Files:** index.html engine init/scCampaign/save capture/prepare/restore; tests/origins.test.cjs.
**Interfaces:** scCampaign.start(scenario,originId='home') validates before mutation; status.originId; origins() returns descriptions. Schema3 campaign adds originId='brookstead'; schema1/2 restore home. Default home captures schema2 unchanged.
- [ ] Write tests for a real village, exact default home, invalid origins, atomic invalid schema3, save/export/import and legacy restoration. Run against old source and observe missing-origin failures.
- [ ] Implement village keep at1060,530, workers/soldiers translated+440,+220, first17 local nodes translated equally, other nodes unchanged except clearing any overlap with starter buildings. Add farm940,530; house1000,650; well910,630; three roads956/1000/1044 at606. Stocks200gold/90wood/30stone/110food; same eight residents and friendly troops. These are initial balancing choices, not proven balance.
- [ ] Recenter village camera; preserve old home init exactly. Implement strict schema3 and legacy defaults. Run targeted tests and commit.

### Task2: Chooser, atlas ownership, music defaults
**Files:** index.html starting chooser/atlas/audio, tests/origins.test.cjs, affected existing audio/entry tests, release.json and expected current version.
**Interfaces:** Existing profile catalog from Task1; starting chooser activates only on Begin. World markers use status.originId, preserve all inspection IDs; when village is home original home is Marches Landing, not a duplicate owned city.
- [ ] Add failing tests for enabled village selection/preview safety/real entry, one owned marker, new-game music and preserved master/effects/style, real village gathering/roads and paused/legacy restore.
- [ ] Use actual profiles in chooser, show starting conditions, confirm only on entry. First explicit city entry and sc-city-started enable music; restored scenes and ordinary map/menu clicks do not. Keep mute/volume/style/effects intact.
- [ ] Adapt only assertions changed by requested semantics. Run focused tests, inspect screenshots and commit.

### Task3: Release verification and dependent PR
**Files:** docs/MILESTONE10.md, docs/validation/m10-verification.md, screenshots, release notes.
- [ ] Fresh read-only review; fix confirmed important findings RED/GREEN.
- [ ] One final full project suite; build exact committed source, verify digests/Git bytes and packaged smoke.
- [ ] Push separate branch and create dependent PR against feat/m9-living-world while PR14 is open (or current main after it merges); clearly document dependency. Link exact ZIP/screenshots and actual verification. No merge/deploy.
