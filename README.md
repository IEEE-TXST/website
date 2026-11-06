# IEEE TXST Website

The official website for IEEE at Texas State University.

- **Live site:** https://ieeetxst.org
- **Deployment:** Vercel (auto-deploy from GitHub)
- **Domain:** Cloudflare-managed custom domain

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Git

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd website
```

2. Install dependencies

```bash
npm install
```

3. Run the development server

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## ✅ Before You Commit

Before opening a pull request or pushing changes, always run:

```bash
npm run lint
npm run build
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run sync-media` - Re-copy officer/event pictures into `public/media` (runs automatically before `dev` and `build`)
- `npm run lint` - Run ESLint

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion, Swiper
- **Images:** Next.js Image Optimization
- **SEO:** Metadata API, sitemap, robots.txt
- **Analytics:** Vercel Analytics + Speed Insights
- **Deployment:** Vercel
- **CI/CD:** GitHub -> Vercel auto-deploy
- **Source Control:** GitHub with protected `main` branch

## 📁 Project Structure

```
website/
├── officers/            # CONTENT: present/, past/<year>/, unassigned/ (each with info/ CSVs + pictures/)
├── events/              # CONTENT: same structure (info/events.csv + pictures/)
├── scripts/
│   └── sync-media.mjs   # Copies officers/events pictures to public/media (git-ignored, generated)
├── public/
│   ├── icons/           # favicons, app icons, site.webmanifest
│   ├── images/          # branding/ (logos), site/ (homepage hero photo)
│   └── media/           # GENERATED copy of officer/event pictures (git-ignored)
├── src/
│   ├── app/             # Pages (Next.js App Router)
│   ├── lib/             # Server-side loaders: officers.ts, events.ts, photos.ts, terms.ts, csv.ts
│   ├── components/      # animations/, events/, layout/, ui/, home/, computersoc/, hkn/, robotics/
│   ├── content/         # config.ts (site settings + present term), pages/home.ts, data/ (types)
│   └── types/           # global.d.ts (module declarations)
└── PRESIDENT_GUIDE.md   # Guide for non-technical content updates
```

### How content reaches the pages

1. Officers and events are CSV files plus pictures in `officers/` and `events/`.
2. `npm run dev` / `build` first runs `scripts/sync-media.mjs`, which copies the pictures to `public/media/`.
3. `src/lib/officers.ts` and `src/lib/events.ts` read the folders at build time (invalid rows are skipped and logged).
4. `src/lib/photos.ts` builds the homepage slider and the Robotics/HKN carousels from `events/<term>/pictures/photos/`.
5. Pages render them: `/officers` (society tabs + term dropdown), `/events` (upcoming, then past events
   grouped by term) and the society pages (present-term officers).
6. To add a society tab, add it to `SOCIETIES` in `src/content/data/team.ts` and create `<society>.csv`
   and a pictures folder in each term.

## 📖 Content Management

For non-technical users who need to update content, see **[PRESIDENT_GUIDE.md](./PRESIDENT_GUIDE.md)**.

- **Officers / events:** the `officers/` and `events/` folders
- **Contact info and site settings:** `/src/content/config.ts`
- **Homepage text:** `/src/content/pages/home.ts`
- **Image sliders:** automatic, from `events/<term>/pictures/photos/` (see PRESIDENT_GUIDE.md)

## 🎨 Features

- Modern, animated UI with smooth transitions
- 3D tilt effects on officer and event cards
- Fully responsive design (mobile -> desktop)
- Optimized performance with Next.js
- Image optimization with `next/image`
- SEO-ready (OpenGraph, sitemap, robots.txt)
- Easy content management for non-technical users
- IEEE brand colors and design system

## 🌐 Pages

- **Home** (`/`) - Landing page with about section and social links
- **Events** (`/events`) - Browse upcoming events with category filters and calendar
- **Officers** (`/officers`) - Leadership team by society and term
- **Committees** (`/committees`) - Societies & Branches
- **Membership** (`/membership`) - How to join IEEE information

## 🔧 Configuration

### Updating Site Settings

Edit `/src/content/config.ts` to update:

- Organization name and tagline
- Contact information (email, social media)
- Meeting schedule and location
- Navigation links
- Call-to-action (CTA) links

### Adding Images

Images from external URLs must be configured in `next.config.ts`:

```typescript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'your-image-host.com',
    },
  ],
}
```

Local images in `/public` work automatically.

## 📦 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Vercel will auto-detect Next.js and deploy
3. Domain is managed from Cloudflare DNS
4. SSL handled automatically

### Manual Deployment

```bash
npm run build
npm run start
```

## 🧭 Domain & DNS (Cloudflare)

- Domain purchased via Cloudflare
- DNS points to Vercel
- SSL + HTTPS auto-enabled

### Search Engine Indexing

Search engined (Google, Bing, etc.) discover and index the site via:

- `app/sitemap.ts`
- `app/robots.ts`

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Run `npm run lint` and `npm run build`
4. Submit a pull request

## 📄 License

Copyright © 2026 IEEE Texas State University

## 📞 Support

For technical issues or questions:

- Check [PRESIDENT_GUIDE.md](./PRESIDENT_GUIDE.md) for content updates
- Contact the web team lead

---
