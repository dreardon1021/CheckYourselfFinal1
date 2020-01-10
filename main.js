//querySelectors
var closeButton = document.querySelector('.close-button');
var leftTaskContainer = document.querySelector('.current-task-list');
var addTaskButton = document.querySelector('.add-task-button');
var taskInput = document.querySelector('.task-input');

// EventListeners
leftTaskContainer.addEventListener('click', closeLeftTask);
addTaskButton.addEventListener('click', addSingleTask);
taskInput.addEventListener('input', enableAddTaskButton);


// Left column task functions (adding/removing/disabling)
function closeLeftTask(event) {
  if(event.target.classList.contains('close-button')) {
    event.target.parentNode.remove();
  };
};

function addSingleTask() {
  leftTaskContainer.insertAdjacentHTML('afterbegin',
  `<div class="left-task">
    <img class="close-button" src="assets/delete.svg" alt="delete">
    <p class="left-task-item">${taskInput.value}</p>
  </div>`);
  taskInput.value = '';
  addTaskButton.disabled = true;
};

function enableAddTaskButton() {
  if (taskInput.value !== ''){
    addTaskButton.disabled = false;
  };
};

// Add Task Card Functions
