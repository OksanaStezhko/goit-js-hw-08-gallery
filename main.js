import gallery from "./gallery-items.js";

const galleryRef = document.querySelector(".gallery");
const modalRef = document.querySelector(".lightbox");
const modalOverleyRef = modalRef.querySelector(".lightbox__overlay");
const buttonCloseRef = document.querySelector(
  'button[data-action="close-lightbox"]'
);
const imageModalRef = modalRef.querySelector(".lightbox__image");

function createGallery( { preview, description, original },  idx) {
  const listRef = document.createElement("li");
  listRef.classList.add("gallery__item");

  const linkRef = document.createElement("a");
  linkRef.classList.add("gallery__link");

  const imgRef = document.createElement("img");
  imgRef.classList.add("gallery__image");
  imgRef.alt = description;
  imgRef.src = preview;
  imgRef.dataset.idx = idx;
  imgRef.dataset.source = original;

  listRef.append(linkRef);
  linkRef.append(imgRef);

  return listRef;
}

function checkKey(codeKey, value) {
  return codeKey === value;
}

function checkTag(nodeName, tag) {
  return nodeName === tag;
}

function setImageModal({ alt, source, idx }) {
  imageModalRef.src = source;
  imageModalRef.alt = alt;
  imageModalRef.dataset.currentIdx = idx;

}

function getIndexImageModal() {
  return Number(imageModalRef.dataset.currentIdx);
}

function clearImageModal() {
  imageModalRef.src = "";
  imageModalRef.alt = "";
  imageModalRef.dataset.currentIdx = "";
}

function openModal() {
  modalRef.classList.add("is-open");
}

function closeModal() {
  modalRef.classList.remove("is-open");
}

function onEscapePress({ code }) {
  if (!checkKey(code, "Escape")) {
    return;
  }
  closeModal();
  clearImageModal();
}

function addListeners(){
   window.addEventListener("keydown", onEscapePress);
   window.addEventListener("keydown", onArrowClick);
}

function removeListeners(){
  window.removeEventListener("keydown", onEscapePress);
  window.removeEventListener("keydown", onArrowClick);

}

function onCloseClick() {
  closeModal();
  clearImageModal();
  removeListeners();
}

function onArrowClick({ code }) {
  const arrayImages = [...galleryRef.querySelectorAll("img")];
  const currentIndex = getIndexImageModal();

  if (checkKey(code, "ArrowRight")) {
    if (currentIndex >= arrayImages.length - 1) {
      return;
    }
    const nextImage = arrayImages[currentIndex + 1];

    setImageModal({
      alt: nextImage.alt,
      source: nextImage.dataset.source,
      idx: currentIndex + 1,
    });
  }
  if (checkKey(code, "ArrowLeft")) {
    if (currentIndex <= 0) {
      return;
    }
    const previousImage = arrayImages[currentIndex - 1];

    setImageModal({
      alt: previousImage.alt,
      source: previousImage.dataset.source,
      idx: currentIndex - 1,
    });
  }
}

function onGalleryClick({ target: { nodeName, alt, dataset } }) {
  if (!checkTag(nodeName, "IMG")) {
    return;
  }
  openModal();
  setImageModal({ alt, source: dataset.source, idx: dataset.idx });
  addListeners();
}

galleryRef.append(...gallery.map((elem, index) => createGallery(elem, index)));
galleryRef.addEventListener("click", onGalleryClick);
buttonCloseRef.addEventListener("click", onCloseClick);
modalOverleyRef.addEventListener("click", onCloseClick);
