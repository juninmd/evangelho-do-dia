/**
 * Script to send the Gospel of the Day to a Telegram channel
 * This script reads the scraped gospel data and sends it via Telegram Bot API
 */

const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const path = require('path');

// Get configuration from environment variables
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

/**
 * Format the gospel message for Telegram
 */
function formatGospelMessage(gospel) {
  let message = `📖 *Evangelho do Dia*\n\n`;
  message += `📅 ${gospel.date}\n\n`;
  
  if (gospel.title && gospel.title !== 'Evangelho do Dia') {
    message += `*${gospel.title}*\n\n`;
  }
  
  if (gospel.reference) {
    message += `📜 _${gospel.reference}_\n\n`;
  }
  
  if (gospel.text) {
    message += `${gospel.text}\n\n`;
  }
  
  if (gospel.reflection) {
    message += `💭 *Reflexão*\n${gospel.reflection}\n\n`;
  }
  
  message += `_Fonte: Canção Nova_`;
  
  return message;
}

/**
 * Send gospel to Telegram channel
 */
async function sendToTelegram() {
  try {
    // Validate environment variables
    if (!TELEGRAM_BOT_TOKEN) {
      throw new Error('TELEGRAM_BOT_TOKEN is not set');
    }
    
    if (!TELEGRAM_CHAT_ID) {
      throw new Error('TELEGRAM_CHAT_ID is not set');
    }

    // Read the gospel data
    const gospelPath = path.join(__dirname, '..', 'gospel-data.json');
    
    if (!fs.existsSync(gospelPath)) {
      throw new Error('Gospel data file not found. Run scrape-gospel.js first.');
    }

    const gospelData = JSON.parse(fs.readFileSync(gospelPath, 'utf8'));
    
    // Create bot instance
    const bot = new TelegramBot(TELEGRAM_BOT_TOKEN);
    
    // Format and send message
    const message = formatGospelMessage(gospelData);
    
    console.log('Sending gospel to Telegram...');
    
    await bot.sendMessage(TELEGRAM_CHAT_ID, message, {
      parse_mode: 'Markdown',
    });
    
    console.log('Gospel sent successfully to Telegram!');
    console.log(`Chat ID: ${TELEGRAM_CHAT_ID}`);
    
    return true;
  } catch (error) {
    console.error('Error sending to Telegram:', error.message);
    throw error;
  }
}

// Run the script
if (require.main === module) {
  sendToTelegram()
    .then(() => {
      console.log('Telegram notification sent!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Failed to send Telegram notification:', error);
      process.exit(1);
    });
}

module.exports = { sendToTelegram, formatGospelMessage };
