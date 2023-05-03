# Refactoring the code to make use of OOP involves encapsulating the relevant data and functions into classes, such that the functions and data that manipulate and represent the game state are organized and managed by an object. This approach allows for better modularization and abstraction of code, making it more maintainable and easier to reason about. Here are the steps to refactor the code

1. Create a `Board` class that represents the game board. The board class should have the following properties:

   - `width`: the width of the board
   - `height`: the height of the board
   - `cells`: a 2D array representing the cells on the board
   - `activePlayer`: the active player, initialized to 1

   The `Board` class should have the following methods:

   - `constructor(width, height)`: initializes the board with a given width and height.
   - `getCells()`: returns the 2D array representing the cells on the board.
   - `getActivePlayer()`: returns the active player.
   - `switchActivePlayer()`: switches the active player.
   - `placePiece(column)`: places a piece in the given column.
   - `checkForWin()`: checks if the game has been won.

2. Create a `Game` class that represents the game state. The game class should have the following properties:

   - `board`: a `Board` instance representing the game board
   - `htmlBoard`: the HTML element representing the game board

   The `Game` class should have the following methods:

   - `constructor()`: initializes the game state.
   - `start()`: starts the game by creating the HTML table and board, and adding event listeners to the column tops.
   - `updateHtmlBoard()`: updates the HTML board to reflect the state of the game board.
   - `handleClick(evt)`: the event handler for clicks on the column tops.
   - `announceEnd(msg)`: announces the end of the game with a message.
   - `play()`: plays the game.

3. Instantiate the `Game` class and call the `play()` method to start the game.

## By refactoring the code in this way, we can encapsulate the game state into an object, making it easier to reason about and maintain. We can also abstract away the details of the game board, such as its dimensions and how pieces are placed and checked for wins, into a separate class, which can be reused in other games with similar mechanics
