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
- The enquiry form currently validates and shows the success message, just like the original.
- It does not yet send emails. For that, connect a form service such as Formspree, Tally, Basin, Getform, or add a Vercel serverless function.
- The very large embedded base64 bracelet image was replaced with a lightweight CSS bracelet visual. To use a real product photo, add it to `public/` and replace the `featured-product-art` section in `src/App.jsx` with an `<img />`.
