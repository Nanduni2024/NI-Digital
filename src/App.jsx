import React, { useEffect, useState } from "react";
import { catalogCategories, getCategoryBrands, products } from "./catalog.js";

const BASE_URL = import.meta.env.BASE_URL;
const HOME_URL = `${BASE_URL}index.html`;
const PRODUCTS_URL = `${BASE_URL}products.html`;
const ABOUT_URL = `${BASE_URL}about.html`;
const LOGO_URL = `${BASE_URL}assets/ni-digital-logo.png`;
const PHONE = "+94 71 797 4055";
const PHONE_LINK = "tel:+94717974055";
const EMAIL = "nidigital99@gmail.com";
const WHATSAPP = "https://wa.me/94717974055";
const MAP =
  "https://www.google.com/maps/search/?api=1&query=Ehelepola+Mawatha%2C+Batugedara%2C+Ratnapura%2C+Sri+Lanka";

const productsHref = ({ category, brand, search, product } = {}) => {
  const params = new URLSearchParams();
  if (category) params.set("category", category);
  if (brand) params.set("brand", brand);
  if (search) params.set("search", search);
  if (product) params.set("product", product);
  const query = params.toString();
  return `${PRODUCTS_URL}${query ? `?${query}` : ""}#catalog`;
};

const whatsappInquiry = (subject) =>
  `${WHATSAPP}?text=${encodeURIComponent(`Hi NI DIGITAL, I’d like to ask about ${subject}. Please let me know the current options and availability.`)}`;

function searchCatalog(query) {
  const normalized = query.trim().toLocaleLowerCase();
  if (!normalized) return [];
  const categoryMatches = catalogCategories.flatMap((category) => {
    const brands = getCategoryBrands(category);
    const matchingBrand = brands.find((brand) => brand.toLocaleLowerCase().includes(normalized));
    const matchingSection = category.sections.find((section) => section.title.toLocaleLowerCase().includes(normalized));
    const matchesCategory = category.title.toLocaleLowerCase().includes(normalized);
    if (!matchingBrand && !matchingSection && !matchesCategory) return [];
    return [{ category, brand: matchingBrand || "", label: matchingBrand || matchingSection?.title || category.title }];
  });
  const productMatches = products.flatMap((product) => {
    const category = catalogCategories.find((item) => item.id === product.categoryId);
    if (!category) return [];
    const specs = (product.specifications || []).map((spec) => typeof spec === "string" ? spec : `${spec.label} ${spec.value}`);
    const productText = [product.name, product.brand, product.categoryId, product.description, ...specs].join(" ").toLocaleLowerCase();
    return productText.includes(normalized) ? [{ category, brand: product.brand, label: product.name, product }] : [];
  });
  return [...productMatches, ...categoryMatches].slice(0, 6);
}

function Icon({ name, className }) {
  const icons = {
    arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
    check: <path d="m5 12 4 4L19 6" />,
    shield: (
      <>
        <path d="M12 3 4.5 6v5.5c0 4.2 3.2 7.8 7.5 9.5 4.3-1.7 7.5-5.3 7.5-9.5V6L12 3Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    pin: (
      <>
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    location: (
      <>
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    phone: (
      <path d="M21 16.5v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 10.2 18a19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 1.9 3.2 2 2 0 0 1 3.9 1h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L7.8 9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 .9 2.6Z" />
    ),
    email: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
    laptop: (
      <>
        <rect x="4" y="4" width="16" height="12" rx="1.5" />
        <path d="M2 20h20l-1.5-4h-17L2 20Z" />
      </>
    ),
    desktop: (
      <>
        <rect x="3" y="4" width="18" height="12" rx="1.5" />
        <path d="M8 20h8M12 16v4" />
      </>
    ),
    mobile: (
      <>
        <rect x="6.5" y="2.5" width="11" height="19" rx="2" />
        <path d="M10 18.5h4" />
      </>
    ),
    tablet: <><rect x="4" y="2" width="16" height="20" rx="2" /><circle cx="12" cy="18" r=".7" fill="currentColor" stroke="none" /></>,
    printer: (
      <>
        <path d="M6 9V3h12v6M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
        <path d="M6 14h12v7H6zM17 12h.01" />
      </>
    ),
    accessories: (
      <>
        <path d="M4 9v6a3 3 0 0 0 3 3h1l2 3h4l2-3h1a3 3 0 0 0 3-3V9a3 3 0 0 0-3-3h-1l-2-3h-4L8 6H7a3 3 0 0 0-3 3Z" />
        <path d="M8.5 12h.01M15.5 12h.01M10 15h4" />
      </>
    ),
    vision: (
      <>
        <path d="M12 3v18M3 12h18" />
        <circle cx="12" cy="12" r="9" />
      </>
    ),
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    search: <><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.5 4.5" /></>,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    whatsapp: (
      <>
        <path d="M20.5 11.6a8.4 8.4 0 0 1-12.4 7.3L3 20l1.2-4.9a8.4 8.4 0 1 1 16.3-3.5Z" />
        <path d="M8.5 8.2c.2-.5.4-.5.7-.5h.5c.2 0 .4.1.5.4l.7 1.7c.1.2.1.4 0 .6l-.5.6c-.2.2-.3.4-.1.7.5.9 1.3 1.7 2.3 2.2.3.2.5.1.7-.1l.7-.8c.2-.2.4-.2.6-.1l1.6.8c.3.1.4.3.4.5s-.1 1-.6 1.4c-.5.5-1.2.7-2 .5-1.4-.3-2.8-1-3.9-2-1.2-1.1-2.1-2.5-2.4-3.7-.2-.9 0-1.6.5-2.2Z" />
      </>
    ),
  };

  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {icons[name]}
    </svg>
  );
}

function Eyebrow({ children }) {
  return <span className="eyebrow">{children}</span>;
}

function CategoryVisual({ category, className = "" }) {
  if (category.id === "tablets") {
    return <div className={`${className} category-visual-tablet`} aria-hidden="true"><Icon name="tablet" /></div>;
  }
  return <img className={className} src={`${BASE_URL}assets/${category.image}`} alt={category.alt} loading="lazy" />;
}

