// The application includes two main features:

// FEATURE 1. Display all todos
//    When a user clicks "Get All Todos" button, the app will
//    fetch all todos from the API and display them in the todos container.

// FEATURE 2. Display todos for a specific user
//    When a user selects a user from the dropdown and clicks "Get User's Todos" button,
//    the app will fetch all todos for that user and display them in the todos container.

// *EXTRA PRACTICE: Display who created a clicked todo
//    When a user clicks on a todo item, the detail panel will
//    show the full title and the name of the user who created it.
//       *This is not graded, but a good practice to work on
//       only after you have completed the graded features.


// ===========================================================
// ====================== FEATURE 1 ==========================
// ===========================================================

// ==== Feature 1a: Get All Todos Button ====
// 1. Add an event listener to the "Get All Todos" button
// 2. Inside the event listener, console log "works!" to test the event listener
// *Note:* You should only need to access the element you want
// to add the event listener to, by using it's **id**.


//const getAllButton = document.getElementById('get-all-todos-button');
//
//getAllButton.addEventListener('click', () => {
//    console.log('works!')
//});

// ==== Feature 1b: Fetch all todos from the API ====
// Write code that fetches all todos from the API
// 1. Use the fetch API to make a GET request to: https://jsonplaceholder.typicode.com/todos
// 2. Parse the response as JSON
// 3. console.log the title of the first todo item.
//      In Learn, the test will have a variable 'test_id' to be used as the index to get the title of the correct todo item


//const getAllButton = document.getElementById('get-all-todos-button');
//
//getAllButton.addEventListener('click', async () => {
//    console.log('works!')
//
//    try {
//        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
//
//        if (!response.ok) {
//            throw new Error(`${response.status}`);
//        }
//
//        const allTodos = await response.json();
//        const foundTodo = allTodos.find(todo => todo.id === test_id);
//        console.log(foundTodo.title);
//
//    } catch (e) {
//        console.error(e);
//    }
//});


// ==== Feature 1c: Display all todos ====
// 1. Write code that loops through an array of todos and creates a new li element for each todo
// 2. Add the todo title text to the li element
// 3. Add the todo id to the li element as a data attribute Hint: Use element.dataset.todoId = todo.id
// 4. Append the li element to the todos container element
// Sample array of todos
// const todos = [
//     { title: 'Todo 1', completed: false, userId: 1 },
//     { title: 'Todo 2', completed: true, userId: 2 },
//     { title: 'Todo 3', completed: false, userId: 3 },
// ];


//todoWrapper.innerHTML = '';
//allTodos.forEach(todo => {
//    const li = document.createElement('li');
//    li.textContent = todo.title;
//    li.dataset.todoId = todo.id;
//    todoWrapper.appendChild(li);
//});


// ==== Feature 1d: When "Get All Todos" button clicked ====
// 1. Update your "Get All Todos" button event listener to fetch all todos from the API
// 2. Clear the todos container before displaying the todos

const getAllButton = document.getElementById('get-all-todos-button');
const getUserButton = document.getElementById('get-user-todos-button');
const todoWrapper = document.getElementById('found-todos');
const todoDetailText = document.getElementById('todo-body-text');

getAllButton.addEventListener('click', async () => {
    console.log('works!');

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        if (!response.ok) {
            throw new Error(`${response.status}`);
        }
        const allTodos = await response.json();


        todoWrapper.innerHTML = '';


        allTodos.forEach(todo => {
            const li = document.createElement('li');
            li.textContent = todo.title;
            li.dataset.todoId = todo.id;
            li.classList.add('todo-item');
            todoWrapper.appendChild(li);
        });

    } catch (e) {
        console.error(e);
    }
});


// ===========================================================
// ====================== FEATURE 2 ==========================
// ===========================================================

// ==== Feature 2a: Display all todos for a specific user =====
// 1. Fetch users from the API, example https://jsonplaceholder.typicode.com/users
// 2. Populate the users dropdown with the user names, use the user id as the value
const dropDown = document.querySelector('#user-select');
const fillDropDown = async () => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
            throw new Error(`${response.status}`);
        }
        const users = await response.json();
        users.forEach(user => {
            const userOption = document.createElement('option');
            userOption.value = `${user.id}`;
            userOption.textContent = user.name;
            dropDown.appendChild(userOption);
        });
    } catch (e) {
        console.error(e);
    };
};
fillDropDown();

// ==== Feature 2b: Display all todos for a specific user =====
// Add an event listener to the "Get User's Todos" button that will display the users todos
// 1. Get selected user todos from the API, example https://jsonplaceholder.typicode.com/todos?userId=1
// 2. Display the todos in the todos container, similar to Feature 1c

getUserButton.addEventListener('click', async () => {
    const selectedUserId = document.querySelector('#user-select').value;

    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${selectedUserId}`);
        if (!response.ok) {
            throw new Error(`${response.status}`);
        }
        const userTodos = await response.json();


        todoWrapper.innerHTML = '';


        userTodos.forEach(todo => {
            const li = document.createElement('li');
            li.textContent = todo.title;
            li.dataset.todoId = todo.id;
            li.classList.add('todo-item');
            todoWrapper.appendChild(li);
        });

    } catch (e) {
        console.error(e);
    }
});



// ===========================================================
// =======================  NOT GRADED  ======================
// ================= (extra practice only) ===================

// ==== Feature 3: Display user of a specific todo that has been clicked on ====
// 1. Add an event listener to the todos container that listens for a click event
// 2. Inside the event listener, get the todo that has been clicked on
// 3. Fetch the specific todo from the API, example https://jsonplaceholder.typicode.com/todos/1
// 4. Fetch the associated user using the userId from the todo
// 5. Display the todo title and the user name in the detail section
todoWrapper.addEventListener('click', async (event) => {
    // Check if the clicked element is a todo item
    if (event.target && event.target.classList.contains('todo-item')) {
        const todoId = event.target.dataset.todoId;


        const previousSelected = todoWrapper.querySelector('.selected-todo');
        if (previousSelected) {
            previousSelected.classList.remove('selected-todo');
        }


        event.target.classList.add('selected-todo');

        try {

            const todoResponse = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`);
            if (!todoResponse.ok) {
                throw new Error(`${todoResponse.status}`);
            }
            const todo = await todoResponse.json();


            const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${todo.userId}`);
            if (!userResponse.ok) {
                throw new Error(`${userResponse.status}`);
            }
            const user = await userResponse.json();


            todoDetailText.innerHTML = `Todo: ${todo.title}.<br>Created by: ${user.name}`;
        } catch (e) {
            console.error(e);
        }
    }
});



// just messing around with some concepts
const nightModeToggle = document.getElementById('night-mode-toggle');
nightModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
});
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
}
