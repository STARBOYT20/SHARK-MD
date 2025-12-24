const { cmd } = require('../command')

cmd({
    pattern: 'antiview',
    desc: 'Open view-once media by replying to it',
    react: '👀',
    category: 'tools',
    filename: __filename
},
    async (conn, mek, m, { from, quoted, isCmd, reply }) => {
        try {
            if (!quoted) return reply('Reply to a view-once message with the command')
            await conn.copyNForward(from, quoted, true, { readViewOnce: true })
            reply('✅ Opened view-once media.')
        } catch (e) {
            console.log(e)
            reply('❌ Failed to open view-once media: ' + (e.message || e))
        }
    })
