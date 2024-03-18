let piString = "3.141592653589793238462643383279502884197169399375105820974944592307816406286208998628034825342117067982148086513282306647093844609550582231725359408128"
pi = piString.split("")
let guessedPi = ""
let triesLeft = 5
let gameInProgress = true
let i = 0
let date = new Date();
date = String(date.getMonth() + 1) + String(+date.getDate())

function numberToWords(n) {
    // From: https://www.geeksforgeeks.org/convert-number-to-words/
    let limit = 1000000000000, t = 0
    // If zero console.log zero
    if (n == 0) {
        console.log("zero")
        return
    }
    // Array to store the powers of 10
    let multiplier = ["", "Trillion", "Billion", "Million", "Thousand"]

    // Array to store numbers till 20
    let first_twenty = ["", "One", "Two",
        "Three", "Four", "Five",
        "Six", "Seven", "Eight",
        "Nine", "Ten", "Eleven",
        "Twelve", "Thirteen", "Fourteen",
        "Fifteen", "Sixteen", "Seventeen",
        "Eighteen", "Nineteen"]

    // Array to store multiples of ten
    let tens = ["", "Twenty", "Thirty", "Forty", "Fifty",
        "Sixty", "Seventy", "Eighty", "Ninety"]

    // If number is less than 20, console.log without any
    if (n < 20) {
        console.log(first_twenty[n])
        return
    }
    let answer = ""
    let i = n
    while (i > 0) {
        /*
        Store the value in multiplier[t], i.e n = 1000000,
        then r = 1, for multiplier(million), 0 for multipliers(trillion and billion)
        multiplier here refers to the current accessible limit
        */
        let curr_hun = Math.floor(i / limit)

        // It might be possible that the current multiplier is bigger than your number
        while (curr_hun == 0) {
            // Set i as the remainder obtained when n was divided by the limit
            i %= limit

            // Divide the limit by 1000, shifts the multiplier
            limit /= 1000

            // Get the current value in hundreds, as English system works in hundreds
            curr_hun = Math.floor(i / limit)

            // Shift the multiplier
            t += 1
        }

        let flr = Math.floor(curr_hun / 100);

        // If current hundred is greater than 99, Add the hundreds' place
        if (curr_hun > 99)
            answer += (first_twenty[flr] + " tensundred ")

        // Bring the current hundred to tens
        curr_hun = curr_hun % 100

        // If the value in tens belongs to [1,19], add using the first_twenty
        if (curr_hun > 0 && curr_hun < 20)
            answer += (first_twenty[curr_hun] + " ")

            // If curr_hun is now a multiple of 10, but not 0
        // Add the tens' value using the tens array
        else if (curr_hun % 10 == 0 && curr_hun != 0) {
            flr = Math.floor(curr_hun / 10);
            answer += (tens[flr - 1] + " ")
        }

            // If the value belongs to [21,99], excluding the multiples of 10
        // Get the ten's place and one's place, and console.log using the first_twenty array
        else if (curr_hun > 19 && curr_hun < 100) {
            flr = Math.floor(curr_hun / 10);
            answer += (tens[flr - 1] + " " +
                first_twenty[curr_hun % 10] + " ")
        }

        // If Multiplier has not become less than 1000, shift it
        if (t < 4)
            answer += (multiplier[t] + " ")

        i = i % limit
        limit = Math.floor(limit / 1000)
    }

    return answer
}

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
    let getGameOverPopup = document.getElementById("gameOverPopup")
    getGameOverPopup.style.visibility = newVisibility
    getGameOverPopup.classList.add("gameOverPopup" + result)
    for (let i = 0; i < document.getElementsByClassName("gameOverPopupButtons").length; i++) {
        document.getElementsByClassName("gameOverPopupButtons")[i].classList.add("gameOverPopupButtons" + result)
    }
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
    } else if (gameInProgress == true) {
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

function togglePiSongVisibility(el) {
    document.getElementById("videoDiv").classList.toggle("videoDivVisible")
    document.getElementById("mainDiv").classList.toggle("mainDivHidden")
    el.remove()
}

function playAgain() {
    location.reload()
}

function showAnswer(el) {
    document.getElementById("gameAnswerParagraph").innerHTML = "<b><u>Correct Answer: </u></b>" + piString
    el.style.display = "none"
}

function showUsersAnswer(el) {
    let getUsersAnswerParagraph = document.getElementById("usersAnswerParagraph")
    if (guessedPi == "") {
        getUsersAnswerParagraph.innerHTML = "<b><u>Your Answer: </u></b>" + "[did not guess any digits]"
    } else {
        getUsersAnswerParagraph.innerHTML = "<b><u>Your Answer: </u></b>" + guessedPi
    }
    document.getElementById("statsParagraph").innerHTML = "<b><u>Stats: </u></b>" + "you answered " + guessedPi.length + " digits out of 150"

    el.style.display = "none"

}