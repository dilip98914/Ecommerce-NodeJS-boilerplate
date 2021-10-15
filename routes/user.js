const express = require('express')
const router = express.Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken');

router.post('/register', (req, res) => {
  const { email, password } = req.body;
  User.find({ email })
    .then(users => {
      if (users.length > 0) {
        return res.send(500).json({
          message: "user already exists!"
        })
      }
    }).catch(err => {
      console.log(err)
      return res.status(500);
    });
  const user = new User({
    email, password
  })
  user.save()
    .then(user => {
      return res.status(200).json({
        message: "user registered",
        data: user
      })
    }).catch(err => {
      console.log(err)
      return res.status(500)
    })
})

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  User.find({ email })
    .then(users => {
      if (!users.length) {
        return res.send(500).json({
          message: "user don't exists!"
        })
      }
      const userFetched = users[0];
      if (userFetched.password == password) {
        jwt.sign({ email: userFetched.email }, 'rapidsecret', (err, token) => {
          if (err) {
            return res.status(500).json({
              message: "loggin failed",
            })
          }
          req.token = token;
          return res.status(200).json({
            message: "loggin successfully",
            token
          })
        })
      } else {
        return res.status(401).json({
          message: "wrong credentials!",
        })
      }
    }).catch(err => {
      console.log(err)
      return res.status(500);
    });
})

router.post('/logout', (req, res) => {
  if (req.token) {
    req.token = null;
    return res.status(200).json({
      message: 'logged out!',
    })
  } else {
    return res.status(500).json({
      message: 'not logged in!',
    })
  }
})

router.post('/get-user-by-token', (req, res) => {
  const { token } = req.body;
  jwt.verify(token, 'rapidsecret', (err, decoded) => {
    if (err) {console.log(err);return res.status(500)};
    return res.status(200).json({
      email: decoded.email
    })
  })
})

module.exports = router;