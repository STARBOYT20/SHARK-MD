# Copilot / AI Agent Instructions — SHARK MD

Purpose: give an AI coding agent the minimal, concrete knowledge to be productive in this repo.

- **Entrypoint:** the bot starts from `index.js` (root). Most changes that affect runtime should be validated there.
- **Run / dev commands:**
  - Production uses PM2: `npm start` (runs `pm2 start index.js --name SHARK-MD`).
  - For quick local testing you can run `node index.js` (ensure env and session files exist).
- **Session / auth:**
  - Sessions are stored under `sessions/`. A `creds.json` is expected at `sessions/creds.json`.
  - The code supports fetching a session from Mega via the `SESSION_ID` env variable — be careful when editing session logic in `index.js` (look for the `SESSION_ID` and `File.fromURL(...)` usage).
- **Config & env:**
  - Runtime options live in `config.js` and can be overridden with `config.env` / environment variables. Important flags: `PREFIX`, `MODE`, `AUTO_REACT`, `READ_MESSAGE`, `OWNER_NUMBER`, `SESSION_ID`.

- **Architecture (big picture):**
  - `index.js` is the connection & event router: it wires Baileys, loads plugins, and dispatches messages to the command system.
  - `plugins/` contains individual command modules; the bot dynamically requires every `.js` file in `plugins/` on start.
  - `command.js` implements the `cmd()` registration API and exports the commands collection used by `index.js`.
  - `lib/` provides utilities (e.g., `functions.js`, `msg.js`, `connection.js`) used across plugins.
  - `data/` contains the persistence helpers (`store.js`, `antidel.js`, etc.) that the runtime imports via `require('./data')`.

- **Plugin conventions & examples:**
  - Plugins register commands via the `cmd({...}, async (conn, mek, m, meta) => {})` pattern. See `plugins/main-plugins.js` and `plugins/main-alive.js` for concrete examples.
  - Key fields in a `cmd()` call: `pattern` (string), `alias`, `react`, `desc`, `category`, `filename` (usually `__filename`), `use` (usage), `owner` (true for owner-only commands).
  - When adding a plugin: export nothing special — call `cmd(...)` inside the plugin file. The loader in `index.js` simply `require('./plugins/' + plugin)` for `.js` files.
  - To install plugins programmatically the repo includes a gist-based installer (`plugins/main-plugins.js`) — it saves JS files under `plugins/` and instructs to restart to load them.

- **Command dispatching behaviour:**
  - Incoming messages are normalized in `index.js` then matched against `config.PREFIX` (default `.`). `events.commands` is searched by `pattern` or `alias`.
  - Plugins may also declare `on` values like `body`, `text`, `image`, `sticker` to receive non-prefix events; look at how `index.js` invokes `command.function(...){}` for `on === 'body'` etc.

- **Data & side effects:**
  - Persistent helpers (save/load messages, anti-delete) live in `data/` and are imported through the `data` index. Avoid changing persistence signatures without updating all call sites.
  - `lib/functions.js` contains common helpers (e.g., `getBuffer`, `isUrl`, `fetchJson`) — prefer reuse instead of duplicating logic.

- **Safety & risky areas to watch:**
  - `index.js` contains `eval`-based owner consoles (`%` and `$` commands). Do not enable these for non-dev deployments; if editing, preserve guards that check `isCreator`.
  - Session-loading logic that fetches `sessions/creds.json` from Mega is sensitive: do not commit secrets or change the fetching behavior without verifying security.

- **Testing and reloads:**
  - New/updated plugins are loaded only on start. Use `npm run restart` (uses pm2) or `pm2 restart SHARK-MD` to reload in production.
  - For fast iteration, run `node index.js` locally after setting `SESSION_ID` or placing `sessions/creds.json`.

- **Where to change common behavior:**
  - Event & dispatch logic: `index.js` (message normalization, permission checks, plugin loader).
  - Command registration / API: `command.js` (observe how `cmd()` is used in plugins).
  - Shared util functions: `lib/functions.js` and `lib/msg.js`.
  - Persistence: `data/*` and `lib/database.js`.

- **Style & small conventions:**
  - Plugins are JS files placed in `plugins/` and should be single-purpose command modules.
  - Use `__filename` in `cmd()` metadata `filename` field to help debugging.
  - Prefer `reply()`/`sendMessage()` through the `conn` object passed into plugin handlers rather than independently creating socket instances.

If any area above is unclear or you want the file to include more examples (e.g., exact `cmd()` signature from `command.js` or `events` structure), tell me which files to inspect next and I'll iterate. 
