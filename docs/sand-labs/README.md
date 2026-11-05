# Sand Labs — Shared Game Knowledge Base
Status: **proposed documentation**, not approved gameplay scope or a production release. Owner: Giannis; coordination/review: Alex; implementation: Atlas.

## Purpose
Keep decisions, references and specifications in version control so specialists work from the same evidence. These documents are living briefs, not claims that every described feature is implemented.

## Start here
- [Shattered Crowns Art Bible](ART_BIBLE.md) — playable 2.5D visual language, assets, integration and quality gates.
- [Shattered Crowns World Bible](WORLD_BIBLE.md) — six-region / 16-kingdom / 128-settlement vision, lore and politics rules.
- Existing repository documents: `docs/SAND_LABS_VISION.md`, `docs/MILESTONE16.md`; Milestone 17 is under active development in PR #22, **not yet merged**.

## Source-of-truth hierarchy
1. Owner-approved game vision and explicit approvals.
2. Current merged source code, tests, release configuration and existing save contracts.
3. Reviewed and merged design documentation.
4. Draft PRs and proposed concepts, clearly marked as such.
5. External inspiration and AI outputs: references, never automatic canon.

If two sources conflict, log the conflict and request a decision. Never silently replace existing kingdom names, save keys, supported starts or gameplay.

## Suggested folders (create as needed)
`docs/sand-labs/references/` — curated reference register; `art/` — asset manifests and visual QA; `world/` — structured canon and provenance; `audio/` — original audio briefs; `decisions/` — owner-approved decisions.

## Reference intake
For each user-supplied website, book or image, record: title, URL/author, access date, discipline, specific observations, intended use, license/permission, confidence, and whether the material is inspiration-only. Extract *design principles*, not copyrighted art or long text. Do not automatically crawl or train models on submitted websites. Use licensed assets and verify commercial rights before shipping.

## Collaboration protocol
- Giannis supplies preferences, examples and final decisions; no professional briefs required from him.
- Alex classifies references, drafts specifications, independently reviews changes and reports limitations.
- Atlas implements on a separate branch, tests, provides evidence and opens draft PRs.
- Optional art/lore/audio specialists provide reviewable briefs or original assets, not unreviewed changes to main.
- **Merge and production deployment each require their own explicit owner authorization.** No spending, service subscription, API token, external outreach or release by default.

## Versioning and acceptance
Each proposed change must include scope, dependency on current implementation, source references, owner decisions needed, copyright/commercial-use status, measurable acceptance criteria and test evidence. Keep a changelog in the PR. Documentation alone must not alter runtime behavior.

## Current boundary (2026-11-05)
Milestone 16 playable visual proof is merged into main; Milestone 17 world expansion is a separate active draft PR. Its planned six regions, 16 kingdoms and 128 inspectable settlements should be reconciled against the **final merged data** before any lore names or coordinates are marked canonical. Two existing city starts are currently supported; inspection is not the same as full city simulation.
