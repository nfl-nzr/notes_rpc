const jayson = require('jayson/promise');
const express = require('express');
const UserController = new (require('./Controller/UserController'))()
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/notes_app');

const server = jayson.server({
  register: req => {
    return UserController.addUser(req)
  },
  login: req => {
    return UserController.loginUser(req)
  },
  logout: req => {
    return UserController.logoutUser(req)
  }
});

server.http().listen(3002, () => {
  console.log('Listening on 3002')
});