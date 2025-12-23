const config = require('../config');
const { cmd, commands } = require('../command');
const { sleep } = require('../lib/functions');

cmd({
    pattern: "restart",
    alias: ["rebot", "reboot"],
    react: "🕸️",
    desc: "Restart the bot",
    category: "owner",
    filename: __filename
},
async (conn, mek, m, {
    from, quoted, body, isCmd, command, args, q,
    isGroup, sender, senderNumber, botNumber2, botNumber,
    pushname, isMe, isOwner, isCreator, groupMetadata,
    groupName, participants, groupAdmins, isBotAdmins,
    isAdmins, reply
}) => {
    try {
        if (!isCreator) {
            return reply("🚫 *This command is only for the bot owner (creator).*");
        }

        const { exec } = require("child_process");
<<<<<<< HEAD
        reply("♻️ Restarting T20-CLASSIC-AI...");
=======
        reply("♻️ Restarting the bot...");
>>>>>>> 6f03804 (Upload project from local IMMU-MD-main (1))
        await sleep(1500);
        exec("pm2 restart all");
    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});
