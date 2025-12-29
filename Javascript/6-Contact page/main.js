const form = document.getElementById("contactForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const successMessage = document.getElementById("successMessage");
const nameError = nameInput.nextElementSibling;
const emailError = emailInput.nextElementSibling;
const messageError = messageInput.nextElementSibling;

form.addEventListener("submit", function (event) {
  event.preventDefault();
  let isValid = true;
  // Reset messages
  [nameError, emailError, messageError].forEach((error) => {
    error.textContent = "";
    error.classList.add("hidden");
  });
  successMessage.classList.add("hidden");

  // Validate Name
  if (nameInput.ariaValueMax.trim() === "") {
    nameError.textContent = "Name is required.";
    nameError.classList.remove("hidden");
    isValid = false;
  }
  // Validate Email
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (emailInput.value.trim() === "") {
    emailError.textContent = "Email is required.";
    emailError.classList.remove("hidden");
    isValid = false;
  } else if (!emailInput.value.match(emailPattern)) {
    emailError.textContent = "Please enter a valid email address.";
    emailError.classList.remove("hidden");
    isValid = false;
  }
  // Validate Message
  if (messageInput.value.trim().length < 10) {
    messageError.textContent = "Message must be at least 10 characters long.";
    messageError.classList.remove("hidden");
    isValid = false;
  }

  //Success Message
  if (isValid) {
    successMessage.textContent =
      "Thank you! Your message has been sent successfully.";
    successMessage.classList.remove("hidden");
    form.reset();
  }
  // Hide success message after 5 seconds
  setTimeout(() => {
    successMessage.classList.add("hidden");
  }, 5000);

  setTimeout(() => {
    nameError.classList.add("hidden");
    emailError.classList.add("hidden");
    messageError.classList.add("hidden");
  }, 3000);
});
