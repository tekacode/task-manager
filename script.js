/*
  The Task-List-Manager is a web app used to create, save, update, view, and delete tasks inside a web browser.
  Technlogies used: HTML, CSS, JS, and the app uses JavaScript localStorage to store data.  

  *@authors  Tekalegn, Jorge, Esayas, and Manaye 
  *@version 1.0
  *@since   05-07-2021
*/
const taskName = document.getElementById("taskName");
const taskDesc = document.getElementById("taskDesc");
const assignedTo = document.getElementById("assignedTo");
const duedate = document.getElementById("duedate");
const taskForm = document.getElementById("taskForm");

const card_place = document.getElementById("card_place");
const errorMessage = document.getElementById("error_message");

// Process inputs
function processInput() {
  if (taskName.value === "" || taskName.value === null) {
    document.querySelector('#tspan').innerHTML = "Name is required" 
  }else if (taskDesc.value === "" || taskDesc.value === null) {
    document.querySelector('#dspan').innerHTML = "Description is required" 
  }else if (assignedTo.value === "" || assignedTo.value === null) {
    document.querySelector('#aspan').innerHTML = "Assign to is required" 
  }else if (duedate.value === "" || duedate.value === null) {
    document.querySelector('#dtspan').innerHTML = "Date is required" 
  }else{
    let newTaskObject = taskFactory(
    taskName.value,
    taskDesc.value,
    assignedTo.value,
    duedate.value
    );
    addTaskToLocalStorage(newTaskObject);
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
    buttonClass:'btn',
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
  location.reload();
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
              <button type="button" class="fas fa-check ${tasksFromLocalStroage[i].buttonClass} btn-active" id="${'button' + i}" onClick="changeStatus(${i})">
              
              </button>
              <a href="#" style="font-size: 14px" onclick="updateTask(${i})"><button class= "fas fa-edit btn"></button></a>
              <a href="#" style="font-size: 14px" onclick="deleteTask(${i})"><button class= "fas fa-trash btn-delete"></button></a>
            </div>
            <div class= "content">
            <label><strong>TASK NAME:</strong> ${tasksFromLocalStroage[i].taskName.toUpperCase()}</label>
            <label><strong>DESCRIPTION:</strong> ${tasksFromLocalStroage[i].taskDesc.toUpperCase()}</label>
            <label><strong>ASSIGNED TO:</strong> ${tasksFromLocalStroage[i].assignedTo.toUpperCase()}</label>
            <label><strong>DUE DATE:</strong> ${tasksFromLocalStroage[i].duedate.toUpperCase()}</label>
            <label><strong>STATUS:</strong>${tasksFromLocalStroage[i].status.toUpperCase()}</label>
            </div>
            </div>
        </div>
      `;
    }
    card_place.innerHTML = output;
  }

}

// Update a task 
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
    var result = confirm("Do you want to delete?");
    if(result){
      let tasksFromLocalStroage = JSON.parse(
        localStorage.getItem("tasksLocal")
      );
      tasksFromLocalStroage.splice(index, 1);
      localStorage.setItem(
        "tasksLocal",
        JSON.stringify(tasksFromLocalStroage)
      );
      
    }
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
  let changeButtonClass = objectToUpdate.buttonClass;

  if(statusObj === 'Active'){
    statusObj = 'Completed &#128513;'
    changeButtonClass = 'btn'
  }else{
    statusObj = 'Active'
    changeButtonClass = 'btn'
  }
  
  objectToUpdate.status = statusObj;
  objectToUpdate.buttonClass = changeButtonClass;
  localStorage.setItem(
        "tasksLocal",
        JSON.stringify(tasksFromLocalStroage)
      );
  document.getElementById(theButton).innerHTML = objectToUpdate.status;
     location.reload();
   
}


// Show filtered tasks 

function showFiltered(event){
  let fillteredTasks = [];
  let output = ""
  let tasksFromLocalStroage = JSON.parse(
    localStorage.getItem("tasksLocal")
  );

  if(event.target.value === 'completed'){
   for(let i=0; i <tasksFromLocalStroage.length; i++){
    if(tasksFromLocalStroage[i].status === 'Completed &#128513;'){
      fillteredTasks.push(tasksFromLocalStroage[i])
    }
  }
  }else if(event.target.value === 'incomplete'){
   for(let i=0; i <tasksFromLocalStroage.length; i++){
    if(tasksFromLocalStroage[i].status === 'Active'){
      fillteredTasks.push(tasksFromLocalStroage[i])
    }
  }
  }else if(event.target.value === 'all'){
    fillteredTasks = tasksFromLocalStroage
  }


  for(let i =0; i< fillteredTasks.length; i++){

    output += `
        <div class="status1">
          <div class="card">
            <div id="stat">
              <button type="button" class="fas fa-check btn-success ${fillteredTasks[i].buttonClass} btn-active" id="${'button' + i}" onClick="changeStatus(${i})">
              
              </button>
              <a href="#" style="font-size: 14px" onclick="updateTask(${i})"><button class="btn fas fa-edit"></button></a>
              <a href="#" style="font-size: 14px" onclick="deleteTask(${i})"><button class="fas fa-trash btn-delete"></button></a>
            </div>
            <div class= "content">
            <label><strong>TASK NAME:</strong> ${fillteredTasks[i].taskName.toUpperCase()}</label>
            <label><strong>DESCRIPTION:</strong> ${fillteredTasks[i].taskDesc.toUpperCase()}</label>
            <label><strong>ASSIGNED TO:</strong> ${fillteredTasks[i].assignedTo.toUpperCase()}</label>
            <label ><strong>DUE DATE:</strong> ${fillteredTasks[i].duedate.toUpperCase()}</label>
            <label><strong>STATUS:</strong>${fillteredTasks[i].status.toUpperCase()}</label>
            </div>
            </div>
        </div>
      `;

  }
    card_place.innerHTML = output;

}

