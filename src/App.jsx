import React, { useEffect, useState } from "react";

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

function Header({ page }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const homeContact = page === "home" ? "#contact" : `${HOME_URL}#contact`;

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
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
            if (event.target.closest("a")) closeMenu();
          }}
        >
          <a href={`${HOME_URL}#home`}>Home</a>
          <a href={PRODUCTS_URL} aria-current={page === "products" ? "page" : undefined}>Products</a>
          <a href={ABOUT_URL} aria-current={page === "about" ? "page" : undefined}>About us</a>
          <a href={homeContact}>Contact</a>
          <a className="nav-cta" href={WHATSAPP} target="_blank" rel="noopener noreferrer">
            Let’s talk <span aria-hidden="true">↗</span>
          </a>
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

function HomePage() {
  const products = [
    { title: "Laptops", copy: "Ready for work, study and play.", icon: "laptop", anchor: "laptops", label: "laptops" },
    { title: "Desktops", copy: "Reliable setups for home and office.", icon: "desktop", anchor: "desktops", label: "desktops" },
    { title: "Mobile phones", copy: "Stay in touch wherever you go.", icon: "mobile", anchor: "phones", label: "mobile phones" },
    { title: "Printers", copy: "Print essentials for every workspace.", icon: "printer", anchor: "printers", label: "printers" },
    { title: "IT accessories", copy: "Small essentials. Smoother days.", icon: "accessories", anchor: "accessories", label: "IT accessories" },
  ];

  return (
    <main>
      <section className="hero" id="home">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="availability"><span aria-hidden="true" /> Your local technology partner in Ratnapura</div>
            <h1>Technology for <span className="gradient-text">what’s next.</span></h1>
            <p>Find the right tech for work, study and everything in between. Explore genuine devices and accessories, backed by friendly advice and dependable service.</p>
            <div className="button-row">
              <a className="button button-primary" href={PRODUCTS_URL}>
                Explore what we offer
                <Icon name="arrow" />
              </a>
              <a className="button button-quiet" href={PHONE_LINK}>Call us <span aria-hidden="true">↗</span></a>
            </div>
            <div className="hero-note">
              <Icon name="check" />
              Genuine technology. Personal service. Right here in Ratnapura.
            </div>
          </div>
          <div className="hero-art" aria-label="NI DIGITAL logo">
            <div className="art-orbit" aria-hidden="true" />
            <div className="logo-rings" aria-hidden="true">
              <span className="logo-ring logo-ring-one" />
              <span className="logo-ring logo-ring-two" />
              <span className="logo-ring logo-ring-three" />
            </div>
            <div className="floating-chip chip-top">
              <Icon name="shield" />
              Quality you can count on
            </div>
            <div className="hero-logo"><img src={LOGO_URL} alt="" /></div>
            <div className="floating-chip chip-bottom">
              <Icon name="shield" />
              Trusted local support
            </div>
          </div>
        </div>
      </section>

      <div className="trust-strip" aria-label="Our commitments">
        <div className="container trust-items">
          <div className="trust-item"><Icon name="shield" />Quality products from trusted brands</div>
          <div className="trust-item"><Icon name="shield" />Honest advice, tailored to you</div>
          <div className="trust-item"><Icon name="pin" />Proudly serving Ratnapura, Sri Lanka</div>
        </div>
      </div>

      <section className="section products-section" id="products">
        <div className="container">
          <div className="section-heading reveal">
            <Eyebrow>Find your next upgrade</Eyebrow>
            <h2>Everything you need to stay <span className="gradient-text">connected.</span></h2>
            <p>From your next everyday essential to the tools that power your business, we’ll help you find the right fit.</p>
          </div>
          <div className="products-grid">
            {products.map((product) => (
              <a
                className="product-card reveal"
                href={`${PRODUCTS_URL}#${product.anchor}`}
                aria-label={`Explore ${product.label}`}
                key={product.anchor}
              >
                <div className="product-icon"><Icon name={product.icon} /></div>
                <h3>{product.title}</h3>
                <p>{product.copy}</p>
                <span className="product-arrow" aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
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
            <p><strong>NI DIGITAL</strong> is a Sri Lanka-based technology and electronics company committed to delivering genuine digital products and reliable IT solutions. We offer laptops, desktop computers, mobile phones, printers and accessories from trusted global brands.</p>
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

const productCategories = [
  {
    id: "laptops",
    image: "product-laptops.jpg",
    alt: "Laptop ready for a home or office workspace",
    number: "01 / COMPUTING",
    title: "Laptops",
    description: "Portable computers for learning, everyday work and creative projects.",
    tags: ["Everyday use", "Study & work", "Performance"],
    message: "laptop",
  },
  {
    id: "desktops",
    image: "product-desktops.jpg",
    alt: "Desktop computer and monitor set up for work or gaming",
    number: "02 / COMPUTING",
    title: "Desktop computers",
    description: "Desktop setups and essential computing for workspaces, homes and businesses.",
    tags: ["Home & office", "Business", "Accessories"],
    message: "desktop computer",
  },
  {
    id: "phones",
    image: "product-phones.jpg",
    alt: "Smartphone for everyday communication and connectivity",
    number: "03 / CONNECTIVITY",
    title: "Mobile phones",
    description: "Stay in touch and keep the apps, photos and tools you use every day close by.",
    tags: ["Smartphones", "Everyday use", "Mobile essentials"],
    message: "mobile phone",
  },
  {
    id: "printers",
    image: "product-printers.jpg",
    alt: "Multifunction printer in a workspace",
    number: "04 / OFFICE",
    title: "Printers",
    description: "Printing essentials for your home, classroom or busy office.",
    tags: ["Home", "Study", "Office"],
    message: "printer",
  },
  {
    id: "accessories",
    image: "product-accessories.jpg",
    alt: "Headphones and useful personal technology accessories",
    number: "05 / EVERYDAY TECH",
    title: "IT accessories",
    description: "Useful add-ons and everyday essentials to complete your setup.",
    tags: ["Audio", "Peripherals", "Connectivity"],
    message: "IT accessories",
  },
];

function PageHero({ eyebrow, children, description, actions, className = "" }) {
  return (
    <section className={`page-hero ${className}`}>
      <div className="container reveal">
        <Eyebrow>{eyebrow}</Eyebrow>
        {children}
        <p>{description}</p>
        {actions}
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

function ProductsPage() {
  return (
    <main className="page-main">
      <PageHero
        eyebrow="Explore NI DIGITAL"
        description="From everyday devices to the essentials that keep your workspace running, explore our product categories. Tell us what you’re looking for and we’ll help you check the latest options."
        actions={
          <div className="button-row">
            <a className="button button-primary" href="#catalog">Browse categories <span aria-hidden="true">↓</span></a>
            <a className="button button-quiet" href={`${WHATSAPP}?text=Hi%20NI%20DIGITAL%2C%20I%27d%20like%20to%20ask%20about%20your%20products.`} target="_blank" rel="noopener noreferrer">
              Ask about availability <span aria-hidden="true">↗</span>
            </a>
          </div>
        }
      >
        <h1>Find the right tech for <span className="gradient-text">your next move.</span></h1>
      </PageHero>

      <section className="section catalog-section" id="catalog">
        <div className="container">
          <div className="section-heading reveal">
            <Eyebrow>Our product categories</Eyebrow>
            <h2>Everyday essentials. <span className="gradient-text">Better connected.</span></h2>
            <p>Choose a category to ask about current options. Our team can help you find a fit for your work, studies, home or business.</p>
          </div>
          <div className="catalog-grid">
            {productCategories.map((product) => (
              <article className="catalog-card reveal" id={product.id} key={product.id}>
                <div className="catalog-image">
                  <img src={`${BASE_URL}assets/${product.image}`} alt={product.alt} loading="lazy" />
                </div>
                <div className="catalog-content">
                  <span className="catalog-number">{product.number}</span>
                  <h2>{product.title}</h2>
                  <p>{product.description}</p>
                  <div className="catalog-list">
                    {product.tags.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                  <a
                    className="text-link"
                    href={`${WHATSAPP}?text=Hi%20NI%20DIGITAL%2C%20I%27m%20interested%20in%20${encodeURIComponent(product.message)}%20options.`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ask about {product.message === "IT accessories" ? "accessories" : `${product.message}${product.message.endsWith("s") ? "" : "s"}`}
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
          <p className="catalog-note">Product photos illustrate each category. For current models, prices and availability, please contact NI DIGITAL directly.</p>
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
            <p>NI DIGITAL is committed to making modern technology accessible, affordable and dependable. We offer a wide range of genuine technology products, including laptops, desktop computers, mobile phones, printers and IT accessories from trusted global brands.</p>
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
      <WhatsAppButton />
    </>
  );
}
