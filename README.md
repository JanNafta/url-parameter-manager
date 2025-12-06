# URL Parameter Manager - UTM Builder & Tracking URL Generator

> **Free professional tool for programmatic advertising, performance marketing, and mobile attribution tracking.**

[![Deploy](https://github.com/JanNafta/url-parameter-manager/actions/workflows/deploy.yml/badge.svg)](https://github.com/JanNafta/url-parameter-manager/actions/workflows/deploy.yml)
[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://digitalnafta.com/url-builder/)

## Overview

A powerful, free URL parameter management tool designed specifically for **AdTech**, **AdOps**, and **Performance Marketing** professionals. Built by [JanNafta](https://www.linkedin.com/in/jannafta-programmatic-performance-dsp-ssp-rtb), a programmatic advertising expert specializing in DSP/SSP optimization and mobile user acquisition.

**Live Demo:** [https://digitalnafta.com/url-builder/](https://digitalnafta.com/url-builder/)

---

## Features

### Core Functionality
- **UTM Parameter Builder** - Create Google Analytics compatible tracking URLs
- **MMP Attribution Links** - Generate tracking URLs for AppsFlyer, Adjust, Branch, Singular, Kochava
- **Macro Preservation** - Keeps DSP macros intact (`{campaign_id}`, `{creative_id}`, `{publisher_id}`, etc.)
- **QR Code Generation** - Instant QR codes for any URL
- **Bulk URL Processing** - Process multiple URLs simultaneously
- **URL History** - Track and reuse previously created URLs

### DSP/SSP Integration
Optimized for all major programmatic platforms:

| DSP/Ad Networks | MMPs/Attribution | Exchanges |
|-----------------|------------------|-----------|
| Moloco | AppsFlyer | Google AdX |
| Kayzen | Adjust | AppLovin MAX |
| Smadex | Branch | ironSource |
| AppLovin | Singular | Unity Ads |
| Liftoff | Kochava | Vungle |
| Unity Ads | Tenjin | Digital Turbine |
| Digital Turbine | | InMobi |
| Mintegral | | Mintegral |

### Macro Support
Preserves tracking macros from all major DSPs:

```
{campaign_id}     {creative_id}      {publisher_id}
{site_id}         {placement_id}     {click_id}
{device_id}       {idfa}             {gaid}
{country}         {city}             {carrier}
${AUCTION_ID}     ${CREATIVE_ID}     ${PUBLISHER_ID}
[timestamp]       [random]           [device_ip]
```

---

## Use Cases

### Programmatic Advertising
- **DSP Campaign Tracking** - Track performance across Moloco, Kayzen, Smadex, AppLovin
- **RTB Attribution** - Real-time bidding campaign measurement
- **Retargeting URLs** - Create properly attributed retargeting links

### Mobile User Acquisition (UA)
- **App Install Campaigns** - CPI, CPA, ROAS tracking
- **Deep Linking** - Deferred deep links with attribution
- **SKAdNetwork** - iOS 14+ privacy-compliant tracking

### iGaming & Fintech
- **Affiliate Tracking** - Sub-ID and click tracking for affiliates
- **CPA Networks** - Conversion tracking with postbacks
- **Geo-Targeting** - Country and region-specific parameters

### Performance Marketing
- **Google Ads / Meta Ads** - UTM parameters for paid campaigns
- **Influencer Marketing** - Unique tracking per influencer
- **Email Campaigns** - Newsletter click attribution

---

## Tech Stack

- **Frontend:** React 18 + Vite
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **QR Generation:** qrcode.react
- **Deployment:** GitHub Actions + FTP

---

## Local Development

```bash
# Clone the repository
git clone https://github.com/JanNafta/url-parameter-manager.git
cd url-parameter-manager

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## Deployment

This project uses **GitHub Actions** for automated deployment. Every push to `main` triggers:

1. Build the React app (`npm run build`)
2. Deploy to production via FTP

### Manual Deployment

```bash
./deploy.sh
```

### GitHub Secrets Required

| Secret | Description |
|--------|-------------|
| `FTP_USERNAME` | FTP account username |
| `FTP_PASSWORD` | FTP account password |

---

## Keywords & Topics

This tool is relevant for professionals working in:

**Programmatic Advertising:** DSP, SSP, RTB, programmatic buying, real-time bidding, ad exchanges, header bidding, private marketplace (PMP), programmatic direct

**Mobile Attribution:** MMP, AppsFlyer, Adjust, Branch, Singular, Kochava, Tenjin, SKAN, SKAdNetwork, ATT, IDFA, GAID, device fingerprinting

**Performance Marketing:** CPI, CPA, CPM, CPC, ROAS, LTV, eCPM, fill rate, win rate, bid optimization, audience targeting

**Ad Tech Platforms:** Moloco, Kayzen, Smadex, AppLovin, Liftoff, Unity Ads, ironSource, Digital Turbine, Mintegral, InMobi, Vungle, AdColony

**Verticals:** iGaming, casino, sports betting, fintech, e-commerce, subscription apps, gaming, social casino, real-money gaming (RMG)

**AdOps:** Campaign management, trafficking, creative optimization, A/B testing, frequency capping, brand safety, viewability, fraud prevention

---

## Author

**JanNafta** - Programmatic Advertising Expert

- LinkedIn: [jannafta-programmatic-performance-dsp-ssp-rtb](https://www.linkedin.com/in/jannafta-programmatic-performance-dsp-ssp-rtb)
- Email: jannafta@gmail.com
- Calendly: [Book a Call](https://calendly.com/jannafta/1-1-kickoff-call)

### Services
- DSP Campaign Optimization (Moloco, Kayzen, Smadex, AppLovin)
- MMP/Attribution Setup (AppsFlyer, Adjust, Branch, Singular)
- User Acquisition Strategy
- Performance Marketing Audits
- iGaming & Fintech UA Expertise

---

## License

MIT License - Feel free to use this tool for your campaigns!

---

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

*Built with React + Vite | Deployed with GitHub Actions*
