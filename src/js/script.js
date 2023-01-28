$(function() {
    //=include header.js

    //=include heroSlider.js

    //=include news.js

    // accordeon
    $('.faq__item').on('click', function() {
        $(this).siblings().removeClass('faq-menu--opened')
        $(this).toggleClass('faq-menu--opened')
    })

    $('#phone').mask("+7 (999) 999-9999")

    
    if (window.matchMedia('(max-width: 767px)')) {

        $('.header__drawer').on('click', function(e) {
            if (e.target == document.querySelector('.header__drawer')) {
                $('body').removeClass('body--active')
            }
        })

        $('.header__link').on('click', function() {
            $(this).toggleClass('header__link--active')
        })

        $('.header__burger').on('click', function() {
            $('body').toggleClass('body--active')
        })
    } 

})
    