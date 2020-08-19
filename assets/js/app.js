/*
const form = document.querySelector('#task-form');
const inputTaskText = form.querySelector('input[type=text]');
const collection = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-btn');
const filterTaskInput = document.querySelector('#filter-task');
const cardAction = document.querySelector('.card-action');
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];


// Load All Events
loadEventListeners();

// Function: All Event Listeners()
function loadEventListeners() {
    document.addEventListener('DOMContentLoaded', taskShowFromLocalStorage);
    form.addEventListener('submit', addTaskInlocalStorage)
    clearBtn.addEventListener('click', clearTasks);
    collection.addEventListener('click', removeTaskFromLocalStorage);
    filterTaskInput.addEventListener('keyup', filterTask);
}

// Function: Create Task Item
function createTaskItem(val) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    const i = document.createElement('i');

    li.classList.add('collection-item');
    a.classList.add('secondary-content');
    a.href = '#';
    i.classList.add('material-icons');
    i.innerText = 'clear'
    a.append(i);
    li.append(val, a);
    return li;
}

// Function: Task Item Show from localStorage
function taskShowFromLocalStorage() {
    collection.innerHTML = '';
    tasks.forEach(function (txt) {
        collection.appendChild(createTaskItem(txt));
    });
    if(collection.innerHTML != '') {
        cardAction.style.display = 'block';
        clearBtn.style.display = 'inline-block';
        collection.style.border = '1px solid #e0e0e0';
    } else {
        cardAction.style.display = 'none';
        clearBtn.style.display = 'none';
        collection.style.border = '0px solid #e0e0e0';
    }
}

// Add Task in LocalStorage
function addTaskInlocalStorage(val) {
    event.preventDefault();
    if (inputTaskText.value) {

        tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        tasks.push(inputTaskText.value);
        localStorage.setItem('tasks', JSON.stringify(tasks))

        taskShowFromLocalStorage();
        inputTaskText.value = '';
    }
}

// Funcion: Remove Task one by one
function removeTaskFromLocalStorage(e) {
    if (e.target.nodeName === 'I' || e.target.nodeName === 'A') {
        if (confirm('Are you sure ?')) {
            console.log(tasks);
            if (e.target.nodeName == 'I' && e.target.parentElement.parentElement.classList.contains('collection-item')) {
                tasks.forEach(function (task, index) {
                    if (task === e.target.parentElement.parentElement.firstChild.nodeValue) {
                        tasks.splice(index, 1);
                    }
                });
                localStorage.setItem('tasks', JSON.stringify(tasks));
                taskShowFromLocalStorage();
            }
        }
    }
    e.preventDefault();
}

// Function: Clear Task
function clearTasks(e) {
    if (confirm('Are you sure? ')) {
        tasks = [];
        localStorage.setItem('tasks',JSON.stringify(tasks));
        taskShowFromLocalStorage();
    }
    e.preventDefault();
}

// Function: Filter Task
function filterTask(e) {

    const collectionItem = document.querySelectorAll('.collection li');
    collectionItem.forEach(function(li) {
        if(li.firstChild.nodeValue.toLowerCase().indexOf(this.value.toLowerCase()) >= 0) {
            li.style.display = 'block';
        } else {
            li.style.display = 'none';
        }
    }.bind(this));

}*/

