const httpStatus = require('http-status');
const { eventService } = require('../services');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const pick = require('../utils/pick');

const getEvents = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['title']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await eventService.getEvents(filter, options);

  res.send(result);
});

const getEventById = catchAsync(async (req, res) => {
  const event = await eventService.getEventById(req.params.eventId);
  if (!event) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Event not found');
  }
  res.send(event);
});

const createEvent = catchAsync(async (req, res) => {
  const event = await eventService.createEvent(req.body);
  res.status(httpStatus.CREATED).send(event);
});

const updateEventById = catchAsync(async (req, res) => {
  const event = await eventService.updateEventById(req.params.eventId, req.body);
  res.send(event);
});

const deleteEventById = catchAsync(async (req, res) => {
  const event = await eventService.deleteEventById(req.params.eventId);
  res.send(event);
});

module.exports = {
  getEvents,
  getEventById,
  createEvent,
  updateEventById,
  deleteEventById,
};
