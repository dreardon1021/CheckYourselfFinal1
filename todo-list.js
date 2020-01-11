class ToDoList {
  constructor(id) {
    this.id = id;
    this.title = '';
    this.tasks = [];
    this.urgent = false;
  }
  saveToStorage() {
    var listToStore = this;
    var stringifiedList = JSON.stringify(listToStore);
    window.localStorage.setItem(this.id, stringifiedList);
  }
  deleteFromStorage() {

  }
  updateToDo() {

  }
  updateTask() {

  };
};

var makeTaskListButton = document.querySelector('.make-list-button');
