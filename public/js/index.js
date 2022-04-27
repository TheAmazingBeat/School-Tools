import { getFromLocalStorage, storeToLocalStorage } from './UsefulFunks.js';
let theme;

if (getFromLocalStorage('theme') == null) {
	theme = 'dark';
	storeToLocalStorage('theme', theme);
} else theme = getFromLocalStorage('theme');

const themeElements = Array.from($('[data-theme]'));
console.debug(themeElements);
themeElements.forEach((element) => {
	$(element).addClass(theme);
	element.theme = theme;
});

$('.menu-btn').on('click', () => {
	expand();
});

$('.nav-overlay').on('click', expand);

function expand() {
	$('.main-navbar').toggleClass('expanded');
	$('main').toggleClass('expanded');
	$('.nav-overlay').toggleClass('expanded-overlay');

	if ($('.expanded').length > 0) {
		$('.light-btn')
			.css('display', 'flex')
			.css('width', '7rem !important')
			.css('opacity', '1 !important');
		$('.dark-btn')
			.css('display', 'flex')
			.css('width', '7rem !important')
			.css('opacity', '1 !important');
		$('.light-btn').on('click', light);
		$('.dark-btn').on('click', dark);
	}
}

$('.light-btn').on('click', light);
$('.dark-btn').on('click', dark);

function light() {
	// console.log('light clicked');
	if ($('.expanded').length == 0) {
		// Switch Theme when navbar is not expanded
		$('.light-btn').css('display', 'none');
		$('.dark-btn').css('display', 'flex');
		Array.from($('.light')).forEach((element) => {
			$(element).addClass('dark');
			$(element).removeClass('light');
			element.theme = theme;
		});
		theme = 'dark';
		storeToLocalStorage('theme', theme);
		console.debug(`Set theme: ${theme}`);
	} else {
		// Switch Theme when navbar is expanded
		Array.from($('.dark')).forEach((element) => {
			$(element).addClass('light');
			$(element).removeClass('dark');
			element.theme = theme;
		});
		theme = 'light';
		storeToLocalStorage('theme', theme);
		console.debug(`Set theme: ${theme}`);
	}
}

function dark() {
	// console.log('dark clicked');
	if ($('.expanded').length == 0) {
		// Switch Theme when navbar is not expanded
		$('.dark-btn').css('display', 'none');
		$('.light-btn').css('display', 'flex');
		// console.log(Array.from($('.dark')));
		// console.log(Array.from($('[data-theme]')));
		Array.from($('.dark')).forEach((element) => {
			$(element).addClass('light');
			$(element).removeClass('dark');
			element.theme = theme;
		});
		theme = 'light';
		storeToLocalStorage('theme', theme);
		console.debug(`Set theme: ${theme}`);
	} else {
		// Switch Theme when navbar is expanded
		Array.from($('.light')).forEach((element) => {
			$(element).addClass('dark');
			$(element).removeClass('light');
			element.theme = theme;
		});
		theme = 'dark';
		storeToLocalStorage('theme', theme);
		console.debug(`Set theme: ${theme}`);
	}
}
