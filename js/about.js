// About page: simple check on the contact form (nothing is really sent).

var contactForm = document.getElementById("contact-form");
var contactSuccess = document.getElementById("contact-success");

function setContactError(fieldId, message) {
  document.getElementById(fieldId + "-error").textContent = message;
  document.getElementById(fieldId).classList.toggle("input-error", message !== "");
}

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();
  var valid = true;

  var name = document.getElementById("contact-name").value.trim();
  var email = document.getElementById("contact-email").value.trim();
  var message = document.getElementById("contact-message").value.trim();

  if (name.length < 2) {
    setContactError("contact-name", "Please enter your name.");
    valid = false;
  } else {
    setContactError("contact-name", "");
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setContactError("contact-email", "Please enter a valid email address.");
    valid = false;
  } else {
    setContactError("contact-email", "");
  }

  if (message.length < 10) {
    setContactError("contact-message", "Your message should be at least 10 characters.");
    valid = false;
  } else {
    setContactError("contact-message", "");
  }

  if (valid) {
    contactForm.reset();
    contactSuccess.hidden = false;
  } else {
    contactSuccess.hidden = true;
  }
});
