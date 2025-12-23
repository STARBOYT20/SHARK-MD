const config = require('../config')
const {cmd , commands} = require('../command')
const os = require("os")
const {runtime} = require('../lib/functions')
const axios = require('axios')
const {sleep} = require('../lib/functions')
const fs = require('fs')
const path = require('path')

cmd({
    pattern: "repo",
    alias: ["sc", "script", "repository"],
    desc: "Fetch information about a GitHub repository.",
    react: "📂",
    category: "info",
    filename: __filename,
},
async (conn, mek, m, { from, reply }) => {
    const githubRepoURL = 'https://github.com/ARNOLDT20/T20-CLASSIC-';

    try {
        // Extract username and repo name from the URL
        const [, username, repoName] = githubRepoURL.match(/github\.com\/([^/]+)\/([^/]+)/);

        // Fetch repository details using GitHub API with axios
        const response = await axios.get(`https://api.github.com/repos/${username}/${repoName}`);
        
        const repoData = response.data;

        // Format the repository information in new stylish format
        const formattedInfo = `
<<<<<<< HEAD
╭─〔 *T20-CLASSIC-AI REPOSITORY* 〕
│
├─ *📌 Repository Name:* ${repoData.name}
├─ *👑 Owner:* T20_STARBOY
├─ *⭐ Stars:* ${repoData.stargazers_count}
├─ *⑂ Forks:* ${repoData.forks_count}
├─ *📝 Description:* ${repoData.description || 'World Best WhatsApp Bot powered by ARNOLDT20}
│
├─ *🔗 GitHub Link:*
│   ${repoData.html_url}
│
├─ *🌐 Join Channel:*
│   https://whatsapp.com/channel/0029Vb6H6jF9hXEzZFlD6F3d
│
╰─ *⚡ Powered by T20-CLASSIC-AI*
`.trim();

        // Send an image with the formatted info as a caption
        await conn.sendMessage(from, {
            image: { url: `https://files.catbox.moe/8hkkds.jpg` }, // Replace with your image URL
=======
    ╭─〔 *T20 classic Ai REPOSITORY* 〕
    │
    ├─ *📌 Repository Name:* ${repoData.name}
    ├─ *👑 Owner:* T20 classic Ai
    ├─ *⭐ Stars:* ${repoData.stargazers_count}
    ├─ *⑂ Forks:* ${repoData.forks_count}
    ├─ *📝 Description:* ${repoData.description || 'World Best WhatsApp Bot powered by T20-CLASSIC-TECH'}
    │
    ├─ *🔗 GitHub Link:*
    │   ${repoData.html_url}
    │
    ├─ *🌐 Join Channel:*
    │   https://whatsapp.com/channel/0029Vaq4PRsD38CJKXzwmb42
    │
    ╰─ *⚡ Powered by T20-CLASSIC-TECH*
    `.trim();

        // Send an image with the formatted info as a caption
        await conn.sendMessage(from, {
            image: { url: `https://files.catbox.moe/w10gxl.jpg` }, // Replace with your image URL
>>>>>>> 6f03804 (Upload project from local IMMU-MD-main (1))
            caption: formattedInfo,
            contextInfo: { 
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
<<<<<<< HEAD
                    newsletterJid: '120363420222821450@newsletter',
                    newsletterName: 'BLAZEADVTECH',
=======
                    newsletterJid: '120363341506278064@newsletter',
                    newsletterName: 'T20 classic Ai',
>>>>>>> 6f03804 (Upload project from local IMMU-MD-main (1))
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

        // Send audio voice message after sending repo info
        const audioPath = path.join(__dirname, '../assets/menux.m4a');
        
        if (fs.existsSync(audioPath)) {
            await conn.sendMessage(from, {
                audio: { url: audioPath },
                mimetype: 'audio/mp4',
                ptt: true
            }, { quoted: mek });
        } else {
            console.error("Audio file not found at path:", audioPath);
        }

    } catch (error) {
        console.error("Error in repo command:", error);
        reply("❌ Sorry, something went wrong while fetching the repository information. Please try again later.");
    }
});
