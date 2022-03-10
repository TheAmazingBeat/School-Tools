let limit = $('#limit').val();
let limitType = $('#limitSelect').val();

// function checkLimit(length, limit) {
// 	return length >= limit;
// }

function changeColor(selector, color) {
	$(selector).css('color', `${color}`);
}

function check() {
	if (limitType == 'Character') {
		if ($('textarea').prop('textLength') >= limit) {
			changeColor('[data-char-count]', 'red');
			return true;
		} else {
			changeColor('[data-char-count]', 'white');
			return false;
		}
	} else if (limitType == 'Word') {
		if ($('textarea').val().trim().split(' ').length >= limit) {
			changeColor('[data-word-count]', 'red');
			return true;
		} else {
			changeColor('[data-word-count]', 'white');
			return false;
		}
	}
}

$('#limitSelect').on('change', (e) => {
	limitType = $(e.currentTarget).val();

	check();

	console.log(`${limitType} limit = ${limit}`);
});

$('textarea').on('keyup', (e) => {
	const charLength = $('textarea').prop('textLength');
	$('[data-char-count]').html(charLength);

	check();

	if (e.code == 'Space' || e.code == 'Backspace') {
		const words = $('textarea').val().trim().split(' ');
		let wordLength = words.length;
		if (words[0] == '') wordLength = 0;
		$('[data-word-count]').html(wordLength);

		check();
	}
});

$('#limit').on('change', () => {
	// const charLength = $('textarea').prop('textLength');

	limit = $('#limit').val();
	if (limit < 0) {
		limit = 0;
		$('#limit').val('0');
	}

	check();

	console.log(`${limitType} limit = ${limit}`);
});
