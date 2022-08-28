let todos = localStorage.getItem('todos')

try {
    todos = JSON.parse(todos);
    todos = todos.length ? todos : null;
} catch (error) {
    todos = null;
}


if (!todos) {
    todos = [
        { content: 'Shopping', status: true },
        { content: 'Studing lessons', status: true },
        { content: 'Watch video', status: true }
    ]

    localStorage.setItem('todos', JSON.stringify(todos))
}


function createTodos(todos) {
    let todosList = document.querySelector('.list-group')

    todosList.innerHTML = ''

    todos.forEach((todo, index) => {
        let li = document.createElement('li')
        li.className = 'list-group-item'
        let content = document.createElement('span')
        content.textContent = todo.content
        content.style.textDecoration = todo.status ? 'initial' : 'line-through'
        let deleteBtn = document.createElement('img')
        deleteBtn.src = "./themes/delete.png"
        deleteBtn.alt = "delete icon"
        deleteBtn.className = 'float-end'

        li.append(content)
        li.append(deleteBtn)

        todosList.append(li)

        deleteBtn.addEventListener('click', e => {
            todos.splice(index, 1)
            localStorage.setItem('todos', JSON.stringify(todos))
            createTodos(todos)
        })

        content.addEventListener('click', e => {
            todos[index].status = !todos[index].status
            localStorage.setItem('todos', JSON.stringify(todos))
            createTodos(todos)
        })
    });
}


createTodos(todos)


let actions = document.querySelector('#action')
let formWrapper = document.querySelector("#form-wrapper")


Array.from(actions.children).forEach(action => {
    if (action.dataset.action == "add") {
        action.addEventListener('click', e => {
            formWrapper.innerHTML = `
            <form id="add">
                <input class="form-control" name="add" placeholder="Add Todo:">
            </form>
            `
            createTodos(todos)

            let add = document.querySelector("#add")
            add.addEventListener('submit', e => {
                e.preventDefault()
                if (add.add.value) {
                    todos.push({ content: add.add.value, status: true })
                    localStorage.setItem('todos', JSON.stringify(todos))
                    createTodos(todos)
                    add.add.value = ''
                }
            })
        })
    } else {
        action.addEventListener('click', e => {
            formWrapper.innerHTML = `
            <form id="search">
                <input class="form-control" name="search" placeholder="Search Todos">
            </form>
            `
            let search = document.querySelector("#search")
            search.addEventListener('keyup', e => {
                e.preventDefault()
                if (search.search.value) {
                    let filterd_todos = todos.filter(todo => todo.content.toLowerCase().includes(search.search.value.toLowerCase()))
                    createTodos(filterd_todos)
                } else{
                    createTodos(todos)
                }
                

            })
        })
    }
})