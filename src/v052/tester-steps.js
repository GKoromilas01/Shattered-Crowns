/* Current-version manual playtest instructions; shared by Advisor Tester and Guide. */
window.sc52TesterSteps=Object.freeze([
 {text:'v0.55 — Between the Chapters. Start New Game and choose a village. EXPECT: short captions remain directly over each video, without visible Skip, Pause or Continue buttons or a dark subtitle strip.',manual:true},
 {text:'Separate story screens: after a clip with a longer passage, EXPECT: an opaque dark screen with the existing painted settlement emblem and the full story text. No frozen video remains visible behind the words. Text gently fades in and out; with reduced motion it does not drift.',manual:true},
 {text:'Full story and return: let the opening finish. EXPECT: every original video and full story passage remains, followed by your town (and Advisor if chosen). Return to Game skips the opening. Map clarity, bridge, original music and town bells are unchanged.',manual:true}
].map(Object.freeze));
