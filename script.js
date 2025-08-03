const taskInput = document.getElementById('taskInput');
const deadlineInput = document.getElementById('deadlineInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

addTaskBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  const deadline = deadlineInput.value;

  if (taskText === '') {
    alert('Please enter a task.');
    return;
  }

  const task = document.createElement('li');
  task.className = 'task';

  const taskContent = document.createElement('span');
  taskContent.textContent = taskText;

  const buttons = document.createElement('div');
  buttons.className = 'buttons';

  const checkBtn = document.createElement('button');
  checkBtn.innerHTML = '<i class="fas fa-check"></i>';
  checkBtn.addEventListener('click', () => {
    task.classList.toggle('completed');

    if (task.classList.contains('completed')) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  });

  const deleteBtn = document.createElement('button');
  deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
  deleteBtn.addEventListener('click', () => {
    task.remove();
  });

  buttons.appendChild(checkBtn);
  buttons.appendChild(deleteBtn);

  if (deadline) {
    const deadlineText = document.createElement('span');
    deadlineText.className = 'deadline';
    deadlineText.textContent = `Due: ${deadline}`;
    task.appendChild(deadlineText);

    const now = new Date();
    const dueDate = new Date(deadline);
    const timeDiff = dueDate - now;

    if (timeDiff < 86400000 && timeDiff > 0) {
      alert(`Reminder: Task "${taskText}" is due within 24 hours!`);
    }

    if (timeDiff < 0) {
      task.style.border = '2px solid red';
    }
  }

  task.appendChild(taskContent);
  task.appendChild(buttons);
  taskList.appendChild(task);

  taskInput.value = '';
  deadlineInput.value = '';
});

// Enable drag & drop
new Sortable(taskList, {
  animation: 150,
  ghostClass: 'dragging',
});

