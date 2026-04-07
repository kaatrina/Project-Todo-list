import {
  todosData,
  projectsData,
  deleteTodo,
  getTodosByProject,
} from "./data.js";
import changeBtn from "./pen.png";
import deleteBtn from "./close.png";
import { dialogChangeTodo } from "./singleTodoPage.js";

export function priorityLoad(priority) {
  const content = document.querySelector(".content");

  content.innerHTML = "";
  const mainPage = document.createElement("div");
  mainPage.classList.add("priorityPage");
  content.appendChild(mainPage);

  let titleText = "";
  if (priority === "Высокий") {
    titleText = "Задачи высокого приоритета";
  } else if (priority === "Средний") {
    titleText = "Задачи среднего приоритета";
  } else if (priority === "Низкий") {
    titleText = "Задачи низкого приоритета";
  }

  const welcome = document.createElement("h1");
  welcome.textContent = titleText;
  mainPage.appendChild(welcome);

  const todayContainer = document.createElement("div");
  mainPage.appendChild(todayContainer);

  let hasHightPriority = false;

  for (let todo of todosData) {
    if (todo.priority === priority) {
      hasHightPriority = true;
      const todo_item = document.createElement("div");
      todo_item.classList.add("todo-item");
      todayContainer.appendChild(todo_item);
      
      if (priority === "Высокий") {
        todo_item.style.border = '2px solid red'
      } else if (priority === "Средний") {
        todo_item.style.border = '2px solid orange'
      } else if (priority === "Низкий") {
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
        dialogChangeTodo(todo, todo.project);
      });

      groupbtn.appendChild(changeTodoBtn);

      const deleteTodoBtn = document.createElement("img");
      deleteTodoBtn.src = deleteBtn;

      deleteTodoBtn.addEventListener("click", () => {
        deleteTodo(todo.id);

        console.log("Обновленный projectsData:", getTodosByProject(project.id));
        priorityLoad(priority);
      });

      groupbtn.appendChild(deleteTodoBtn);

      const todoDescription = document.createElement("p");
      todoDescription.textContent = todo.description;
      todo_item.appendChild(todoDescription);

      const lastLine = document.createElement("div");
      lastLine.classList.add("lastline");
      todo_item.appendChild(lastLine);

      const todoDate = document.createElement("p");
      todoDate.classList.add("date");
      todoDate.textContent = todo.date;
      lastLine.appendChild(todoDate);

      const todoProject = document.createElement("p");
      todoProject.style.marginRight = "10px";
      const project = projectsData.find((p) => p.id === todo.project?.id);
      todoProject.textContent = `#${project.name}`;
      console.log(todoProject);
      lastLine.appendChild(todoProject);
    }
  }

  if (!hasHightPriority) {
    const noTodos = document.createElement("h4");
    noTodos.textContent = `Нет задач приоритета "${priority}"`;
    todayContainer.appendChild(noTodos);
  }
}
