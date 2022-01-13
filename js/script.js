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
	// console.log(current);
	getActiveSlide(current);
	if (current >= sliderTapeLength - 1) {
		current = 0;
	} else {
		current += 1;
	};
	timerId = setTimeout(slideRight, 7000);
}, current);

// const descriptionPoints = document.querySelector('.description__text').getElementsByTagName('p');

// for (let item of descriptionPoints) {
// 	item.classList.add('description__text-item');
// };

const descriptionTexts = document.querySelectorAll('.description__text');

descriptionTexts.forEach(function (item) {
	let descriptionPoints = item.getElementsByTagName('p');
	for (let descriptionPoint of descriptionPoints) {
		descriptionPoint.classList.add('description__text-item');
	}
});

const tabs = document.querySelectorAll('.benefits__tab');
console.log(tabs);

const descriptions = document.querySelectorAll('.benefits__description');
console.log(descriptions);

tabs.forEach(function (item, i, tabs) {
	let tabIndex = i;
	item.setAttribute("data-tabindex", tabIndex);
});

descriptions.forEach(function (item, i, descriptions) {
	let descriptionIndex = i;
	item.setAttribute("data-descriptionindex", descriptionIndex);
});

const tabsContainer = document.querySelector('.benefits__tabs-container');
tabsContainer.addEventListener('click', function (e) {
	let selectedTab = document.querySelector('.benefits__tab-selected');
	let target = e.target;
	let tabIndex = target.dataset.tabindex;
	descriptions.forEach(function (item) {
		if (tabIndex === item.dataset.descriptionindex && item.classList.contains('hider') === true) {
			item.classList.remove('hider');
			item.classList.toggle('fader');
			selectedTab.classList.remove('benefits__tab-selected');
			target.classList.add('benefits__tab-selected');
		};

		if (tabIndex !== item.dataset.descriptionindex && item.classList.contains('hider') === false) {
			item.classList.add('hider');
		};
	})
});

// spoilers
const spoilers = document.querySelectorAll('.spoiler__row-body');
const controls = document.querySelectorAll('.spoiler__control');
const expanders = document.querySelectorAll('.spoiler__expander');
const minimizers = document.querySelectorAll('.spoiler__minimizer');

spoilers.forEach(function (item, i, spoilers) {
	let id = i;
	item.setAttribute("data-id", id);
});

controls.forEach(function (item, i, spoilers) {
	let id = i;
	item.setAttribute("data-id", id);
});

expanders.forEach(function (item, i, expanders) {
	let id = i;
	item.setAttribute("data-id", id);
});

minimizers.forEach(function (item, i, minimizers) {
	let id = i;
	item.setAttribute("data-id", id);
});

const spoilersContainer = document.querySelector('.services__spoilers');

controls.forEach(function (item, i, controls) {
	item.addEventListener('click', function (e) {
		let target = e.target;
		let id = target.dataset.id;
		spoilers.forEach(function (item) {
			if (id === item.dataset.id) {
				item.classList.toggle('hider');
				expanders.forEach(function (item) {
					if (id === item.dataset.id) {
						item.classList.toggle('hider');
					};
				});
				minimizers.forEach(function (item) {
					if (id === item.dataset.id) {
						item.classList.toggle('hider');
					};
				});
			};
		});

	})
})

const testimonials = document.querySelectorAll('.testimonial');
const testimonialsLength = testimonials.length;

testimonials.forEach(function (item, i) {
	let dataIndex = i;
	item.setAttribute("data-index", dataIndex);
});

let currentTestimonial = 0;

function getActiveTestimonial(currentTestimonial) {
	for (let item of testimonials) {
		if (Number(item.dataset.index) == currentTestimonial) {
			item.classList.remove('hider');
		} else {
			item.classList.add('hider');
		};
	};
};

getActiveTestimonial(currentTestimonial);

const testimonialNext = document.querySelector('.testimonials__button-left');
const testimonialPrev = document.querySelector('.testimonials__button-right');

testimonialNext.addEventListener('click', function (e) {
	if (currentTestimonial >= testimonialsLength - 1) {
		currentTestimonial = 0;
	} else {
		currentTestimonial += 1;
	};
	getActiveTestimonial(currentTestimonial);
});

testimonialPrev.addEventListener('click', function (e) {
	if (currentTestimonial <= 0) {
		currentTestimonial = testimonialsLength - 1;
	} else {
		currentTestimonial -= 1;
	};
	getActiveTestimonial(currentTestimonial);
});

const inputFields = document.querySelectorAll('.form__input');

inputFields.forEach(function(item) {
	let placeholder = item.placeholder;
	item.addEventListener('focus', function () {
		item.placeholder = "";
	});
	item.addEventListener('blur', function() {
		item.placeholder = placeholder;
	});
});