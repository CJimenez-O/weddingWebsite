let mainNav = document.getElementById("js-menu");
let mainNav2 = document.querySelector(".main-nav2");
let navBarToggle = document.getElementById("js-navbar-toggle");

navBarToggle.addEventListener("click", function () {
  mainNav.classList.toggle("active");
  mainNav2.classList.toggle("active");
});

// pop up disclaimer

window.onload = (e) => {
  setTimeout(() => {
    body = document.getElementsByTagName("body")[0];
    body.style.overflow = "hidden";
	body.style.scroll = "no";
    let popup = document.querySelector(".disclaimer");
    popup.innerHTML = `
		<div class="disclaimerContainer">
        	<button class="closeButton">x</button>
        	<div class="cardText">
          		<h4 class="read">HI THERE! </h4>
        		<p class="disclaimerText">We are excited to celebrate with you on our special day!</p>
        		<p class="disclaimerText">RSVP's should be completed no later than October 1, 2022. Please keep in mind that RSVP's are reserved for those who were recieved a invitaion. If you have not already submitted your RSVP, please click on the RSVP button in the navigation bar above. If you have any question feel free to let us know! See you soon </p>  
        	</div>
        </div>
		`;

    // close disclaimer
    let closeDisclaimer = document.querySelector(".closeButton");
    closeDisclaimer.addEventListener("click", () => {
      console.log("click");
      body = document.getElementsByTagName("body")[0];
      body.style.overflow = "unset";
	  body.style.scroll = "yes";
      let popup = document.querySelector(".disclaimer");
      popup.innerHTML = "";
    });
  }, 2000);
};

const countdown = () => {
  const countDate = new Date("November 18, 2022 00:00:00");
  const now = new Date().getTime();
  const gap = countDate - now;

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const textDay = Math.floor(gap / day);
  const textHour = Math.floor((gap % day) / hour);
  const textMinute = Math.floor((gap % hour) / minute);
  const textSecond = Math.floor((gap % minute) / second);

  document.querySelector(".days").innerText = textDay + " Days";
  document.querySelector(".hours").innerText = textHour + " Hours";
  document.querySelector(".minutes").innerText = textMinute + " Minutes";
  document.querySelector(".seconds").innerText = textSecond + " Seconds";
};

setInterval(countdown, 1000);

const user = document.querySelector(".name-input");
const last = document.querySelector(".lastname-input");
const guest = document.querySelector(".guest-input");
const rsvpButton = document.querySelector(".rsvp-button");
const going = document.querySelector(".going");
const notGoing = document.querySelector(".not-going");
const rsvpCount = document.querySelector('.rsvp-guest-input')

rsvpButton.addEventListener("click", (e) => {
  let total = guest.value;
  let username = user.value;
  let phoneNumber = last.value;
  let fullname = `${username} `;
  e.preventDefault();
  var database = firebase.database();

  // add user to going list
  if (user.value !== "" && guest.value !== "" && going.value == 'on' && guest.value <= rsvpCount.value ) {

    database
      .ref(`list`)
      .orderByChild("names")
      .equalTo(`${fullname}`)
      .once("value", (snapshot) => {
        // console.log("scanning database");
        if (snapshot.exists()) {
          var data1 = snapshot.val();
          let currentGuests = parseFloat(data1[`${fullname}`].Guests);

          database.ref(`list/` + fullname).set({
            Name: fullname,
            Guests: currentGuests,
            Phone: phoneNumber
          });

          // console.log("i exist");
          location.reload();
          return;
        } else {
          // console.log("i dont exist");
          database.ref(`list/` + fullname).set({
            Name: fullname,
            Guests: total,
            Phone: phoneNumber
          });

          // location.reload();
          return;
        }
      });
  } else if(user.value == "" && guest.value == ""){
    let validText = document.querySelector(".valid");
    validText.innerText = "Please enter a valid input";
    console.log('unvalid input')
    setTimeout(() => {
      validText.innerText = "";
    }, 3000);
  } else if(guest.value > rsvpCount.value){
    let validText = document.querySelector(".valid");
    validText.innerText = `The max number of guests reserved is ${rsvpCount.value}`;
    console.log('unvalid input')
    setTimeout(() => {
      validText.innerText = "";
    }, 3000);
    return;
  }

  // add user to not going list
  if (user.value != "" && guest.value != "" && notGoing.checked) {
    database
      .ref(`NoGolist`)
      .orderByChild("names")
      .equalTo(`${fullname}`)
      .once("value", (snapshot) => {
        console.log("scanning database");
        if (snapshot.exists()) {
          var data1 = snapshot.val();
          let currentGuests = parseFloat(data1[`${fullname}`].Guests);

          database.ref(`NoGolist/` + fullname).set({
            Name: fullname,
            Guests: currentGuests,
            Phone: phoneNumber
          });

          // console.log("i exist");
          location.reload();
          return;
        } else {
          // console.log("i dont exist");
          database.ref(`NoGolist/` + fullname).set({
            Name: fullname,
            Guests: total,
            Phone: phoneNumber
          });

          location.reload();
          return;
        }
      });
  } else if(user.value == "" && guest.value == "" ) {
    let validText = document.querySelector(".valid");
    validText.innerText = "Please enter a valid input";
    console.log('unvalid input')

    setTimeout(() => {
      validText.innerText = "";
    }, 3000);
  }
});

// photo gallery
window.addEventListener(
  "DOMContentLoaded",
  function (e) {
    var stage = document.getElementById("stage");
    var fadeComplete = function (e) {
      stage.appendChild(arr[0]);
    };
    var arr = stage.getElementsByTagName("a");
    for (var i = 0; i < arr.length; i++) {
      arr[i].addEventListener("animationend", fadeComplete, false);
    }
  },
  false
);

// FAQ Section

var faq = document.getElementsByClassName("faq-page");
var i;
for (i = 0; i < faq.length; i++) {
  faq[i].addEventListener("click", function () {
    /* Toggle between adding and removing the "active" class,
        to highlight the button that controls the panel */
    this.classList.toggle("active");
    /* Toggle between hiding and showing the active panel */
    var body = this.nextElementSibling;
    if (body.style.display === "block") {
      body.style.display = "none";
    } else {
      body.style.display = "block";
    }
  });
}
