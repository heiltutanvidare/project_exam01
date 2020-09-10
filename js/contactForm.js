// Select the contact form
const contactForm = document.querySelector("#contact__form");

// Select all the inputs
const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const email = document.querySelector("#email");
const phone = document.querySelector("#phone");
const msg = document.querySelector("#msg");

// Select all the error messages on the inputs
const firstNameError = document.querySelector("#firstNameError");
const lastNameError = document.querySelector("#lastNameError");
const emailError = document.querySelector("#emailError");
const phoneError = document.querySelector("#phoneError");
const msgError = document.querySelector("#msgError");

// Selec the message to display when form is sent
const submitMsg = document.querySelector(".submitMsg");

// Set initial validation status
firstNameValid = false;
lastNameValid = false;
emailValid = false;
phoneValid = false;
msgValid = false;

// Function to validate all the fields in the form before submitting
function validateForm() {
    event.preventDefault();

    if (checkLength(firstName.value, 2)) {
        firstNameError.style.display = "none";
        firstNameValid = true;
    } else {
        firstNameError.style.display = "block";
    }

    if (checkLength(lastName.value, 4)) {
        lastNameError.style.display = "none";
        lastNameValid = true;
    } else {
        lastNameError.style.display = "block";
    }

    if (checkEmail(email.value)) {
        emailError.style.display = "none";
        emailValid = true;
    } else {
        emailError.style.display = "block";
    }

    if (checkLength(phone.value, 7)) {
        phoneError.style.display = "none";
        phoneValid = true;
    } else {
        phoneError.style.display = "block";
    }

    if (checkLength(msg.value, 3)) {
        msgError.style.display = "none";
        msgValid = true;
    } else {
        msgError.style.display = "block";
    }

    // If all fields are valid, display success message
    if (
        (firstNameValid === true) &
        (lastNameValid === true) &
        (emailValid === true) &
        (phoneValid === true) &
        (msgValid === true)
    ) {
        submitMsg.classList.add("sent");
    }
}

// Clicking submit on the form will
// run the function to validate the form
contactForm.addEventListener("submit", validateForm);

// Reusable function to trim an input and check its length
function checkLength(value, length) {
    if (value.trim().length > length) {
        return true;
    } else {
        return false;
    }
}

// Function to check if the email value is valid
function checkEmail(email) {
    const regex = /\S+@\S+\.\S+/;
    const isEmail = regex.test(email);
    return isEmail;
}
