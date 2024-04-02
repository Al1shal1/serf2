const slider = $(".slider__list").bxSlider({
    pager: false,
    controls:false
});

$('.slider__switch--left').click(e =>{
    slider.goToPrevSlide();

})
$('.slider__switch--right').click(e =>{ 
    slider.goToNextSlide();

});