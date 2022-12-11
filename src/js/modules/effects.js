// параллакс эффект

export function paralax(e) {
    const Header = document.querySelector('.header');
    const headerParallax = document.querySelector('.header__parallax');

    if (headerParallax) {

        Header.addEventListener('mousemove', ev => {
            headerParallax.style.transform = `translate(${ev.clientX / 170}px, ${ev.clientY / 170}px)`;
        })
    }
}

