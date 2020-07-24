'use strict';

{
  const timer = document.getElementById('timer');
  const start = document.getElementById('start');
  // const stop = document.getElementById('stop');
  const reset = document.getElementById('reset');

  let startTime;
  let timeoutId;
  let elapsedTime = 0;

  function countUp() {
    // console.log(Date.now() - startTime);
    const d = new Date(Date.now() - startTime + elapsedTime);
    const m = String(d.getMinutes()).padStart(2, '0');
    const s = String(d.getSeconds()).padStart(2, '0');
    const ms = String(d.getMilliseconds()).padStart(3, '0');
    timer.textContent = `${m}:${s}.${ms}`;

    timeoutId = setTimeout(() => {
      countUp();
    }, 10);
  }

  function setButtonStateInitial() {
		start.classList.remove('inactive');
		start.classList.remove('stop');
		start.innerText = 'Start';
    // stop.classList.add('inactive');
    // reset.classList.add('inactive');
  };
  function setButtonStateRunning() {
		start.classList.add('stop');
		start.innerText = 'Stop';
    // stop.classList.remove('inactive');
		// reset.classList.add('inactive');
  };
  function setButtonStateStopped() {
    start.classList.remove('stop');
		start.innerText = 'Start';
    // stop.classList.add('stop');
    // reset.classList.remove('stop');
  };

  setButtonStateInitial();

  start.addEventListener('click', () => {
    if(start.classList.contains('stop') === true) {
      clearTimeout(timeoutId);
      elapsedTime += Date.now() - startTime;

      setButtonStateStopped();
    } else {
      setButtonStateRunning();
      startTime = Date.now();
      countUp();
    }
  });

  reset.addEventListener('click', () => {
    if(reset.classList.contains('inactive') === true) {
      return;
		}
		console.log('aaa');
		clearTimeout(timeoutId);
    timer.textContent = '00:00.000';
    elapsedTime = 0;

    setButtonStateInitial();
  });
}

// TODO: todoタスク
// FIXME: バグ修正 / リファクタリング（少しおかしい所）