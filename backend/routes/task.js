const express = require('express');
const bodyParser = require('body-parser');

const Task = require('../models/tasks');
const Admin = require("../models/admins");
const taskController = require('../controllers/task');

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

router.get('', taskController.getTask);

router.get('/reallocated', taskController.getReallocated);

router.post('', taskController.createTask);

router.get("/:date", taskController.findTask);

router.delete("/:id", taskController.deleteTask);

router.get('/mark/:taskId', taskController.markCompleted);

router.get('/accept/:taskId/:currentAdmin', taskController.markAccepted);

router.get('/completed/:complete/:accept', taskController.completedTask);

router.get('/completed/reallocated/:complete/:accept', taskController.reallocatedCompleted);

router.get('/accepted/:complete/:accept', taskController.acceptedTask);

router.get('/accepted/reallocated/:complete/:accept', taskController.acceptedReallocated);

router.get('/reallocate/:taskId', taskController.reallocatedTask);

router.put("/reallocateTask/:id", taskController.findReallocated);

module.exports = router;
