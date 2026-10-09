# Dan Khan: portfolio

A portfolio for a freelance Web Designer & Developer who builds websites for restaurants, salons and dental practices. Built with React, Tailwind CSS v4, GSAP and a lazy-loaded Three.js avatar.

## The idea

Each business has its own character, so the portfolio shows three "storefronts" (Calder, Serein, Atelier). Hover one and the whole page re-tints to that project's palette; click it and the storefront expands into a browser window showing the live demo.

- **Storefront arches:** hover tints the page and makes the avatar look toward the project.
- **Case study:** the arch animates into a browser frame (GSAP) with the live site inside an iframe, plus problem, build and stack notes.
- **Avatar:** a browser-window-headed character built in Three.js. Its eyes follow the cursor, it blinks, waves on load, and its screen takes on the hovered project's colors. It loads after first paint, on large screens only, and is skipped when the visitor prefers reduced motion.
- **Sections:** services, a scroll-driven process line, about, three packages with "from" prices, FAQ and a contact form (opens the visitor's email app with the message prefilled).

## Getting started

```bash
npm install
npm run dev
npm run build
```

Requires Node.js 18 or newer.

## Editing content

Almost everything lives in `src/data.js`:

- `EMAIL`, `FACEBOOK`: contact links
- `P`: the three projects (names, palettes, live URLs, case-study notes). Order here is the order on the page.
- `services`, `steps`, `packages` (prices and delivery times), `faq`

Hero and About copy are in `src/Hero.jsx` and `src/Sections.jsx`.

## Structure

```
src/
├── App.jsx        page layout, scroll animations, custom cursor
├── Header.jsx     sticky header and mobile menu
├── Hero.jsx       headline, avatar slot and project arches
├── CaseStudy.jsx  arch-to-browser-frame transition with live iframe
├── Avatar.jsx     lazy-loaded Three.js character, animated with GSAP
├── Specimen.jsx   the mini palette and type specimen shown on each arch
├── Sections.jsx   services, process, about, pricing, faq, contact, footer
├── tint.js        page-wide palette switching
├── ui.jsx         buttons and layout helpers
└── data.js        all content
```

## Notes and to-dos

- The Atelier (salon) card uses placeholder colors and copy. Update its palette and case-study notes in `src/data.js` once you decide what to say about it.
- Add an Open Graph image (`public/og.jpg`) and an `og:image` tag for nicer link previews.
- When you have a custom domain, add it in Vercel and consider a matching email address.
- The packages, working terms and delivery times in the FAQ are starting points; edit them to match how you want to work.
- Demo projects are concept work for fictional businesses, and the site says so.

## Performance

The main bundle is about 102 kB gzipped. Three.js (about 177 kB gzipped) loads separately after first paint and only on large screens, so it does not block the first view. Fonts load without blocking render.
