# 🛍️ ShopSphere – Modern E-commerce Frontend

ShopSphere is a **feature-rich E-commerce frontend application** built using **React + TypeScript**. It is designed to demonstrate real-world frontend architecture, combining advanced state management, clean UI, and scalable code practices.

This project is ideal for:

* 💼 Freelancing portfolio
* 🧑‍💻 Interview preparation
* 🚀 Practicing modern frontend development

---

# ✨ Key Features

## 🛒 E-commerce Functionality

* Product listing with **search, category filter & sorting**
* Product detail page with **dynamic routing**
* Add to Cart with **quantity management**
* Wishlist system
* Mini cart preview in navbar
* Full shopping cart page
* Checkout page with form handling

## 💬 User Interaction

* Customer reviews & comments per product
* Toast notification system for actions

## 🎨 UI/UX

* Fully responsive design
* Dark / Light mode toggle
* Clean and modern interface

## 💾 Data Persistence

* State stored using **Redux Toolkit**
* Data persistence via **localStorage**

---

# 🧠 Tech Stack

* **React 18 + TypeScript**
* **Vite** (Fast build tool)
* **Redux Toolkit** (State management)
* **React Router v6** (Routing)
* **Context API** (Theme management)
* **Tailwind CSS** (Styling)
* **Lucide React** (Icons)

---

# 🚀 Getting Started

## 1️⃣ Install Dependencies

```bash
npm install
```

## 2️⃣ Run Development Server

```bash
npm run dev
```

👉 Open: http://localhost:5173

---

# 📁 Project Structure

```bash
src/
├── app/              # Redux store configuration
├── features/         # Redux slices (cart, wishlist, toast, comment)
├── context/          # Theme context (dark/light mode)
├── hooks/            # Custom hooks (useDebounce)
├── components/       # Reusable UI components
├── pages/            # Application pages
├── types/            # TypeScript interfaces
├── data/             # Mock product data
├── routes/           # Route configuration
├── App.tsx
└── main.tsx
```

---

# 🛍️ Available Routes

| Route          | Description               |
| -------------- | ------------------------- |
| `/`            | Product listing (Home)    |
| `/product/:id` | Product details + reviews |
| `/cart`        | Shopping cart page        |
| `/wishlist`    | Wishlist page             |
| `/checkout`    | Checkout page             |

---

# ⚙️ Core Concepts Covered

* ⚛️ React Hooks (useState, useEffect, useContext, etc.)
* 🧩 Redux Toolkit (Slices, Store, Actions)
* 🌐 Context API with custom provider
* 🔀 React Router (dynamic routing & navigation)
* 🧾 TypeScript interfaces & type safety
* 🔁 Custom hooks (useDebounce)
* 📝 Form handling & validation
* 🔔 Toast notification system
* 💾 LocalStorage persistence
* 🎨 Responsive UI with Tailwind CSS

---

# 🛠️ How to Use

1. Browse products on the homepage
2. Use search and filters to find products
3. Click on a product to view details
4. Add items to cart or wishlist
5. Write reviews on product page
6. Toggle dark/light mode from navbar
7. Complete checkout process (mock)

---

# 📝 Notes

* This is a **frontend-only project** (no backend integration)
* All products are **mock data**
* Cart, wishlist, comments & theme are stored in **localStorage**
* Designed for **learning and portfolio purposes**

---

# 🚀 Future Enhancements

* 🔐 User authentication system
* 📦 Order history page
* 💳 Payment gateway integration
* 🖼️ Product image gallery
* 🎬 Add-to-cart animations
* 💰 Price range filter

---

# 👨‍💻 Author

**Mark J Yadav And Mfg **

* Full Stack Developer 
* Focused on building SaaS & freelance-ready projects

---

# ⭐ Support

If you found this project helpful:

* Give it a ⭐ on GitHub
* Share it with others

---

# 📄 License

This project is licensed under the MIT License.

---

> Made with ❤️ to master modern frontend development
