// Select the newsletter signup button
const signup = document.getElementById("newsletterSubmit");

// Select the newsletter email input value
const emailField = document.getElementById("newsletterEmail");

// Select the submit messages
const successMsg = document.querySelector(".newsletter__signup__msg--success");
const failuresMsg = document.querySelector(".newsletter__signup__msg--failure");

// Set the inital display value of the messages
failuresMsg.style.display = "none";
successMsg.style.display = "none";

// Run the validation function when signup is clicked
signup.addEventListener("click", validateNewsletter);

function validateNewsletter() {
    // Prevent default form behavior
    event.preventDefault();

    // Display the correct error or success message when submitting the form
    if (validateEmail(emailField.value)) {
        failuresMsg.style.display = "none";
        successMsg.style.display = "block";
    } else {
        successMsg.style.display = "none";
        failuresMsg.style.display = "block";
    }
}

// Function to check if the email value is valid
function validateEmail(value) {
    const regex = /\S+@\S+\.\S+/;
    const isEmail = regex.test(value);
    return isEmail;
}
