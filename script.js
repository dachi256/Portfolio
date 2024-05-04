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


  