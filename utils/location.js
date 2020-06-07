require('dotenv').config();
const axios = require('axios');

const HttpError = require('../models/handle-error');

/**
 * Get coordinate for the given address
 * @param {string} address
 * @returns {{lat: number, lng: number}}
 */
async function getCoords(address) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${process.env.API_KEY}`;
  const response = await axios.get(url);

  const { data } = response;

  if (!data || data.status === 'ZERO_RESULTS') {
    throw new HttpError('Could not find location for the given address');
  }
  const coords = data.results[0].geometry.location;

  return coords;
}

module.exports = getCoords;
