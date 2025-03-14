let piString = "3.141592653589793238462643383279502884197169399375105820974944592307816406286208998628034825342117067982148086513282306647093844609550582231725359408128"
pi = piString.split("")
let guessedPi = ""
let triesLeft = 5
let gameInProgress = true
let i = 0
let hintsLeft = 2
let hintsBefore = NaN
let date = new Date();
let minutes = 0
let seconds = 0
let hours = 0
let clockIconPosition = -1
let clockIconPositions = ["🕛", "🕒","🕧", "🕘"]
date = String(date.getMonth() + 1) + String(+date.getDate())
let removeVid = false
let firstGuess = true


function startStopwatchTimeout(){
    let timerTimout = setTimeout(oneSecondPassed, 1000);
}
function stopStopwatchTimeout() {
    try {
        clearTimeout(timerTimout);
    }
    catch(err){

    }
}
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
        return first_twenty[n]
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
    document.getElementById("favicon").href = "piDay.png"

}

function gameFinished(result, el) {
    if(el.id == "resignButton" && firstGuess == true){
        alert("You cannot resign when you never guessed.")
    }
    else {
        gameInProgress = false
        stopStopwatchTimeout()
        toggleGameOverPopup("visible", result)
        document.getElementById("piImage").src = "piCrying.png"
    }
}

function toggleGameOverPopup(newVisibility, result) {
    let getGameOverPopup = document.getElementById("gameOverPopup")
    getGameOverPopup.style.visibility = newVisibility
    getGameOverPopup.classList.add("gameOverPopup" + result)
    for (let i = 0; i < document.getElementsByClassName("gameOverPopupButtons").length; i++) {
        document.getElementsByClassName("gameOverPopupButtons")[i].classList.add("gameOverPopupButtons" + result)
    }
    document.getElementById("endOfGameStatusDisplay").innerHTML = "You "+result.toLowerCase()+"."
    document.getElementById("gameOverPiImage").src = result+".png"
    document.getElementById("gameOverPiImage").classList.add("gameOverPiImage"+result.toLowerCase())

    let getMainDiv = document.getElementById("mainDiv")
    getMainDiv.style.pointerEvents = "none"
    getMainDiv.style.filter = "blur(5px)"
}

function userGuessed(el) {
    console.log(el)
    if(firstGuess == true){
        startStopwatchTimeout()
    }
    if (pi[i] == el) {
        guessedPi = guessedPi + el
        document.getElementById("guessedDigitsInput").innerHTML = guessedPi
        document.getElementById("piImage").src = "piHappy.png"
        i++
        if(guessedPi == piString){
            console.log("You Won!")
            toggleGameOverPopup("visible", "Won")
        }
    } else if (gameInProgress == true) {
        triesLeft = triesLeft - 1
        document.getElementById("piImage").src = "piSad.png"
        document.getElementById("triesLeftSign").innerHTML = triesLeft + " tries left"
        if (triesLeft == 0) {
            gameFinished('Lost', document.getElementById("piImage"))
        }
    }
    firstGuess = false
    console.log(guessedPi)
}

for (let i = 0; i < document.getElementsByClassName("guessingButtons").length; i++) {
    if (i == 11) {
        document.getElementsByClassName("guessingButtons")[i].addEventListener("input", function () {

            userGuessed(this.value)
            document.getElementsByClassName("guessingButtons")[i].value = ""
        })
    } else {
        document.getElementsByClassName("guessingButtons")[i].addEventListener("click", function () {
            userGuessed(this.innerHTML)
        })
    }
}

