const { cmd } = require('../command');

cmd({
    pattern: "alive",
    desc: "Check if bot is running",
    react: "🤖",
    category: "utility",
    filename: __filename,
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const uptime = process.uptime();
        const hours = Math.floor(uptime / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        const seconds = Math.floor(uptime % 60);

        const aliveMessage = `
    🤖 *SHARK MD IS ALIVE!* 🟢

    👤 *User:* ${pushname}
    📱 *Bot Name:* SHARK MD
⏰ *Uptime:* ${hours}h ${minutes}m ${seconds}s
🔄 *Version:* 0.0.5
💻 *Platform:* ${process.platform}
📊 *Memory Usage:* ${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB

📍 *Type* .menu *to see all commands*

🔗 *Powered by STARBOY*
        `.trim();

        // Send alive message with image
        await conn.sendMessage(from, {
            image: { url: 'https://files.catbox.moe/k4h5mm.png' },
            caption: aliveMessage
        }, { quoted: mek });

    } catch (e) {
        console.error("Error:", e);
        // Fallback to text only if image fails
        reply(`🤖 *SHARK MD IS ALIVE!* 🟢\n\nUser: ${pushname}\nBot is running smoothly!\n\n🔗 *Powered by STARBOY*`);
    }
});
