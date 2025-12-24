const { cmd } = require('../command');
const config = require("../config");

// Anti-Bad Words System
cmd({
  'on': "body"
}, async (conn, m, store, {
  from,
  body,
  isGroup,
  isAdmins,
  isBotAdmins,
  reply,
  sender
}) => {
  try {
    const badWords = ["wtf", "mia", "xxx", "fuck", 'sex', "huththa", "pakaya", 'ponnaya', "hutto"];

    if (!isGroup || isAdmins || !isBotAdmins) {
      return;
    }

    const messageText = body.toLowerCase();
    const containsBadWord = badWords.some(word => messageText.includes(word));

    if (containsBadWord && config.ANTI_BAD_WORD === 'true') {
      await conn.sendMessage(from, { 'delete': m.key }, { 'quoted': m });
      await conn.sendMessage(from, { 'text': "🚫 ⚠️ BAD WORDS NOT ALLOWED ⚠️ 🚫" }, { 'quoted': m });
    }
  } catch (error) {
    console.error(error);
    reply("An error occurred while processing the message.");
  }
});

// Anti-Link System
const linkPatterns = [
  /https?:\/\/(?:chat\.whatsapp\.com|wa\.me)\/\S+/gi,
  /^https?:\/\/(www\.)?whatsapp\.com\/channel\/([a-zA-Z0-9_-]+)$/,
  /wa\.me\/\S+/gi,
  /https?:\/\/(?:t\.me|telegram\.me)\/\S+/gi,
  /https?:\/\/(?:www\.)?youtube\.com\/\S+/gi,
  /https?:\/\/youtu\.be\/\S+/gi,
  /https?:\/\/(?:www\.)?facebook\.com\/\S+/gi,
  /https?:\/\/fb\.me\/\S+/gi,
  /https?:\/\/(?:www\.)?instagram\.com\/\S+/gi,
  /https?:\/\/(?:www\.)?twitter\.com\/\S+/gi,
  /https?:\/\/(?:www\.)?tiktok\.com\/\S+/gi,
  /https?:\/\/(?:www\.)?linkedin\.com\/\S+/gi,
  /https?:\/\/(?:www\.)?snapchat\.com\/\S+/gi,
  /https?:\/\/(?:www\.)?pinterest\.com\/\S+/gi,
  /https?:\/\/(?:www\.)?reddit\.com\/\S+/gi,
  /https?:\/\/ngl\/\S+/gi,
  /https?:\/\/(?:www\.)?discord\.com\/\S+/gi,
  /https?:\/\/(?:www\.)?twitch\.tv\/\S+/gi,
  /https?:\/\/(?:www\.)?vimeo\.com\/\S+/gi,
  /https?:\/\/(?:www\.)?dailymotion\.com\/\S+/gi,
  /https?:\/\/(?:www\.)?medium\.com\/\S+/gi
];

cmd({
  'on': "body"
}, async (conn, m, store, {
  from,
  body,
  sender,
  isGroup,
  isAdmins,
  isBotAdmins,
  reply
}) => {
  try {
    if (!isGroup || isAdmins || !isBotAdmins) {
      return;
    }

    // Consolidate text sources: body, extended text, captions
    const extendedText = m.message?.extendedTextMessage?.text || '';
    const imageCaption = m.message?.imageMessage?.caption || '';
    const videoCaption = m.message?.videoMessage?.caption || '';
    const stickerText = m.message?.stickerMessage?.caption || '';
    const docCaption = m.message?.documentMessage?.caption || '';
    const quotedText = m.message?.quoted?.message?.conversation || '';

    const textToCheck = (body || extendedText || imageCaption || videoCaption || docCaption || stickerText || quotedText || '').toString();

    const containsLink = linkPatterns.some(pattern => pattern.test(textToCheck));

    if (containsLink && config.ANTI_LINK === 'true') {
      try {
        await conn.sendMessage(from, { 'delete': m.key }, { 'quoted': m });
      } catch (e) {
        console.error('Failed to delete message:', e && e.message ? e.message : e);
      }

      try {
        await conn.sendMessage(from, {
          'text': `⚠️ Links are not allowed in this group. @${sender.split('@')[0]} your message was removed.`,
          'mentions': [sender]
        });
      } catch (e) {
      }

      try {
        if (isBotAdmins) await conn.groupParticipantsUpdate(from, [sender], "remove");
      } catch (e) {
        console.error('Failed to remove participant after link:', e && e.message ? e.message : e);
      }
    }
  } catch (error) {
    console.error(error);
    reply("An error occurred while processing the message.");
  }
});
