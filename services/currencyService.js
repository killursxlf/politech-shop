const axios = require('axios');

const EXCHANGE_API_KEY = process.env.EXCHANGE_API_KEY || 'your_api_key_here';
const BASE_URL = `https://v6.exchangerate-api.com/v6/${EXCHANGE_API_KEY}/latest/UAH`;

let cachedRates = null;
let lastFetched = null;
const CACHE_TTL_MS = 10 * 60 * 1000; 

async function getExchangeRates() {
  const now = Date.now();

  if (cachedRates && lastFetched && (now - lastFetched < CACHE_TTL_MS)) {
    return cachedRates;
  }

  try {
    const response = await axios.get(BASE_URL);
    const rates = response.data.conversion_rates;

    cachedRates = {
      USD: 1 / rates.USD,
      EUR: 1 / rates.EUR,
      UAH: 1
    };
    lastFetched = now;
    return cachedRates;
  } catch (error) {
    console.error('Ошибка получения курсов валют:', error.message);
    return {
      USD: 40,
      EUR: 43,
      UAH: 1
    }; 
  }
}

module.exports = {
  getExchangeRates
};
