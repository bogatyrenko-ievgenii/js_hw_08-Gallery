import imagesArr from "./gallery-items.js";


class Gallery {
    constructor(gallery, modal, imageInModal) {
        this.gallery = gallery;
        this.modal = modal;
        this.imageInModal = imageInModal;

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
);


const openModal = (event) => {
    event.preventDefault();
    if (event.target.nodeName !== 'IMG') {
        return;
    }

    newGallery.modal.classList.add('is-open');
    newGallery.imageInModal.style.width = '300px';
    newGallery.imageInModal.style.height = 'auto';
    newGallery.imageInModal.setAttribute('src', event.target.dataset.source);
    newGallery.modal.addEventListener('click', clickBtn);
    newGallery.modal.addEventListener('click', clickBackDrop);
    window.addEventListener('keydown', pressEsc);
    window.addEventListener('keydown', pressArrowRight);
    window.addEventListener('keydown', pressArrowleft);

};

const closeModal = (action, toDoFunction) => {
    newGallery.modal.classList.remove('is-open');
    newGallery.imageInModal.setAttribute('src', '');
    window.removeEventListener(action, toDoFunction);
};

const clickBtn = () => {
    if (event.target.nodeName !== 'BUTTON') {
        return;
    }
    closeModal('click', clickBtn);
};

const pressEsc = () => {
    if (event.key !== 'Escape') {
        return;
    }
    closeModal('keydown', pressEsc);
};

const clickBackDrop = () => {
    if (event.target.nodeName !== 'DIV') {
        return;
    }
    closeModal('click', clickBackDrop);
};

const pressArrowRight = () => {
    if (event.key !== 'ArrowRight') {
        return;
    }
    // console.log(imagesArr);
    for (let i = 0; i < imagesArr.length; i += 1) {
        if (newGallery.imageInModal.src === imagesArr[i].original) {
            newGallery.imageInModal.src = imagesArr[i + 1].original;
            break;
        }
    }
};

const pressArrowleft = () => {
    if (event.key !== 'ArrowLeft') {
        return;
    }
    
    for (let i = imagesArr.length - 1; i >= 0; i -= 1) {
        if (newGallery.imageInModal.src === imagesArr[i].original) {
            newGallery.imageInModal.src = imagesArr[i - 1].original;
            break;
        }
    }
};
    newGallery.render(imagesArr);
    newGallery.gallery.addEventListener('click', openModal);
