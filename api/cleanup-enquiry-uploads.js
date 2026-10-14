import { list, del } from "@vercel/blob";

// Daily cleanup for files uploaded but never submitted. Keep uploads for
// 24 hours to allow slow customer submissions, then delete abandoned artwork.
export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();
  if (!process.env.CRON_SECRET ||
      req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).end();
  }
  try {
    const cutoff = Date.now() - 24 * 60 * 60 * 1000;
    let cursor;
    let checked = 0, removed = 0;
    do {
      const result = await list({ prefix: "enquiries/", cursor, limit: 100 });
      for (const blob of result.blobs) {
        checked++;
        if (new Date(blob.uploadedAt).getTime() < cutoff) {
          await del(blob.url);
          removed++;
        }
      }
      cursor = result.hasMore ? result.cursor : undefined;
    } while (cursor && checked < 5000);
    return res.status(200).json({ checked, removed });
  } catch (error) {
    console.error("Temporary upload cleanup failed:", error);
    return res.status(500).json({ error: "Cleanup failed" });
  }
}
