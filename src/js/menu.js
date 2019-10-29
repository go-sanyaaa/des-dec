document.addEventListener('DOMContentLoaded',()=> {
    const menuBtn = document.querySelector('.header__mobile-menu')
    const closeBtn = document.querySelector('.mobile-menu__close-btn')
    const menu = document.querySelector('.mobile-menu')

    menuBtn.addEventListener('click', () => {
        menu.classList.remove('mobile-menu--hidden')
    })

    closeBtn.addEventListener('click',hideMenu)

    menu.querySelectorAll('a').forEach(element => {
        element.addEventListener('click', hideMenu)
    })

    window.addEventListener('resize', () => {
        if(window.innerWidth > 1080) hideMenu()
    })

    function hideMenu() {
        if(!menu.classList.contains('mobile-menu--hidden')){
            menu.classList.add('mobile-menu--hidden')
        }
    }
})