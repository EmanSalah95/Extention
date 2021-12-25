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

function timerFunc() {
  var sec = 0;
  var min = 0;
  var hr = 0;

  timer = setInterval(function () {
    startBtn.innerText = `${min}:${sec}`;
    if (sec == 60) {
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
  }, 1000);
}

// var totalTime = document.getElementById('time');
var date;
var inputValue;
var main = document.getElementById('main');

function addTimeToDOM() {
  if (!main.children[0]) {
    var dateHeader = document.createElement('div');
    dateHeader.className = 'date-header';

    var dateDiv = document.createElement('div');
    dateDiv.id = 'date';

    var d = new Date();
    dateDiv.textContent = d.toDateString();

    var timeDiv = document.createElement('div'); // Total time
    timeDiv.id = 'time';

    timeDiv.innerHTML = `<span>Total: </span> 00:00:00`;

    dateHeader.appendChild(dateDiv);
    dateHeader.appendChild(timeDiv);

    main.appendChild(dateHeader);
  }

  var tasks = document.createElement('div');

  var taskCard = document.createElement('div');
  taskCard.className = 'task-card';

  var task = document.createElement('div');
  task.className = 'task';

  var taskDescription = document.createElement('h3');
  taskDescription.className = 'task-description';
  var projectName = document.createElement('p');
  projectName.className = 'project-name';

  if (input.value === '') {
    taskDescription.textContent = 'No title';
  } else {
    taskDescription.textContent = input.value;
  }
  projectName.textContent = 'JavaScript Project';

  var time = document.createElement('div');
  time.className = 'time';

  time.textContent = stopAt;

  task.appendChild(taskDescription);
  task.appendChild(projectName);

  taskCard.appendChild(task);
  taskCard.appendChild(time);

  tasks.appendChild(taskCard);

  main.appendChild(tasks);
}
