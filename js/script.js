const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
let oldInputValue;
let arrayTarefas = [];

const saveTodo = (text)=>{
    const todo = document.createElement("div");
    todo.classList.add("todo");

    const todoTitle = document.createElement("h3");
    todoTitle.innerHTML = text;
    todo.appendChild(todoTitle);

    const doneBtn = document.createElement("button");
    doneBtn.classList.add("finish-todo");
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    todo.appendChild(doneBtn);

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-todo");
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    todo.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("remove-todo");
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    todo.appendChild(deleteBtn);

    todoList.appendChild(todo);

    todoInput.value = "";
    todoInput.focus();

}

const toggleForms = ()=>{
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
}

const updateTodo = (text)=>{
    const todos = document.querySelectorAll(".todo");

    todos.forEach((todo)=>{
        let todoTitle = todo.querySelector("h3");

        if(todoTitle.innerText === oldInputValue){
            todoTitle.innerText = text;
        }
    })
}




todoForm.addEventListener("submit",(evt)=>{
    evt.preventDefault();

    const inputValue = todoInput.value;

    if (inputValue){
        saveTodo(inputValue);
    }
    
})

document.addEventListener("click",(evt)=>{
    let todoTitle;
    const parentEl = evt.target.closest("div");

    if(parentEl && parentEl.querySelector("h3")){
        todoTitle = parentEl.querySelector("h3").innerText;
    } 

    if(evt.target.classList.contains("finish-todo")){
        parentEl.classList.toggle("done")
    }
    
    if(evt.target.classList.contains("remove-todo")){
        parentEl.remove();
    }

    if(evt.target.classList.contains("edit-todo")){
        toggleForms();

        editInput.value = todoTitle;
        oldInputValue = todoTitle;
    }
})

cancelEditBtn.addEventListener("click",(evt)=>{
    evt.preventDefault();

    toggleForms();
})

editForm.addEventListener("submit",(evt)=>{
    evt.preventDefault();

    const editInputValue = editInput.value;

    if(editInputValue){
        updateTodo(editInputValue);
    }

    toggleForms();
})

const inputPesquisa = document.querySelector("#search-input");


const fazerPesquisa =()=>{
    let nome_pesquisa = inputPesquisa.value;
    
    const tarefaPesquisada = [...todoList.children];
    tarefaPesquisada.map((el)=>{

        let letras_Pesquisa = [...nome_pesquisa];

        for(i of letras_Pesquisa){

            let contem =el.children[0].innerHTML.includes(nome_pesquisa);
            
                if(contem==true){
                    el.classList.remove("hide");
                    el.classList.add("todo");
                }else if(i == ""){
                    el.classList.remove("hide");
                    el.classList.add("todo");
                }else{
                    el.classList.add("hide");
                    el.classList.remove("todo");
                }
        }
    })
}


inputPesquisa.addEventListener("focus",(evt)=>{
    pegar = setInterval(fazerPesquisa,200);
    pegar;
})

inputPesquisa.addEventListener("blur",(evt)=>{
    window.clearInterval(pegar);

    const tarefasNaLista = [...todoList.children];
    
    tarefasNaLista.map((el)=>{
            if(!arrayTarefas.includes(el.children[0].innerHTML)){
                arrayTarefas.push(el.children[0].innerHTML);
            }
    });
    console.log(arrayTarefas);

    [...todoList.children].map((el)=>{
        console.log(el)
        el.remove();
    });

    console.log(arrayTarefas)
        arrayTarefas.map((el)=>{
            console.log(el)
            saveTodo(el);
        })
        arrayTarefas = [];
})








