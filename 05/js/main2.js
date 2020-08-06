'use strict';

{
  const question = document.getElementById('question');
  const choices = document.getElementById('choices');
  const btn = document.getElementById('btn');
  const result = document.getElementById('result');
  const scoreLabel = document.querySelector('#result > p');

  const quizSet = shuffle([
    {q: '世界で一番大きな湖は？', c: ['カスピ海', 'カリブ海', '琵琶湖']},
    {q: '2の8乗は?', c: ['256', '16', '64']},
    {q: '次のうち、最初にリリースされた言語は?', c: ['Python', 'Javascript', 'HTML']}
  ]);

  let currentNum = 0;
  let isAnswerd;
	let score = 0;
	const timeLimit = 10 * 1000;
	let startTime;
	let isPlaying = false;

	const timerLabel = document.getElementById('timer');

	function updateTimer() {
    const timeLeft = startTime + timeLimit - Date.now();
    timerLabel.textContent = (timeLeft / 1000).toFixed(2);

    const timeoutId = setTimeout(() => {
      updateTimer();
    }, 10);

    if(timeLeft < 0) {
      clearTimeout(timeoutId);
			timerLabel.textContent = '0.00';

			scoreLabel.textContent = `Score: ${score} / ${quizSet.length}`;
			result.classList.remove('hidden');
		}
	}


  function shuffle(arr) {
    for(let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i+1));
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
  }

  function checkAnswer(li) {
    // if(isAnswerd === true) {
    if(isAnswerd) {
        return;
    }
    isAnswerd = true;
    if(li.textContent === quizSet[currentNum].c[0]) {
      li.classList.add('correct');
      score++;
    } else {
      li.classList.add('wrong');
    }

    btn.classList.remove('disabled');
  }

  function setQuiz() {
    isAnswerd = false;
    question.textContent = quizSet[currentNum].q;

    while(choices.firstChild) {
      choices.removeChild(choices.firstChild);
    }

    const shuffledChoices = shuffle([...quizSet[currentNum].c]);
    shuffledChoices.forEach(choice => {
      const li = document.createElement('li');
      li.textContent = choice;
      li.addEventListener('click', () => {
        checkAnswer(li);
      });
      choices.appendChild(li);
    });

    if(currentNum === quizSet.length -1) {
      btn.textContent = 'Show Score';
		}
  }

	startTime = Date.now();
	updateTimer();
  setQuiz();

  btn.addEventListener('click', () => {
    if(btn.classList.contains('disabled')) {
      return;
    }
    btn.classList.add('disabled');

    if(currentNum === quizSet.length - 1) {
      scoreLabel.textContent = `Score: ${score} / ${quizSet.length}`;
      result.classList.remove('hidden');
    } else {
      currentNum++;
      setQuiz();
    }
  });

}
