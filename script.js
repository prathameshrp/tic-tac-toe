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
        }
    const player2 =
        {
            name: "player2",
            mark: 'X',
            score: 0,
        }
        const setPlayer1Name = (name) => player1.name = name;
        const setPlayer2Name = (name) => player1.name = name;

        const getScore = ()=> [player1.score, player2.score];
        let turn = true;

        const playRound = (index) =>{
            const player = turn?player1:player2;
            GameBoard.addMark(index, player.mark);
            turn = !turn;
        }

        return {setPlayer1Name, setPlayer2Name, getScore, playRound};
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
    const createPlayer = playerFactory();

    const player1 = createPlayer('player1');
    const player2 = createPlayer('player2');
    let turn = true;
    function markCell(e)
    {
        {
            e.stopPropagation();
            const cell = e.target;
            if(cell.hasAttribute("index"))
            {
                let board = GameBoard.getBoard();
                if(board.filter(x=>x==='.').length === 0)
                    console.log("Tie");
                console.log("length:",board.filter(x=>x==='.').length, !board.filter(x=>x==='.').length);
                let player = turn?player1:player2;
                turn = !turn;
    
                console.log(cell.getAttribute('index'));
                const val = cell.getAttribute('index')          
                if(playRound(player, val)){
                    console.log("Final Score:" +'\nPlayer1: '+ player1.finalScore()+'\nPlayer2: '+player2.finalScore());
                    board.removeEventListener("click", markCell);
                }
                markOnDOm(cell);
    
            }
            console.log(GameBoard.getBoard());
    }
}
    board.addEventListener("click", markCell)
    

}; // not initiating game yet;  


//DOM UI:

function constructStruct(doc)
{
    const gameBoard = doc.querySelector('#gameBoard');
    gameBoard.replaceChildren();
    const btn = doc.querySelector("#start");
    btn.addEventListener("click", initiateGame(gameBoard))
    for(let i=0; i< 9; ++i)
    {
        const div = doc.createElement('div');
        div.setAttribute('index', i);
        gameBoard.append(div);
    }

}
constructStruct(document);

function markOnDOm(target)
{
    target.replaceChildren();
    const p = document.createElement('p');
    p.textContent = `${GameBoard.getBoard()[target.getAttribute('index')]}`;
    console.log(GameBoard.getBoard[target.getAttribute('index')]);
    target.appendChild(p);
}
