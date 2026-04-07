import { projectsData} from "./data.js";
import { projectsLoad } from "./projectsPage.js";
import { todosLoad } from "./todosPage.js";
import AvatarImg from "./avatar.png";
import { mainLoad } from "./mainPage.js";
import { priorities } from "./singleTodoPage.js";
import { priorityLoad } from "./priorityPage.js";


export let currentUserName = localStorage.getItem('userName') || 'Екатерина';

export function sidebarLoad() {
  const sidebar = document.querySelector(".sidebar");

  sidebar.innerHTML = "";

  const icon = document.createElement("div");
  icon.classList.add("icon");
  sidebar.appendChild(icon);

  const avatar = document.createElement("img");
  avatar.src = AvatarImg;
  icon.appendChild(avatar);

  const myName = document.createElement("h3");
  myName.style.cursor = 'pointer'
  myName.textContent = currentUserName;;


 myName.addEventListener('click', () => {

    dialogName()

 })

  icon.appendChild(myName);

  const menuProjects = document.createElement("div");
  menuProjects.classList.add("menuProjects");
  sidebar.appendChild(menuProjects);

  const mainPage = document.createElement("h3");
  mainPage.textContent = "Главная";

  menuProjects.appendChild(mainPage);

  const priopity = document.createElement("h2");
  priopity.classList.add('none-style')
  priopity.textContent = "Приоритет";
  priopity.style.hover = 'none'
  menuProjects.appendChild(priopity);



  const listPriorities = document.createElement("ul");
  listPriorities.classList.add("list");
  menuProjects.appendChild(listPriorities);

  for (const priority of priorities) {



    const prior_item = document.createElement("li");

    


    const prior = document.createElement("p");
    prior.textContent = priority;
    prior_item.appendChild(prior)

    prior_item.addEventListener('click', () => {
        
        priorityLoad(priority)

    })

    listPriorities.appendChild(prior_item);
  }

  mainPage.addEventListener("click", () => {
    mainLoad();
  });

  const nameListProjects = document.createElement("h3");
  nameListProjects.textContent = "Все проекты";
  menuProjects.appendChild(nameListProjects);

  nameListProjects.addEventListener("click", projectsLoad);

  const listProjects = document.createElement("ul");
  listProjects.classList.add("list");
  menuProjects.appendChild(listProjects);

  for (const project of projectsData) {
    const project_item = document.createElement("li");
    project_item.textContent = project.name;
    project_item.dataset.projectId = project.id;

    project_item.addEventListener("click", () => {
      todosLoad(project.id);
    });

    listProjects.appendChild(project_item);
  }
}

function dialogName () {
    const newProjectWindow = document.createElement('dialog')
    const formforProject = document.createElement('form')
    formforProject.method = 'dialog'

    newProjectWindow.appendChild(formforProject)

    const titleForm = document.createElement('label')
    titleForm.textContent = 'Введите имя'

    formforProject.appendChild(titleForm)

    const inputForm = document.createElement('input')
    inputForm.type = 'text'
    inputForm.id = 'inputProject'
    inputForm.value = currentUserName;
    inputForm.maxLength = '11'
    inputForm.minLength = '2'

    titleForm.appendChild(inputForm)

    const okBtn = document.createElement('div')
    okBtn.classList.add('okBtn')
    formforProject.appendChild(okBtn)

    const cancel = document.createElement('button')
    cancel.textContent = 'Отмена'
    cancel.value = 'cancel'
    cancel.type = 'submit';

    okBtn.appendChild(cancel)


    const create = document.createElement('button')
    create.textContent = 'Готово'
    create.value = 'create'
    create.type = 'submit';

    okBtn.appendChild(create)
    

    document.body.appendChild(newProjectWindow);

    newProjectWindow.showModal();

    newProjectWindow.addEventListener('close', () => {
        if (newProjectWindow.returnValue === 'create') {
            const newName = inputForm.value;
            if (newName && newName.trim()) {
                currentUserName = newName.trim();
                localStorage.setItem('userName', currentUserName); 
                sidebarLoad(); 
                mainLoad();
            } 
        }
        newProjectWindow.remove();
    });
}
