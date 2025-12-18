const { cmd } = require('../command');

cmd({
    pattern: "test",
    alias: [],
    use: '.test',
    desc: "Send a random voice note from URL.",
    category: "fun",
    react: "🎙️",
    filename: __filename
},
async (conn, mek, m, { from, quoted, sender, reply }) => {
    try {
        const songUrls = [
            "https://files.catbox.moe/m3i466.mp3"
            // Add more direct URLs here
        ];

        if (!songUrls.length) return reply("No song URLs configured.");

        const randomUrl = songUrls[Math.floor(Math.random() * songUrls.length)];

        // Fake verified contact as quoted message
                const fakeContact = {
            key: {
                fromMe: false,
                participant: "0@s.whatsapp.net",
                remoteJid: "status@broadcast"
            },
            message: {
                contactMessage: {
                    displayName: "ArnoldT20 VERIFIED ✅",
                    vcard: "BEGIN:VCARD\nVERSION:3.0\nFN:ArnoldT20\nORG:ArnoldT20;\nTEL;type=CELL;type=VOICE;waid=255627417402:+255627417402\nEND:VCARD"
                }
            }
        };

        await conn.sendMessage(from, {
            audio: { url: randomUrl },
            mimetype: 'audio/mp4',
            ptt: true,
            contextInfo: {
                mentionedJid: [sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363420222821450@newsletter',
                    newsletterName: "SHARK TECH",
                    serverMessageId: 143
                },
                externalAdReply: {
                    title: "SHARK MD",
                    body: "Multi-Device WhatsApp Bot",
                    thumbnailUrl: "https://files.catbox.moe/k4h5mm.png",
                    mediaType: 1,
                    renderLargerThumbnail: true,
                    showAdAttribution: true
                }
            }
        }, { quoted: fakeContact });

    } catch (e) {
        console.error("Error in test command:", e);
        reply(`An error occurred: ${e.message}`);
    }
});
