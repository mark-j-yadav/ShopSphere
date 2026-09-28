# ShopSphere

A React and TypeScript storefront demo built to showcase product discovery, client-side state management, and a multi-page shopping flow. ShopSphere uses a local mock catalog and a simulated checkout, making it a compact portfolio example of an e-commerce frontend.

## What you can explore

- **Product catalog:** Browse 12 sample products, search names and descriptions with a debounced input, filter by category, and sort by price or rating.
- **Product details:** View pricing, descriptions, stock labels, optional size labels, and product-specific reviews. Submit a guest review with a 1–5 star rating.
- **Shopping cart:** Add products, adjust quantities, remove items, clear the cart, and see a subtotal in the cart page or the navbar mini cart.
- **Checkout demo:** Enter contact and delivery details, choose a displayed payment method, and submit a simulated order that clears the cart.
- **Interface:** Responsive product grid, light/dark theme control, and toast messages for actions on the product page.

Prices in the demo are displayed in Indian rupees (₹).

## Stack

| Area | Technology |
| --- | --- |
| UI | React 19.2.4, TypeScript 5.9.3 |
| Routing | React Router DOM 7.13.2 |
| State | Redux Toolkit 2.11.2, React Redux 9.2.0; Context API for theme |
| Styling | Tailwind CSS 4.2.2 with the Vite plugin, Lucide React icons |
| Tooling | Vite 8.0.1, ESLint 9 |

Versions above reflect the dependency declarations in `package.json` (which use caret or tilde ranges).

## Run locally

Have Node.js and npm installed, then run:

```bash
git clone https://github.com/mark-j-yadav/ShopSphere.git
cd ShopSphere
npm install
npm run dev
```

Open the local URL printed by Vite (typically `http://localhost:5173`). The catalog is bundled in `src/data/mockProducts.ts`; no API keys or backend setup are required.

### Available scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm run build` | Run the TypeScript project build, then create a production bundle in `dist/`. |
| `npm run preview` | Serve the production bundle locally after building. |
| `npm run lint` | Run ESLint over the project. |

## Routes

| Path | Screen |
| --- | --- |
| `/` | Catalog, search, category filter, and sorting |
| `/product/:id` | Product details and guest reviews; unknown IDs show “Product not found” |
| `/cart` | Cart items, quantity controls, and order summary |
| `/wishlist` | Wishlist screen with remove and move-to-cart controls for items in state |
| `/checkout` | Simulated checkout form; an empty cart redirects to `/cart` |
| Any other path | In-app 404 screen |

## Project layout

```text
src/
├── app/store.ts                 # Redux store
├── assets/                      # Bundled images and starter assets
├── components/                  # Navbar, toast, toast container
├── context/ThemeContext.tsx     # Theme state and localStorage setting
├── data/mockProducts.ts         # Sample catalog
├── features/                    # Cart, wishlist, comment, and toast slices
├── hooks/                       # Debounce and localStorage hooks
├── pages/                       # Home, product, cart, wishlist, checkout
├── types/index.ts               # Shared TypeScript types
├── App.tsx                      # Providers and route definitions
├── index.css                    # Tailwind import
└── main.tsx                     # React entry point
```

## Current scope and limitations

- This is a **frontend demo**. Products are hard-coded, images come from Picsum, and there is no inventory service, account system, order API, or payment integration. Selecting card or UPI in checkout does not process a payment; submission shows a success alert and clears the cart.
- Cart, wishlist, and reviews live in the Redux store **only for the current page session**. They reset on refresh. The theme preference is the only active localStorage persistence; `useLocalStorage` exists but is not wired into those slices.
- The catalog's heart buttons have no click handler, so the wishlist cannot currently be populated through the UI. The navbar search box, profile button, and mobile menu content are also unfinished; use the search field on the home page.
- The theme control sets a `dark` class on the document, but the Tailwind 4 setup does not define a class-based dark variant. The visible effect of `dark:` styles can therefore follow the system color preference instead of the toggle.
- The current source has unused imports/state while TypeScript enables `noUnusedLocals`, so `npm run build` needs those code issues resolved before a production bundle can be generated. The build command above documents the existing script, not a verified passing build.

## Author

**Mark J Yadav** · [GitHub](https://github.com/mark-j-yadav)

ShopSphere is a portfolio project demonstrating a storefront UI and its client-side architecture.
