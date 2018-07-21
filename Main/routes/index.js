const jayson = require('jayson/promise');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const config = require('../config')

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// create a client
const userClient = jayson.client.http({
  port: 3002
});
const noteClient = jayson.client.http({
  port: 3001
});
function isAuthenticated(req, res, next) {
  if (req.body.token) {
    jwt.verify(req.body.token, config.secret, function(err, result) {
      if(err) res.send('User not logged in')
      let decoded = jwt.decode(req.body.token, { complete: true })
      req.body.userId = decoded.payload.userId;
      req.body.userProfileId = decoded.payload.userProfileId;
      next();
    });
  }
  else res.send('No Token Provided')
}
router.post('/register', (req, res) => {
  let promise = userClient.request('register', req.body)
  promise.then(data => {
    res.json(data.result)
  })
});

router.post('/login', (req, res) => {
  let promise = userClient.request('login', req.body)
  promise.then(data => {
    res.json(data.result)
  })
})

router.post('/logout',isAuthenticated, (req, res) => {
  let promise = userClient.request('logout', req.body)
  promise.then((data) => {
    res.json(data)
  })
})

router.post('/notes/add', isAuthenticated, (req, res) => {
  let promise = noteClient.request('add', req.body)
  promise.then(data => {
    res.send('Note added successfully')
  })
})

router.put('/notes/update/:id?', isAuthenticated, (req, res) => {
  let promise = noteClient.request('update', req)
  promise.then(data => {
    res.send('Note Updated Succesfully')
  })
})

router.delete('/notes/delete/:id?', isAuthenticated, (req, res) => {
  let promise = noteClient.request('delete', req)
  promise.then(data => {
    res.send('Note Deleted Succesfully')
  })
})

router.post('/notes/all', isAuthenticated, (req,res) => {
  let promise = noteClient.request('all', req.body)
  promise.then(data => res.json(data.result))
})

router.post('/notes/:id?', isAuthenticated, (req,res) => {
  let promise = noteClient.request('getNote', req)
  promise.then(data => res.json(data.result))
})

module.exports = router;