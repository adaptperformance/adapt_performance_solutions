# Adapt Performance Solutions — Website

Static HTML/CSS/JS website for Adapt Performance Solutions (adapt-perform.com).

## Pages

| File                     | Page                          |
|--------------------------|-------------------------------|
| index.html               | Homepage                      |
| chassis.html             | All Chassis (browse)          |
| chassis-sc300-sc400.html | Lexus SC300 / SC400           |
| service-kits.html        | Service Kits                  |
| fluids.html              | Fluids / Accessories          |
| about.html               | About Us                      |
| faqs.html                | FAQs                          |
| contact.html             | Contact Us                    |
| equipt.html              | Equipt Division               |

## Assets

```
assets/
  css/
    fonts.css       ← Google Fonts CDN import + offline @font-face instructions
    global.css      ← Shared design tokens, nav, footer, buttons, utilities
  js/
    global.js       ← Shared JS: nav, accordions, filters, forms, scroll behaviors
  fonts/            ← Place .woff2 font files here for full offline use (see fonts.css)
  images/
    favicon.svg     ← Site favicon
```

## Hosting

This is a fully static site. Drop the folder on any static host:

- **Nginx / Apache** — serve the folder root as document root
- **Netlify / Vercel** — drag and drop the folder or connect via Git
- **GitHub Pages** — push to a repo and enable Pages
- **cPanel / shared hosting** — upload via FTP to `public_html/`

No build step, no dependencies, no server-side code required.

## Fonts — Full Offline Use

The site loads fonts from Google Fonts CDN by default. If you want full offline
capability (no internet required at all):

1. Download the font files from Google Fonts:
   - Bebas Neue
   - Barlow (300, 400, 600 weights)
   - Barlow Condensed (500, 600, 700 weights)
2. Place the `.woff2` files in `assets/fonts/`
3. Open `assets/css/fonts.css` and follow the instructions to uncomment the
   `@font-face` blocks at the bottom of the file.

## Design System

- **Black:** `#0a0a0a`
- **Off-Black:** `#111111`
- **Carbon:** `#1a1a1a`
- **Gold Accent:** `#c8a84b`
- **Teal (Equipt):** `#1eb8a0`
- **Type:** Bebas Neue (headings) + Barlow Condensed (labels/UI) + Barlow (body)

## Contact

adaptandperform@gmail.com  
Instagram: @adaptperformance  
Facebook: Adapt and Perform
