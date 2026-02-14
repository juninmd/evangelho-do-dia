/**
 * Script to scrape the Gospel of the Day from Canção Nova website
 * This script uses cheerio to parse HTML and axios to fetch the page
 */

const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const CANCAO_NOVA_URL = 'https://liturgia.cancaonova.com/pb/';

/**
 * Scrape the Gospel of the Day from Canção Nova
 */
async function scrapeGospel() {
  try {
    console.log('Fetching gospel from Canção Nova...');
    
    // Fetch the webpage
    const response = await axios.get(CANCAO_NOVA_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    // Parse the HTML
    const $ = cheerio.load(response.data);
    
    // Extract the date
    const date = new Date().toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    // Extract gospel data
    // Note: These selectors are examples and need to be adjusted
    // based on the actual HTML structure of the website
    const title = $('.liturgia-title').first().text().trim() || 'Evangelho do Dia';
    const reference = $('.evangelho-referencia').first().text().trim() || '';
    const text = $('.evangelho-texto').first().text().trim() || '';
    const reflection = $('.reflexao').first().text().trim() || '';

    const gospel = {
      date,
      title,
      reference,
      text,
      reflection,
      scrapedAt: new Date().toISOString(),
    };

    // Save to JSON file
    const outputPath = path.join(__dirname, '..', 'gospel-data.json');
    fs.writeFileSync(outputPath, JSON.stringify(gospel, null, 2));
    
    console.log('Gospel scraped successfully!');
    console.log(`Saved to: ${outputPath}`);
    
    return gospel;
  } catch (error) {
    console.error('Error scraping gospel:', error.message);
    
    // Create fallback data
    const fallbackGospel = {
      date: new Date().toLocaleDateString('pt-BR'),
      title: 'Evangelho do Dia',
      reference: 'Mateus 5, 1-12',
      text: 'As bem-aventuranças...',
      reflection: 'Reflexão do dia...',
      scrapedAt: new Date().toISOString(),
      error: error.message,
    };
    
    const outputPath = path.join(__dirname, '..', 'gospel-data.json');
    fs.writeFileSync(outputPath, JSON.stringify(fallbackGospel, null, 2));
    
    return fallbackGospel;
  }
}

// Run the scraper
if (require.main === module) {
  scrapeGospel()
    .then(() => {
      console.log('Scraping completed!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Scraping failed:', error);
      process.exit(1);
    });
}

module.exports = { scrapeGospel };
