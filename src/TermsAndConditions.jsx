export default function TermsAndConditions() {
  return (
    <main className="page-wrap terms-page">
      <section className="terms-hero">
        <p className="section-label">Legal</p>
        <h1>
          TERMS &amp;
          <br />
          CONDITIONS
        </h1>
        <p className="hero-sub">
          Please read these terms carefully before placing an order or using the WedWow website.
          By using our site or placing an order, you agree to the terms set out below.
        </p>
      </section>

      <section className="terms-content-section">
        <div className="terms-grid">
          <aside className="terms-sidebar">
            <p className="section-label">Contents</p>
            <nav className="terms-nav">
              <a href="#overview">1. Overview</a>
              <a href="#orders">2. Orders &amp; Payment</a>
              <a href="#customisation">3. Customisation</a>
              <a href="#delivery">4. Delivery</a>
              <a href="#returns">5. Returns &amp; Refunds</a>
              <a href="#liability">6. Liability</a>
              <a href="#ip">7. Intellectual Property</a>
              <a href="#privacy">8. Privacy</a>
              <a href="#changes">9. Changes to Terms</a>
              <a href="#contact">10. Contact Us</a>
            </nav>
          </aside>

          <div className="terms-body">
            <div id="overview" className="terms-section">
              <h2>1. OVERVIEW</h2>
              <p>
                WedWow is a UK-based supplier of custom event wearables and accessories, including
                LED silicone bracelets, festival sunglasses, wristbands and related products.
                These Terms and Conditions govern your use of our website (wedwow.co.uk) and any
                orders placed with us, whether through the site, by email, or via our enquiry form.
              </p>
              <p>
                By accessing our website or placing an order, you confirm that you are at least 18
                years old and have the legal authority to enter into a binding agreement.
              </p>
            </div>

            <div id="orders" className="terms-section">
              <h2>2. ORDERS &amp; PAYMENT</h2>
              <p>
                All orders are subject to confirmation by WedWow. An order is not confirmed until
                you receive a written confirmation from our team. We reserve the right to decline
                any order at our discretion.
              </p>
              <p>
                Pricing is provided on a per-quote basis and may vary depending on product type,
                quantity, customisation requirements, and delivery timeline. All prices are
                exclusive of VAT unless stated otherwise.
              </p>
              <p>
                Payment terms will be confirmed at the point of order. We may require a deposit
                before commencing production on custom or bulk orders.
              </p>
            </div>

            <div id="customisation" className="terms-section">
              <h2>3. CUSTOMISATION</h2>
              <p>
                When placing a custom order, you are responsible for providing accurate artwork,
                text, colours and specifications. WedWow will not be liable for errors resulting
                from incorrect information supplied by the customer.
              </p>
              <p>
                You confirm that any logos, images or text provided for customisation are owned
                by you or that you have the necessary rights and permissions to use them. WedWow
                accepts no liability for any intellectual property infringement arising from
                customer-supplied content.
              </p>
              <p>
                A digital proof will be provided for approval before production begins. Once you
                have approved the proof, the order enters production and changes can no longer
                be made.
              </p>
            </div>

            <div id="delivery" className="terms-section">
              <h2>4. DELIVERY</h2>
              <p>
                Estimated delivery timeframes are provided at the point of order and are
                approximate. WedWow will make reasonable efforts to meet agreed deadlines but
                cannot guarantee delivery dates affected by third-party courier delays,
                customs, or circumstances beyond our control.
              </p>
              <p>
                Risk of loss or damage to goods passes to the customer upon delivery. If your
                order arrives damaged, please notify us within 48 hours with photographic evidence
                so we can assist.
              </p>
            </div>

            <div id="returns" className="terms-section">
              <h2>5. RETURNS &amp; REFUNDS</h2>
              <p>
                Due to the bespoke and custom nature of our products, we are unable to accept
                returns or offer refunds once production has commenced, unless the item is faulty
                or does not match the approved proof.
              </p>
              <p>
                If you receive an order that is defective or materially different from what was
                agreed, please contact us within 7 days of delivery. We will investigate and,
                where appropriate, offer a replacement or refund.
              </p>
              <p>
                For non-custom products, returns may be accepted within 14 days of delivery
                provided the items are unused and in their original condition. Return shipping
                costs are the responsibility of the customer unless the item is faulty.
              </p>
            </div>

            <div id="liability" className="terms-section">
              <h2>6. LIABILITY</h2>
              <p>
                WedWow's total liability in connection with any order shall not exceed the amount
                paid by the customer for that order. We are not liable for any indirect, special,
                or consequential losses, including loss of profit, loss of enjoyment, or event
                cancellation costs.
              </p>
              <p>
                Nothing in these terms limits our liability for death or personal injury caused
                by our negligence, or for fraud or fraudulent misrepresentation.
              </p>
            </div>

            <div id="ip" className="terms-section">
              <h2>7. INTELLECTUAL PROPERTY</h2>
              <p>
                All content on the WedWow website, including text, images, logos, designs and
                graphics, is the intellectual property of WedWow unless otherwise stated. You
                may not reproduce, distribute or use any content from this website without our
                prior written permission.
              </p>
            </div>

            <div id="privacy" className="terms-section">
              <h2>8. PRIVACY</h2>
              <p>
                We collect and use your personal information in accordance with applicable data
                protection laws. Information you provide through our enquiry form or order
                process is used solely for the purpose of processing your enquiry or order,
                and is not sold or shared with third parties for marketing purposes.
              </p>
              <p>
                By using our website, you consent to our use of your data in this way.
              </p>
            </div>

            <div id="changes" className="terms-section">
              <h2>9. CHANGES TO TERMS</h2>
              <p>
                WedWow reserves the right to update these Terms and Conditions at any time.
                Changes will be published on this page with an updated effective date. Continued
                use of our website or services following any update constitutes your acceptance
                of the revised terms.
              </p>
              <p>
                These terms were last updated in May 2026.
              </p>
            </div>

            <div id="contact" className="terms-section">
              <h2>10. CONTACT US</h2>
              <p>
                If you have any questions about these Terms and Conditions, please get in touch
                via our enquiry form or email us directly.
              </p>
              <a href="/#enquiry" className="btn-primary" style={{ display: 'inline-block', marginTop: '1rem' }}>
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
