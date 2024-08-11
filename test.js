const GameBoard = (function(){

  // const gameBoard = [...Array(9).keys()].map((x)=> x= 0);
  const gameBoard = Array(9).fill('.');

  // const availableCells = gameBoard.filter((x)=> x == 0);

  const addMark = function(index, playerMark)
  {
      if(gameBoard[index] !== '.') return;
      gameBoard[index] = playerMark;

  };
  const getBoard = ()=> [...gameBoard];

  return {gameBoard, getBoard, addMark};
})();

console.log(GameBoard.getBoard());

const playerFactory = () =>
  {
      let currentPlayerNo = 0;
      return  function(name)
          {
          let mark = currentPlayerNo++?'X':'O';
          let score = 0;
          let win = false;
          const playerMark = () => mark;
          const finalScore = () => score;
          const won = function(){
              win = true;
              score++;
              };
          const isWinner = () => win;
          const resetWin = () => win = false;
          return {win, name, playerMark, finalScore, won, isWinner, resetWin};
          }
  }

  const createPlayer = playerFactory();
  const player1 = createPlayer('yash');
  console.log(player1);
  console.log(player1.isWinner());

const player2 = createPlayer('khushi');

GameBoard.addMark(3, player1.playerMark());
GameBoard.addMark(0, player2.playerMark());

console.log(GameBoard.getBoard());
const check = function(arr = [1,1,2,1,]){ return arr.every(x => x === arr[0])};
console.log(check())
player1.won();
console.log(player1)
console.log(player1.isWinner());
console.log(!player1.isWinner() && !player2.isWinner())