const config = require('../config');
const { cmd, commands } = require('../command');

cmd({
    pattern: "ping",
    alias: ["speed","pong"],use: '.ping',
    desc: "Check bot's response time.",
    category: "main",
    react: "⚡",
    filename: __filename
},
async (conn, mek, m, { from, quoted, sender, reply }) => {
    try {
        const start = new Date().getTime();

        const reactionEmojis = ['🔥', '⚡', '🚀', '💨', '🎯', '🎉', '🌟', '💥', '🕐', '🔹'];
        const textEmojis = ['💎', '🏆', '⚡️', '🚀', '🎶', '🌠', '🌀', '🔱', '🛡️', '✨'];

        const reactionEmoji = reactionEmojis[Math.floor(Math.random() * reactionEmojis.length)];
        let textEmoji = textEmojis[Math.floor(Math.random() * textEmojis.length)];

        // Ensure reaction and text emojis are different
        while (textEmoji === reactionEmoji) {
            textEmoji = textEmojis[Math.floor(Math.random() * textEmojis.length)];
        }

        // Send reaction using conn.sendMessage()
        await conn.sendMessage(from, {
            react: { text: textEmoji, key: mek.key }
        });

        const end = new Date().getTime();
        const responseTime = (end - start) / 1000;

<<<<<<< HEAD
        const text = `> *T20-CLASSIC-AI SPEED: ${responseTime.toFixed(2)}ms ${reactionEmoji}*`;
=======
        const text = `> *T20 classic Ai SPEED: ${responseTime.toFixed(2)}ms ${reactionEmoji}*`;
>>>>>>> 6f03804 (Upload project from local IMMU-MD-main (1))

        await conn.sendMessage(from, {
            text,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
<<<<<<< HEAD
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363420222821450@newsletter',
                    newsletterName: "BLAZEADVTECH",
                    serverMessageId: 143
                }
=======
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363341506278064@newsletter',
                        newsletterName: 'T20 classic Ai',
                        serverMessageId: 143
                    }
>>>>>>> 6f03804 (Upload project from local IMMU-MD-main (1))
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in ping command:", e);
        reply(`An error occurred: ${e.message}`);
    }
});

// ping2 

cmd({
    pattern: "ping2",
    desc: "Check bot's response time.",
    category: "main",
    react: "🍂",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const startTime = Date.now()
        const message = await conn.sendMessage(from, { text: '*PINGING...*' })
        const endTime = Date.now()
        const ping = endTime - startTime
<<<<<<< HEAD
        await conn.sendMessage(from, { text: `*🔥 T20-CLASSIC-AI SPEED : ${ping}ms*` }, { quoted: message })
=======
        await conn.sendMessage(from, { text: `*🔥 T20 classic Ai SPEED : ${ping}ms*` }, { quoted: message })
>>>>>>> 6f03804 (Upload project from local IMMU-MD-main (1))
    } catch (e) {
        console.log(e)
        reply(`${e}`)
    }
})
