const httpStatus = require('http-status');
const { Event } = require('../models');
const ApiError = require('../utils/ApiError');

const createEvent = async (event) => {
  return Event.create(event);
};

const getEvents = async (filter, option) => {
  // eslint-disable-next-line no-param-reassign
  filter = {
    ...filter,
    isDeleted: false,
    isPublished: true,
  };
  const events = await Event.paginate(filter, option);
  return events;
};

const getEventById = async (id) => {
  return Event.findById(id);
};

const updateEventById = async (eventId, updateBody) => {
  const event = await getEventById(eventId);
  if (!event) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Event not found');
  }
  Object.assign(event, updateBody);
  await event.save();
  return event;
};

const deleteEventById = async (eventId) => {
  const event = await getEventById(eventId);
  if (!event) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Event not found');
  }
  Object.assign(event, { isDeleted: true });
  await event.save();
  return event;
};

module.exports = {
  createEvent,
  getEvents,
  getEventById,
  updateEventById,
  deleteEventById,
};
