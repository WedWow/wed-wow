export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ success: false, error: "RESEND_API_KEY is missing" });
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: "WedWow Website <enquiries@wedwow.co.uk>",
      to: ["sales@wedwow.co.uk"],
      subject: "WedWow wristband quote email test",
      html: "<h2>WedWow test successful</h2><p>This is a one-off test from the new Vercel + Resend wristband quote setup.</p>"
    })
  });

  const result = await response.json();
  return res.status(response.ok ? 200 : 502).json({ success: response.ok, result });
}
