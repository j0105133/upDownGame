//램덤번호 지정
//유저가 번호를 입력한다. 그리고 go라는 버튼을 누름
//만약에 유저가 램덤번호를 맞추면, 맞췄습니다!
//랜덤 번호가 < 유저번호  DOWN
//랜덤 번호가 < 유저번호  up
//reset 버튼을 누르면 게임이 리셋된다
//5번의 기회를 다쓰면 게임이 끝난다.(더이상 추측 불가, 버튼이 disable)
//유저가 1~100 범위 밖에 숫자를 입력함변 알려준다. 기회를 깍지 않는다
//유저가 이미 입력한 숫자를 또 입력하면, 기회를 깍지 않는다.


let computerNum =0;
let playButton = document.getElementById("play-button");
let userInput = document.getElementById("user-input");
let resultArea = document.getElementById("result-area");
let resetButton = document.getElementById("reset-button");
let chance = 3;
let gameOver  = false;
let chanceArea = document.getElementById("chance-area");
let answerArea =document.getElementById("answer-area");
let historyArea =document.getElementById("history-area")
let history = [];
userInput.addEventListener("focus", inputReset);

playButton.addEventListener("click",play);
resetButton.addEventListener("click",reset);
// 마우스를 올렸을 때 정답을 표시하는 이벤트 리스너 추가
answerArea.addEventListener("mouseover", showAnswer);
answerArea.addEventListener("mouseout", hideAnswer);
function inputReset(){
userInput.value = ""

} 


function pickComputerNum(){
    computerNum = Math.floor(Math.random() * 100)+1;
    console.log("정답", computerNum);
    hideAnswer();
    
}


function play(){
    let userValue = userInput.value;
    
   
    console.log("기회: ",chance);
   
   
    if (userValue < 1 || userValue > 100) {
        resultArea.textContent = "1과 100 사이의 숫자를 입력해 주세요.";
        return;
    }
 
   // 동일한 숫자가 두 번째로 입력된 경우 확인
   let count = 0;
   for (let i = 0; i < history.length; i++) {
       if (history[i] === userValue) {
           count++;
       }
   }

   if (count > 0) {
        resultArea.textContent = "이미 입력한 숫자입니다.";
        return;
    }
    history.push(userValue);
    historyArea.textContent = `현제까지 입력된 숫자는[ ${history} ]입니다`;


    if(userValue < computerNum){
        resultArea.textContent="Up";
        chance--;
        
    }else if(userValue > computerNum){
        resultArea.textContent="Down";
        chance--;
        
    }else{
        resultArea.textContent="축하합니다! 정답을 맞추셨습니다!";
        playButton.disabled =true;
    }
    chanceArea.textContent = `남은기회: ${chance}번`;
 

    if (chance < 1){
        gameOver =true;
        resultArea.textContent="기회는 모두 끝났습니다.GAME OVER";
    }
    if(gameOver == true){
        playButton.disabled =true;
    }
}
// 마우스를 올리면 정답을 표시하는 함수
function showAnswer() {
    answerArea.textContent = `정답은: ${computerNum}입니다`;
}

// 마우스를 치우면 힌트 메시지로 돌아가는 함수
function hideAnswer() {
    answerArea.textContent = "정답을 보려면 여기에 마우스를 올리세요";
}


function reset(){
    userInput.value = "";
    pickComputerNum();
    resultArea.textContent = "결과값이 0이 나옵니다.";
    playButton.disabled = false;
    chance = 3;
    chanceArea.textContent = `남은기회: ${chance}번`;
    historyArea.textContent = "입력한 숫자가 표시됩니다.";
    gameOver = false;
    history = [];
}
pickComputerNum();
