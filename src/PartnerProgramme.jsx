import { useState } from 'react';
import { Link } from 'react-router-dom';
import braceletPhoto from '../Asset/bracelet.png';
import glassesPhoto from '../Asset/mendhiglasses.png';
import weddingBandsPhoto from '../Asset/groombride.png';
import clubBandsPhoto from '../Asset/wristbands.png';
import './PartnerProgramme.css';

const initialForm = {
  partnerType: '',
  company: '',
  contactName: '',
  email: '',
  phone: '',
  country: '',
  businessType: '',
  websiteOrProfile: '',
  eventVolume: '',
  typicalQuantity: '',
  message: '',
  consent: false,
  contactWebsite: '',
};

const businessTypes = [
  'Event agency or event planner',
  'Wedding planner or coordinator',
  'Production, lighting or AV',
  'DJ or entertainment provider',
  'Venue, hotel or hospitality',
  'Corporate events or brand activations',
  'Promotional products or merchandise',
  'Festival, concert or nightclub',
  'Other event business',
];

function Field({ label, id, required = false, help, children }) {
  return (
    <div className="partner-field">
      <label htmlFor={id}>{label}{required && <span aria-hidden="true"> *</span>}</label>
      {children}
      {help && <small>{help}</small>}
    </div>
  );
}

