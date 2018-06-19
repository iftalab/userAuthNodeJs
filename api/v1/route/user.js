const express = require('express');
const router = express.Router();
const User = require('../model/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
mongoose.Promise = global.Promise;


//get all
router.get('/', function (req, res, next) {
    User.find()
        .exec()
        .then(result => {
            res.status(200).json(result)
        }).catch(err => {
            res.status(500).json({ error: err })
        });
});

//get one
router.get('/:userId', function (req, res, next) {
    const id = req.params.userId;
    User.findById(id)
        .exec()
        .then(result => {
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).json({ 'result': 'No valid object found for given ID' });
            }

        }).catch(err => {
            res.status(500).json({ error: err })
        });
});

//save
router.post('/signUp', function (req, res, next) {
    User.find({ email: req.body.email })
        .exec()
        .then(users => {
            if (users.length >= 1) {
                return res.status(409).json({ message: "Email already exists" });
            } else {
                bcrypt.hash(req.body.password, 12, (err, hash) => {
                    if (err) {
                        res.status(500).json({ error: err })
                    } else {
                        const user = new User({
                            _id: mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash,
                            fullName: req.body.fullName,
                            imageUrl: req.body.imageUrl
                        });
                        user.save()
                            .then(result => {
                                res.status(201).json({ message: "User created" })
                            }).catch(err => {
                                res.status(500).json({ error: err })
                            });
                    }
                });
            }
        });
});

//update
router.patch('/:userId', function (req, res, next) {
    const id = req.params.userId;
    const updateOps = {}
    for (const key of Object.keys(req.body)) {
        updateOps[key] = req.body[key]
    }
    User.update({ _id: id }, updateOps)
        .exec()
        .then(result => {
            res.status(200).json(result)
        }).catch(err => {
            res.status(500).json({ error: err })
        });
});

//delete
router.delete('/:userId', function (req, res, next) {
    const id = req.params.userId;
    User.findOneAndRemove({ _id: id })
        .exec()
        .then(result => {
            if (result) {
                res.status(200).json(result);
            } else {
                res.status(404).json({ message: "Object seems already deleted" });
            }
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});


module.exports = router;
