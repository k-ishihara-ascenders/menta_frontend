'use strict';

{
	const images = [
		'img/pic00.png',
		'img/pic01.png',
		'img/pic02.png',
		'img/pic03.png',
		'img/pic04.png',
		'img/pic05.png',
		'img/pic06.png',
		'img/pic07.png'
	];
	let currentIndex = 0;
	let thumnails = [];


	const mainImage = document.getElementById('main');
	mainImage.src = images[currentIndex];

	images.forEach((image, index) => {
		const img = document.createElement('img');
		img.src = image;
		const li = document.createElement('li');
		if(index === currentIndex) {
			li.classList.add('current');
		}
		li.addEventListener('click', () => {
			mainImage.src = image;
			thumnails[currentIndex].classList.remove('current');
			currentIndex = index;
			thumnails[currentIndex].classList.add('current');
		});

		li.appendChild(img);
		document.querySelector('.thumnails').appendChild(li);

		if(images.length - 1 === index) {
			thumnails = document.querySelectorAll('.thumnails > li');
		}
	});

	const next = document.getElementById('next');
	next.addEventListener('click', () => {
		let target = currentIndex + 1;
		if(target === images.length) {
			target = 0;
		}
		document.querySelectorAll('.thumnails > li')[target].click();
	});

	const prev = document.getElementById('prev');
	prev.addEventListener('click', () => {
		let target = currentIndex - 1;
		if(target === -1) {
			target = images.length -1;
		}
		document.querySelectorAll('.thumnails > li')[target].click();
	});

	let timeoutId;

	// function playSlideshow() {
	// 	timeoutId = setTimeout(() => {
	// 		next.click();
	// 		playSlideshow();
	// 	}, 1000);
	// }

	function playSlideshow() {
		timeoutId = setTimeout(() => {
			thumnails[currentIndex].classList.remove('current');
			let randomIndex = Math.floor(Math.random() * images.length);
			if(currentIndex === randomIndex) {
				randomIndex = Math.floor(Math.random() * images.length);
			}
			mainImage.src = images[randomIndex];
			currentIndex = randomIndex;
			thumnails[currentIndex].classList.add('current');

			playSlideshow();
		}, 1000);
	}

	let isPlaying = false;

	const play = document.getElementById('play');
	play.addEventListener('click', () => {
		if(isPlaying === false) {
			playSlideshow();
			play.textContent = 'Pause';
		} else {
			clearTimeout(timeoutId);
			play.textContent = 'Play';
		}
		isPlaying = !isPlaying;
	});

}