import 'owl.carousel/dist/assets/owl.carousel.min.css'
import 'owl.carousel'

$(document).ready(function(){
    document.querySelectorAll('.slider__wrapper').forEach(element => {
        var owl = $($(element).find('.owl-carousel')[0]);
        owl.owlCarousel({
            margin: 20,
            nav: false,
            dots: false,
            loop: true,
            responsive: {
                0: {
                    items: 1
                },
                1080: {
                    autoWidth: true,
                    items: 2
                }
            }
        });

        $(element).find('.slider-prev')[0].addEventListener('click',function () {
            owl.trigger('prev.owl.carousel');
        })

        $(element).find('.slider-next')[0].addEventListener('click',function () {
            owl.trigger('next.owl.carousel');
        })

        owl.on('initialized.owl.carousel changed.owl.carousel', function(event) {
            let carousel = event.relatedTarget

            $($(element).find('.slider__number')[0]).text(carousel.relative(carousel.current()) + 1 + '/' + carousel.items().length);
        })
    })
});