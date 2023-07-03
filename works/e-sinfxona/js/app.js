let subscribeBtn = document.querySelectorAll('.subscribe__btn');

for (let i = 0; i < subscribeBtn.length; i++) {
    subscribeBtn[i].addEventListener('click', () => {
        for (let k = 0; k < subscribeBtn.length; k++) {
            subscribeBtn[k].classList.remove('active')
        }
        subscribeBtn[i].classList.add('active')
    })
}

let asideDropdown = document.querySelectorAll('.aside__dropdown');

for (let i = 0; i < asideDropdown.length; i++) {
    asideDropdown[i].addEventListener('click', function () {

        for (let k = 0; k < asideDropdown.length; k++) {
            asideDropdown[k].classList.remove('active')
        }
        asideDropdown[i].classList.add('active')

    })
}


// =================================lesson===================

let lessonBtn = document.querySelectorAll('.lesson__btn');
let lessonContent = document.querySelectorAll('.lesson__content');

console.log(lessonContent)


for (let i = 0; i < lessonBtn.length; i++) {
    lessonBtn[i].addEventListener('click', () => {
        for (let k = 0; k < lessonBtn.length; k++) {
            lessonBtn[k].classList.remove('active')
            lessonContent[k].classList.remove('active')
        }
        lessonBtn[i].classList.add('active')
        lessonContent[i].classList.add('active')
    })
}



/* ----------------------------------------- Circle ------------------------------ */

let circularProgress = document.querySelectorAll(".circular-progress"),
    progressValue = document.querySelectorAll(".progress-value");

let progressStartValue = 0,
    progressEndValue = 90,
    speed = 20;

let progress = setInterval(() => {
    progressStartValue++;

    for (let i = 0; i < progressValue.length; i++) {
        progressValue[i].textContent = `${progressStartValue}%`
        circularProgress[i].style.background = `conic-gradient(#7d2ae8 ${progressStartValue * 3.6}deg, #ededed 0deg)`
    }


    if (progressStartValue == progressEndValue) {
        clearInterval(progress);
    }
}, speed);
