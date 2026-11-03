# Audio audibility and activation follow-up

The owner reported no music or selection sounds, including from the standalone MP3, while YouTube/other audio worked. The prior MP3 measured about -53 LUFS: its nonzero signal was much too quiet for a useful listening check. Earlier tests proved synthesis but not an adequate listening level.

## Confirmed and corrected

- Keyboard Enter city did not unlock audio; a real-keyboard regression failed before handling native entry-button clicks in the audio controller.
- Music measured roughly .00265 RMS and a worker cue .00482 RMS in the old default mix. New tests require useful output levels rather than only .00001 nonzero output.
- A shared audio-graph factory now calibrates music and effects, retains the saved master-volume setting, and uses a peak compressor after master gain. A real offline combined-music/repeated-army stress test checks headroom at 100%, and zero master gain must produce exact silence.
- Menu → Sound includes an explicit Enable sound & test button. Only that deliberate action enables both channels, unmutes, and raises volume to at least 50%; normal entry preserves existing choices.
- When both channels are disabled, status identifies that game setting rather than suggesting more clicks or device-volume changes. The status regression failed before the wording fix.
- The first-mouse-selection case checks normal effects-only entry. Its earlier delayed-resume label was inaccurate: a gesture-created context can already be running, so the unused delay patch was removed. No delayed-start guarantee is claimed.

The full preview is regenerated through the same audio-graph, score and voice helpers as the game, at 35% master volume. PCM peak is .40854 and RMS .064999; encoded MP3 measures about -24.9 LUFS with -8.2 dBFS true peak. It is not a different composition or a separate normalization substituted for the live graph.

A short, normalized eight-second volume-check MP3 is available separately for diagnosing listening output. It is explicitly a calibration sample. On November 4 the owner confirmed that this louder sample is audible; the corrected live game still needs their listening test.

## Existing PR CI finding

The initial PR #13 run had 152/153 passing cases; the failure was the 390px planning test reading x from a null boundingBox. Audio cases all passed but lacked useful-level thresholds. Geometry measurement now waits for visibility and reads connection, positive dimensions and viewport bounds atomically. It retains the actual visibility/bounds assertions. The local 390px case passes. Pinned Chromium installation was blocked by the runtime network policy; no bypass was attempted, so pinned-browser verification remains CI evidence.

The approved opening artwork, timing and palette behavior remain intact. Roads, saves, economy and scenario logic are unchanged. Final complete-suite, package and CI results are recorded in PR #13 after execution; no merge, deployment or paid services are authorized.

## Local regression evidence

All 160 distinct cases passed with Node 24, Playwright 1.57 and explicit system Chromium 154. The original run was interrupted after 59 passing cases; its three fully completed files account for 54 cases (audio 20, economy 14, kingdom 20). The remaining eight test files passed 92/92 in a completed process, and the interrupted Living City file was rerun in full, passing 14/14. Thus 54 + 92 + 14 = 160, with no omitted files or cases; the five earlier partial Living City passes are not counted twice. Logs: work/full-audio-recovery.log, work/audio-recovery-remaining.log, work/audio-recovery-living.log. No source changes occurred between these batches.
