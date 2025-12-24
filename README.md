<svg width="1000" height="480" viewBox="0 0 1000 480"
     xmlns="http://www.w3.org/2000/svg">

  <!-- ================= DEFINITIONS ================= -->
  <defs>
    <filter id="glow">
      <feGaussianBlur stdDeviation="4" result="b"/>
      <feMerge>
        <feMergeNode in="b"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>

    <linearGradient id="sharkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#00bfff"/>
      <stop offset="50%" stop-color="#66ffff"/>
      <stop offset="100%" stop-color="#00bfff"/>
    </linearGradient>
  </defs>

  <!-- ================= BACKGROUND ================= -->
  <rect width="100%" height="100%" fill="#020c14"/>

  <!-- ================= FLOATING BUBBLES ================= -->
  <g fill="#66ffff" opacity="0.3">
    <circle cx="200" cy="500" r="6">
      <animate attributeName="cy" from="500" to="-20" dur="6s" repeatCount="indefinite"/>
    </circle>
    <circle cx="780" cy="520" r="4">
      <animate attributeName="cy" from="520" to="-20" dur="5s" repeatCount="indefinite"/>
    </circle>
    <circle cx="500" cy="510" r="5">
      <animate attributeName="cy" from="510" to="-20" dur="7s" repeatCount="indefinite"/>
    </circle>
  </g>

  <!-- ================= SOUND WAVES ================= -->
  <g stroke="#00ffff" fill="none" opacity="0.4">
    <circle cx="500" cy="240" r="40">
      <animate attributeName="r" from="40" to="120" dur="3s" repeatCount="indefinite"/>
      <animate attributeName="opacity" from="0.5" to="0" dur="3s" repeatCount="indefinite"/>
    </circle>
  </g>

  <!-- ================= ELECTRIC SPARK ================= -->
  <polyline points="300,180 320,160 340,180 360,160"
            stroke="#66ffff" stroke-width="2" fill="none"
            filter="url(#glow)">
    <animate attributeName="opacity"
             values="0;1;0"
             dur="0.6s"
             repeatCount="indefinite"/>
  </polyline>

  <!-- ================= SHARK HEAD ================= -->
  <path d="M450 130
           C420 100 380 100 360 130
           C380 170 420 180 450 175
           L480 190
           L470 165
           C510 155 530 140 550 130
           C530 120 510 115 480 120
           Z"
        fill="url(#sharkGrad)"
        filter="url(#glow)"/>

  <!-- Eye (Blinking) -->
  <circle cx="415" cy="135" r="4" fill="#020c14">
    <animate attributeName="r"
             values="4;1;4"
             dur="4s"
             repeatCount="indefinite"/>
  </circle>

  <!-- ================= TITLE ================= -->
  <text x="500" y="260"
        font-size="60"
        font-family="monospace"
        fill="url(#sharkGrad)"
        text-anchor="middle"
        filter="url(#glow)">
    SHARK MD
    <animateTransform attributeName="transform"
                      type="scale"
                      from="1" to="1.03"
                      dur="2s"
                      repeatCount="indefinite"
                      additive="sum"/>
  </text>

  <!-- ================= TAGLINE ================= -->
  <text x="500" y="315"
        font-size="18"
        fill="#a8f6ff"
        font-family="Arial"
        letter-spacing="3"
        text-anchor="middle">
    🌊 FAST • SMART • WHATSAPP AUTOMATION 🌊
  </text>

  <!-- ================= CREATOR ================= -->
  <text x="500" y="355"
        font-size="15"
        fill="#66ffff"
        font-family="monospace"
        text-anchor="middle">
    MADE BY T20_STARBOY
  </text>

</svg>

# SHARK MD

> SHARK MD is a polished, plugin-based WhatsApp bot built on the Baileys library — fast, modular, and easy to deploy.

