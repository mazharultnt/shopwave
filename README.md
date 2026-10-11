# ShopWave

A small online store I built to practise HTML, CSS and JavaScript. There is no build step and no framework, just plain files.

## Pages

- `index.html` - home page with categories and featured products
- `shop.html` - all products with search, category filter and sorting
- `product.html` - one product (opened as `product.html?id=3`)
- `cart.html` - cart with quantity changes, remove and a promo code
- `checkout.html` - delivery form with validation
- `about.html` - about text and a contact form

## What it does

- The cart is saved in the browser (localStorage), so it stays after a refresh
- Promo code `WAVE10` gives 10% off
- Delivery is free over $100, otherwise $6
- Forms are checked in JavaScript. Nothing is sent anywhere, it is a practice project

## How to run

Just open `index.html` in a browser. Or, with VS Code, use the Live Server extension.

## Images

Put the pictures in the `images/` folder using the names listed in the image guide (`hero-banner.jpg`, `about-story.jpg`, `product-01.jpg` to `product-12.jpg`). If a picture is missing the page still works.

## Add a product

Open `js/products.js`, copy one product object, change the values and save.

Built with HTML5, CSS3 and vanilla JavaScript.
