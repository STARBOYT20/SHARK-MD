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
