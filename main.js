/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
const projectsContainer = document.querySelector('[data-projects]')
const newProjectForm = document.querySelector('[data-new-project-form')
const newProjectInput = document.querySelector('[data-new-project-input')
const deleteProjectButton = document.querySelector('[data-delete-project-button]')
const projectDisplayContainer = document.querySelector('[data-list-main-container]')
const projectTitleElement = document.querySelector('[data-list-title]')
const projectCountElement = document.querySelector('[data-list-count]')
const tasksContainer = document.querySelector('[data-tasks]')
const taskTemplate = document.getElementById('task-template')
const newTaskForm = document.querySelector('[data-new-task-form]')
const newTaskInput = document.querySelector('[data-new-task-input]')
const clearCompleteTasksButton = document.querySelector('[data-clear-complete-tasks-button]')

const LOCAL_STORAGE_LIST_KEY = 'task.lists'
const LOCAL_STORAGE_LIST_ID_KEY = 'task.selectedListId'
let projects = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || []
let selectedProjectId = localStorage.getItem(LOCAL_STORAGE_LIST_ID_KEY)

projectsContainer.addEventListener('click', e => {
    if (e.target.tagName.toLowerCase() === 'li') {
        selectedProjectId = e.target.dataset.projectId
        saveAndRender()
    }
})

tasksContainer.addEventListener('click', e => {
    if (e.target.tagName.toLowerCase() === 'input') {
        const selectedProject = projects.find(project => project.id === selectedProjectId)
        const selectedTask = selectedProject.tasks.find(task => task.id === e.target.id)
        selectedTask.complete = e.target.checked
        save()
        renderTaskCount(selectedProject)
    }
})

clearCompleteTasksButton.addEventListener('click', e => {
    const selectedProject = projects.find(project => project.id === selectedProjectId)
    selectedProject.tasks = selectedProject.tasks.filter(task => !task.complete)
    saveAndRender()
})

deleteProjectButton.addEventListener('click', () => {
    projects = projects.filter(project => project.id !== selectedProjectId)
    selectedProjectId = null
    saveAndRender()
})

newProjectForm.addEventListener('submit', e => {
    e.preventDefault()
    const projectName = newProjectInput.value
    if (projectName == null || projectName == '') return
    const project = createProject(projectName)
    newProjectInput.value = null
    projects.push(project)
    saveAndRender()
})

newTaskForm.addEventListener('submit', e => {
    e.preventDefault()
    const taskName = newTaskInput.value
    if (taskName == null || taskName == '') return
    const task = createTask(taskName)
    newTaskInput.value = null
    const selectedProject = projects.find(project => project.id === selectedProjectId)
    selectedProject.tasks.push(task)
    saveAndRender()
})

function createProject(name) {
    return { id: Date.now().toString(), name: name, tasks:[] }
}

function createTask(name) {
    return { id: Date.now().toString(), name: name, complete: false }
}

function saveAndRender() {
    save()
    render()
}

function save() {
    localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(projects))
    localStorage.setItem(LOCAL_STORAGE_LIST_ID_KEY, selectedProjectId)
}

const render = () => {
    clearElement(projectsContainer)
    renderProjects()
    const selectedProject = projects.find(project => project.id === selectedProjectId)
    if(selectedProjectId == null) {
        projectDisplayContainer.style.display = 'none'
    } else {
        projectDisplayContainer.style.display = ''
        projectTitleElement.innerText = selectedProject.name
        renderTaskCount(selectedProject)
        clearElement(tasksContainer)
        renderTasks(selectedProject)
    }
}

function renderTasks(selectedProject) {
    selectedProject.tasks.forEach(task => {
        const taskElement = document.importNode(taskTemplate.content, true)
        const checkbox = taskElement.querySelector('input')
        checkbox.id = task.id
        checkbox.checked = task.complete
        const label = taskElement.querySelector('label')
        label.htmlFor = task.id
        label.append(task.name)
        tasksContainer.appendChild(taskElement)
    })
}

function renderTaskCount(selectedProject) {
    const incompleteTaskCount = selectedProject.tasks.filter(task => !task.complete).length
    const taskString = incompleteTaskCount === 1 ? 'task' : 'tasks'
    projectCountElement.innerText = `${incompleteTaskCount} ${taskString} remaining`
}

