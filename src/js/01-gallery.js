// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

console.log(galleryItems);

import SimpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";


const galleryContainer2 = document.querySelector('.gallery');
const gallerySet2 = createGallery2(galleryItems);


function createGallery2(galleryItems) {
  return galleryItems
 .map(
      ({ preview, original, description }) => {
        return `<li class="gallery__item">
   <a class="gallery__link" href="${original}">
      <img class="gallery__image" src="${preview}" alt="${description}" />
   </a>
</li>`})
  .join('');
}

galleryContainer2.insertAdjacentHTML('beforeend', gallerySet2);

new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  scrollZoomFactor: false,
});

