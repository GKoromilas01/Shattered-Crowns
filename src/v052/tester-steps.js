/* Current-version manual playtest instructions; shared by Advisor Tester and Guide. */
window.sc52TesterSteps=Object.freeze([
 {text:'v0.53 — A Seamless Beginning. Start a New Game and select a village. EXPECT: videos and story play automatically without Continue, Skip or Pause buttons. Subtitles have no full-width dark strip.',manual:true},
 {text:'At each video ending, read the story passage over its frozen last frame. EXPECT: the image stays visible while text gently fades in, drifts upward and fades out, with the same wording and reading time. If reduced motion is enabled on your device, it fades without movement.',manual:true},
 {text:'Background tab: switch away while a passage plays, then return. EXPECT: reading time is preserved. After the final passage the town opens; an Advisor start opens the advisor only afterward. Return to Game skips the opening.',manual:true}
].map(Object.freeze));
