// Define UI element
let form = document.querySelector('#task_form');
let taskList = document.querySelector('ul');
let clearBtn = document.querySelector('#clear_task_btn');
let filter = document.querySelector('#task_filter');
let taskInput = document.querySelector('#new_task');

// Define event listeners
form.addEventListener('submit', addTask);
taskList.addEventListener('click',removeTask);
clearBtn.addEventListener('click',cleartask);
filter.addEventListener('keyup',filtertask);
document.addEventListener('DOMContentLoaded',gettasks);
// Define functions
// Add Task
function addTask(e) {
    if (taskInput.value === '') {
        alert('Add a task!');
    } else {
        // Create li element
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(taskInput.value + " "));
        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerHTML = 'x';
        li.appendChild(link);
        taskList.appendChild(li);

       storeTaskinLocalStorage(taskInput.value);

        taskInput.value = '';


    }
    e.preventDefault();
   
}
//remove task 

function removeTask(e){
    if(e.target.hasAttribute("href")){
        if(confirm("are you sure?")){
            let ele = e.target.parentElement;
            ele.remove();
        //console.log(ele);
        removefromlocalstorage(ele);
    }}
    else{
        console.log("error");
    }
    
}

function cleartask(e){
    while(taskList.firstChild){
    taskList.removeChild(taskList.firstChild);
    }
   //optional 
   taskList.innerHTML =""; 
   localStorage.clear();
}

function filtertask(e){
    let test = e.target.value.toLowerCase();
    document.querySelectorAll('li').forEach(task =>{
        let item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(test) != -1){
          task.style.display ='block';
        }
        else {
            task.style.display ='none';
        }
    });
}

function storeTaskinLocalStorage(e){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks=[];
    }
    else{
        tasks= JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(e);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

function gettasks(e){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks=[];
    }
    else{
        tasks= JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(task => {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(task + " "));
        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerHTML = 'x';
        li.appendChild(link);
        taskList.appendChild(li);
    });
}

function removefromlocalstorage(e){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks=[];
    }
    else{
        tasks= JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.removeChild(tasks.lastChild);
 tasks.forEach((task,index) => {
        if (tasks.textContent.trim() === task){
            tasks.splice(index,1);
        }
    } );
   
}