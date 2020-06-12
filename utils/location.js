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

/**
 * @typedef {Object} Place
 * @property {string} formatted_address
 * @property {{location: {lat:number, lng:number}, viewport: Object}} geometry
 * @property {[{height: number, width: number, html_attributions: [string], photo_reference: string}]} photos
 */

/**
 * https://developers.google.com/places/web-service/search
 * Takes place text and returns a place
 * @param {string} placeText
 * @returns {Place}
 */
async function findPlace(placeText) {
  const url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(
    placeText
  )}&inputtype=textquery&fields=photos,geometry,formatted_address&key=${
    process.env.API_KEY
  }`;
  const { data } = await axios.get(url);
  console.log(data);
  return data.candidates[0];
}

module.exports = {
  getCoords,
  findPlace,
};
