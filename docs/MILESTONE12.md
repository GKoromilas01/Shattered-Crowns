# v0.12.0 — Village Growth & Prosperity

**City Life → Employment** now offers Open/Pause for farms, fisheries, lumberyards, markets, clinics, granaries and bakeries. Pausing removes that site's active job slots and stops production or staffed services; residents reassign immediately to other open jobs in the existing food-first order. Reopen a site to resume normal allocation. Pausing food producers can cause shortages. A paused granary retains physical storage but no staffed logistics. Its physical proximity still meets bakery/market storage prerequisites, as with an unstaffed granary. Map workers and soldiers remain separately recruited units; this control issues no orders to them.

This makes a useful decision possible without demolition: pause surplus production to staff healthcare, food storage or trade. No production rates, construction costs, taxes, reserve policies, housing requirements or simulation timings have changed. No operating costs, new currency or technology tree are introduced.

**City Life → Housing** shows the current requirements for the next resident: measured meal delivery, the existing two-cycle food reserve, housing space, housed residents, water/road access at a vacant home and happiness45+. The meter counts the existing15seconds of qualifying cycles, advancing every5simulationseconds; it is not a wall-clock arrival guarantee. Global Pause freezes it. House details retain the separate10second upgrade and30second decline requirements. Losing required water/road access blocks new immigration while existing residents retain their homes under the established rules. Healthcare and markets affect service satisfaction and later housing tiers.

Open and paused job slots are counted separately. Current staffing/forecast output is distinct from last-cycle measured production, which may precede a change. Paused providers explicitly explain reopening rather than telling the player to grow residents for nonexistent vacancies.

## Saves and verification boundaries

Schemas1/2/3 remain supported. The optional boolean building.cityWorkPaused is validated only for owned staffed workplaces; malformed, enemy and nonworkplace flags reject atomically. Legacy fields/captured state stay unchanged when the flag is absent, including a genuinev0.11Brookstead fixture. Paused-workplace saves requirev0.12+; older builds safely reject that unknown field rather than silently lose the staffing choice. Reopening a normally paused workplace removes the flag.

The browser-first city engine, approved music, peaceful/classic rules, roads/costs/undo, camera, selection and gathering remain. Actual resource-funded Brookstead playtests reach occupied Townhouse housing, working healthcare and higher prosperity without injecting stocks or population. Long-term balance and physical Windows/audio/native-menu testing remain separate human checks. Earlier owner feedback about chooser music, continent availability, defense construction and terrain discovery remains recorded separately; this milestone does not claim to fix those unrelated reports.

Draft review only. Merge and production deployment require separate owner approval.

The required verify job ceiling increases25→30minutes for the expanded220-case suite plus packaged smoke. No test, required-job dependency, publishing condition or production safeguard is removed.
