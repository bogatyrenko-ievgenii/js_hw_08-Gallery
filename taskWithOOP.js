import imagesArr from "./gallery-items.js";


class Gallery {
    constructor(gallery, modal, imageInModal, overlay) {
        this.gallery = gallery;
        this.modal = modal;
        this.imageInModal = imageInModal;
        this.overlay = overlay;

    }

    render(imagesArr) {
        imagesArr.forEach((imageObj => {
            const newA = this.createTagA(imageObj);
            const newLi = this.createTagLI(imageObj);
            const newImg = this.createTagImg(imageObj);

            newA.append(newImg);
            newLi.append(newA);

            this.gallery.append(newLi);
        }));
    }

    createTagA(item) {
        const newA = document.createElement('a');
        newA.classList.add('gallery__link');
        newA.setAttribute('href', item.preview);
        return newA;
    }

    createTagImg(item) {
        const newImg = document.createElement('img');
        newImg.classList.add('gallery__image');
        newImg.setAttribute('src', item.preview);
        newImg.setAttribute('alt', item.description);
        newImg.setAttribute('data-source', item.original);
        return newImg;
    }

    createTagLI() {
        const newLi = document.createElement('li');
        newLi.classList.add('gallery__item');
        return newLi;
    }
}

const newGallery = new Gallery(
    document.querySelector('.js-gallery'),
    document.querySelector('.js-lightbox'),
    document.querySelector('.lightbox__image'),
    document.querySelector('.lightbox__oberlay'),
);


const openModal = (event) => {
    event.preventDefault();
    if (event.target.nodeName !== 'IMG') {
        return;
    }
    newGallery.modal.classList.add('is-open');
    newGallery.imageInModal.setAttribute('src', event.target.dataset.source);
    window.addEventListener('click', clickBtn);
    window.addEventListener('keydown', pressEsc);
    window.addEventListener('click', clickBackDrop);
    window.addEventListener('keydown', pressArrowRight);
    window.addEventListener('keydown', pressArrowleft);
    // window.addEventListener('mouseover', (event) => {
    //     console.log(event.target.nodeName);
    // });
};

function closeModal (action, toDoFunction) {
    newGallery.modal.classList.remove('is-open');
    newGallery.imageInModal.setAttribute('src', '');
    window.removeEventListener(action, toDoFunction);
}

function clickBtn () {
    if (event.target.nodeName !== 'BUTTON') {return;}
    closeModal('click', clickBtn);
}

function pressEsc () {
    if (event.key !== 'Escape') {return;}
    closeModal('keydown', pressEsc);
}

function clickBackDrop () {
    if (event.target.nodeName !== 'DIV') {return;}
    closeModal('click', clickBackDrop);
}

function pressArrowRight () {
    if (event.key !== 'ArrowRight') {return;}
    // console.log(imagesArr);
    for (let i = 0; i < imagesArr.length; i += 1) {
        console.log(imagesArr[i].original);
        if (newGallery.imageInModal.src == imagesArr[i].original) {
            newGallery.imageInModal.src = imagesArr[i + 1].original;
            break;
        }
        
    }
    
}
function pressArrowleft () {
    if (event.key !== 'ArrowLeft') {return;}
    for (let i = 0; i < imagesArr.length; i += 1) {
        console.log(imagesArr[i].original);
        if (newGallery.imageInModal.src == imagesArr[i].original) {
            newGallery.imageInModal.src = imagesArr[i - 1].original;
            break;
        }
        
    }
}
//у функций преключения стрелками ошибка когда доходит до первой или последней, пока не разобрался как пофиксить
newGallery.render(imagesArr);
newGallery.gallery.addEventListener('click', openModal);