const config = require('../config');
const moment = require('moment-timezone');
const { cmd, commands } = require('../command');
const { getPrefix } = require('../lib/prefix');

// Stylized uppercase (ʜɪ style)
function toUpperStylized(str) {
  const stylized = {
    A: 'ᴀ', B: 'ʙ', C: 'ᴄ', D: 'ᴅ', E: 'ᴇ', F: 'ғ', G: 'ɢ', H: 'ʜ',
    I: 'ɪ', J: 'ᴊ', K: 'ᴋ', L: 'ʟ', M: 'ᴍ', N: 'ɴ', O: 'ᴏ', P: 'ᴘ',
    Q: 'ǫ', R: 'ʀ', S: 's', T: 'ᴛ', U: 'ᴜ', V: 'ᴠ', W: 'ᴡ', X: 'x',
    Y: 'ʏ', Z: 'ᴢ'
  };
  return str.split('').map(c => stylized[c.toUpperCase()] || c).join('');
}

// Normalize category
const normalize = (str) =>
  str.toLowerCase().replace(/\s+menu$/, '').trim();

// Emojis per category
const emojiByCategory = {
  ai: '🤖',
  anime: '🍥',
  audio: '🎧',
  bible: '📖',
  download: '⬇️',
  downloader: '📥',
  fun: '🎮',
  game: '🕹️',
  group: '👥',
  img_edit: '🖌️',
  info: 'ℹ️',
  information: '🧠',
  logo: '🖼️',
  main: '🏠',
  media: '🎞️',
  menu: '📜',
  misc: '📦',
  music: '🎵',
  owner: '👑',
  privacy: '🔒',
  search: '🔎',
  settings: '⚙️',
  sticker: '🌟',
  tools: '🛠️',
  user: '👤',
  utilities: '🧰',
  wallpapers: '🖼️',
  whatsapp: '📱'
};

cmd({
  pattern: 'menu',
  alias: ['allmenu'],
  desc: 'Show all bot commands',
  category: 'menu',
  react: '👌',
  filename: __filename
}, async (conn, mek, m, { from, sender, reply }) => {
  try {
    const prefix = getPrefix();
    const timezone = config.TIMEZONE || 'Africa/Nairobi';
    const time = moment().tz(timezone).format('HH:mm:ss');
    const date = moment().tz(timezone).format('dddd, DD MMMM YYYY');

    const uptime = () => {
      let sec = process.uptime();
      let h = Math.floor(sec / 3600);
      let m = Math.floor((sec % 3600) / 60);
      let s = Math.floor(sec % 60);
      return `${h}h ${m}m ${s}s`;
    };

    // HEADER
    let menu = `
╭━━━〔 🦈 𝗦𝗛𝗔𝗥𝗞 𝗠𝗗 〕━━━╮
┃ 👤 𝗨𝗦𝗘𝗥 : @${sender.split('@')[0]}
┃ ⏳ 𝗥𝗨𝗡𝗧𝗜𝗠𝗘 : ${uptime()}
┃ ⚙️ 𝗠𝗢𝗗𝗘 : ${config.MODE}
┃ 🔣 𝗣𝗥𝗘𝗙𝗜𝗫 : ${config.PREFIX}
┃ 👑 𝗢𝗪𝗡𝗘𝗥 : ${config.OWNER_NAME}
┃ 🧩 𝗣𝗟𝗨𝗚𝗜𝗡𝗦 : ${commands.length}
┃ 🕒 ${time}
┃ 📆 ${date}
╰━━━━━━━━━━━━━━━━━━━━╯
`;

    // GROUP COMMANDS BY CATEGORY
    const categories = {};
    for (const c of commands) {
      if (c.category && !c.dontAdd && c.pattern) {
        const cat = normalize(c.category);
        categories[cat] = categories[cat] || [];
        categories[cat].push(c.pattern.split('|')[0]);
      }
    }

    // ROYAL CATEGORY STYLE (STYLE 5)
    for (const cat of Object.keys(categories).sort()) {
      const emoji = cat === 'owner'
        ? '👑'
        : (emojiByCategory[cat] || '✨');

      menu += `
╔═══════〔 ${emoji}  ${toUpperStylized(cat)} 〕═══════╗
`;
      for (const cmdName of categories[cat].sort()) {
        menu += `║ ✪ ${prefix}${cmdName}\n`;
      }
      menu += `╚══════════════════════════════╝\n`;
    }

    // FOOTER
    menu += `
━━━━━━━━━━━━━━━━━━━
✨ ${config.DESCRIPTION || 'Powerful • Fast • Reliable'}
━━━━━━━━━━━━━━━━━━━
`;

    // SEND MENU IMAGE
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
    await reply('❌ Failed to load menu.');
  }
});
