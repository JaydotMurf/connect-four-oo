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
      this.handleClick = this.handleClick.bind(this);
      this.resetGame = this.resetGame.bind(this);
      this.resetButton = document.getElementById('button-17');
      this.createCells();
    }
    start() {
      this.top = document.createElement('tr');
      this.top.setAttribute('id', 'column-top');
      this.top.addEventListener('click', this.handleClick);
      this.resetButton.addEventListener('click', this.resetGame);

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
    handleClick(evt) {
      this.x = +evt.target.id;
      this.y = this.findSpaceInColumn(this.x);
      if (this.y === null) {
        alert(`Column full!`);
        return;
      }
      this.board[this.y][this.x] = this.activePlayer;
      this.placePieceInGame(this.y, this.x);

      this.isWinningBoard = this.checkForWin();
      if (this.isWinningBoard)
        return this.endGame(`Player ${this.activePlayer} won!`);

      this.isTiedGame = this.board.every((row) => row.every((cell) => cell));
      if (this.isTiedGame) return this.endGame(`Game Tied!`);

      this.activePlayer = this.activePlayer === 1 ? 2 : 1;
    }
    findSpaceInColumn(x) {
      for (let y = this.HEIGHT - 1; y >= 0; y--) {
        if (!this.board[y][x]) {
          return y;
        }
      }
      return null;
    }
    placePieceInGame(y, x) {
      this.piece = document.createElement('div');
      this.piece.classList.add('piece');
      this.piece.classList.add(`p${this.activePlayer}`);
      this.piece.style.top = -50 * (y + 2);
      this.spot = document.getElementById(`${y}-${x}`);
      this.spot.append(this.piece);
    }
    checkForWin() {
      for (let y = 0; y < this.HEIGHT; y++) {
        for (let x = 0; x < this.WIDTH; x++) {
          this.horiz = [
            [y, x],
            [y, x + 1],
            [y, x + 2],
            [y, x + 3],
          ];
          this.vert = [
            [y, x],
            [y + 1, x],
            [y + 2, x],
            [y + 3, x],
          ];
          this.diagDR = [
            [y, x],
            [y + 1, x + 1],
            [y + 2, x + 2],
            [y + 3, x + 3],
          ];
          this.diagDL = [
            [y, x],
            [y + 1, x - 1],
            [y + 2, x - 2],
            [y + 3, x - 3],
          ];

          if (
            this._win(this.horiz) ||
            this._win(this.vert) ||
            this._win(this.diagDR) ||
            this._win(this.diagDL)
          ) {
            return true;
          }
        }
      }
    }
    _win(cells) {
      return cells.every(
        ([y, x]) =>
          y >= 0 &&
          y < this.HEIGHT &&
          x >= 0 &&
          x < this.WIDTH &&
          this.board[y][x] === this.activePlayer
      );
    }
    endGame(msg) {
      alert(msg);
    }
    resetGame() {
      this.board.forEach((row) => row.fill(null));
      this.gamePieces = document.querySelectorAll('.piece');
      this.gamePieces.forEach((piece) => piece.remove());
      this.activePlayer = 1;
    }
  }

  const myGame = new Game();
  myGame.start();
});
