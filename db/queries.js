const db = require("./index");
const authHelpers = require("../auth/helpers");
const passport = require("../auth/local");

// AUTHENTICATION ==========================
function registerUser(req, res, next) {
  const hash = authHelpers.createHashPassword(req.body.password);
  db
    .none(
      "INSERT INTO users (full_name, email, password_digest) VALUES (${full_name}, $(email), ${password_digest})",
      {
        email: req.body.email,
        password_digest: hash,
        full_name: req.body.full_name,
      }
    )
    .then(() => {
      res.status(200).json({
        message: "Registration successful."
      });
    })
    .catch(err => {
      res.status(500).json({
        message: `Registration Failed    `,
        err
      });
    });
}

function logoutUser(req, res, next) {
  req.logout();
  res.status(200).send("Logged out successfully");
}

function getUser(req, res, next) {
  db
    .one("SELECT * FROM users WHERE email=${email}", {
      email: req.user.email
    })
    .then(data => {
      res.status(200).json({ user: data });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: "Error",
        err
      });
    });
}

function getAllUsers(req, res, next) {
  db
    .any("SELECT * FROM users")
    .then(data => {
      res.status(200).json({ users: data });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: "Error",
        err
      });
    });
}

function getSingleUser(req, res, next) {
  db
    .one("SELECT * FROM users WHERE username=${username}", {
      username: req.params.username
    })
    .then(data => {
      res.status(200).json({ user: data });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: "Error",
        err
      });
    });
}

function editUser(req, res, next) {
  db
    .none(
      "UPDATE users SET email=${email}, full_name=${full_name} WHERE username=${username}",
      {
        email: req.body.email,
        full_name: req.body.full_name,
        username: req.user.username,
      }
    )
    .then(() => {
      res.status(200).json({
        message: "successfully updated user"
      });
    })
    .catch(err => {
      res.status(500).json({
        message: 'Update Failed',
        err
      });
    });
}


// GOALS ============================
function getGoals(req, res, next) {
  db
    .any("SELECT * FROM goals WHERE user_id =${user_id}",
    {user_id: req.user.id})
    .then(data => {
      res.status(200).json({ goals: data });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: "Could not get goal",
        err
      });
    });
}

function getOneGoal(req, res, next){
  db
    .one("SELECT * FROM goals where id=${id}", {id: req.params.id})
    .then(data => {
      res.status(200).json({ goal: data });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: "Could not get goal",
        err
      });
    });
}

function editGoal(req, res, next){
  db
  .none(
      "UPDATE goals SET weekly_salary=${weekly_salary}, goal_amount=${goal_amount}, weekly_contribution=${weekly_contribution}, current_amount=${current_amount}, complete=${complete} WHERE id=${id}",
      {
        weekly_salary: parseInt(req.body.weekly_salary),
        goal_amount: parseInt(req.body.goal_amount),
        weekly_contribution: parseInt(req.body.weekly_contribution),
        complete: req.body.complete,
        id: parseInt(req.params.id),
        current_amount: parseInt(req.body.current_amount)
      }
    )
    .then(() => {
      res.status(200).json({
        message: "successfully updated goal"
      });
    })
    .catch(err => {
      res.status(500).json({
        message: 'update failed',
        err
      });
    });
}

function deleteGoal(req, res, next){
  db.result('DELETE FROM goals WHERE id=${id}', {id: req.params.id})
    .then(function (result) {
      res.status(200)
        .json({
          status: 'success',
          message: `Removed goal`
        });
    })
    .catch(err => {
      res.status(500).json({
        message: 'Delete Failed',
        err
      });
    });
}

function createGoal(req, res, next){
  console.log(parseInt(req.body.weekly_salary))
  db.none(
      "INSERT INTO goals (user_id, weekly_salary, goal_amount, weekly_contribution, current_amount, complete) VALUES(${user_id}, ${weekly_salary}, ${goal_amount}, ${weekly_contribution}, ${current_amount}, ${complete})",
      {
        user_id: parseInt(req.user.id),
        weekly_salary: parseInt(req.body.weekly_salary),
        goal_amount: parseInt(req.body.goal_amount),
        weekly_contribution: parseInt(req.body.weekly_contribution),
        complete: false,
        current_amount: parseInt(req.body.current_amount)
      }
    )
    .then(() => {
      res.status(200).json({
        message: "successfully created goal"
      });
    })
    .catch(err => {
      res.status(500).json({
        message: 'Goal creation Failed',
        err
      });
    });
}


module.exports = {
  registerUser,
  logoutUser,
  getUser,
  getSingleUser,
  getAllUsers,
  editUser,
  getGoals,
  getOneGoal,
  editGoal,
  deleteGoal,
  createGoal
};