[![Node](https://img.shields.io/badge/node-%3E%3D14.0-blue.svg)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](LICENSE)

<p align="center">
  <a href="https://heroku.com/deploy?template=https://github.com/STARBOYT20/SHARK-MD">
    <img src="https://www.herokucdn.com/deploy/button.svg" alt="Deploy to Heroku"/>
  </a>
</p>

---

## Table of Contents

- [Highlights](#highlights)
- [Quick Start (Local)](#quick-start-local)
- [Deployments](#deployments)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

---

## Highlights

- Modular plugin system in `plugins/` — add or remove commands quickly.
- Rich media handling: stickers, image effects, converters, and more.
- Environment-configurable via `config.js` and standard env vars.

---

## Quick Start (Local)

```bash
git clone https://github.com/STARBOYT20/SHARK-MD.git
cd SHARK-MD
npm install
# place a valid WhatsApp session under sessions/creds.json or set SESSION_ID
node index.js
```

---

## Deployments

### Heroku (One-Click)

Click the button above to deploy. After creation, set the following Config Vars in the Heroku app settings:

- `SESSION_ID` (optional)
- `PREFIX` (e.g. `.`)
- `OWNER_NUMBER` (e.g. `255627417402`)
- `NEWSLETTER_JID` (e.g. `120363420222821450@newsletter`)
- `NEWSLETTER_NAME` (e.g. `BLAZE TECH`)
- `MENU_IMAGE_URL` (e.g. `https://files.catbox.moe/k4h5mm.png`)

Heroku CLI quick example:

```bash
heroku create my-shark-md-bot
heroku config:set OWNER_NUMBER=255627417402 NEWSLETTER_JID=120363420222821450@newsletter --app my-shark-md-bot
git push https://git.heroku.com/my-shark-md-bot.git main
```

**Note:** Heroku free-tier dynos are discontinued; pick a paid dyno to keep the bot running.

### PM2 (VPS)

```bash
npm install -g pm2
pm2 start index.js --name SHARK-MD
pm2 save
```

### Docker

Build:

```bash
docker build -t shark-md .
```

Run (example):

```bash
docker run -d --name shark-md \\
  -e OWNER_NUMBER=255627417402 \\
  -v $(pwd)/sessions:/root/shark-md/sessions \\
  shark-md
```

---

## Configuration

All defaults live in `config.js`. Sensitive values and overrides should be supplied as environment variables.

Example envs:

- `OWNER_NUMBER=255627417402`
- `SESSION_ID=shark-session`
- `MENU_IMAGE_URL=https://files.catbox.moe/k4h5mm.png`
- `NEWSLETTER_JID=120363420222821450@newsletter`
- `NEWSLETTER_NAME=BLAZE TECH`

---

## Contributing

Contributions welcome — open issues or PRs.

---

## License

MIT — see the `LICENSE` file for details.
<!-- SVG Logo -->
<p align="center">
	<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 64 64">
		<defs>
			<linearGradient id="grad" x1="0" x2="1">
				<stop offset="0" stop-color="#00d4ff"/>
				<stop offset="1" stop-color="#0066ff"/>
			</linearGradient>
		</defs>
		<rect width="64" height="64" rx="10" fill="#061021"/>
		<path d="M6 32c6-9 18-15 28-15s22 6 28 15c-6 9-18 15-28 15S12 41 6 32z" fill="url(#grad)"/>
		<circle cx="28" cy="28" r="3" fill="#00121a" opacity="0.9"/>
	</svg>
</p>

# SHARK MD

><strong>SHARK MD</strong> — a lightweight, plugin-driven WhatsApp bot built on Baileys.

[![Node](https://img.shields.io/badge/node-%3E%3D14.0-blue.svg)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](LICENSE)

---

<p align="center">
	<a href="https://heroku.com/deploy?template=https://github.com/STARBOYT20/SHARK-MD">
		<img src="https://www.herokucdn.com/deploy/button.svg" alt="Deploy to Heroku"/>
	</a>
</p>

## Highlights

- Modular plugin architecture under the `plugins/` folder
- Fast media tooling: stickers, image effects, and converters
- Configurable via `config.js` and environment variables
- Designed for VPS, Docker, and cloud deployments (Heroku, Koyeb)

---

## Quick Links

- Repo: https://github.com/STARBOYT20/SHARK-MD
- Channel: https://whatsapp.com/channel/0029Vb6H6jF9hXEzZFlD6F3d
- Support Group: https://chat.whatsapp.com/DJMA7QOT4V8FuRD6MpjPpt?mode=ems_copy_t

---

## Requirements

- Node.js 14+ (Node 16+ recommended)
- npm
- A WhatsApp session stored in `sessions/` (or `SESSION_ID` set to load remote session)

---

## Local Quick Start

```bash
git clone https://github.com/STARBOYT20/SHARK-MD.git
cd SHARK-MD
npm install
# provide sessions/creds.json or export SESSION_ID to load session
node index.js
```

If you prefer to run with PM2 (recommended for production):

```bash
npm install -g pm2
pm2 start index.js --name SHARK-MD
pm2 save
```

---

## Deploy to Heroku (One-Click)

Click the button above to deploy to Heroku. Once the app is created, set these config vars in the Heroku dashboard (Settings → Config Vars):

- `SESSION_ID` (optional)
- `PREFIX` (default: `.`)
- `OWNER_NUMBER` (example: `255627417402`)
- `NEWSLETTER_JID` (example: `120363420222821450@newsletter`)
- `NEWSLETTER_NAME` (example: `BLAZE TECH`)
- `MENU_IMAGE_URL` (example: `https://files.catbox.moe/k4h5mm.png`)

Heroku CLI alternative:

```bash
heroku create my-shark-md-bot
heroku config:set OWNER_NUMBER=255627417402 NEWSLETTER_JID=120363420222821450@newsletter --app my-shark-md-bot
<!-- Large SHARK MD SVG Banner -->
<p align="center">
	<svg xmlns="http://www.w3.org/2000/svg" width="720" height="240" viewBox="0 0 900 300" role="img" aria-label="SHARK MD logo">
		<defs>
			<linearGradient id="sharkGrad" x1="0" x2="1">
				<stop offset="0" stop-color="#00e0ff"/>
				<stop offset="1" stop-color="#0066ff"/>
			</linearGradient>
			<filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
				<feDropShadow dx="0" dy="6" stdDeviation="12" flood-opacity="0.25"/>
			</filter>
		</defs>
		<rect width="900" height="300" rx="24" fill="#041126"/>
		<g filter="url(#shadow)">
			<path d="M120 180 C 180 120, 320 100, 420 120 C 520 140, 640 180, 760 160 C 700 120, 640 80, 520 80 C 420 80, 320 100, 240 140 C 180 160, 140 170, 120 180 Z" fill="url(#sharkGrad)" opacity="0.98"/>
			<path d="M280 140 C 300 120, 360 100, 420 110" stroke="#012
docker run -d --name shark-md \ 

	-e OWNER_NUMBER=255627417402 \ 
