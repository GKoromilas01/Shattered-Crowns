/* Current-version manual playtest instructions; shared by Advisor Tester and Guide. */
window.sc52TesterSteps=Object.freeze([
 {text:'v0.54 — A Quieter Town. Open Journal & objectives → Open guide → Guide: Tester. These checks are manual; Done — Next does not change your town or validate results automatically.',manual:true},
 {text:'Quieter worksites: place two foundations and move the pointer away. EXPECT: unfinished artwork stays visible, but idle sites have no permanent yellow circles, progress bars or percentages. Hover a site, select its builder, or choose it in Menu → Worksites to see its details.',manual:true},
 {text:'Painted bridge: look at the existing river crossing near the starting settlement. EXPECT: the existing painted bridge replaces the plain planks. The crossing, paths, costs and worker movement remain the same; no buildings have moved.',manual:true},
 {text:'Town bells: in Menu → Sound, enable selection/construction sounds and Quiet town and school bells. Town time begins at 06:00 and advances one game minute per active second (24 active minutes per day). A completed School rings softly at 08:00. A completed Chapel rings every 15 active minutes. No bell requires Music to be on.',manual:true},
 {text:'Quiet controls: mute all sound, disable effects, or turn off Quiet town and school bells. EXPECT: bells stop. Pause or leave the tab; EXPECT: no background or catch-up burst of bells. Save/Return preserves the town clock through the existing saved game time.',manual:true},
 {text:'Opening regression: New Game plays the button-free opening, holding final video frames behind fading narration. Return to Game skips it. Existing worker assignment, Leonardo originals and painted Chapel/School behavior remain.',manual:true}
].map(Object.freeze));
