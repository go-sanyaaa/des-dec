document.addEventListener("DOMContentLoaded",() => {
    const buttons = document.querySelectorAll('.request-popup__open-btn')
    const popup = document.querySelector('.request-popup__wrapper')
    const closeBtn = document.querySelector('.request-popup__close-btn')
    const forms = document.querySelectorAll('form')

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

    forms.forEach(form => {
        const formOkBtn = form.querySelector('.form-success__btn')
        formOkBtn.addEventListener('click', () => {
            const formMessage = form.querySelector('.form-success')
            formMessage.classList.add('form-success--hidden')
        })

        form.addEventListener('submit',(e) => {
            e.preventDefault()
            const data = new FormData(e.target)
            data.set('submit','1')

            const formMessage = e.target.querySelector('.form-success')
        
            fetch('https://дизайнштор.рус/request.php',{
                method: 'POST',
                body: data
            })
                .then(resp => {
                    if(resp.status){
                        formMessage.classList.remove('form-success--hidden')
                    }
                })
        })
    })
})