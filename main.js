//initial objects
var task = new Task(generateNum());
var toDoList = new ToDoList(generateNum());
//querySelectors Buttons
var closeButton = document.querySelector('.close-button');
var addTaskButton = document.querySelector('.add-task-button');
var makeTaskListButton = document.querySelector('.make-list-button');
var clearButton = document.querySelector('.clear-button');
var filterButton = document.querySelector('.filter-button');
//querySelectors Containers
var leftTaskContainer = document.querySelector('.current-task-list');
var rightColumn = document.querySelector('.right-column');
//querySelectors Inputs
var taskInput = document.querySelector('.task-input');
var taskTitle = document.querySelector('.task-title-input');
var searchInput = document.querySelector('.nav-search');
// querySelector generalElements
var noTaskMessage = document.querySelector('#no-tasks');

// EventListeners
addTaskButton.addEventListener('click', addSingleTask);
makeTaskListButton.addEventListener('click', taskButtonEvents);
clearButton.addEventListener('click', clearInputs);
filterButton.addEventListener('click', filterButtonEvents)
leftTaskContainer.addEventListener('click', closeLeftTask);
rightColumn.addEventListener('click', taskCardEvents);
taskTitle.addEventListener('input', buttonEnables);
taskInput.addEventListener('input', buttonEnables);
searchInput.addEventListener('keyup', searchFieldEvents);



//Event Handelers
window.onload = function() {
  listsRemainOnRefresh();
}

function searchFieldEvents() {
  if(filterButton.style.background === 'rgb(239, 74, 35)') {
    searchUrgentCards();
  } else {
    searchAllCards();
  };
};

function taskCardEvents() {
  toDoList.updateTask(event);
  var trueCheck = checkIfTrue(event);
  enableCloseButton(trueCheck, event);
  checkOffBox(event);
  deleteTaskCard(event);
  changeUrgentImage(event);
}

function buttonEnables() {
  enableListButton();
  enableAddTaskButton();
  enableClearButton();
}

function filterButtonEvents() {
  changeFilterButtonStyle();
  filterUrgentCards();
}

function taskButtonEvents() {
  toDoList.title = taskTitle.value;
  addTaskCard();
  addListToCard();
  removeTasksOnSave();
  toDoList.saveToStorage();
  makeTaskListButton.disabled = true;
  taskTitle.value = '';
  toDoList = new ToDoList(generateNum());
}

//Globally used functions
function generateNum() {
  return Math.floor(Math.random() * 10000);
};

