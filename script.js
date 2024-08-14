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

    return {getBoard, addMark, reset};
})();

function GameFlow()
{
    const player1 =
        {
            name: "player1",
            mark: 'O',
            score: 0,
            winner: false,
        }
    const player2 =
        {
            name: "player2",
            mark: 'X',
            score: 0,
            winner: false,
        }
        const setPlayer1Name = (name) => player1.name = name;
        const setPlayer2Name = (name) => player2.name = name;
        const getPlayer1Name = () => player1.name;
        const getPlayer2Name = () => player2.name;
        const isWinner = () => (player1.winner || player2.winner);
        const getScore = ()=> [player1.score, player2.score];
        let turn = true;

        const playRound = (index) =>{
            if(GameBoard.getBoard()[index] !== '.') return;
            const player = turn?player1:player2;
            GameBoard.addMark(index, player.mark);
            if(decideWinner(player.mark)){
                player.score++;
                player.winner = true;
            }
            turn = !turn;
        }

        return {setPlayer1Name, setPlayer2Name, getPlayer1Name, getPlayer2Name, getScore, playRound, isWinner};
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



function initiateGame(board)
{
    GameBoard.reset();
    clearDOM();
    const newGame = GameFlow();
    function markCell(e)
    {
            e.stopPropagation();
            const cell = e.target;
            if(cell.hasAttribute("index") && GameBoard.getBoard().includes('.') && !newGame.isWinner())
            {
               
                console.log(cell.getAttribute('index'));
                const val = cell.getAttribute('index')          
                newGame.playRound(val);
                markOnDOM(cell);
    
            }
            if(!GameBoard.getBoard().includes('.') && !newGame.isWinner())
                {
                    console.log("Tie!");
                }
            if(newGame.isWinner())
            {
                const score = newGame.getScore();
                console.log("final score", score);
                const winPlayer = score[0]>score[1]?newGame.getPlayer1Name():newGame.getPlayer2Name();
                console.log(winPlayer, "wins!");
            }
            console.log(GameBoard.getBoard()); 
    }
    board.addEventListener("click", markCell)
    

} // not initiating game yet;  


//DOM UI:

const constructStruct = (function(doc)
{
    const gameBoard = doc.querySelector('#gameBoard');
    gameBoard.replaceChildren();
    const start = doc.querySelector("#start");
    // const restart = doc.querySelector("#restart");

    for(let i=0; i< 9; ++i)
    {
        const div = doc.createElement('div');
        div.setAttribute('index', i);
        gameBoard.append(div);
    }
    start.addEventListener("click", ()=>{
        initiateGame(gameBoard);
    });

})(document);

function markOnDOM(target)
{
    target.replaceChildren();
    const p = document.createElement('p');
    p.textContent = `${GameBoard.getBoard()[target.getAttribute('index')]}`;
    console.log(GameBoard.getBoard[target.getAttribute('index')]);
    target.appendChild(p);
}

function clearDOM()
{
    const gameBoard = document.querySelector('#gameBoard');
    const cells = gameBoard.querySelectorAll('div');
    cells.forEach(e => (e.replaceChildren()));
}