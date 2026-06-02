const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const themeBtn = document.getElementById("themeBtn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateCount(){
    const active = tasks.filter(t => !t.completed).length;
    taskCount.textContent = active + " Tasks Left";
}

function renderTasks(){

    taskList.innerHTML = "";

    let filtered = tasks;

    if(currentFilter === "active"){
        filtered = tasks.filter(t => !t.completed);
    }

    if(currentFilter === "completed"){
        filtered = tasks.filter(t => t.completed);
    }

    filtered.forEach(task => {

        const li = document.createElement("li");

        li.innerHTML = `
            <div class="task">
                <span class="${task.completed ? "completed" : ""}">
                    ${task.text}
                </span>
            </div>

            <div class="actions">
                <button class="complete-btn"><i class="fa-solid fa-check"></i></button>
                <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;

        li.querySelector(".complete-btn").onclick = () => {
            task.completed = !task.completed;
            saveTasks();
            renderTasks();
        };

        li.querySelector(".delete-btn").onclick = () => {
            tasks = tasks.filter(t => t.id !== task.id);
            saveTasks();
            renderTasks();
        };

        taskList.appendChild(li);
    });

    updateCount();
}

function addTask(){

    const text = taskInput.value.trim();

    if(!text){
        alert("Please enter a task");
        return;
    }

    tasks.push({
        id: Date.now(),
        text,
        completed: false
    });

    taskInput.value = "";
    saveTasks();
    renderTasks();
}

taskInput.addEventListener("keypress", (e) => {
    if(e.key === "Enter"){
        addTask();
    }
});

function clearCompleted(){
    tasks = tasks.filter(t => !t.completed);
    saveTasks();
    renderTasks();
}

function filterTasks(type, btn){

    currentFilter = type;

    document.querySelectorAll(".filters button")
        .forEach(b => b.classList.remove("active"));

    btn.classList.add("active");

    renderTasks();
}

themeBtn.onclick = () => {
    document.body.classList.toggle("dark");
};

renderTasks();