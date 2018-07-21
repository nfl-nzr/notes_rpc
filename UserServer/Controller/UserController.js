const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const config = require('../config');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
const User = require('../models/User');
const UserProfile = require('../models/UserProfile')
class UserController {
    constructor() {

    }

    //ADD NEW USER
    addUser(req) {
        let userId;
        return User.create({
            email: req.email,
            password: req.password
        })
            .then(user => {
                this.userId = user._id
                return UserProfile.create({
                    userId: this.userId,
                    firstName: req.firstName,
                    lastName: req.lastName,
                    address: req.address
                })
            })
            .then(userProfile => {
                const token = jwt.sign({ userId: this.userId, userProfileId: userProfile._id }, config.secret, {
                    expiresIn: + new Date() + 10
                });
                return ({ data: { token } });
            })
    }

    //USER LOGIN
    loginUser(req) {
        const self = this;
        let user
        return User.findOne({ email: req.email })
            .then(user => {
                this.user = user
                return UserProfile.findOne({ userId: user._id })
            })
            .then(userProfile => {
                const token = jwt.sign({ userId: this.user._id, userProfileId: userProfile._id }, config.secret, {
                    expiresIn: 150000
                });
                if (this.user.password == req.password) {
                    return ({ data: { token, user } })
                } else {
                    return "Login Failed"
                }
            })
    }

    logoutUser(req) {
        console
        const token = jwt.sign({
            userId: req.userId,
            userProfileId: req.userProfileId
        }, config.secret, {
                expiresIn: -1500000
            })
            return Promise.resolve(token)
    }
}

module.exports = UserController;