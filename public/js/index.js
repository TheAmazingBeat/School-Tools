$('.menu-btn').click(() => {
  expand();
});

$('.nav-overlay').click(() => {
  expand();
});

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
  }
}

$('.light-btn').click(() => {
  if ($('.expanded').length == 0) {
    // Switch Theme when navbar is not expanded
    $('.light-btn').css('display', 'none');
    $('.dark-btn').css('display', 'flex');
    Array.from($('.light')).forEach((element) => {
      $(element).addClass('dark');
      $(element).removeClass('light');
    });
  } else {
    // Switch Theme when navbar is expanded
    // $('.dark-btn').css('display', 'none');
    // $('.light-btn').css('display', 'flex');
    Array.from($('.dark')).forEach((element) => {
      $(element).addClass('light');
      $(element).removeClass('dark');
    });
  }
});

$('.dark-btn').click(() => {
  if ($('.expanded').length == 0) {
    // Switch Theme when navbar is not expanded
    $('.dark-btn').css('display', 'none');
    $('.light-btn').css('display', 'flex');
    Array.from($('.dark')).forEach((element) => {
      $(element).addClass('light');
      $(element).removeClass('dark');
    });
  } else {
    // Switch Theme when navbar is expanded
    // $('.light-btn').css('display', 'none');
    // $('.dark-btn').css('display', 'flex');
    Array.from($('.light')).forEach((element) => {
      $(element).addClass('dark');
      $(element).removeClass('light');
    });
  }
});
