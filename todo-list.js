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
  updateTask(event) {
    for (var i = 0; i < window.localStorage.length; i++) {
      var key = window.localStorage.key(i);
      console.log(event.target)
      if (event.target.parentNode.parentNode.parentNode.classList.contains(key)) {
        var objectToChange = window.localStorage.getItem(key)
        var parsedObject = JSON.parse(objectToChange);
      };
    };
    for (var i = 0; i < parsedObject.tasks.length; i++) {
      if(event.target.parentNode.classList.contains(parsedObject.tasks[i].id)) {
        parsedObject.tasks[i].completed = true;
        var reStringObject = JSON.stringify(parsedObject)
        window.localStorage.setItem(parsedObject.id, reStringObject)
      };
    };
  };
};
