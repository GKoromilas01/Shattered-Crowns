# Development increment — Measured City Advisor

Advisor now leads with up to three current priorities, each with evidence, a suggested next step and a Review button opening the relevant City Life section. It uses the same snapshot and migration requirements as the simulation.

Unmet meals take precedence over declining measured food reserves. Balance uses the last completed cycle's harvest, logistics, baking, exports and demand, before storage overflow. An unmeasured cycle is explicitly labelled waiting. Housing/displacement, unfilled open jobs and unmet growth checks follow. Voluntarily paused jobs are excluded from vacancy advice; recruited map workers are distinguished from civilian staff. Ready growth is described as conditional, not guaranteed. The old baseline-ration outlook is replaced with actual stock, population, happiness and Pause state.

Advice never spends resources, issues orders or changes policies. Review opens Food, Housing, Employment or Satisfaction while retaining the city's Pause state, selection, camera and placement tool. Persistent cards preserve focused controls and native held-key/pointer activation during updates. Existing detailed service advice, checklists, building locator and appearance controls remain available.

No new services, dependencies, graphics, audio, balance or save fields. This is development on top of v0.17.0; no release metadata, merge or deployment is changed.

Verification results are recorded in docs/validation/advisor-update-verification.md.