!function () {
    // localStorage.setItem('tasks', JSON.stringify([
    //     { "taskContent": "Task one", isTaskDone: true },
    //     { "taskContent": "Task two", isTaskDone: 0 },
    //     { "taskContent": "Task three", isTaskDone: 0 },
    //     { "taskContent": "Task Four", isTaskDone: 1 },
    // ]));

    // localStorage.removeItem('tasks');

    // Selector Function
    // function $(selector, areAllTrue) {
    //     return areAllTrue ? document.querySelectorAll(selector) : document.querySelector(selector);
    // }

    // var taskMangerForm = $('.taskManger__form form');
    // var contentFromLocalStorage = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    // // console.log(contentFromLocalStorage);
    // var taskInputField = $('#taskInput__field');
    // var collection = $('ul.collection');
    // var clearAllBtn = $('.clear-all');
    // var html;
    // Function Call: All Event Listener


    // Selector Function
    function $(selector, areAllTrue) {
        return areAllTrue ? document.querySelectorAll(selector) : document.querySelector(selector);
    }

    // localStorage.removeItem('tasks');

    // Variables
    var taskInputForm = $('#taskManagerWrapper');
    var taskInputField = $('#taskInputField');
    var taskInputFilter = $('#taskInputFilter');
    var collection = $('.collection');
    var cardAction = $('.card-action');
    var clearAllBtn = $('.clearAll-btn');
    var data = !localStorage.getItem('tasks') ? [] : JSON.parse(localStorage.getItem('tasks'));


    renderTaskItem();


    // Calling Function: All Event Listener
    allEventListener();

    // Function All Event Listner 
    function allEventListener() {
        taskInputForm.addEventListener('submit', mainFunction);
        taskInputFilter.addEventListener('keyup', filterTask);
        collection.addEventListener('click', removeAndToogleItem);
        clearAllBtn.addEventListener('click', removeAll);
    }

    // Function: Render Task Item
    function renderTaskItem() {
        var html = '';
        data.forEach(function (task) {
            if (task.isDone) {
                html += '<li class="collection-item"><span class="line-through">' + task.text + '</span><a class="secondary-content" href="#"><i class="material-icons">clear</i></a></li>'
            } else {
                html += '<li class="collection-item"><span>' + task.text + '</span><a class="secondary-content" href="#"><i class="material-icons">clear</i></a></li>'
            }
        });
        collection.innerHTML = html;
        if (!collection.children[0]) {
            cardAction.style.display = 'none';
        } else {
            cardAction.style.display = 'block';
        }
    }


    // Function: Main Functionality
    function mainFunction(e) {
        e.preventDefault();
        if (taskInputField.value.trim()) {
            data = !localStorage.getItem('tasks') ? [] : JSON.parse(localStorage.getItem('tasks'));
            data.push({
                text: taskInputField.value,
                isDone: false
            });
            taskInputField.value = '';
            localStorage.setItem('tasks', JSON.stringify(data));

            renderTaskItem();

        } else {
            alert('Please write something');
        }

    }

    // Function: Remove Item one by one
    function removeAndToogleItem(e) {
        e.preventDefault();

        if (e.target.tagName === 'I' && confirm('Are you sure ?')) {
            data.forEach(function (obj, i) {
                if (obj.text.trim().toLowerCase() === e.target.parentElement.previousElementSibling.innerText.trim().toLowerCase()) {
                    data.splice(i, 1);
                }
            });
        }

        data.forEach(function (obj, i) {

            if (e.target.tagName === 'LI') {
                if (obj.text.trim().toLowerCase() === e.target.firstElementChild.innerText.trim().toLowerCase()) {
                    data.splice(i, 1, {
                        text: obj.text,
                        isDone: !obj.isDone
                    });

                }
            }
            if (e.target.tagName === 'SPAN') {
                if (obj.text.trim().toLowerCase() === e.target.innerText.trim().toLowerCase()) {
                    data.splice(i, 1, {
                        text: obj.text,
                        isDone: !obj.isDone
                    });

                }
            }

        });
        localStorage.setItem('tasks', JSON.stringify(data));
        renderTaskItem();

    }

    // Function: Task Filter
    function filterTask(e) {
        var thisVal = this.value.trim().toLowerCase();
        data.forEach(function (undefined, i) {
            var liVal = collection.children[i].firstChild.innerText.trim().toLowerCase();
            if (liVal.indexOf(thisVal) == -1) {
                collection.children[i].style.display = 'none';
                // console.log(obj.text.trim().toLowerCase().indexOf());
            } else {
                collection.children[i].style.display = 'block';
            }
        });
    }

    // Function: Remove All
    function removeAll() {
        if (confirm('Are you sure ?')) {
            data = [];
            localStorage.setItem('tasks',JSON.stringify(data));
            renderTaskItem();
        }
    }



}();

