let mainNav = document.getElementById("js-menu");
let mainNav2 = document.querySelector(".main-nav2");
let navBarToggle = document.getElementById("js-navbar-toggle");

navBarToggle.addEventListener("click", function () {
  mainNav.classList.toggle("active");
  mainNav2.classList.toggle("active");
});

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
const guest = document.querySelector(".guest-input");
const rsvpButton = document.querySelector(".rsvp-button");
const going = document.querySelector(".going");
const notGoing = document.querySelector('.not-going');

// if the ticker bought already exist dont add it to the DB esle add and display info to DB and front end

rsvpButton.addEventListener("click", (e) => {
  let total = guest.value;
  let username = user.value;
  e.preventDefault();
  var database = firebase.database();

  if (user.value != "" && guest.value != "" && going.checked) {
    database
      .ref(`list`)
      .orderByChild("names")
      .equalTo(`${username}`)
      .once("value", (snapshot) => {
        console.log("scanning database");
        if (snapshot.exists()) {
          var data1 = snapshot.val();
          let currentGuests = parseFloat(data1[`${username}`].Guests);

          database.ref(`list/` + username).set({
            Name: username,
            Guests: currentGuests,
          });

          console.log("i exist");
          location.reload();
          return;
        } else {
          console.log("i dont exist");
          database.ref(`list/` + username).set({
            Name: username,
            Guests: total,
          });

          location.reload();
          return;
        }
      });
  } else {
    console.log("Please enter a valid input");
  }

  if (user.value != "" && guest.value != "" && notGoing.checked) {
    database
      .ref(`NoGolist`)
      .orderByChild("names")
      .equalTo(`${username}`)
      .once("value", (snapshot) => {
        console.log("scanning database");
        if (snapshot.exists()) {
          var data1 = snapshot.val();
          let currentGuests = parseFloat(data1[`${username}`].Guests);

          database.ref(`NoGolist/` + username).set({
            Name: username,
            Guests: currentGuests,
          });

          console.log("i exist");
          location.reload();
          return;
        } else {
          console.log("i dont exist");
          database.ref(`NoGolist/` + username).set({
            Name: username,
            Guests: total,
          });

          location.reload();
          return;
        }
      });
  } else {
    console.log("Please enter a valid input");
  }
});
