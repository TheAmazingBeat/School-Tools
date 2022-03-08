let charLimit = $('#charLimit').val();

$('textarea').on('keyup', (e) => {
	const charLength = $('textarea').prop('textLength');
	$('[data-char-count]').html(charLength);

	charLength >= charLimit
		? $('[data-char-count]').css('color', 'red')
		: $('[data-char-count]').css('color', 'white');

	if (e.code == 'Space' || e.code == 'Backspace') {
		const words = $('textarea').val().trim().split(' ');
		let wordLength = words.length;
		if (words[0] == '') wordLength = 0;
		$('[data-word-count]').html(wordLength);
	}
});

$('#charLimit').on('change', () => {
	let charLength = $('textarea').prop('textLength');

	charLimit = $('#charLimit').val();
	if (charLimit < 0) {
		charLimit = 0;
		$('#charLimit').val('0');
	}

	charLength >= charLimit
		? $('[data-char-count]').css('color', 'red')
		: $('[data-char-count]').css('color', 'white');
});
