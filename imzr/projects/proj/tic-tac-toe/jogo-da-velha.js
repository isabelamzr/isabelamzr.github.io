
const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const dataWinningMessageText = document.querySelector("[data-winning-message-text]");
const winningMessage = document.querySelector("[data-winning-message]");
const restartButton = document.querySelector("[data-restart-button]");

let isCircleTurn;

 //check winner
 const winningCombinations = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [2, 5, 8],
    [8, 7, 6],
    [3, 4, 5],
    [1, 4, 7],
    [2, 4, 6],
 ];


//change symbol
const startGame = () => {
    for (const cell of cellElements) {
        cell.classList.remove('circle');
        cell.classList.remove('x');
        cell.removeEventListener("click", handleClick);
        cell.addEventListener("click", handleClick, { once: true });
        }

        isCircleTurn = false;

        setBoardHoverClass();
        winningMessage.classList.remove('show-winning-message');
};

const endGame = (isTie) => {
    if (isTie) {
        dataWinningMessageText.innerText = "It's a Tie!"
    } else {
        dataWinningMessageText.innerText = 
        isCircleTurn ? "Player2 Wins!"
        : "Player1 Wins!";
    }

    winningMessage.classList.add('show-winning-message')
};



const checkForWin = (currentPlayer) => {
    return winningCombinations.some((combination) => {
        return combination.every((index) =>{
            return cellElements[index].classList.contains(currentPlayer);
        });
    });

};

const checkForTie = () => {
    return [...cellElements].every((cell) => {
       return cell.classList.contains("x") || cell.classList.contains("circle");
    });
};


const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd);
};


const setBoardHoverClass = () => {
    board.classList.remove("circle"); //remover antes de mudar o turno
    board.classList.remove("x");

    if (isCircleTurn) {
        board.classList.add("circle");
        
        } else {board.classList.add("x");}
};

const swapTurns = () => {
    isCircleTurn = !isCircleTurn;

    setBoardHoverClass();
};




const handleClick = (e) => {
    //put mark X or Circle
    const cell = e.target;
    const classToAdd = isCircleTurn ? "circle" : "x";

    placeMark(cell, classToAdd);

    

    //check winner (current player é o classToAdd) nao entendi mt bem
    const isTie = checkForTie();
    const isWin = checkForWin(classToAdd);
    if(isWin) {
        endGame(false);
    } else if (isTie){
        endGame(true);
    } else {
        swapTurns(); 
    }
};


startGame();

restartButton.addEventListener('click', startGame);


