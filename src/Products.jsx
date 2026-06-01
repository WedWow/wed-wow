import mendhiglassesImg from '../Asset/mendhiglasses.png';
import groombrideImg from '../Asset/groombride.png';
import wristbandsImg from '../Asset/wristbands.png';

const products = [
    {
      tag: 'Bestseller',
      title: 'Custom LED Silicone Bracelet',
      description:
        'Our flagship light-up wristband for weddings, festivals, brand activations, concerts and nightlife events. Customise the colour, print, logo, message and packaging.',
      details: [
        'Custom logo, names or event text',
        'Multiple light modes: flash, pulse and solid',
        'Bulk quantities available',
        'Ideal for weddings, festivals and corporate events',
      ],
      icon: '✦',
      className: 'product-detail-led',
      enquiryProduct: 'Custom LED Silicone Bracelet',
    },
    {
      tag: 'Party Essential',
      title: 'Yellow Festival Sunglasses',
      description:
        'Bold yellow festival sunglasses that instantly lift the vibe. Great for photo moments, dancefloors, wedding favours, hen parties and festival packs.',
      details: [
        'Bright yellow party look',
        'Great for group photos',
        'Suitable for weddings, festivals and private parties',
        'Bulk orders available',
      ],
      icon: '🕶',
      className: 'product-detail-glasses',
      enquiryProduct: 'Yellow Festival Sunglasses',
      image: mendhiglassesImg,
    },
    {
      tag: 'Wedding',
      title: 'Team Bride / Team Groom Wristbands',
      description:
        'Fun wristbands for bridal parties, stag dos, hen parties and wedding guests. A simple way to bring everyone together and make the celebration feel personal.',
      details: [
        'Team Bride and Team Groom options',
        'Great for hen and stag parties',
        'Custom colours and wording available',
        'Perfect for wedding favours',
      ],
      icon: '💍',
      className: 'product-detail-groom',
      enquiryProduct: 'Team Bride / Team Groom Wristbands',
      image: groombrideImg,
    },
    {
      tag: 'Nightclub',
      title: 'Red / Green Nightclub Wristbands',
      description:
        'Simple, clear and stylish wristbands for nightlife events. Use them for entry, VIP access, bar access, age checks, sections, groups or visual crowd control.',
      details: [
        'Red and green options',
        'Useful for VIP and entry management',
        'High-visibility event control',
        'Great for clubs, bars and live venues',
      ],
      icon: '🔴',
      className: 'product-detail-party',
      enquiryProduct: 'Red / Green Nightclub Wristbands',
      image: wristbandsImg,
    },
  ];
  
  export default function Products() {
    return (
      <main className="page-wrap products-page">
        <section className="page-hero products-page-hero">
          <p className="section-label">Products</p>
          <h1>
            WEDWOW
            <br />
            PRODUCTS
          </h1>
          <p className="hero-sub">
            Light-up wearables, wedding accessories and event products made for moments
            people actually remember. Every product can be ordered in bulk for weddings,
            festivals, nightclubs, private parties and branded events.
          </p>
          <div className="hero-actions">
            <a href="#product-catalogue" className="btn-primary">
              View Products
            </a>
            <a href="/#enquiry" className="btn-outline">
              Enquiry Form
            </a>
          </div>
        </section>
  
        <section id="product-catalogue" className="product-catalogue-section">
          <div className="products-header">
            <p className="section-label">Catalogue</p>
            <h2>PRODUCTS THAT POP</h2>
            <p>
              Choose a product, tell us your quantity, and we’ll come back with a custom
              quote. Bulk pricing depends on quantity, design requirements, branding and
              delivery deadline.
            </p>
          </div>
  
          <div className="product-detail-grid">
            {products.map((product) => (
              <article className={`product-detail-card ${product.className}`} key={product.title}>
                <div
                  className="product-detail-art"
                  style={product.image ? {
                    backgroundImage: `url(${product.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                  } : undefined}
                >
                  <span>{product.icon}</span>
                </div>
  
                <div className="product-detail-content">
                  <span className="card-tag">{product.tag}</span>
                  <h2>{product.title}</h2>
                  <p>{product.description}</p>
  
                  <ul>
                    {product.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
  
                  <a
                    className="product-detail-link"
                    href={`/#enquiry?product=${encodeURIComponent(product.enquiryProduct)}`}
                  >
                    Enquire for pricing →
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>
  
        <section className="product-custom-section">
          <div>
            <p className="section-label">Custom Orders</p>
            <h2>NEED SOMETHING SPECIFIC?</h2>
          </div>
  
          <p>
            Planning a wedding, festival, nightclub event or brand activation? Tell us the
            product, quantity, colours, logo details and deadline. We’ll help you work out
            the best option for your event and budget.
          </p>
  
          <a href="/#enquiry" className="btn-primary">
            Start an Enquiry
          </a>
        </section>
      </main>
    );
  }