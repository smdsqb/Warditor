# WARDITOR

> **Warden + Auditor.** An AI that shows you exactly what you did instead of studying — and makes you feel every wasted minute.

![Warditor](https://img.shields.io/badge/version-0.1.0-ff3b2f?style=flat-square)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-3-06B6D4?style=flat-square&logo=tailwindcss)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)

---

## What is Warditor?

Warditor is an AI-powered productivity accountability app. Unlike every other productivity tool that blocks, gamifies, or badges your focus — Warditor just watches what you do and makes you read it back the next morning.

No blockers. No streaks. No dopamine tricks. Just the truth.

The name says it all: **Warden** (guards, watches, doesn't let you off easy) + **Auditor** (reviews, records, shows you the receipts) = **Warditor**.

---

## The Problem

Every productivity app tries to fix you by removing temptation or rewarding you for resisting it. None of them make you truly reckon with what you chose to do instead.

- Screen Time tells you numbers. Numbers don't change behaviour.
- Forest grows a tree. Killing a virtual tree isn't real accountability.
- Blockers get turned off. Willpower isn't the problem.

**What actually changes behaviour** is a narrative. A story about you, written from your own data, that puts your choices next to their consequences.

*"You opened Instagram 14 times yesterday. You had a Chemistry exam this morning. You scored 34%."*

That sentence — personalised, specific, yours — is what Warditor produces. Every single morning.

---

## How It Works

```
Android App (UsageStatsManager API)
        ↓
Tracks which apps were open, for how long, how many times
        ↓
Firebase (Firestore) — stores usage data
        ↓
Optional: YouTube API, Reddit API, Instagram API, Google Activity API
        ↓
Groq AI — generates personalised shame report narrative
        ↓
User reads their daily audit and feels it
```

---

## Tech Stack

### Landing Page (this repo)
| Technology | Purpose |
|---|---|
| Next.js 14 | React framework with App Router |
| TypeScript | Type safety |
| Tailwind CSS | Utility-first styling |
| Vercel | Deployment and hosting |

### Android App (separate repo)
| Technology | Purpose |
|---|---|
| Flutter | Cross-platform Android app |
| UsageStatsManager API | Native Android app usage tracking |
| Firebase Auth | User authentication |
| Firestore | Usage data storage |
| Groq API | AI shame report generation |
| Razorpay | Payment processing |

### External APIs
| API | Purpose |
|---|---|
| Android UsageStats | Core app usage data |
| Google My Activity API | Chrome and web activity (if user connects) |
| YouTube Data API | Specific video watch data |
| Reddit API | Subreddit and post browsing data |
| Instagram Graph API | Session and activity data |

---

## Repository Structure

```
warditor/
├── app/
│   ├── layout.tsx              # Root layout — Nav, Footer, metadata, grain texture
│   ├── page.tsx                # Homepage — hero, how it works, features, pricing, CTA
│   ├── globals.css             # Global styles, animations, grain, ghost words
│   ├── about/
│   │   └── page.tsx            # About page — story, team, etymology
│   ├── features/
│   │   └── page.tsx            # Features page — detailed breakdown of all 6 features
│   └── privacy/
│       └── page.tsx            # Privacy policy — plain English, no jargon
├── components/
│   ├── Nav.tsx                 # Fixed navigation bar with logo and links
│   ├── Footer.tsx              # Footer with links, tagline, legal
│   ├── ShameCard.tsx           # 3D tilt mock audit card (client component)
│   ├── Ticker.tsx              # Scrolling shame ticker banner
│   └── RevealWrapper.tsx       # Scroll-triggered reveal animation wrapper
├── public/
│   └── favicon.svg             # SVG favicon — W wordmark with red accent bars
├── next.config.js              # Next.js config with webpack path aliases
├── tailwind.config.js          # Tailwind config with custom fonts and colors
├── tsconfig.json               # TypeScript config
├── postcss.config.js           # PostCSS config for Tailwind
├── package.json                # Dependencies and scripts
└── vercel.json                 # Vercel deployment configuration
```

---

## Features

### AI Shame Reports
Every morning Warditor generates a personalised narrative from your usage data. Not a dashboard. Not a bar chart. A story — written in plain, uncomfortable English — about what you chose to do instead of what you promised yourself.

### Native Android Tracking
Uses Android's built-in `UsageStatsManager` API. No VPN required, no shady permissions. User grants usage access once in Android settings. Warditor runs silently in the background.

### Deep Platform Integration
Connect YouTube, Reddit, Instagram and Google accounts for granular data. Instead of "YouTube — 3.2 hours", know exactly which videos you watched, which subreddits you browsed, which rabbit holes swallowed your evening.

### Consequence Correlation *(Premium)*
Over time, Warditor links your distraction patterns to real outcomes. It builds a model of your behaviour and surfaces patterns like: *"Every time you spend 3+ hours on Shorts before an exam, you score below 50%."* That's not a motivational poster. That's your own data.

### Accountability Partner *(Premium)*
Share your daily audit with a trusted friend. Nothing changes behaviour faster than someone else reading your screen time out loud.

### Privacy First
Raw usage data is processed locally where possible. Only aggregated insights sync to Firebase. Users can delete all data at any time. We never sell data. Full details in the privacy policy.

---

## Design Decisions

### The Shame Mechanic
Every other productivity app is built around positive reinforcement — streaks, badges, trees, rewards. Warditor is built around honest confrontation. The insight from building this: people already know they're wasting time. They don't need a blocker. They need to feel the weight of it.

### No Blocker
Warditor deliberately doesn't block anything. You can still open Instagram whenever you want. But you'll read about it tomorrow morning. That choice — knowing the audit is coming — is where the behaviour change actually lives.

### Narrative Over Numbers
A number like "3.2 hours on YouTube" doesn't land emotionally. A sentence like "You had a Physics exam at 9am. You watched YouTube until 1am. You scored 28%." does. Groq AI generates the narrative, not the number.

### White Theme With Depth
The site uses a strict white and off-white palette with black and red accent — no gradients, no dark mode toggle clutter. Depth is created through:
- CSS grain texture overlay (`.grain::after`)
- 3D perspective tilt on the shame card (mousemove event)
- Stacked ghost cards behind the main card
- Floating ghost words in the hero (INSTAGRAM, YOUTUBE, REDDIT, etc.)
- Scroll-triggered reveal animations throughout

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repo
git clone https://github.com/yourusername/warditor.git
cd warditor

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## Deployment

This project is deployed on Vercel. The `vercel.json` config is already included.

**To deploy your own instance:**

1. Push the repo to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your GitHub repo
4. Vercel auto-detects Next.js — no config needed
5. Hit Deploy

Environment variables needed for the full app (Android backend):
```
GROQ_API_KEY=
FIREBASE_API_KEY=
FIREBASE_PROJECT_ID=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
```

---

## Roadmap

- [x] Landing page with full sections
- [x] About, Features, Privacy pages
- [x] 3D tilt shame card
- [x] Ghost word hero animations
- [x] Grain texture depth
- [ ] Android app (Flutter) — in development
- [ ] Firebase backend integration
- [ ] Groq AI shame report generation
- [ ] UsageStatsManager API integration
- [ ] YouTube / Reddit / Instagram API connections
- [ ] Google Activity API integration
- [ ] Razorpay payment integration
- [ ] Accountability partner feature
- [ ] Consequence correlation engine
- [ ] iOS app (post-launch)

---

## Pricing

| Plan | Price | Features |
|---|---|---|
| Free | $0/forever | 7 days history, basic shame reports, app tracking, daily AI summary |
| Premium | $4.99/month | Full history, deep platform data, consequence correlation, accountability partner |

---

## Privacy

Warditor is built with privacy as a constraint, not an afterthought. Key commitments:

- Raw browsing data never leaves your device unless you explicitly connect a platform
- Only aggregated insights sync to Firebase
- No data is sold to third parties. Ever.
- Users can delete all data permanently at any time
- Payment processing via Razorpay — we never store card details

Full privacy policy: [warditor.com/privacy](https://warditor.com/privacy)

---

## Built By

Two teenagers who got tired of lying to themselves about how they spent their time.

- [Your name] — Next.js website, Groq AI integration, Firebase architecture
- [Nikhil] — Android app, Flutter, Play Store, Razorpay integration

---

## License

MIT License — see `LICENSE` for details.

---

*Built with Next.js, deployed on Vercel, powered by Groq AI, and a genuine hatred for wasted potential.*
