const { cmd } = require('../command');
const config = require('../config');
const { isJidNewsletter } = require('@whiskeysockets/baileys');

// Auto react to every newsletter/channel post when received
// Enable via config.AUTO_CHANNEL_REACT = 'true' and optional config.CHANNEL_REACT_EMOJI

cmd({
    on: 'ready'
}, async (conn) => {
    try {
        if (config.AUTO_CHANNEL_REACT !== 'true') return;

        const emoji = config.CHANNEL_REACT_EMOJI || '👍';

        const messageHandler = async (upsert) => {
            try {
                const msg = upsert.messages && upsert.messages[0];
                if (!msg || !msg.key) return;
                const remote = msg.key.remoteJid;
                const messageId = msg.key.id;
                if (!remote || !messageId) return;

                if (!isJidNewsletter(remote)) return;

                // Try multiple newsletter react APIs (some Baileys versions differ)
                try {
                    if (typeof conn.newsletterReactMessage === 'function') {
                        await conn.newsletterReactMessage(remote, messageId, emoji).catch(() => null);
                        return;
                    }
                } catch (e) {
                    // continue to other attempts
                }

                try {
                    if (typeof conn.newsletterReact === 'function') {
                        await conn.newsletterReact(remote, messageId, emoji).catch(() => null);
                        return;
                    }
                } catch (e) { }

                // If no react API available, optionally send a simple acknowledgement (avoid spamming)
                if (config.CHANNEL_REACT_FALLBACK === 'true') {
                    try {
                        await conn.sendMessage(remote, { text: emoji }, { quoted: { key: { id: messageId } } }).catch(() => null);
                    } catch (e) { }
                }
            } catch (e) {
                console.error('auto-channel-react handler error:', e && e.message ? e.message : e);
            }
        };

        conn.ev.on('messages.upsert', messageHandler);
    } catch (e) {
        console.error('Failed to initialize auto-channel-react:', e && e.message ? e.message : e);
    }
});
