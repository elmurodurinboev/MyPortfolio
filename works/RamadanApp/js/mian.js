const newYearTime = new Date("9 March 2024");
const day = document.querySelector('.left-day');
const hour = document.querySelector('.left-hour');
const minut = document.querySelector('.left-minut');
const second = document.querySelector('.left-second');



// console.log(n)

function fixNumber(time) {
    return time < 10 ? `0${time}` : time;
}

function countDown() {

    const n = (newYearTime - new Date())/1000;


    const days = fixNumber(Math.floor(n / 86400))  // # number of days
    const hours = fixNumber(Math.floor((n % 86400) / 3600))  //   # number of hours
    const minutes = fixNumber(Math.floor(((n % 86400) % 3600) / 60)) //    # number of minutes
    const seconds = fixNumber(Math.floor(((n % 86400) % 3600) % 60))   // # number of seconds
    
    day.innerText = days
    hour.innerText = hours
    minut.innerText = minutes
    second.innerText = seconds    
}

countDown(); 

setInterval(countDown , 1000);
  


