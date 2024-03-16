let pi = "3.141592653589793238462643383279502884197169399375105820974944592307816406286208998628034825342117067982148086513282306647093844609550582231725359408128"
pi = pi.split("")
let guessedPi = ""
let i = 0

function userGuessed(el) {
    console.log(el)
    if (pi[i] == el.innerHTML) {
        guessedPi = guessedPi + el.innerHTML
        document.getElementById("guessedDigitsInput").innerHTML = guessedPi
        document.getElementById("pi").src = "piHappy.png"
        i++
    }
    else{
        document.getElementById("pi").src = "piSad.png"

    }
    console.log(guessedPi)
}

for (let i = 0; i < document.getElementsByClassName("guessingButtons").length; i++) {
    document.getElementsByClassName("guessingButtons")[i].addEventListener("click", function () {
        userGuessed(this)
    })
}
