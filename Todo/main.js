// 유저가 값을 입력한다.
// +버튼을 클릭하면 할일이 추가된다.
// delete 버튼을 누르면 할일이 삭제된다.
// check 버튼을 누르면 할일이 끝나면서 밑주링 간다.
// Doing, Done 탭을 누르면 언더바가 이동한다.
// Done 탭은 Done 상태인 아이템만 Doing 탭은 Doing 상태인 아이템만 뜨게 한다.
// All 탭을 누르면 다시 전체 아이템으로 돌아온다.

let taskInput = document.getElementById('task-input');
let addButton = document.getElementById('add-button')
let taskList = []

addButton.addEventListener('click', addTask);

function addTask() {
    let taskContent = taskInput.value
    taskList.push(taskContent)
    console.log(taskList)
    render()
}


function render() {
    let resultHTML = ''
    for (let i = 0; i < taskList.length; i++) {
        resultHTML += `  <div class="task">
        <div>${taskList[i]}</div>
        <div>
            <button>Check</button>
            <button>Delete</button>
        </div>
    </div>`;
        
    }
    document.getElementById('task-board').innerHTML = resultHTML
}