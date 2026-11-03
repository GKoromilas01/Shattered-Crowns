# Version 0.8.1 — Opening, Construction & Music Polish

Giannis's Windows screenshot showed command cards clipped above the bottom HUD, and his playtest reported the city appearing before the title. He requested more musical activity while retaining a calm city-building feel.

## Construction choices

Native horizontal scrollbars consumed 10 px of an 80 px command viewport while 72 px cards were vertically centered in the remaining area. The first cards began 4 px above the clip boundary. Earlier Playwright runs hid native scrollbars and missed this.

The existing command controller and 88 px HUD remain. The scroll strip hides its native scrollbar and provides separate Previous/Next buttons. Cards size to whole visible columns; costs, icons and labels stay inside the viewport. Existing wheel, touch and Tab navigation remain usable. Arrow-button Space activation is isolated from global Pause. Road drawing, placement, collision, spending and undo algorithms are unchanged.

[Native-scrollbar screenshot](screenshots/palette-v081-native-scrollbar.png)

## Opening screen

The actual title dialog is now the first body element, with critical CSS ahead of the engine. It covers the city while scripts initialize; Enter city and Advisor remain disabled until ready. The clock waits until entry. There is no delayed replacement of an already-visible battlefield.

The opening appears on every page load, including reloads. The existing Advisor-intro history key remains, but it no longer skips the title. Existing saves remain protected: entry itself does not resume or overwrite a prior checkpoint. Use Menu → Resume saved city as before.

The background reuses the approved original city-art illustration, optimized and embedded as WebP in index.html. The concept's heading is outside the displayed crop. No external asset request is needed, including for extracted offline builds. Exact-source packaging uses a bounded 16 MiB Git-read buffer so embedded artwork can exceed the default 1 MiB limit without bypassing provenance checks. This improves the title presentation; it is not a new gameplay renderer or a promise that the illustration is the playable city.

[Desktop title](screenshots/opening-v081-desktop.png) · [Phone title](screenshots/opening-v081-mobile.png)

## Music trial

The new default is an original sixteen-bar city theme at 72 BPM: restrained sustained harmony, bass, a soft triangle-wave plucked pattern and a sparse sine-wave melody. It adds a recognizable phrase and variation rather than long chords alone. This is synthesized music, not sampled acoustic instruments or a finished orchestral recording.

Menu → Sound → Music style offers **City theme · melody & strings** and **Original gentle ambience**. The previous four-field settings and key remain unchanged; the style has its own local key. Existing volume, music/effects and mute controls apply to either style. Switching style fades/stops old voices before scheduling the new phrase, avoiding a silent bar if rapid toggles fill the bounded voice pool. Future notes are canceled without becoming audible; active notes hold their current gain before fading, including a fallback for browsers without cancelAndHoldAtTime. Hidden pages and mute cancel future notes. No sound begins without a gesture.

[Listen to the city-theme preview](audio/city-theme-v081.mp3). It is rendered using the same score/voice helpers as the live game, at its default 35% volume. The preview is for listening review; subjective musical approval belongs to Giannis. The original ambience remains available if preferred. Selection cues are unchanged and still provisional.

## Verification and release

New regressions cover native-scrollbar bounds at 1366×606,1440×900,768×800 and390×844, all-choice reachability and Space; streamed partial HTML before late scripts; reload/Advisor entry and embedded artwork; actual oscillator timing/pitch/waveform variety; old preference preservation; mute and rapid theme changes. Existing reload journeys now explicitly enter the city before exercising their original controls. Save assertions are retained; createdWith changes to0.8.1 without a schema change.

Final suite/build/smoke and CI evidence is recorded in the PR. This work does not merge, deploy or activate paid services. Physical Windows/device listening and touch behavior remain human playtest work beyond the browser reproductions.