function listsRemainOnRefresh() {
  for(var i = 0; i < window.localStorage.length; i++){
  var key = window.localStorage.key(i);
  var getList = window.localStorage.getItem(key);
  var parseList = JSON.parse(getList);
  toDoList = parseList;
  addTaskCard();
  addListToCard();
  toDoList = new ToDoList(generateNum());
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
  removeTasksOnSave();
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
  if(toDoList.tasks.length !== 0 && taskTitle.value !== '') {
    makeTaskListButton.disabled = false;
  };
};

function enableClearButton() {
  if (taskInput.value !== '' || taskTitle.value !== '') {
    clearButton.disabled = false;
  };
};

//filter button functions
function changeFilterButtonStyle() {
    if(filterButton.style.background === 'rgb(239, 74, 35)') {
      filterButton.style.background = '#1f1f3D';
    } else {
      filterButton.style.background = 'rgb(239, 74, 35)';
  };
};

function filterUrgentCards(){
  for(var i = 0; i < rightColumn.children.length; i++){
    if(rightColumn.children[i].classList.contains('task-card-urgent')) {
      rightColumn.children[i].style.display = 'block'
    } else {
      rightColumn.children[i].style.display = 'none'
    };
    if(filterButton.style.background !== 'rgb(239, 74, 35)') {
      rightColumn.children[i].style.display = 'block'
    };
  };
};

// Add Task Card Functions
function addTaskCard() {
  if(toDoList.urgent === true){
    urgentClass = 'task-card-urgent';
    urgentSrc = 'urgent-active'
  } else {
    urgentClass = 'task-card';
    urgentSrc = 'urgent';
  }
  noTaskMessage.remove();
  rightColumn.insertAdjacentHTML('afterbegin', `<div class="${urgentClass} ${toDoList.id}">
  <div class="task-card-title">
    <h5>${toDoList.title}</h5>
  </div>
    <div class="task-card-body">

    </div>
    <div class="task-card-footer">
      <div class="urgent">
        <img class="urgent-static" src="assets/${urgentSrc}.svg" alt="urgent">
        <p>Urgent</p>
      </div>
      <div class="close-button-card-container">
        <img class="close-button"src="assets/delete.svg" alt="delete">
      </div>
    </div>
  </div>`);
};

function addListToCard() {
  for(i = 0; i < toDoList.tasks.length; i++) {
  var cardBody = document.querySelector('.task-card-body');
  var newTaskCardList = document.createElement('div');
  var checkImage = document.createElement('img');
  var taskCardItem = document.createElement('p');
  var text = document.createTextNode(`${toDoList.tasks[i].name}`);
  newTaskCardList.classList.add('single-task');
  newTaskCardList.classList.add(`${toDoList.tasks[i].id}`);
  checkImage.classList.add('checkbox');
  checkImage.setAttribute('src', 'assets/checkbox.svg');
  newTaskCardList.appendChild(checkImage);
  newTaskCardList.appendChild(taskCardItem);
  taskCardItem.appendChild(text);
  cardBody.appendChild(newTaskCardList);
  if (toDoList.tasks[i].completed === true) {
    checkImage.classList.add('checkbox');
    checkImage.setAttribute('src', 'assets/checkbox-active.svg');
  } else{
    checkImage.classList.add('checkbox-complete');
    checkImage.setAttribute('src', 'assets/checkbox.svg');
    }
  };
};

//task card interaction Functions
function checkOffBox(event) {
  if (event.target.classList.contains('checkbox')) {
    var parentNode =  event.target.parentNode;
    var checkedOffImage = document.createElement('img');
    event.target.parentNode.removeChild(event.target);
    checkedOffImage.classList.add('checkbox-complete');
    checkedOffImage.setAttribute('src', 'assets/checkbox-active.svg');
    parentNode.prepend(checkedOffImage);
  };
};


function checkIfTrue(event) {
  for (var i = 0; i < window.localStorage.length; i++) {
    var key = window.localStorage.key(i);
    if (event.target.parentNode.parentNode.parentNode.classList.contains(key)) {
      var objectToChange = window.localStorage.getItem(key);
      var parsedObject = JSON.parse(objectToChange);
    };
  };
    var parsedTaskValues = [];
    for (var i = 0; i < parsedObject.tasks.length; i++) {
      parsedTaskValues.push(parsedObject.tasks[i].completed);
  };
  var isTrue = parsedTaskValues => parsedTaskValues === true;
  return parsedTaskValues.every(isTrue);
};

function enableCloseButton(trueCheck, event) {
  if(trueCheck == true && event.target.classList.contains('checkbox')) {
    var children = event.target.parentNode.parentNode.parentNode.children;
    children[2].children[1].children[0].remove();
    var redClose = document.createElement('img');
    redClose.classList.add('close-button-red');
    redClose.setAttribute('src', 'assets/delete-active.svg');
    children[2].children[1].prepend(redClose);
  };
};

function deleteTaskCard(event) {
  if (event.target.classList.contains('close-button-red')) {
    toDoList.deleteFromStorage(event);
    event.target.parentNode.parentNode.parentNode.remove();
  };
  if(window.localStorage.length === 0) {
    noTasks = document.createElement('h3');
    noTasks.setAttribute('id', 'no-tasks');
    noTasks.innerHTML = 'No Current Tasks';
    rightColumn.prepend(noTasks);
  };
};

function changeUrgentImage(event) {
  if(event.target.classList.contains('urgent-static')) {
    toDoList.updateToDo(event);
    var urgentContainer = event.target.parentNode;
    var urgentRed = document.createElement('img');
    urgentRed.setAttribute('src', 'assets/urgent-active.svg');
    urgentRed.classList.add('urgent-static');
    event.target.parentNode.parentNode.parentNode.style.background = "#ffe89D";
    event.target.parentNode.parentNode.parentNode.classList.add('task-card-urgent')
    event.target.parentNode.parentNode.parentNode.classList.remove('task-card')
    event.target.remove();
    urgentContainer.prepend(urgentRed);
  };
};

//search input Functions
function searchAllCards() {
  for(var i = 0; i < rightColumn.children.length; i++) {
    var titleToUpper = rightColumn.children[i].textContent.toUpperCase();
    var inputToUpper = searchInput.value.toUpperCase();
    if(titleToUpper.indexOf(inputToUpper) > -1) {
      rightColumn.children[i].style.display = 'block';
    } else {
      rightColumn.children[i].style.display = 'none';
    };
    if (searchInput.value.length === 0) {
      rightColumn.children[i].style.display = 'block';
    };
  };
};

function searchUrgentCards() {
  for(var i = 0; i < rightColumn.children.length; i++) {
    var titleToUpper = rightColumn.children[i].textContent.toUpperCase();
    var inputToUpper = searchInput.value.toUpperCase();
    if(titleToUpper.indexOf(inputToUpper) > -1 && rightColumn.children[i].classList.contains('task-card-urgent')) {
      console.log('test')
      rightColumn.children[i].style.display = 'block';
    } else {
      rightColumn.children[i].style.display = 'none';
    };
    if (searchInput.value.length === 0 && rightColumn.children[i].classList.contains('task-card-urgent')) {
      rightColumn.children[i].style.display = 'block';
    };
  };
};
