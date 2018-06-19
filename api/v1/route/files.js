const express = require('express');
const router = express.Router();
const Files = require('../model/files');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const multer = require('multer');
const upload = multer({dest : 'files/'});

//get all
router.get('/', function (req, res, next) {
    Files.find()
        .exec()
        .then(result => {
            res.status(200).json(result)
        }).catch(err => {
            res.status(500).json({ error: err })
        });
});

//get one
router.get('/:filesId', function (req, res, next) {
    const id = req.params.filesId;
    Files.findById(id)
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
router.put('/', upload.single('iFile'), function (req, res, next) {
    console.log(req.file);
    const files = new Files({
        _id: mongoose.Types.ObjectId(),
		name : req.body.name,
		url : req.body.url,
		hash : req.body.hash,
    });
    files.save()
        .then(result => {
            res.status(200).json(result)
        }).catch(err => {
            res.status(500).json({ error: err })
        });
});

//update
router.patch('/:filesId', function (req, res, next) {
    const id = req.params.filesId;
    const updateOps = {}
    for (const key of Object.keys(req.body)) {
        updateOps[key] = req.body[key]
    }
    Files.update({_id : id},updateOps)
    .exec()
    .then(result => {
        res.status(200).json(result)
    }).catch(err => {
        res.status(500).json({ error: err })
    });
});

//delete
router.delete('/:filesId', function (req, res, next) {
    const id = req.params.filesId;
    Files.findOneAndRemove({ _id: id })
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
