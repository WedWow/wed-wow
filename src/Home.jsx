import { useEffect, useState } from 'react';

const tickerItems = [
  'Weddings',
  'Music Festivals',
  'Corporate Gifting',
  'Nightclubs',
  'Hen Parties',
  'Stag Dos',
  'Brand Events',
  'Concerts',
];

const products = [
  {
    className: 'card-led featured',
    tag: 'Bestseller',
    title: (
      <>
        CUSTOM LED
        <br />
        SILICONE
        <br />
        BRACELET
      </>
    ),
    description:
      'Our flagship product. Fully customisable LED wristbands in any colour, with your logo, name or message printed or engraved. Available in flash, pulse and solid modes.',
    arrow: 'Enquire for pricing →',
    featured: true,
  },
  {
    className: 'card-glasses',
    icon: '🕶',
    tag: 'Party Essential',
    title: 'YELLOW FESTIVAL SUNGLASSES',
    description:
      'Bold yellow lenses. Unforgettable look. Perfect festival and wedding favour.',
    arrow: 'Enquire →',
  },
  {
    className: 'card-groom',
    icon: '💍',
    tag: 'Wedding',
    title: 'TEAM BRIDE / TEAM GROOM WRISTBANDS',
    description: 'Side-your-squad wristbands for the bridal party.',
    arrow: 'Enquire →',
  },
  {
    className: 'card-party',
    icon: '🔴',
    tag: 'Nightclub',
    title: 'RED / GREEN NIGHTCLUB WRISTBANDS',
    description:
      'Crowd control made stylish. Instant visual signals for VIP, entry and bar access.',
    arrow: 'Enquire →',
  },
  {
    className: 'card-coming',
    icon: '✦',
    tag: 'Coming Soon',
    title: 'MORE PRODUCTS DROPPING SOON',
    description: "We're constantly expanding our range. Sign up to be notified first.",
  },
];

const occasions = [
  {
    icon: '💍',
    name: 'Weddings',
    desc: 'Custom LED bracelets and team wristbands for the whole bridal party',
  },
  {
    icon: '🎪',
    name: 'Festivals',
    desc: 'High-visibility branded wearables your crowd will actually want to keep',
  },
  {
    icon: '🏢',
    name: 'Corporate Gifting',
    desc: 'Premium branded accessories that stand out in a sea of boring merch',
  },
  {
    icon: '🎶',
    name: 'Nightclubs',
    desc: 'Wristbands for entry management, VIP access and pure atmosphere',
  },
  {
    icon: '🎉',
    name: 'Private Events',
    desc: 'Hen dos, stag parties, birthdays — make it memorable',
  },
];

const steps = [
  {
    num: '01',
    title: 'Submit Your Enquiry',
    desc: 'Fill in the form below with your event type, quantity needed and any branding requirements.',
  },
  {
    num: '02',
    title: 'Get a Custom Quote',
    desc: "We'll come back to you with bulk pricing, lead times and design options within 24 hours.",
  },
  {
    num: '03',
    title: 'Approve Your Design',
    desc: 'We send a digital proof for your sign-off before anything goes into production.',
  },
  {
    num: '04',
    title: 'Delivered to Your Door',
    desc: 'Your order arrives packaged and ready to use — well before your event date.',
  },
];

const initialForm = {
  fname: '',
  lname: '',
  email: '',
  company: '',
  product: '',
  quantity: '',
  occasion: '',
  message: '',
};

