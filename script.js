"use strict";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");

let map, mapEvent;

class App {
  //Private instance properties: present on all created object
  _map;
  _mapEvent;

  constructor() {
    this._getPosition(); // Will be automatically called on an instance
  }

  // GET CURRENT LOCATION AND DISPLAY LEAFLET MAP
  _getPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        //1. SUCCESS CALLBACK
        this._loadMap.bind(this), // when invoked as a callback it's "this"=="undefined"

        //2. FAIL CALLBACK
        function () {
          alert("Could not get your position");
        }
      );
    }
  }

  _loadMap(position) {
    // Get current location coordinates
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    const coords = [latitude, longitude];

    // Set the map view with coords
    this._map = L.map("map").setView(coords, 13); // Copy map to map global variable

    // Add a base map layer
    L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png").addTo(
      this._map
    );

    // Display form on map click
    this._map.on("click", function (mapE) {
      this._mapEvent = mapE; // Copy mapE to a global mapEvent variable
      form.classList.remove("hidden");
      inputDistance.focus();
    });
  }

  _showForm() {}

  _toggleElevationField() {}

  _newWorkout() {}
}

const app = new App();

// HANDLE FORM SUBMISSION
form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Display marker
  const { lat, lng } = mapEvent.latlng;
  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(
      L.popup({
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
        className: "running-popup",
      })
    )
    .setPopupContent("Workout")
    .openPopup();

  // Clear form input after submission
  inputDistance.value =
    inputDuration.value =
    inputCadence.value =
    inputElevation.value =
      "";
});

// Implimenting workout type input
inputType.addEventListener("change", function () {
  inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
  inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
});
