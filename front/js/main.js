//global scopes
$('img').on('dragstart', function(event) { event.preventDefault(); });

//counter statistic
$(document).on('scroll',function () {  
  if ($(window).scrollTop() >= ($(document).height() - $(document).height()/2 - 200)){
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
  }
});

//side menu dropdown
function dropDown() {
  var x = document.querySelector(".menu-drop-content");
  if (x.style.display === "block"){
    x.style.display = "none"; 
  } else {
    x.style.display = "block";
  }
}

//navbar
window.onscroll = function () {
  scrollFunction();
};
var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;
function scrollFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky");
    document.querySelector(".navbar-header").style.display='block';
  } else {
    navbar.classList.remove("sticky");
    document.querySelector(".navbar-header").style.display='none';
  }
}


//tab menu
function openLocation(evt, locationName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(locationName).style.display = "block";
  evt.currentTarget.className += " active";
}

//find doctor
function findDoctor() {
  var input, filter, cards, container, div, name, i;
  input = document.getElementById("doctorSearch");
  filter = input.value.toUpperCase();
  container = document.querySelector(".tabcontent")
  cards = container.getElementsByClassName("doctor-card");
  console.log(container);
  for (i = 0; i < cards.length; i++) {
    name = cards[i].querySelector(".doctor-name");
    if (name.innerText.toUpperCase().indexOf(filter) > -1) {
      cards[i].style.display = "";
    } else {
      cards[i].style.display = "none";
    }
  }
}

//scroll to top
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