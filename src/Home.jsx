import { useEffect, useState } from 'react';
import braceletImg from '../Asset/bracelet.png';

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
      'Fully customisable LED wristbands in any colour, with your logo, name or message printed.',
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
                <img
                  src={braceletImg}
                  alt=""
                  className="featured-bracelet-img"
                  aria-hidden="true"
                />
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

    </>
  );
}
