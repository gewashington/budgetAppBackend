const db = require("./index");
const authHelpers = require("../auth/helpers");
const passport = require("../auth/local");

// AUTHENTICATION ==========================
function registerUser(req, res, next) {
  const hash = authHelpers.createHashPassword(req.body.password);
  db
    .none(
      "INSERT INTO users (username, email, password_digest, bio, profile_pic) VALUES (${username}, $(email), ${password_digest}, ${bio}, ${profile_pic})",
      {
        username: req.body.username,
        email: req.body.email,
        password_digest: hash,
        bio: req.body.bio,
        profile_pic: req.body.profile_pic
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
    .one("SELECT * FROM users WHERE username=${username}", {
      username: req.user.username
    })
    .then(data => {
      res.status(200).json({ user: data });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        data: "Error",
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
        data: "Error",
        err
      });
    });
}

function getSingleUser(req, res, next) {
  db
    .one("SELECT * FROM users WHERE id=${id}", {
      id: req.params.id
    })
    .then(data => {
      res.status(200).json({ user: data });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        data: "Error",
        err
      });
    });
}

function editUser(req, res, next) {
  db
    .none(
      "UPDATE users SET email=${email}, bio=${bio}, profile_pic=${profile_pic} WHERE username=${username}",
      {
        email: req.body.email,
        bio: req.body.bio,
        profile_pic: req.body.profile_pic,
        username: req.user.username
      }
    )
    .then(() => {
      res.status(200).json({
        message: "successfully updated user"
      });
    })
    .catch(err => {
      res.status(500).json({
        message: 'Registration Failed',
        err
      });
    });
}


// GOALS ============================
function getGoals(req, res, next) {
  db
    .any("SELECT * FROM goals WHERE user_id=${user_id}", {user_id: req.user.id})
    .then(data => {
      res.status(200).json({ goals: data });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        data: "Error",
        err
      });
    });
}

function getOneGoal(req, res, next){
  db
    .one("SELECT * FROM goals where id=${id}", {id: req.body.id})
    .then(data => {
      res.status(200).json({ goal: data });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        data: "Error",
        err
      });
    });
}

function editGoal(req, res, next){
  db
  .none(
      "UPDATE goals SET 'weekly_salary'=${weekly_salary}, 'goal_amount'=${goal_amount}, 'weekly_contribution'=${weekly_contribution}, 'current_amount'=${current_amount}, 'complete'=${complete} WHERE id=${index}",
      {
        weekly_salary: req.body.weekly_salary,
        goal_amount: req.body.goal_amount,
        weekly_contribution: req.body.weekly_contribution,
        complete: req.body.complete,
        id: req.body.id,
        current_amount: req.body.current_amount
      }
    )
    .then(() => {
      res.status(200).json({
        message: "successfully updated goal"
      });
    })
    .catch(err => {
      res.status(500).json({
        message: 'Registration Failed',
        err
      });
    });
}

function deleteGoal(req, res, next){
  db.result('DELETE FROM goals WHERE id=${id}', {id: req.params.photo_id})
    .then(function (result) {
      res.status(200)
        .json({
          status: 'success',
          message: `Removed goal`
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createGoal(req, res, next){
  db.none(
      "INSERT INTO goals ('weekly_salary', 'goal_amount', 'weekly_contribution', 'current_amount', 'complete') VALUES(${weekly_salary}, ${goal_amount}, ${weekly_contribution}, ${current_amount}, ${complete})",
      {
        weekly_salary: req.body.weekly_salary,
        goal_amount: req.body.goal_amount,
        weekly_contribution: req.body.weekly_contribution,
        complete: req.body.complete,
        current_amount: req.body.current_amount
      }
    )
    .then(() => {
      res.status(200).json({
        message: "successfully updated goal"
      });
    })
    .catch(err => {
      res.status(500).json({
        message: 'Update Failed',
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