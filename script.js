// Getting the data

const tasksArray = [
    {
        text: "Get a new helmet",
        category: "college",
        isCompleted: false
    },
    {
        text: "Get a book",
        category: "college",
        isCompleted: true
    },
    {
        text: "Get a Bhindi",
        category: "groceries",
        isCompleted: false
    },
]


let categorySelected = "all";
// Getting Elements
const tabs = document.querySelectorAll(".tab");
const taskBody = document.querySelector(".tasks_body");
const form = document.querySelector("form");
console.log(taskBody);



// Creating Functions

function displayTasks(category) {
    // Clearing HTML 
    taskBody.innerHTML = "";
    let html;
    tasksArray.map((task, index) => {
        if (task.category == category) {

            html = `
            <div class="task flex items-center justify-between">
                      <div class="flex items-center gap-4">
                        <input
                          type="checkbox"
                          name="complete_check"
                          class="scale-150"
                          ${task.isCompleted ? "checked" : ""}
                          data-index = ${index};
                        />
                        <p class="todo_text text-lg ${task.isCompleted ? 'line-through' : ''}">${task.text}</p>
                        <span
                          class="category_badge py-1 px-6 rounded-full bg-red-500 text-sm text-red-50 font-medium"
                          >${task.category}</span
                        >
                      </div>
                      <div class="flex items-center gap-4">
                        <span class="cursor-pointer"  onclick="editTask(${index})"
                          ><i class="fa-regular fa-pen-to-square"></i
                        ></span>
                        <span class="cursor-pointer" onclick="deleteTask(${index})"
                          ><i class="fa-regular fa-trash-can"></i
                        ></span>
                      </div>
                    </div>
            `;
    
    
            taskBody.innerHTML += html;
        }  else if (category == "all") {
            html = `
            <div class="task flex items-center justify-between">
                      <div class="flex items-center gap-4">
                        <input
                          type="checkbox"
                          name="complete_check"
                          class="scale-150"
                          ${task.isCompleted ? "checked" : ""}
                          data-index = ${index};
                        />
                        <p class="todo_text text-lg ${task.isCompleted ? 'line-through' : ''}">${task.text}</p>
                        <span
                          class="category_badge py-1 px-6 rounded-full bg-red-500 text-sm text-red-50 font-medium"
                          >${task.category}</span
                        >
                      </div>
                      <div class="flex items-center gap-4">
                        <span class="cursor-pointer"  onclick="editTask(${index})"
                          ><i class="fa-regular fa-pen-to-square"></i
                        ></span>
                        <span class="cursor-pointer" onclick="deleteTask(${index})"
                          ><i class="fa-regular fa-trash-can"></i
                        ></span>
                      </div>
                    </div>
            `;
    
    
            taskBody.innerHTML += html;
        }
    });



    toggleCompleted();
}

function toggleCategory(ele) {
      categorySelected = ele.target.dataset.category;
    displayTasks(categorySelected);
    
}

function addTask() {
    let todoInput = document.getElementById("todo");
    let categoryInput = document.getElementById("category");
    tasksArray.push({
        text: todoInput.value,
        category: categoryInput.value,
        isCompleted: false
    })
    // categorySelected = categoryInputValue;
    console.log(categorySelected);
    todoInput.value = "";
    categoryInput.value = ""
    displayTasks(categorySelected);

}


function editTask(id) {
    let inputEle = document.getElementById("todo")
    let selectEle = document.getElementById("category");
    inputEle.value = tasksArray[id].text;
    selectEle.value = tasksArray[id].category;
    
    deleteTask(id);

    
}

function toggleCompleted() {

    const checkBoxes = document.querySelectorAll("input[name='complete_check']");
    checkBoxes.forEach((checkBox) => checkBox.addEventListener("change", () => {
        const taskIndex = parseInt(checkBox.dataset.index);
        tasksArray[taskIndex].isCompleted = checkBox.checked;
        
        displayTasks(categorySelected)


    }
    ))
}

function deleteTask(index) {

    tasksArray.splice(index, 1);
    displayTasks(categorySelected);
}

// Calling Functions

form.addEventListener("submit", (e) => {
    e.preventDefault();
    addTask();

})

tabs.forEach((tab)=> tab.addEventListener("click", toggleCategory))

console.log(categorySelected);

displayTasks(categorySelected);
