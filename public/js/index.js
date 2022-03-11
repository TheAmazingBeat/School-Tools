$('.light-btn').click(() => {
  // $('body').removeClass('dark');
  // $('body').addClass('light');
  // $('.navbar').removeClass('dark');
  // $('.navbar').addClass('light');
  Array.from($('.dark')).forEach((element) => {
    $(element).addClass('light');
    $(element).removeClass('dark');
  });
});

$('.dark-btn').click(() => {
  // $('body').removeClass('light');
  // $('body').addClass('dark');
  // $('.navbar').removeClass('light');
  // $('.navbar').addClass('dark');
  Array.from($('.light')).forEach((element) => {
    $(element).addClass('dark');
    $(element).removeClass('light');
  });
});