export default function Home() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    const animatedElements = document.querySelectorAll(
      '.product-card, .occasion-item, .how-step'
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    animatedElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };


  const submitForm = async (event) => {
    event.preventDefault();
  
    const fname = form.fname.trim();
    const email = form.email.trim();
    const product = form.product;
    const quantity = form.quantity.trim();
  
    if (!fname || !email || !product || !quantity) {
      window.alert('Please fill in your name, email, product and quantity to continue.');
      return;
    }
  
    if (!/\S+@\S+\.\S+/.test(email)) {
      window.alert('Please enter a valid email address.');
      return;
    }
  
    setIsSending(true);
  
    try {
      const response = await fetch('https://api.staticforms.dev/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          apiKey: import.meta.env.VITE_STATIC_FORMS_API_KEY,
  
          name: `${form.fname} ${form.lname}`.trim(),
          firstName: form.fname,
          lastName: form.lname,
          email: form.email,
          company: form.company,
          product: form.product,
          quantity: form.quantity,
          occasion: form.occasion,
          message: form.message,
  
          subject: `New Wedwow enquiry from ${form.fname}`,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Static Forms rejected the submission.');
      }
  
      setSubmitted(true);
      setForm(initialForm);
    } catch (error) {
      console.error(error);
      window.alert('Sorry, something went wrong. Please email sales@wedwow.com directly.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>


      <section className="hero" id="home">
        <div className="hero-bg" />
        <div className="hero-left">
          <p className="hero-eyebrow">Custom Light-Up Accessories</p>
          <h1>
            LIGHT
            <br />
            UP
            <br />
            EVERY
            <br />
            <span className="accent">MOMENT.</span>
          </h1>
          <p className="hero-sub">
            Create unforgettable moments with custom LED wearables, party accessories,
            and branded event products. Designed for weddings, festivals, nightclubs,
            and corporate events.
          </p>
          <div className="hero-actions">
            <a href="#products" className="btn-primary">
              See Products
            </a>
            <a href="#enquiry" className="btn-outline">
              Bulk Enquiry
            </a>
          </div>
        </div>

        <div className="hero-right">
          <div className="bracelet-showcase" aria-label="LED silicone bracelet visual">
            <div className="bracelet-ring ring-1" />
            <div className="bracelet-ring ring-2" />
            <div className="bracelet-ring ring-3" />
            <div className="bracelet-core">
              <div className="bracelet-text">
                LED
                <br />
                SILICONE
                <br />
                <small>BRACELET</small>
              </div>
            </div>
            <div className="floating-dot dot-1" />
            <div className="floating-dot dot-2" />
            <div className="floating-dot dot-3" />
          </div>
        </div>
      </section>

      <div className="ticker-wrap" aria-label="Use cases">
        <div className="ticker">
          {[...tickerItems, ...tickerItems].map((item, index) => (
            <span className="ticker-item" key={`${item}-${index}`}>
              {item}
            </span>
          ))}
        </div>
      </div>

      <section id="products">
        <div className="products-header">
          <p className="section-label">Our Range</p>
          <h2>PRODUCTS THAT POP</h2>
          <p>
            Every product is available with custom branding, colours and packaging.
            Prices drop with quantity — enquire below for bulk rates.
          </p>
        </div>

        <div className="products-grid">
          {products.map((product) => (
            <div
              className={`product-card ${product.className}`}
              key={typeof product.title === 'string' ? product.title : product.tag}
            >
              {product.featured ? (
                <svg
                  className="featured-bracelet-img"
                  viewBox="0 0 600 800"
                  preserveAspectRatio="xMidYMin slice"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <defs>
                    <filter id="glow-soft" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="6" result="blur"/>
                      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                    </filter>
                    <filter id="glow-med" x="-80%" y="-80%" width="260%" height="260%">
                      <feGaussianBlur stdDeviation="14" result="blur"/>
                      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                    </filter>
                    <filter id="glow-strong" x="-100%" y="-100%" width="300%" height="300%">
                      <feGaussianBlur stdDeviation="26" result="blur"/>
                      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                    </filter>
                    <radialGradient id="bgGlow" cx="50%" cy="42%" r="55%">
                      <stop offset="0%" stopColor="#d4ff47" stopOpacity="0.22"/>
                      <stop offset="55%" stopColor="#d4ff47" stopOpacity="0.07"/>
                      <stop offset="100%" stopColor="#d4ff47" stopOpacity="0"/>
                    </radialGradient>
                    <radialGradient id="bandGrad" cx="50%" cy="25%" r="65%">
                      <stop offset="0%" stopColor="#6a6a6a"/>
                      <stop offset="45%" stopColor="#484848"/>
                      <stop offset="100%" stopColor="#2e2e2e"/>
                    </radialGradient>
                    <radialGradient id="bandSheen" cx="50%" cy="15%" r="60%">
                      <stop offset="0%" stopColor="#909090" stopOpacity="0.9"/>
                      <stop offset="100%" stopColor="#1a1a1a" stopOpacity="0"/>
                    </radialGradient>
                  </defs>
                  <ellipse cx="300" cy="340" rx="350" ry="240" fill="url(#bgGlow)"/>
                  <ellipse cx="300" cy="340" rx="270" ry="98" fill="none" stroke="#d4ff47" strokeWidth="30" opacity="0.12" filter="url(#glow-strong)"/>
                  <ellipse cx="300" cy="362" rx="252" ry="76" fill="#000" opacity="0.5"/>
                  <ellipse cx="300" cy="340" rx="264" ry="94" fill="url(#bandGrad)"/>
                  <ellipse cx="300" cy="340" rx="196" ry="64" fill="#0a0a0a"/>
                  <ellipse cx="300" cy="320" rx="220" ry="52" fill="url(#bandSheen)" opacity="0.65"/>
                  <ellipse cx="300" cy="340" rx="264" ry="94" fill="none" stroke="#484848" strokeWidth="2"/>
                  <ellipse cx="300" cy="340" rx="196" ry="64" fill="none" stroke="#060606" strokeWidth="5"/>
                  <ellipse cx="300" cy="340" rx="264" ry="94" fill="none" stroke="#d4ff47" strokeWidth="26" opacity="0.16" filter="url(#glow-strong)"/>
                  <ellipse cx="300" cy="340" rx="264" ry="94" fill="none" stroke="#d4ff47" strokeWidth="11" opacity="0.48" filter="url(#glow-med)"/>
                  <ellipse cx="300" cy="340" rx="264" ry="94" fill="none" stroke="#d4ff47" strokeWidth="5.5" opacity="0.78" filter="url(#glow-soft)"/>
                  <ellipse cx="300" cy="340" rx="264" ry="94" fill="none" stroke="#d4ff47" strokeWidth="3" strokeDasharray="14 8" opacity="1" filter="url(#glow-soft)"/>
                  <circle cx="300" cy="246" r="8" fill="#d4ff47" filter="url(#glow-strong)" opacity="1"/>
                  <circle cx="370" cy="250" r="6" fill="#d4ff47" filter="url(#glow-med)" opacity="0.96"/>
                  <circle cx="230" cy="250" r="6" fill="#d4ff47" filter="url(#glow-med)" opacity="0.96"/>
                  <circle cx="436" cy="263" r="5.5" fill="#d4ff47" filter="url(#glow-med)" opacity="0.94"/>
                  <circle cx="164" cy="263" r="5.5" fill="#d4ff47" filter="url(#glow-med)" opacity="0.94"/>
                  <circle cx="492" cy="282" r="5" fill="#d4ff47" filter="url(#glow-med)" opacity="0.90"/>
                  <circle cx="108" cy="282" r="5" fill="#d4ff47" filter="url(#glow-med)" opacity="0.90"/>
                  <circle cx="536" cy="308" r="4.5" fill="#d4ff47" filter="url(#glow-soft)" opacity="0.82"/>
                  <circle cx="64" cy="308" r="4.5" fill="#d4ff47" filter="url(#glow-soft)" opacity="0.82"/>
                  <circle cx="555" cy="340" r="4" fill="#d4ff47" filter="url(#glow-soft)" opacity="0.70"/>
                  <circle cx="45" cy="340" r="4" fill="#d4ff47" filter="url(#glow-soft)" opacity="0.70"/>
                  <circle cx="300" cy="434" r="5" fill="#d4ff47" filter="url(#glow-soft)" opacity="0.42"/>
                  <circle cx="370" cy="430" r="4" fill="#d4ff47" filter="url(#glow-soft)" opacity="0.36"/>
                  <circle cx="230" cy="430" r="4" fill="#d4ff47" filter="url(#glow-soft)" opacity="0.36"/>
                  <circle cx="436" cy="417" r="3.5" fill="#d4ff47" filter="url(#glow-soft)" opacity="0.30"/>
                  <circle cx="164" cy="417" r="3.5" fill="#d4ff47" filter="url(#glow-soft)" opacity="0.30"/>
                  <ellipse cx="300" cy="340" rx="196" ry="64" fill="none" stroke="#d4ff47" strokeWidth="2.5" opacity="0.36" filter="url(#glow-soft)"/>
                  <text x="300" y="347" fontFamily="'Bebas Neue', 'Arial Black', sans-serif" fontSize="18" letterSpacing="10" fill="#d4ff47" textAnchor="middle" opacity="0.52" filter="url(#glow-soft)">WEDWOW</text>
                  <g transform="translate(76, 180)" opacity="0.6">
                    <line x1="0" y1="-11" x2="0" y2="11" stroke="#d4ff47" strokeWidth="1.5"/>
                    <line x1="-11" y1="0" x2="11" y2="0" stroke="#d4ff47" strokeWidth="1.5"/>
                    <line x1="-6" y1="-6" x2="6" y2="6" stroke="#d4ff47" strokeWidth="0.8" opacity="0.5"/>
                    <line x1="6" y1="-6" x2="-6" y2="6" stroke="#d4ff47" strokeWidth="0.8" opacity="0.5"/>
                  </g>
                  <g transform="translate(516, 192)" opacity="0.45">
                    <line x1="0" y1="-9" x2="0" y2="9" stroke="#d4ff47" strokeWidth="1.5"/>
                    <line x1="-9" y1="0" x2="9" y2="0" stroke="#d4ff47" strokeWidth="1.5"/>
                  </g>
                  <circle cx="88" cy="215" r="3.5" fill="#d4ff47" opacity="0.30"/>
                  <circle cx="510" cy="455" r="3" fill="#d4ff47" opacity="0.24"/>
                  <circle cx="550" cy="264" r="2.5" fill="#d4ff47" opacity="0.38"/>
                  <circle cx="38" cy="416" r="2" fill="#d4ff47" opacity="0.24"/>
                  <circle cx="300" cy="115" r="2.5" fill="#d4ff47" opacity="0.20"/>
                  <circle cx="562" cy="360" r="2" fill="#d4ff47" opacity="0.16"/>
                  <ellipse cx="300" cy="340" rx="300" ry="124" fill="none" stroke="#d4ff47" strokeWidth="0.8" opacity="0.10"/>
                  <ellipse cx="300" cy="340" rx="328" ry="144" fill="none" stroke="#d4ff47" strokeWidth="0.5" opacity="0.06"/>
                </svg>
              ) : (
                <div className="card-bg">{product.icon}</div>
              )}
              <div className="card-glow" />
              <div className="card-content">
                <span className="card-tag">{product.tag}</span>
                <div className="card-title">{product.title}</div>
                <p className="card-desc">{product.description}</p>
                {product.arrow && <span className="card-arrow">{product.arrow}</span>}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="occasions">
        <p className="section-label">Who We Serve</p>
        <h2>MADE FOR YOUR MOMENT</h2>
        <div className="occasions-grid">
          {occasions.map((occasion) => (
            <div className="occasion-item" key={occasion.name}>
              <span className="occasion-icon">{occasion.icon}</span>
              <div className="occasion-name">{occasion.name}</div>
              <div className="occasion-desc">{occasion.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="how">
        <p className="section-label">The Process</p>
        <h2>SIMPLE AS THAT</h2>
        <div className="how-grid">
          {steps.map((step) => (
            <div className="how-step" key={step.num}>
              <div className="step-num">{step.num}</div>
              <div className="step-title">{step.title}</div>
              <div className="step-desc">{step.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="gallery">
        <p className="section-label">Gallery</p>
        <h2>READY FOR REAL EVENTS</h2>
        <p className="gallery-copy">
          Add your product/event photos here once you have them. This section replaces
          the Shopify-only gallery link so the page works as a standalone Vercel site.
        </p>
      </section>

      <section id="enquiry">
        <div className="enquiry-wrap">
          <div className="enquiry-left">
            <p className="section-label">Get a Quote</p>
            <h2>BULK PRICING ENQUIRY</h2>
            <p>
              Whether you need 100 or 10,000 units, we've got you covered. Prices scale
              with quantity — tell us what you need and we'll put together a custom quote.
            </p>

            <div className="contact-info">
              <div className="contact-line">
                <span className="contact-icon">✉</span>
                <span>
                  <strong>sales@wedwow.com</strong>
                </span>
              </div>
              <div className="contact-line">
                <span className="contact-icon">⏱</span>
                <span>
                  We reply within <strong>24 hours</strong>
                </span>
              </div>
              <div className="contact-line">
                <span className="contact-icon">📦</span>
                <span>
                  Minimum order quantities apply — <strong>ask us</strong>
                </span>
              </div>
            </div>
          </div>

          <div className="form-wrap">
            {!submitted ? (
              <form id="enquiryForm" onSubmit={submitForm}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="fname">First Name</label>
                    <input
                      type="text"
                      id="fname"
                      name="fname"
                      placeholder="Jane"
                      value={form.fname}
                      onChange={updateField}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lname">Last Name</label>
                    <input
                      type="text"
                      id="lname"
                      name="lname"
                      placeholder="Smith"
                      value={form.lname}
                      onChange={updateField}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="jane@example.com"
                    value={form.email}
                    onChange={updateField}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="company">Company / Event Name (optional)</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    placeholder="Smith & Jones Wedding"
                    value={form.company}
                    onChange={updateField}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="product">Product</label>
                    <select
                      id="product"
                      name="product"
                      value={form.product}
                      onChange={updateField}
                    >
                      <option value="">Select a product…</option>
                      <option>Custom LED Silicone Bracelet</option>
                      <option>Yellow Festival Sunglasses</option>
                      <option>Team Bride / Team Groom Wristbands</option>
                      <option>Red / Green Nightclub Wristbands</option>
                      <option>Multiple Products</option>
                      <option>Not Sure — Advise Me</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="quantity">Estimated Quantity</label>
                    <input
                      type="text"
                      id="quantity"
                      name="quantity"
                      placeholder="100"
                      value={form.quantity}
                      onChange={updateField}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="occasion">Occasion / Event Type</label>
                  <select
                    id="occasion"
                    name="occasion"
                    value={form.occasion}
                    onChange={updateField}
                  >
                    <option value="">Select occasion…</option>
                    <option>Wedding</option>
                    <option>Festival</option>
                    <option>Corporate Event / Gifting</option>
                    <option>Nightclub</option>
                    <option>Hen / Stag Party</option>
                    <option>Birthday / Private Party</option>
                    <option>Concert / Live Event</option>
                    <option>Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Tell us more (branding, colours, deadline…)</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Any custom colours, logo details, event date or anything else we should know…"
                    value={form.message}
                    onChange={updateField}
                  />
                </div>

                <button className="form-submit" type="submit" disabled={isSending}>
  {isSending ? 'SENDING…' : 'SEND ENQUIRY'}
</button>
                <p className="form-note">
                  No spam. No commitment. Just a friendly quote from the Wedwow team.
                </p>
              </form>
            ) : (
              <div className="success-msg">
                <h3>WE GOT IT! ✦</h3>
                <p>
                  Thanks for reaching out. A member of the Wedwow team will be in touch
                  within 24 hours with your custom quote.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-logo">
          WED<span>WOW</span>
        </div>
        <div className="footer-links">
          <a href="#products">Products</a>
          <a href="#occasions">Occasions</a>
          <a href="#enquiry">Bulk Pricing</a>
          <a href="mailto:sales@wedwow.com">Contact</a>
        </div>
        <p className="footer-copy">© 2026 Wedwow. All rights reserved.</p>
      </footer>
    </>
  );
}
