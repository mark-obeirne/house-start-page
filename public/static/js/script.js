function search() {
    const searchbar = document.querySelector(".search input");
    if (searchbar.value) {
        const query = searchbar.value;
        const url = `https://www.google.com/search?q=${query}`;
        window.open(url);
    }
}

function getDate() {
    const d = new Date();
    const year = d.getFullYear()
    let month = d.getMonth();
    const day = d.getDate();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    month = months[month];
    const todayDate = `${day} ${month}, ${year}`;
    return todayDate;
}

function getTime() {
    const d = new Date();
    let hours = d.getHours();
    let minutes = d.getMinutes();
    let seconds = d.getSeconds();

    // Update sun and moon position, plus backgrounds based on time
    if (hours < 6 || hours > 18) {
        toggleNight();
    } else {
        toggleDay();
    }

    if (hours < 10) {
        hours = `0${hours}`;
    }
    
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    
    if (seconds < 10) {
        seconds = `0${seconds}`;
    }

    const time = `${hours}:${minutes}:${seconds}`;
    return time;
}

function displayDateTime() {
    const currentTime = getTime();
    const currentDate = getDate();
    const clockTime = document.querySelector(".time");
    const date = document.querySelector(".date");
    clockTime.innerHTML = currentTime;
    date.innerHTML = currentDate;
}

function toggleDay() {
    const sky = document.querySelector(".skybox");
    const ground = document.querySelector(".ground");
    const sun = document.querySelector(".sun");
    const moon = document.querySelector(".moon");
    const house = document.querySelector(".house");
    const window = document.querySelectorAll(".window");
    house.classList.remove("dark");
    window.forEach(item => item.classList.remove("dark"));
    sky.classList.remove("dark");
    ground.classList.remove("dark");
    sun.classList.remove("inactive");
    moon.classList.add("inactive");
}

function toggleNight() {
    const sky = document.querySelector(".skybox");
    const ground = document.querySelector(".ground");
    const sun = document.querySelector(".sun");
    const moon = document.querySelector(".moon");
    const house = document.querySelector(".house");
    const window = document.querySelectorAll(".window");
    house.classList.add("dark");
    window.forEach(item => item.classList.add("dark"));
    sky.classList.add("dark");
    ground.classList.add("dark");
    sun.classList.add("inactive");
    moon.classList.remove("inactive");
}

(function() {
    if (navigator.geolocation) {
        console.log("Geolocation a-OK")
        navigator.geolocation.getCurrentPosition(async position => {
            const lat = position.coords.latitude;
            const long = position.coords.longitude;
            const apiUrl = `weather/${lat},${long}`;
            
            const response = await fetch(apiUrl);
            const data = await response.json();
            console.log(data);
            console.table(data.weather[0].description, data.main.temp, data.main.feels_like, data.wind.speed)
        })
    } else {
        console.log("Geolocation not available");
    }
})();

window.setInterval(displayDateTime, 1000);
document.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        search(e);
    }
});