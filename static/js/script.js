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

window.setInterval(displayDateTime, 1000);