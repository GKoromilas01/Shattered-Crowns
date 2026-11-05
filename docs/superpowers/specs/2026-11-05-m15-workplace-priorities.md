# Milestone 15 design proposal for Alex

M14 was merged with owner approval at33fd3858a7923677e623d026fbc2de81b485db42, exact approvedhead3507ea4. M15 starts on a separate branch. The owner's policy-feedback fixes are implemented and locally tested: visible selected state, reserve headings/timing, on-screen confirmations and explanations for paused/no-bakery cases.

## Approved choice — across job types

**A. Protect the existing food-first role order, prioritize sites within each role.** A governor can choose which farm, bakery, market or other workplace of the same type gets scarce staff first. This helps concentrate labor at well-connected sites while retaining the current cross-role staffing order. Limited effect when a village has only one site of each type.

**B. Governor-selected high-priority workplaces across roles (Atlas recommendation).** Explicitly prioritize a bakery, clinic or another workplace ahead of ordinary jobs. Unmarked sites retain the existing food-first order. This creates an optional economic decision: trade or service staffing can reduce harvest/logistics staffing. Display the resulting staff counts, production and potential food shortfall; no hidden automatic reallocation or new production rates. Existing Open/Pause remains available. Multiple prioritized sites follow the existing role/insertion order so allocation stays deterministic.

Both approaches preserve the unmodified default behavior. Use one optional boolean per owned staffed workplace, omitted at default and deleted when reset. Paused sites retain the choice but offer no jobs until reopened. The setter validates owned/live/staffed sites and existing active-city guards atomically. Recruited units, orders, camera, roads, costs, growth and prosperity formulas stay unchanged.

**Save decision:** keep schemas1/2/3 and accept all existing saves unchanged, using an optional priority flag as with M12's paused-workplace flag. Priority-bearing M15 saves would requirev0.15+; older versions should reject unknown behavior safely. Alex and the owner approved the across-job-type option and optional validated compatibility boundary. Implementation follows the dedicated M15 plan.

## Verification after the choice

Prove unchanged defaults/legacy saves, deterministic scarcity and reallocation, paused/reopened/removed sites, invalid/foreign/ended/title/overview rejection, exact food/gold conservation, clear shortage feedback and reversible priority changes. Exercise native Space/pointer/live-refresh focus, both homes and classic mode, and a resource-funded progression playthrough. Keep the standard comprehensive exact-head CI and packaged smoke gates.

## Boundaries

No merge or deployment of M15 without owner approval. No paid service, dependency, backend, multiplayer, graphical/audio change or architectural conversion. No new currency, wage, tax, resource type, housing tier, technology tree or production multiplier. This proposal is for Alex's coordination before a major staffing/balance change.