export default function PartnerProgramme() {
  const [form, setForm] = useState(initialForm);
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const update = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }));
  };
  const submit = async (event) => {
    event.preventDefault();
    setError('');
    if (sending) return;
    setSending(true);
    try {
      const response = await fetch('/api/partner-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      let data = {};
      try { data = await response.json(); } catch { /* display safe fallback */ }
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'We could not submit your application. Please try again.');
      }
      setResult(data.preview ? 'preview' : 'sent');
      setForm(initialForm);
    } catch (err) {
      setError(err.message || 'We could not submit your application. Please email sales@wedwow.co.uk.');
    } finally {
      setSending(false);
    }
  };

  return (
    <main className="partner-page">
      <section className="partner-hero" aria-labelledby="partner-title">
        <div className="partner-hero-copy">
          <p className="partner-eyebrow">For event professionals worldwide</p>
          <h1 id="partner-title">THE WEDWOW <span>PARTNER PROGRAMME</span></h1>
          <p className="partner-lead">Make memorable events part of your business.</p>
          <p className="partner-muted">Work with WedWow to bring custom LED wristbands to weddings, corporate celebrations, festivals and live events. Whether you buy for your clients or introduce them to us, we can explore a partnership that fits the way you work.</p>
          <div className="partner-hero-actions">
            <a className="partner-button partner-button-primary" href="#partner-application">Apply to Become a Partner</a>
            <a className="partner-button partner-button-outline" href="#partner-options">Explore the programme</a>
          </div>
        </div>
        <div className="partner-hero-image">
          <img src="/hero-wedwow-v2.webp" alt="Event guests wearing illuminated WedWow wristbands" />
          <span>Light up every moment.</span>
        </div>
      </section>

      <section className="partner-section partner-introduction">
        <div className="partner-section-intro">
          <p className="partner-eyebrow">The experience</p>
          <h2>GIVE YOUR CLIENTS SOMETHING THEY'LL REMEMBER.</h2>
          <p>Our flagship custom LED wristbands turn a crowd into part of the moment. Guests wear the bracelets while colour and light bring a shared sense of energy to the room, from a wedding entrance or first dance to an event countdown or company celebration.</p>
          <p>Custom branding, quantities, specifications and delivery requirements are discussed for each project, so you can find an approach that makes sense for your event.</p>
        </div>
        <div className="partner-photo-panel">
          <img src={braceletPhoto} alt="Custom LED wristband from the WedWow product range" loading="lazy" />
          <div><strong>Our signature product</strong><span>Custom LED silicone bracelets</span></div>
        </div>
      </section>

      <section id="partner-options" className="partner-section partner-options">
        <div className="partner-section-heading">
          <p className="partner-eyebrow">Two ways to work together</p>
          <h2>FIND THE RIGHT PARTNERSHIP.</h2>
          <p>Some partners prefer to supply WedWow products as part of their own service. Others want to introduce customers and leave the quotation and order process to us. Both approaches start with a conversation.</p>
        </div>
        <div className="partner-paths">
          <article className="partner-path">
            <p className="partner-path-label">Trade partnership</p>
            <h3>Build WedWow into your event offering.</h3>
            <p>For agencies, production companies, venues and event professionals who want to purchase wristbands for their own projects or supply them to clients.</p>
            <ul>
              <li>Access preferential trade quotations on eligible projects, subject to approval.</li>
              <li>Discuss artwork and receive digital design mockups before production approval.</li>
              <li>Get assistance with reordering previously agreed designs and quantities.</li>
              <li>Explore enhanced trade arrangements as your order history develops.</li>
            </ul>
            <p className="partner-path-note">Pricing is quoted individually. Trade access and any further benefits depend on written agreement, product specification and quantity.</p>
          </article>
          <article className="partner-path">
            <p className="partner-path-label">Referral partnership</p>
            <h3>Make the introduction. We'll discuss the project.</h3>
            <p>For wedding planners, DJs, event teams and industry contacts who regularly meet people looking for something special for their next event.</p>
            <ul>
              <li>Introduce suitable customers who may benefit from WedWow products.</li>
              <li>WedWow can handle the product enquiry, quotation and design discussions.</li>
              <li>Referral rewards may be available where agreed in advance in writing.</li>
              <li>Talk to us about ongoing introductions for repeat event clients.</li>
            </ul>
            <p className="partner-path-note">There is no standard or guaranteed referral commission. Any reward, attribution and eligibility conditions require a separate agreement.</p>
          </article>
        </div>
      </section>

      <section className="partner-section partner-who">
        <div className="partner-section-heading">
          <p className="partner-eyebrow">Who it's for</p>
          <h2>MADE FOR PEOPLE WHO MAKE EVENTS HAPPEN.</h2>
          <p>We welcome enquiries from established businesses and independent professionals. A company website is helpful but not essential; a relevant social profile or portfolio works too.</p>
        </div>
        <div className="partner-who-grid">
          {['Wedding planners and coordinators', 'Event agencies and corporate organisers', 'Production, lighting and AV teams', 'DJs and entertainment providers', 'Venues, hotels and hospitality groups', 'Festivals, concerts and brand activations'].map((name) => (
            <div className="partner-who-item" key={name}>{name}</div>
          ))}
        </div>
        <p className="partner-note">Applications are welcome worldwide. Any collaboration depends on suitability, product availability and delivery feasibility for the destination.</p>
      </section>

      <section className="partner-section partner-range">
        <div className="partner-section-heading">
          <p className="partner-eyebrow">Beyond the wristband</p>
          <h2>MORE WAYS TO COMPLETE THE EXPERIENCE.</h2>
          <p>LED wristbands are at the heart of WedWow. Depending on the event, our wider accessories range may also be worth considering.</p>
        </div>
        <div className="partner-range-grid">
          <div><img src={glassesPhoto} loading="lazy" alt="Yellow festival sunglasses in the WedWow range" /><h3>Festival sunglasses</h3><p>Bright accessories for celebrations and group moments.</p></div>
          <div><img src={weddingBandsPhoto} loading="lazy" alt="Team Bride and Team Groom wristbands" /><h3>Wedding wristbands</h3><p>Personal touches for wedding parties and guest groups.</p></div>
          <div><img src={clubBandsPhoto} loading="lazy" alt="Red and green event entry wristbands" /><h3>Event access wristbands</h3><p>Clear, wearable accessories for entry and event management.</p></div>
        </div>
      </section>

      <section className="partner-section partner-process">
        <div className="partner-section-heading">
          <p className="partner-eyebrow">How it works</p>
          <h2>STRAIGHTFORWARD FROM THE FIRST CONVERSATION.</h2>
          <p>There's no need to choose products or commit to an order just to apply.</p>
        </div>
        <div className="partner-process-grid">
          <div><strong>Apply</strong><p>Tell us about your business, the events you work on and whether you're interested in trade purchasing or referring customers.</p></div>
          <div><strong>We review your application</strong><p>Every application is reviewed individually. If there's a good fit, we'll contact you to discuss what working together could look like.</p></div>
          <div><strong>Discuss an opportunity</strong><p>For trade enquiries, send through quantities, artwork and event requirements for a tailored quote. For referrals, agree the introduction process first.</p></div>
          <div><strong>Work together again</strong><p>For future projects, we can refer back to agreed designs and specifications to make repeat conversations easier.</p></div>
        </div>
      </section>

      <section className="partner-section partner-faq">
        <div className="partner-section-heading"><p className="partner-eyebrow">Good to know</p><h2>COMMON QUESTIONS.</h2></div>
        <div className="partner-faq-list">
          <details><summary>Is there a minimum number of events or orders to apply?</summary><p>No previous WedWow orders are required to submit an application. Product minimums, quantities and lead times are discussed for each quotation.</p></details>
          <details><summary>Will partner trade pricing be shown publicly?</summary><p>No. Eligible trade pricing is discussed directly and quoted according to the requested specification, quantity and delivery destination.</p></details>
          <details><summary>Can I refer clients rather than purchase wristbands?</summary><p>Yes. Select Referral Partner on the form. If a referral arrangement is suitable, we can agree how introductions and any potential rewards will work before referrals begin.</p></details>
          <details><summary>Does applying guarantee approval or a discount?</summary><p>No. We review applications individually. Pricing, arrangements and benefits are only confirmed in writing.</p></details>
          <details><summary>Can businesses outside the UK join?</summary><p>Yes, international businesses may apply. Availability and shipping arrangements are considered individually.</p></details>
        </div>
      </section>

      <section id="partner-application" className="partner-section partner-apply">
        <div className="partner-apply-intro">
          <p className="partner-eyebrow">Let's work together</p>
          <h2>APPLY TO BECOME A PARTNER.</h2>
          <p>Tell us a little about your business. We'll review your application personally and contact you about the next steps.</p>
          <p>Have a question before applying? Email <a href="mailto:sales@wedwow.co.uk">sales@wedwow.co.uk</a>.</p>
          <p className="partner-note">Applying does not create a partner account, approve trade pricing or establish a referral commission agreement.</p>
        </div>
        <div className="partner-form-panel">
          {result ? (
            <div className="partner-form-success" role="status">
              <h3>{result === 'preview' ? 'Preview form tested.' : 'Application received.'}</h3>
              <p>{result === 'preview' ? 'This is a private preview. No application or confirmation email was sent.' : 'Thanks for your interest. We have received your application for manual review. This does not mean you have been approved.'}</p>
              <button className="partner-button partner-button-outline" type="button" onClick={() => setResult(null)}>Back to application</button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate={false}>
              <h3>Tell us about your business</h3>
              <p className="partner-form-subhead">Fields marked * are required.</p>
              <Field label="Interested in" id="partnerType" required>
                <select id="partnerType" name="partnerType" value={form.partnerType} onChange={update} required>
                  <option value="">Choose an option</option><option value="Trade Partner">Trade Partner</option><option value="Referral Partner">Referral Partner</option><option value="Both / Unsure">Both / I'd like to discuss</option>
                </select>
              </Field>
              <div className="partner-field-row">
                <Field label="Company / business name" id="company" required><input id="company" name="company" autoComplete="organization" maxLength={120} value={form.company} onChange={update} required /></Field>
                <Field label="Contact name" id="contactName" required><input id="contactName" name="contactName" autoComplete="name" maxLength={100} value={form.contactName} onChange={update} required /></Field>
              </div>
              <div className="partner-field-row">
                <Field label="Work email" id="email" required><input id="email" name="email" type="email" autoComplete="email" maxLength={254} value={form.email} onChange={update} required /></Field>
                <Field label="Phone (optional)" id="phone"><input id="phone" name="phone" type="tel" autoComplete="tel" maxLength={40} value={form.phone} onChange={update} /></Field>
              </div>
              <div className="partner-field-row">
                <Field label="Country" id="country" required><input id="country" name="country" autoComplete="country-name" maxLength={80} value={form.country} onChange={update} required /></Field>
                <Field label="Business type" id="businessType" required>
                  <select id="businessType" name="businessType" value={form.businessType} onChange={update} required><option value="">Select your business type</option>{businessTypes.map((type) => <option key={type} value={type}>{type}</option>)}</select>
                </Field>
              </div>
              <Field label="Website, professional social profile or portfolio" id="websiteOrProfile" required help="A company website isn't required. A relevant Instagram, LinkedIn or portfolio link is fine.">
                <input id="websiteOrProfile" name="websiteOrProfile" type="url" placeholder="https://" maxLength={300} value={form.websiteOrProfile} onChange={update} required />
              </Field>
              <div className="partner-field-row">
                <Field label="Events you work on per year" id="eventVolume" required>
                  <select id="eventVolume" name="eventVolume" value={form.eventVolume} onChange={update} required><option value="">Choose a range</option>{['Just starting out','1–5','6–15','16–30','31–60','More than 60','Varies / not sure'].map((v) => <option key={v}>{v}</option>)}</select>
                </Field>
                <Field label="Typical wristband quantity per event" id="typicalQuantity" required>
                  <select id="typicalQuantity" name="typicalQuantity" value={form.typicalQuantity} onChange={update} required><option value="">Choose a range</option>{['Under 50','50–99','100–249','250–499','500–999','1,000+','Not sure / referral partner'].map((v) => <option key={v}>{v}</option>)}</select>
                </Field>
              </div>
              <Field label="Anything else you'd like us to know? (optional)" id="message">
                <textarea id="message" name="message" rows={4} maxLength={1500} value={form.message} onChange={update} placeholder="Tell us about the events you organise or the kind of partnership you have in mind." />
              </Field>
              <div className="partner-bot-field" aria-hidden="true"><label htmlFor="contactWebsite">Leave this empty</label><input id="contactWebsite" name="contactWebsite" tabIndex={-1} autoComplete="off" value={form.contactWebsite} onChange={update} /></div>
              <label className="partner-consent"><input type="checkbox" name="consent" checked={form.consent} onChange={update} required /><span>I understand that WedWow will use these details to review and respond to my application in accordance with its <Link to="/privacy">Privacy Policy</Link>.</span></label>
              {error && <p className="partner-form-error" role="alert">{error} You can also email <a href="mailto:sales@wedwow.co.uk">sales@wedwow.co.uk</a>.</p>}
              <button className="partner-button partner-button-primary partner-submit" type="submit" disabled={sending}>{sending ? 'Submitting…' : 'Apply to Become a Partner'}</button>
              <p className="partner-form-fine">Applications are reviewed manually. Submission does not guarantee acceptance, preferential pricing or a referral reward.</p>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
