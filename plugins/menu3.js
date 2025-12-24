const { cmd } = require('../command');
const config = require('../config');

// Small stylized mapper for headings
const stylize = (s) => s.split('').map(c => c.toUpperCase()).join(' ');

cmd({
    pattern: 'menu3',
    desc: 'Stylish menu with buttons',
    category: 'menu',
    react: '✨',
    filename: __filename
}, async (conn, mek, m, { from, sender, reply }) => {
    try {
        const user = sender.split('@')[0];
        const title = `╔═━──  𝗦𝗛𝗔𝗥𝗞 𝗠𝗗  ─━═╡`;
        const body = `*${stylize('stylish menu')}*
Welcome @${user}

• Quick access buttons below
• Tap a button to run the command

Use ${config.PREFIX}menu or ${config.PREFIX}menu2 for other views.`;

        const buttons = [
            { buttonId: `${config.PREFIX}menu`, buttonText: { displayText: '📜 Main Menu' }, type: 1 },
            { buttonId: `${config.PREFIX}menu2`, buttonText: { displayText: '🧾 Categories' }, type: 1 },
            { buttonId: `${config.PREFIX}ping`, buttonText: { displayText: '🏓 Ping' }, type: 1 },
            { buttonId: `help`, buttonText: { displayText: '❓ Help' }, type: 1 }
        ];

        const buttonMessage = {
            image: { url: config.MENU_IMAGE_URL || 'https://files.catbox.moe/kiy0hl.jpg' },
            caption: `${title}\n\n${body}`,
            footer: config.DESCRIPTION || 'POPKID XTR',
            buttons,
            headerType: 4
        };

        await conn.sendMessage(from, buttonMessage, { quoted: mek, mentions: [sender] });
    } catch (e) {
        console.error(e);
        await reply('❌ Failed to send stylish menu.');
    }
});
