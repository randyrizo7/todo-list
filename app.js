//selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-btn');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');


// event listeners 
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('change', filterTodo);


//functions

function addTodo(e){
     e.preventDefault();
    console.log('hello');
    //ToDo Div 
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    // create li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    // ADD TODO TO LOCAL STORAGE 
    saveLocalTodos(todoInput.value);
    // CHECK MARK btn 
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);
    // CHECK trash btn 
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    //append to list 
    todoList.appendChild(todoDiv);
    //clear todo input value
    todoInput.value="";
}


function deleteCheck(e){
    const item = e.target;
    //DELETE TODO [0] targets the first class
    // We cannot delete the item since it is equal to the trash icon- it will remove the trash icon, we instead have to remove the parent element. 
    if(item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;
        //Animation
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function(e){
            todo.remove();
        })
    }

    // CHECK MARK
    if(item.classList[0]=== 'complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}
function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display ="flex"
                } else {
                    todo.style.display = "none";
                }
                break;
            case "incomplete":
                if(!todo.classList.contains("completed")){
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
    
}

function saveLocalTodos(todo){
    // check --- Do I already have todos 
    let todos;
    if(localStorage.getItem('todos')=== null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(){
    // check --- Do I already have todos 
    let todos;
    if(localStorage.getItem('todos')=== null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
         //ToDo Div 
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    // create li
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    // CHECK MARK btn 
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);
    // CHECK trash btn 
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    //append to list 
    todoList.appendChild(todoDiv);
    })
}

// todo is the div
function removeLocalTodos(todo){
     // check --- Do I already have todos 
     let todos;
     if(localStorage.getItem('todos')=== null) {
         todos = [];
     } else {
         todos = JSON.parse(localStorage.getItem('todos'));
     }
     const todoIndex = todo.children[0].innerText;
     // the argument here is at which index in the array do you want to remove, and how many do you want to remove
     todos.splice(todos.indexOf(todoIndex), 1);
     localStorage.setItem('todos', JSON.stringify(todos));
}