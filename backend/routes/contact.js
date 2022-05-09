const express = require('express');
const bodyParser = require('body-parser');

const contactController = require('../controllers/contact');

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

router.post('', contactController.createContact);

router.get('',contactController.getContact);

router.put('/starred/:id',contactController.starredContact);

router.delete("/:id", contactController.deleteContact);

module.exports = router;
