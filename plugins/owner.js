const { cmd } = require('../command');

cmd({
    pattern: "owner",
    desc: "Contact the bot owner",
    react: "👑",
    category: "owner",
    filename: __filename,
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const ownerInfo = `
    👑 *OWNER — STARBOY* 👑

    🤖 *Bot Name:* *SHARK MD*
    👨‍💻 *Developer:* *STARBOY*
    📞 *Contact:* *+255627417402*
    📧 *Email:* *atarimo117@gmail.com*

    💬 *For any issues or inquiries, feel free to contact the owner!*

    🔗 *Powered by STARBOY*
        `.trim();

        // Send owner info as text
        await reply(ownerInfo);

        // You can also send owner's contact card if needed
        // const vcard = 'BEGIN:VCARD\n' +
        //     'VERSION:3.0\n' +
        //     'FN:ArnoldT20\n' +
        //     'ORG:ArnoldT20;\n' +
        //     'TEL;type=CELL;type=VOICE;waid=255627417402:+255627417402\n' +
        //     'END:VCARD';
        // await conn.sendMessage(from, {
        //     contacts: {
        //         displayName: 'ArnoldT20',
        //         contacts: [{ vcard }]
        //     }
        // }, { quoted: mek });

    } catch (e) {
        console.error("Error:", e);
        reply(`❌ Error: ${e.message}`);
    }
});
