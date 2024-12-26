// Set the date we're counting down to
var countDownDate = new Date("Dec 31, 2024 18:00:00 EST").getTime();

// Update the count down every 1 second
var x = setInterval(function () {
  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Output the result in an element with id="address-timer"
  document.getElementById("address-timer").innerHTML =
    days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

  // If the count down is over, write some text
  if (distance < 0) {
    clearInterval(x);
    var timer = document.getElementById("address-timer");
    timer.innerHTML = "";

    var addy = document.createElement('a');
    addy.setCl
    addy.setAttribute('href',"/nye25/address-info.html");
    addy.innerHTML = "CLICK HERE";
    
    timer.append(addy);
  }
}, 1000);
