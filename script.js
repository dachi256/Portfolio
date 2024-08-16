function toggleMenu() { // function to toggle the menu
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
  }

  const typingName = document.getElementById('typing-name'); // get the element where the name will be typed
  const name = 'Dachi';
  let index = 0;
  let isDeleting = false;
  
  function typeNameEffect() { // function to type the name
    const cursor = document.createElement('span'); // create a cursor element
    cursor.classList.add('cursor'); // add a class to the cursor element
    cursor.innerHTML = '|'; // add a cursor symbol
    typingName.appendChild(cursor); // append the cursor to the typingName element
  
    if (index < name.length && !isDeleting) { // check if the name is still being typed
      typingName.innerHTML = name.slice(0, index + 1);
      index++;
      setTimeout(typeNameEffect, 200); // typing delay (in milliseconds)
    } else if (index === name.length && !isDeleting) {
      isDeleting = true;
      setTimeout(typeNameEffect, 2000); // delay before starting to delete the name
    } else if (isDeleting && index > 0) {
      typingName.innerHTML = name.slice(0, index - 1);
      index--;
      setTimeout(typeNameEffect, 100); // deleting delay (in milliseconds)
    } else {
      isDeleting = false;
      setTimeout(typeNameEffect, 2000); // delay before starting to type the name again
    }
  }
  
  typeNameEffect();

  const photos = [
    { url: './assets/photos1.jpg', description: 'Blue Sky Carousele' },
    { url: './assets/photos2.jpg', description: 'City Stranger' },
    { url: './assets/photos3.jpg', description: 'Liminal Lamp' },
    { url: './assets/photos4.jpg', description: 'Coney Island' },
    { url: './assets/photos5.jpg', description: 'Quieter Inside' },
    { url: './assets/photos6.jpg', description: 'Little Island' },
    { url: './assets/photos7.jpg', description: 'Purple Wings' },
    { url: './assets/photos8.jpg', description: 'Sunset in Tskneti' },
    { url: './assets/photos9.jpg', description: 'Lost in Golden Meadows' },
    { url: './assets/photos10.jpg', description: 'Through the Commute' },
    { url: './assets/photos11.jpg', description: 'October Leaves' },
    { url: './assets/photos12.jpg', description: 'Hiding Cat' },
    { url: './assets/photos13.jpg', description: 'Dumbo' },
    { url: './assets/photos14.jpg', description: 'Green Bicycle' },
    // Add more photo objects here
  ];
  
  function generateGalleryItems() {
    const galleryContainer = document.getElementById('gallery-container');
  
    photos.forEach((photo, index) => {
      const galleryItem = document.createElement('div');
      galleryItem.classList.add('gallery-item');
  
      const img = document.createElement('img');
      img.src = photo.url;
      img.alt = `Photo ${index + 1}`;
      img.classList.add('gallery-img');
  
      const overlay = document.createElement('div');
      overlay.classList.add('gallery-overlay');
  
      const overlayText = document.createElement('p');
      overlayText.classList.add('gallery-text');
      overlayText.textContent = photo.description;
  
      overlay.appendChild(overlayText);
      galleryItem.appendChild(img);
      galleryItem.appendChild(overlay);
      galleryContainer.appendChild(galleryItem);
    });
  }
  
  function enlargePhoto(event) {
    const clickedElement = event.target;
    const galleryItem = clickedElement.closest('.gallery-item');
    const photo = galleryItem.querySelector('.gallery-img');
  
    const enlargedPhoto = document.createElement('div');
    enlargedPhoto.classList.add('enlarged-photo');
  
    const enlargedImg = document.createElement('img');
    enlargedImg.src = photo.src;
    enlargedImg.alt = photo.alt;
  
    enlargedPhoto.appendChild(enlargedImg);
    document.body.appendChild(enlargedPhoto);
  
    setTimeout(() => {
      enlargedPhoto.classList.add('show');
    }, 0);
  
    enlargedPhoto.addEventListener('click', closeEnlargedPhoto);
  }
  
  function closeEnlargedPhoto(event) {
    const enlargedPhoto = event.target.closest('.enlarged-photo');
    if (enlargedPhoto) {
      enlargedPhoto.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(enlargedPhoto);
      }, 300);
    }
  }
  
  function attachGalleryListeners() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
      item.addEventListener('click', enlargePhoto);
    });
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    generateGalleryItems();
    attachGalleryListeners();
  });