import { todosData, getTodayPretty, projectsData, deleteTodo, getTodosByProject } from "./data.js";
import changeBtn from "./pen.png";
import deleteBtn from "./close.png";
import { dialogChangeTodo } from "./singleTodoPage.js";
import {currentUserName} from "./sidebar.js"


export function mainLoad() {
  const content = document.querySelector(".content");

  content.innerHTML = "";
  const mainPage = document.createElement("div");
  mainPage.classList.add('mainPage')
  content.appendChild(mainPage);

  const welcome = document.createElement("h1");
  welcome.textContent = `Привет, ${currentUserName} ✨`;
  mainPage.appendChild(welcome);

  const today = document.createElement("h2");
  today.textContent = "Сегодня";

  mainPage.appendChild(today);

  const todayContainer = document.createElement("div");
  mainPage.appendChild(todayContainer);

  const todayDate = getTodayPretty(); 
  let hasTodosToday = false; 

  for (let todo of todosData) {
    if (todo.date === todayDate) {
    hasTodosToday = true;
      const todo_item = document.createElement("div");
      todo_item.classList.add("todo-item");
      todayContainer.appendChild(todo_item);

      if (todo.priority === "Высокий") {
        todo_item.style.border = '2px solid red'
      } else if (todo.priority === "Средний") {
        todo_item.style.border = '2px solid orange'
      } else if (todo.priority === "Низкий") {
        todo_item.style.border = '2px solid green'
      }

      const firstLine = document.createElement("div");
      firstLine.classList.add("firstLine");
      todo_item.appendChild(firstLine);

      const todoName = document.createElement("h3");
      todoName.textContent = todo.name;
      firstLine.appendChild(todoName);

      const groupbtn = document.createElement("div");
      firstLine.appendChild(groupbtn);

      const changeTodoBtn = document.createElement("img");
      changeTodoBtn.src = changeBtn;
      changeTodoBtn.style.marginRight = "10px";

      changeTodoBtn.addEventListener("click", () => {
        dialogChangeTodo(todo, project);
        mainLoad()
      });

      groupbtn.appendChild(changeTodoBtn);

      const deleteTodoBtn = document.createElement("img");
      deleteTodoBtn.src = deleteBtn;

      deleteTodoBtn.addEventListener("click", () => {
        deleteTodo(todo.id);

        console.log("Обновленный projectsData:", getTodosByProject(project.id));
        mainLoad()
      });

      groupbtn.appendChild(deleteTodoBtn);

      const todoDescription = document.createElement("p");
      todoDescription.textContent = todo.description;
      todo_item.appendChild(todoDescription);

      const lastLine = document.createElement('div')
      lastLine.classList.add('lastline')
      todo_item.appendChild(lastLine)

      const todoDate = document.createElement("p");
      todoDate.classList.add("date");
      todoDate.textContent = todo.date;
      lastLine.appendChild(todoDate);

      const todoProject = document.createElement('p')
      todoProject.style.marginRight = '10px'
      const project = projectsData.find(p => p.id === todo.project?.id);
      todoProject.textContent = `#${project.name}`
      console.log(todoProject)
      lastLine.appendChild(todoProject)
    }
    
  }

  if (!hasTodosToday) {
    const noTodos = document.createElement('h4');
    noTodos.textContent = 'На сегодня задач больше нет';
    todayContainer.appendChild(noTodos);
  }
}
