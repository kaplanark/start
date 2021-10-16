//global-scopes
$('img').on('dragstart', function(event) { event.preventDefault(); });//Bu fonksiyon ile sitedeki tüm görseller sürüklenemez hale gelir

//counter-statistic
var count= 0;
$(document).on('scroll',function () { 
  if (count==0 && $(window).scrollTop() >= ($('.counting').offset().top - window.innerHeight)){
    $(".counting").each(function () {
      var $this = $(this),
        countTo = $this.attr("data-count");
    
      $({ countNum: $this.text() }).animate(
        {
          countNum: countTo,
        },
        {
          duration: 3000,
          easing: "linear",
          step: function () {
            $this.text(Math.floor(this.countNum));
          },
          complete: function () {
            $this.text(this.countNum);
          },
        }
      );
    });
    count =1;
  }
});

//mobile-menu-dropdown
$('#mobileMenüModal .menu').on('click', '.drop-down', function () {
  var el = $(this);
  el.toggleClass('toggled');
});

//main-nav
$(window).scroll(function () {
  if ($(window).scrollTop() > 30) {
    $(".main-nav").css({ top: '0' });
    $(".main-nav").css({ 'box-shadow': 'rgb(0 0 0 / 20%) -2px 0px 14px 0px' });
  } else {
    $(".main-nav").css({ top: '60px' });
    $(".main-nav").css({ 'box-shadow': 'unset' });
  }
});

//scroll-to-top
$(window).scroll(function() {
  if ($(window).scrollTop() > 300) {
    $("#toTopBtn").css({display:'block'})
  } else {
    $("#toTopBtn").css({display:'none'})
  }
});
$("#toTopBtn").on("click", function() {
  $('html, body').animate({
     scrollTop: 0
  }, 600);
 });

 //isotope
 $(document).ready(function() {
  var $doctors = $(".tabcontent").isotope({
      itemSelector: ".doctor-card",
      layoutMode: "fitRows",
  });
  $(".filter-btn").click(function() {
      var data_filter = $(this).attr("data-filter");
      $doctors.isotope({
          filter: data_filter,
      });
      $(".filter-btn").removeClass("active");
      $(this).addClass("active");
      return false;
  });
});
