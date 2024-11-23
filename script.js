// Function to toggle the hamburger menu
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  
  // Prevent multiple clicks during animation
  if (menu.classList.contains('transitioning')) return;
  
  menu.classList.add('transitioning');
  menu.classList.toggle("open");
  icon.classList.toggle("open");
  
  // Remove transitioning class after animation completes
  setTimeout(() => {
    menu.classList.remove('transitioning');
  }, 300);
}

// Typing effect for the name
function typeNameEffect() {
  const typingName = document.getElementById('typing-name');
  if (!typingName) return; // Guard against missing element
  
  const name = 'Dachi';
  let index = 0;
  let isDeleting = false;
  let timeoutId;

  // Create cursor element once
  const cursor = document.createElement('span');
  cursor.classList.add('cursor');
  cursor.innerHTML = '|';
  typingName.appendChild(cursor);

  function type() {
    // Clear previous timeout to prevent memory leaks
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Set the text content (excluding cursor)
    typingName.textContent = name.slice(0, index);
    typingName.appendChild(cursor);

    if (index < name.length && !isDeleting) {
      index++;
      timeoutId = setTimeout(type, 200); // typing delay
    } else if (index === name.length && !isDeleting) {
      isDeleting = true;
      timeoutId = setTimeout(type, 2000); // delay before deleting
    } else if (isDeleting && index > 0) {
      index--;
      timeoutId = setTimeout(type, 100); // deleting delay
    } else {
      isDeleting = false;
      timeoutId = setTimeout(type, 2000); // delay before retyping
    }
  }

  // Start typing effect
  type();

  // Cleanup function
  return () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    if (cursor && cursor.parentNode) {
      cursor.parentNode.removeChild(cursor);
    }
  };
}

// Array of photos with their descriptions
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
];

// Function to generate gallery items
function generateGalleryItems() {
  const galleryContainer = document.getElementById('gallery-container');
  if (!galleryContainer) return;

  const fragment = document.createDocumentFragment(); // Use fragment for better performance

  photos.forEach((photo, index) => {
    const galleryItem = document.createElement('div');
    galleryItem.classList.add('gallery-item');

    const img = document.createElement('img');
    img.src = photo.url;
    img.alt = `Photo ${index + 1}`;
    img.classList.add('gallery-img');
    img.loading = 'lazy'; // Add lazy loading
    
    // Add error handling
    img.onerror = function() {
      this.style.display = 'none';
    };

    const overlay = document.createElement('div');
    overlay.classList.add('gallery-overlay');

    const overlayText = document.createElement('p');
    overlayText.classList.add('gallery-text');
    overlayText.textContent = photo.description;

    overlay.appendChild(overlayText);
    galleryItem.appendChild(img);
    galleryItem.appendChild(overlay);
    fragment.appendChild(galleryItem);
  });

  galleryContainer.appendChild(fragment);
}

// Function to handle photo enlargement
function enlargePhoto(event) {
  const clickedElement = event.target;
  const galleryItem = clickedElement.closest('.gallery-item');
  if (!galleryItem) return;

  const photo = galleryItem.querySelector('.gallery-img');
  if (!photo) return;

  const enlargedPhoto = document.createElement('div');
  enlargedPhoto.classList.add('enlarged-photo');

  const enlargedImg = document.createElement('img');
  enlargedImg.src = photo.src;
  enlargedImg.alt = photo.alt;

  enlargedPhoto.appendChild(enlargedImg);
  document.body.appendChild(enlargedPhoto);

  // Prevent body scrolling when photo is enlarged
  document.body.style.overflow = 'hidden';

  // Add show class after a brief delay to trigger animation
  requestAnimationFrame(() => {
    enlargedPhoto.classList.add('show');
  });

  enlargedPhoto.addEventListener('click', closeEnlargedPhoto);
}

// Function to close enlarged photo
function closeEnlargedPhoto(event) {
  const enlargedPhoto = event.target.closest('.enlarged-photo');
  if (!enlargedPhoto) return;

  enlargedPhoto.classList.remove('show');
  
  // Restore body scrolling
  document.body.style.overflow = '';

  // Remove element after animation completes
  setTimeout(() => {
    if (enlargedPhoto.parentNode) {
      document.body.removeChild(enlargedPhoto);
    }
  }, 300);
}

// Function to attach gallery listeners
function attachGalleryListeners() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach(item => {
    item.addEventListener('click', enlargePhoto);
  });
}

// Optimize iframe loading
function optimizeIframes() {
  const iframes = document.getElementsByTagName('iframe');
  
  Array.from(iframes).forEach(iframe => {
    iframe.loading = 'lazy';
    
    if (!iframe.title) {
      iframe.title = 'Interactive content';
    }
    
    iframe.onerror = function() {
      const container = this.parentElement;
      if (container) {
        container.style.display = 'none';
      }
    };
  });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  try {
    const cleanup = typeNameEffect();
    generateGalleryItems();
    attachGalleryListeners();
    optimizeIframes();

    // Cleanup on page unload
    window.addEventListener('unload', cleanup);

    // Add smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          // Close hamburger menu if open
          const menu = document.querySelector(".menu-links");
          const icon = document.querySelector(".hamburger-icon");
          if (menu.classList.contains("open")) {
            toggleMenu();
          }
        }
      });
    });

  } catch (error) {
    console.error('Initialization error:', error);
  }
});