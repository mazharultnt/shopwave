// Home page: category cards, featured products and the newsletter form.

var categoryGrid = document.getElementById("category-grid");
var featured = document.getElementById("featured-products");

categories.forEach(function (name) {
  var count = products.filter(function (p) {
    return p.category === name;
  }).length;

  categoryGrid.innerHTML +=
    '<a class="category-card" href="shop.html?category=' + name + '">' +
    name +
    "<small>" + count + " products</small>" +
    "</a>";
});

// Show the first four products as "featured"
featured.innerHTML = products
  .slice(0, 4)
  .map(productCardHTML)
  .join("");
listenForAddButtons(featured);

// Newsletter form (nothing is really sent, this is a practice project)
var newsletterForm = document.getElementById("newsletter-form");
var newsletterEmail = document.getElementById("newsletter-email");
var newsletterMessage = document.getElementById("newsletter-message");

newsletterForm.addEventListener("submit", function (event) {
  event.preventDefault();
  var email = newsletterEmail.value.trim();
  var looksValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!looksValid) {
    newsletterMessage.textContent = "Please enter a valid email address.";
    return;
  }
  newsletterMessage.textContent = "Thanks for signing up!";
  newsletterForm.reset();
});
