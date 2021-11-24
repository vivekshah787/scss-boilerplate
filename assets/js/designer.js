//OWl carousel JS Start
var owl = $('.module-carousel').owlCarousel({
    animateOut: 'slideOutDown',
    animateIn: 'flipInX',
    items:1,
    margin:0,
    stagePadding:0,
    smartSpeed:450,
    // loop: true,
    dots: true,
    nav:true,
    // autoplay: true,
});
// Clone dots into slide
var dots = $('.owl-dots');
$('.hero-content').after(dots.clone().addClass('owl-dot-clone'));
// dots.hide(); // hide orginal dots

// Set active
owl.on('changed.owl.carousel', function (event) {
    var index = event.page.index;
    $('.owl-dot-clone .owl-dot', this).removeClass('active');
    $('.owl-dot-clone', this).each(function () {
        $('.owl-dot', this).eq(index).addClass('active');
    })    
});

// Create on click event for clone
$('.owl-dot-clone .owl-dot').on('click', function () {
    var owl = $(this).closest('.hero-carousel');
    owl.trigger('to.owl.carousel', [$(this).index(), 300]);
});

//OWl carousel JS End

  /* End */
