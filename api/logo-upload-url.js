import { createHmac, randomUUID } from "node:crypto";
import { issueSignedToken, presignUrl } from "@vercel/blob";

const MAX_LOGO_BYTES = 20 * 1024 * 1024;
const TYPES = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
  "image/svg+xml": "svg"
};

// Generate a short-lived, one-file-only direct upload URL. No actual
// artwork passes through Vercel Functions' 4.5 MB request-body limit.
export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return res.status(503).json({ error: "Secure logo uploads are not configured." });
  }

  // The upload form is served from WedWow; reject cross-site browser requests.
  const origin = String(req.headers.origin || "");
  if (origin) {
    try {
      const host = new URL(origin).hostname;
      if (!(host === "wedwow.co.uk" || host === "www.wedwow.co.uk" || host.endsWith(".vercel.app") || host === "localhost")) {
        return res.status(403).json({ error: "Invalid upload origin." });
      }
    } catch {
      return res.status(403).json({ error: "Invalid upload origin." });
    }
  }

  try {
    const { fileName, contentType, size } = req.body || {};
    const extension = TYPES[contentType];
    const byteCount = Number(size);
    if (!extension || !Number.isInteger(byteCount) || byteCount < 1 || byteCount > MAX_LOGO_BYTES) {
      return res.status(400).json({ error: "Please upload a PNG, JPG, WebP or SVG logo up to 20 MB." });
    }
    const originalName = String(fileName || "").split(/[\\/]/).pop()
      .replace(/[^a-zA-Z0-9 ._()-]/g, "_").slice(0, 100).trim();
    if (!originalName) return res.status(400).json({ error: "The logo needs a filename." });

    const pathname = `enquiries/${randomUUID()}.${extension}`;
    const expiry = Date.now() + 10 * 60 * 1000;
    const signedToken = await issueSignedToken({
      operations: ["put"],
    });
    const { presignedUrl } = await presignUrl(signedToken, {
      operation: "put",
      pathname,
      validUntil: expiry,
    });

    // The quote handler requires this signed upload receipt; filenames or
    // private paths submitted directly by a visitor cannot be trusted.
    const receiptPayload = Buffer.from(JSON.stringify({
      p: pathname,
      n: originalName,
      t: contentType,
      b: byteCount,
      e: Date.now() + 30 * 60 * 1000,
    })).toString("base64url");
    const signature = createHmac("sha256", process.env.BLOB_READ_WRITE_TOKEN)
      .update(receiptPayload).digest("base64url");

    return res.status(200).json({
      uploadUrl: presignedUrl,
      receipt: `${receiptPayload}.${signature}`
    });
  } catch (error) {
    console.error("Logo upload authorisation failed:", error);
    return res.status(500).json({ error: "Could not prepare your logo upload. Please try again." });
  }
}
