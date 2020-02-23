window.addEventListener('DOMContentLoaded', function(){
  'use strict';
  // Timer
  const countTimer = (deadline) => {
    const timerHours = document.querySelector('#timer-hours'),
          timerMinutes = document.querySelector('#timer-minutes'),
          timerSeconds = document.querySelector('#timer-seconds');
        
    const getTimeRemaining = () => {
      let dateStop = new Date(deadline).getTime(),
          dateNow = new Date().getTime(),
          timeRemaining = (dateStop - dateNow) / 1000,
          seconds = Math.floor(timeRemaining % 60),
          minutes = Math.floor((timeRemaining / 60) % 60),
          hours = Math.floor(timeRemaining / 60 / 60);
          if (seconds < 10) {seconds = '0' + seconds;}
          if (minutes < 10) {minutes = '0' + minutes;}
          if (hours < 10)   {hours = '0' + hours;}
          return {timeRemaining, hours, minutes, seconds};
    }
    const updateClock = () => {
      const timer = getTimeRemaining();

      if(timer.timeRemaining > 0) {

        timerHours.textContent = timer.hours;
        timerMinutes.textContent = timer.minutes;
        timerSeconds.textContent = timer.seconds;

      } else if (timer.timeRemaining < 0) {

        clearInterval(intervalIndex);

        timerHours.textContent = '00';
        timerMinutes.textContent = '00';
        timerSeconds.textContent = '00';
      }
    }
    const intervalIndex = setInterval(updateClock, 1000);
  }
  countTimer('29 February 2020');
  // Menu
  const toggleMenu = () => {
    const btnMenu = document.querySelector('.menu'),
          menu = document.querySelector('menu'),
          closeBtn = document.querySelector('.close-btn'),
          menuItems = menu.querySelectorAll('ul>li');
    const handlerMenu = () => {
    };

    btnMenu.addEventListener('click', handlerMenu);
    closeBtn.addEventListener('click', handlerMenu);
    menuItems.forEach((elem) => {

      elem.addEventListener('click', () => {
        setTimeout(handlerMenu, 1000);
      });
      
    });
  };
  toggleMenu();
  // popup
  const togglePopUp = () => {
    const popup = document.querySelector('.popup'),
          popupBtn = document.querySelectorAll('.popup-btn'),
          popUpClose = document.querySelector('.popup-close');

    popupBtn.forEach((elem) => {
      elem.addEventListener('click', () => {
        let popupInterval,
            count = 0;
        const popupAnimate = () => {
          popupInterval = requestAnimationFrame(popupAnimate);
          count++;
          if (screen.width < 768) {
            cancelAnimationFrame(popupInterval);
            popup.style.display = 'block';
          } else if (count < 11) {
            popup.style.display = 'block';
            popup.style.opacity = count*10 + '%';
          }
        }
        popupInterval = requestAnimationFrame(popupAnimate);
      });
    });
    
    popup.addEventListener('click', (event) => {
      let target = event.target;
          target = target.closest('.popup-content');
      if (target){
        popup.style.display = 'block';
      } else {
        popup.style.display = 'none';
      }
    });

    popUpClose.addEventListener('click', () => {
      let popupInterval,
          count = 10;
      const popupAnimate = () => {
        popupInterval = requestAnimationFrame(popupAnimate);
        count--;
        if (screen.width < 768) {
          cancelAnimationFrame(popupInterval);
          popup.style.display = 'none'
        } else if (count > 0) {
          popup.style.opacity = count*10 + '%';
          if (count === 1) popup.style.display = 'none';
        }
      }
      popupInterval = requestAnimationFrame(popupAnimate);
    })
  };
  togglePopUp();
});