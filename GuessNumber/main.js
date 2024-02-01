
//1. 랜덤번호 지정
//2. 유저가 번호를 입력한다 그리고 go라는 버튼을 누름
//3. 만약에 유저가 랜덤번호를 맞추면, 맞췄습니다!
//4. 랜덤번호 < 유저번호 Down!
//5. 랜덤번호 > 유저번호 Up!
//6. Reset 버튼을 누르면 게임이 리셋된다
//7. 5번의 기회를 다 쓰면 게임이 끝난다 (더이상 추측불가, 버튼이 disable)
//8. 유저가 1~100 범위 밖에 숫자를 입력하면 알려준다. 기회를 깎지 않는다.
//9. 유저가 이미 입력한 숫자를 또 입력하면, 입력했는 숫자라고 알려준다. 기회를 깎지 않는다.


let randomNum = 0;
let playButton = document.getElementById('play-button')
let userInput = document.getElementById('user-input')
let resultArea = document.getElementById('result-area')
let chanceArea = document.getElementById('chance-area')
let resetButton = document.getElementById('reset-button')
let chance = 5
let gameOver = false
let history = [];



function pickRandomNum() {
    randomNum = Math.floor(Math.random() * 100) +1;
    console.log(randomNum);
}
pickRandomNum();

playButton.addEventListener('click', play);
resetButton.addEventListener('click', reset);
userInput.addEventListener('focus', function () {
    userInput.value = '';
})


function play() {
    let myNumber = userInput.value

    if (myNumber < 1 || myNumber > 100) {
        resultArea.textContent = '범위 내의 숫자를 입력하세요'
        return
    }
    if (history.includes(myNumber)) {
        resultArea.textContent = '이미 입력한 숫자입니다'
        return
    }
    chance --;
    chanceArea.textContent = `남은 기회 : ${chance}`
    if (myNumber < randomNum) {
        resultArea.textContent = 'UP!!!'
    } else if (myNumber > randomNum) {
        resultArea.textContent = 'DOWN!!!'
    } else {
        resultArea.textContent = '정답!!'
        gameOver = true;
    }
    history.push(myNumber);
    console.log(history);
    console.log(chance)


    if (chance < 1) {
        gameOver = true
    }
    if (gameOver == true) {
        playButton.disabled = true
    }
}

function reset() {
    userInput.value = ''
    pickRandomNum();
    resultArea.textContent = '리셋되었습니다!';
    chance = 5;
    console.log(chance)
    chanceArea.textContent = ' 남은 기회 : '
    playButton.disabled = false
    history = []
    console.log('리셋 : ' + history);
    gameOver = false
}