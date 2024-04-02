const burger = document.querySelector('.hamburger');
const overlay = document.querySelector('.overlay')
const body = document.querySelector('body')

const links = document.querySelectorAll('.overlay .menu__title'); [1,2,3,4,5,6,7]

links.forEach(function (e){
    e.addEventListener('click', switchMenu );
});

function switchMenu(e){
    e.preventDefault();
    burger.classList.toggle('hamburger--active');
    overlay.classList.toggle('overlay--active');
    body.classList.toggle('body--active');
}
burger.addEventListener('click', switchMenu);


///////////////reviews
const findBlockByName = (name) =>{
    return $('.reviews__item').filter((ndx, item) =>{
    return $(item).attr('data-with')==name;
    });
}


$('.reviews__photo-link').click(e =>{
    e.preventDefault();

    const $this = $(e.currentTarget);
    const target = $this.attr('data-photo');
    const itemVisible = findBlockByName(target);
    const curItem = $this.closest('.reviews__photo-item');

    itemVisible.addClass('reviews__item--active').siblings().removeClass('reviews__item--active');
    curItem.addClass('reviews__photo-item--active').siblings().removeClass('reviews__photo-item--active');
})