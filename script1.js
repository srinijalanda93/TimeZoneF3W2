//const API_KEY = "AIzaSyAs2-vpVNYH7dSfUZd73eo09R5Nrmxx4Vs";
// const API_KEY = "AIzaSyCCWwPLs-Wp05YVEnGHukkLrNA2YmthzaU";
// const API_KEY="AIzaSyAo7626fi4DK5OsZN8_nVm0G12CwtmPBzA";
//const API_KEY = "AIzaSyAT_bd6XUSKbtz0x4vVrGha688NcedYybk";
//const API_KEY = "AIzaSyDI7xuxOTRzMaDfaecSlpFJfHOKQV04dnk";//youtube
//const API_KEY="AIzaSyAs2-vpVNYH7dSfUZd73eo09R5Nrmxx4Vs";

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
    console.log(`The latitude is: ${position.coords.latitude}`);
    console.log(`The longitude is: ${position.coords.longitude}`);
    fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${long}&format=json&apiKey=5953a3b590ef4b6bbf8833618dd093ba`)
        .then((resp) => resp.json())
        .then((data) => {
           // console.log(data.results);
           console.log(data.results[0].timezone); //gives the object
        })
        .catch((error) => {
            console.error("Error fetching location data:", error);
        });
}

getLocation();

