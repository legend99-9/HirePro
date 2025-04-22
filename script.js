<script src="script.js"></script>

// script.js

// --- Utility Functions ---
const getElement = (selector) => document.querySelector(selector);
const getElements = (selector) => document.querySelectorAll(selector);

const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const loadFromLocalStorage = (key) => {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : null;
};

// --- Back to Top Button ---
const backToTopButton = getElement("#backToTop");

const toggleBackToTopButton = () => {
  backToTopButton.style.display =
    document.body.scrollTop > 100 || document.documentElement.scrollTop > 100
      ? "block"
      : "none";
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

window.onscroll = toggleBackToTopButton;
backToTopButton.addEventListener("click", scrollToTop);

// --- Language Toggle ---
const languageToggle = getElement("#languageToggle");

const updateTextContent = (selector, newText) => {
  const element = getElement(selector);
  if (element) {
    element.textContent = newText;
  }
};

const toggleLanguage = () => {
  const isEnglish = document.documentElement.lang === "en";
  document.documentElement.lang = isEnglish ? "ar" : "en";

  languageToggle.textContent = isEnglish ? "English" : "Arabic";
  updateTextContent("h2", isEnglish ? "إضافة وظيفة جديدة" : "Add a New Job");
  updateTextContent(
    "button[type='submit']",
    isEnglish ? "إضافة" : "Add"
  );
};

languageToggle.addEventListener("click", toggleLanguage);

// --- User Authentication ---
let users = loadFromLocalStorage("users") || [];

const signupForm = getElement("#signupForm");
const loginForm = getElement("#loginForm");

const handleSignup = (e) => {
  e.preventDefault();
  const username = e.target.username.value;
  const email = e.target.email.value;
  const password = e.target.password.value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  users.push({ username, email, password });
  saveToLocalStorage("users", users);
  alert("Account created successfully! You can now log in.");
  window.location.href = "login.html";
};

const handleLogin = (e) => {
  e.preventDefault();
  const email = e.target.email.value;
  const password = e.target.password.value;

  const user = users.find((u) => u.email === email && u.password === password);
  if (user) {
    alert(`Welcome, ${user.username}! You have logged in successfully.`);
    saveToLocalStorage("loggedInUser", user);
    window.location.href = "upload-job.html";
  } else {
    alert("Sorry, the email or password is incorrect.");
  }
};

const logout = () => {
  localStorage.removeItem("loggedInUser");
  alert("You have logged out successfully.");
  window.location.href = "login.html";
};

if (signupForm) signupForm.addEventListener("submit", handleSignup);
if (loginForm) loginForm.addEventListener("submit", handleLogin);

// --- Job Management ---
let jobs = loadFromLocalStorage("jobs") || [];

const jobForm = getElement("#jobForm");
const jobsList = getElement("#jobsList");

const handleJobSubmission = (e) => {
  e.preventDefault();
  const jobTitle = e.target.jobTitle.value;
  const jobDescription = e.target.jobDescription.value;
  const companyName = e.target.companyName.value;

  jobs.push({ jobTitle, jobDescription, companyName });
  saveToLocalStorage("jobs", jobs);
  alert("Job added successfully!");
  e.target.reset(); // Clear the form
};

const displayJobs = () => {
  if (!jobsList) return;
  jobsList.innerHTML = ""; // Clear existing list
  jobs.forEach((job) => {
    const li = document.createElement("li");
    li.innerHTML = `<h3>${job.jobTitle}</h3><p>${job.jobDescription}</p><p><strong>${job.companyName}</strong></p>`;
    jobsList.appendChild(li);
  });
};

if (jobForm) jobForm.addEventListener("submit", handleJobSubmission);
displayJobs();

// --- User Greeting ---
const displayLoggedInUser = () => {
  const loggedInUser = loadFromLocalStorage("loggedInUser");
  if (loggedInUser) {
    document.body.insertAdjacentHTML(
      "afterbegin",
      `<h1>Welcome, ${loggedInUser.username}!</h1>`
    );
  } else if (window.location.pathname.includes("upload-job.html")) {
    alert("Please log in first.");
    window.location.href = "login.html";
  }
};

displayLoggedInUser();

// --- Form Switching (Sign-up / Login) ---
const showLoginButton = getElement("#showLogin");
const showSignupButton = getElement("#showSignup");
const signupFormContainer = getElement("#signupFormContainer");
const loginFormContainer = getElement("#loginFormContainer");

const showLoginForm = (e) => {
  e.preventDefault();
  signupFormContainer.style.display = "none";
  loginFormContainer.style.display = "block";
};

const showSignupForm = (e) => {
  e.preventDefault();
  loginFormContainer.style.display = "none";
  signupFormContainer.style.display = "block";
};

if (showLoginButton) showLoginButton.addEventListener("click", showLoginForm);
if (showSignupButton) showSignupButton.addEventListener("click", showSignupForm);

// --- Dark Mode ---
const themeToggle = getElement("#themeToggle");
const darkModeClass = "dark-mode";

const enableDarkMode = () => {
  document.body.classList.add(darkModeClass);
  saveToLocalStorage("darkMode", true);
};

const disableDarkMode = () => {
  document.body.classList.remove(darkModeClass);
  saveToLocalStorage("darkMode", false);
};

const toggleDarkMode = () => {
  document.body.classList.contains(darkModeClass)
    ? disableDarkMode()
    : enableDarkMode();
};

themeToggle.addEventListener("click", toggleDarkMode);

// Load saved dark mode preference
loadFromLocalStorage("darkMode") === true ? enableDarkMode() : disableDarkMode();
app.get('/index2', (req, res) => {
  res.sendFile(__dirname + '/views/index2.html');
});
// Show/Hide Password Toggle
document.querySelectorAll('.toggle-password').forEach(btn => {
  btn.addEventListener('click', function() {
    const target = document.getElementById(this.dataset.target);
    if (target.type === 'password') {
      target.type = 'text';
      this.textContent = '🙈';
    } else {
      target.type = 'password';
      this.textContent = '👁️';
    }
  });
});

// Password Strength Meter
const passwordInput = document.getElementById('signupPassword');
const strengthBar = document.getElementById('passwordStrengthBar');
if (passwordInput) {
  passwordInput.addEventListener('input', function() {
    const val = passwordInput.value;
    let strength = 0;
    if (val.length > 7) strength++;
    if (/[A-Z]/.test(val)) strength++;
    if (/[0-9]/.test(val)) strength++;
    if (/[^A-Za-z0-9]/.test(val)) strength++;
    let width = strength * 25;
    let color = ['#f44336', '#ff9800', '#ffeb3b', '#4caf50'][strength-1] || '#f44336';
    strengthBar.style.width = width + '%';
    strengthBar.style.background = color;
  });
}

// Inline Validation
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function validateUsername(username) {
  return username.length >= 3;
}
function validatePassword(password) {
  return password.length >= 8;
}
document.getElementById('signupUsername').addEventListener('input', function() {
  document.getElementById('signupUsernameError').textContent = 
    validateUsername(this.value) ? '' : 'Username must be at least 3 characters.';
});
document.getElementById('signupEmail').addEventListener('input', function() {
  document.getElementById('signupEmailError').textContent = 
    validateEmail(this.value) ? '' : 'Invalid email format.';
});
document.getElementById('signupPassword').addEventListener('input', function() {
  document.getElementById('signupPasswordError').textContent = 
    validatePassword(this.value) ? '' : 'Password must be at least 8 characters.';
});
document.getElementById('signupConfirmPassword').addEventListener('input', function() {
  document.getElementById('signupConfirmPasswordError').textContent = 
    this.value === document.getElementById('signupPassword').value ? '' : 'Passwords do not match.';
});

// Success/Error Messages & Loading Spinner
document.getElementById('signupForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const username = document.getElementById('signupUsername').value;
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;
  const confirmPassword = document.getElementById('signupConfirmPassword').value;
  let valid = true;

  if (!validateUsername(username)) {
    document.getElementById('signupUsernameError').textContent = 'Username must be at least 3 characters.';
    valid = false;
  }
  if (!validateEmail(email)) {
    document.getElementById('signupEmailError').textContent = 'Invalid email format.';
    valid = false;
  }
  if (!validatePassword(password)) {
    document.getElementById('signupPasswordError').textContent = 'Password must be at least 8 characters.';
    valid = false;
  }
  if (password !== confirmPassword) {
    document.getElementById('signupConfirmPasswordError').textContent = 'Passwords do not match.';
    valid = false;
  }
  if (!valid) return;

  document.getElementById('signupLoading').style.display = 'block';
  document.getElementById('signupMessage').textContent = '';
  // Simulate AJAX
  setTimeout(() => {
    document.getElementById('signupLoading').style.display = 'none';
    document.getElementById('signupMessage').style.color = '#4caf50';
    document.getElementById('signupMessage').textContent = 'Sign up successful!';
    // Optionally reset form here
    // document.getElementById('signupForm').reset();
    strengthBar.style.width = '0';
  }, 1500);
});
