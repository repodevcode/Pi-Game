let piString = "3.141592653589793238462643383279502884197169399375105820974944592307816406286208998628034825342117067982148086513282306647093844609550582231725359408128"
pi = piString.split("")
let guessedPi = ""
let triesLeft = 5
let gameInProgress = true
let i = 0
let date = new Date();
date = String(date.getMonth() + 1) + String(+date.getDate())

if (date == "314") {
    document.getElementById("piDayWish").innerHTML = "Happy Pi Day!"
    document.getElementById("piImage").src = "piDay.png"
}
function gameFinished(result) {
    gameInProgress = false
    toggleGameOverPopup("visible", result)
    document.getElementById("piImage").src = "piCrying.png"
}
function toggleGameOverPopup(newVisibility, result) {
    let getGameOverPopup =  document.getElementById("gameOverPopup")
   getGameOverPopup.style.visibility = newVisibility
    getGameOverPopup.classList.add("gameOverPopup"+result)
    let getMainDiv = document.getElementById("mainDiv")
    getMainDiv.style.pointerEvents = "none"
    getMainDiv.style.filter = "blur(5px)"
}
function userGuessed(el) {
    console.log(el)
    if (pi[i] == el.innerHTML) {
        guessedPi = guessedPi + el.innerHTML
        document.getElementById("guessedDigitsInput").innerHTML = guessedPi
        document.getElementById("piImage").src = "piHappy.png"
        i++
    } else if(gameInProgress == true){
        triesLeft = triesLeft - 1
        document.getElementById("piImage").src = "piSad.png"
        document.getElementById("triesLeftSign").innerHTML = triesLeft + " tries left"
        if (triesLeft == 0) {
            gameFinished('Lost')
        }
    }
    console.log(guessedPi)
}

for (let i = 0; i < document.getElementsByClassName("guessingButtons").length; i++) {
    document.getElementsByClassName("guessingButtons")[i].addEventListener("click", function () {
        userGuessed(this)
    })
}

function togglePiSongVisibility() {
    document.getElementById("videoDiv").classList.toggle("videoDivVisible")
    document.getElementById("mainDiv").classList.toggle("mainDivHidden")

}

function playAgain(){
    toggleGameOverPopup("hidden")
    document.getElementById("guessedDigitsInput").style.color = "black"
    document.getElementById("guessedDigitsInput").innerHTML = ""
}
function showAnswer() {
    document.getElementById("guessedDigitsInput").style.color = "red"
    document.getElementById("guessedDigitsInput").innerHTML = piString
}