var express = require('express');
var router = express.Router();
var db = require('../db/queries')
var passport = require('../auth/local')
const { loginRequired } = require("../auth/helpers");

router.get('/allGoals', db.getGoals)
router.get('/oneGoal/:id', loginRequired, db.getOneGoal)
router.post('/goals', loginRequired, db.createGoal)
router.delete('/goals/:id', loginRequired, db.deleteGoal)
router.put('/goals/:id', loginRequired, db.editGoal)

module.exports = router;
