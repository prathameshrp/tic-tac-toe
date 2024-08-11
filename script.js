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
    const reset = ()=> gameBoard.fill('.');

    return {gameBoard, getBoard, addMark, reset};
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

function playRound(player, value)
{
   
    GameBoard.addMark(value, player.playerMark());
    
    if(decideWinner(player.playerMark()))
    {
        player.won();
        console.log(player.name, " Won!");
        player.resetWin();
        GameBoard.reset();
        return(true);
    }

    return false;
}

function initiateGame(board)
{
    const createPlayer = playerFactory();

    const player1 = createPlayer('player1');
    const player2 = createPlayer('player2');
    let turn = true;
    board.addEventListener("click", (e)=>{
        e.stopPropagation();
        const cell = e.target;
        if(cell.hasAttribute("index"))
        {
            let player = turn?player1:player2;
            turn = !turn;
            markOnDOm(cell, player.playerMark());

            console.log(cell.getAttribute('index'));
            const val = cell.getAttribute('index')          
            if(playRound(player, val))
                console.log("Final Score:" +'\nPlayer1: '+ player1.finalScore()+'\nPlayer2: '+player2.finalScore());
        }
        console.log(GameBoard.getBoard());
    })
    

}; // not initiating game yet;  



//DOM UI:

const constructStruct = (function(doc)
{
    const gameBoard = doc.querySelector('#gameBoard');
    const btn = doc.querySelector("#start");
    btn.addEventListener("click", initiateGame(gameBoard))
    for(let i=0; i< 9; ++i)
    {
        const div = doc.createElement('div');
        div.setAttribute('index', i);
        gameBoard.append(div);
    }

})(document);

function markOnDOm(target, element)
{
    const p = document.createElement('p');
    p.textContent = element;
    target.appendChild(p);
}