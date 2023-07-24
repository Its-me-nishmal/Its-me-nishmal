'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}







// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}




document.getElementById('submit-form').addEventListener('submit', function (event) {
  // Prevent form submission before validation
  event.preventDefault();

  // Get form elements
  const nameInput = document.getElementsByName('name')[0];
  const placeInput = document.getElementsByName('place')[0];
  const numberInput = document.getElementsByName('number')[0];
  const emailInput = document.getElementsByName('email')[0];
  const messageInput = document.getElementsByName('message')[0];


  document.getElementById('submit-form').addEventListener('submit', function (event) {
    // Prevent form submission before validation
    event.preventDefault();

    if (!hasMinimumLetters(nameInput.value.trim(), 3)) {
      showModal('Name should have at least 3 letters and no digits or symbols.');
      nameInput.focus();
      return;
    }

    if (!hasMinimumLetters(placeInput.value.trim(), 3)) {
      showModal('Place should have at least 3 letters and no digits or symbols.');
      placeInput.focus();
      return;
    }

    if (!isValidPhoneNumber(numberInput.value.trim())) {
      showModal('Please enter a valid 10-digit phone number.');
      numberInput.focus();
      return;
    }

    if (!emailInput.value.trim() || !validateEmail(emailInput.value.trim())) {
      showModal('Please enter a valid email address.');
      emailInput.focus();
      return;
    }

    if (!messageInput.value.trim()) {
      showModal('Please enter your message.');
      messageInput.focus();
      return;
    }

    this.target = 'form-iframe'; // Set the target to the hidden iframe
    showSuccessAlert();
    this.submit();
  });

  // Show the modal with the given error message
  function showModal(message) {
    const modal = document.getElementById('error-modal');
    const modalMessage = document.getElementById('modal-message');
    modalMessage.textContent = message;

    // Show the modal
    modal.style.display = 'block';

    // Close the modal when the user clicks on the close button
    modal.getElementsByClassName('close')[0].onclick = function () {
      modal.style.display = 'none';
    };

    // Close the modal when the user clicks anywhere outside the modal content
    window.onclick = function (event) {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    };
  }
});

// Email validation function
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Check if a string has at least n letters and no digits or symbols
function hasMinimumLetters(str, n) {
  const lettersOnly = /^[a-zA-Z\s]*$/;
  return str.length >= n && lettersOnly.test(str);
}

// Validate if the phone number has exactly 10 digits
function isValidPhoneNumber(phone) {
  const digitsOnly = /^[0-9]*$/;
  return phone.length === 10 && digitsOnly.test(phone);
}
function handleFormSubmission() {
  showSuccessAlert();
}

// Function to show the success alert
function showSuccessAlert() {
  alert('Form submitted successfully!');
}
