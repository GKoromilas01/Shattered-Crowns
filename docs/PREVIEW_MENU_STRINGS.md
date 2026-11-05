# City Life checks and bowed-string listening preview

Experimental follow-up branch based on PR #22's exact tested head `7559f743e57bd394a95264249bcf1d88725c0ef3`. PR #22 is unchanged, draft and awaiting Alex's independent review. This is not Milestone 18 or a production release. Kingdom/village starts and illustrated continent settlement markers remain the agreed next milestone after that review.

## City Life

The owner's possible overlap was investigated at 390×844, 1366×606 and 1440×900, across all six planning sections and expanded details using a genuine existing city. No overlap of genuinely focusable controls was reproduced. Early diagnostics included hidden descendants of closed details; those were excluded rather than treated as bugs. New regression coverage verifies each focusable control is inside the panel and receives its own hit test, and that inspection leaves the paused city unchanged. The layout has not been changed speculatively. An owner screenshot/device configuration can narrow any remaining occurrence.

## Music

An original, quiet bowed-string countermelody accompanies the existing sixteen-bar city theme. One band-limited harmonic oscillator per bar uses a slow bow attack, gentle hold and soft release. The pad is reduced slightly to make room; master volume, output limiter, effects, mute/preferences, opening/entry behavior and the original ambient option are unchanged. No borrowed melody, external instrument library or paid asset.

The strings are synthesized, not a recording of a live violin. Musical appeal, perceived loudness and distraction require human listening. The preview does not promise a full orchestral soundtrack.

Two 24-second MP3 excerpts are in `docs/audio-preview/`: `approved-city.mp3` and `bowed-strings.mp3`. Both were rendered through the real audio graph at the same default 35% volume, with the same one-second ending fade. No separate normalization was applied. Compare at a comfortable device volume.

Thirty focused browser/audio tests passed before publishing this preview, including real offline signal checks, safe headroom, silence at zero, note cleanup/style switching and title-to-city continuity. The final branch's standard comprehensive CI and packaged smoke results are tracked in GitHub Actions. No merge or deployment is authorized or performed. No new dependencies or paid services.
