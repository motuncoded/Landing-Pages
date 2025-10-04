const signUpForm = document.getElementById("signUpForm");
const signUpMessage = document.getElementById("signUpMessage");

if (signUpForm) {
  signUpForm.addEventListener("submit", function (event) {
    event.preventDefault();
    signUpMessage.classList.add("hidden");

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword")
      ? document.getElementById("confirmPassword").value.trim()
      : null;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      (confirmPassword && password !== confirmPassword)
    ) {
      signUpMessage.textContent = "Please fill in all fields correctly.";
      signUpMessage.classList.remove("hidden");
      return;
    }

    if (password.length < 6) {
      signUpMessage.textContent =
        "Password must be at least 6 characters long.";
      signUpMessage.classList.remove("hidden");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      signUpMessage.textContent = "Please enter a valid email address.";
      signUpMessage.classList.remove("hidden");
      return;
    }

    if (firstName.length < 2 || lastName.length < 2) {
      signUpMessage.textContent =
        "First and Last names must be at least 2 characters long.";
      signUpMessage.classList.remove("hidden");
      return;
    }

    if (password !== confirmPassword) {
      signUpMessage.textContent = "Passwords do not match.";
      signUpMessage.classList.remove("hidden");
      return;
    }

    localStorage.setItem("firstName", firstName);
    localStorage.setItem("lastName", lastName);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);

    const existingEmail = localStorage.getItem("email");
    if (existingEmail === email) {
      signUpMessage.textContent = "User already exists. Please sign in.";
      signUpMessage.classList.remove("hidden");
      return;
    }

    signUpMessage.textContent = "Sign up successful! Redirecting...";

    setTimeout(() => {
      signUpMessage.classList.remove("hidden");
      window.location.href = "/2-Authetication/dashboard.html";
    }, 2000);
  });
}

const signInForm = document.getElementById("signInForm");
const signInMessage = document.getElementById("signInMessage");

if (signInForm) {
  signInForm.addEventListener("submit", function (event) {
    event.preventDefault();
    signInMessage.classList.add("hidden");

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");

    if (!email || !password) {
      signInMessage.textContent = "Please fill in all fields.";
      signInMessage.classList.remove("hidden");
      return;
    }

    if (email !== storedEmail || password !== storedPassword) {
      signInMessage.textContent = "Details do not match. Please try again.";
      signInMessage.classList.remove("hidden");
      return;
    }

    signInMessage.textContent = "Login successful! Redirecting...";
    signInMessage.classList.remove("hidden");

    setTimeout(() => {
      signInMessage.classList.remove("hidden");

      window.location.href = "/2-Authetication/dashboard.html";
    }, 2000);
  });
}

const userName = document.getElementById("userName");

const storedUserName = localStorage.getItem("firstName");
if (userName && storedUserName) {
  userName.textContent = storedUserName;
  userName.style.textTransform = "capitalize";
}
