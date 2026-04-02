<div align="center">

# :link: URL Parameter Manager

**The free, open-source URL builder for marketers who work with tracking links every day.**

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen?style=for-the-badge&logo=google-chrome&logoColor=white)](https://digitalnafta.com/url-builder/)
[![Deploy](https://img.shields.io/github/actions/workflow/status/JanNafta/url-parameter-manager/deploy.yml?style=for-the-badge&label=deploy&logo=github)](https://github.com/JanNafta/url-parameter-manager/actions/workflows/deploy.yml)
[![JavaScript](https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://github.com/JanNafta/url-parameter-manager)
[![Stars](https://img.shields.io/github/stars/JanNafta/url-parameter-manager?style=for-the-badge&logo=github&color=yellow)](https://github.com/JanNafta/url-parameter-manager/stargazers)
[![Forks](https://img.shields.io/github/forks/JanNafta/url-parameter-manager?style=for-the-badge&logo=github&color=blue)](https://github.com/JanNafta/url-parameter-manager/network/members)
[![License: MIT](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)](LICENSE)

<br/>

:point_right: **[Try it now — no login required](https://digitalnafta.com/url-builder/)** :point_left:

</div>

---

## :thinking: What is this?

Imagine you run ads on Google, Facebook, TikTok, or mobile ad networks. Every time you launch a campaign, you need to add special tags (called **parameters**) to your URLs so you can track where your traffic is coming from. Doing this by hand is slow and error-prone.

**URL Parameter Manager** is a web app that lets you paste any URL, visually add or edit those tracking tags, pick from ready-made templates for popular platforms, generate a QR code, and copy the final link — all in seconds. Think of it as a Swiss Army knife for anyone who builds marketing links.

---

## :sparkles: Features

| Feature | Description |
|---------|-------------|
| :dart: **UTM Builder** | Add `utm_source`, `utm_medium`, `utm_campaign` and more with one click |
| :iphone: **MMP Templates** | Pre-built templates for AppsFlyer, Adjust, Branch, and Singular |
| :robot: **DSP Templates** | Ready-to-use macros for Moloco, Kayzen, Smadex, AppLovin, and Appnext |
| :wrench: **Macro Preservation** | Keeps `{campaign_id}`, `${CLICK_ID}`, `xapnt1x` and other tracking macros intact — never URL-encodes them |
| :chart_with_upwards_trend: **QR Code Generator** | Instant, customizable QR codes (7 color themes, 3 sizes) with PNG download |
| :globe_with_meridians: **URL Metadata Preview** | Automatically fetches page title, description, and Open Graph image for any URL |
| :floppy_disk: **URL History** | Your last 20 URLs are saved locally in your browser — no account needed |
| :art: **Syntax Highlighting** | The generated URL is color-coded so you can spot base path vs. query parameters at a glance |
| :lock: **100% Private** | Everything runs in your browser. No data is sent to any server (except the metadata preview, which calls the public Microlink API) |

---

## :movie_camera: How It Works

```
1. Paste a URL          -->  Parameters are auto-detected and shown in an editable table
2. Pick a template      -->  One-click presets for Google, Meta, TikTok, AppsFlyer, Moloco...
3. Edit values           -->  Change any parameter name or value — macros stay safe
4. Copy or scan          -->  Copy the final URL to clipboard, or download a QR code
```

---

## :jigsaw: Supported Platforms

<details>
<summary><strong>Analytics & Ad Platforms</strong></summary>

| Platform | Template included? | Macro format |
|----------|--------------------|-------------|
| Google Ads | :white_check_mark: | `{campaignid}`, `{keyword}`, `{gclid}` |
| Meta (Facebook) Ads | :white_check_mark: | `{{campaign.name}}`, `{{ad.name}}` |
| TikTok Ads | :white_check_mark: | `__CAMPAIGN_NAME__`, `__CLICKID__` |

</details>

<details>
<summary><strong>Mobile Measurement Partners (MMPs)</strong></summary>

| MMP | Template included? | Key parameters |
|-----|-------------------|----------------|
| AppsFlyer | :white_check_mark: | `pid`, `c`, `af_siteid`, `af_c_id`, `clickid` |
| Adjust | :white_check_mark: | `tracker`, `campaign`, `adgroup`, `creative` |
| Branch | Param-ready | Custom deep link params |
| Singular | Param-ready | Custom attribution params |
| Kochava | Param-ready | Custom attribution params |

</details>

<details>
<summary><strong>Demand-Side Platforms (DSPs)</strong></summary>

| DSP | Template included? | Macro format |
|-----|-------------------|-------------|
| Moloco | :white_check_mark: | `${CAMPAIGN_NAME}`, `${CLICK_ID}` |
| Kayzen | :white_check_mark: | `{campaign_name}`, `{CONVERSION_ID}` |
| Smadex | :white_check_mark: | `{CAMPAIGN_NAME}`, `{CLICK_ID}` |
| Appnext | :white_check_mark: | `xapnt1x`, `{apnt_campid}` |
| AppLovin | Param-ready | Custom macros |
| Liftoff | Param-ready | Custom macros |
| Unity Ads | Param-ready | Custom macros |
| Digital Turbine | Param-ready | Custom macros |
| Mintegral | Param-ready | Custom macros |

</details>

---

## :building_construction: Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **UI Framework** | React 18 | Component-based interface |
| **Build Tool** | Vite 5 | Fast dev server & optimized production builds |
| **Styling** | Tailwind CSS 3 | Utility-first responsive design |
| **Icons** | Lucide React | Clean, consistent SVG icons |
| **QR Codes** | qrcode.react | Client-side QR code generation |
| **Metadata** | Microlink API | Fetches Open Graph data for URL previews |
| **Deployment** | GitHub Actions + FTP | Auto-deploy on every push to `main` |

---

## :rocket: Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or higher
- npm (comes with Node.js)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/JanNafta/url-parameter-manager.git
cd url-parameter-manager

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will open at `http://localhost:5173`.

### Build for Production

```bash
npm run build
```

The optimized output goes to the `dist/` folder, ready to deploy anywhere (static hosting, CDN, FTP, etc.).

---

## :open_file_folder: Project Structure

```
url-parameter-manager/
├── public/                  # Static assets (favicons, robots.txt, sitemap)
├── src/
│   ├── components/
│   │   ├── Header.jsx       # Top navigation bar with feature badges
│   │   ├── Footer.jsx       # CTA section + services grid
│   │   ├── UrlInput.jsx     # URL input field with validation & examples
│   │   ├── ParameterTable.jsx   # Editable table of URL parameters
│   │   ├── UTMTemplates.jsx     # One-click template presets (9 platforms)
│   │   ├── UpdatedUrl.jsx       # Generated URL display with copy button
│   │   ├── MetadataPreview.jsx  # OG metadata + favicon preview
│   │   ├── QRCodeGenerator.jsx  # QR code with color/size options
│   │   ├── URLHistory.jsx       # LocalStorage-based URL history
│   │   └── index.js             # Barrel exports
│   ├── hooks/
│   │   └── useDebounce.js   # Debounce hook (avoids API spam)
│   ├── utils/
│   │   └── urlUtils.js      # URL parsing, macro preservation, encoding
│   ├── App.jsx              # Main application component
│   ├── main.jsx             # React entry point
│   └── index.css            # Global styles + animations
├── index.html               # HTML entry point with SEO meta tags & schemas
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── package.json             # Dependencies and scripts
└── deploy.sh                # Manual deployment script
```

---

## :brain: How Macro Preservation Works

Most URL builders break tracking macros like `{campaign_id}` by URL-encoding the curly braces into `%7Bcampaign_id%7D`. Ad networks then cannot read them.

This tool **detects and preserves** six macro formats automatically:

| Format | Example | Used by |
|--------|---------|---------|
| `{macro}` | `{campaign_id}` | AppsFlyer, Kayzen, Smadex |
| `${macro}` | `${CLICK_ID}` | Moloco |
| `[macro]` | `[timestamp]` | Various |
| `%%macro%%` | `%%CLICK_ID%%` | Legacy networks |
| `@[macro]` | `@[CLICK_ID]` | Custom integrations |
| `xapntNx` | `xapnt1x` | Appnext |

Everything else gets properly URL-encoded. The logic lives in `src/utils/urlUtils.js`.

---

## :globe_with_meridians: SEO & Metadata

The app includes production-grade SEO out of the box:

- **Open Graph & Twitter Card** meta tags for rich link previews
- **JSON-LD structured data** — WebApplication, Person, and FAQ schemas
- **Canonical URL**, sitemap, and robots.txt
- **Accessibility**: ARIA labels, focus rings, reduced-motion support, keyboard navigation

---

## :handshake: Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

```bash
# Fork the repo, then:
git checkout -b feature/my-new-feature
# Make your changes...
git commit -m "feat: add my new feature"
git push origin feature/my-new-feature
# Open a Pull Request on GitHub
```

---

## :bust_in_silhouette: Author

**Jan Naftanaila** — Media Buyer & AI Automation Specialist

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/jannafta-programmatic-performance-dsp-ssp-rtb)
[![Email](https://img.shields.io/badge/Email-jannafta@gmail.com-red?style=flat-square&logo=gmail)](mailto:jannafta@gmail.com)
[![Calendly](https://img.shields.io/badge/Calendly-Book_a_Call-green?style=flat-square&logo=calendly)](https://calendly.com/jannafta/1-1-kickoff-call)

Specializing in programmatic advertising (DSP/SSP), mobile attribution (AppsFlyer, Adjust, Branch), and user acquisition strategy for mobile apps.

---

## :page_facing_up: License

MIT License — free to use, modify, and distribute. See [LICENSE](LICENSE) for details.

---

<div align="center">

**If this tool saved you time, consider giving it a :star: on GitHub!**

Made with :heart: by [JanNafta](https://www.linkedin.com/in/jannafta-programmatic-performance-dsp-ssp-rtb)

</div>
