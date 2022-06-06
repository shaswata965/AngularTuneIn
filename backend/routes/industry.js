const express = require('express');
const bodyParser = require('body-parser');

const industryController = require('../controllers/industry');

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

router.post('', industryController.createIndustry);

router.put("/:id",industryController.updateIndustry);

router.get('',industryController.getIndustry);

router.get('/modal/:id',industryController.getIndustryAlbum);

router.get('/:id',industryController.findIndustry);

router.delete("/:id",industryController.deleteIndustry);

module.exports = router;
