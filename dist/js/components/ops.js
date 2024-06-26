let onePageScroll = () =>{
    const wrapper = document.querySelector('.wrapper');
    const content = wrapper.querySelector('.main-content');
    const pages = content.querySelectorAll('.section');
    const points = document.querySelectorAll('.fixed-menu__item');
    const dataScrollto = document.querySelectorAll('[data-scroll-to]');
    
    const fixlist = document.querySelector('.fixed-menu__list');

    let inScroll = false;
    
    addNavigation();
    wheel();
    keyPush();
    
    //   функция прокрутки к нужной странице
    function doTransition(pageNumber){
        const position  = `${pageNumber * (-100)}%`;
        
        if(inScroll) return;
        
        inScroll = true;
        
        addClass(pages);
        
        content.style.transform = `translateY(${position})`;
        
        setTimeout(() => {
        inScroll = false;
        addClass(points);
        }, 1000); //transition + 300(инерция скролла)
        
        function addClass(arr){
        arr[pageNumber].classList.add('is-active');
        
        for(const item of arr){
            if(item != arr[pageNumber]){
            item.classList.remove('is-active');
            }
        }
        }
    }
    
    // функция навигации по клику data-scroll
    function addNavigation(){
        for(const point of dataScrollto){
        point.addEventListener('click' , e=>{
            e.preventDefault();
            doTransition(point.dataset.scrollTo);
        })
        }
    }
    
    // функция работы с колесиком мышки
    function wheel() {
        document.addEventListener('wheel', e => {
        const direct = e.deltaY > 0 ? 'up' : 'down';
        
        scrollToPage(direct);
        })
    }
    
    // функция отработки нажатия стрелочек на клавиатуре
    function keyPush() {
        document.addEventListener('keydown', e => {
        switch (e.keyCode) {
            case 40:
            scrollToPage('up');
            break;
            case 38:
            scrollToPage('down');
            break;
            default:
            break;
        }
        })
    }
    
    // функция определения нужной страницы нам и навешивает класс активный
    function definePage(arr){
        for (let i = 0; i < arr.length; i++) {
        let iter = arr[i];
        if (iter.classList.contains('is-active')){
            return {
            iterIndex: i,
            iterActive: iter,
            iterNext: iter.nextElementSibling,
            iterPrev: iter.previousElementSibling,
                }
            }   
        };
    }
    
    
    // функция определяет куда скроли полльзователь и вызывает doTransition
    function scrollToPage(direct){
        let page = definePage(pages);

        const data = page.iterActive.dataset.color;

        if(data == "white"){
            fixlist.classList.add("fixed-menu__list--shadow");

        }else{
            fixlist.classList.remove("fixed-menu__list--shadow");
        }


        if (direct === 'up' && page.iterNext) {
        let numPage = page.iterIndex + 1;
        doTransition(numPage);
        }
    
        if (direct === 'down' && page.iterPrev) {
        let numPage = page.iterIndex - 1;
        doTransition(numPage);
        }
    }


//mobile-ops

const md = new MobileDetect(window.navigator.userAgent);
const isMobile = md.mobile()
    
$(".wrapper").on("touchmove", e =>{
    e.preventDefault();
})

if(isMobile){
    $(function() {      
        //Enable swiping...
        $("body").swipe( {
            swipe: function(
                event, 
                direction,
            ) {
                if (direction == "up") scrollToPage('up');
                if (direction == "down") scrollToPage('down');
            },
        });
        });
}

    }
    
    onePageScroll();
    
