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
const last = document.querySelector(".lastname-input");
const guest = document.querySelector(".guest-input");
const rsvpButton = document.querySelector(".rsvp-button");
const going = document.querySelector(".going");
const notGoing = document.querySelector(".not-going");

// if the ticker bought already exist dont add it to the DB esle add and display info to DB and front end

rsvpButton.addEventListener("click", (e) => {
	let total = guest.value;
	let username = user.value;
	let lastname = last.value;
	let fullname = `${username} ${lastname}`;
	e.preventDefault();
	var database = firebase.database();

	if (user.value != "" && guest.value != "" && going.checked) {
		database
			.ref(`list`)
			.orderByChild("names")
			.equalTo(`${fullname}`)
			.once("value", (snapshot) => {
				console.log("scanning database");
				if (snapshot.exists()) {
					var data1 = snapshot.val();
					let currentGuests = parseFloat(data1[`${fullname}`].Guests);

					database.ref(`list/` + fullname).set({
						Name: fullname,
						Guests: currentGuests,
					});

					console.log("i exist");
					location.reload();
					return;
				} else {
					console.log("i dont exist");
					database.ref(`list/` + fullname).set({
						Name: fullname,
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
			.equalTo(`${fullname}`)
			.once("value", (snapshot) => {
				console.log("scanning database");
				if (snapshot.exists()) {
					var data1 = snapshot.val();
					let currentGuests = parseFloat(data1[`${fullname}`].Guests);

					database.ref(`NoGolist/` + fullname).set({
						Name: fullname,
						Guests: currentGuests,
					});

					console.log("i exist");
					location.reload();
					return;
				} else {
					console.log("i dont exist");
					database.ref(`NoGolist/` + fullname).set({
						Name: fullname,
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
