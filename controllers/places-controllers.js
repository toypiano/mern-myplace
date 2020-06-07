const mongoose = require('mongoose');
const { validationResult } = require('express-validator');

const getCoords = require('../utils/location');
const HttpError = require('../models/handle-error');
const Place = require('../models/place');
const User = require('../models/user');

const getPlaceById = async (req, res, next) => {
  const { pid } = req.params;

  let place;
  try {
    place = await Place.findById(pid);
  } catch (err) {
    return next(
      new HttpError('Could not find the place. Please try again', 500)
    );
  }
  if (!place) {
    return next(new HttpError('Could not find a place for the given id', 404));
  }
  return res.status(200).json({ place: place.toObject({ getters: true }) });
};

const getPlacesByUserId = async (req, res, next) => {
  const { uid } = req.params;
  let places;
  try {
    places = await Place.find({ creator: uid });
  } catch (err) {
    return next(
      'An error occurred while finding places. Please try again later',
      500
    );
  }

  if (!places || places.length === 0) {
    return next(
      new HttpError('Could not find a place for the given user'),
      404
    );
  }
  return res
    .status(200)
    .json({ places: places.map((p) => p.toObject({ getters: true })) });
};

const createPlace = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors);
    return next(
      new HttpError('Invalid. Please check your input and try again.', 422)
    );
  }

  const { title, description, address, creator } = req.body;
  let coords;
  try {
    coords = await getCoords(address);
  } catch (err) {
    return next(err);
  }
  const createdPlace = new Place({
    title,
    description,
    address,
    image: 'https://placem.at/places?w=800&random=1',
    coords,
    creator,
  });

  let user;
  try {
    user = await User.findById(creator);
  } catch (err) {
    return next(
      new HttpError(
        'An error occurred while finding user. Please try again later.',
        500
      )
    );
  }

  if (!user) {
    return next(
      new HttpError('Could not find the user. Please try again later', 404)
    );
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await createdPlace.save({ session });
    user.places.push(createdPlace);
    // When you save a document as a part of transaction,
    // 'users' collection MUST EXIST before you save.
    await user.save({ session });
    await session.commitTransaction();
  } catch (err) {
    return next(
      new HttpError('Creating place failed. Please try again later', 500)
    );
  }

  return res
    .status(200)
    .json({ place: createdPlace.toObject({ getters: true }) });
};

const updatePlace = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors);
    return next(
      new HttpError('Invalid input. Please check your data and try again.', 422)
    );
  }

  const { title, description } = req.body;
  const { pid } = req.params;

  let updatingPlace;
  try {
    updatingPlace = await Place.findById(pid);
  } catch (err) {
    return next(new HttpError('Could not find a place for the given id', 404));
  }

  updatingPlace.title = title;
  updatingPlace.description = description;

  try {
    await updatingPlace.save();
  } catch (err) {
    return next(
      new HttpError('Invalid input. Please check your data and try again.', 422)
    );
  }

  return res
    .status(200)
    .json({ place: updatingPlace.toObject({ getters: true }) });
};

const deletePlace = async (req, res, next) => {
  const { pid } = req.params;

  let deletingPlace;
  try {
    deletingPlace = Place.findById(pid).populate('creator');
  } catch (err) {
    return next(
      new HttpError(
        'An error occurred while finding the place. Please try again',
        500
      )
    );
  }

  if (!deletingPlace) {
    return next(
      new HttpError(
        'Could not find a place for the given id. Please try again',
        404
      )
    );
  }

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await deletingPlace.remove({ session });
    deletingPlace.creator.places.pull(deletingPlace);
    await deletingPlace.creator.save({ session });
    await session.commitTransaction();
  } catch (err) {
    return next(
      new HttpError('Could not delete the place. Please try again', 500)
    );
  }

  return res.status(200).json({ message: 'Deleted the place' });
};

module.exports = {
  getPlaceById,
  getPlacesByUserId,
  createPlace,
  updatePlace,
  deletePlace,
};
