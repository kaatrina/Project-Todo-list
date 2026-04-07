import {
  addTodo,
  deleteTodo,
  getTodosByProject,
  projectsData,
} from "./data.js";
import deleteBtn from "./close.png";
import changeBtn from "./pen.png";
import newBtn from "./plus.png";
import { dialogChangeTodo } from "./singleTodoPage.js";

export function todosLoad(projectId) {
  const project = projectsData.find((p) => p.id === projectId);

  const todos = getTodosByProject(projectId);

  const content = document.querySelector(".content");

  content.innerHTML = "";

  const todosPage = document.createElement("div");
  todosPage.classList.add("todosPage");

  content.appendChild(todosPage);

  const title = document.createElement("h1");
  title.textContent = project.name;
  todosPage.appendChild(title);

  const todosContainer = document.createElement("div");
  todosContainer.classList.add("todosContainer");

  todosPage.appendChild(todosContainer);

  for (const todo of todos) {
    const todo_item = document.createElement("div");
    todo_item.classList.add("todo-item");
    todosContainer.appendChild(todo_item);

    if (todo.priority === "Высокий") {
        todo_item.style.border = '2px solid red'
      } else if (todo.priority === "Средний") {
        todo_item.style.border = '2px solid orange'
      } else if (todo.priority === "Низкий") {
        todo_item.style.border = '2px solid green'
      }

    const firstLine = document.createElement('div')
    firstLine.classList.add('firstLine')
    todo_item.appendChild(firstLine)

    const todoName = document.createElement("h3");
    todoName.textContent = todo.name;
    firstLine.appendChild(todoName);


    const groupbtn = document.createElement('div');
    firstLine.appendChild(groupbtn)


    const changeTodoBtn = document.createElement("img");
    changeTodoBtn.src = changeBtn;
    changeTodoBtn.style.marginRight = '10px'

     changeTodoBtn.addEventListener("click", () => {
      dialogChangeTodo(todo, project);

    });

    groupbtn.appendChild(changeTodoBtn)

    const deleteTodoBtn = document.createElement("img");
    deleteTodoBtn.src = deleteBtn;

    deleteTodoBtn.addEventListener("click", () => {
      deleteTodo(todo.id);

      console.log("Обновленный projectsData:", getTodosByProject(project.id));
      
    });

    groupbtn.appendChild(deleteTodoBtn);

    const todoDescription = document.createElement('p')

    todoDescription.textContent = todo.description;
    todo_item.appendChild(todoDescription)

    const todoDate = document.createElement('p')
    todoDate.classList.add('date')
    todoDate.textContent = todo.date;
    todo_item.appendChild(todoDate)

  }

  const newTodos = document.createElement("div");
  newTodos.classList.add("new-item");

  todosContainer.appendChild(newTodos);

  const buttonCreatorTodo = document.createElement("div");
  buttonCreatorTodo.classList.add("buttonCreator");

  newTodos.appendChild(buttonCreatorTodo);

  const img = document.createElement("img");
  img.src = newBtn;
  buttonCreatorTodo.appendChild(img);

  const span = document.createElement("span");
  span.textContent = "Добавить задачу";

  buttonCreatorTodo.addEventListener("click", () => {
    dialogCreateTodo(project);

  });

  buttonCreatorTodo.appendChild(span);
}

function dialogCreateTodo(project) {
  const newTodoWindow = document.createElement("dialog");
  const formforTodo = document.createElement("form");
  formforTodo.method = "dialog";

  newTodoWindow.appendChild(formforTodo);

  // название задачи

  const titleForm = document.createElement("label");
  titleForm.textContent = "Задача:";

  formforTodo.appendChild(titleForm);

  const inputForm = document.createElement("input");
  inputForm.type = "text";
  inputForm.id = "inputProject";

  titleForm.appendChild(inputForm);

  // Описание задачи
  const descriptionForm = document.createElement("label");
  descriptionForm.textContent = "Описание:";

  formforTodo.appendChild(descriptionForm);

  const inputDescForm = document.createElement("textarea");
  inputDescForm.id = "inputDesc";

  descriptionForm.appendChild(inputDescForm);

  // приоритет задачи
  const priorityForm = document.createElement("label");
  priorityForm.textContent = "Приоритет:";

  formforTodo.appendChild(priorityForm);

  const selectPriorForm = document.createElement("select");
  selectPriorForm.id = 'prior';


  const priorities = ['Высокий', 'Средний', 'Низкий']

  priorities.forEach( item => {
    const option = document.createElement('option')
    option.value = item
    option.textContent = item;
    selectPriorForm.appendChild(option);
  })

  selectPriorForm.value = 'Средний'; 

  priorityForm.appendChild(selectPriorForm);

  const okBtn = document.createElement("div");

  okBtn.classList.add('okBtn')
  formforTodo.appendChild(okBtn);

  const cancel = document.createElement("button");
  cancel.textContent = "Отмена";
  cancel.value = "cancel";
  cancel.type = "submit";

  okBtn.appendChild(cancel);

  const create = document.createElement("button");
  create.textContent = "Готово";
  create.value = "create";
  create.type = "submit";

  okBtn.appendChild(create);

  document.body.appendChild(newTodoWindow);

  newTodoWindow.showModal();

  newTodoWindow.addEventListener("close", () => {
    if (newTodoWindow.returnValue === "create") {
      const todoName = inputForm.value;
      const todoDesc = inputDescForm.value;
      const todoPriority = selectPriorForm.value;
      const todoProject = project;

      if (todoName) {
        addTodo(todoName, todoDesc, todoPriority, todoProject);
        todosLoad(todoProject.id);
        console.log(`Задача "${todoName}" создана`);
        console.log(getTodosByProject(project.id));
      } else {
        alert("Введите название проекта!");
      }
    }
    newTodoWindow.remove();
  });
}
