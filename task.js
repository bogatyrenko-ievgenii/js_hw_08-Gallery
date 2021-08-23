import images from "./gallery-items.js";

//Объявление в DOM
const ulGalleryRef = document.querySelector('.js-gallery');
const ligthBoxRef = document.querySelector('.js-lightbox');
const ligthBoxOverlayRef = document.querySelector('.lightbox__overlay');
const ligthBoxImgRef = document.querySelector('.lightbox__image');
const ligthBoxButtonRef = document.querySelector('.lightbox__button');
const getArrPreview = [];
const dataSourceArr = [];

//FOREACH - основная функция - наполннение UL
images.forEach(img => {
    const newA = createTagA(img);
    const newImg = createTagImg(img);
    const newLi = createTagLI();
    createdataSourceArr(img);

    newA.append(newImg);
    newLi.append(newA);

    getArrPreview.push(newLi);
});

ulGalleryRef.append(...getArrPreview);


//Функции для наполнения UL, вызваются в FOREACH выше
function createTagA(item) {
    const newA = document.createElement('a');
    newA.classList.add('gallery__link');
    newA.setAttribute('href', item.preview);
    return newA;
}
function createTagImg(item) {
    const newImg = document.createElement('img');
    newImg.classList.add('gallery__image');
    newImg.setAttribute('src', item.preview);
    newImg.setAttribute('alt', item.description);
    newImg.setAttribute('data-source', item.original);
    return newImg;
}
function createTagLI() {
    const newLi = document.createElement('li');
    newLi.classList.add('gallery__item');
    return newLi;
}
function createdataSourceArr(item) {
    dataSourceArr.push(item.original);
}

//Обработчик событий - открытие картинки по клику
ulGalleryRef.addEventListener('click', (event) => {
    event.preventDefault();
    if (event.target.nodeName !== 'IMG') {
        return;
    }
    ligthBoxRef.classList.add('is-open');
    ligthBoxImgRef.setAttribute('src', event.target.dataset.source);
});

//Обработчик событий - закрытие или открытие другой картинки по нажатию на кнопку. НЕ ЗАКОНЧЕНО
ulGalleryRef.addEventListener('keydown', (event) => {
    if (event.code === 'Escape') {
        ligthBoxRef.classList.remove('is-open');
        ligthBoxImgRef.setAttribute('src', '');
    }
    // if (event.code === 'ArrowRight') {} надо доработать
});

//Обработчик событий - закрытие картинки по клику на кнопку
ligthBoxButtonRef.addEventListener('click', () => {
    ligthBoxRef.classList.remove('is-open');
    ligthBoxImgRef.setAttribute('src', '');
});

//Обработчик событий - закрытие картинки по клику вне
ligthBoxOverlayRef.addEventListener('click', () => {
    ligthBoxRef.classList.remove('is-open');
    ligthBoxImgRef.setAttribute('src', '');  
});


