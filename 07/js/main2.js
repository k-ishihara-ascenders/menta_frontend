'use strict';

{
	const showScore = document.getElementById('show-result');
	let count = 5;
	let score = 0;

	class Panel {
		constructor() {
			const section = document.createElement('section');
			section.classList.add('panel');

			this.img = document.createElement('img');
			this.imgEl = this.getRandomImage();
			this.img.src = this.imgEl.src;

			this.timeoutId = undefined;

			this.stop = document.createElement('div');
			this.stop.textContent = 'STOP';
			this.stop.classList.add('stop', 'inactive');
			this.stop.addEventListener('click', () => {
				if(this.stop.classList.contains('inactive')) {
					return;
				}
				this.stop.classList.add('inactive');
				clearTimeout(this.timeoutId);
				panelsLeft--;

				if(panelsLeft === 0) {
					spin.classList.remove('inactive');
					panelsLeft = 3;
					checkResult();
					count--;
					if(count === 0){
						showResult();
					}
				}
			});

			section.appendChild(this.img);
			section.appendChild(this.stop);

			const main = document.querySelector('main');
			main.appendChild(section);
		}

		getRandomImage() {
			const images = [
				{src: 'img/seven.png', point: 7},
				{src: 'img/bell.png', point: 3},
				{src: 'img/cherry.png', point: 1}
			];
			return images[Math.floor(Math.random() * images.length)];
		}

		spin() {
			this.imgEl = this.getRandomImage();
			this.img.src = this.imgEl.src;

			this.timeoutId = setTimeout(() => {
				this.spin();
			}, 50);
		}

		isMatched(p1, p2) {
			return this.img.src === p1.img.src && this.img.src === p2.img.src;
		}

		isUnmatched(p1, p2) {
			// if(this.img.src !== p1.img.src && this.img.src !== p2.img.src) {
			// 	return true;
			// } else {
			// 	return false;
			// }
			return this.img.src !== p1.img.src && this.img.src !== p2.img.src;
		}

		unmatch() {
			this.img.classList.add('unmatched');
		}

		activate() {
			this.img.classList.remove('unmatched');
			this.stop.classList.remove('inactive');
		}
	}

	function checkResult() {
		if(panels[0].isMatched(panels[1], panels[2])) {
			score += panels[0].imgEl.point;
		}
		if(panels[0].isUnmatched(panels[1], panels[2])) {
			panels[0].unmatch();
		}
		if(panels[1].isUnmatched(panels[0], panels[2])) {
			panels[1].unmatch();
		}
		if(panels[2].isUnmatched(panels[0], panels[1])) {
			panels[2].unmatch();
		}
	}

	const panels = [
		new Panel(),
		new Panel(),
		new Panel()
	];

	let panelsLeft = 3;

	const spin = document.getElementById('spin');

	spin.addEventListener('click', () => {
		if(count === 5) {
			showScore.classList.add('hide');
			score = 0;
		}
		if(spin.classList.contains('inactive')) {
			return;
		}
		spin.classList.add('inactive');
		panels.forEach(panel => {
			panel.activate();
			panel.spin();
		});
	});

	function showResult() {
		showScore.textContent = `あなたの得点は${score}点です。`;
		showScore.classList.remove('hide');
		count = 5;
	}
}