document.addEventListener("DOMContentLoaded",() => {
    const buttons = document.querySelectorAll('.request-popup__open-btn')
    const popup = document.querySelector('.request-popup__wrapper')
    const closeBtn = document.querySelector('.request-popup__close-btn')
    const app = document.querySelector('#app')

    buttons.forEach(button => {
        button.addEventListener('click',openRequestPopup)
    })

    closeBtn.addEventListener('click', hideRequestPopup)

    function openRequestPopup(){
        popup.classList.remove('request-popup__wrapper--hidden')
    }

    function hideRequestPopup(){
        if(!popup.classList.contains('request-popup__wrapper--hidden')){
            popup.classList.add('request-popup__wrapper--hidden')
        }
    }
})