const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");

const xScoreEl = document.getElementById("xScore");
const oScoreEl = document.getElementById("oScore");

const resetBtn = document.getElementById("resetBtn");
const newGameBtn = document.getElementById("newGameBtn");

const pvpBtn = document.getElementById("pvpBtn");
const cpuBtn = document.getElementById("cpuBtn");

let board = ["","","","","","","","",""];
let currentPlayer = "X";
let running = true;
let vsComputer = false;

let xScore = 0;
let oScore = 0;

const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

cells.forEach(cell=>{
    cell.addEventListener("click", cellClicked);
});

pvpBtn.addEventListener("click",()=>{
    vsComputer = false;
    newGame();
});

cpuBtn.addEventListener("click",()=>{
    vsComputer = true;
    newGame();
});

resetBtn.addEventListener("click", resetBoard);
newGameBtn.addEventListener("click", newGame);

function cellClicked(){

    const index = this.dataset.index;

    if(board[index] !== "" || !running) return;

    makeMove(index,this);

    if(vsComputer && running && currentPlayer==="O"){
        setTimeout(computerMove,500);
    }
}

function makeMove(index,cell){
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;

    checkWinner();
}

function checkWinner(){

    for(let pattern of winPatterns){

        const [a,b,c] = pattern;

        if(
            board[a] &&
            board[a] === board[b] &&
            board[b] === board[c]
        ){

            cells[a].classList.add("win");
            cells[b].classList.add("win");
            cells[c].classList.add("win");

            if(currentPlayer==="X"){
                xScore++;
                xScoreEl.textContent=xScore;
            }else{
                oScore++;
                oScoreEl.textContent=oScore;
            }

            showWinner(currentPlayer);
            running=false;
            return;
        }
    }

    if(!board.includes("")){
        document.getElementById("winnerText").innerHTML =
        "🤝 It's a Draw!";
        document.getElementById("winnerPopup").style.display = "flex";
        running=false;
        return;
    }

    currentPlayer = currentPlayer==="X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer} Turn`;
}

function computerMove(){

    let empty = [];

    board.forEach((cell,index)=>{
        if(cell==="") empty.push(index);
    });

    if(empty.length===0) return;

    let randomIndex =
    empty[Math.floor(Math.random()*empty.length)];

    board[randomIndex]="O";
    cells[randomIndex].textContent="O";

    checkWinner();
}

function showWinner(player){

    document.getElementById("winnerText").innerHTML =
    `🎉 Congratulations!<br><br>Player ${player} Wins 🏆`;

    document.getElementById("winnerPopup").style.display="flex";
}

function closePopup(){

    document.getElementById("winnerPopup").style.display="none";
    resetBoard();
}

function resetBoard(){

    board = ["","","","","","","","",""];
    currentPlayer = "X";
    running = true;

    statusText.textContent = "Player X Turn";

    cells.forEach(cell=>{
        cell.textContent="";
        cell.classList.remove("win");
    });
}

function newGame(){

    resetBoard();

    xScore=0;
    oScore=0;

    xScoreEl.textContent=0;
    oScoreEl.textContent=0;
}