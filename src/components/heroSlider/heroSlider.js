// header slider
const slider = tns({
    container: '.slider',
    startIndex: 1,
    center: true,
    gutter: 20,
    mouseDrag: true,
    nav: false,
    controlsPosition: 'bottom',
    prevButton: '.prev',
    nextButton: '.next',
    responsive: {
        320: {
            edgePadding: 15
        },
        767: {
            edgePadding: 100
        }
    }
});