let charLimit = $('#charLimit').val();

$('textarea').on('keyup', () => {
	let length = $('textarea').prop('textLength');
	$('[data-char-count]').html(length);

	length >= charLimit
		? $('[data-char-count]').css('color', 'red')
		: $('[data-char-count]').css('color', 'white');
});

$('#charLimit').change(() => {
	let length = $('textarea').prop('textLength');

	charLimit = $('#charLimit').val();
	if (charLimit < 0) {
		charLimit = 0;
		$('#charLimit').val('0');
	}

	length >= charLimit
		? $('[data-char-count]').css('color', 'red')
		: $('[data-char-count]').css('color', 'white');
});
