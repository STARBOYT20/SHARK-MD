const { cmd, commands } = require('../command');
const axios = require('axios');

cmd({
    pattern: "pair",
    alias: ["getpair", "clonebot"],
    react: "✅",
<<<<<<< HEAD
    desc: "Get pairing code for T20-CLASSIC-AI bot",
    category: "download",
    use: ".pair 25562741XXX",
=======
    desc: "Get pairing code for T20 classic Ai bot",
    category: "download",
    use: ".pair 923427582XXX",
>>>>>>> 6f03804 (Upload project from local IMMU-MD-main (1))
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, senderNumber, reply }) => {
    try {
        // Extract phone number from command
        const phoneNumber = q ? q.trim().replace(/[^0-9]/g, '') : senderNumber.replace(/[^0-9]/g, '');

        // Validate phone number format
        if (!phoneNumber || phoneNumber.length < 10 || phoneNumber.length > 15) {
            return await reply("❌ Please provide a valid phone number without `+`\nExample: `.pair 923427582XXX`");
        }

        // Make API request to get pairing code
        const response = await axios.get(`https://khanmd-pair.onrender.com/code?number=${encodeURIComponent(phoneNumber)}`);

        if (!response.data || !response.data.code) {
            return await reply("❌ Failed to retrieve pairing code. Please try again later.");
        }

        const pairingCode = response.data.code;
<<<<<<< HEAD
        const doneMessage = "> *T20-CLASSIC-AI PAIRING COMPLETED*";
=======
        const doneMessage = "> *T20 classic Ai PAIRING COMPLETED*";
>>>>>>> 6f03804 (Upload project from local IMMU-MD-main (1))

        // Send initial message with formatting
        await reply(`${doneMessage}\n\n*Your pairing code is:* ${pairingCode}`);

        // Optional 2-second delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Send clean code again
        await reply(`${pairingCode}`);

    } catch (error) {
        console.error("Pair command error:", error);
        await reply("❌ An error occurred while getting pairing code. Please try again later.");
    }
});

cmd({
    pattern: "pair2",
    alias: ["getpair2", "reqpair", "clonebot2"],
    react: "📉",
<<<<<<< HEAD
    desc: "Get pairing code for T20-CLASSIC-AI bot",
    category: "download",
    use: ".pair 25576841XXX",
=======
    desc: "Get pairing code for IMMU-MD bot",
    category: "download",
    use: ".pair 923427582XXX",
>>>>>>> 6f03804 (Upload project from local IMMU-MD-main (1))
    filename: __filename
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, senderNumber, reply }) => {
    try {
        // Check if in group
        if (isGroup) {
            return await reply("❌ This command only works in private chat. Please message me directly.");
        }

        // Show processing reaction
        await conn.sendMessage(from, { react: { text: "⏳", key: mek.key } });

        // Extract phone number
        const phoneNumber = q ? q.trim().replace(/[^0-9]/g, '') : senderNumber.replace(/[^0-9]/g, '');

        // Validate phone number
        if (!phoneNumber || phoneNumber.length < 10 || phoneNumber.length > 15) {
            return await reply("❌ Invalid phone number format!\n\nPlease use: `.pair 923000000000`\n(Without + sign)");
        }

        // Get pairing code from API
        const response = await axios.get(`https://khanmd-pair.onrender.com/code?number=${encodeURIComponent(phoneNumber)}`);
        
        if (!response.data?.code) {
            return await reply("❌ Failed to get pairing code. Please try again later.");
        }

        const pairingCode = response.data.code;
        
        // Send image with caption
        const sentMessage = await conn.sendMessage(from, {
<<<<<<< HEAD
            image: { url: "https://i.postimg.cc/VvsHrd2V/Picsart-25-08-10-00-45-06-305.jpg" },
            caption: `- *Pairing Code For T20-CLASSIC-AI ⚡*\n\n Notification has been sent to your WhatsApp. Please check your phone and copy this code to pair it and get your *IMMU-MD* session id.\n\n*🔢 Pairing Code*: *${pairingCode}*\n\n> *Copy it from below message 👇🏻*`
=======
            image: { url: "https://files.catbox.moe/w10gxl.jpg" },
            caption: `- *Pairing Code For T20 classic Ai ⚡*\n\n Notification has been sent to your WhatsApp. Please check your phone and copy this code to pair it and get your *T20 classic Ai* session id.\n\n*🔢 Pairing Code*: *${pairingCode}*\n\n> *Copy it from below message 👇🏻*`
>>>>>>> 6f03804 (Upload project from local IMMU-MD-main (1))
        }, { quoted: m });

        // Send clean code separately
        await reply(pairingCode);
        
        // Add ✅ reaction to the clean code message
        await conn.sendMessage(from, { react: { text: "✅", key: mek.key } });

    } catch (error) {
        console.error("Pair command error:", error);
        await reply("❌ An error occurred. Please try again later.");
    }
});
