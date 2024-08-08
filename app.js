document.addEventListener("DOMContentLoaded",() =>{
    const storeTasks = JSON.parse(localStorage.getItem('task'));
    if (storeTasks){
        storeTasks.forEach((work) => task.push(work));
        updateTasklist();
        updateStats();
    }
});

let task = [];

const savetask = () => {
    localStorage.setItem('task', JSON.stringify(task))
}

const addtask = ()=>{
    const taskInput = document.getElementById("taskInput");
    const text = taskInput.value.trim();

    if (!text) { // Check if the input is empty
        alert("Please enter a task.");
        return;
    }

    if(task){
        task.push({text:text, completed:false});
    }
    updateTasklist();
    updateStats();
    savetask();
    taskInput.value = ''; 
};

const toggleTaskComplete = (index) =>{
    task[index].completed = !task[index].completed;
    updateTasklist();
    updateStats();
    savetask();

}

const deleteTask = (index) => {
    task.splice(index,1);
    updateTasklist();
    updateStats();
    savetask();
};

const editTask = (index) =>{
    const taskInput = document.getElementById("taskInput");
    taskInput.value = task[index].text;

    task.splice(index,1);
    updateTasklist();
    updateStats();
    savetask();
}

const updateStats = () =>{
    const completedTasks = task.filter((work) => work.completed).length;
    const totalTask = task.length;
    const progress = (completedTasks / totalTask) * 100;
    const progressBar = document.getElementById("progress");
    progressBar.style.width = `${progress}%`;

    document.getElementById('numbers').innerText = `${completedTasks} / ${totalTask}`;

    if (totalTask === 0) {
    progressBar.style.width = '0%';
    document.getElementById('numbers').innerText = '0 / 0';
   } else {
    const progress = (completedTasks / totalTask) * 100;
    progressBar.style.width = `${progress}%`;
    document.getElementById('numbers').innerText = `${completedTasks} / ${totalTask}`;
   }
   if(task.length && completedTasks === totalTask){
    blaskConfetti();
   }
};

const updateTasklist = () =>{
    const taskList = document.getElementById("task-list");
    if (!taskList) {
        console.error("Element with ID 'task-list' not found.");
        return;
    }
    taskList.innerHTML = "";

    task.forEach((work,index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
        <div class =" taskItem">
           <div class = "task ${work.completed ? "completed" : ""}">
           <input type = "checkbox" class = "checkbox" ${work.completed? "checked" : ""} />
           <p>${work.text}</p>
           </div>

           <div class = "icon">
               <i class="fa-solid fa-pen-to-square" onClick = "editTask(${index})"></i>
               <i class="fa-solid fa-trash" onClick = "deleteTask(${index})"></i>
            </div>

        </div>    
        `;
        listItem.addEventListener("change",()=> toggleTaskComplete(index));
        taskList.append(listItem);

    });
};
document.getElementById('newtask').addEventListener("click", function(e){
    e.preventDefault();
    addtask();
});

const blaskConfetti = () =>{
    const count = 200,
  defaults = {
    origin: { y: 0.7 },
  };

function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
    })
  );
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});

fire(0.2, {
  spread: 60,
});

fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8,
});

fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2,
});

fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
}