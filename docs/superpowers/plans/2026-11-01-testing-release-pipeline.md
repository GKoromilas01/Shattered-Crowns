# Milestone 3 implementation plan

Spec: ../specs/2026-11-01-testing-release-pipeline.md. Execute inline, independently as authorized; one independent whole-branch review.

1. Verify merged baseline and install pinned Chromium. Add failing unit/policy tests for artifact integrity, successful-main-run eligibility, current-main release vs rollback, production reviewer preflight and failure/restore decisions.
2. Implement shared browser setup/artifacts and test runner, preserve all 28 assertions, add non-mutating production smoke journeys. Run against local unchanged game and staged artifact; CI checks deployed URL.
3. Implement minimal immutable site builder/validator and GitHub release preflight CLI. Add CI candidate verification, required-ci summary, dispatch-only protected release with pre-fetched fallback and failure restoration, and deployment-status smoke workflow. Validate YAML and safety contracts.
4. Add version metadata, notes, activation/protection/rollback/autonomy docs. Test clean checkout, all regressions, smoke and failure cases. Fix observed failures and rerun. Verify index.html byte-identical to base.
5. Independent review; cover/fix important findings. Commit/push separate branch; open PR and wait for required CI/live smoke. No merge/deploy/settings activation. Report results and approval prerequisites.
