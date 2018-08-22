var db = require('../db/db');
var validator = require('validator');
var User = require('../model/User');


function checkInput(user, res) {
    if (!validator.isAscii(user.name)) {
        console.log("Bad name: " + user.name)
        res.status(400).send();
        return false;
    }

    if (!validator.isEmail(user.email)) {
        console.log("Bad email: " + user.email)
        res.send(400);
        return false;
    }

    return true;
}

var users = {
    /* GET users */
    getUsers: function (req, res, next) {
        res.send(db.users);
    },
    /* GET user */
    getUser: function (req, res, next) {
        let uid = req.params.uid;

        db.users.forEach(function (part, index, arr) {
            if (part.uid == uid) {
                res.send(part);
                return;
            }
        });
    },
    /* Create new user */
    newUser: function (req, res, next) {
        var user = req.body;

        if (!checkInput(user, res)) {
            return;
        }

        db.users.push(new User(db.getNewUID(), user.name, user.email));

        res.send(204);
    },
    updateUser: function (req, res, next) {
        var uid = req.params.uid;
        var user = req.body;

        if (!checkInput(user, res)) {
            return;
        }

        db.users.forEach(function (part, index, arr) {
            if (part.uid == uid) {
                arr[index] = new User(uid, user.name, user.email)
            }
        });

        res.send(204);
    },
    deleteUser: function (req, res, next) {
        var uid = req.params.uid;

        db.users.forEach(function (part, index, arr) {
            if (part.uid == uid) {
                arr.splice(index, 1);
            }
        });

        res.send(204);
    }
};

module.exports = users;