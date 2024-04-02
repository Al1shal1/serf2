const width = (item) => {
    let reqItemWidth = 0;
    const screenWidth = $(window).width();
    const container = item.closest(".product-menu__list");
    const slidersBlocks= container.find(".product-menu__slide");
    const slidersWidth = slidersBlocks.width() * slidersBlocks.length;

    const textContainer = item.find(".product-menu__container");
    const paddingLeft = parseInt(textContainer.css("padding-left"));
    const paddingRight = parseInt(textContainer.css("padding-right"));

    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    if(isMobile){
        reqItemWidth = screenWidth - slidersWidth;
    }else {
        reqItemWidth = 525;
    }

    return {
        container : reqItemWidth,
        textContainer: reqItemWidth - paddingLeft - paddingRight
    }
}

const closeEveryItemInContainer = container =>{
    const items = container.find(".product-menu__item");
    const content = container.find(".product-menu__content");

    items.removeClass("product-menu__item--active");
    content.width(0);
}

const openObj = (item) =>{
    const hiddenContent = item.find(".product-menu__content");
    const reqWidth = width(item);
    const textBlock = item.find(".product-menu__container")

    item.addClass("product-menu__item--active");
    hiddenContent.width(reqWidth.container);
    textBlock.width(reqWidth.textContainer);
}
$(".product-menu__slide").on("click", (e) => {
e.preventDefault();

const $this = $(e.currentTarget);
const item = $this.closest(".product-menu__item");
const itemOpened = item.hasClass("product-menu__item--active");
const container = $this.closest(".product-menu__list");

if (itemOpened){
closeEveryItemInContainer(container);
}else {
    closeEveryItemInContainer(container);
    openObj(item);
}

});