//news slider

const news = tns({
        container: '.news',
        mouseDrag: true,
        nav: false,
        gutter: 20,
        controls: false,
        responsive: {
            320: {
                items: 1.5
            },
            460: {
                items: 2
            },
            768: {
                disable: true
            }
        }
    });
