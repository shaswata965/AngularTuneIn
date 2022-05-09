const express = require('express');
const bodyParser = require('body-parser');

const Event = require('../models/events');
const Admin = require('../models/admins');
const fetch = require("cross-fetch");
const Actor = require('../models/actors');
const eventController = require('../controllers/event');

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

router.post('', eventController.createEvent);

router.put("/:id", eventController.updateEvent);

router.get('', eventController.getEvent);

router.get('/:eventDate', eventController.eventDate);

router.get('/upcomingDate/:date', eventController.upcomingDate);

router.get('/googleEvents/:google', eventController.googleDate);

router.get('/googleUpcoming/:google', eventController.googleUpcoming);

router.get('/modal/:id', eventController.getEventAdmin);

router.get('/:id', eventController.findEvent);

router.get('/birthday/:eventDate', eventController.birthdayEvent);

router.get('/birthday/upcoming/:eventDate', eventController.upcomingBirthday);

router.delete("/:id", eventController.deleteEvent);

module.exports = router;
