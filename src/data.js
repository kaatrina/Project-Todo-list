export let projectsData = [];


// Загрузка данных из localStorage
export function loadFromLocalStorage() {
  const savedProjects = localStorage.getItem('projects');
  const savedTodos = localStorage.getItem('todos');
  
  if (savedProjects) {
    projectsData.length = 0; // Очищаем массив чтобы не было дубликатов
    const parsed = JSON.parse(savedProjects);

    projectsData.push(...parsed);
    // ↑ спред-оператор "разворачивает" массив
    // Результат: todosData = [задача1, задача2], иначе был бы массив в массиве


  } else {
    // проект по умолчанию
    const defaultProject = new Project('Работа');
    projectsData.push(defaultProject);
  }
  
  if (savedTodos) {
    todosData.length = 0;
    const parsed = JSON.parse(savedTodos);
    todosData.push(...parsed);
  }
  
  console.log('Данные загружены из localStorage');
  console.log('Проектов:', projectsData.length);
  console.log('Задач:', todosData.length);
}


// Сохранение данных в localStorage
export function saveToLocalStorage() {
  localStorage.setItem('projects', JSON.stringify(projectsData));  // json для сохранения объектов, 
  localStorage.setItem('todos', JSON.stringify(todosData));         // тк localstorage может хранить только строки
  console.log('Данные сохранены в localStorage');
}



export function getTodayPretty() {
  const today = new Date();
  const options = { year: "numeric", month: "long", day: "numeric" };
  return today.toLocaleDateString("ru-RU", options);
}

class Project {
  id = crypto.randomUUID();
  constructor(name) {
    this.name = name;
  }
}

export function addProject(name) {
  let project = new Project(name);
  projectsData.push(project);
  saveToLocalStorage(); // Сохраняем после изменения
}

export function deleteProject(id) {
  projectsData = projectsData.filter((project) => project.id !== id);
  todosData = todosData.filter((todo) => todo.project?.id !== id);
  saveToLocalStorage(); // Сохраняем после изменения
}

export let todosData = [];

class Todo {
  id = crypto.randomUUID();
  date = getTodayPretty();

  constructor(name, description, priority, project) {
    this.project = project;
    this.name = name;
    this.description = description;
    this.priority = priority;
  }
}

export function addTodo(name, description, priority, project) {
  let todo = new Todo(name, description, priority, project);
  todosData.push(todo);
  saveToLocalStorage(); // Сохраняем после изменения
}

export function deleteTodo(id) {
  todosData = todosData.filter((todo) => todo.id !== id);
  saveToLocalStorage(); // Сохраняем после изменения
}

export function getTodosByProject(projectId) {
  return todosData.filter((todo) => todo.project?.id === projectId);
}

export function getProjectTasksCount(projectId) {
  return getTodosByProject(projectId).length;
}

export let name = 'Екатерина'
