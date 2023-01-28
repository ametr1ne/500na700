// squeeze header
$(window).scroll(function() {
    if ($(this).scrollTop() > 1) {
        $('.header').addClass('header--squeeze')
    } else {
        $('.header').removeClass('header--squeeze')
    }
})