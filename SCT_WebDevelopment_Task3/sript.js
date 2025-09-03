const boardElement = document.getElementById("board");
    const statusElement = document.getElementById("status");
    let board = Array(9).fill(null);
    let currentPlayer = "X";
    let gameActive = false;
    let mode = null;

    function setMode(selectedMode) {
      mode = selectedMode;
      restartGame();
      statusElement.textContent = 
        mode === "pvp" ? "Player vs Player - X starts" : "Player vs Computer - You are X";
    }

    function createBoard() {
      boardElement.innerHTML = "";
      board.forEach((_, i) => {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        cell.addEventListener("click", handleCellClick);
        boardElement.appendChild(cell);
      });
    }

    function handleCellClick(e) {
      const index = e.target.dataset.index;
      if (!gameActive || board[index]) return;

      board[index] = currentPlayer;
      e.target.textContent = currentPlayer;

      if (checkWinner()) {
        statusElement.textContent = `${currentPlayer} Wins!`;
        gameActive = false;
        return;
      }

      if (board.every(cell => cell)) {
        statusElement.textContent = "It's a Draw!";
        gameActive = false;
        return;
      }

      currentPlayer = currentPlayer === "X" ? "O" : "X";
      statusElement.textContent = `Player ${currentPlayer}'s turn`;

      if (mode === "pvc" && currentPlayer === "O" && gameActive) {
        setTimeout(computerMove, 500);
      }
    }

    function computerMove() {
      let available = board.map((v, i) => v ? null : i).filter(v => v !== null);
      let choice = available[Math.floor(Math.random() * available.length)];
      board[choice] = "O";
      document.querySelector(`.cell[data-index='${choice}']`).textContent = "O";

      if (checkWinner()) {
        statusElement.textContent = "Computer Wins!";
        gameActive = false;
        return;
      }

      if (board.every(cell => cell)) {
        statusElement.textContent = "It's a Draw!";
        gameActive = false;
        return;
      }

      currentPlayer = "X";
      statusElement.textContent = "Your turn (X)";
    }

    function checkWinner() {
      const wins = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
      ];
      return wins.some(([a,b,c]) => 
        board[a] && board[a] === board[b] && board[a] === board[c]
      );
    }

    function restartGame() {
      board = Array(9).fill(null);
      currentPlayer = "X";
      gameActive = true;
      createBoard();
      if (mode === "pvp") {
        statusElement.textContent = "Player X's turn";
      } else if (mode === "pvc") {
        statusElement.textContent = "Your turn (X)";
      } else {
        statusElement.textContent = "Choose a mode to start";
      }
    }

    createBoard();
  