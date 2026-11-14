# Milestone 24 — Ironmere's First Shipment

Feature based on released v0.23, 77690e89. Owner approved implementation, incoming requests, access from Market and City Life, non-pausing fading sayings, concise menus and modest original graphics polish. Merge/deployment require separate approval.

## One agreement
Marches home and Brookstead can earn one request from existing Ironmere, Lady Elowen's mountain settlement. Its timber request and wording are original new story content. This is a timed journey, not a moving unit or connected-region simulation. Other origins do not gain a cross-continent trade shortcut.

Requirements: peaceful active city with a living Keep, an occupied watered/road-serviced home and nobody displaced, measured food production covering demand without shortage and a four-current-demand-cycle reserve, plus an open road-connected Market with at least half its jobs filled. Sandbox may participate without chapter enrollment. A completed First Charter receives follow-up context, with equal terms for either chapter choice.

Terms: **40 wood for 36 stone**, one shipment per city. Reviewing or postponing costs nothing. Send rechecks current conditions and cargo, commits wood once and cannot be recalled. Outbound takes 60 game seconds; the return takes another 60. Stone is credited only at return. Closing/demolishing the Market after departure does not strand earned returns. Existing basket exports and market sales continue unchanged. No new fee, random loss, reward buff, worker unit or free cargo.

## Clear access and notifications
A dismissible request appears automatically once when safe, with View offer and Later. Later leaves a request indicator on an owned completed Market and in City Life; both open one shared panel. There is no extra permanent HUD button. Keep the exchange, status and main action visible; native Terms & requirements reveals the longer rules. The no-recall commitment remains visible before Send.

Pause and World map freeze journey progress. Offline time does not advance it. Real browser saves restore paused in each phase. New city/reset discards its predecessor's shipment without transferring cargo/rewards.

## Words for the road and visuals
Original sayings are earned at a new peaceful city's start, First Charter completion and first trade return. They remain visible for seven unblocked wall-clock seconds, then fade. Reduced motion removes the animation. They never pause, take focus, require a click or intercept game input. Important dialogs and trade requests take priority. Earned sayings and the factual trade outcome remain in Chronicle History.

Softer cached contact shadows, graded cottage roof shading and a compact original cart/stone-road illustration gently improve presentation. No new asset dependency, footprint, placement radius, map geometry or movement system. A complete audited keyboard-shortcut reference is deferred to a later version, as requested.

## Checkpoints
New peaceful cities use schema 7 for regional state, milestone notification flags, nullable existing chapter state and construction. Schemas 1–6 still load without inventing start/chapter history or enrolling a chapter. Regional state is introduced to an older city only when it earns a new regional event. Earlier clients cannot load schema 7: retain a separate older exported checkpoint when planning a downgrade.

Strict preparation rejects malformed terms, phase/progress/escrow/outcome relationships, unsupported origins, duplicate milestones and unknown fields before changing a city. Shared entry points, repeated clicks, UI reads and repeated restore do not duplicate payment or returns. Loading an earlier single-player checkpoint restores its earlier resources and history together; this is not a server-authoritative economy.

## Playtest
Choose Brookstead (optionally complete First Charter) or Marches home. Gather normally; build/staff a Farm, House, Well, nearby roads and Market. Keep housing and food healthy. View the incoming request or open the Market inspector → Trade offers. Review terms, gather 40 wood and Send. Save and reload outbound and returning, then verify +36 stone once and Chronicle → History. Check that sayings disappear without changing Pause or keyboard focus.

Keep PRs #23/#24's useful documentation for reconciliation. #26/#29's gameplay and #30's scroll fix are already integrated; do not duplicate, merge or close these PRs as part of this milestone. Broader diplomacy, physical caravans, connected travel, mobile expansion and commercial systems remain deferred.
