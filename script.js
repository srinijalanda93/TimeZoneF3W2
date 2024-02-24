/**API KEY :5953a3b590ef4b6bbf8833618dd093ba
 * step 1(done):using GeoLocation API we need to fetch the lat ,long of the user
 * step 2:using lat,long get the TimeZone for we need an API
 *
 *
 */
const api = "5953a3b590ef4b6bbf8833618dd093ba";
// Step 1: Get the lat,long
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

// The below will get the lat,long
function showPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let ArrCoordinate = [];
  ArrCoordinate.push(lat, long);
  console.log(`The latitude is: ${position.coords.latitude}`);
  console.log(`The longitude is: ${position.coords.longitude}`);
  fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&format=json&apiKey=${api}`)
    .then((resp) => resp.json())
    .then((data) => {
      // console.log(data.results); //
      //console.log(data.results[0]); //gives the object
      ArrCoordinate.push(
        data.results[0].city,
        data.results[0].country,
        data.results[0].postcode
      );
      console.log(data.results[0].timezone); //gives the timeZone
      let timeZoneData = data.results[0].timezone;
      displayTimeZoneUi(timeZoneData, ArrCoordinate);
    })
    .catch((error) => {
      console.error("Error fetching location data:", error);
    });
}
getLocation();

// document.addEventListener('DOMContentLoaded', function displayTimeZoneUi(data,coordinatesArrr){
//     console.log(data);
// const divTag=document.getElementById('myCurrentLoc');
// const pTag=document.querySelector('#myCurrentLoc>p')
// pTag.innerText=`Name Of Time Zone :${data.abbreviation_DST}`;
// const latTag=document.getElementById('lat');
// latTag.innerHTML=`<span>Lat:${coordinatesArrr[0]}</span> <span>Long:${coordinatesArrr[1]}</span>`;

// divTag.innerHTML += `<div>

// <p>Offset STD:</p>
// <p>Offset STD Seconds :</p>
// <p>Offset DST :</p>
// <p>Offset DST Seconds:</p>
// <p>Country:</p>
// <p>City:</p>
// <p>PostCode:</p>
// </div>`;

// });

function displayTimeZoneUi(data, coordinatesArrr) {
  //console.log(data);
  const divTag = document.getElementById("myCurrentLoc");

  divTag.innerHTML += `
<span><p><strong>Lat:</strong>${coordinatesArrr[0]}</p><p><strong>Lat:</strong>${coordinatesArrr[1]}</p></span>
<p><strong>Name Of Time Zone</strong> :${data.abbreviation_DST}</p>
    <p><strong>Offset STD:</strong> ${data.offset_STD}</p>
    <p><strong>Offset STD Seconds:</strong> ${data.offset_STD_seconds}</p>
    <p><strong>Offset DST:</strong> ${data.offset_DST}</p>
    <p><strong>Offset DST Seconds:</strong> ${data.offset_DST_seconds}</p>
    <p><strong>Country:</strong> ${coordinatesArrr[3]}</p>
    <p><strong>City:</strong> ${coordinatesArrr[2]}</p>
    <p><strong>PostCode:</strong> ${coordinatesArrr[4]}</p>`;
}

//Carrer del Pintor Navarro Llorens, 7, 46008 Valencia, Spain
function getTimezone() {
  var address = document.getElementById("Address").value;
  // Validate the entered address
  if (!address) {
    alert("Please enter a valid address.");
    const alertTag = document.querySelector("#displayaddress>p");
    alertTag.style.display = "flex";
    return;
  }

  // Use Geoapify Geocoding API to get coordinates
  fetch(
    `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
      address
    )}&apiKey=${api}`
  )
    .then((resp) => resp.json())
    .then((data) => {
      //console.log("the address data", geocodingResult);
      if (data.features && data.features.length > 0) {
        const timeZone = data.features[0].properties.timezone;
        let city, country, postcode, lat, lon;
        let arr = [];
        city = data.features[0].properties.city;
        country = data.features[0].properties.country;
        postcode = data.features[0].properties.postcode;
        lat = data.features[0].properties.lat;
        lon = data.features[0].properties.lon;
        arr.push(lon, lat, city, country, postcode);
        console.log(
          "the data for city,country,postal code",
          data.features[0].properties
        );

        displayUserTz(timeZone, arr);
      } else {
        alert("Unable to retrieve coordinates for the given address.");
      }
    });
}

function displayUserTz(data, coordinatesArrr) {
  //console.log(data);
  const divTag = document.getElementById("timezoneResult");

  divTag.innerHTML += `
  <span><p><strong>Lat:</strong>${coordinatesArrr[1]}</p><p><strong>Lat:</strong>${coordinatesArrr[0]}</p></span>
  <p><strong>Name Of Time Zone</strong> :${data.abbreviation_DST}</p>
      <p><strong>Offset STD:</strong> ${data.offset_STD}</p>
      <p><strong>Offset STD Seconds:</strong> ${data.offset_STD_seconds}</p>
      <p><strong>Offset DST:</strong> ${data.offset_DST}</p>
      <p><strong>Offset DST Seconds:</strong> ${data.offset_DST_seconds}</p>
      <p><strong>Country:</strong> ${coordinatesArrr[3]}</p>
      <p><strong>City:</strong> ${coordinatesArrr[2]}</p>
      <p><strong>PostCode:</strong> ${coordinatesArrr[4]}</p>`;
}
