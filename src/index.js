import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const projectsContainer = document.querySelector("[data-projects]");
const newProjectForm = document.querySelector("[data-new-project-form");
const newProjectInput = document.querySelector("[data-new-project-input");
const deleteProjectButton = document.querySelector(
  "[data-delete-project-button]"
);
const projectDisplayContainer = document.querySelector(
  "[data-list-main-container]"
);
const projectTitleElement = document.querySelector("[data-list-title]");
const projectCountElement = document.querySelector("[data-list-count]");
const tasksContainer = document.querySelector("[data-tasks]");
const taskTemplate = document.getElementById("task-template");
const newTaskForm = document.querySelector("[data-new-task-form]");
const newTaskInput = document.querySelector("[data-new-task-input]");
const clearCompleteTasksButton = document.querySelector(
  "[data-clear-complete-tasks-button]"
);

const LOCAL_STORAGE_LIST_KEY = "task.lists";
const LOCAL_STORAGE_LIST_ID_KEY = "task.selectedListId";
let projects = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || [];
let selectedProjectId = localStorage.getItem(LOCAL_STORAGE_LIST_ID_KEY);

projectsContainer.addEventListener("click", (e) => {
  if (e.target.tagName.toLowerCase() === "li") {
    selectedProjectId = e.target.dataset.projectId;
    saveAndRender();
  }
});

tasksContainer.addEventListener("click", (e) => {
  if (e.target.tagName.toLowerCase() === "input") {
    const selectedProject = projects.find(
      (project) => project.id === selectedProjectId
    );
    const selectedTask = selectedProject.tasks.find(
      (task) => task.id === e.target.id
    );
    selectedTask.complete = e.target.checked;
    save();
    renderTaskCount(selectedProject);
  }
});

clearCompleteTasksButton.addEventListener("click", () => {
  const selectedProject = projects.find(
    (project) => project.id === selectedProjectId
  );
  selectedProject.tasks = selectedProject.tasks.filter(
    (task) => !task.complete
  );
  saveAndRender();
});

deleteProjectButton.addEventListener("click", () => {
  projects = projects.filter((project) => project.id !== selectedProjectId);
  selectedProjectId = null;
  saveAndRender();
});

newProjectForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const projectName = newProjectInput.value;
  if (projectName == null || projectName == "") return;
  const project = createProject(projectName);
  newProjectInput.value = null;
  projects.push(project);
  saveAndRender();
});

newTaskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const taskName = newTaskInput.value;
  if (taskName == null || taskName == "") return;
  const task = createTask(taskName);
  newTaskInput.value = null;
  const selectedProject = projects.find(
    (project) => project.id === selectedProjectId
  );
  selectedProject.tasks.push(task);
  saveAndRender();
});

function createProject(name) {
  return { id: Date.now().toString(), name: name, tasks: [] };
}

function createTask(name) {
  return { id: Date.now().toString(), name: name, complete: false };
}

function saveAndRender() {
  save();
  render();
}

function save() {
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(projects));
  localStorage.setItem(LOCAL_STORAGE_LIST_ID_KEY, selectedProjectId);
}

const render = () => {
  clearElement(projectsContainer);
  renderProjects();
  const selectedProject = projects.find(
    (project) => project.id === selectedProjectId
  );
  if (selectedProjectId == null) {
    projectDisplayContainer.style.display = "none";
  } else {
    projectDisplayContainer.style.display = "";
    projectTitleElement.innerText = selectedProject.name;
    renderTaskCount(selectedProject);
    clearElement(tasksContainer);
    renderTasks(selectedProject);
  }
};

function renderTasks(selectedProject) {
  selectedProject.tasks.forEach((task) => {
    const taskElement = document.importNode(taskTemplate.content, true);
    const checkbox = taskElement.querySelector("input");
    checkbox.id = task.id;
    checkbox.checked = task.complete;
    const label = taskElement.querySelector("label");
    label.htmlFor = task.id;
    label.append(task.name);
    tasksContainer.appendChild(taskElement);
  });
}

function renderTaskCount(selectedProject) {
  const incompleteTaskCount = selectedProject.tasks.filter(
    (task) => !task.complete
  ).length;
  const taskString = incompleteTaskCount === 1 ? "task" : "tasks";
  projectCountElement.innerText = `${incompleteTaskCount} ${taskString} remaining`;
}

function renderProjects() {
  projects.forEach((project) => {
    const listElement = document.createElement("li");
    listElement.dataset.projectId = project.id;
    listElement.classList.add("project-name");
    listElement.innerText = project.name;
    if (project.id === selectedProjectId) {
      listElement.classList.add("active-project");
    }
    projectsContainer.appendChild(listElement);
  });
}

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

render();

const firebaseConfig = {
  apiKey: "AIzaSyBBkh-2Nqy6DdJywynMZkDdLD67_rlV_Qo",
  authDomain: "to-do-list-4cc16.firebaseapp.com",
  projectId: "to-do-list-4cc16",
  storageBucket: "to-do-list-4cc16.appspot.com",
  messagingSenderId: "154682506359",
  appId: "1:154682506359:web:893ba33bb7a3b5b255da72",
  measurementId: "G-10G6JZGMH5",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
