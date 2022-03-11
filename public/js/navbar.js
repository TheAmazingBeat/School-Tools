let expanded = false;
let largeViewport = window.innerWidth >= 600 ? true : false;
let activePage = '';

function renderNavbar() {
  const logo = $(
    '<li class="nav-item logo"><button class="nav-link"><span class="link-text">School Tools</span><i class="fas fa-bars fa-2x"></i></button></li>'
  );
  const home = $(
    '<li class="nav-item"><a href="/" id="homeLink" class="nav-link" title="Home"><i class="fas fa-home fa-2x"></i><span class="link-text">Home</span></a></li>"'
  );
  const prioritizer = $(
    '<li class="nav-item"><a href="prioritizer" id="prioritizerLink" class="nav-link" title="Prioritizer"><i class="fas fa-calendar-check fa-2x"></i><span class="link-text">Prioritizer</span></a></li>"'
  );
  const calculator = $(
    '<li class="nav-item"><a href="calculator" id="calcLink" class="nav-link" title="Calculator"><i class="fas fa-calculator fa-2x"></i><span class="link-text">Calculator</span></a></li>"'
  );
  const planner = $(
    '<li class="nav-item"><a href="planner" id="plannerLink" class="nav-link" title="Planner"><i class="fas fa-calendar-alt fa-2x"></i><span class="link-text">Planner</span></a></li>"'
  );
  const essay = $(
    '<li class="nav-item"><a href="essay-counter" id="essayLink" class="nav-link" title="Essay Counter"><i class="fas fa-file fa-2x"></i><span class="link-text">Essay Counter</span></a></li>"'
  );
  const theme = $(
    '<li class="nav-item"><a class="nav-link" title="Switch Theme"><i class="fas fa-adjust fa-2x"></i><span class="link-text">Theme</span></a></li>"'
  );
  const ul = $('<ul class="navbar-nav"></ul>').append(
    logo,
    home,
    prioritizer,
    calculator,
    planner,
    essay,
    theme
  );

  return ul;
}

$('nav.navbar').append(renderNavbar());

switch (document.title) {
  case 'School Tools':
    $('#homeLink').addClass('active');
    break;
  case 'Prioritizer - School Tools':
    $('#prioritizerLink').addClass('active');
    break;
  case 'Calculator - School Tools':
    $('#calcLink').addClass('active');
    break;
  case 'Planner - School Tools':
    $('#plannerLink').addClass('active');
    break;
  case 'Essay Counter - School Tools':
    $('#essayLink').addClass('active');
    break;
  default:
    break;
}

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
