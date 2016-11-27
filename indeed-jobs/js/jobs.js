$(document).ready(function() {

  $('#jobviteframe').css('display','block');

  var nav = responsiveNav(".nav-collapse");

  var headerPos = $('.hero').offset().top;
  $('body').scrollspy();

  $(window).scroll(function(){
    if( $(window).scrollTop() > headerPos)
      $('.header').addClass('has-bottom-border');
    else
      $('.header').removeClass('has-bottom-border');
  });

  // office location filter
  if($('.office-location-list').length) {
    $('.office-location-list').mixitup({
      targetSelector: '.office-item',
      effects: ['fade'],
      easing: 'cubic-bezier(0.075, 0.82, 0.165, 1)',
      transitionSpeed: 800
    });
  }

  getCurrYear();
  updateImgs();
});

function getCurrYear() {
  var thisYear = new Date().getFullYear();
  $('.copyright-year').text(thisYear);
}

function updateImgs(pageId) {

    // load later images after hero
    var $images = $('img[data-src]');

    $images.each(function() {
      $(this).css('display','block');
      $(this).attr('src', $(this).attr('data-src'));
    });
}

function toggleNav() {
  $('.nav ul').slideToggle();
}

//handle page position when hitting back button
$(window).on('hashchange', function() {
  window.location.href = location.hash;
});

// preload images
function initializePreload(p) {
  var w = 0;
  var windowWidth = $(window).width();
  if (windowWidth >= 500 && windowWidth < 640) {
    w = 640;
  }
  else if (windowWidth > 640 && windowWidth <= 768) {
    w = 768;
  }
  else if (windowWidth > 768 && windowWidth <= 960) {
    w = 960;
  }
  else if (windowWidth > 960 && windowWidth <= 1024) {
    w = 1024;
  }
  else if (windowWidth > 1024 && windowWidth <= 1366) {
    w = 1366;
  }
  else if (windowWidth > 1366) {
    w = 1920;
  }
  else {
    w = 500;
  }

  if (p == 'index') {
    $.preloadImages(
      '../imgs/austin-' + w + '.jpg',
      '../imgs/client-services-' + w + '.jpg',
      '../imgs/sales-' + w + '.jpg',
      '../imgs/human-resources-' + w + '.jpg',
      '../imgs/marketing-' + w + '.jpg',
      '../imgs/engineering-' + w + '.jpg'
    );
  }
  else {
    $.preloadImages(
      '../imgs/home-' + w + '.jpg',
      '../imgs/departments-' + w + '.jpg'
    );
  }
}

// image preloader
$.preloadImages = function() {
  for (var i = 0; i < arguments.length; i++) {
    $("<img />").attr("src", arguments[i]);
  }
}