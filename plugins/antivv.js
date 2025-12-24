const { cmd } = require('../command');

// Resend quoted view-once content (image/video/audio/document)
cmd({
    pattern: 'antivv',
    alias: ['ok', 'vv', 'oho'],
    desc: 'Open and resend a ViewOnce message (reply to the message).',
    category: 'misc',
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        // Prefer the normalized message helper `m.quoted` if available in handler
        const quoted = m.quoted || (m.msg && m.msg.contextInfo && m.msg.contextInfo.quotedMessage) ? m.msg.contextInfo.quotedMessage : null;

        if (!m.quoted && !quoted) return reply('Please reply to a ViewOnce message.');

        // Support both new viewOnceMessageV2 and older viewOnceMessage
        const vmsg = m.quoted?.viewOnceMessageV2 || (m.quoted?.mtype === 'viewOnceMessage' ? m.quoted.message.viewOnceMessage?.message : null) || (quoted && quoted.viewOnceMessageV2) || (quoted && quoted.viewOnceMessage && quoted.viewOnceMessage.message);

        const target = vmsg || m.quoted;

        if (!target) return reply('This is not a ViewOnce message.');

        // image
        if (target.imageMessage || (target.message && target.message.imageMessage)) {
            const img = (target.imageMessage) ? target.imageMessage : target.message.imageMessage;
            const file = await conn.downloadAndSaveMediaMessage(img).catch(() => null);
            if (!file) return reply('Failed to download image.');
            return conn.sendMessage(from, { image: { url: file }, caption: img.caption || '' }, { quoted: mek });
        }

        // video
        if (target.videoMessage || (target.message && target.message.videoMessage)) {
            const vid = (target.videoMessage) ? target.videoMessage : target.message.videoMessage;
            const file = await conn.downloadAndSaveMediaMessage(vid).catch(() => null);
            if (!file) return reply('Failed to download video.');
            return conn.sendMessage(from, { video: { url: file }, caption: vid.caption || '' }, { quoted: mek });
        }

        // audio
        if (target.audioMessage || (target.message && target.message.audioMessage)) {
            const aud = (target.audioMessage) ? target.audioMessage : target.message.audioMessage;
            const file = await conn.downloadAndSaveMediaMessage(aud).catch(() => null);
            if (!file) return reply('Failed to download audio.');
            return conn.sendMessage(from, { audio: { url: file }, mimetype: 'audio/mpeg' }, { quoted: mek });
        }

        // document / other
        if (target.documentMessage || (target.message && target.message.documentMessage)) {
            const doc = (target.documentMessage) ? target.documentMessage : target.message.documentMessage;
            const file = await conn.downloadAndSaveMediaMessage(doc).catch(() => null);
            if (!file) return reply('Failed to download document.');
            return conn.sendMessage(from, { document: { url: file }, fileName: doc.fileName || 'file' }, { quoted: mek });
        }

        return reply('Could not extract media from the quoted message.');

    } catch (e) {
        console.error('antivv error', e);
        return reply('An error occurred while opening the ViewOnce message.');
    }
});
