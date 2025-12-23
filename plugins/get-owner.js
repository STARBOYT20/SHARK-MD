const { cmd } = require('../command');
const config = require('../config');
const { sleep } = require('../lib/functions');

cmd({
  pattern: "owner",
  desc: "Get owner number",
  category: "main",
  react: "💀",
  filename: __filename
}, async (sock, m, msg, { from }) => {
  try {
<<<<<<< HEAD
    const number = config.OWNER_NUMBER; // e.g. "255627417402"
=======
    const number = config.OWNER_NUMBER; // e.g. "923493114170"
>>>>>>> 6f03804 (Upload project from local IMMU-MD-main (1))
    const name = config.OWNER_NAME || "Bot Owner";

    // React with loading emoji
    await sock.sendMessage(from, { react: { text: "📇", key: m.key } });
    await sock.sendPresenceUpdate("composing", from);
    await sleep(1000);

    const vcard =
      'BEGIN:VCARD\n' +
      'VERSION:3.0\n' +
      `FN:${name}\n` +
<<<<<<< HEAD
      `ORG:IMMU-MD Team;\n` +
=======
      `ORG:T20 classic Ai Team;\n` +
>>>>>>> 6f03804 (Upload project from local IMMU-MD-main (1))
      `TEL;type=CELL;type=VOICE;waid=${number}:${'+' + number}\n` +
      'END:VCARD';

    await sock.sendMessage(from, {
      contacts: {
        displayName: name,
        contacts: [{ vcard }]
      }
    });

    await sock.sendMessage(from, { react: { text: "✅", key: m.key } });

  } catch (e) {
    console.error("Error sending contact:", e);
    await sock.sendMessage(from, {
      text: `❌ Couldn't send contact:\n${e.message}`
    });
  }
});
