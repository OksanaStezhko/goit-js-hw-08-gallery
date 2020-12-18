import gallery from "./gallery-items.js";

const galleryRef = document.querySelector(".gallery");
const modalRef = document.querySelector(".lightbox");
const modalOverleyRef = modalRef.querySelector(".lightbox__overlay");
const buttonCloseRef = document.querySelector(
  'button[data-action="close-lightbox"]'
);
const imageModalRef = modalRef.querySelector(".lightbox__image");

function createGallery(
  { preview: src, description: alt, original: source },
  idx
) {
  const listRef = document.createElement("li");
  listRef.classList.add("gallery__item");

  const linkRef = document.createElement("a");
  linkRef.classList.add("gallery__link");

  const imgRef = document.createElement("img");
  imgRef.classList.add("gallery__image");
  imgRef.alt = alt;
  imgRef.src = src;
  imgRef.dataset.idx = idx;
  imgRef.dataset.source = source;

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
  console.log(imageModalRef.dataset.currentIdx);

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
  clearImageModal();
}

function onEscapePress({ code }) {
  if (!checkKey(code, "Escape")) {
    return;
  }
  closeModal();
}

function addEscapeListener() {
  window.addEventListener("keydown", onEscapePress);
}

function removeEscapeListener() {
  window.removeEventListener("keydown", onEscapePress);
}

function onCloseClick() {
  closeModal();
  removeEscapeListener();
}

function onArrowClick(event, currentIndex, array) {
  event.preventDefault();
  const { code } = event;


  if (checkKey(code, "ArrowRight")) {
    if (currentIndex >= array.length - 1) {
      return;
    }
    const nextImage = array[currentIndex + 1];

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
    const previousImage = array[currentIndex - 1];

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
  addEscapeListener();

  setImageModal({ alt, source: dataset.source, idx: dataset.idx });

  const imagesGallery = [...this.querySelectorAll("img")];

  window.addEventListener("keydown", (event) => {
    onArrowClick(event, getIndexImageModal(), imagesGallery);
  });
}
galleryRef.append(...gallery.map((elem, index) => createGallery(elem, index)));
galleryRef.addEventListener("click", onGalleryClick);
buttonCloseRef.addEventListener("click", onCloseClick);
modalOverleyRef.addEventListener("click", onCloseClick);
