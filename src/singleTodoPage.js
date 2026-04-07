import { todosData, getTodosByProject, saveToLocalStorage } from "./data.js";
import { todosLoad } from "./todosPage.js";
import { mainLoad } from "./mainPage.js";
import { priorityLoad } from "./priorityPage.js";

export const priorities = ["Высокий", "Средний", "Низкий"];
export function dialogChangeTodo(todo, project) {
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
  inputForm.value = todo.name;

  titleForm.appendChild(inputForm);

  // Описание задачи
  const descriptionForm = document.createElement("label");
  descriptionForm.textContent = "Описание:";

  formforTodo.appendChild(descriptionForm);

  const inputDescForm = document.createElement("textarea");
  inputDescForm.id = "inputDesc";
  inputDescForm.value = todo.description;

  descriptionForm.appendChild(inputDescForm);

  // приоритет задачи
  const priorityForm = document.createElement("label");
  priorityForm.textContent = "Приоритет:";

  formforTodo.appendChild(priorityForm);

  const selectPriorForm = document.createElement("select");
  selectPriorForm.id = "prior";

  priorities.forEach((item) => {
    const option = document.createElement("option");
    option.value = item;
    option.textContent = item;
    selectPriorForm.appendChild(option);
  });

  selectPriorForm.value = todo.priority;

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

      if (todoName) {
        todo.name = todoName;
        todo.description = todoDesc;
        todo.priority = todoPriority;

        const content = document.querySelector(".content");
        const currentPage = content?.children[0];

        const pageTitle = currentPage?.querySelector("h1")?.textContent || "";

        if (pageTitle.includes("высокого приоритета")) {
          priorityLoad("Высокий");
        } else if (pageTitle.includes("среднего приоритета")) {
          priorityLoad("Средний");
        } else if (pageTitle.includes("низкого приоритета")) {
          priorityLoad("Низкий");
        } else if (currentPage?.classList.contains("mainPage")) {
          mainLoad();
        } else if (currentPage?.classList.contains("todosPage")) {
          todosLoad(project.id);
        }

        console.log(`Задача "${todoName}" изменена`);
        saveToLocalStorage();
        console.log(getTodosByProject(project.id));
      } else {
        alert("Введите название проекта!");
      }
    }
    newTodoWindow.remove();
  });
}
