document.addEventListener('DOMContentLoaded', () => {
  class Board {
    constructor(WIDTH = 7, HEIGHT = 6) {
      this.WIDTH = WIDTH;
      this.HEIGHT = HEIGHT;
      this.board = [];
      this.activePlayer = 1;
    }
    createCells() {
      for (let y = 0; y < this.HEIGHT; y++) {
        this.board.push(Array(this.WIDTH).fill(null));
      }
      return this.board;
    }
    getActivePlayer() {
      return this.activePlayer;
    }
    updateActivePlayer() {
      this.activePlayer = this.getActivePlayer() === 1 ? 2 : 1;
    }
  }

  class Game extends Board {
    constructor(WIDTH, HEIGHT) {
      super(WIDTH, HEIGHT);
      this.htmlBoard = document.getElementById('board');
      this.createCells();
    }
    makeHtmlBoard() {
      this.top = document.createElement('tr');
      this.top.setAttribute('id', 'column-top');
      // this.top.addEventListener('click', handleClick);

      for (let x = 0; x < this.WIDTH; x++) {
        this.headCell = document.createElement('td');
        this.headCell.setAttribute('id', x);
        this.top.append(this.headCell);
      }

      this.htmlBoard.append(this.top);

      for (let y = 0; y < this.HEIGHT; y++) {
        this.row = document.createElement('tr');

        for (let x = 0; x < this.WIDTH; x++) {
          this.cell = document.createElement('td');
          this.cell.setAttribute('id', `${y}-${x}`);
          this.row.append(this.cell);
        }
        this.htmlBoard.append(this.row);
      }
    }
  }

  const myGame = new Game();
  console.log(myGame.makeHtmlBoard());
});

// function findSpotForCol(x) {
//   for (let y = HEIGHT - 1; y >= 0; y--) {
//     if (!board[y][x]) {
//       return y;
//     }
//   }
//   return null;
// }

// function placeInTable(y, x) {
//   const piece = document.createElement('div');
//   piece.classList.add('piece');
//   piece.classList.add(`p${currPlayer}`);
//   piece.style.top = -50 * (y + 2);

//   const spot = document.getElementById(`${y}-${x}`);
//   spot.append(piece);
// }

// function endGame(msg) {
//   alert(msg);
// }

// function handleClick(evt) {

//   const x = +evt.target.id;

//   const y = findSpotForCol(x);
//   if (y === null) {
//     return;
//   }

//   board[y][x] = currPlayer;
//   placeInTable(y, x);

//   if (checkForWin()) {
//     return endGame(`Player ${currPlayer} won!`);
//   }

//   if (board.every((row) => row.every((cell) => cell))) {
//     return endGame('Tie!');
//   }

//   currPlayer = currPlayer === 1 ? 2 : 1;
// }

// function checkForWin() {
//   function _win(cells) {

//     return cells.every(
//       ([y, x]) =>
//         y >= 0 &&
//         y < HEIGHT &&
//         x >= 0 &&
//         x < WIDTH &&
//         board[y][x] === currPlayer
//     );
//   }

//   for (let y = 0; y < HEIGHT; y++) {
//     for (let x = 0; x < WIDTH; x++) {

//       const horiz = [
//         [y, x],
//         [y, x + 1],
//         [y, x + 2],
//         [y, x + 3],
//       ];
//       const vert = [
//         [y, x],
//         [y + 1, x],
//         [y + 2, x],
//         [y + 3, x],
//       ];
//       const diagDR = [
//         [y, x],
//         [y + 1, x + 1],
//         [y + 2, x + 2],
//         [y + 3, x + 3],
//       ];
//       const diagDL = [
//         [y, x],
//         [y + 1, x - 1],
//         [y + 2, x - 2],
//         [y + 3, x - 3],
//       ];

//       if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
//         return true;
//       }
//     }
//   }
// }

// makeBoard();
// makeHtmlBoard();