function renderProjects() {
    projects.forEach(project => {
        const listElement = document.createElement('li')
        listElement.dataset.projectId = project.id
        listElement.classList.add("project-name")
        listElement.innerText = project.name
        if (project.id === selectedProjectId) {
            listElement.classList.add('active-project')
        }
        projectsContainer.appendChild(listElement)
    })
}

function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }
}

render()
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QyxxQkFBcUIsRUFBRSxZQUFZO0FBQzFFOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsUSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBwcm9qZWN0c0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXByb2plY3RzXScpXG5jb25zdCBuZXdQcm9qZWN0Rm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLW5ldy1wcm9qZWN0LWZvcm0nKVxuY29uc3QgbmV3UHJvamVjdElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtbmV3LXByb2plY3QtaW5wdXQnKVxuY29uc3QgZGVsZXRlUHJvamVjdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWRlbGV0ZS1wcm9qZWN0LWJ1dHRvbl0nKVxuY29uc3QgcHJvamVjdERpc3BsYXlDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1saXN0LW1haW4tY29udGFpbmVyXScpXG5jb25zdCBwcm9qZWN0VGl0bGVFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtbGlzdC10aXRsZV0nKVxuY29uc3QgcHJvamVjdENvdW50RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWxpc3QtY291bnRdJylcbmNvbnN0IHRhc2tzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtdGFza3NdJylcbmNvbnN0IHRhc2tUZW1wbGF0ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrLXRlbXBsYXRlJylcbmNvbnN0IG5ld1Rhc2tGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtbmV3LXRhc2stZm9ybV0nKVxuY29uc3QgbmV3VGFza0lucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtbmV3LXRhc2staW5wdXRdJylcbmNvbnN0IGNsZWFyQ29tcGxldGVUYXNrc0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNsZWFyLWNvbXBsZXRlLXRhc2tzLWJ1dHRvbl0nKVxuXG5jb25zdCBMT0NBTF9TVE9SQUdFX0xJU1RfS0VZID0gJ3Rhc2subGlzdHMnXG5jb25zdCBMT0NBTF9TVE9SQUdFX0xJU1RfSURfS0VZID0gJ3Rhc2suc2VsZWN0ZWRMaXN0SWQnXG5sZXQgcHJvamVjdHMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKExPQ0FMX1NUT1JBR0VfTElTVF9LRVkpKSB8fCBbXVxubGV0IHNlbGVjdGVkUHJvamVjdElkID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oTE9DQUxfU1RPUkFHRV9MSVNUX0lEX0tFWSlcblxucHJvamVjdHNDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbiAgICBpZiAoZS50YXJnZXQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnbGknKSB7XG4gICAgICAgIHNlbGVjdGVkUHJvamVjdElkID0gZS50YXJnZXQuZGF0YXNldC5wcm9qZWN0SWRcbiAgICAgICAgc2F2ZUFuZFJlbmRlcigpXG4gICAgfVxufSlcblxudGFza3NDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbiAgICBpZiAoZS50YXJnZXQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnaW5wdXQnKSB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkUHJvamVjdCA9IHByb2plY3RzLmZpbmQocHJvamVjdCA9PiBwcm9qZWN0LmlkID09PSBzZWxlY3RlZFByb2plY3RJZClcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRUYXNrID0gc2VsZWN0ZWRQcm9qZWN0LnRhc2tzLmZpbmQodGFzayA9PiB0YXNrLmlkID09PSBlLnRhcmdldC5pZClcbiAgICAgICAgc2VsZWN0ZWRUYXNrLmNvbXBsZXRlID0gZS50YXJnZXQuY2hlY2tlZFxuICAgICAgICBzYXZlKClcbiAgICAgICAgcmVuZGVyVGFza0NvdW50KHNlbGVjdGVkUHJvamVjdClcbiAgICB9XG59KVxuXG5jbGVhckNvbXBsZXRlVGFza3NCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbiAgICBjb25zdCBzZWxlY3RlZFByb2plY3QgPSBwcm9qZWN0cy5maW5kKHByb2plY3QgPT4gcHJvamVjdC5pZCA9PT0gc2VsZWN0ZWRQcm9qZWN0SWQpXG4gICAgc2VsZWN0ZWRQcm9qZWN0LnRhc2tzID0gc2VsZWN0ZWRQcm9qZWN0LnRhc2tzLmZpbHRlcih0YXNrID0+ICF0YXNrLmNvbXBsZXRlKVxuICAgIHNhdmVBbmRSZW5kZXIoKVxufSlcblxuZGVsZXRlUHJvamVjdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBwcm9qZWN0cyA9IHByb2plY3RzLmZpbHRlcihwcm9qZWN0ID0+IHByb2plY3QuaWQgIT09IHNlbGVjdGVkUHJvamVjdElkKVxuICAgIHNlbGVjdGVkUHJvamVjdElkID0gbnVsbFxuICAgIHNhdmVBbmRSZW5kZXIoKVxufSlcblxubmV3UHJvamVjdEZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgZSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgY29uc3QgcHJvamVjdE5hbWUgPSBuZXdQcm9qZWN0SW5wdXQudmFsdWVcbiAgICBpZiAocHJvamVjdE5hbWUgPT0gbnVsbCB8fCBwcm9qZWN0TmFtZSA9PSAnJykgcmV0dXJuXG4gICAgY29uc3QgcHJvamVjdCA9IGNyZWF0ZVByb2plY3QocHJvamVjdE5hbWUpXG4gICAgbmV3UHJvamVjdElucHV0LnZhbHVlID0gbnVsbFxuICAgIHByb2plY3RzLnB1c2gocHJvamVjdClcbiAgICBzYXZlQW5kUmVuZGVyKClcbn0pXG5cbm5ld1Rhc2tGb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGUgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgIGNvbnN0IHRhc2tOYW1lID0gbmV3VGFza0lucHV0LnZhbHVlXG4gICAgaWYgKHRhc2tOYW1lID09IG51bGwgfHwgdGFza05hbWUgPT0gJycpIHJldHVyblxuICAgIGNvbnN0IHRhc2sgPSBjcmVhdGVUYXNrKHRhc2tOYW1lKVxuICAgIG5ld1Rhc2tJbnB1dC52YWx1ZSA9IG51bGxcbiAgICBjb25zdCBzZWxlY3RlZFByb2plY3QgPSBwcm9qZWN0cy5maW5kKHByb2plY3QgPT4gcHJvamVjdC5pZCA9PT0gc2VsZWN0ZWRQcm9qZWN0SWQpXG4gICAgc2VsZWN0ZWRQcm9qZWN0LnRhc2tzLnB1c2godGFzaylcbiAgICBzYXZlQW5kUmVuZGVyKClcbn0pXG5cbmZ1bmN0aW9uIGNyZWF0ZVByb2plY3QobmFtZSkge1xuICAgIHJldHVybiB7IGlkOiBEYXRlLm5vdygpLnRvU3RyaW5nKCksIG5hbWU6IG5hbWUsIHRhc2tzOltdIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlVGFzayhuYW1lKSB7XG4gICAgcmV0dXJuIHsgaWQ6IERhdGUubm93KCkudG9TdHJpbmcoKSwgbmFtZTogbmFtZSwgY29tcGxldGU6IGZhbHNlIH1cbn1cblxuZnVuY3Rpb24gc2F2ZUFuZFJlbmRlcigpIHtcbiAgICBzYXZlKClcbiAgICByZW5kZXIoKVxufVxuXG5mdW5jdGlvbiBzYXZlKCkge1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKExPQ0FMX1NUT1JBR0VfTElTVF9LRVksIEpTT04uc3RyaW5naWZ5KHByb2plY3RzKSlcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShMT0NBTF9TVE9SQUdFX0xJU1RfSURfS0VZLCBzZWxlY3RlZFByb2plY3RJZClcbn1cblxuY29uc3QgcmVuZGVyID0gKCkgPT4ge1xuICAgIGNsZWFyRWxlbWVudChwcm9qZWN0c0NvbnRhaW5lcilcbiAgICByZW5kZXJQcm9qZWN0cygpXG4gICAgY29uc3Qgc2VsZWN0ZWRQcm9qZWN0ID0gcHJvamVjdHMuZmluZChwcm9qZWN0ID0+IHByb2plY3QuaWQgPT09IHNlbGVjdGVkUHJvamVjdElkKVxuICAgIGlmKHNlbGVjdGVkUHJvamVjdElkID09IG51bGwpIHtcbiAgICAgICAgcHJvamVjdERpc3BsYXlDb250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHByb2plY3REaXNwbGF5Q29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnJ1xuICAgICAgICBwcm9qZWN0VGl0bGVFbGVtZW50LmlubmVyVGV4dCA9IHNlbGVjdGVkUHJvamVjdC5uYW1lXG4gICAgICAgIHJlbmRlclRhc2tDb3VudChzZWxlY3RlZFByb2plY3QpXG4gICAgICAgIGNsZWFyRWxlbWVudCh0YXNrc0NvbnRhaW5lcilcbiAgICAgICAgcmVuZGVyVGFza3Moc2VsZWN0ZWRQcm9qZWN0KVxuICAgIH1cbn1cblxuZnVuY3Rpb24gcmVuZGVyVGFza3Moc2VsZWN0ZWRQcm9qZWN0KSB7XG4gICAgc2VsZWN0ZWRQcm9qZWN0LnRhc2tzLmZvckVhY2godGFzayA9PiB7XG4gICAgICAgIGNvbnN0IHRhc2tFbGVtZW50ID0gZG9jdW1lbnQuaW1wb3J0Tm9kZSh0YXNrVGVtcGxhdGUuY29udGVudCwgdHJ1ZSlcbiAgICAgICAgY29uc3QgY2hlY2tib3ggPSB0YXNrRWxlbWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpXG4gICAgICAgIGNoZWNrYm94LmlkID0gdGFzay5pZFxuICAgICAgICBjaGVja2JveC5jaGVja2VkID0gdGFzay5jb21wbGV0ZVxuICAgICAgICBjb25zdCBsYWJlbCA9IHRhc2tFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2xhYmVsJylcbiAgICAgICAgbGFiZWwuaHRtbEZvciA9IHRhc2suaWRcbiAgICAgICAgbGFiZWwuYXBwZW5kKHRhc2submFtZSlcbiAgICAgICAgdGFza3NDb250YWluZXIuYXBwZW5kQ2hpbGQodGFza0VsZW1lbnQpXG4gICAgfSlcbn1cblxuZnVuY3Rpb24gcmVuZGVyVGFza0NvdW50KHNlbGVjdGVkUHJvamVjdCkge1xuICAgIGNvbnN0IGluY29tcGxldGVUYXNrQ291bnQgPSBzZWxlY3RlZFByb2plY3QudGFza3MuZmlsdGVyKHRhc2sgPT4gIXRhc2suY29tcGxldGUpLmxlbmd0aFxuICAgIGNvbnN0IHRhc2tTdHJpbmcgPSBpbmNvbXBsZXRlVGFza0NvdW50ID09PSAxID8gJ3Rhc2snIDogJ3Rhc2tzJ1xuICAgIHByb2plY3RDb3VudEVsZW1lbnQuaW5uZXJUZXh0ID0gYCR7aW5jb21wbGV0ZVRhc2tDb3VudH0gJHt0YXNrU3RyaW5nfSByZW1haW5pbmdgXG59XG5cbmZ1bmN0aW9uIHJlbmRlclByb2plY3RzKCkge1xuICAgIHByb2plY3RzLmZvckVhY2gocHJvamVjdCA9PiB7XG4gICAgICAgIGNvbnN0IGxpc3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuICAgICAgICBsaXN0RWxlbWVudC5kYXRhc2V0LnByb2plY3RJZCA9IHByb2plY3QuaWRcbiAgICAgICAgbGlzdEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInByb2plY3QtbmFtZVwiKVxuICAgICAgICBsaXN0RWxlbWVudC5pbm5lclRleHQgPSBwcm9qZWN0Lm5hbWVcbiAgICAgICAgaWYgKHByb2plY3QuaWQgPT09IHNlbGVjdGVkUHJvamVjdElkKSB7XG4gICAgICAgICAgICBsaXN0RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUtcHJvamVjdCcpXG4gICAgICAgIH1cbiAgICAgICAgcHJvamVjdHNDb250YWluZXIuYXBwZW5kQ2hpbGQobGlzdEVsZW1lbnQpXG4gICAgfSlcbn1cblxuZnVuY3Rpb24gY2xlYXJFbGVtZW50KGVsZW1lbnQpIHtcbiAgICB3aGlsZSAoZWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICAgIGVsZW1lbnQucmVtb3ZlQ2hpbGQoZWxlbWVudC5maXJzdENoaWxkKVxuICAgIH1cbn1cblxucmVuZGVyKCkiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=