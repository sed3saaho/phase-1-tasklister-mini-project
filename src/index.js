document.addEventListener("DOMContentLoaded", () => {
  // your code here
  const taskForm = document.getElementById('create-task-form');
const taskInput = document.getElementById('new-task-description');
const taskList = document.getElementById('tasks');

taskForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const taskName = taskInput.value;
  const prioritySelect = document.createElement('select');
  prioritySelect.innerHTML = `
    <option value="high">High Priority</option>
    <option value="medium">Medium Priority</option>
    <option value="low">Low Priority</option>
  `;
  const additionalInput = document.createElement('input');
  additionalInput.type = 'text';
  additionalInput.placeholder = 'Additional info';

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', function() {
    taskItem.remove();
  });

  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.addEventListener('click', function() {
    const newTaskName = prompt('Enter new task description:');
    taskItem.querySelector('.task-name').textContent = newTaskName;
  });

  const taskItem = document.createElement('li');
  taskItem.innerHTML = `
    <span class="task-name">${taskName}</span> | 
    Priority: 
  `;
  taskItem.appendChild(prioritySelect);
  taskItem.appendChild(document.createTextNode(' | Additional: '));
  taskItem.appendChild(additionalInput);
  taskItem.appendChild(deleteButton);
  taskItem.appendChild(editButton);

  taskList.appendChild(taskItem);
  taskInput.value = '';
});

// Sorting functionality
const sortSelect = document.createElement('select');
sortSelect.innerHTML = `
  <option value="ascending">Ascending</option>
  <option value="descending">Descending</option>
`;
document.body.insertBefore(sortSelect, taskList);
sortSelect.addEventListener('change', function() {
  const tasks = Array.from(taskList.children);
  tasks.sort((a, b) => {
    const aPriority = a.querySelector('select').value;
    const bPriority = b.querySelector('select').value;
    return sortSelect.value === 'ascending' ? aPriority.localeCompare(bPriority) : bPriority.localeCompare(aPriority);
  });
  taskList.innerHTML = '';
  tasks.forEach(task => taskList.appendChild(task));
});
});
