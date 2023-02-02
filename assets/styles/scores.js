
function highscore() {
    var highscore = JSON.parse(window.localStorage.getItem("highscores")) || []; 

for (var i=0; i < highscore.length; i ++) {
    var el = highscore[i]
    var divTag = document.createElement("div");
    divTag.textContent = el.initials + " - " + el.score;
    // display
    var scoreContainer = document.getElementById("scoreContainer");
    scoreContainer.append(divTag);
}
}

highscore();