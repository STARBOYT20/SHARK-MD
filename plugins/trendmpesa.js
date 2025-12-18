const axios = require("axios");
const { cmd } = require("../command");


cmd({
    pattern: "mpesamenu",
    alias: ["pesa"],
    desc: "menu the bot",
    category: "menu",
    react: "🧿",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `*╭───❍𝐏𝐀𝐘𝐌𝐄𝐍𝐓🫡❍*
‎*├⬡ .𝐇𝐚𝐥𝐨 𝐏𝐞𝐬𝐚*
‎*├⬡ .255627417402*
‎*╰───────────────❍*`;

        await conn.sendMessage(
            from,
            {
                image: { url: `https://files.catbox.moe/k4h5mm.png` },
                caption: dec,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363420222821450@newsletter',
                        newsletterName: "SHARK TECH PAYMENT",
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});
