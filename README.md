# NI DIGITAL Website

A responsive React website for NI DIGITAL, a technology retailer based in Ratnapura, Sri Lanka.

## Pages

- `index.html` — Home page
- `products.html` — Product categories and availability links
- `about.html` — Company information, vision, mission, and values

The original `NI_DIGITAL_Professional_Website_Updated.html` home page URL is also preserved.

## Product discovery

`src/catalog.js` contains the editable category and brand taxonomy used by the homepage, Products navigation, search suggestions, and category filters. Its brand names are inquiry filters and do not claim current stock.

The `products` array in that file is intentionally empty until verified product records are supplied. Product records can include `slug`, `name`, `brand`, `categoryId`, `image`, optional `images`, `imageAlt`, `description`, `specifications` (`[{ label, value }]`), `price`, and `availability`. The product cards, search, price filters, product detail view, and related products use that data without a backend.

Keep prices and availability out of the array until they have been confirmed. WhatsApp inquiries use the existing NI DIGITAL business number configured in `src/App.jsx`.

## Run locally

Install dependencies and start the Vite development server:

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Vite writes the production-ready static site to `dist/`. Deploy that folder with a static hosting provider such as Cloudflare Pages or Vercel.
