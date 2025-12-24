const config = require('../config');
const moment = require('moment-timezone');
const { cmd, commands } = require('../command');
const { getPrefix } = require('../lib/prefix');

// Stylized uppercase
function toUpperStylized(str) {
  const map = {
    A: 'ᴀ', B: 'ʙ', C: 'ᴄ', D: 'ᴅ', E: 'ᴇ', F: 'ғ', G: 'ɢ', H: 'ʜ',
    I: 'ɪ', J: 'ᴊ', K: 'ᴋ', L: 'ʟ', M: 'ᴍ', N: 'ɴ', O: 'ᴏ', P: 'ᴘ',
    Q: 'ǫ', R: 'ʀ', S: 's', T: 'ᴛ', U: 'ᴜ', V: 'ᴠ', W: 'ᴡ', X: 'x',
    Y: 'ʏ', Z: 'ᴢ'
  };
  return str.split('').map(c => map[c.toUpperCase()] || c).join('');
}

const normalize = (str) =>
  str.toLowerCase().replace(/\s+menu$/, '').trim();

const emojiByCategory = {
  ai: '🤖', anime: '🍥', audio: '🎧', bible: '📖',
  download: '⬇️', downloader: '📥', fun: '🎮', game: '🕹️',
  group: '👥', img_edit: '🖌️', info: 'ℹ️', music: '🎵',
  owner: '👑', search: '🔎', settings: '⚙️',
  sticker: '🌟', tools: '🛠️', user: '👤', utilities: '🧰',
  wallpapers: '🖼️', whatsapp: '📱'
};

cmd({
  pattern: 'menu',
  alias: ['allmenu'],
  desc: 'Show all bot commands',
  category: 'menu',
  react: '✨',
  filename: __filename
}, async (conn, mek, m, { from, sender, reply }) => {
  try {
    const prefix = getPrefix();
    const tz = config.TIMEZONE || 'Africa/Nairobi';
    const time = moment().tz(tz).format('HH:mm:ss');
    const date = moment().tz(tz).format('dddd, DD MMM YYYY');

    const uptime = () => {
      const s = process.uptime();
      return `${Math.floor(s / 3600)}h ${Math.floor((s % 3600) / 60)}m ${Math.floor(s % 60)}s`;
    };

    // 🌌 HEADER (NEON GLASS)
    let menu = `
╔════════════════════════════════════╗
║   ✦ 🦈 𝗦 𝗛 𝗔 𝗥 𝗞   𝗠 𝗗 ✦   ║
╠════════════════════════════════════╣
║ 👤 User    : @${sender.split('@')[0]}
║ ⏳ Runtime : ${uptime()}
║ ⚙️ Mode    : ${config.MODE}
║ 🔣 Prefix  : ${config.PREFIX}
║ 👑 Owner   : ${config.OWNER_NAME}
║ 🧩 Plugins : ${commands.length}
║ 🕒 Time    : ${time}
║ 📆 Date    : ${date}
╚════════════════════════════════════╝

✧✧✧ 𝗘𝗫𝗣𝗟𝗢𝗥𝗘 • 𝗖𝗢𝗡𝗧𝗥𝗢𝗟 • 𝗣𝗢𝗪𝗘𝗥 ✧✧✧
`;

    // GROUP COMMANDS
    const categories = {};
    for (const c of commands) {
      if (c.category && !c.dontAdd && c.pattern) {
        const cat = normalize(c.category);
        categories[cat] = categories[cat] || [];
        categories[cat].push(c.pattern.split('|')[0]);
      }
    }

    // 👑 GLOW ROYAL CATEGORY CARDS (WITH BADGES)
    for (const cat of Object.keys(categories).sort()) {
      const list = categories[cat].sort();
      const count = String(list.length).padStart(2, '0');
      const isOwner = cat === 'owner';
      const emoji = isOwner ? '👑' : (emojiByCategory[cat] || '✨');
      const title = toUpperStylized(cat);

      menu += `
╔═══════〔 ${emoji}  ${title} 〕═══════〔 ${count} 〕═══════╗
`;
      for (const name of list) {
        menu += `║  ${isOwner ? '✪' : '✦'}  ${prefix}${name}\n`;
      }
      menu += `╚══════════════════════════════════════════════════╝\n`;
    }

    // 🌟 FOOTER (SOFT GLOW)
    menu += `
✦────────────────────────────────────────────✦
🌟 ${config.DESCRIPTION || 'Fast • Secure • Premium Experience'}
🔔 Follow our channel for updates
✦────────────────────────────────────────────✦
`;

    await conn.sendMessage(
      from,
      {
        image: { url: config.MENU_IMAGE_URL || 'https://files.catbox.moe/kiy0hl.jpg' },
        caption: menu,
        mentions: [sender]
      },
      { quoted: mek }
    );

  } catch (e) {
    console.error(e);
    reply('❌ Menu failed to load.');
  }
});
