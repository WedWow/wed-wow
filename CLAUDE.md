# WEDWOW Website Instructions for Claude

This is a Vite + React landing page deployed on Vercel.

## Main rule
Do not push directly to main. Always create a new branch and pull request.

## Workflow
For every issue:
1. Read the full issue carefully.
2. Create a new branch using this format:
   ai/issue-number-short-description
3. Make the requested website change.
4. Keep the design premium, clean, mobile responsive, and conversion-focused.
5. Do not remove existing important content unless the issue asks for it.
6. Run:
   npm install
   npm run build
7. Fix any build errors.
8. Open a pull request into main.
9. In the PR description, include:
   - What changed
   - Files changed
   - How to test
   - Any concerns or assumptions

## Design style
The website should feel premium, modern, bold, and high-converting.
Keep mobile layout clean.
Do not use random colours unless requested.
Keep copy short, sharp, and sales-focused.

## Safety
Never edit package.json unless necessary.
Never change deployment settings unless requested.
Never delete large sections without explaining why in the PR.
