const express = require('express');
const auth = require('../../middlewares/auth');
const { eventController } = require('../../controllers');

const router = express.Router();

router.route('/').post(auth('manageEvents'), eventController.createEvent).get(eventController.getEvents);

router
  .route('/:eventId')
  .get(eventController.getEventById)
  .patch(auth('manageEvents'), eventController.updateEventById)
  .delete(auth('manageEvents'), eventController.deleteEventById);

module.exports = router;
