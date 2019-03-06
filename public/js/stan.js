// Set the date we're counting down to
var countDownDate = new Date("Jan 5, 2021 15:37:25").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

  // Get todays date and time
  var now = new Date().getTime();
    
  // Find the distance between now and the count down date
  var distance = countDownDate - now;
    
  // Time calculations for days, hours, minutes and seconds
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
  // Output the result in an element with id="demo"
  document.getElementById("countdown").innerHTML = minutes + "m " + seconds + "s ";
    
  // If the count down is over, write some text 
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("countdown").innerHTML = "EXPIRED";
  }
}, 1000);



// reservation functionality

$("#newReservation").click(function() {
  event.preventDefault();
  //grabbing user input from form on reservation.html page
  var newReservation = {
    name: $("#name").val(),
    email: $("#email").val(),
    phone: $("#phone").val(),
    galactic_area: $("#date").val(),
    person: $("#people").val()
  }
  $.ajax({
    url: "api/reservations",
    method: "POST",
    data: newReservation
  })
  .then(function(res, req) {
    alert("Your reservation has been entered!");
  })

}) 

// image of the day API call

$.ajax({
  url: "api/nasa/images",
  method: "GET"
})
.then(function(response) {
var pictureOfTheDay = response.url;
console.log(pictureOfTheDay);
$("#nasaImage").attr("src", pictureOfTheDay);
})

// how many people are in space

$.ajax({
  url: "api/nasa/people",
  method: "GET"
})
.then(function(response) {
  var peopleInSpace = response.number;
  console.log(peopleInSpace);
  $("#spacePeople").attr("data-number", peopleInSpace)
})

// near earth objects

$.ajax({
  url: "api/nasa/asteroids",
  method: "GET"
})
.then(function(response) {
  var nearbyObjects = response.element_count;
  console.log(nearbyObjects);
  $("#earthObjects").attr("data-number", nearbyObjects)
})