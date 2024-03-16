let piString = "3.141592653589793238462643383279502884197169399375105820974944592307816406286208998628034825342117067982148086513282306647093844609550582231725359408128"
pi = piString.split("")
let guessedPi = ""
let triesLeft = 5
let i = 0

function userGuessed(el) {
    console.log(el)
    if (pi[i] == el.innerHTML) {
        guessedPi = guessedPi + el.innerHTML
        document.getElementById("guessedDigitsInput").innerHTML = guessedPi
        document.getElementById("piImage").src = "piHappy.png"
        i++
    } else {
        triesLeft = triesLeft - 1
        document.getElementById("piImage").src = "piSad.png"
        document.getElementById("triesLeftSign").innerHTML = triesLeft + " tries left"
        if (triesLeft == 0) {
            alert('Game Over. You lost.')
        }
    }
    console.log(guessedPi)
}

for (let i = 0; i < document.getElementsByClassName("guessingButtons").length; i++) {
    document.getElementsByClassName("guessingButtons")[i].addEventListener("click", function () {
        userGuessed(this)
    })
}
function showAnswer() {
    document.getElementById("guessedDigitsInput").style.color = "red"
    document.getElementById("guessedDigitsInput").innerHTML = piString
}