const MAX_MOCKUP_BYTES = 5 * 1024 * 1024;
const MAX_LOGO_BYTES = 5 * 1024 * 1024;
const LOGO_EXTENSIONS = { "image/png":"png", "image/jpeg":"jpg", "image/webp":"webp", "image/svg+xml":"svg" };

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function required(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function validEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").trim());
}

function cleanBase64DataUrl(dataUrl) {
  if (!dataUrl) return null;
  const match = String(dataUrl).match(/^data:image\/png;base64,(.+)$/);
  if (!match) return null;

  const content = match[1];
  const bytes = Math.ceil((content.length * 3) / 4);
  if (bytes > MAX_MOCKUP_BYTES) {
    throw new Error("Mockup image is too large.");
  }

  return content;
}

function cleanOriginalLogo(dataUrl, originalFilename) {
  if (!dataUrl || typeof dataUrl !== "string") {
    throw new Error("The original logo file is missing. Please upload it again.");
  }
  const match = dataUrl.match(/^data:(image\/(?:png|jpeg|webp|svg\+xml));base64,([A-Za-z0-9+/]+={0,2})$/);
  if (!match || match[2].length % 4 !== 0) {
    throw new Error("The logo file is invalid. Please upload a PNG, JPG, WebP or SVG.");
  }
  const mime = match[1];
  const content = match[2];
  const bytes = Buffer.from(content, "base64");
  if (!bytes.length || bytes.length > MAX_LOGO_BYTES) {
    throw new Error("The logo must be a nonempty image file smaller than 5 MB.");
  }
  const ext = LOGO_EXTENSIONS[mime];
  const originalName = String(originalFilename || "").split(/[\\/]/).pop()
    .replace(/[^a-zA-Z0-9 ._()-]/g, "_").slice(0, 100).trim();
  const filename = originalName && originalName.toLowerCase().endsWith("." + ext)
    ? originalName
    : "customer-logo." + ext;
  return { filename, content };
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ success: false, error: "Email service is not configured" });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : (req.body || {});

    const {
      name,
      email,
      phone,
      company,
      country,
      product,
      quantity,
      occasion,
      requiredDate,
      heardAboutUs,
      message,
      designType,
      personalisationMethod,
      logoFileName,
      logoDataUrl,
      line1,
      line2,
      font1,
      font2,
      lightFunction,
      eventLocation,
      mockupDataUrl
    } = body;

    if (!required(name) || !validEmail(email) || !required(phone) || !required(quantity) || !required(requiredDate)) {
      return res.status(400).json({
        success: false,
        error: "Please complete name, email, phone, quantity and required date."
      });
    }

    const mockupBase64 = cleanBase64DataUrl(mockupDataUrl);
    let originalLogo = null;
    if (designType === "Customised" && personalisationMethod === "logo") {
      try {
        originalLogo = cleanOriginalLogo(logoDataUrl, logoFileName);
      } catch (error) {
        return res.status(400).json({ success: false, error: error.message });
      }
    }

    const safe = {
      name: escapeHtml(name),
      email: escapeHtml(email),
      phone: escapeHtml(phone),
      company: escapeHtml(company || ""),
      country: escapeHtml(country || ""),
      product: escapeHtml(product || ""),
      quantity: escapeHtml(quantity),
      occasion: escapeHtml(occasion || ""),
      requiredDate: escapeHtml(requiredDate),
      heardAboutUs: escapeHtml(heardAboutUs || ""),
      message: escapeHtml(message || "").replaceAll("\n", "<br>"),
      designType: escapeHtml(designType || ""),
      personalisationMethod: escapeHtml(personalisationMethod || ""),
      logoFileName: escapeHtml(logoFileName || ""),
      line1: escapeHtml(line1 || ""),
      line2: escapeHtml(line2 || ""),
      font1: escapeHtml(font1 || ""),
      font2: escapeHtml(font2 || ""),
      lightFunction: escapeHtml(lightFunction || ""),
      eventLocation: escapeHtml(eventLocation || "")
    };

    const rows = [
      ["Name", safe.name],
      ["Email", safe.email],
      ["Phone", safe.phone],
      ["Company / Couple / Event", safe.company || "—"],
      ["Country", safe.country || "—"],
      ["Product", safe.product || "—"],
      ["Quantity", safe.quantity],
      ["Occasion", safe.occasion || "—"],
      ["Required Date", safe.requiredDate],
      ["Event Location", safe.eventLocation || "—"],
      ["Heard About Us", safe.heardAboutUs || "—"],
      ["Design Type", safe.designType || "—"],
      ["Personalisation", safe.personalisationMethod === "logo" ? "Uploaded logo" : (safe.personalisationMethod === "text" ? "Text design" : "—")],
      ["Logo File", safe.logoFileName || "—"],
      ["Line 1", safe.line1 || "—"],
      ["Line 2", safe.line2 || "—"],
      ["First Line Font", safe.font1 || "—"],
      ["Second Line Font", safe.font2 || "—"],
      ["Light Function", safe.lightFunction || "—"]
    ];

    const rowsHtml = rows.map(([label, value]) => `
      <tr>
        <td style="padding:9px 12px;border-bottom:1px solid #e7e7e7;font-weight:700;vertical-align:top;width:210px;">${label}</td>
        <td style="padding:9px 12px;border-bottom:1px solid #e7e7e7;vertical-align:top;">${value}</td>
      </tr>
    `).join("");

    const emailPayload = {
      from: "WedWow Website <enquiries@wedwow.co.uk>",
      to: ["sales@wedwow.co.uk"],
      reply_to: String(email).trim(),
      subject: `New WedWow enquiry from ${String(name).trim()}`,
      html: `
        <div style="font-family:Arial,sans-serif;color:#111;max-width:760px;margin:0 auto;">
          <h2 style="margin:0 0 8px;">New WedWow wristband enquiry</h2>
          <p style="margin:0 0 20px;color:#555;">Submitted through the WedWow wristband designer.</p>

          <table style="border-collapse:collapse;width:100%;border:1px solid #e7e7e7;">
            ${rowsHtml}
          </table>

          <div style="margin-top:20px;">
            <strong>Customer message</strong>
            <div style="margin-top:8px;padding:14px;background:#f6f6f6;line-height:1.6;">
              ${safe.message || "—"}
            </div>
          </div>

          ${mockupBase64 ? '<p style="margin-top:20px;"><strong>Instant preview:</strong> attached as a PNG.</p>' : ""}
          ${originalLogo ? '<p><strong>Original customer logo:</strong> attached as a separate file (unmodified). A proper artwork mockup will be prepared for customer review.</p>' : ""}
        </div>
      `
    };

    const attachments = [];
    if (mockupBase64) {
      attachments.push({ filename: "wedwow-wristband-mockup.png", content: mockupBase64 });
    }
    if (originalLogo) {
      attachments.push({ filename: originalLogo.filename, content: originalLogo.content });
    }
    if (attachments.length) emailPayload.attachments = attachments;

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(emailPayload)
    });

    const resendResult = await resendResponse.json();

    if (!resendResponse.ok) {
      console.error("Resend error:", resendResult);
      return res.status(502).json({
        success: false,
        error: resendResult?.message || "Email could not be sent"
      });
    }

    return res.status(200).json({
      success: true,
      id: resendResult.id
    });
  } catch (error) {
    console.error("Wristband quote API error:", error);
    return res.status(500).json({
      success: false,
      error: "Something went wrong while sending the enquiry."
    });
  }
}
