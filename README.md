# Wedwow React Landing Page

This is a Vite + React conversion of your Shopify/Liquid landing page, ready for Vercel.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy on Vercel

1. Push this folder to a GitHub repository.
2. Go to Vercel and import the repository.
3. Vercel should detect Vite automatically.
4. Build command: `npm run build`
5. Output directory: `dist`

## Important notes

- The original Shopify `{% comment %}` and inline `<script>` were converted to React.
- The very large embedded base64 bracelet image was replaced with a lightweight CSS bracelet visual. To use a real product photo, add it to `public/` and replace the `featured-product-art` section in `src/App.jsx` with an `<img />`.

## Enquiry form (StaticForms)

The enquiry form on the homepage sends submissions via [StaticForms](https://staticforms.dev), a third-party form-relay service, straight to `sales@wedwow.co.uk`.

- It requires a `VITE_STATIC_FORMS_API_KEY` environment variable to be set in the Vercel project settings (Project → Settings → Environment Variables). Without it, the form will show an error instead of submitting.
- The destination email address is configured on the StaticForms dashboard for that API key/domain, not in this codebase — if enquiries stop arriving, check that dashboard configuration and spam folder first.
- If the form fails, users are shown a message to email `sales@wedwow.co.uk` directly (also linked in the contact info next to the form).
