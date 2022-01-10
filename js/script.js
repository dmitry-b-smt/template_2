"use strict"

const isMobile = {
	Android: function () {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function () {
		return navigator.userAgent.match(/Blackberry/i);
	},
	iOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function () {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function () {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function () {
		return (
			isMobile.Android() ||
			isMobile.BlackBerry() ||
			isMobile.iOS() ||
			isMobile.Opera() ||
			isMobile.Windows());
	}
};

if (isMobile.any()) {
	document.body.classList.add('_mobile');
} else {
	document.body.classList.add('_desktop');
};

const burgerButton = document.querySelector('.burger__button');
const burgerMenu = document.querySelector('.burger__list-wrapper');
const burgerCloseButton = document.querySelector('.burger__close-button');
burgerButton.addEventListener("click", function (e) {
	e.stopPropagation();
	burgerMenu.classList.add('defader');
	burgerMenu.classList.toggle('unactive');
	burgerMenu.classList.toggle('fader');
	burgerMenu.classList.toggle('defader');
});

document.body.addEventListener('click', function (e) {
	e.stopPropagation();
	let target = e.target;
	let menuField = target.classList.contains('burger__list-wrapper');
	if (menuField !== true) {
		burgerMenu.classList.add('unactive');
	}
	// console.log(target);
});

// выбираем все элементы ленты слайдера
const sliderTape = document.querySelectorAll('.slider__row');
// определеяем длину слайдера
const sliderTapeLength = sliderTape.length;

// присваиваем каждому элементу слайдера датасет-атрибут data-index, 
// который будет использоваться в качестве индентификатора элемента
sliderTape.forEach(function (item, i, sliderTape) {
	let dataIndex = i;
	item.setAttribute("data-index", dataIndex);
});

// задаём переменную, которая будет соответствовать активному слайду
let current = 0;

function getActiveSlide(current) {
	for (let item of sliderTape) {
		if (Number(item.dataset.index) == current) {
			item.classList.remove('hider');
			item.classList.add('sider');
		} else {
			item.classList.add('hider');
			item.classList.remove('sider');
		};
	};
};
getActiveSlide(current);


// получаем кнопки управления слайдером
const sliderButtonRight = document.querySelector('.slider__button-right');
const sliderButtonLeft = document.querySelector('.slider__button-left');

// вешаем отслеживание событий клика на правую кнопку
sliderButtonRight.addEventListener('click', function (e) {
	clearTimeout(timerId);
	if (current >= sliderTapeLength - 1) {
		current = 0;
	} else {
		current += 1;
	};
	getActiveSlide(current);
});

// вешаем отслеживание событий клика на левую кнопку
sliderButtonLeft.addEventListener('click', function (e) {
	clearTimeout(timerId);
	if (current <= 0) {
		current = sliderTapeLength - 1;
	} else {
		current -= 1;
	};
	getActiveSlide(current);
});

let timerId = setTimeout(function slideRight() {
	console.log(current);
	getActiveSlide(current);
	if (current >= sliderTapeLength - 1) {
		current = 0;
	} else {
		current += 1;
	};
	timerId = setTimeout(slideRight, 7000);
}, current);
