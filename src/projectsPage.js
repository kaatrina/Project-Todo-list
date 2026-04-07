import { projectsData, deleteProject, addProject } from "./data.js";
import deleteBtn from "./close.png";
import newBtn from "./plus.png";
import { sidebarLoad } from "./sidebar.js";
import { todosLoad } from "./todosPage.js";


function projectsShow(){

}

export function projectsLoad() {
  const content = document.querySelector(".content");

  content.innerHTML = "";

  const title = document.createElement("h1");
  title.textContent = "Мои проекты";
  title.style.marginBottom = '30px'
  content.appendChild(title);

  const projectsContainer = document.createElement("div");
  projectsContainer.classList.add("projectsContainer");

  content.appendChild(projectsContainer);


  for (const project of projectsData) {
    const project_item = document.createElement("div");
    project_item.classList.add("project-item");

    project_item.addEventListener('click', () => {
        todosLoad(project.id)
    } )

    projectsContainer.appendChild(project_item);

    const projectName = document.createElement("h3");
    projectName.textContent = project.name;

    project_item.appendChild(projectName);

    const deleteProjectBtn = document.createElement("img");
    deleteProjectBtn.src = deleteBtn;

    deleteProjectBtn.addEventListener('click', (event) => {
        event.stopPropagation()
        deleteProject(project.id)

    console.log('Обновленный projectsData:', projectsData);
    projectsLoad()
    sidebarLoad()
    
    })

    project_item.appendChild(deleteProjectBtn);
  }

  const newProjects = document.createElement("div");
  newProjects.classList.add("new-item");

  projectsContainer.appendChild(newProjects);


  const buttonCreator = document.createElement('div')
  buttonCreator.classList.add('buttonCreator')

  newProjects.appendChild(buttonCreator)

  const img = document.createElement("img");
  img.src = newBtn;
  buttonCreator.appendChild(img);

  const span = document.createElement("span");
  span.textContent = "Cоздать новый проект";


  buttonCreator.addEventListener('click', dialogCreateProject)

  buttonCreator.appendChild(span);
}


function dialogCreateProject () {
    const newProjectWindow = document.createElement('dialog')
    const formforProject = document.createElement('form')
    formforProject.method = 'dialog'

    newProjectWindow.appendChild(formforProject)

    const titleForm = document.createElement('label')
    titleForm.textContent = 'Название проекта:'

    formforProject.appendChild(titleForm)

    const inputForm = document.createElement('input')
    inputForm.type = 'text'
    inputForm.id = 'inputProject'

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
            const projectName = inputForm.value;
            if (projectName) {
                addProject(projectName);
                projectsLoad();  
                sidebarLoad();   
                console.log(`Проект "${projectName}" создан`);
            } else {
                alert('Введите название проекта!');
            }
        }
        newProjectWindow.remove();
    });
}