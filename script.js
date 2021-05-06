const taskName = document.getElementById("taskName");
const taskDesc = document.getElementById("taskDesc");
const assignedTo = document.getElementById("assignedTo");
const duedate = document.getElementById("duedate");
const taskForm = document.getElementById("taskForm");

const card_place = document.getElementById("card_place");
const errorMessage = document.getElementById("error_message");

// Process inputs
function processInput() {
  const messages = [];
  if (taskName.value === "" || taskName.value === null) {
    messages.push("Name is required");
  }
  if (taskDesc.value === "" || taskDesc.value === null) {
    messages.push("Task Description is required");
  }
  if (assignedTo.value === "" || assignedTo.value === null) {
    messages.push("Assigned to is required");
  }
   if (duedate.value === "" || duedate.value === null) {
    messages.push("Due date is required");
  }
  if (messages.length === 0) {
    const newTaskObject = taskFactory(
    taskName.value,
    taskDesc.value,
    assignedTo.value,
    duedate.value
    );
    addTaskToLocalStorage(newTaskObject);
  }else{
    let messageOut = '';
    for(let i=0; i < messages.length; i++){
      messageOut += messages[i] + '\n';
    }
    alert(messageOut)
  }
}

// Task object creator 
const taskFactory = (tName, tDesc, aTo, dDate) => {
  const newId = idGenerator();
  return {
    id: newId,
    taskName: tName,
    taskDesc: tDesc,
    assignedTo: aTo,
    duedate: dDate,
    status:'Active',
  };
};

// Id generator 
const idGenerator = function () {
  return "_" + Math.random().toString(36).substr(2, 9);
};

// Append new task to localStorage 
function addTaskToLocalStorage(task) {
  if (localStorage.getItem("tasksLocal") === null) {
    localStorage.setItem("tasksLocal", JSON.stringify([]));
    let tasksFromLocalStroage = JSON.parse(
      localStorage.getItem("tasksLocal")
    );
    tasksFromLocalStroage.push(task);
    localStorage.setItem(
      "tasksLocal",
      JSON.stringify(tasksFromLocalStroage)
    );
  } else {
    let tasksFromLocalStroage = JSON.parse(
      localStorage.getItem("tasksLocal")
    );
    tasksFromLocalStroage.push(task);
    localStorage.setItem(
      "tasksLocal",
      JSON.stringify(tasksFromLocalStroage)
    );
  }
}

// Print out tasks 
function printTaskList() {
  if (localStorage.getItem("tasksLocal") !== null) {
    let tasksFromLocalStroage = JSON.parse(
      localStorage.getItem("tasksLocal")
    );

    let tasksLength = tasksFromLocalStroage.length;
    let output = "";
    for (let i = tasksLength -1; i >=0; i--) {
      output += `
        <div class="status1">
          <div class="card">
            <div id="stat">
              <button type="button" class="btn btn-success btn-sm" id="${'button' + i}" onClick="changeStatus(${i})">
              ${tasksFromLocalStroage[i].status}
              </button>
              <a href="#" style="font-size: 14px" onclick="updateTask(${i})">Update |</a>
              <a href="#" style="font-size: 14px" onclick="deleteTask(${i})">Delete</a>
            </div>
            <label>Task Name:${tasksFromLocalStroage[i].taskName}</label>
            <label>Task Description:${tasksFromLocalStroage[i].taskDesc}</label>
            <label>Assigned To:${tasksFromLocalStroage[i].assignedTo}</label>

            <label>Due Date:${tasksFromLocalStroage[i].duedate}</label>
            <label>Status:${tasksFromLocalStroage[i].status}</label>
          </div>
        </div>
      `;
    }

    card_place.innerHTML = output;
   
    
      
  }
}

// Edit a task 
function updateTask(index){
    let tasksFromLocalStroage = JSON.parse(
        localStorage.getItem("tasksLocal")
      );
    let objectToUpdate = tasksFromLocalStroage[index];
      let taskNameObj = objectToUpdate.taskName;
      let taskDescObj = objectToUpdate.taskDesc;
      let assignedToObj = objectToUpdate.assignedTo;
      let duedateObj = objectToUpdate.duedate;
      taskName.value = taskNameObj;
      taskDesc.value = taskDescObj;
      assignedTo.value = assignedToObj;
      duedate.value = duedateObj;

      tasksFromLocalStroage.splice(index, 1);
      localStorage.setItem(
        "tasksLocal",
        JSON.stringify(tasksFromLocalStroage)
      );
      
}

// Delete a task 
function deleteTask(index){
    let tasksFromLocalStroage = JSON.parse(
        localStorage.getItem("tasksLocal")
      );
      tasksFromLocalStroage.splice(index, 1);
      localStorage.setItem(
        "tasksLocal",
        JSON.stringify(tasksFromLocalStroage)
      );
      location.reload();
}

// change task status 
function changeStatus(index){
  let theButton = 'button'+index;
  let tasksFromLocalStroage = JSON.parse(
        localStorage.getItem("tasksLocal")
      );
  let objectToUpdate = tasksFromLocalStroage[index];
  let statusObj = objectToUpdate.status;

  if(statusObj === 'Active'){
    statusObj = 'Done'
  }else{
    statusObj = 'Active'
  }
  
  objectToUpdate.status = statusObj;
  localStorage.setItem(
        "tasksLocal",
        JSON.stringify(tasksFromLocalStroage)
      );
  document.getElementById(theButton).innerHTML = objectToUpdate.status;
     location.reload();
   
}

