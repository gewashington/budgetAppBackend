var express = require('express');
var router = express.Router();
var db = require('../db/queries')
var passport = require('../auth/local')
const { loginRequired } = require("../auth/helpers");

router.get('/allGoals', db.getGoals)
router.get('/oneGoal', db.getOneGoal)
router.post('/goals', db.createGoal)
router.delete('/goals', db.deleteGoal)
router.put('/goals', db.editGoal)

module.exports = router;
