let myMap;

const init = () => {
myMap = new ymaps.Map("map", {
center: [55.750509 ,37.608841 ],
zoom: 15,
controls: []
});
var coords = [
[55.750509 ,37.608841 ]
];
var myCollection = new ymaps.GeoObjectCollection({}, {
    draggable: false,
    iconLayout: 'default#image',
    iconImageHref: './img/marker.png',
    iconImageSize: [58, 73],
    iconImageOffset: [-35, -52]

});

for (var i = 0; i < coords.length; i++) {
    myCollection.add(new ymaps.Placemark(coords[i]));
}

myMap.geoObjects.add(myCollection);

myMap.behaviors.disable('scrollZoom');

};

ymaps.ready(init);