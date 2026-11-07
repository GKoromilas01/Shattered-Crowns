# Measured city advisor

Owner instruction: choose and proceed with smarter city advisors. Extend the existing single-file game and its optional Advisor, without a new service or dependency.

Replace the count-based Settlement priorities and outdated baseline-consumption outlook with one deterministic assessment of `scCityEconomy.snapshot()`. Order: unmet meals, negative measured food balance, no staffed base-food production, displacement/full housing, unfilled open jobs, unmet growth checks, otherwise steady growth. Each issue has a stable ID, evidence, a suggested action, and a City Life section to review. Show at most three issues. Unmeasured food is explicitly waiting, never healthy by inference. Food arithmetic uses measured demand and keeps overflow distinct. Paused workplaces are voluntary choices, not vacancies to fill. Map workers cannot staff civilian jobs. Growth readiness is authoritative; services need water and roads, not mandatory markets/clinics.

Advice is explanatory only: no automatic orders, policy changes, spending, construction, save fields, or balance changes. Buttons navigate to existing Food, Housing, Employment or Satisfaction sections. They preserve Pause, camera, selection and armed placement. Live updates preserve native keyboard/pointer activation and focus. Advice updates after opening and while visible, including restored saves. Use existing styling and fit 390/768/1440 widths. Preserve optional checklists, building locator and appearance controls.

No merge/deployment. Retain v0.17 release identity until a release is explicitly prepared.
