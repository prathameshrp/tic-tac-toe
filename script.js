//store gameboard inside an array of Gameboard object

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
        const won = ()=>{
            win=true;
            score++;
            };
        const isWinner = () => win;
        const resetWin = () => win = false;
        return {win, name, playerMark, finalScore, won, isWinner, resetWin};
        }
}
function decideWinner(mark)
    {
    let board = GameBoard.getBoard();

        const check = function(arr){ return arr.every(x => x === mark)};

        for(let i = 0; i < 3; ++i)
        {
            let row = board.slice(i*3, i*3+3);
            let column = board.filter((y,x) => x%3 === i );
         
            if(check(row) || check(column))
            {
                return true;
            }
        }
        
        let pDiagonal = board.filter((y,x) => parseInt(x/3) === parseInt(x%3));
        let sDiagonal = board.filter((y,x) => parseInt(x/3)+parseInt(x%3) === 2);
        if(check(pDiagonal) || check(sDiagonal))
            return true;

        return false;
    }

function playRound(player1, player2)
{
   
    let board = GameBoard.getBoard();

    // console.log(GameBoard.getBoard());

    if(!board.filter(x => x === '.'))
        return false;

    const player1Turn = prompt("Player1 marks: ");
    // const player1Turn = 4;

    GameBoard.addMark(player1Turn, player1.playerMark());
    
    if(decideWinner(player1.playerMark()))
    {
        player1.won();
        return true;
    }

    const player2Turn = prompt("Player2 marks: ");
    // const player2Turn = 8;

    GameBoard.addMark(player2Turn, player2.playerMark());

    if(decideWinner(player2.playerMark()))
        {
            player2.won();
            return true;
        }
    
    
    return true;

}

const initiateGame = (function()
{
    const createPlayer = playerFactory();

    const player1 = createPlayer('player1');
    const player2 = createPlayer('player2');

    while(!player1.isWinner() && !player2.isWinner())
    {
        const round = playRound(player1, player2);
        if(!round)
        {
            console.log("It's a tie!");
            break;
        }
        console.log(GameBoard.getBoard());
    }

    if(player1.isWinner())
        console.log("Player1 won!");

    else if(player2.isWinner())
        console.log("Player2 won!");

    console.log("Final Score:" +'\nPlayer1: '+ player1.finalScore()+'\nPlayer2: '+player2.finalScore());
    player1.resetWin();
    player2.resetWin();
})();   
// console.log(GameBoard);
// GameBoard.getBoard().push(1);
// console.log(GameBoard.getBoard());