const { cmd } = require('../command');
const axios = require('axios');

cmd({
    pattern: "getimage",
    alias: ["getpic","u2i"],
    desc: "Convert image URL to WhatsApp image",
    category: "media",
    react: "🖼️",
    filename: __filename
}, async (conn, mek, m, { from, reply, text }) => {
    try {
<<<<<<< HEAD
        if (!text) return reply('Please provide an image URL\nExample: !getimage https://example.com/image.jpg');
=======
        if (!text) return reply('Please provide an image URL\nExample: !getimage https://files.catbox.moe/w10gxl.jpg');
>>>>>>> 6f03804 (Upload project from local IMMU-MD-main (1))

        const imageUrl = text.trim();

        // Validate URL
        if (!imageUrl.match(/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i)) {
            return reply('❌ Invalid image URL! Must be direct link to image (jpg/png/gif/webp)');
        }

        // Verify the image exists
        try {
            const response = await axios.head(imageUrl);
            if (!response.headers['content-type']?.startsWith('image/')) {
                return reply('❌ URL does not point to a valid image');
            }
        } catch (e) {
            return reply('❌ Could not access image URL. Please check the link');
        }

        // Send the image
        await conn.sendMessage(from, {
            image: { url: imageUrl },
<<<<<<< HEAD
            caption: '> Powered By IMMU-MD '
=======
            caption: '> Powered By T20-CLASSIC-TECH '
>>>>>>> 6f03804 (Upload project from local IMMU-MD-main (1))
        }, { quoted: mek });

    } catch (error) {
        console.error('GetImage Error:', error);
        reply('❌ Failed to process image. Error: ' + error.message);
    }
});
