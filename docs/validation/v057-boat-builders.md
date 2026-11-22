# v057 validation

- Typed vessel browser suite: 7/7 pass, including own building inspectors, repeat trade/warship orders, schema13 migration, strict invalid-kind rejection, fishing output and granary ledger.
- Harbour, settlement growth and pipeline regressions: 40/40 pass.
- Advisor Tester: 1/1 pass; manual checks and honest completion preserved.
- Fresh review found fixed-base fishery logistics and invalid explicit kind fallback. Both reproduced red, corrected and passed in the final seven cases.
- Original Close worked in controlled baseline; missing visible × reproduced. New ×/Escape and continuing orders verified. Narrow Fleet has no horizontal overflow.
- Desktop Construction/Shipyard and narrow Fleet screenshots are in v057/.
- Package smoke and exact-head remote verification status are recorded in PR77 after commit. No merge/deployment.
