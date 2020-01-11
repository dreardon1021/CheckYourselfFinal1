//initial objects
var task = new Task(generateNum());
var toDoList = new ToDoList(generateNum());
//querySelectors Buttons
var closeButton = document.querySelector('.close-button');
var addTaskButton = document.querySelector('.add-task-button');
var makeTaskListButton = document.querySelector('.make-list-button');
var clearButton = document.querySelector('.clear-button')
//querySelectors Containers
var leftTaskContainer = document.querySelector('.current-task-list');
var rightColumn = document.querySelector('.right-column');
//querySelectors Inputs
var taskInput = document.querySelector('.task-input');
var taskTitle = document.querySelector('.task-title-input');
// querySelector generalElements
var noTaskMessage = document.querySelector('#no-tasks');

// EventListeners
leftTaskContainer.addEventListener('click', closeLeftTask);
addTaskButton.addEventListener('click', addSingleTask);
makeTaskListButton.addEventListener('click', taskButtonEvents);
clearButton.addEventListener('click', clearInputs);
taskInput.addEventListener('input', buttonEnables);
taskTitle.addEventListener('input', buttonEnables);

//Event Handelers
window.onload = function() {
  listsRemainOnRefresh();
}

function buttonEnables() {
  enableListButton();
  enableAddTaskButton();
  enableClearButton();
}

function taskButtonEvents(){
  addTaskCard()
  addListToCard();
  removeTasksOnSave();
  toDoList.saveToStorage();
  toDoList.title = taskTitle.value;
  makeTaskListButton.disabled = true;
  taskTitle.value = '';
  toDoList = new ToDoList(generateNum());
}

//Globally used functions
function generateNum() {
  return Math.floor(Math.random() * 10000)
};

function listsRemainOnRefresh() {
  for(var i = 0; i < window.localStorage.length; i++){
  var key = window.localStorage.key(i);
  var getList = window.localStorage.getItem(key);
  var parseList = JSON.parse(getList);
  toDoList = parseList;
  addTaskCard()
  addListToCard()
  };
};

// Left column task functions (adding/removing/disabling)
function closeLeftTask(event) {
  if(event.target.classList.contains('close-button')) {
    event.target.parentNode.remove();
  };
};

function clearInputs() {
  taskInput.value = '';
  taskTitle.value = '';
  clearButton.disabled = true;
};

function addSingleTask() {
  leftTaskContainer.insertAdjacentHTML('afterbegin',
  `<div class="left-task">
    <img class="close-button" src="assets/delete.svg" alt="delete">
    <p class="left-task-item">${taskInput.value}</p>
  </div>`);
  task.name = taskInput.value;
  taskInput.value = '';
  addTaskButton.disabled = true;
  toDoList.tasks.push(task);
  task = new Task(generateNum(), taskInput.value);
};

function removeTasksOnSave() {
  while (leftTaskContainer.firstChild) {
    leftTaskContainer.removeChild(leftTaskContainer.firstChild);
  };
};

//enable buttons
function enableAddTaskButton() {
  if (taskInput.value !== '') {
    addTaskButton.disabled = false;
  };
};

function enableListButton() {
  if(toDoList.tasks !== [] && taskTitle.value !== '') {
    makeTaskListButton.disabled = false;
  };
};

function enableClearButton() {
  if (taskInput.value !== '' || taskTitle.value !== '') {
    clearButton.disabled = false;
  };
};

// Add Task Card Functions
function addTaskCard() {
  noTaskMessage.remove();
  rightColumn.insertAdjacentHTML('afterbegin', `<div class="task-card">
  <div class="task-card-title">
    <h5>${taskTitle.value}</h5>
  </div>
    <div class="task-card-body">

    </div>
    <div class="task-card-footer">
      <div class="urgent">
        <img class="urgent-static" src="assets/urgent.svg" alt="urgent">
        <p>Urgent</p>
      </div>
      <div class="close-button-card-container">
        <img class="close-button"src="assets/delete.svg" alt="delete">
        <p>Delete</p>
      </div>
    </div>
    </div>`)
};

function addListToCard() {
  for(i = 0; i < toDoList.tasks.length; i++) {
  var cardBody = document.querySelector('.task-card-body');
  var newTaskCardList = document.createElement('div');
  var checkImage = document.createElement('img');
  var taskCardItem = document.createElement('p');
  var text = document.createTextNode(`${toDoList.tasks[i].name}`);
  newTaskCardList.classList.add('single-task');
  checkImage.classList.add('checkbox');
  checkImage.setAttribute('src', 'assets/checkbox.svg');
  newTaskCardList.appendChild(checkImage);
  newTaskCardList.appendChild(taskCardItem);
  taskCardItem.appendChild(text);
  cardBody.appendChild(newTaskCardList);
  };
};
