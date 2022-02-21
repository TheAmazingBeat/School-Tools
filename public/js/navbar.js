let expanded = false;
let largeViewport = window.innerWidth >= 600 ? true : false;

$('button.nav-link').click(() => {
	if (largeViewport) {
		if (!expanded) {
			$('.navbar').css('width', '16rem');
			$('.nav-item').css('width', '16rem');
			$('.link-text').css('display', 'block');
			$('.link-text')
				.css('display', 'inline')
				.css('transition', 'opacity var(--transition-speed)');
			$('.logo svg').css('transform', 'rotate(180deg)');
			expanded = true;
		} else {
			$('.navbar').css('width', '5rem');
			$('.nav-item').css('width', '5rem');
			$('.link-text').css('display', 'none');
			$('.logo svg').css('transform', 'rotate(0deg)');
			expanded = false;
		}
	} else {
		if (!expanded) {
			$('.logo').css('top', '75vh');
			$('.logo svg').css('transform', 'rotate(-90deg)');
			$('.navbar').css('height', '75vh');
			$('.nav-item').css('display', 'block');
			$('.link-text').css('display', 'block');
			$('.link-text')
				.css('display', 'inline')
				.css('transition', 'opacity var(--transition-speed)');
			$('.logo>.nav-link>.link-text').css('display', 'none');
			expanded = true;
		} else {
			$('.logo').css('top', '0vh');
			$('.logo svg').css('transform', 'rotate(90deg)');
			$('.navbar').css('height', '0');
			$('.nav-item').css('display', 'none');
			$('.nav-item.logo').css('display', 'block');
			$('.link-text').css('display', 'none');
			expanded = false;
		}
	}
});
