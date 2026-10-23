# Documentation draft for Corpuz & Volante E-Commerce

Copy these sections into the official Google Classroom documentation template. Do not submit this markdown file in place of the official template.

## 1. Title of the project

Corpuz & Volante E-Commerce (React remake)

## 2. Objectives

- Rebuild the old static HTML store as a role-based frontend ecommerce website.
- Provide separate customer and seller experiences after login.
- Demonstrate cart, wishlist, orders, and simulated product management without a database.
- Apply consistent UI/UX, navigation, and responsive layout for desktop, tablet, and mobile.

## 3. Description of the system

Corpuz & Volante is a frontend ecommerce demo. Users log in with hard-coded credentials. The system detects the account role and opens either the customer store or the seller workspace. Product, cart, wishlist, and order data are stored in browser local storage so add-to-cart, checkout, and product CRUD still work without a backend.

## 4. Tools and framework used

- React (Vite)
- React Bootstrap / Bootstrap
- Bootstrap Icons
- React Router
- Local storage for simulated data
- Netlify for deployment

## 5. Features of the User/Customer account

- Home page with store name, welcome message, featured products, promotions, and highlights
- Products page with sample catalog, images, names, prices, categories, and Add to Cart
- Categories page with Electronics, Clothing, School Supplies, and Accessories
- Cart with quantity, price, total, and checkout
- Wishlist with Move to Cart and Remove
- My Orders with order number, status, and total
- Profile with customer name, email, and contact details
- Logout back to the login page

## 6. Features of the Seller account

- Dashboard with welcome message, total products, sample orders, and sales summary
- Manage Products list with name, price, category, stock, edit, and delete
- Add Product form with name, price, category, stock, and save
- Orders section with customer orders, product ordered, status, and total
- Seller profile with seller name, store name, email, and contact information
- Logout back to the login page

## 7 to 13. Screenshots

Add screenshots in the official template for:

- Development process
- Login page
- Customer pages
- Seller pages
- Responsive testing (desktop, tablet, mobile)
- GitHub repository
- Netlify deployment

## 14. Netlify link

Add the live URL after deployment, for example:

https://your-ecommerce-website.netlify.app

## 15. Conclusion or reflection

This remake kept the original store identity while meeting the new role-based and UI requirements. Using React state and local storage was enough to simulate shopping and seller inventory. The main learning points were navigation structure, form validation, and making the same catalog usable on both customer and seller sides.
