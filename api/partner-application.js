// Partner applications have their own endpoint and do not change the wristband enquiry flow.
// On Vercel preview deployments submissions are validated but no emails are sent.
const PARTNER_TYPES = new Set(['Trade Partner', 'Referral Partner', 'Both / Unsure']);
const BUSINESS_TYPES = new Set([
  'Event agency or event planner',
  'Wedding planner or coordinator',
  'Production, lighting or AV',
  'DJ or entertainment provider',
  'Venue, hotel or hospitality',
  'Corporate events or brand activations',
  'Promotional products or merchandise',
  'Festival, concert or nightclub',
  'Other event business'
]);
const EVENT_VOLUMES = new Set(['Just starting out', '1–5', '6–15', '16–30', '31–60', 'More than 60', 'Varies / not sure']);
const QUANTITIES = new Set(['Under 50', '50–99', '100–249', '250–499', '500–999', '1,000+', 'Not sure / referral partner']);

function text(value, limit) {
  if (typeof value !== 'string' || value.length > limit * 2) return null;
  return value.trim().slice(0, limit);
}
function html(value) {
  return String(value ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
}
function validEmail(s) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s) && s.length <= 254 && !/[\r\n]/.test(s);
}
function validWebsite(s) {
  try {
    const url = new URL(s);
    return ['https:', 'http:'].includes(url.protocol) && !!url.hostname.includes('.') &&
      !['localhost', '127.0.0.1'].includes(url.hostname) && !url.username && !url.password;
  } catch { return false; }
}
async function sendMail(apiKey, payload) {
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!response.ok) {
    const info = await response.json().catch(() => ({}));
    console.error('Partner application mail failed', response.status, info?.name || 'unknown');
    throw new Error('mail_delivery_failed');
  }
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, error: 'Method not allowed.' });
  }
  if (!String(req.headers['content-type'] || '').toLowerCase().startsWith('application/json')) {
    return res.status(415).json({ success: false, error: 'Please submit the application using the website form.' });
  }
  if (Number(req.headers['content-length'] || 0) > 12000) {
    return res.status(413).json({ success: false, error: 'The application is too large.' });
  }
  const isPreview = process.env.VERCEL_ENV !== 'production';
  if (!isPreview && !['https://wedwow.co.uk', 'https://www.wedwow.co.uk'].includes(req.headers.origin)) {
    return res.status(403).json({ success: false, error: 'Please submit this form from the WedWow website.' });
  }
  try {
    const data = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    if (!data || typeof data !== 'object' || Array.isArray(data)) {
      return res.status(400).json({ success: false, error: 'Please complete the application form.' });
    }
    // Honeypot: acknowledge robot submissions without forwarding them.
    if (data.contactWebsite) return res.status(200).json({ success: true, preview: isPreview });
    const application = {
      partnerType: text(data.partnerType, 40),
      company: text(data.company, 120),
      contactName: text(data.contactName, 100),
      email: text(data.email, 254),
      phone: text(data.phone || '', 40),
      country: text(data.country, 80),
      businessType: text(data.businessType, 90),
      websiteOrProfile: text(data.websiteOrProfile, 300),
      eventVolume: text(data.eventVolume, 50),
      typicalQuantity: text(data.typicalQuantity, 50),
      message: text(data.message || '', 1500),
    };
    if (!PARTNER_TYPES.has(application.partnerType) ||
        !BUSINESS_TYPES.has(application.businessType) ||
        !EVENT_VOLUMES.has(application.eventVolume) ||
        !QUANTITIES.has(application.typicalQuantity) ||
        !application.company || !application.contactName ||
        !application.country || !validEmail(application.email || '') ||
        (application.websiteOrProfile !== '' && !validWebsite(application.websiteOrProfile || '')) ||
        application.message === null || application.phone === null ||
        data.consent !== true) {
      return res.status(400).json({ success: false, error: 'Please check all required fields and try again.' });
    }
    // Private preview: test form validation without sending emails.
    if (isPreview) return res.status(200).json({ success: true, preview: true });
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('RESEND_API_KEY missing for partner application');
      return res.status(503).json({ success: false, error: 'Applications are temporarily unavailable. Please email sales@wedwow.co.uk.' });
    }
    const rows = [
      ['Partner interest', application.partnerType],
      ['Business name', application.company],
      ['Contact', application.contactName],
      ['Email', application.email],
      ['Phone', application.phone || 'Not provided'],
      ['Country', application.country],
      ['Business type', application.businessType],
      ['Website / portfolio', application.websiteOrProfile],
      ['Events per year', application.eventVolume],
      ['Typical quantity', application.typicalQuantity],
      ['Message', application.message || 'Not provided'],
    ];
    const table = rows.map(([key, value]) => `<tr><th style="text-align:left;padding:10px;border-bottom:1px solid #eee;width:32%;vertical-align:top">${html(key)}</th><td style="padding:10px;border-bottom:1px solid #eee;white-space:pre-wrap;overflow-wrap:anywhere">${html(value)}</td></tr>`).join('');
    await sendMail(apiKey, {
      from: 'WedWow Partners <enquiries@wedwow.co.uk>',
      to: ['sales@wedwow.co.uk'],
      reply_to: application.email,
      subject: `Partner Application | ${application.company.replace(/[\r\n]/g, ' ')}`,
      html: `<div style="font-family:Arial,sans-serif;color:#171717;max-width:700px"><h2>New WedWow Partner Programme application</h2><p>Please review manually. This is not an approved partnership.</p><table style="border-collapse:collapse;width:100%">${table}</table><p>Reply to this email to contact the applicant.</p></div>`
    });
    // The business application has been delivered even if the secondary acknowledgement fails.
    try {
      await sendMail(apiKey, {
        from: 'WedWow Partners <enquiries@wedwow.co.uk>',
        to: [application.email],
        reply_to: 'sales@wedwow.co.uk',
        subject: 'We received your WedWow partner application',
        html: `<div style="font-family:Arial,sans-serif;color:#171717;max-width:640px"><p>Hi ${html(application.contactName)},</p><p>Thank you for applying to the WedWow Partner Programme on behalf of ${html(application.company)}.</p><p>We've received your application and will review it personally. If it looks like a good fit, we'll get in touch to discuss potential next steps.</p><p>Submitting an application does not mean your business has been accepted, and no trade pricing or referral rewards have been agreed at this stage.</p><p>If you'd like to add anything, simply reply to this email.</p><p>Kind regards,<br>WedWow Team<br><a href="https://www.wedwow.co.uk">wedwow.co.uk</a></p></div>`
      });
    } catch (error) {
      console.error('Partner applicant acknowledgement failed after admin notification', error.message);
    }
    return res.status(200).json({ success: true, preview: false });
  } catch (error) {
    console.error('Partner application API error', error.message);
    return res.status(502).json({ success: false, error: 'We could not submit your application. Please email sales@wedwow.co.uk.' });
  }
}
