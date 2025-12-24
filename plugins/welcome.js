const { cmd } = require('../command');
const config = require('../config');

// Auto welcome and goodbye messages for group participant updates
// Enable via config.WELCOME = 'true' and config.GOODBYE = 'true'
// Customize messages with placeholders: @user and @group

cmd({ on: 'group-participants.update' }, async (conn, update) => {
    try {
        const groupId = update.id || update.jid || update.remoteJid;
        const participants = update.participants || [];
        const action = update.action || update.type || '';

        const groupMeta = groupId ? await conn.groupMetadata(groupId).catch(() => null) : null;
        const groupName = groupMeta?.subject || '';

        for (const participant of participants) {
            const number = participant.split('@')[0];
            const mentions = [participant];

            if ((action === 'add' || action === 'invite' || action === 'add_non_admin') && config.WELCOME === 'true') {
                const template = config.WELCOME_MSG || 'Welcome @user to @group!';
                const text = template.replace(/@user/g, `@${number}`).replace(/@group/g, groupName);
                await conn.sendMessage(groupId, { text, mentions }).catch(() => null);
            }

            if ((action === 'remove' || action === 'left' || action === 'leave') && config.GOODBYE === 'true') {
                const template = config.GOODBYE_MSG || 'Goodbye @user — we will miss you from @group.';
                const text = template.replace(/@user/g, `@${number}`).replace(/@group/g, groupName);
                await conn.sendMessage(groupId, { text, mentions }).catch(() => null);
            }
        }
    } catch (e) {
        console.error('welcome plugin error:', e && e.message ? e.message : e);
    }
});
