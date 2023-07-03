// npx prettier --write js/script.js -- for formatting code

window.addEventListener("DOMContentLoaded", () => {
  const tabParent = document.querySelector(".tabheader__items"),
    tabs = document.querySelectorAll(".tabheader__item"),
    tabContent = document.querySelectorAll(".tabcontent"),
    loader = document.querySelector(".loader");
    
  setTimeout(() => {
    loader.style.opacity = "0";
    setTimeout(() => {
      loader.style.display = "none";
    }, 500);
  }, 2000);

  function hideTabContent() {
    tabContent.forEach((item) => {
      item.classList.add("hide", "fade");
    });
    tabs.forEach((item) => {
      item.classList.remove("tabheader__item_active");
    });
  }
  hideTabContent();

  function showTabContent(i = 0) {
    tabContent[i].classList.add("show", "fade");
    tabContent[i].classList.remove("hide");
    tabs[i].classList.add("tabheader__item_active");
  }

  showTabContent();

  tabParent.addEventListener("click", (event) => {
    const target = event.target;
    if (target && target.classList.contains("tabheader__item")) {
      tabs.forEach((item, inx) => {
        if (item == target) {
          hideTabContent();
          showTabContent(inx);
        }
      });
    }
  });

  const deadline = "2024-08-11";

  function getTimeRemaining(endTime) {
    const timer = Date.parse(endTime) - Date.parse(new Date());
    if (timer <= 0) {
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    } else {
      days = Math.floor(timer / (1000 * 60 * 60 * 24));
      hours = Math.floor((timer / (1000 * 60 * 60)) % 24);
      minutes = Math.floor((timer / (1000 * 60)) % 60);
      seconds = Math.floor((timer / 1000) % 60);
    }

    return { timer, days, hours, minutes, seconds };
  }

  function getThero(time) {
    if (time >= 0 && time < 10) {
      return `0${time}`;
    } else {
      return time;
    }
  }

  function setClock(selector, endTime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(uppdateClock, 1000);
    uppdateClock();

    function uppdateClock() {
      const t = getTimeRemaining(endTime);
      days.innerHTML = getThero(t.days);
      hours.innerHTML = getThero(t.hours);
      minutes.innerHTML = getThero(t.minutes);
      seconds.innerHTML = getThero(t.seconds);

      if (timer < 0) {
        clearInterval(timeInterval);
      }
    }
  }
  setInterval(setClock(".timer", deadline), 1000);

  // Modal

  const modalTrigger = document.querySelectorAll("[data-modal]"),
    modal = document.querySelector(".modal");
  function openModal() {
    modal.classList.add("show");
    modal.classList.remove("hide");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.add("hide");
    modal.classList.remove("show");
    document.body.style.overflow = "";
    clearInterval(setIntervalId);
  }

  modalTrigger.forEach((item) => {
    item.addEventListener("click", openModal);
  });

  modal.addEventListener("click", (e) => {
    if (
      e.target.classList.contains("modal") ||
      e.target.getAttribute("data-close") == ""
    ) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.code == "Escape" && modal.classList.contains("show")) {
      closeModal();
    }
  });

  const setIntervalId = setTimeout(openModal, 50000);

  function openModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      openModal();
      document.removeEventListener("scroll", openModalByScroll);
    }
  }

  document.addEventListener("scroll", openModalByScroll);

  // Class

  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...rest) {
      this.src = src;
      this.alt = alt;
      this.descr = descr;
      this.title = title;
      this.price = price;
      this.parent = document.querySelector(parentSelector);
      this.classes = rest;
      this.usdUzs = 11000;
      this.changeUzs();
    }

    changeUzs() {
      this.price = this.price * this.usdUzs;
    }

    render() {
      const element = document.createElement("div");
      if (this.classes.length === 0) {
        element.classList.add("menu__item");
      } else {
        this.classes.forEach((item) => {
          element.classList.add(item);
        });
      }
      element.innerHTML = `
                <img src="${this.src}" alt="${this.alt}" />
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Price:</div>
                    <div class="menu__item-total"><span>${this.price}</span> UZS/month</div>
                </div>
            `;
      this.parent.append(element);
    }
  }

  // AXIOS - kutubxonasi bilan ishlash. Bu bizga object qaytaradi va uning ichidagi data kalit so'zi orqali serverdan kelgan datalarni olishimiz mumkin!
  axios.get('http://localhost:3000/menu').then(data=>{
    data.data.forEach(({img,alt,title,desc,price})=>{
      new MenuCard(img,alt,title,desc,price,'.menu .container').render();
    })
  })

  
  

  // Forms

  const msg = {
    load: "Loading",
    success: "Thank's for submitting our form!",
    failure: "Oops!. Somthing went wrong!",
  };

  const forms = document.querySelectorAll("form");

  forms.forEach((form) => {
    bindPostDate(form);
  });

  // async - asinxron funksiya yaratish

  async function postData(url , data){
    const res = await fetch(url, {
        method: "POST",
        headers: {"Content-type": 'application/json'},
        body: data,
      })
    ;

    return await res.json();

      // await - bu kutish buyruqi ya'ni masalan resni qaytarishi uchun uni bajarilishini kutadi
  }

  function bindPostDate(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault(); //Brauzerni default qiymatini o'chiradi

      const statusMessage = document.createElement("div");
      statusMessage.textContent = msg.load;
      statusMessage.style.textAlign = "center";
      form.append(statusMessage);

      const formData = new FormData(form);

      form.insertAdjacentElement("afterend", statusMessage);
      //                   (objectga o'girish metodi) (massivga o'girish metodi)
      const json = JSON.stringify(Object.fromEntries(formData.entries())) 

      postData('http://localhost:3000/request' , json)
        .then((data) => {
          console.log(data);
          showThanksModal(msg.success);
          statusMessage.remove();
        })
        .catch(() => {
          showThanksModal(msg.failure);
        })
        .finally(()=>{
          form.reset();
        })
      ;
      
      // const request = new XMLHttpRequest();
      // request.open('POST','server.php');
      // request.setRequestHeader('Content-type', 'application/json');
      

      // const json = JSON.stringify(obj);

      // request.send(json);

      // request.addEventListener('load',()=>{
      //     if(request.status === 200){
      //         console.log(request.response);
      //         showThanksModal(msg.success);
      //         form.reset();
      //         setTimeout(()=>{
      //             statusMessage.remove();
      //         },2000);
      //     }
      //     else{
      //         showThanksModal(msg.failure);
      //     }
      // })
    });
  }

  function showThanksModal(message) {
    const prevModal = document.querySelector(".modal__dialog");
    prevModal.classList.add("hide");
    openModal();
    const showModal = document.createElement("div");
    showModal.innerHTML = `
            <div class="modal__content">
                <div data-close class="modal__close">&times;</div>
                <div class="modal__title">
                  ${message}
                </div>
            </div>
        `;

    document.querySelector(".modal").append(showModal);
    setTimeout(() => {
      showModal.remove();
      prevModal.classList.add("show");
      prevModal.classList.remove("hide");
      closeModal();
    }, 4000);
  };

});
