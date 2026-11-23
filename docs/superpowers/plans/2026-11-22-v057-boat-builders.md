# Boat builders implementation record

Goal: implement owner feedback in native Construction/building menus/Fleet. Architecture: retain authoritative harbour engine; typed configs and schema14 migration; one fishing-base helper shared by economy/readiness. Spec: ../specs/2026-11-22-v057-boat-builders-design.md.

- [x] Reproduce missing shared cost style, placement order, X and building actions with browser tests.
- [x] Shared style registration/end ordering, stable X/Escape, inspector/Fleet type choices and original Fishery facts.
- [x] Typed costs/timing/refunds, repeat shipyard production, strict13→14 migration and kind validation; real bounded fishing output and consistent ledger/readiness.
- [x] Browser scenarios cover separate producers, trade ship after warship, direct inspector actions, menu retained, order closing and invalid kinds.
- [ ] Relevant old harbour/charter/economy/pipeline checks, one fresh review, actual desktop/narrow previews, source/media verification, committed package smoke and PR77 final-head CI. No merge/deployment.

Verification completed: 7 typed-vessel browser cases, 40 relevant regressions, 1 Advisor Tester case; one fresh review and desktop/mobile previews. Committed package smoke and remote CI are recorded in delivery/PR after packaging.
