const boardSize = 11;
const board = document.getElementById('board');
const cells = [];

let currentPlayer = 'player';
let gameState = 'ongoing';

// Create the game board
for (let i = 0; i < boardSize; i++) {
  for (let j = 0; j < boardSize; j++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cells.push(cell);
    board.appendChild(cell);

    cell.addEventListener('click', () => makeMove(i, j));
  }
}

// Function to switch the current player
function switchPlayer() {
  currentPlayer = currentPlayer === 'player' ? 'ai' : 'player';
}

// Function to check if a move is valid
function isValidMove(row, col) {
  // Check if the cell is empty
  if (cells[row * boardSize + col].classList.length === 1) {
    // Check if the move is within the board boundaries
    if (row >= 0 && row < boardSize && col >= 0 && col < boardSize) {
      return true;
    }
  }
  return false;
}

// Function to make a move
function makeMove(row, col) {
  if (gameState !== 'ongoing') {
    return;
  }

  if (currentPlayer === 'player') {
    if (isValidMove(row, col)) {
      cells[row * boardSize + col].classList.add('player');
      switchPlayer();
      checkGameStatus();
      if (gameState === 'ongoing') {
        makeAIMove();
      }
    }
  }
}

// Function to generate random AI move
function makeAIMove() {
  const availableMoves = [];

  for (let i = 0; i < cells.length; i++) {
    if (cells[i].classList.length === 1) {
      availableMoves.push(i);
    }
  }

  const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
  cells[randomMove].classList.add('ai');
  switchPlayer();
  checkGameStatus();
}

// Function to check the game status
function checkGameStatus() {
  // Check if the player has won
  const playerPieces = document.getElementsByClassName('player');
  if (playerPieces.length === 1) {
    gameState = 'player-won';
    alert('You win!');
    return;
  }

  // Check if the AI has won
  const aiPieces = document.getElementsByClassName('ai');
  if (aiPieces.length === 1) {
    gameState = 'ai-won';
    alert('You lose!');
    return;
  }

  // Check if the game is a draw
  const availableMoves = [];
  for (let i = 0; i < cells.length; i++) {
    if (cells[i].classList.length === 1) {
      availableMoves.push(i);
    }
  }

  if (availableMoves.length === 0) {
    gameState = 'draw';
    alert("It's a draw!");
    return;
  }
}

const playerStartPosition = [
  [5, 5], [5, 4], [4, 5], [6, 5], [5, 6]
];

const aiStartPosition = [
  [0, 3], [0, 4], [0, 5], [1, 4], [5, 0], [5, 1], [5, 9], [5, 10], [6, 5], [10, 3], [10, 4], [10, 5]
];

// Function to initialize the game board
function initializeBoard() {
  cells.forEach(cell => cell.classList.remove('player', 'ai'));

  for (let i = 0; i < playerStartPosition.length; i++) {
    const [row, col] = playerStartPosition[i];
    cells[row * boardSize + col].classList.add('player');
  }

  for (let i = 0; i < aiStartPosition.length; i++) {
    const [row, col] = aiStartPosition[i];
    cells[row * boardSize + col].classList.add('ai');
  }
}

// Reset the game
function resetGame() {
  currentPlayer = 'player';
  gameState = 'ongoing';
  initializeBoard();
}

// Event listener for the reset button
const resetButton = document.getElementById('reset-button');
resetButton.addEventListener('click', resetGame);

// Call initializeBoard to set up the initial game state
initializeBoard();
