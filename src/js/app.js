import * as flsFunctions from './modules/functions.js'

flsFunctions.isWebp();


// слайдер

import Swiper, { Navigation, Pagination } from 'swiper';

Swiper.use([Navigation, Pagination]); // без этой команды Navigation, Pagination работать не будут

// или же можем подключить и активировать сразу все модули. Но они весят очень много!!!
// import Swiper from 'swiper/bundle';
// Swiper.use();

// const swiper = new Swiper();


// меню бургер

const menuIcon = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');

menuIcon.addEventListener('click', (e) => {
    document.body.classList.toggle('_lock');
    menuIcon.classList.toggle('_active');
    menuBody.classList.toggle('_active');
});

// выпадающее меню и стрелка-треугольник

const menuArrow = document.querySelector('.menu__arrow');

if (menuArrow) {
    menuArrow.addEventListener('click', e => {
        menuArrow.parentElement.classList.toggle('_active');
    })
};

// параллакс эффект

import { paralax } from './modules/effects.js'

window.onload = paralax();

// подсветка карточек через делегирование

let highletedColumn;
const headerRow = document.querySelector('.header__row');

headerRow.addEventListener('click', e => {
    let target = e.target;
    console.log(highletedColumn);
    while (target !== headerRow) {
        if (target.classList.contains('column')) {
            highlite(target);
            break;
        }
        target = target.parentNode;
    }
})

function highlite(node) {
    if (highletedColumn) {
        // highletedColumn.classList.remove('_active');
        highletedColumn.style.backgroundColor = '';
    }
    highletedColumn = node;
    // highletedColumn.classList.add('_active');

    const color = highletedColumn.getAttribute('data-color');
    highletedColumn.style.backgroundColor = color;

}

// IntersectionObserver sportclubObserver

const sportclubObserver = new IntersectionObserver(
    // пишем callback

    (entries) => {

        console.log(entries, 'f');

        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.transform = 'translate(0, 0)'
            }
        })

    },
    // пишем options


    {
        // rootMargin: '50px',
        threshold: [0, 1]
    });

const sportclub = document.querySelectorAll('.sportclub');

sportclub.forEach((value) => { sportclubObserver.observe(value); });


// swiper

let newSlider = new Swiper('.couches__slider', {
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    },

    spaceBetween: 54,
    loop: true,

    breakpoints: {
        320: {
            slidesPerView: 1,
        },
        530: {
            slidesPerView: 3,
        },
        776: {
            slidesPerView: 4,
        },
    },

});

// IntersectionObserver

const textObserver = new IntersectionObserver(
    // callback
    ([entry]) => {
        console.log(entry);
        if (entry.isIntersecting) {
            entry.target.style.transform = 'translate(0, 0)';
        }
    }, {
    threshold: [0.1, 0.8]

}
)

textObserver.observe(document.querySelector('.couches__title'));

// document.querySelectorAll('.couches__title').forEach(text => textObserver.observe(text));

// табы

const subtab = document.querySelector('.subtab');// сворачивающийся таб
const tabArrow = document.querySelectorAll('.tab__arrow'); // стрелка которая его сворачивает


// tabArrow.forEach((value) => {
//     value.addEventListener('click', (e) => {
//         const subtab = value.nextElementSibling;
//         const tab = value.parentElement.nextElementSibling;
//         if (subtab) {
//             value.classList.toggle('_active');
//             // const subtabHeight = subtab.offsetHeight + subtab.parentElement.offsetHeight;
//             subtab.classList.toggle('_active');
//             // tab.style.transform = `translate(0, ${subtabHeight}px)`;
//             tab.classList.toggle('_active');
//             // tab.parentElement.style.height = 'auto';

//         }
//     });
// })

window.addEventListener('click', (e) => {
    let target = e.target;
    // if (target.classList.contains('subtab')) {
    //     return;
    // }

    if (target.classList.contains('tab__arrow') && target.nextElementSibling) {
        target.classList.toggle('_active');
        target.nextElementSibling.classList.toggle('_active');
        target.parentElement.nextElementSibling.classList.toggle('_active');
    }

    else {

        while (target !== window && target.parentElement) {
            if (target === subtab) {
                return;
            }

            console.log(target);

            target = target.parentElement;
        }


        subtab.classList.remove('_active');
        subtab.previousElementSibling.classList.remove('_active');
        subtab.parentElement.nextElementSibling.classList.remove('_active');
    }

})

// табы через делегирование

// const pricesRow = document.querySelector('.prices__row');

// pricesRow.addEventListener('click', (e) => {
//     let target = e.target;

//     if (target.classList.contains('tab__arrow')) {
//         target.classList.toggle('_active');
//     }

// })


//! еще один swiper 

const servicesContainer = new Swiper('.services__container', {
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    }
});

// делаем подписи для слайдера

const servicesImg = document.querySelectorAll('.services__img img');

servicesImg.forEach(value => {
    let path = value.getAttribute('src');
    path = path.replace(/.*\/(\w+\s?(\w+)?)\..*/, '$1');
    // path = /.*\/(\w+)\s?(\w+)?\..*/.exec(path);
    value.parentElement.nextElementSibling.innerHTML = path;

    console.log(path);
});


//! формы

// форма имени
const mainForm = document.forms.mainForm;
const userName = mainForm.elements.userName;

userName.addEventListener('input', (e) => {
    const value = userName.value;
    const subText = userName.nextElementSibling;
    console.log(value);
    console.log(value.length);

    const mask = /^[A-Z]{1}([a-z]*)?$/;

    if (mask.test(value) || value.length === 0) {
        subText.innerHTML = '';
    }

    else {
        subText.innerHTML = 'Неверный формат имени';
    };

})


// форма пароля

const password = mainForm.elements.password;


password.addEventListener('input', (e) => {
    const subText = password.nextElementSibling;
    let vLen = password.value.length;
    console.log(password);


    if (vLen < 5 && vLen > 0) {
        subText.innerHTML = 'Задан слишком короткий пароль';
    }

    else {
        subText.innerHTML = '';

    }


})

// textarea

const feedback = mainForm.elements.feedback;

feedback.addEventListener('keyup', (e) => {
    let feedbackLenght = feedback.value.length;
    const subText = feedback.nextElementSibling;

    if (feedbackLenght) {
        let calc = 200 - feedbackLenght;
        subText.innerHTML = `Осталось ${calc} символов`;
    }

    else {
        subText.innerHTML = ``;
    }
})

// отправка данных

const submit = mainForm.elements.submit;

mainForm.addEventListener('submit', (e) => {
    let userNameValue = userName.value;
    let passwordValue = password.value;
    let feedbackValue = feedback.value;

    if (!userNameValue || !passwordValue || !feedbackValue) {
        e.preventDefault();
        alert('Заполните данные формы!');
    }
})



