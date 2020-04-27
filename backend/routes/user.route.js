const express = require('express');
const app = express();
const userRoute = express.Router();

// User model
let User = require('../models/user');

// Add User
userRoute.route('/create').post((req, res, next) => {
  User.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get All Users
userRoute.route('/').get((req, res) => {
  User.find((error, data) => {
    if (error) {
        console.log(error);
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single user
userRoute.route('/:id').get((req, res) => {
  User.findOne( { identity: req.params.id}, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update user
userRoute.route('/update/:id').put((req, res, next) => {
  User.findOneAndUpdate({identity: req.params.id}, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Data updated successfully')
    }
  })
})

// Delete user
userRoute.route('/delete/:id').delete((req, res, next) => {
  User.findOneAndRemove( {identity: req.params.id}, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = userRoute;