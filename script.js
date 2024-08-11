//store gameboard inside an array of Gameboard object

const GameBoard = (function(){

    // const gameBoard = [...Array(9).keys()].map((x)=> x= 0);
    const gameBoard = Array(9).fill(0);

    const addMark = function(index, player){ gameBoard[index] = player.mark};
    const getBoard = ()=> [...gameBoard];

    const availableCells = gameBoard.filter((x)=> x == 0);
    return {getBoard, addMark, availableCells};
})();

function createPlayer(name, mark)
{
    let score = 0;
    let win = false;
    const finalScore = () => win?score++:score;
    const won = ()=> win=true;

    return {name, mark, finalScore, won};
}

const initiateGame = (function()
{

})();
// console.log(GameBoard);
// GameBoard.getBoard().push(1);
// console.log(GameBoard.getBoard());