function getHint(el) {
    document.getElementById("hintsBox").classList.add("hintBoxVisible")
    document.getElementById("hintsBox").classList.remove("hintsBox")

    hintsLeft = hintsLeft - 1
    if (hintsLeft == 0) {
        el.remove()
    }
    console.log(2 - hintsLeft)

    if (pi[i] == ".") {

        if (hintsBefore == "not a number") {
            document.getElementsByClassName("hintParagraphs")[1 - hintsLeft].style.visibility = "visible"
            document.getElementsByClassName("hintParagraphs")[1 - hintsLeft].innerHTML = 'it is a "."'
        } else {
            document.getElementsByClassName("hintParagraphs")[1 - hintsLeft].innerHTML = "not a number"
            hintsBefore = "not a number"
        }
    } else {

        if (hintsBefore == numberToWords(pi[i]).substring(0, 2)) {
            document.getElementsByClassName("hintParagraphs")[1 - hintsLeft].style.visibility = "visible"
            document.getElementsByClassName("hintParagraphs")[1 - hintsLeft].innerHTML = "<b>First three letters:</b> " + numberToWords(pi[i]).substring(0, 3)
        } else {
            hintsBefore = numberToWords(pi[i]).substring(0, 2)
            document.getElementsByClassName("hintParagraphs")[1 - hintsLeft].innerHTML = "<b>First two letters:</b> " + numberToWords(pi[i]).substring(0, 2)
        }
    }
    el.innerHTML = "💡Hint (x" + hintsLeft + ")"
}

function togglePiSongVisibility(el) {
    document.getElementById("videoDiv").classList.toggle("videoDivVisible")
    document.getElementById("mainDiv").classList.toggle("mainDivHidden")
    document.getElementById("hintsBox").classList.toggle("hintsBoxNotVisible")
    if(removeVid == true) {
        document.getElementById("asapVideo").src = ""
    }
    else{
        el.remove()
    }
    removeVid = !removeVid



}

function playAgain() {
    location.reload()
}

function showAnswer(el) {
    document.getElementById("gameAnswerParagraph").innerHTML = "<b><u>Correct Answer: </u></b>" + piString
    document.getElementById("gameOverPopup").style.top = "-412px"
    el.style.display = "none"
}
function displayStats(el) {
    document.getElementById("gameOverPopup").style.top = "-412px"

    let statsTimeDisplay
    document.getElementById("statsParagraph").innerHTML = "<b><u>Stats: </u></b>" + "you answered " + guessedPi.length + " digit(s) out of 152"
    if(hours > 59){
        statsTimeDisplay ="<b><u>Time: </u></b>" + "It took you more than 60 hours."
    }
    else {
        statsTimeDisplay = "<b><u>Time: </u></b>" + "It took you " + hours + " hours, " + minutes + " minutes, and " + seconds + " seconds."
    }
    document.getElementById("statsTimeParagraph").innerHTML = statsTimeDisplay
    el.style.display = "none"
}
function showUsersAnswer(el) {
    document.getElementById("gameOverPopup").style.top = "-412px"

    let getUsersAnswerParagraph = document.getElementById("usersAnswerParagraph")
    if (guessedPi == "") {
        getUsersAnswerParagraph.innerHTML = "<b><u>Your Answer: </u></b>" + "[did not guess any digits]"
    } else {
        getUsersAnswerParagraph.innerHTML = "<b><u>Your Answer: </u></b>" + guessedPi
    }
    el.style.display = "none"
}

function oneSecondPassed() {
    clockIconPosition = clockIconPosition + 1
    console.log(clockIconPosition)
    if (clockIconPosition > clockIconPositions.length - 1) {
        clockIconPosition = 0
    }
    let clockIcon = clockIconPositions[clockIconPosition]
    seconds = seconds + 1
    if (seconds == 60) {
        minutes = minutes + 1
        seconds = seconds - 60
    }
    if (minutes == 60) {
        hours = hours + 1
        minutes = minutes - 60
    }
    let displayTime = clockIcon + hours + ":" + minutes + ":" + seconds
    timerTimout = setTimeout(oneSecondPassed, 1000);
    if (hours == 60) {
        stopStopwatchTimeout()
        displayTime = clockIcon + "Exceeded 60 hours!"
    }
    document.getElementById("stopwatchPrint").innerHTML = displayTime
}


