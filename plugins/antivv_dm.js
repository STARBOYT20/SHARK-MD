const { cmd } = require('../command');

// Reply to a ViewOnce message and send the recovered media to invoker's DM
cmd({
    pattern: 'antivvdm',
    alias: ['vv2dm', 'vv2', 'okk'],
    desc: 'Extract quoted ViewOnce media and send it privately to your DM',
    category: 'misc',
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        // Determine invoker's private JID (participant when in group, otherwise remoteJid)
        const invokerJid = mek.key.participant || mek.key.remoteJid;

        if (!m.quoted && !(m.msg && m.msg.contextInfo && m.msg.contextInfo.quotedMessage)) {
            return reply('Please reply to a ViewOnce message to forward it to your DM.');
        }

        // Try to locate view-once payload (supports viewOnceMessageV2 and legacy viewOnceMessage)
        const quoted = m.quoted || (m.msg && m.msg.contextInfo && m.msg.contextInfo.quotedMessage) || null;
        const vmsg = quoted?.viewOnceMessageV2 || (quoted?.mtype === 'viewOnceMessage' ? quoted.message.viewOnceMessage?.message : null) || quoted;

        if (!vmsg) return reply('Quoted message is not a view-once message.');

        // helper to download and forward
        const dlAndSend = async (payload, type) => {
            const file = await conn.downloadAndSaveMediaMessage(payload).catch(() => null);
            if (!file) return reply(`Failed to download ${type}.`);
            switch (type) {
                case 'image':
                    await conn.sendMessage(invokerJid, { image: { url: file }, caption: payload.caption || '' });
                    break;
                case 'video':
                    await conn.sendMessage(invokerJid, { video: { url: file }, caption: payload.caption || '' });
                    break;
                case 'audio':
                    await conn.sendMessage(invokerJid, { audio: { url: file }, mimetype: 'audio/mpeg' });
                    break;
                case 'document':
                    await conn.sendMessage(invokerJid, { document: { url: file }, fileName: payload.fileName || 'file' });
                    break;
            }
        };

        if (vmsg.imageMessage || (vmsg.message && vmsg.message.imageMessage)) {
            const payload = vmsg.imageMessage || vmsg.message.imageMessage;
            await dlAndSend(payload, 'image');
            await reply('✅ Sent the ViewOnce image to your DM.');
            return;
        }

        if (vmsg.videoMessage || (vmsg.message && vmsg.message.videoMessage)) {
            const payload = vmsg.videoMessage || vmsg.message.videoMessage;
            await dlAndSend(payload, 'video');
            await reply('✅ Sent the ViewOnce video to your DM.');
            return;
        }

        if (vmsg.audioMessage || (vmsg.message && vmsg.message.audioMessage)) {
            const payload = vmsg.audioMessage || vmsg.message.audioMessage;
            await dlAndSend(payload, 'audio');
            await reply('✅ Sent the ViewOnce audio to your DM.');
            return;
        }

        if (vmsg.documentMessage || (vmsg.message && vmsg.message.documentMessage)) {
            const payload = vmsg.documentMessage || vmsg.message.documentMessage;
            await dlAndSend(payload, 'document');
            await reply('✅ Sent the ViewOnce document to your DM.');
            return;
        }

        return reply('Could not extract supported media from the quoted message.');

    } catch (err) {
        console.error('antivv_dm error', err);
        return reply('An error occurred while forwarding the ViewOnce message to DM.');
    }
});
