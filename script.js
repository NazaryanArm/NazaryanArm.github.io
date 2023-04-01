let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let newgameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("message");
let btnSound = document.createElement("audio");
btnSound.src = "http://orteil.dashnet.org/cookieclicker/snd/clickb2.mp3";
let drawSound = document.createElement("audio");
drawSound.src = "http://www.dashingstrike.com/Automato/games/ATITD/sounds/error.wav";
restartSound = document.createElement("audio");
restartSound.src="http://www.cs.tlu.ee/~rinde/media/soundid/klipid/nupp_yles_01_01.mp3";
let winSound = document.createElement("audio");
winSound.src = "http://novastar-main.co.hays.tx.us/NovaStar5/sounds/newmessage.wav";
// Winning Pattern Array

let winningPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [2, 5, 8],
    [6, 7, 8],
    [3, 4, 5],
    [1, 4, 7],
    [0, 4, 8],
    [2, 4, 6],
];

// Player 'X' plays first
let xTurn = true;
let count = 0;

// disable all buttons
const disableButtons = () =>{
    btnRef.forEach((element) => (element.disabled = true));
    // enable popup
    popupRef.classList.remove("hide");
}

// Enable all buttons (For New game and restart)
const enableButtons = () =>{
    btnRef.forEach((element) => {
        element.innerText = "";
        element.disabled = false;
    }); 
    // disable popup
    popupRef.classList.add("hide");
};


// this function is execed when a player wins
const winFunction = (letter) =>{
    disableButtons();
    if(letter === "X"){
        winSound.currentTime = 0;
        winSound.play(); 
        msgRef.innerHTML = "&#x1F389; <br> 'X' Հաղթեց!";
    } else {
        winSound.currentTime = 0;
        winSound.play(); 
        msgRef.innerHTML = "&#x1F389; <br> 'O' Հաղթեց!";
    }
};

// Function for draw
const drawFunction = () => {
    disableButtons();
    drawSound.currentTime = 0;
    drawSound.play();
    msgRef.innerHTML = "&#x1F389; <br> Ոչ-ոքի!";
}



// NEw game
newgameBtn.addEventListener("click", ()=>{
    restartSound.currentTime = 0;
    restartSound.play();
    count = 0;
    enableButtons();
});

restartBtn.addEventListener("click", () => {
    restartSound.currentTime = 0;
    restartSound.play();
        count = 0;
        enableButtons()
})





// win logic
const winChecker = () => {
    // loop through all win patters
    for(let i of winningPattern){
            let[element1, element2, element3] = [
             btnRef[i[0]].innerText, 
             btnRef[i[1]].innerText,
             btnRef[i[2]].innerText,
            ];
            // check if elements are filled
            // if 3 empty elements are same and would give win as 
            //would
            if(element1 !== "" && (element2 !== "") && (element3 !== ""))
            {
                if(element1 === element2 && element2 === element3){
                    // IF all 3 buttons have same values then pass the value to win function
                    winFunction(element1);
                }
            }
        }
    }



// Display X/O on click
btnRef.forEach((element) => {
    element.addEventListener("click", () => {
        if (xTurn){
            xTurn = false;
            // Display X
            btnSound.currentTime = 0;
            btnSound.play();
            element.innerText = "X";
            element.disabled = true;
        } else {
            xTurn = true;
            //display Y
            btnSound.currentTime = 0;
            btnSound.play();
            element.innerText = "O";
            element.disabled = true;
        }
        // Increment count on each click
        count += 1;
        if(count === 9){
            drawFunction();
        }
        //check for win on every click
        winChecker();
    });
});

// Enable Buttons and disable popup on page load
window.onload = enableButtons;