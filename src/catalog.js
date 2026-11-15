// Category taxonomy is for product discovery and inquiries. It does not imply
// that any product or brand is currently in stock.
export const catalogCategories = [
  {
    id: "printers",
    title: "Printers",
    image: "product-printers.jpg",
    alt: "Printer for a home, study, or office workspace",
    description: "Printers, supplies, and parts for home, study, and office use.",
    sections: [
      { title: "Printers", brands: ["Canon", "Brother", "HP", "Epson"] },
      { title: "Printer Accessories & Parts", brands: [] },
    ],
  },
  {
    id: "laptops",
    title: "Laptops",
    image: "product-laptops.jpg",
    alt: "Laptop computer for work, study, and everyday use",
    description: "Portable computers and the accessories and parts that support them.",
    sections: [
      { title: "Laptops", brands: ["Samsung", "Lenovo", "Dell", "HP", "ASUS"] },
      { title: "Laptop Accessories & Parts", brands: [] },
    ],
  },
  {
    id: "desktops",
    title: "Desktops",
    image: "product-desktops.jpg",
    alt: "Desktop computer and monitor for a workspace",
    description: "Choose a custom build, a brand desktop, or desktop accessories.",
    sections: [
      { title: "Customized Desktops", brands: [] },
      { title: "Brand New Desktops", brands: ["Samsung", "HP", "Dell", "ASUS"] },
      { title: "Desktop Accessories", brands: [] },
    ],
  },
  {
    id: "phones",
    title: "Phones",
    image: "product-phones.jpg",
    alt: "Mobile phone for communication and everyday use",
    description: "Mobile phones and accessories from the brands you’re interested in.",
    sections: [
      { title: "Mobile Phones", brands: ["Samsung", "Xiaomi", "Google Pixel", "Nokia", "Realme", "TCL", "Tecno", "vivo", "OPPO", "E-tel", "Honor", "Motorola"] },
      { title: "Phone Accessories", brands: [] },
    ],
  },
  {
    id: "tablets",
    title: "Tabs / Tablets",
    image: "product-phones.jpg",
    alt: "Tablet computer for work, study, and entertainment",
    description: "Tablets are organized separately from mobile phones, with accessories in their own group.",
    sections: [
      { title: "Tabs / Tablets", brands: ["Samsung", "Xiaomi", "Google Pixel"] },
      { title: "Tablet Accessories", brands: [] },
    ],
  },
  {
    id: "others",
    title: "Others",
    image: "product-accessories.jpg",
    alt: "Technology accessories and everyday electronics",
    description: "A flexible place to ask about other technology products and accessories.",
    sections: [
      { title: "Other technology products & accessories", brands: [] },
    ],
  },
];

// Add only verified product records here. The UI supports these fields and
// stays in an explicit empty state until real listings are supplied.
export const products = [];

export function getCategoryBrands(category) {
  return [...new Set(category.sections.flatMap((section) => section.brands))];
}

export function getCategoryForBrand(brand) {
  return catalogCategories.filter((category) => getCategoryBrands(category).includes(brand));
}
