$(document).ready(function () {
  $(".acordion .acordion-item:first-child .acordion-body").slideToggle(300);
  $('.acordion-button').click(function (event) {
      if ($('.acordion').hasClass('main-acordion')) {
          $('.acordion-button').not($(this)).removeClass('active');
          $('.acordion-body').not($(this).next()).slideUp(300);
      }
      $(this).toggleClass('active').next().slideToggle(300);
  });
});

//mobile-menu-dropdown
$('.mobile-nav').on('click', 'button', function () {
  var element = $(this);
  element.toggleClass('toggled');
  element.closest('.mobile-nav ul li button').next('.mobile-nav ul li ul').slideToggle();
})

//main-nav
$(window).on('scroll', function () {
  if ($(window).scrollTop() > 30) {
    $(".main-nav").css({ top: '0' });
    $(".main-nav").css({ 'box-shadow': 'rgb(0 0 0 / 20%) -2px 0px 14px 0px' });
  } else {
    $(".main-nav").css({ top: '60px' });
    $(".main-nav").css({ 'box-shadow': 'unset' });
  }
});

//scroll-to-top
$(window).on('scroll', function () {
  if ($(window).scrollTop() > 300) {
    $(".go-up").css({ display: 'block' })
  } else {
    $(".go-up").css({ display: 'none' })
  }
});
$(".go-up").on("click", function () {
  $('html, body').animate({
    scrollTop: 0
  }, 600);
});

var count = 0;
$(document).on('scroll', function () {
    if (count == 0 && $(window).scrollTop() >= ($('.counter-box .value').offset().top - window.innerHeight)) {
        $(".counter-box .value").each(function () {
            var $this = $(this),
                countTo = $this.attr("data-count");
            $({
                countNum: $this.text()
            }).animate({
                countNum: countTo,
            }, {
                duration: 3000,
                easing: "linear",
                step: function () {
                    $this.text(Math.floor(this.countNum));
                },
                complete: function () {
                    $this.text(this.countNum);
                },
            });
        });
        count = 1;
    }
});