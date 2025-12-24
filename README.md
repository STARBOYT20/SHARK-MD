# SHARK MD

SHARK MD — WhatsApp bot

Deploy this repository to Heroku with a single click.

<a href="https://heroku.com/deploy?template=https://github.com/STARBOYT20/SHARK-MD"><img src="https://www.herokucdn.com/deploy/button.svg" alt="Deploy to Heroku"/></a>

## Quick Deploy
- Click the **Deploy to Heroku** button above.
- Choose an app name and the target branch (usually `main` or `master`).
- In the "Config Vars" section, add the environment variables required by the bot (see `config.js`).
- Click **Deploy app** and wait for the build to finish. Then open the app and follow any runtime instructions.

## Heroku CLI (alternative)
```bash
# create a Heroku app and push the current repo
heroku create YOUR_APP_NAME
git push https://git.heroku.com/YOUR_APP_NAME.git HEAD:main
# then set config vars via CLI
heroku config:set KEY=VALUE --app YOUR_APP_NAME
```

## Notes
- Review `config.js` for the list of environment variables and defaults.
- If you prefer GitHub integration, connect the repository in the Heroku dashboard and enable automatic deploys.

## Heroku: keep bot running and persist session

Heroku dynos have an ephemeral filesystem — to keep the bot connected across restarts you must persist the Baileys session externally.

- Option A (recommended): use the `SESSION_DATA` config var (base64-encoded `creds.json`). On first successful run the bot will print a base64 string to the logs; copy it and set a Heroku config var named `SESSION_DATA` with that value.

	Example (Heroku CLI):
	```bash
	# copy the base64 printed in your Heroku logs and set it
	heroku config:set SESSION_DATA="<BASE64_STRING>" --app YOUR_APP_NAME
	```

- Option B: use the `SESSION_ID` env variable with a Mega.nz file link (existing behavior). Set `SESSION_ID` to the Mega file id used by the bot.

Notes:
- The repo includes a `Procfile` (web: node index.js) so Heroku will run the bot as a web dyno (required to keep the process alive and respond to the health endpoint `/`).
- Free dynos (if still used) may sleep — use an uptime monitor (UptimeRobot) or upgrade to a paid dyno to avoid sleeping.
- Check Heroku logs to see runtime errors and the base64 session string printed when the session is updated:
	```bash
	heroku logs --tail --app YOUR_APP_NAME
	```

If you want, I can add automated upload of the session to Mega or another storage when credentials change — that requires Mega credentials in env vars. Want me to add that? 

