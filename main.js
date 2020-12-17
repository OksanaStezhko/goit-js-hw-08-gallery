import gallery from "./gallery-items.js";

const galleryArray = [...gallery];

const galleryRef = document.querySelector(".gallery");
const modalRef = document.querySelector(".lightbox");
const modalOverleyRef = modalRef.querySelector(".lightbox__overlay");
const buttonCloseRef = document.querySelector(
  'button[ data-action="close-lightbox"]'
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

galleryRef.append(...gallery.map((elem, index) => createGallery(elem, index)));

function checkKey(codeKey, value) {
  return codeKey === value;
}

function checkTag(nodeName, tag) {
  return nodeName === tag;
}

function setImageModalWindow({ alt, dataset: { source, idx } }) {
  imageModalRef.src = source;
  imageModalRef.alt = alt;
  imageModalRef.dataset.currentIdx = idx;
}

function clearImageModalWindow() {
  imageModalRef.src = "";
  imageModalRef.alt = "";
  imageModalRef.dataset.currentIdx = "";
}

function removeEscapeListener() {
  window.removeEventListener("keydown", onEscapePress);
}
function closeModal() {
  modalRef.classList.remove("is-open");
  clearImageModalWindow();
  removeEscapeListener();
}

function onEscapePress(event) {
  if (!checkKey(event.code, "Escape")) {
    return;
  }
  closeModal();
}

function onButtonCloseClick() {
  closeModal();
}

function onModalOverleyClick() {
  closeModal();
}

function onGalleryClick({ target: tagClick }) {
  if (!checkTag(tagClick.nodeName, "IMG")) {
    return;
  }

  modalRef.classList.add("is-open");
  window.addEventListener("keydown", onEscapePress);

  setImageModalWindow(tagClick);

  // window.addEventListener('keydown', event => {
  // 	onArrowClick(event, imageModalRef);
  // });
}

galleryRef.addEventListener("click", onGalleryClick);
buttonCloseRef.addEventListener("click", onButtonCloseClick);
modalOverleyRef.addEventListener("click", onModalOverleyClick);
// function onArrowClick(event, img) {
// 	console.log(img);
// 	const { currentIdx } = img.dataset;
// 	console.log(currentIdx);

// 	if (event.code === 'ArrowRight') {
// 		const nextIdx = Number(currentIdx) + 1;
// 		console.log(nextIdx);
// 		img.src = galleryArray[nextIdx].original;
// 	}
// 	if (event.code === 'ArrowLeft') {
// 		if (currentIdx === 0) {
// 			return;
// 		}
// 		const preIdx = Number(currentIdx - 1);
// 		img.src = galleryArray[preIdx].original;
// 	}
// }
