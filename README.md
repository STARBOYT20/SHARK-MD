# SHARK-MD

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/STARBOYT20/SHARK-MD)

![SHARK MD Banner](https://files.catbox.moe/k4h5mm.png)

SHARK-MD is a responsive WhatsApp multi-device bot built with Node.js and the Baileys library. It's designed to be easy to deploy (including one-click Heroku deploy), customise, and extend with plugins.

**Highlights**
- Multi-device WhatsApp support
- Plugin-based commands and menus
- Built-in utilities: weather, media, logo maker, and more
- Simple Heroku deployment via the button above

**Quick Deploy (Heroku)**
1. Click the **Deploy to Heroku** button above.
2. On the Heroku page, choose your app name and set any required environment variables. Recommended env vars:
	- `SESSION_ID` — (optional) your session identifier. It must start with the literal prefix `POPKID;;;` followed by the session token. Example:
		`POPKID;;;LZtnkKKL#wON0UKqd_Uh8mWg05tbSWMsn-JE56QzknHXPv_qT3nU`
		(If deploying to Heroku, it's easier to set `SESSION_URL` to a direct URL to the creds file.)
	- `BOT_NAME` — bot display name (default: `SHARK MD`)
	- `OWNER_NAME` — set to `STARBOY` or your preferred owner name
	- `OWNER_NUMBER` — the owner WhatsApp number (e.g. `255627417402`)
	- `PREFIX` — command prefix (default: `.`)
	- `MENU_IMAGE_URL` — URL to menu image (optional)
	- `SESSION_URL` — (optional) direct URL to the session creds file (preferred for Heroku). Supports Mega links (`https://mega.nz/file/<id>`) or direct HTTPS file URLs.
	- `MENU_IMAGE_URL` — URL to menu image (optional)
3. Deploy. Heroku will build and run the bot using the provided `Procfile`.

**Run Locally**
1. Clone the repo:
```powershell
git clone https://github.com/STARBOYT20/SHARK-MD.git
cd SHARK-MD
```
2. Install dependencies and run:
```powershell
npm install
node index.js
```
3. Set environment variables using a `.env` or `config.env` file as needed.

**Files of interest**
- `index.js` — main entrypoint
- `config.js` — environment defaults (owner, bot name, behaviour toggles)
- `app.json` & `heroku.yml` — Heroku deployment metadata
- `plugins/` — plugin commands and menu handlers

**Customization**
- To change the owner display, edit `config.js` or set `OWNER_NAME` in your environment to `STARBOY` (already set by default).
- To change the bot name, set `BOT_NAME` env var or modify `config.js`.

If you'd like, I can also:
- Create sample `config.env` with recommended variables
- Commit these changes and push a branch for you
- Add GitHub Actions or other CI for testing

Enjoy SHARK-MD — tell me if you want visual tweaks or extra deployment options.
