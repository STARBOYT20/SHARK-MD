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

