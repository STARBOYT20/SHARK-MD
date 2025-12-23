const { cmd } = require("../command");
const axios = require("axios");

cmd({
  pattern: "rw",
  alias: ["randomwall", "wallpaper"],
  react: "🌌",
  desc: "Download random wallpapers based on keywords.",
  category: "wallpapers",
  use: ".rw <keyword>",
  filename: __filename
}, async (conn, m, store, { from, args, reply }) => {
  try {
    const query = args.join(" ") || "random";
    const apiUrl = `https://pikabotzapi.vercel.app/random/randomwall/?apikey=anya-md&query=${encodeURIComponent(query)}`;

    const { data } = await axios.get(apiUrl);
    
    if (data.status && data.imgUrl) {
<<<<<<< HEAD
      const caption = `🌌 *Random Wallpaper: ${query}*\n\n> *© Powered by T20-CLASSIC-AI*`;
=======
      const caption = `🌌 *Random Wallpaper: ${query}*\n\n> *© Powered by IMMU MDX*`;
>>>>>>> 6f03804 (Upload project from local IMMU-MD-main (1))
      await conn.sendMessage(from, { image: { url: data.imgUrl }, caption }, { quoted: m });
    } else {
      reply(`❌ No wallpaper found for *"${query}"*.`);
    }
  } catch (error) {
    console.error("Wallpaper Error:", error);
    reply("❌ An error occurred while fetching the wallpaper. Please try again.");
  }
<<<<<<< HEAD
});
=======
});
>>>>>>> 6f03804 (Upload project from local IMMU-MD-main (1))
