# v0.28 Ashford validation

Engine (PR #45): terms, trust and refusal per contact, shared one-envoy/one-cargo slot, schema 11 save validation, earned 48-basket reservation after an Ashford double pact. Covered by `tests/ashford.test.cjs` and `tests/frontiers.test.cjs`.

UI: the Beyond the Town Gates panel has a partner chooser (`#sc28Contact`: Valewatch default, Ashford). Ashford controls use the `sc28Ashford…` ids (survey, review, aid, manufactured, basic, sign, pact, batches, atlas open) and its own status, history, advisor line and atlas route/details. Valewatch ids are unchanged. Covered by `tests/ashford-ui.test.cjs` and the existing `frontiers-ui`/`frontiers-route` tests.

Terms shown in the UI: survey 10 gold/60 s; intro-aid 20 stone → 48 gold (+1 trust); intro-manufactured 12 baskets → 60 gold (+2); basic 12 baskets → 53 (+1); pact (3 trust) 24 baskets → 112; double batch (6 trust) 48 baskets → 224.

Known gaps: no Caelan portrait yet (the figure hides when `sc28Assets.caelan` is absent; see `docs/ASSET_LOG.md`); no browser-based funded-route walkthrough for Ashford with real builders (engine tests cover the economy).
