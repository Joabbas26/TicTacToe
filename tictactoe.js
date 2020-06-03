let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
let player1Score = 0;
let player2Score = 0;

const statusDisplay = document.querySelector('.game--status');
const winningMessage = () => `${currentPlayer} Wins!`;
const drawMessage = () => `Game ended in a draw!`;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleResetGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    document.querySelectorAll('.cell')
               .forEach(cell => cell.innerHTML = "");
    player1Score = 0;
    player1Score = 0;
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    document.querySelectorAll('.cell')
               .forEach(cell => cell.innerHTML = "");
}

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }
if (roundWon) {
        if (currentPlayer = 'X') {
        player1Score += 1;
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
        }
        else {
        player2Score += 1;
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
        }
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }
    handlePlayerChange();
}

//Add our event listeners to the game cells and restart button
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);

function handleCellClick(clickedCellEvent) {
//We will save the clicked html element in a variable for easier further use
const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(
      clickedCell.getAttribute('data-cell-index')
    );
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }  
    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

