// HTML Elements
const statusX = document.querySelector('.status')
const resetGame = document.querySelector('.reset')
const gameCells = document.querySelectorAll('.game-cell')

// game constants
const xSymbol = '✖'
const oSymbol = '○'

// game variables
let gameIsLive = true
let xIsNext = true

// functions
const letterToSymbol = (letter) => letter === 'x' ? xSymbol : oSymbol

const handleWinner = (letter) => {
    gameIsLive = false
    if(letter === 'x') {
        statusX.innerHTML = `${letterToSymbol(letter)} has won!`
    } else {
        statusX.innerHTML = `<span>
        ${letterToSymbol(letter)} has won!
        </span>`
    }
}

const checkGameStatus = () => {
    const topLeft = gameCells[0].classList[1]
    const topMiddle = gameCells[1].classList[1]
    const topRight = gameCells[2].classList[1]
    const middleLeft = gameCells[3].classList[1]
    const middleMiddle = gameCells[4].classList[1]
    const middleRight = gameCells[5].classList[1]
    const bottomLeft = gameCells[6].classList[1]
    const bottomMiddle = gameCells[7].classList[1]
    const bottomRight = gameCells[8].classList[1]

    // check winner
    if(topLeft && topLeft === topMiddle && topLeft === topRight){
        handleWinner(topLeft);
        gameCells[0].classList.add('won')
        gameCells[1].classList.add('won')
        gameCells[2].classList.add('won')
    } else if(middleLeft && middleLeft === middleMiddle && middleLeft === middleRight){
        handleWinner(middleLeft);
        gameCells[3].classList.add('won')
        gameCells[4].classList.add('won')
        gameCells[5].classList.add('won')
    } else if(bottomLeft && bottomLeft === bottomMiddle && bottomLeft === bottomRight){
        handleWinner(bottomLeft);
        gameCells[6].classList.add('won')
        gameCells[7].classList.add('won')
        gameCells[8].classList.add('won')
    } else if (topLeft && topLeft === middleLeft && topLeft === bottomLeft) {
        handleWinner(topLeft)
        gameCells[0].classList.add('won')
        gameCells[3].classList.add('won')
        gameCells[6].classList.add('won')
    } else if (middleMiddle && middleMiddle === topMiddle && middleMiddle === bottomMiddle) {
        handleWinner(middleMiddle)
        gameCells[4].classList.add('won')
        gameCells[1].classList.add('won')
        gameCells[7].classList.add('won')
    } else if (topRight && topRight === middleRight && topRight === bottomRight) {
        handleWinner(topRight)
        gameCells[0].classList.add('won')
        gameCells[5].classList.add('won')
        gameCells[8].classList.add('won')
    } else if (topLeft && topLeft === middleMiddle && topLeft === bottomRight) {
        handleWinner(topLeft)
        gameCells[0].classList.add('won')
        gameCells[4].classList.add('won')
        gameCells[8].classList.add('won')
    } else if (topRight && topRight === middleMiddle && topRight === bottomLeft) {
        handleWinner(topRight)
        gameCells[2].classList.add('won')
        gameCells[4].classList.add('won')
        gameCells[6].classList.add('won')
    } else if (topLeft && topMiddle && topRight && middleLeft && middleMiddle && middleRight && bottomLeft && bottomMiddle && bottomRight) {
        gameIsLive - false
        statusX.innerHTML = `Game is tied`;
    } else {
        xIsNext = !xIsNext
        if (xIsNext) {
            statusX.innerHTML = `${xSymbol} is next`
        } else {
            statusX.innerHTML = `<span>${oSymbol} is next</span>`
        }
    }
}

// event Handlers
const handleReset = () => {
    xIsNext = true
    statusX.innerHTML = `${xSymbol} is next`
    for  (const gameCell of gameCells) {
        gameCell.classList.remove('x')
        gameCell.classList.remove('o')
        gameCell.classList.remove('won')
    }
    gameIsLive = true
}

const handleCellClick = (e) => {
    const classList = e.target.classList

    if(!gameIsLive || classList[1] === 'x' || classList[1] === 'o') {
        return
    }

    if (xIsNext) {
        classList.add('x')
        checkGameStatus()
    } else {
        classList.add('o')
        checkGameStatus()
    }
}

// event listeners
resetGame.addEventListener('click', handleReset)

for (const gameCell of gameCells) {
    gameCell.addEventListener('click', handleCellClick)
}