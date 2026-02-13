# ABLR Website

A Next.js website for Applied Behavioural Learning and Research (ABLR) - a professional training and research initiative.

## Features

- Modern, responsive design with dark blue and white color scheme
- All sections from the original design:
  - Hero section with navigation
  - What is ABLR section
  - Designed for Every Stage of Practice
  - Two Complementary Wings
  - Why ABLR is Different (with statistics)
  - Current & Upcoming Programmes (with tabs and carousel)
  - Quote section
  - What You Will Achieve
  - Explore ABLR
  - Faculty & Collaborators (carousel)
  - Frequently Asked Questions (accordion)
  - Newsletter signup
  - Footer with navigation

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Build for Production

```bash
npm run build
npm start
```

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Lucide React (for icons)

## Project Structure

```
ablr/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── WhatIsABLR.tsx
│   ├── DesignedForEveryStage.tsx
│   ├── TwoComplementaryWings.tsx
│   ├── WhyABLRIsDifferent.tsx
│   ├── Programmes.tsx
│   ├── Quote.tsx
│   ├── WhatYouWillAchieve.tsx
│   ├── ExploreABLR.tsx
│   ├── Faculty.tsx
│   ├── FAQ.tsx
│   ├── Newsletter.tsx
│   └── Footer.tsx
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── next.config.js
```


