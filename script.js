var input = document.getElementById('text');

var startBtn = document.getElementById('start-btn');

var stopAt;
function startTimer() {
  if (timer) {
    startBtn.style.backgroundColor = '#03a9f4';
    startBtn.style.width = '25%';
    startBtn.innerText = 'Start';

    stopAt = `${hrStr}:${minStr}:${secStr}`;
    clearInterval(timer);
    timer = null;

    addTimeToDOM();
    input.value = '';

    return;
  }
  startBtn.style.backgroundColor = '#f44336';
  startBtn.style.width = '30%';
  timerFunc();
}

startBtn.addEventListener('click', startTimer);

var timer;

var secStr;
var minStr;
var hrStr;

var totalSecondsInMin = 0;
var totalSeconds;

function timerFunc() {
  var sec = 0;
  var min = 0;
  var hr = 0;

  timer = setInterval(function () {
    startBtn.innerText = `${min}:${sec}`;
    if (sec == 60) {
      totalSecondsInMin += sec;
      sec = 0;

      min++;

      if (min == 60) {
        min = 0;

        hr++;
      }
    }

    secStr = '0' + sec;
    minStr = '0' + min;
    hrStr = '0' + hr;

    if (sec > 9) {
      var secArr = secStr.split('');
      secArr.shift();
      secStr = secArr.join('');

      // Array.prototype.shift.call(secStr);
    }
    if (min > 9) {
      var minArr = minStr.split('');
      minArr.shift();
      minStr = minArr.join('');

      // Array.prototype.shift.call(minStr);
    }
    if (hr > 9) {
      var hrArr = hrStr.split('');
      hrArr.shift();
      hrStr = hrArr.join('');

      // Array.prototype.shift.call(hrStr);
    }

    startBtn.innerText = `${hrStr}:${minStr}:${secStr}`;
    sec++;
    totalSeconds = totalSecondsInMin + sec - 1;
  }, 1000);
}

var date;
var inputValue;
var main = document.getElementById('main');
var tasks = document.createElement('div');
tasks.id = 'tasks';

var tasksObj = {};
var tasksArr = [];

function addTimeToDOM() {
  var d = new Date();
  createElements(d.toDateString(), stopAt, input.value);

  tasksArr.push(tasksObj);

  localStorage.setItem('tasks', JSON.stringify(tasksArr));
}

window.onload = function () {
  if (localStorage.getItem('tasks')) {
    tasksArr = JSON.parse(localStorage.getItem('tasks'));
  }

  for (var item of tasksArr) {
    createElements(item.date, item.time, item.task);
  }
};

function createElements(dateArg, timeArg, taskArg) {
  if (!main.children[0]) {
    var dateHeader = document.createElement('div');
    dateHeader.className = 'date-header';

    var dateDiv = document.createElement('div');
    dateDiv.id = 'date';

    dateDiv.textContent = dateArg;
    tasksObj.date = dateDiv.textContent;

    dateHeader.appendChild(dateDiv);

    main.appendChild(dateHeader);
  }

  var taskCard = document.createElement('div');
  taskCard.className = 'task-card';

  var task = document.createElement('div');
  task.className = 'task';

  var taskDescription = document.createElement('h3');
  taskDescription.className = 'task-description';
  var projectName = document.createElement('p');
  projectName.className = 'project-name';

  if (taskArg === '') {
    taskDescription.textContent = 'No title';
  } else {
    taskDescription.textContent = taskArg;
  }

  projectName.textContent = 'JavaScript Project';

  var time = document.createElement('div');
  time.className = 'time';

  time.textContent = timeArg; //

  task.appendChild(taskDescription);
  task.appendChild(projectName);

  taskCard.appendChild(task);
  taskCard.appendChild(time);

  tasks.appendChild(taskCard);

  main.appendChild(tasks);

  tasksObj.task = taskDescription.textContent;
  tasksObj.time = time.textContent;
}
