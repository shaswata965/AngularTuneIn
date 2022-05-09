const express = require('express');
const bodyParser = require('body-parser');

const Language = require('../models/languages');
const Album = require('../models/albums');
const languageController = require('../controllers/language');

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

router.post('', languageController.createLanguage);

router.put("/:id",languageController.updateLanguage);

router.get('',languageController.getLanguage);

router.get('/modal/:id',languageController.getLanguageAlbum);

router.get('/:id',languageController.findLanguage);

router.delete("/:id",languageController.deleteLanguage);

module.exports = router;