function Header({ page }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const homeContact = page === "home" ? "#contact" : `${HOME_URL}#contact`;

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    if (!menuOpen && !productsOpen && !searchOpen) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        closeMenu();
        setProductsOpen(false);
        setSearchOpen(false);
      }
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen, productsOpen, searchOpen]);

  const suggestions = searchCatalog(searchQuery);
  const goToSearch = (event) => {
    event.preventDefault();
    if (searchQuery.trim()) window.location.href = productsHref({ search: searchQuery.trim() });
  };

  return (
    <header className="site-header">
      <div className="site-topbar">
        <div className="container topbar-inner">
          <span>Technology, with a personal touch — right here in Ratnapura</span>
          <a href={PHONE_LINK}><Icon name="phone" /> {PHONE}</a>
        </div>
      </div>
      <div className="container nav-wrap">
        <a className="brand" href={`${HOME_URL}#home`} aria-label="NI DIGITAL home">
          <img src={LOGO_URL} alt="NI DIGITAL — powering your digital future" />
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <Icon name="menu" />
        </button>
        <nav
          className={`nav-links${menuOpen ? " is-open" : ""}`}
          id="primary-navigation"
          aria-label="Main navigation"
          onClick={(event) => {
            if (event.target.closest("a")) {
              closeMenu();
              setProductsOpen(false);
              setSearchOpen(false);
            }
          }}
        >
          <a href={`${HOME_URL}#home`} aria-current={page === "home" ? "page" : undefined}>Home</a>
          <button
            className="nav-menu-trigger"
            type="button"
            aria-current={page === "products" ? "page" : undefined}
            aria-expanded={productsOpen}
            aria-controls={productsOpen ? "product-mega-menu" : undefined}
            onClick={() => { setProductsOpen((open) => !open); setSearchOpen(false); }}
          >
            Products <span aria-hidden="true">⌄</span>
          </button>
          <a href={ABOUT_URL} aria-current={page === "about" ? "page" : undefined}>About Us</a>
          <a href={homeContact}>Contact</a>
          <button
            className="nav-search-trigger"
            type="button"
            aria-expanded={searchOpen}
            aria-controls={searchOpen ? "site-search-panel" : undefined}
            onClick={() => { setSearchOpen((open) => !open); setProductsOpen(false); }}
          >
            <Icon name="search" /> <span>Search</span>
          </button>
          <a className="nav-cta" href={WHATSAPP} target="_blank" rel="noopener noreferrer">
            Let’s talk <span aria-hidden="true">↗</span>
          </a>
        {productsOpen && (
          <div className="product-mega-menu" id="product-mega-menu">
            <div className="mega-menu-heading">
              <div><Eyebrow>Product directory</Eyebrow><strong>Explore by category</strong></div>
              <a href={productsHref()}>Browse all <span aria-hidden="true">↗</span></a>
            </div>
            <div className="mega-menu-grid">
              {catalogCategories.map((category) => (
                <a className="mega-category" href={productsHref({ category: category.id })} key={category.id}>
                  <CategoryVisual category={category} className="mega-category-image" />
                  <span><strong>{category.title}</strong><small>{getCategoryBrands(category).slice(0, 4).join(" · ") || "Accessories & more"}</small></span>
                  <span className="mega-arrow" aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
            <p className="mega-menu-note">Categories and brands guide an inquiry. Our team confirms current products and availability.</p>
          </div>
        )}
        {searchOpen && (
          <div className="site-search-panel" id="site-search-panel">
            <form className="site-search-form" role="search" onSubmit={goToSearch}>
              <Icon name="search" />
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search categories or brands"
                aria-label="Search NI DIGITAL categories and brands"
              />
              <button className="button button-primary" type="submit" disabled={!searchQuery.trim()}>Search</button>
            </form>
            {searchQuery.trim() && (
              <div className="search-suggestions" aria-live="polite">
                {suggestions.length ? suggestions.map(({ category, brand, label, product }) => (
                  <a href={product ? productsHref({ product: product.slug }) : productsHref({ category: brand ? undefined : category.id, brand: brand || undefined, search: brand ? undefined : searchQuery })} key={`${category.id}-${label}`}>
                    <span><strong>{label}</strong><small>{product ? `${brand} · ${category.title}` : brand ? category.title : "Category"}</small></span>
                    <span aria-hidden="true">↗</span>
                  </a>
                )) : <p>No category or brand matches. Try another search or contact us.</p>}
              </div>
            )}
          </div>
        )}
        </nav>
      </div>
    </header>
  );
}

function Footer({ page }) {
  const homeContact = page === "home" ? "#contact" : `${HOME_URL}#contact`;

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <a href={`${HOME_URL}#home`} aria-label="NI DIGITAL home">
            <img src={LOGO_URL} alt="NI DIGITAL" loading="lazy" />
          </a>
          <span>Powering your digital future.</span>
        </div>
        <nav className="footer-links" aria-label="Footer navigation">
          <a href={PRODUCTS_URL}>Products</a>
          <a href={ABOUT_URL}>About</a>
          <a href={homeContact}>Contact</a>
        </nav>
        <div className="copyright">© {new Date().getFullYear()} NI DIGITAL. All rights reserved.</div>
      </div>
    </footer>
  );
}

function WhatsAppButton() {
  return (
    <a className="whatsapp" href={WHATSAPP} target="_blank" rel="noopener noreferrer" aria-label="Chat with NI DIGITAL on WhatsApp">
      <Icon name="whatsapp" />
      Chat with us
    </a>
  );
}

function RobotBuddy() {
  const idPrefix = React.useId().replace(/:/g, "");
  const titleId = `${idPrefix}-robot-title`;
  const descriptionId = `${idPrefix}-robot-description`;
  const shellId = `${idPrefix}-robot-shell`;
  const panelId = `${idPrefix}-robot-panel`;
  const accentId = `${idPrefix}-robot-accent`;
  const coreId = `${idPrefix}-robot-core`;
  const glowId = `${idPrefix}-robot-glow`;
  const shadowId = `${idPrefix}-robot-shadow`;

  return (
    <div className="hero-mascot">
      <svg className="robot-illustration" viewBox="0 0 500 520" role="img" aria-labelledby={`${titleId} ${descriptionId}`}>
        <title id={titleId}>NI DIGITAL’s Robo Buddy</title>
        <desc id={descriptionId}>A compact, engineered navy and silver robot with a cyan sensor visor, articulated arms, and an NI chest badge.</desc>
        <defs>
          <linearGradient id={shellId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#e8f0fb" />
            <stop offset=".48" stopColor="#8fa6c5" />
            <stop offset="1" stopColor="#445879" />
          </linearGradient>
          <linearGradient id={panelId} x1="0" y1="0" x2=".9" y2="1">
            <stop offset="0" stopColor="#132a43" />
            <stop offset="1" stopColor="#07111f" />
          </linearGradient>
          <linearGradient id={accentId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#b28aff" />
            <stop offset="1" stopColor="#43d7ef" />
          </linearGradient>
          <linearGradient id={coreId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#6ce7ee" />
            <stop offset="1" stopColor="#8a7cff" />
          </linearGradient>
          <radialGradient id={glowId}>
            <stop stopColor="#37c9ee" stopOpacity=".2" />
            <stop offset="1" stopColor="#37c9ee" stopOpacity="0" />
          </radialGradient>
          <filter id={shadowId} x="-.5" y="-.5" width="2" height="2">
            <feGaussianBlur stdDeviation="9" />
          </filter>
        </defs>
        <ellipse cx="250" cy="468" rx="120" ry="20" fill="#142c48" opacity=".42" filter={`url(#${shadowId})`} />
        <ellipse cx="250" cy="464" rx="92" ry="10" fill="#0b1523" stroke="#557293" strokeOpacity=".45" />
        <ellipse cx="250" cy="464" rx="45" ry="3" fill="#4dd7e9" opacity=".55" />

        <g className="robot-float">
          <circle cx="250" cy="212" r="196" fill={`url(#${glowId})`} />

          <g className="robot-head">
            <path d="M250 76V50" fill="none" stroke={`url(#${accentId})`} strokeWidth="8" strokeLinecap="round" />
            <path d="M238 49h24" stroke="#d7e6f6" strokeWidth="4" strokeLinecap="round" />
            <circle cx="250" cy="37" r="12" fill="#172a40" stroke="#98b7d3" strokeWidth="4" />
            <circle cx="250" cy="37" r="4" fill="#60e3ed" />

            <path d="m157 161-38-17-12 22 12 59 39-15M343 161l38-17 12 22-12 59-39-15" fill={`url(#${shellId})`} stroke="#9cb2ce" strokeWidth="5" strokeLinejoin="round" />
            <path d="m116 169-15 10 8 29 15-7M384 169l15 10-8 29-15-7" fill="#162941" stroke={`url(#${accentId})`} strokeWidth="3" strokeLinejoin="round" />
            <circle cx="109" cy="193" r="4" fill="#5ddfea" />
            <circle cx="391" cy="193" r="4" fill="#a48bff" />

            <path d="M175 82q75-29 150 0l30 35-10 117q-3 35-37 48-58 22-116 0-34-13-37-48l-10-117z" fill={`url(#${shellId})`} stroke="#bed0e4" strokeWidth="5" strokeLinejoin="round" />
            <path d="m178 96 23-12M322 96l-23-12" stroke="#fff" strokeOpacity=".68" strokeWidth="4" strokeLinecap="round" />
            <path d="M160 130q0-20 21-20h138q21 0 21 20v77q0 24-24 24H184q-24 0-24-24z" fill={`url(#${panelId})`} stroke="#5e7e9f" strokeWidth="3" />
            <path d="M179 119q71-21 142 0" fill="none" stroke="#d5edff" strokeOpacity=".14" strokeWidth="5" strokeLinecap="round" />
            <path d="M171 126v78M329 126v78" stroke={`url(#${accentId})`} strokeOpacity=".38" strokeWidth="3" />
            <rect x="188" y="151" width="39" height="40" rx="18" fill="#43d7ef" className="robot-eye" />
            <rect x="273" y="151" width="39" height="40" rx="18" fill="#43d7ef" className="robot-eye robot-eye-second" />
            <circle cx="207" cy="171" r="7" fill="#f4fdff" className="robot-pupil" />
            <circle cx="292" cy="171" r="7" fill="#f4fdff" className="robot-pupil" />
            <path d="M229 210h42" stroke="#75e8ed" strokeWidth="4" strokeLinecap="round" />
            <circle cx="221" cy="210" r="3" fill="#a48bff" />
            <circle cx="279" cy="210" r="3" fill="#a48bff" />
            <path d="M202 241h96" stroke="#829ab7" strokeOpacity=".55" strokeWidth="3" strokeLinecap="round" />
            <circle cx="250" cy="241" r="3" fill="#5bd9e5" />
          </g>

          <g className="robot-body">
            <path d="M228 257h44v29h-44z" fill="#203751" stroke="#7693b2" strokeWidth="4" />
            <path d="M179 284q71-28 142 0l24 102q-95 44-190 0z" fill={`url(#${shellId})`} stroke="#b8cbe0" strokeWidth="5" strokeLinejoin="round" />
            <path d="m190 297 60-18 60 18 17 75q-77 31-154 0z" fill="#14243a" stroke="#647f9d" strokeWidth="3" />
            <path d="m250 305 32 28-32 28-32-28z" fill="#172d47" stroke={`url(#${accentId})`} strokeWidth="3" />
            <path d="m250 314 22 19-22 19-22-19z" fill={`url(#${coreId})`} />
            <text x="250" y="382" fill="#e4effb" fontFamily="Arial, sans-serif" fontSize="22" fontWeight="700" letterSpacing="3" textAnchor="middle">NI</text>
            <circle cx="180" cy="319" r="5" fill="#53d9e5" />
            <circle cx="320" cy="319" r="5" fill="#a58aff" />
            <path d="M205 397 193 424q-7 17 10 23l17 5q14 4 19-11l11-31M295 397l12 27q7 17-10 23l-17 5q-14 4-19-11l-11-31" fill={`url(#${shellId})`} stroke="#a9bfd5" strokeWidth="5" strokeLinejoin="round" />
            <path d="m189 440 37 10M274 450l37-10" stroke="#5dd9e5" strokeWidth="4" strokeLinecap="round" />
            <path d="M185 454h54q8 0 8 8v5h-67q-11 0-9-8 2-5 14-5ZM315 454h-54q-8 0-8 8v5h67q11 0 9-8-2-5-14-5Z" fill="#17283d" stroke="#718ba8" strokeWidth="3" />

            <g className="robot-arm robot-arm-left">
              <path d="M164 300q-20-3-28 17l-14 35q-7 18 10 25l13 6q15 7 23-9l18-38" fill="#263b55" stroke="#7f9ab8" strokeWidth="5" strokeLinejoin="round" />
              <circle cx="135" cy="365" r="12" fill="#15273c" stroke={`url(#${accentId})`} strokeWidth="4" />
              <path d="m125 373-17 6q-12 5-8 18l4 14q4 13 17 10l17-5q11-4 8-16l-4-17z" fill={`url(#${shellId})`} stroke="#9db2ca" strokeWidth="4" strokeLinejoin="round" />
              <path d="m109 393 22-7M113 403l17-5" stroke="#536e8d" strokeWidth="3" strokeLinecap="round" />
            </g>
            <g className="robot-arm robot-arm-right">
              <path d="M336 300q20-3 28 17l14 35q7 18-10 25l-13 6q-15 7-23-9l-18-38" fill="#263b55" stroke="#7f9ab8" strokeWidth="5" strokeLinejoin="round" />
              <circle cx="365" cy="365" r="12" fill="#15273c" stroke={`url(#${accentId})`} strokeWidth="4" />
              <path d="m375 373 17 6q12 5 8 18l-4 14q-4 13-17 10l-17-5q-11-4-8-16l4-17z" fill={`url(#${shellId})`} stroke="#9db2ca" strokeWidth="4" strokeLinejoin="round" />
              <path d="m391 393-22-7M387 403l-17-5" stroke="#536e8d" strokeWidth="3" strokeLinecap="round" />
            </g>
          </g>
        </g>
      </svg>
      <span className="robot-caption">Your NI DIGITAL tech buddy</span>
    </div>
  );
}

function RobotCompanion() {
  const [isMinimized, setIsMinimized] = useState(false);
  const [position, setPosition] = useState({ x: 14, y: 120 });
  const [mood, setMood] = useState("idle");
  const [message, setMessage] = useState("");
  const [gaze, setGaze] = useState({ x: 0, y: 0 });
  const [canClickBuddy, setCanClickBuddy] = useState(true);
  const positionRef = React.useRef({ x: 14, y: 120 });
  const moodRef = React.useRef("idle");
  const pointerRef = React.useRef(null);
  const targetRef = React.useRef(null);
  const moveHomeTimerRef = React.useRef(0);
  const clickableTimerRef = React.useRef(0);
  const scrollFrameRef = React.useRef(0);
  const messageTimerRef = React.useRef(0);
  const moodTimerRef = React.useRef(0);
  const idleTimerRef = React.useRef(0);
  const idleGazeTimerRef = React.useRef(0);
  const lastScrollMessageRef = React.useRef(0);
  const homePositionRef = React.useRef({ x: 14, y: 120 });
  const setRobotMood = React.useCallback((nextMood) => {
    moodRef.current = nextMood;
    setMood(nextMood);
  }, []);
  const showMessage = React.useCallback((text) => {
    setMessage(text);
    window.clearTimeout(messageTimerRef.current);
    messageTimerRef.current = window.setTimeout(() => setMessage(""), 1350);
  }, []);
  const resetMoodSoon = React.useCallback((nextMood = "idle", delay = 1200) => {
    window.clearTimeout(moodTimerRef.current);
    moodTimerRef.current = window.setTimeout(() => setRobotMood(nextMood), delay);
  }, [setRobotMood]);

  useEffect(() => {
    if (window.sessionStorage.getItem("ni-digital-robot-arrival") !== "clicked") return;
    window.sessionStorage.removeItem("ni-digital-robot-arrival");
    setRobotMood("excited");
    showMessage("Boop!");
    resetMoodSoon("idle", 1100);
  }, [resetMoodSoon, setRobotMood, showMessage]);

  useEffect(() => {
    if (isMinimized) return undefined;
    const getBuddySize = () => window.innerWidth <= 700
      ? { width: 70, height: 80 }
      : { width: 88, height: 96 };
    const setBuddyPosition = (next) => {
      const buddySize = getBuddySize();
      const maxX = Math.max(8, window.innerWidth - buddySize.width - 8);
      const maxY = Math.max(50, window.innerHeight - buddySize.height - 12);
      const bounded = {
        x: Math.round(Math.max(8, Math.min(next.x, maxX))),
        y: Math.round(Math.max(50, Math.min(next.y, maxY))),
      };
      positionRef.current = bounded;
      setPosition(bounded);
    };
    const parkingPosition = () => {
      const buddySize = getBuddySize();
      const maxX = Math.max(8, window.innerWidth - buddySize.width - 8);
      const maxY = Math.max(50, window.innerHeight - buddySize.height - 12);
      const headerBottom = document.querySelector(".site-header")?.getBoundingClientRect().bottom ?? 0;
      const topY = Math.min(maxY, Math.max(118, headerBottom + 10));
      const xPositions = [...new Set([14, maxX])];
      const yPositions = [...new Set([maxY, topY, Math.max(topY, Math.min(maxY, Math.round(window.innerHeight * .52)))])];
      const candidates = yPositions.flatMap((y) => xPositions.map((x) => ({ x, y })));
      const blockers = Array.from(document.querySelectorAll(
        ".site-header, a, button, input, select, textarea, summary, [role='button'], [tabindex]:not([tabindex='-1']), .product-card, .catalog-card, .detail-row, .service-point, .whatsapp",
      )).filter((element) => {
        if (element.closest(".robot-companion")) return false;
        const rect = element.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0 && getComputedStyle(element).visibility !== "hidden";
      });
      const safePosition = candidates.find((candidate) => {
        const box = {
          left: candidate.x - 8,
          right: candidate.x + buddySize.width + 8,
          top: candidate.y - 8,
          bottom: candidate.y + buddySize.height + 8,
        };
        return blockers.every((element) => {
          const rect = element.getBoundingClientRect();
          return box.right <= rect.left || box.left >= rect.right || box.bottom <= rect.top || box.top >= rect.bottom;
        });
      });
      setCanClickBuddy(Boolean(safePosition));
      return safePosition || candidates[0];
    };
    const moveHome = () => {
      window.clearTimeout(moveHomeTimerRef.current);
      moveHomeTimerRef.current = window.setTimeout(() => {
        if (targetRef.current) return;
        homePositionRef.current = parkingPosition();
        setBuddyPosition(homePositionRef.current);
        setRobotMood("idle");
      }, 450);
    };
    const moveToward = (target) => {
      if (!target || !target.isConnected || target.closest(".robot-companion")) return;
      const bounds = target.getBoundingClientRect();
      if (bounds.width === 0 || bounds.height === 0) return;

      const buddySize = getBuddySize();
      const maxX = Math.max(8, window.innerWidth - buddySize.width - 8);
      const maxY = Math.max(50, window.innerHeight - buddySize.height - 12);
      const currentX = positionRef.current.x + buddySize.width / 2;
      const rightX = bounds.right + 12;
      const leftX = bounds.left - buddySize.width - 12;
      const centerY = bounds.top + bounds.height / 2 - buddySize.height / 2;
      const horizontal = (currentX <= bounds.left ? [rightX, leftX] : [leftX, rightX])
        .map((x) => ({ x, y: Math.max(50, Math.min(centerY, maxY)) }));
      const verticalX = Math.max(8, Math.min(bounds.left + bounds.width / 2 - buddySize.width / 2, maxX));
      const vertical = [
        { x: verticalX, y: bounds.top - buddySize.height - 12 },
        { x: verticalX, y: bounds.bottom + 12 },
      ];
      const cardInterior = [];
      if (target.matches(".catalog-card")) {
        const headerBottom = document.querySelector(".site-header")?.getBoundingClientRect().bottom ?? 0;
        const imageBottom = Math.min(bounds.bottom, bounds.top + 205);
        const imageTop = Math.max(bounds.top + 10, headerBottom + 10);
        if (imageTop + buddySize.height <= imageBottom - 8) {
          cardInterior.push(
            { x: bounds.left + 10, y: imageTop },
            { x: bounds.right - buddySize.width - 10, y: imageTop },
          );
        }
      }
      const candidates = [...horizontal, ...vertical, ...cardInterior].filter((candidate) =>
        candidate.x >= 8 && candidate.x <= maxX && candidate.y >= 50 && candidate.y <= maxY);
      const blockers = Array.from(document.querySelectorAll(
        ".site-header, a, button, input, select, textarea, summary, [role='button'], [tabindex]:not([tabindex='-1']), .product-card, .catalog-card, .detail-row, .service-point, .whatsapp",
      )).filter((element) => {
        if (element === target || element.closest(".robot-companion")
          || target.closest(".site-header") && element.classList.contains("site-header")) return false;
        const rect = element.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0 && getComputedStyle(element).visibility !== "hidden";
      });
      const safePosition = candidates.find((candidate) => {
        const box = { left: candidate.x - 8, right: candidate.x + buddySize.width + 8, top: candidate.y - 8, bottom: candidate.y + buddySize.height + 8 };
        const clearOfTarget = box.right <= bounds.left || box.left >= bounds.right || box.bottom <= bounds.top || box.top >= bounds.bottom;
        const clearOfOthers = blockers.every((element) => {
          const rect = element.getBoundingClientRect();
          return box.right <= rect.left || box.left >= rect.right || box.bottom <= rect.top || box.top >= rect.bottom;
        });
        return clearOfTarget && clearOfOthers;
      });
      if (!safePosition) {
        setRobotMood("curious");
        return;
      }

      const didMove = safePosition.x !== positionRef.current.x || safePosition.y !== positionRef.current.y;
      window.clearTimeout(moveHomeTimerRef.current);
      window.clearTimeout(clickableTimerRef.current);
      setCanClickBuddy(false);
      setBuddyPosition(safePosition);
      if (!didMove || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setCanClickBuddy(true);
      } else {
        clickableTimerRef.current = window.setTimeout(() => setCanClickBuddy(true), 720);
      }
      setRobotMood("walking");
      resetMoodSoon("curious", 620);
    };
    const findInteractive = (target) => {
      if (!(target instanceof Element)) return null;
      const card = target.closest(".product-card, .catalog-card, .value-card, .detail-row, .service-point");
      if (card) return card;
      return target.closest(
        ".product-card, .catalog-card, .value-card, .detail-row, .service-point, a, button, input, select, textarea, summary, [role='button'], [tabindex]:not([tabindex='-1'])",
      );
    };
    const updateGaze = (clientX, clientY) => {
      const bounds = document.querySelector(".robot-companion")?.getBoundingClientRect();
      if (!bounds) return;
      const headCenterX = bounds.left + bounds.width / 2;
      const headCenterY = bounds.top + bounds.height * .35;
      setGaze({
        x: Math.round(Math.max(-4, Math.min(4, (clientX - headCenterX) / 24))),
        y: Math.round(Math.max(-3, Math.min(3, (clientY - headCenterY) / 28))),
      });
    };
    const onPointerMove = (event) => {
      if (event.pointerType === "touch") return;
      pointerRef.current = { x: event.clientX, y: event.clientY };
      updateGaze(event.clientX, event.clientY);
      const target = findInteractive(event.target);
      if (!target || target.closest(".robot-companion")) {
        if (targetRef.current) {
          targetRef.current = null;
          moveHome();
        }
        return;
      }
      if (targetRef.current !== target) {
        targetRef.current = target;
        moveToward(target);
      }
    };
    const onPointerDown = (event) => {
      if (event.pointerType === "touch") {
        pointerRef.current = { x: event.clientX, y: event.clientY };
        updateGaze(event.clientX, event.clientY);
      }
      const target = findInteractive(event.target);
      if (target && !target.closest(".robot-companion")) {
        targetRef.current = target;
        moveToward(target);
      }
    };
    const onFocusIn = (event) => {
      const target = findInteractive(event.target);
      if (target && !target.closest(".robot-companion")) {
        targetRef.current = target;
        const bounds = target.getBoundingClientRect();
        moveToward(target);
        updateGaze(bounds.left + bounds.width / 2, bounds.top + bounds.height / 2);
        if (target.matches("input, select, textarea")) {
          setRobotMood("thinking");
          showMessage("Thinking...");
          resetMoodSoon("thinking", 1800);
        }
      }
    };
    const onClick = (event) => {
      if (event.target.closest?.(".robot-companion")) return;
      const target = findInteractive(event.target);
      const link = event.target.closest?.("a[href]");
      if (link) {
        const destination = new URL(link.href, window.location.href);
        if (link.target !== "_blank" && destination.origin === window.location.origin
          && destination.pathname !== window.location.pathname) {
          window.sessionStorage.setItem("ni-digital-robot-arrival", "clicked");
        }
      }
      if (target) {
        targetRef.current = target;
        moveToward(target);
      }
      const isNavigation = Boolean(link?.closest(".site-header, .footer-links"));
      const isCard = Boolean(event.target.closest?.(".product-card, .catalog-card, .value-card"));
      const isInput = event.target instanceof Element && Boolean(event.target.closest("input, select, textarea"));
      const reaction = isInput ? "thinking" : isCard ? "curious" : isNavigation ? "excited" : "reacting";
      setRobotMood(reaction);
      showMessage(isCard ? "Interesting!" : isInput ? "Thinking..." : isNavigation ? "Let's explore!" : "Boop!");
      resetMoodSoon("idle", isNavigation ? 1100 : 800);
    };
    const onInvalid = () => {
      setRobotMood("confused");
      showMessage("Oops, check that field!");
      resetMoodSoon("idle", 1500);
    };
    const onSubmit = (event) => {
      if (!event.defaultPrevented) {
        setRobotMood("excited");
        showMessage("You did it!");
        resetMoodSoon("idle", 1400);
      }
    };
    const onPositionTransitionEnd = (event) => {
      if (event.target.matches?.(".robot-companion")
        && (event.propertyName === "left" || event.propertyName === "top")) {
        setCanClickBuddy(true);
      }
    };
    const onScroll = () => {
      if (scrollFrameRef.current) return;
      scrollFrameRef.current = window.requestAnimationFrame(() => {
        scrollFrameRef.current = 0;
        targetRef.current = null;
        homePositionRef.current = parkingPosition();
        setBuddyPosition(homePositionRef.current);
        setRobotMood("scrolling");
        const now = Date.now();
        if (now - lastScrollMessageRef.current > 9000) {
          showMessage("Wheee!");
          lastScrollMessageRef.current = now;
        }
        resetMoodSoon("idle", 650);
      });
    };
    const onResize = () => {
      homePositionRef.current = parkingPosition();
      setBuddyPosition(homePositionRef.current);
    };
    const idleBehaviors = [
      { mood: "thinking", message: "What are you exploring?" },
      { mood: "waving", message: "Hey there!" },
      { mood: "surprised", message: "Ooh, shiny!" },
      { mood: "sleepy", message: "" },
      { mood: "excited", message: "Let's explore together!" },
    ];
    let disposed = false;
    const scheduleIdleBehavior = () => {
      idleTimerRef.current = window.setTimeout(() => {
        if (disposed) return;
        if (moodRef.current === "idle" && !targetRef.current) {
          const behavior = idleBehaviors[Math.floor(Math.random() * idleBehaviors.length)];
          setRobotMood(behavior.mood);
          setGaze({ x: Math.round(Math.random() * 6 - 3), y: Math.round(Math.random() * 4 - 2) });
          if (behavior.message && Math.random() > .35) showMessage(behavior.message);
          resetMoodSoon("idle", 1800 + Math.random() * 900);
          window.clearTimeout(idleGazeTimerRef.current);
          idleGazeTimerRef.current = window.setTimeout(() => {
            if (!targetRef.current) setGaze({ x: 0, y: 0 });
          }, 2200);
        }
        scheduleIdleBehavior();
      }, 6500 + Math.random() * 7000);
    };
    homePositionRef.current = parkingPosition();
    setBuddyPosition(homePositionRef.current);
    const onPointerLeave = () => {
      targetRef.current = null;
      homePositionRef.current = parkingPosition();
      setBuddyPosition(homePositionRef.current);
      setRobotMood("idle");
      setGaze({ x: 0, y: 0 });
    };

    document.addEventListener("pointermove", onPointerMove, true);
    document.addEventListener("pointerdown", onPointerDown, true);
    document.addEventListener("focusin", onFocusIn, true);
    document.addEventListener("click", onClick, true);
    document.addEventListener("invalid", onInvalid, true);
    document.addEventListener("submit", onSubmit);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    document.documentElement.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("transitionend", onPositionTransitionEnd, true);
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) scheduleIdleBehavior();

    return () => {
      disposed = true;
      document.removeEventListener("pointermove", onPointerMove, true);
      document.removeEventListener("pointerdown", onPointerDown, true);
      document.removeEventListener("focusin", onFocusIn, true);
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("invalid", onInvalid, true);
      document.removeEventListener("submit", onSubmit);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("transitionend", onPositionTransitionEnd, true);
      window.cancelAnimationFrame(scrollFrameRef.current);
      window.clearTimeout(idleTimerRef.current);
      window.clearTimeout(idleGazeTimerRef.current);
      window.clearTimeout(moveHomeTimerRef.current);
      window.clearTimeout(clickableTimerRef.current);
      window.clearTimeout(messageTimerRef.current);
      window.clearTimeout(moodTimerRef.current);
    };
  }, [isMinimized, resetMoodSoon, setRobotMood, showMessage]);

  if (isMinimized) {
    return <button className="robot-restore" type="button" onClick={() => setIsMinimized(false)}><span aria-hidden="true">✦</span> Show Robo Buddy</button>;
  }

  const style = {
    left: `${position.x}px`,
    top: `${position.y}px`,
    "--gaze-x": `${gaze.x}px`,
    "--gaze-y": `${gaze.y}px`,
    "--head-tilt": `${gaze.x * .7}deg`,
    "--body-tilt": `${gaze.x * .22}deg`,
    "--facing": gaze.x < 0 ? "-1" : "1",
  };

  return (
    <div className={`robot-companion is-${mood}${canClickBuddy ? " is-clickable" : ""}`} style={style}>
      {message && <span className="robot-speech" aria-hidden="true">{message}</span>}
      <button
        className="robot-companion-button"
        type="button"
        aria-label="NI DIGITAL robot buddy. Click for a reaction."
        onClick={() => {
          setRobotMood("excited");
          showMessage("Hey there!");
          resetMoodSoon();
        }}
      >
        <RobotBuddy />
      </button>
      <button className="robot-minimize" type="button" aria-label="Minimize Robo Buddy" title="Minimize Robo Buddy" onClick={() => setIsMinimized(true)}>
        <Icon name="close" />
      </button>
    </div>
  );
}

function HomePage() {
  return (
    <main>
      <section className="hero" id="home">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="availability"><span aria-hidden="true" /> Your local technology store in Ratnapura</div>
            <h1>Find your next <span className="gradient-text">favourite tech.</span></h1>
            <p>From everyday essentials to a complete workspace, discover technology for work, study and home—with helpful local advice to make choosing easier.</p>
            <div className="button-row">
            <a className="button button-primary" href={productsHref()}>
                Explore product categories
                <Icon name="arrow" />
              </a>
              <a className="button button-quiet" href={WHATSAPP} target="_blank" rel="noopener noreferrer">Ask us on WhatsApp <span aria-hidden="true">↗</span></a>
            </div>
            <div className="hero-note">
              <Icon name="check" />
              Tell us what you need. We’ll help you find the right fit.
            </div>
          </div>
          <div className="hero-art" role="group" aria-label="NI DIGITAL robot mascot and brand illustration">
            <div className="art-orbit" aria-hidden="true" />
            <div className="logo-rings" aria-hidden="true">
              <span className="logo-ring logo-ring-one" />
              <span className="logo-ring logo-ring-two" />
              <span className="logo-ring logo-ring-three" />
            </div>
            <div className="floating-chip chip-top">
              <img src={`${BASE_URL}assets/product-laptops.jpg`} alt="" />
              Laptops & PCs
            </div>
            <RobotBuddy />
            <div className="floating-chip chip-bottom">
              <img src={`${BASE_URL}assets/product-accessories.jpg`} alt="" />
              Everyday tech
            </div>
          </div>
        </div>
      </section>

      <div className="trust-strip" aria-label="Our commitments">
        <div className="container trust-items">
          <div className="trust-item"><Icon name="shield" /><span><strong>Quality first</strong><small>Genuine technology products</small></span></div>
          <div className="trust-item"><Icon name="check" /><span><strong>Helpful by nature</strong><small>Advice for your needs</small></span></div>
          <div className="trust-item"><Icon name="pin" /><span><strong>Locally connected</strong><small>Based in Ratnapura, Sri Lanka</small></span></div>
        </div>
      </div>

      <section className="section products-section" id="products">
        <div className="container">
          <div className="section-heading reveal">
            <Eyebrow>Shop by category</Eyebrow>
            <h2>Good tech for <span className="gradient-text">every kind of day.</span></h2>
            <p>Explore the essentials for work, study, creativity and home. Need a specific model? Ask us about current options and availability.</p>
          </div>
          <div className="products-grid category-home-grid">
            {catalogCategories.map((category) => (
              <a
                className="product-card category-home-card reveal"
                href={productsHref({ category: category.id })}
                aria-label={`Explore ${category.title} and ask about current options`}
                key={category.id}
              >
                <div className="product-card-image">
                  <CategoryVisual category={category} />
                  <span className="product-arrow" aria-hidden="true">↗</span>
                </div>
                <h3>{category.title}</h3>
                <p>{category.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section brand-discovery-section">
        <div className="container">
          <div className="section-heading reveal">
            <Eyebrow>Brand discovery</Eyebrow>
            <h2>Looking for a <span className="gradient-text">particular brand?</span></h2>
            <p>Choose a brand to see the categories it belongs to and ask our team about current options.</p>
          </div>
          <div className="brand-directory">
            {catalogCategories.filter((category) => getCategoryBrands(category).length > 0).map((category) => (
              <div className="brand-directory-row reveal" key={category.id}>
                <a href={productsHref({ category: category.id })}>{category.title}<span aria-hidden="true">↗</span></a>
                <div>{getCategoryBrands(category).map((brand) => (
                  <a className="brand-directory-chip" href={productsHref({ brand })} key={brand}>{brand}</a>
                ))}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section featured-products-section">
        <div className="container featured-products-panel reveal">
          <div><Eyebrow>Featured products</Eyebrow><h2>Find the right option with our team.</h2><p>Online product listings aren’t published yet. Ask us about the model, features, and budget you have in mind.</p></div>
          {products.length ? <div className="inventory-grid">{products.slice(0, 4).map((product) => <ProductCard product={product} key={product.slug} />)}</div> : <a className="button button-primary" href={whatsappInquiry("a product recommendation")} target="_blank" rel="noopener noreferrer">Ask for a recommendation <span aria-hidden="true">↗</span></a>}
        </div>
      </section>

      <section className="section about-section" id="about">
        <div className="container about-grid">
          <div className="about-visual reveal">
            <img src={LOGO_URL} alt="NI DIGITAL — powering your digital future" loading="lazy" />
          </div>
          <div className="about-copy reveal">
            <Eyebrow>A little about us</Eyebrow>
            <h2>Good technology. <span className="gradient-text">Good people.</span></h2>
            <p><strong>NI DIGITAL</strong> is a Sri Lanka-based technology and electronics company committed to delivering genuine digital products and reliable IT solutions. We offer laptops, desktop computers, mobile phones, tablets, printers and accessories from trusted global brands.</p>
            <p>Our goal is to make modern technology accessible, affordable and dependable for individuals, students, professionals and businesses across Sri Lanka. With personal service and quality assurance, we help our customers stay connected, productive and ready for what’s next.</p>
            <div className="value-list" aria-label="Our values">
              <span>Quality</span><span>Integrity</span><span>Customer commitment</span><span>Innovation</span><span>Excellence</span>
            </div>
            <div className="mission-card">
              <Icon name="vision" />
              <div>
                <strong>Our vision</strong>
                <p>To become Sri Lanka’s most trusted digital technology provider, known for quality products, innovative solutions and exceptional customer experiences.</p>
              </div>
            </div>
            <a className="text-link" href={ABOUT_URL}>Meet NI DIGITAL <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </section>

      <ServicePanel />

      <section className="section contact-section" id="contact">
        <div className="container">
          <div className="contact-card reveal">
            <div className="contact-copy">
              <Eyebrow>Let’s get connected</Eyebrow>
              <h2>Need a hand finding the right tech?</h2>
              <p>We’d love to hear from you. Reach out or visit us in Ratnapura—we’re happy to help.</p>
              <div className="contact-actions">
                <a className="button button-primary" href={WHATSAPP} target="_blank" rel="noopener noreferrer">
                  Message on WhatsApp <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
            <div className="contact-details">
              <a className="detail-row" href={PHONE_LINK}>
                <span className="detail-icon"><Icon name="phone" /></span>
                <span className="detail-text"><span>Call us</span><strong>{PHONE}</strong></span>
              </a>
              <a className="detail-row" href={`mailto:${EMAIL}`}>
                <span className="detail-icon"><Icon name="email" /></span>
                <span className="detail-text"><span>Email</span><strong>{EMAIL}</strong></span>
              </a>
              <a className="detail-row" href={MAP} target="_blank" rel="noopener noreferrer">
                <span className="detail-icon"><Icon name="location" /></span>
                <span className="detail-text"><span>Visit us</span><strong>Ehelepola Mawatha, Batugedara, Ratnapura</strong></span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function AboutHeroVisual() {
  return (
    <aside className="about-hero-visual" aria-label="NI DIGITAL technology product categories">
      <div className="about-hero-visual-top"><span>NI DIGITAL / RATNAPURA</span><span aria-hidden="true">01—06</span></div>
      <div className="about-hero-collage">
        <div className="about-hero-main-image">
          <img src={`${BASE_URL}assets/product-laptops.jpg`} alt="Laptop category at NI DIGITAL" fetchPriority="high" />
          <span>Computing</span>
        </div>
        <div className="about-hero-side-image">
          <img src={`${BASE_URL}assets/product-phones.jpg`} alt="Mobile phone category at NI DIGITAL" />
          <span>Everyday tech</span>
        </div>
        <div className="about-hero-location"><Icon name="pin" /><span><small>Local technology store</small><strong>Ratnapura, Sri Lanka</strong></span></div>
      </div>
      <div className="about-hero-visual-bottom"><span>Products for work, study & home</span><a href={productsHref()}>Explore categories <span aria-hidden="true">↗</span></a></div>
    </aside>
  );
}

function PageHero({ eyebrow, children, description, actions, className = "", visual }) {
  return (
    <section className={`page-hero ${className}`}>
      <div className={`container reveal page-hero-inner${visual ? " has-visual" : ""}`}>
        <div className="page-hero-copy">
          <Eyebrow>{eyebrow}</Eyebrow>
          {children}
          <p>{description}</p>
          {actions}
        </div>
        {visual}
      </div>
    </section>
  );
}

function ServicePanel({ title = "Here to help you make the", highlight = "right choice.", eyebrow = "The NI DIGITAL difference", description = "Technology should make life easier. Tell us what you need, and we’ll help you find a dependable option that fits.", points = ["Friendly, personal guidance", "Genuine products you can trust", "Options for work, study and home", "Local, dependable service"] }) {
  return (
    <section className="section service-section">
      <div className="container">
        <div className="service-panel reveal">
          <div>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2>{title} <span className="gradient-text">{highlight}</span></h2>
            <p>{description}</p>
          </div>
          <div className="service-points">
            {points.map((point) => (
              typeof point === "string"
                ? <div className="service-point" key={point}><Icon name="check" />{point}</div>
                : point
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CategoryCard({ category, activeBrand, onSelectBrand }) {
  return (
    <article className="catalog-card reveal" id={category.id}>
      <div className="catalog-image">
        <CategoryVisual category={category} />
        <span className="catalog-image-label">NI DIGITAL · {category.title}</span>
      </div>
      <div className="catalog-content">
        <span className="catalog-number">PRODUCT DIRECTORY</span>
        <h2>{category.title}</h2>
        <p>{category.description}</p>
        <div className="catalog-sections">
          {category.sections.map((section) => (
            <div className="catalog-subcategory" key={section.title}>
              <strong>{section.title}</strong>
              {section.brands.length > 0 && (
                <details className="brand-list-details" open={section.brands.includes(activeBrand)}>
                  <summary>Brands to ask about <span>{section.brands.length}</span></summary>
                  <div className="catalog-list" aria-label={`${section.title} brands to ask about`}>
                    {section.brands.map((brand) => (
                      <button
                        className={`brand-chip${activeBrand === brand ? " is-selected" : ""}`}
                        type="button"
                        aria-pressed={activeBrand === brand}
                        onClick={() => onSelectBrand(activeBrand === brand ? "" : brand)}
                        key={brand}
                      >
                        {brand}
                      </button>
                    ))}
                  </div>
                </details>
              )}
              {!section.brands.length && (
                <a className="subcategory-link" href={whatsappInquiry(section.title)} target="_blank" rel="noopener noreferrer">Ask about {section.title} <span aria-hidden="true">↗</span></a>
              )}
            </div>
          ))}
        </div>
        <a className="text-link" href={whatsappInquiry([activeBrand, category.title].filter(Boolean).join(" "))} target="_blank" rel="noopener noreferrer">
          Ask about {activeBrand ? `${activeBrand} ${category.title}` : category.title} <span aria-hidden="true">↗</span>
        </a>
      </div>
    </article>
  );
}

function ProductCard({ product }) {
  const specificationSummary = (product.specifications || []).slice(0, 3).map((spec) => typeof spec === "string" ? spec : `${spec.label}: ${spec.value}`).join(" · ");
  return (
    <article className="inventory-card">
      <a className="inventory-image" href={productsHref({ product: product.slug })}>
        <img src={`${BASE_URL}assets/${product.image}`} alt={product.imageAlt || product.name} loading="lazy" />
      </a>
      <div className="inventory-copy">
        <span className="inventory-brand">{product.brand}</span>
        <h3>{product.name}</h3>
        {specificationSummary && <p>{specificationSummary}</p>}
        {Number.isFinite(product.price) && <strong className="inventory-price">LKR {product.price.toLocaleString("en-LK")}</strong>}
        {product.availability && <span className="inventory-availability">{product.availability}</span>}
        <div className="inventory-actions">
          <a className="button button-quiet" href={productsHref({ product: product.slug })}>View details</a>
          <a className="button button-primary" href={whatsappInquiry(product.name)} target="_blank" rel="noopener noreferrer">Ask on WhatsApp</a>
        </div>
      </div>
    </article>
  );
}

function ProductDetail({ product }) {
  const gallery = product.images?.length ? product.images : [product.image];
  const [activeImage, setActiveImage] = useState(gallery[0]);
  return (
    <section className="section product-detail-section">
      <div className="container product-detail">
        <div className="product-gallery">
          <img className="product-detail-main-image" src={`${BASE_URL}assets/${activeImage}`} alt={product.imageAlt || product.name} />
          {gallery.length > 1 && <div className="product-detail-thumbnails" aria-label="Product image gallery">{gallery.map((image, index) => (
            <button className={image === activeImage ? "is-active" : ""} type="button" onClick={() => setActiveImage(image)} aria-label={`Show image ${index + 1} of ${product.name}`} aria-pressed={image === activeImage} key={`${image}-${index}`}>
              <img src={`${BASE_URL}assets/${image}`} alt="" />
            </button>
          ))}
          </div>}
        </div>
        <div className="product-detail-copy">
          <Eyebrow>{product.brand}</Eyebrow>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          {Number.isFinite(product.price) && <strong className="inventory-price">LKR {product.price.toLocaleString("en-LK")}</strong>}
          {product.availability && <p className="inventory-availability">{product.availability}</p>}
          <a className="button button-primary" href={whatsappInquiry(`${product.name}${(product.specifications || []).length ? ` (${(product.specifications || []).map((spec) => typeof spec === "string" ? spec : `${spec.label}: ${spec.value}`).join(", ")})` : ""}`)} target="_blank" rel="noopener noreferrer">Ask about this product <span aria-hidden="true">↗</span></a>
          {product.specifications?.length > 0 && (
            <dl className="specification-list">
              {product.specifications.map((specification) => (
                <div key={specification.label}><dt>{specification.label}</dt><dd>{specification.value}</dd></div>
              ))}
            </dl>
          )}
        </div>
      </div>
      {products.filter((item) => item.slug !== product.slug && item.categoryId === product.categoryId).length > 0 && (
        <div className="container related-products">
          <h2>Related products</h2>
          <div className="inventory-grid">
            {products.filter((item) => item.slug !== product.slug && item.categoryId === product.categoryId).map((item) => <ProductCard product={item} key={item.slug} />)}
          </div>
        </div>
      )}
    </section>
  );
}

function ProductsPage() {
  const params = new URLSearchParams(window.location.search);
  const [search, setSearch] = useState(params.get("search") || "");
  const [categoryId, setCategoryId] = useState(params.get("category") || "");
  const [brand, setBrand] = useState(params.get("brand") || "");
  const [sortOrder, setSortOrder] = useState("featured");
  const [maxPrice, setMaxPrice] = useState("");
  const selectedProduct = products.find((product) => product.slug === params.get("product"));
  const selectedCategory = catalogCategories.find((category) => category.id === categoryId);
  const brandOptions = selectedCategory
    ? getCategoryBrands(selectedCategory)
    : [...new Set(catalogCategories.flatMap(getCategoryBrands))].sort();
  const normalizedSearch = search.trim().toLocaleLowerCase();
  const visibleCategories = catalogCategories.filter((item) => {
    const categoryMatches = !categoryId || item.id === categoryId;
    const brandMatches = !brand || getCategoryBrands(item).includes(brand);
    const searchText = [item.title, item.description, ...item.sections.flatMap((section) => [section.title, ...section.brands])].join(" ").toLocaleLowerCase();
    return categoryMatches && brandMatches && (!normalizedSearch || searchText.includes(normalizedSearch));
  });
  const pricedProducts = products.filter((product) => Number.isFinite(product.price));
  const visibleProducts = products.filter((product) => {
    const categoryMatches = !categoryId || product.categoryId === categoryId;
    const brandMatches = !brand || product.brand === brand;
    const specs = (product.specifications || []).map((spec) => typeof spec === "string" ? spec : `${spec.label} ${spec.value}`);
    const searchText = [product.name, product.brand, product.categoryId, product.description, ...specs].join(" ").toLocaleLowerCase();
    const priceMatches = !maxPrice || !Number.isFinite(product.price) || product.price <= Number(maxPrice);
    return categoryMatches && brandMatches && priceMatches && (!normalizedSearch || searchText.includes(normalizedSearch));
  }).sort((a, b) => {
    if (sortOrder === "price-low") return (a.price ?? Infinity) - (b.price ?? Infinity);
    if (sortOrder === "price-high") return (b.price ?? -Infinity) - (a.price ?? -Infinity);
    return a.name.localeCompare(b.name);
  });

  const chooseCategory = (value) => {
    setCategoryId(value);
    setBrand("");
  };

  if (selectedProduct) return <main className="page-main"><ProductDetail product={selectedProduct} /></main>;

  return (
    <main className="page-main">
      <PageHero
        eyebrow="NI DIGITAL · Ratnapura"
        description="Explore the product categories and brands you can ask us about. Our team confirms current models, pricing, and availability directly."
        actions={
          <div className="button-row">
            <a className="button button-primary" href="#catalog">Explore categories <span aria-hidden="true">↓</span></a>
            <a className="button button-quiet" href={whatsappInquiry("your current technology products")} target="_blank" rel="noopener noreferrer">
              Ask our team <span aria-hidden="true">↗</span>
            </a>
          </div>
        }
      >
        <h1>Technology for <span className="gradient-text">your next move.</span></h1>
      </PageHero>

      <section className="section catalog-section" id="catalog">
        <div className="container">
          <div className="section-heading reveal">
            <Eyebrow>Product discovery</Eyebrow>
            <h2>Start with a category. <span className="gradient-text">Find your fit.</span></h2>
            <p>Use category, brand, or keyword filters to narrow your inquiry. Brand names below are discovery options, not stock claims.</p>
          </div>
          <div className="catalog-controls" aria-label="Filter product categories">
            <label>Category
              <select value={categoryId} onChange={(event) => chooseCategory(event.target.value)}>
                <option value="">All categories</option>
                {catalogCategories.map((item) => <option value={item.id} key={item.id}>{item.title}</option>)}
              </select>
            </label>
            <label>Brand
              <select value={brand} onChange={(event) => setBrand(event.target.value)}>
                <option value="">All brands</option>
                {brandOptions.map((item) => <option value={item} key={item}>{item}</option>)}
              </select>
            </label>
            <label className="catalog-search">Search
              <input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Product, brand, or category" />
            </label>
            {products.length > 0 && <label>Sort by
              <select value={sortOrder} onChange={(event) => setSortOrder(event.target.value)}>
                <option value="featured">Name</option>
                {pricedProducts.length > 0 && <><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option></>}
              </select>
            </label>}
            {pricedProducts.length > 0 && <label>Maximum price (LKR)
              <input type="number" min="0" inputMode="numeric" value={maxPrice} onChange={(event) => setMaxPrice(event.target.value)} placeholder="Any price" />
            </label>}
            {(categoryId || brand || search) && <button className="clear-filters" type="button" onClick={() => { chooseCategory(""); setBrand(""); setSearch(""); }}>Clear filters</button>}
          </div>

          {products.length === 0 ? (
            <div className="catalog-empty" role="status">
              <span className="catalog-empty-icon" aria-hidden="true"><Icon name="search" /></span>
              <div><strong>Online product listings aren’t published yet.</strong><p>Search and filters can guide you to the right category or brand. Contact us to confirm products, prices, and availability.</p></div>
              <a className="button button-primary" href={whatsappInquiry([brand, selectedCategory?.title, "current availability"].filter(Boolean).join(" "))} target="_blank" rel="noopener noreferrer">Ask on WhatsApp <span aria-hidden="true">↗</span></a>
            </div>
          ) : (
            <section className="inventory-section" aria-label="Product listings">
              <div className="inventory-grid">{visibleProducts.map((product) => <ProductCard product={product} key={product.slug} />)}</div>
              {visibleProducts.length === 0 && <p className="catalog-empty" role="status">No listed products match these filters.</p>}
            </section>
          )}

          <div className="catalog-grid">
            {visibleCategories.map((item) => <CategoryCard category={item} activeBrand={brand} onSelectBrand={setBrand} key={item.id} />)}
          </div>
          {visibleCategories.length === 0 && <div className="catalog-no-results" role="status"><strong>No matching category or brand found.</strong><p>Try a different search, or contact us and we’ll help point you in the right direction.</p><a href={whatsappInquiry(search || "a product recommendation")} target="_blank" rel="noopener noreferrer">Ask NI DIGITAL on WhatsApp ↗</a></div>}
          <p className="catalog-note">Category photos are illustrative. Brand names are inquiry filters and don’t indicate current stock. We’ll confirm product details before you decide.</p>
        </div>
      </section>

      <ServicePanel
        eyebrow="Need a recommendation?"
        title="Let’s find your"
        highlight="right fit."
        description="Share what you need and how you’ll use it. Our team is happy to help you explore the options."
        points={["Personal guidance", "Options for your needs", "Genuine products", "Local support in Ratnapura"]}
      />
    </main>
  );
}

function AboutPage() {
  return (
    <main className="page-main">
      <PageHero
        className="about-page-hero"
        eyebrow="Get to know us"
        description="We’re NI DIGITAL: a local technology and electronics company in Ratnapura, helping individuals and businesses find dependable digital products and friendly, personal service."
        visual={<AboutHeroVisual />}
        actions={
          <div className="button-row">
            <a className="button button-primary" href={PRODUCTS_URL}>Explore our products <span aria-hidden="true">↗</span></a>
            <a className="button button-quiet" href={`${HOME_URL}#contact`}>Get in touch</a>
          </div>
        }
      >
        <h1>Technology is better with <span className="gradient-text">people behind it.</span></h1>
      </PageHero>

      <section className="section about-story-section">
        <div className="container about-story">
          <div className="about-story-visual reveal">
            <img src={LOGO_URL} alt="NI DIGITAL — powering your digital future" loading="lazy" />
          </div>
          <div className="about-story-copy reveal">
            <Eyebrow>Who we are</Eyebrow>
            <h2>Local service. <span className="gradient-text">A brighter digital future.</span></h2>
            <p>NI DIGITAL is committed to making modern technology accessible, affordable and dependable. We offer technology products including laptops, desktop computers, mobile phones, tablets, printers and IT accessories from trusted global brands.</p>
            <p>Whether you’re a student preparing for class, a professional upgrading your setup or a business looking for reliable technology, we’re here to help you explore the options and make an informed choice.</p>
            <p>Based in Batugedara, Ratnapura, we serve our local community and customers across Sri Lanka with integrity, quality assurance and a focus on lasting customer relationships.</p>
          </div>
        </div>
      </section>

      <section className="section values-detail-section">
        <div className="container vision-mission">
          <article className="vision-card reveal">
            <span>Our vision</span>
            <h3>A trusted name in technology.</h3>
            <p>To become Sri Lanka’s leading and most trusted digital technology provider, recognized for quality products, innovative solutions and exceptional customer experiences.</p>
          </article>
          <article className="vision-card reveal">
            <span>Our mission</span>
            <h3>Technology that empowers.</h3>
            <p>To empower individuals and businesses through genuine technology products, innovative digital solutions and outstanding customer service—always grounded in professionalism, integrity and reliability.</p>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="container values-grid">
          <div className="values-intro reveal">
            <Eyebrow>What we stand for</Eyebrow>
            <h2>Good service starts with <span className="gradient-text">good values.</span></h2>
            <p>Our values shape how we serve customers, choose the products we offer and build trust with our community.</p>
          </div>
          <div className="values-cards">
            {["Quality", "Integrity", "Customer commitment", "Innovation", "Excellence"].map((value) => (
              <div className="value-card reveal" key={value}><Icon name="check" />{value}</div>
            ))}
          </div>
        </div>
      </section>

      <ServicePanel
        eyebrow="Come say hello"
        title="We’re right here in"
        highlight="Ratnapura."
        description="Have a question or need a recommendation? Get in touch—we’d be glad to help."
        points={[
          <a className="service-point" href={PHONE_LINK} key="phone"><Icon name="check" />{PHONE}</a>,
          <a className="service-point" href={`mailto:${EMAIL}`} key="email"><Icon name="check" />{EMAIL}</a>,
          <a className="service-point" href={MAP} target="_blank" rel="noopener noreferrer" key="location"><Icon name="check" />Batugedara, Ratnapura</a>,
          <a className="service-point" href={WHATSAPP} target="_blank" rel="noopener noreferrer" key="whatsapp"><Icon name="check" />Chat with us on WhatsApp</a>,
        ]}
      />
    </main>
  );
}

export default function App() {
  const path = window.location.pathname.toLowerCase();
  const page = path.endsWith("/products.html")
    ? "products"
    : path.endsWith("/about.html")
      ? "about"
      : "home";

  useEffect(() => {
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    document.documentElement.classList.add("is-animated");
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((item) => revealObserver.observe(item));

    return () => {
      revealObserver.disconnect();
      document.documentElement.classList.remove("is-animated");
    };
  }, [page]);

  const Page = page === "products" ? ProductsPage : page === "about" ? AboutPage : HomePage;

  return (
    <>
      <Header page={page} />
      <Page />
      <Footer page={page} />
      <RobotCompanion />
      <WhatsAppButton />
    </>
  );
}
